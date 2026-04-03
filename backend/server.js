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
                messages: [{ role: 'user', content: message }],
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