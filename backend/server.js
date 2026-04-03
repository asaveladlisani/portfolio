import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not set in environment variables');
}

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ reply: 'AI service not configured', emotion: 'sad' });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: message }] }] }
        );
        const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I did not understand.';
        const emotion = 'neutral';
        res.json({ reply, emotion });
    } catch(err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again.', emotion: 'sad' });
    }
});

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
