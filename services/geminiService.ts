
import { ConversationLine, Feedback } from '../types';
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { handleApiError, withRetry, ApiError } from '../utils/errorHandling';

// フロントエンドではサーバーサイドAPIを使用するため、直接的なAPIキーは不要
// ただし、ローカル開発環境ではVITE_GEMINI_API_KEYを使用

const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

export const generateConversation = async (topic: string): Promise<ConversationLine[]> => {
    return withRetry(
        async () => {
            // ローカル開発環境では直接Gemini APIを呼び出す
            if (isDevelopment && import.meta.env.VITE_GEMINI_API_KEY) {
                return await generateConversationDirect(topic);
            }

            // 本番環境またはAPIキーがない場合はサーバーレス関数を使用
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60秒タイムアウト

            try {
                const response = await fetch('/api/conversation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ topic }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const error = handleApiError({ status: response.status, ...errorData }, '会話生成');
                    throw new Error(error.message);
                }

                const data = await response.json();

                if (!data.conversation) {
                    throw new Error('Empty response from Gemini API');
                }

                return data.conversation as ConversationLine[];
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },
        {
            maxRetries: 2,
            delay: 2000,
            backoffMultiplier: 2,
            shouldRetry: (error) => {
                const apiError = handleApiError(error, '会話生成');
                return apiError.retryable;
            }
        }
    ).catch((error) => {
        const apiError = handleApiError(error, '会話生成');
        throw new Error(apiError.message);
    });
};

// ローカル開発環境用：直接Gemini APIを呼び出す
async function generateConversationDirect(topic: string): Promise<ConversationLine[]> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY is not set in .env.local');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    const response = await model.generateContent({
        contents: [{
            role: "user",
            parts: [{
                text: `トピック: 「${topic}」

タイ語初心者の日本人学習者向けの、自然でリアルな日常会話文（4-6ターン）を生成してください。

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
            responseMimeType: "application/json",
            responseSchema: conversationSchema,
            temperature: 0.6,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 8192
        },
    });

    const text = response.response.text();

    if (!text) {
        const error = handleApiError(new Error('Empty response from Gemini API'), 'Gemini API');
        throw new Error(error.message);
    }

    console.log('🤖 Direct API - Raw JSON response length:', text.length);

    try {
        const conversation = JSON.parse(text);
        return conversation as ConversationLine[];
    } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        const error = handleApiError(parseError, 'JSON解析');
        throw new Error(error.message);
    }
}

export const getPronunciationFeedback = async (transcript: string, correctPhrase: string): Promise<Feedback> => {
    return withRetry(
        async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒タイムアウト

            try {
                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ transcript, correctPhrase }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    const error = handleApiError({ status: response.status, ...errorData }, 'フィードバック取得');
                    throw new Error(error.message);
                }

                const data = await response.json();

                if (!data.feedback) {
                    throw new Error('Empty feedback response');
                }

                return data.feedback as Feedback;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },
        {
            maxRetries: 2,
            delay: 1000,
            backoffMultiplier: 2
        }
    ).catch((error) => {
        const apiError = handleApiError(error, 'フィードバック取得');
        throw new Error(apiError.message);
    });
};