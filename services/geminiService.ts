
import { ConversationLine, Feedback } from '../types';

// フロントエンドではサーバーサイドAPIを使用するため、直接的なAPIキーは不要

export const generateConversation = async (topic: string): Promise<ConversationLine[]> => {
    const maxRetries = 2;
    const baseDelay = 2000; // 2 seconds
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
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
                
                // Handle different error types
                if (response.status === 503 && attempt < maxRetries) {
                    const retryAfter = errorData.retryAfter || (baseDelay * Math.pow(2, attempt)) / 1000;
                    console.warn(`API overloaded, retrying in ${retryAfter} seconds (attempt ${attempt + 1}/${maxRetries + 1})`);
                    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                    continue; // Retry the request
                }
                
                // Provide user-friendly error messages
                let userMessage = errorData.error || 'APIリクエストが失敗しました';
                if (response.status === 503) {
                    userMessage = 'AIサービスが混雑しています。しばらく待ってから再度お試しください。';
                } else if (response.status === 429) {
                    userMessage = 'API使用制限に達しました。しばらく待ってから再度お試しください。';
                } else if (response.status === 401) {
                    userMessage = 'API認証エラーが発生しました。';
                } else if (response.status === 502) {
                    userMessage = 'AI応答の解析に失敗しました。もう一度お試しください。';
                }
                
                throw new Error(userMessage);
            }
            
            const data = await response.json();
            return data.conversation as ConversationLine[];
            
        } catch (error) {
            console.error(`Error generating conversation (attempt ${attempt + 1}):`, error);
            
            // Don't retry on network errors or non-503 errors on last attempt
            if (attempt === maxRetries || 
                (error instanceof TypeError && error.message.includes('fetch'))) {
                
                // ネットワークエラーの場合
                if (error instanceof TypeError && error.message.includes('fetch')) {
                    throw new Error("ネットワーク接続エラー。インターネット接続を確認してください。");
                }
                
                throw new Error(`AIとの会話生成に失敗しました: ${error?.message || '不明なエラー'}`);
            }
            
            // Wait before retrying for other errors
            await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
        }
    }
    
    throw new Error('会話生成に失敗しました。しばらく待ってから再度お試しください。');
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