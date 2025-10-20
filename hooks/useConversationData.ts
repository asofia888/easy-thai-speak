
import { useState, useEffect } from 'react';
import { ConversationLine } from '../types';
import { getConversationByTopicId } from '../data/conversations';
import { generateConversation } from '../services/geminiService';

export const useConversationData = (topicId: string | undefined, topicTitle: string) => {
    const [conversation, setConversation] = useState<ConversationLine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!topicId || !topicTitle) {
            setIsLoading(false);
            setError("トピック情報が見つかりません。");
            return;
        };

        const isCustomTopic = topicId?.startsWith('custom');
        let isComponentMounted = true;

        const loadConversation = async () => {
            // Reset state for new topic
            setError(null);
            setIsLoading(true);

            // カスタムトピックの場合はAIで生成
            if (isCustomTopic) {
                try {
                    const freshData = await generateConversation(topicTitle);
                    if (isComponentMounted) {
                        setConversation(freshData);
                    }
                } catch (fetchError) {
                    console.error("Failed to generate conversation:", fetchError);
                    if (isComponentMounted) {
                        setError('会話の生成に失敗しました。ネットワーク接続を確認するか、後でもう一度お試しください。');
                    }
                } finally {
                    if (isComponentMounted) {
                        setIsLoading(false);
                    }
                }
                return;
            }

            // 定型トピックの場合はローカルデータを使用
            try {
                // ローカルデータから会話を取得（非同期）
                const localData = await getConversationByTopicId(topicId);

                if (localData) {
                    // データが存在する場合は即座に表示
                    if (isComponentMounted) {
                        setConversation(localData);
                        setIsLoading(false);
                    }
                } else {
                    // データが存在しない場合はAIで生成してフォールバック
                    console.warn(`No local data for topic ${topicId}, falling back to AI generation`);
                    try {
                        const generatedData = await generateConversation(topicTitle);
                        if (isComponentMounted) {
                            setConversation(generatedData);
                        }
                    } catch (genError) {
                        console.error("Failed to generate fallback conversation:", genError);
                        if (isComponentMounted) {
                            setError('会話データが見つかりませんでした。このトピックはまだ準備中です。');
                        }
                    } finally {
                        if (isComponentMounted) {
                            setIsLoading(false);
                        }
                    }
                }
            } catch (err) {
                console.error("Error loading conversation:", err);
                if (isComponentMounted) {
                    setError('会話の読み込みに失敗しました。');
                    setIsLoading(false);
                }
            }
        };

        loadConversation();

        return () => {
            isComponentMounted = false;
        };
    }, [topicId, topicTitle]);

    return { conversation, isLoading, error };
};
