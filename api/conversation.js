// Vercel Serverless Function for Gemini Conversation API
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { handleCORS, setSecurityHeaders, checkRateLimit, validateTopicInput } from './_middleware.js';

export default async function handler(req, res) {
    // Apply security headers
    setSecurityHeaders(res);

    // Handle CORS
    const corsAllowed = handleCORS(req, res);

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Reject requests from non-allowed origins
    if (!corsAllowed) {
        return res.status(403).json({ error: 'Origin not allowed' });
    }

    // Check rate limit
    const rateLimit = checkRateLimit(req);
    res.setHeader('X-RateLimit-Limit', '10');
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
    res.setHeader('X-RateLimit-Reset', new Date(Date.now() + rateLimit.resetIn).toISOString());

    if (!rateLimit.allowed) {
        return res.status(429).json({
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil(rateLimit.resetIn / 1000)
        });
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
        const rawTopic = req.method === 'GET' ? queryTopic : bodyTopic;

        // Validate and sanitize input
        const validation = validateTopicInput(rawTopic);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const topic = validation.sanitized;

        console.log('🤖 Vercel Gemini Conversation Request:', { 
            method: req.method, 
            topic: topic.substring(0, 50) + '...'
        });

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        
        // Retry configuration for handling API overload
        const maxRetries = 3;
        const baseDelay = 1000; // 1 second
        
        const conversationSchema = {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    speaker: { type: SchemaType.STRING, description: "話者名 (例: A, B, 店員)" },
                    thai: { type: SchemaType.STRING, description: "タイ語のセリフ" },
                    pronunciation: { type: SchemaType.STRING, description: "Paiboon+方式のローマ字発音表記" },
                    japanese: { type: SchemaType.STRING, description: "日本語訳" },
                    words: {
                        type: SchemaType.ARRAY,
                        description: "セリフを構成する単語のリスト",
                        items: {
                            type: SchemaType.OBJECT,
                            properties: {
                                thai: { type: SchemaType.STRING, description: "単語のタイ語表記" },
                                pronunciation: { type: SchemaType.STRING, description: "単語のPaiboon+方式ローマ字発音表記" },
                                japanese: { type: SchemaType.STRING, description: "単語の日本語訳" },
                            },
                            required: ["thai", "pronunciation", "japanese"],
                        },
                    },
                    grammarPoint: {
                        type: SchemaType.OBJECT,
                        description: "このセリフに含まれる重要な文法ポイントの解説。該当する場合のみ生成する。",
                        properties: {
                            title: { type: SchemaType.STRING, description: "文法ポイントのタイトル（例：文末詞「〜です/ます」）" },
                            explanation: { type: SchemaType.STRING, description: "文法ルールの分かりやすい解説" },
                            examples: {
                                type: SchemaType.ARRAY,
                                description: "文法を使った例文のリスト",
                                items: {
                                    type: SchemaType.OBJECT,
                                    properties: {
                                        thai: { type: SchemaType.STRING, description: "例文のタイ語表記" },
                                        pronunciation: { type: SchemaType.STRING, description: "例文のPaiboon+方式ローマ字発音表記" },
                                        japanese: { type: SchemaType.STRING, description: "例文の日本語訳" },
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

タイ語初心者の日本人学習者向けの、自然でリアルな日常会話文（6-8ターン）を生成してください。

会話スタイル要件:
- 親しみやすく自然な口調（ただし初心者向けの基本表現を中心に）
- 基礎的な語彙と文法パターンを重視
- 相づちや基本的な感情表現を含める
- 砕けた表現や省略形を使用する場合は、grammarPointで解説

必須項目:
1. 二人の話者間（AとB）の会話
2. Paiboon+方式のローマ字発音表記
3. 各セリフを単語に分割
4. 重要な文法ポイントの解説（該当する場合）
5. カジュアル表現や省略形の説明（該当する場合）

指定されたJSONスキーマに従って、有効なJSON配列のみを返してください。説明文やマークダウンは不要です。`
                        }]
                    }],
                    generationConfig: {
                        responseMimeType: "application/json", // JSONモードを有効化
                        responseSchema: conversationSchema, // スキーマを明示的に指定
                        temperature: 0.6,
                        topP: 0.9,
                        topK: 40,
                        maxOutputTokens: 4096 // スキーマ定義を含めるため出力を少し増やす
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

        // JSONモードでは、レスポンスは直接パース可能なJSON文字列になる
        const text = response.response.text();

        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        console.log('🤖 Raw JSON response length:', text.length);
        console.log('🤖 Raw JSON response (first 500 chars):', text.substring(0, 500));

        let conversation;
        try {
            // JSONモードからの応答は直接パースできる
            conversation = JSON.parse(text);
        } catch (parseError) {
            console.error('❌ JSON Parse Error:', {
                error: parseError.message,
                position: parseError.message.match(/position (\d+)/)?.[1],
                contextAround: text.substring(
                    Math.max(0, parseInt(parseError.message.match(/position (\d+)/)?.[1] || 0) - 100),
                    Math.min(text.length, parseInt(parseError.message.match(/position (\d+)/)?.[1] || 0) + 100)
                ),
                fullText: text
            });
            throw parseError;
        }

        res.status(200).json({ conversation });
    } catch (error) {
        console.error('❌ Vercel Gemini conversation error:', {
            message: error?.message,
            type: typeof error,
            stack: error?.stack,
            errorObject: JSON.stringify(error, null, 2)
        });

        // Determine appropriate error response based on error type
        let statusCode = 500;
        let errorMessage = 'Failed to generate conversation';

        if (error?.message?.includes('503') || error?.message?.includes('overloaded')) {
            statusCode = 503;
            errorMessage = 'AI service is currently overloaded. Please try again in a few moments.';
        } else if (error?.message?.includes('API key') || error?.message?.includes('API_KEY')) {
            statusCode = 401;
            errorMessage = 'API authentication failed';
        } else if (error?.message?.includes('quota')) {
            statusCode = 429;
            errorMessage = 'API usage limit exceeded. Please try again later.';
        } else if (error?.message?.includes('JSON') || error?.message?.includes('parse')) {
            statusCode = 502;
            errorMessage = 'Failed to parse AI response. Please try again.';
        } else if (error?.message?.includes('model') || error?.message?.includes('not found')) {
            statusCode = 400;
            errorMessage = 'Invalid model configuration. Please contact support.';
        }

        res.status(statusCode).json({
            error: errorMessage,
            details: error?.message || 'Unknown error',
            type: error?.name || 'Unknown error',
            retryAfter: statusCode === 503 ? 30 : undefined // Suggest retry after 30 seconds for overload
        });
    }
}
