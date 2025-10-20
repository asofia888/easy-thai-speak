import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavedConversations } from '../contexts/SavedConversationsContext';
import TrashIcon from './icons/TrashIcon';
import BackIcon from './icons/BackIcon';

const SavedConversationsView: React.FC = () => {
    const navigate = useNavigate();
    const { savedConversations, deleteConversation } = useSavedConversations();

    const handleDelete = (id: string, title: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`「${title}」を削除しますか？`)) {
            deleteConversation(id);
        }
    };

    const handleConversationClick = (id: string) => {
        navigate(`/conversation/${id}`);
    };

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return '今日';
        } else if (days === 1) {
            return '昨日';
        } else if (days < 7) {
            return `${days}日前`;
        } else {
            return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="戻る"
                    >
                        <BackIcon className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">保存済み会話</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {savedConversations.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 text-lg font-medium mb-2">保存済み会話はありません</p>
                        <p className="text-gray-500">カスタムトピックで生成した会話を保存できます</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {savedConversations.map((saved) => (
                            <div
                                key={saved.id}
                                onClick={() => handleConversationClick(saved.id)}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 overflow-hidden"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                                                {saved.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    {saved.conversation.length}ターン
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {formatDate(saved.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(saved.id, saved.title, e)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                            aria-label="削除"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Preview of first conversation line */}
                                    {saved.conversation.length > 0 && (
                                        <div className="mt-3 pt-3 border-t border-gray-100">
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                <span className="font-medium text-indigo-600">{saved.conversation[0].speaker}:</span>{' '}
                                                {saved.conversation[0].thai}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedConversationsView;
