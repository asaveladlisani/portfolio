import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyCGhXyy2UZOvgq1Zx1ZrID_GSKOADbA39U';

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            { prompt: message, temperature: 0.7 },
            { headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` } }
        );
        const reply = response.data?.candidates?.[0]?.content || 'Sorry, I did not understand.';
        const emotion = 'neutral'; // can extend sentiment detection
        res.json({ reply, emotion });
    } catch(err) {
        console.error(err);
        res.status(500).json({ reply: 'Error', emotion: 'neutral' });
    }
});

app.listen(3009, () => console.log('Backend running on http://localhost:3009'));
