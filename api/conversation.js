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

        const ai = new GoogleGenAI({ apiKey });
        const model = "gemini-1.5-flash";
        
        const conversationSchema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    speaker: { type: Type.STRING, description: "話者名 (例: A, B, 店員)" },
                    thai: { type: Type.STRING, description: "タイ語のセリフ" },
                    pronunciation: { type: Type.STRING, description: "Paiboon+方式のローマ字発音表記" },
                    japanese: { type: Type.STRING, description: "日本語訳" },
                    words: {
                        type: Type.ARRAY,
                        description: "セリフを構成する単語のリスト",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                thai: { type: Type.STRING, description: "単語のタイ語表記" },
                                pronunciation: { type: Type.STRING, description: "単語のPaiboon+方式ローマ字発音表記" },
                                japanese: { type: Type.STRING, description: "単語の日本語訳" },
                            },
                            required: ["thai", "pronunciation", "japanese"],
                        },
                    },
                    grammarPoint: {
                        type: Type.OBJECT,
                        description: "このセリフに含まれる重要な文法ポイントの解説。該当する場合のみ生成する。",
                        properties: {
                            title: { type: Type.STRING, description: "文法ポイントのタイトル（例：文末詞「〜です/ます」）" },
                            explanation: { type: Type.STRING, description: "文法ルールの分かりやすい解説" },
                            examples: {
                                type: Type.ARRAY,
                                description: "文法を使った例文のリスト",
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        thai: { type: Type.STRING, description: "例文のタイ語表記" },
                                        pronunciation: { type: Type.STRING, description: "例文のPaiboon+方式ローマ字発音表記" },
                                        japanese: { type: Type.STRING, description: "例文の日本語訳" },
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

        const response = await ai.models.generateContent({
            model: model,
            contents: `トピック: 「${topic}」`,
            config: {
                systemInstruction: "あなたは、タイ語学習コンテンツのクリエイターです。指定されたトピックとJSONスキーマに基づいて、タイ語初心者の日本人学習者向けの、自然で実用的な会話文を生成するのがあなたの役割です。会話は二人の話者間で行い、トピックの難易度に応じて語彙や文の複雑さを調整してください。発音表記は、必ず学習者向けの「Paiboon+」方式のローマ字表記で統一してください。声調記号も正しく含める必要があります。他の方式（例：IPA、カタカナ表記）は絶対に使用しないでください。話者は「A」「B」のようにシンプルな名前にしてください。さらに、もしセリフの中に日本人学習者にとって重要だと思われる文法事項（例：文末詞、時制の表現、助数詞など）が含まれている場合は、そのセリフの'grammarPoint'オブジェクトに解説を追加してください。解説は、タイトル、分かりやすい説明、そしてその文法を使った複数の例文（発音と日本語訳付き）を含めてください。この文法解説は、学習価値が高いと判断した場合にのみ生成し、すべてのセリフに含める必要はありません。出力は提供されたJSONスキーマに厳密に従ってください。",
                responseMimeType: "application/json",
                responseSchema: conversationSchema,
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 2048
            },
        });

        const text = await (typeof response.text === 'function' ? response.text() : response.text);
        
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