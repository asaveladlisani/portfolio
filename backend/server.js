import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are Asavela Dlisani's personal AI assistant on their portfolio website. 
Asavela is a Software Developer & QA Tester from Cape Town, South Africa.
Key details about Asavela:
- Currently studying NQF Level 5 in Software Development at CTU Training Solutions (2024-2025)
- Matriculated from Palm-ridge Extension 6 Secondary School (2022)
- Has NQF Level 3 in ICT from Thuthukani Ma'Afrika Center (2024)
- Technical skills: Java, C#, HTML, CSS, JavaScript, DevOps
- Soft skills: Strong communication, Teamwork, Collaboration, Empathy, Conflict resolution, Adaptability, Professionalism
- Languages: Xhosa, English, Sesotho, IsiZulu
- Work experience: QA Tester (Intern) at Condorgreen (2025), Customer Assistant at Shasha Lifestyle Store (2023)
- Services offered: Web Development, Software Development, QA Testing, DevOps Solutions

When users ask about Asavela, their skills, education, projects, or services, provide helpful information.
Be friendly, concise, and professional. Keep responses short for voice output.`;

if (!OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY not set in environment variables');
}

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ reply: 'AI service not configured', emotion: 'sad' });
    }

    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: 'deepseek/deepseek-chat',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: message }
                ],
                max_tokens: 500
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://asaveladlisani.github.io/portfolio',
                    'X-Title': 'Portfolio AI Chat'
                }
            }
        );
        const reply = response.data?.choices?.[0]?.message?.content || 'Sorry, I did not understand.';
        const emotion = 'neutral';
        res.json({ reply, emotion });
    } catch(err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again.', emotion: 'sad' });
    }
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));