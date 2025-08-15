// Vercel Serverless Function for Gemini Pronunciation Feedback API
import { GoogleGenerativeAI } from "@google/generative-ai";

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

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Retry configuration for handling API overload
        const maxRetries = 3;
        const baseDelay = 1000; // 1 second
        
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

        // Retry function with exponential backoff
        async function generateWithRetry(retryCount = 0) {
            try {
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
                return response;
            } catch (error) {
                // Check if it's a 503 Service Unavailable error (model overloaded)
                const isOverloaded = error?.message?.includes('503') || 
                                   error?.message?.includes('overloaded') ||
                                   error?.message?.includes('Service Unavailable');
                
                if (isOverloaded && retryCount < maxRetries) {
                    const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
                    console.warn(`🔄 Feedback API overloaded, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
                    
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return generateWithRetry(retryCount + 1);
                }
                
                throw error; // Re-throw if not retryable or max retries reached
            }
        }

        const response = await generateWithRetry();
        
        const text = response.response.text();
        const feedback = JSON.parse(String(text).trim());
        
        res.status(200).json({ feedback });
    } catch (error) {
        console.error('❌ Vercel pronunciation feedback error:', {
            message: error?.message,
            type: typeof error,
            stack: error?.stack
        });
        
        // Determine appropriate error response based on error type
        let statusCode = 500;
        let errorMessage = 'Failed to generate feedback';
        
        if (error?.message?.includes('503') || error?.message?.includes('overloaded')) {
            statusCode = 503;
            errorMessage = 'AI service is currently overloaded. Please try again in a few moments.';
        } else if (error?.message?.includes('API key')) {
            statusCode = 401;
            errorMessage = 'API authentication failed';
        } else if (error?.message?.includes('quota')) {
            statusCode = 429;
            errorMessage = 'API usage limit exceeded. Please try again later.';
        } else if (error?.message?.includes('JSON')) {
            statusCode = 502;
            errorMessage = 'Failed to parse AI response. Please try again.';
        }
        
        res.status(statusCode).json({ 
            error: errorMessage,
            details: error?.message || 'Unknown error',
            type: error?.name || 'Unknown error',
            retryAfter: statusCode === 503 ? 30 : undefined // Suggest retry after 30 seconds for overload
        });
    }
}