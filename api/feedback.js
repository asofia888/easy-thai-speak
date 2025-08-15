// Vercel Serverless Function for Gemini Pronunciation Feedback API
import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set in Vercel.' });
        }

        const { transcript, correctPhrase } = req.body;
        
        if (!transcript || !correctPhrase) {
            return res.status(400).json({ error: 'Missing transcript or correctPhrase' });
        }

        const ai = new GoogleGenAI(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const feedbackSchema = {
            type: "object",
            properties: {
                score: {
                    type: "number",
                    description: "A score from 0 to 100 representing the accuracy of the pronunciation. 100 is perfect."
                },
                feedback: {
                    type: "string",
                    description: "Encouraging and constructive feedback in Japanese. Point out one good thing and one thing to improve. Keep it concise."
                },
                is_correct: {
                    type: "boolean",
                    description: "A simple boolean indicating if the user's pronunciation was generally correct and understandable."
                }
            },
            required: ["score", "feedback", "is_correct"],
        };

        const response = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `生徒が言った: "${transcript}"
正しいフレーズ: "${correctPhrase}"

以下のJSONスキーマに従って発音評価を行ってください:
${JSON.stringify(feedbackSchema, null, 2)}

評価基準:
- 厳しすぎず、励ましを重視
- 良かった点と改善点を簡潔に
- 意味が通じれば is_correct: true`
                }]
            }],
            generationConfig: {
                temperature: 0.5,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 512,
                responseMimeType: "application/json"
            },
        });
        
        const text = response.response.text();
        const feedback = JSON.parse(String(text).trim());
        
        res.status(200).json({ feedback });
    } catch (error) {
        console.error('❌ Vercel pronunciation feedback error:', {
            message: error?.message,
            type: typeof error
        });
        res.status(500).json({ 
            error: error?.message || 'Failed to generate feedback',
            type: error?.name || 'Unknown error'
        });
    }
}