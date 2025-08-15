// Vercel Serverless Function for Gemini Conversation API
import { GoogleGenAI, Type } from "@google/genai";

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

        const ai = new GoogleGenAI(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        
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

        const response = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `トピック: 「${topic}」

以下のJSONスキーマに厳密に従って、タイ語初心者の日本人学習者向けの自然で実用的な会話文（4-6ターン）を生成してください。

要求:
1. 二人の話者間（AとB）の会話
2. Paiboon+方式のローマ字発音表記を使用
3. 各セリフを単語に分割
4. 重要な文法ポイントがある場合は解説を含める

JSON形式で出力してください:
${JSON.stringify(conversationSchema, null, 2)}`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 2048,
                responseMimeType: "application/json"
            },
        });

        const text = response.response.text();
        
        if (!text || text === 'undefined') {
            throw new Error('Empty response from Gemini API');
        }
        
        const conversation = JSON.parse(String(text).trim());
        
        res.status(200).json({ conversation });
    } catch (error) {
        console.error('❌ Vercel Gemini conversation error:', {
            message: error?.message,
            type: typeof error
        });
        res.status(500).json({ 
            error: error?.message || 'Failed to generate conversation',
            type: error?.name || 'Unknown error'
        });
    }
}