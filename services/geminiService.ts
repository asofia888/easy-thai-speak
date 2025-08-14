
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ConversationLine, Feedback } from '../types';

// Vite環境変数を使用
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error("VITE_GEMINI_API_KEY environment variable is not set or is using placeholder value. Please set a valid Google Gemini API key.");
}

const ai = new GoogleGenAI({ apiKey });
const model = "gemini-2.5-flash";

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

export const generateConversation = async (topic: string): Promise<ConversationLine[]> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: `トピック: 「${topic}」`,
            config: {
                systemInstruction: "あなたは、タイ語学習コンテンツのクリエイターです。指定されたトピックとJSONスキーマに基づいて、タイ語初心者の日本人学習者向けの、自然で実用的な会話文を生成するのがあなたの役割です。会話は二人の話者間で行い、トピックの難易度に応じて語彙や文の複雑さを調整してください。発音表記は、必ず学習者向けの「Paiboon+」方式のローマ字表記で統一してください。声調記号も正しく含める必要があります。他の方式（例：IPA、カタカナ表記）は絶対に使用しないでください。話者は「A」「B」のようにシンプルな名前にしてください。さらに、もしセリフの中に日本人学習者にとって重要だと思われる文法事項（例：文末詞、時制の表現、助数詞など）が含まれている場合は、そのセリフの'grammarPoint'オブジェクトに解説を追加してください。解説は、タイトル、分かりやすい説明、そしてその文法を使った複数の例文（発音と日本語訳付き）を含めてください。この文法解説は、学習価値が高いと判断した場合にのみ生成し、すべてのセリフに含める必要はありません。出力は提供されたJSONスキーマに厳密に従ってください。",
                responseMimeType: "application/json",
                responseSchema: conversationSchema,
            },
        });

        const jsonText = await (typeof response.text === 'function' ? response.text() : response.text);
        
        if (!jsonText || jsonText === 'undefined') {
            throw new Error("Gemini APIからの応答が空でした。");
        }
        
        const conversation = JSON.parse(String(jsonText).trim());
        return conversation as ConversationLine[];
    } catch (error) {
        console.error("Error generating conversation:", error);
        
        // APIキーエラーの場合は分かりやすいメッセージを表示
        if (error?.message?.includes('API key not valid') || error?.message?.includes('API_KEY_INVALID')) {
            throw new Error("Google Gemini APIキーが無効です。.envファイルでVITE_GEMINI_API_KEYを正しく設定してください。");
        }
        
        throw new Error(`AIとの会話生成に失敗しました: ${error?.message || '不明なエラー'}`);
    }
};

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

export const getPronunciationFeedback = async (transcript: string, correctPhrase: string): Promise<Feedback> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: model,
            contents: `The user said: "${transcript}". The correct phrase is: "${correctPhrase}".`,
            config: {
                systemInstruction: "あなたは、タイ語教師です。生徒の発音練習を評価します。生徒の発言（音声認識されたテキスト）と、正しいお手本のフレーズを比較してください。比較に基づき、以下のJSONスキーマに従って評価を返してください。\n\n- 評価は厳しすぎず、生徒がやる気をなくさないように、励ますことを重視してください。\n- フィードバックは日本語で、簡潔に、良かった点と改善点を1つずつ指摘してください。\n- `is_correct`は、多少の間違いがあっても意味が通じるレベルであれば`true`にしてください。",
                responseMimeType: "application/json",
                responseSchema: feedbackSchema,
            },
        });
        
        const jsonText = await (typeof response.text === 'function' ? response.text() : response.text);
        
        if (!jsonText || jsonText === 'undefined') {
            throw new Error("Gemini APIからの応答が空でした。");
        }
        
        const feedback = JSON.parse(String(jsonText).trim());
        return feedback as Feedback;

    } catch (error) {
        console.error("Error generating pronunciation feedback:", error);
        // Re-throw a user-friendly error message for the UI to handle.
        throw new Error("フィードバックの取得に失敗しました。ネットワーク接続を確認するか、後でもう一度お試しください。");
    }
};