
import { ConversationLine, Feedback } from '../types';

// フロントエンドではサーバーサイドAPIを使用するため、直接的なAPIキーは不要

export const generateConversation = async (topic: string): Promise<ConversationLine[]> => {
    try {
        const response = await fetch('/api/conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'APIリクエストが失敗しました');
        }
        
        const data = await response.json();
        return data.conversation as ConversationLine[];
    } catch (error) {
        console.error("Error generating conversation:", error);
        
        // ネットワークエラーの場合
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error("ネットワーク接続エラー。インターネット接続を確認してください。");
        }
        
        throw new Error(`AIとの会話生成に失敗しました: ${error?.message || '不明なエラー'}`);
    }
};

export const getPronunciationFeedback = async (transcript: string, correctPhrase: string): Promise<Feedback> => {
    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transcript, correctPhrase }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'フィードバックAPIリクエストが失敗しました');
        }
        
        const data = await response.json();
        return data.feedback as Feedback;
    } catch (error) {
        console.error("Error generating pronunciation feedback:", error);
        
        // ネットワークエラーの場合
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error("ネットワーク接続エラー。インターネット接続を確認してください。");
        }
        
        throw new Error(`フィードバックの取得に失敗しました: ${error?.message || '不明なエラー'}`);
    }
};