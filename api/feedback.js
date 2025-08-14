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

        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-1.5-flash";
        
        const feedbackSchema = {
            type: Type.OBJECT,
            properties: {
                score: {
                    type: Type.NUMBER,
                    description: "A score from 0 to 100 representing the accuracy of the pronunciation. 100 is perfect."
                },
                feedback: {
                    type: Type.STRING,
                    description: "Encouraging and constructive feedback in Japanese. Point out one good thing and one thing to improve. Keep it concise."
                },
                is_correct: {
                    type: Type.BOOLEAN,
                    description: "A simple boolean indicating if the user's pronunciation was generally correct and understandable."
                }
            },
            required: ["score", "feedback", "is_correct"],
        };

        const response = await ai.models.generateContent({
            model: model,
            contents: `The user said: "${transcript}". The correct phrase is: "${correctPhrase}".`,
            config: {
                systemInstruction: "あなたは、タイ語教師です。生徒の発音練習を評価します。生徒の発言（音声認識されたテキスト）と、正しいお手本のフレーズを比較してください。比較に基づき、以下のJSONスキーマに従って評価を返してください。\n\n- 評価は厳しすぎず、生徒がやる気をなくさないように、励ますことを重視してください。\n- フィードバックは日本語で、簡潔に、良かった点と改善点を1つずつ指摘してください。\n- `is_correct`は、多少の間違いがあっても意味が通じるレベルであれば`true`にしてください。",
                responseMimeType: "application/json",
                responseSchema: feedbackSchema,
                temperature: 0.5,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 512
            },
        });
        
        const text = await (typeof response.text === 'function' ? response.text() : response.text);
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