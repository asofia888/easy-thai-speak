// Vercel Serverless Function for Gemini Conversation API
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Environment variable check
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.error('❌ GEMINI_API_KEY not configured');
            return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set in Vercel.' });
        }

        const { topic: bodyTopic } = (req.body || {});
        const queryTopic = (req.query && req.query.topic) ? String(req.query.topic) : '';
        const topic = req.method === 'GET' ? queryTopic : bodyTopic;
        
        if (!topic || typeof topic !== 'string') {
            return res.status(400).json({ error: 'Invalid topic' });
        }

        console.log('🤖 Vercel Gemini Conversation Request:', { 
            method: req.method, 
            topic: topic.substring(0, 50) + '...'
        });

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Retry configuration for handling API overload
        const maxRetries = 3;
        const baseDelay = 1000; // 1 second
        
        const conversationSchema = {
            type: "array",
            items: {
                type: "object",
                properties: {
                    speaker: { type: "string", description: "話者名 (例: A, B, 店員)" },
                    thai: { type: "string", description: "タイ語のセリフ" },
                    pronunciation: { type: "string", description: "Paiboon+方式のローマ字発音表記" },
                    japanese: { type: "string", description: "日本語訳" },
                    words: {
                        type: "array",
                        description: "セリフを構成する単語のリスト",
                        items: {
                            type: "object",
                            properties: {
                                thai: { type: "string", description: "単語のタイ語表記" },
                                pronunciation: { type: "string", description: "単語のPaiboon+方式ローマ字発音表記" },
                                japanese: { type: "string", description: "単語の日本語訳" },
                            },
                            required: ["thai", "pronunciation", "japanese"],
                        },
                    },
                    grammarPoint: {
                        type: "object",
                        description: "このセリフに含まれる重要な文法ポイントの解説。該当する場合のみ生成する。",
                        properties: {
                            title: { type: "string", description: "文法ポイントのタイトル（例：文末詞「〜です/ます」）" },
                            explanation: { type: "string", description: "文法ルールの分かりやすい解説" },
                            examples: {
                                type: "array",
                                description: "文法を使った例文のリスト",
                                items: {
                                    type: "object",
                                    properties: {
                                        thai: { type: "string", description: "例文のタイ語表記" },
                                        pronunciation: { type: "string", description: "例文のPaiboon+方式ローマ字発音表記" },
                                        japanese: { type: "string", description: "例文の日本語訳" },
                                    },
                                    required: ["thai", "pronunciation", "japanese"],
                                }
                            }
                        },
                        required: ["title", "explanation", "examples"]
                    }
                },
                required: ["speaker", "thai", "pronunciation", "japanese", "words"],
            },
        };

        // Retry function with exponential backoff
        async function generateWithRetry(retryCount = 0) {
            try {
                const response = await model.generateContent({
                    contents: [{
                        role: "user",
                        parts: [{
                            text: `トピック: 「${topic}」

タイ語初心者の日本人学習者向けの自然で実用的な会話文（6-8ターン）をJSON形式で生成してください。

必須項目:
1. 二人の話者間（AとB）の会話
2. Paiboon+方式のローマ字発音表記を使用
3. 各セリフを単語に分割
4. 重要な文法ポイントがある場合は解説を含める

出力はこの形式の配列で:
[
  {
    "speaker": "A",
    "thai": "タイ語のセリフ",
    "pronunciation": "Paiboon+方式の発音",
    "japanese": "日本語訳",
    "words": [
      {
        "thai": "単語",
        "pronunciation": "発音",
        "japanese": "意味"
      }
    ]
  }
]

純粋なJSONのみを出力し、説明文やマークダウンは含めないでください。`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.9,
                        topK: 40,
                        maxOutputTokens: 2048
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
                    console.warn(`🔄 API overloaded, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
                    
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return generateWithRetry(retryCount + 1);
                }
                
                throw error; // Re-throw if not retryable or max retries reached
            }
        }

        const response = await generateWithRetry();

        let text = response.response.text();
        
        if (!text || text === 'undefined') {
            throw new Error('Empty response from Gemini API');
        }

        // マークダウンのコードブロックを取り除く
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // 余分なテキストを除去（JSONの前後にある説明文など）
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            text = jsonMatch[0];
        }
        
        console.log('🤖 Cleaned response text:', text.substring(0, 500) + '...');
        
        const conversation = JSON.parse(text);
        
        res.status(200).json({ conversation });
    } catch (error) {
        console.error('❌ Vercel Gemini conversation error:', {
            message: error?.message,
            type: typeof error,
            stack: error?.stack
        });
        
        // Determine appropriate error response based on error type
        let statusCode = 500;
        let errorMessage = 'Failed to generate conversation';
        
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
