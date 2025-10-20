
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useConversationData } from '../hooks/useConversationData';
import ConversationCard from './ConversationCard';
import ConversationSkeleton from './ConversationSkeleton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSavedConversations } from '../contexts/SavedConversationsContext';
import { ConversationLine } from '../types';
import EyeIcon from './icons/EyeIcon';

const ConversationView = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const topicTitle = location.state?.topicTitle || '会話';

    const { saveConversation, getConversation, updateLastAccessed } = useSavedConversations();
    const [isListeningMode, setIsListeningMode] = useLocalStorage('listeningMode', false);
    const [isSaved, setIsSaved] = useState(false);

    const isCustomTopic = topicId?.startsWith('custom');
    const isSavedConversation = topicId?.startsWith('saved-');

    // Load conversation based on source (saved vs. regular vs. custom)
    const [conversation, setConversation] = useState<ConversationLine[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isSavedConversation && topicId) {
            // Load from saved conversations
            const saved = getConversation(topicId);
            if (saved) {
                setConversation(saved.conversation);
                updateLastAccessed(topicId);
                setIsLoading(false);
            } else {
                setError('保存済み会話が見つかりません');
                setIsLoading(false);
            }
        }
    }, [topicId, isSavedConversation, getConversation, updateLastAccessed]);

    // Use the original hook for non-saved conversations
    const regularData = useConversationData(
        isSavedConversation ? undefined : topicId,
        topicTitle
    );

    useEffect(() => {
        if (!isSavedConversation) {
            setConversation(regularData.conversation);
            setIsLoading(regularData.isLoading);
            setError(regularData.error);
        }
    }, [isSavedConversation, regularData]);

    const startRoleplay = () => {
        navigate('/roleplay', { state: { conversation, topicTitle } });
    };

    const handleSave = () => {
        if (conversation.length > 0) {
            saveConversation(topicTitle, conversation);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6">{topicTitle}</h1>
                <ConversationSkeleton />
            </div>
        );
    }

    if (error && conversation.length === 0) {
        return (
            <div className="text-center p-8 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-xl font-bold text-red-700">エラーが発生しました</h2>
                <p className="text-red-600 mt-2">{error}</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    トピック選択に戻る
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-slate-800">{topicTitle}</h1>
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg justify-center">
                        <EyeIcon className="w-5 h-5 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700 select-none">訳を隠す</span>
                        <button
                            onClick={() => setIsListeningMode(!isListeningMode)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isListeningMode ? 'bg-blue-600' : 'bg-slate-200'
                            }`}
                            role="switch"
                            aria-checked={isListeningMode}
                            aria-label="リスニングモードを切り替え"
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    isListeningMode ? 'translate-x-5' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                    {conversation.length > 0 && (
                        <div className="flex gap-2">
                            {isCustomTopic && !isSavedConversation && (
                                <button
                                    onClick={handleSave}
                                    className={`font-bold py-2 px-6 rounded-lg transition-all duration-300 ${
                                        isSaved
                                            ? 'bg-gray-400 text-white cursor-not-allowed'
                                            : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
                                    }`}
                                    disabled={isSaved}
                                >
                                    {isSaved ? '✓ 保存しました' : '💾 会話を保存'}
                                </button>
                            )}
                            <button
                                onClick={startRoleplay}
                                className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-transform duration-300 hover:scale-105"
                            >
                                ロールプレイを開始
                            </button>
                        </div>
                    )}
                </div>
            </div>
             {error && conversation.length > 0 && ( // Show a non-blocking error if we have cached data but failed to refresh
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg text-sm">
                    <p><strong>お知らせ:</strong> {error}</p>
                </div>
            )}
            <div className="space-y-6">
                {Array.isArray(conversation) && conversation.map((line, index) => (
                    <ConversationCard key={index} line={line} isListeningMode={isListeningMode} />
                ))}
            </div>
        </div>
    );
};

export default ConversationView;
