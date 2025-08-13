
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import TopicSelection from './components/TopicSelection';
import ConversationView from './components/ConversationView';
import FavoritesView from './components/FavoritesView';
import RoleplayView from './components/RoleplayView';
import LegalView from './components/LegalView';
import NotFoundView from './components/NotFoundView';
import { PronunciationPracticeView } from './components/PronunciationPracticeView';
import { ErrorBoundary, AsyncErrorBoundary } from './components/ErrorBoundary';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AudioProvider } from './contexts/AudioContext';
import SettingsModal from './components/SettingsModal';

function App() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);


    return (
        <ErrorBoundary onError={(error, errorInfo) => {
            console.error('Application Error:', error);
            console.error('Error Info:', errorInfo);
            // Here you could send to error reporting service
        }}>
            <AsyncErrorBoundary>
                <FavoritesProvider>
                    <AudioProvider>
                        <HashRouter>
                            <div className="min-h-screen flex flex-col">
                                <ErrorBoundary
                                    fallback={
                                        <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                            <p className="text-red-700">ヘッダーの読み込みに失敗しました</p>
                                        </div>
                                    }
                                >
                                    <Header onOpenSettings={() => setIsSettingsModalOpen(true)} />
                                </ErrorBoundary>
                                
                                <main className="flex-grow container mx-auto p-4 md:p-6">
                                    <ErrorBoundary>
                                        <Routes>
                                            <Route path="/" element={<TopicSelection />} />
                                            <Route path="/conversation/:topicId" element={<ConversationView />} />
                                            <Route path="/favorites" element={<FavoritesView />} />
                                            <Route path="/roleplay" element={<RoleplayView />} />
                                            <Route path="/pronunciation" element={<PronunciationPracticeView />} />
                                            <Route path="/pronunciation/:category" element={<PronunciationPracticeView />} />
                                            <Route path="/legal" element={<LegalView />} />
                                            <Route path="*" element={<NotFoundView />} />
                                        </Routes>
                                    </ErrorBoundary>
                                </main>
                                
                                <footer className="text-center p-4 text-slate-500 text-sm">
                                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-2">
                                        <Link to="/legal" className="hover:underline hover:text-slate-700 transition-colors">プライバシーポリシー</Link>
                                        <Link to="/legal" className="hover:underline hover:text-slate-700 transition-colors">免責事項</Link>
                                    </div>
                                    <p>© 2024 Thai Talk Tutor. All rights reserved.</p>
                                </footer>
                            </div>
                            
                            <ErrorBoundary
                                fallback={
                                    <div className="fixed bottom-4 left-4 bg-red-500 text-white text-sm px-4 py-2 rounded-lg">
                                        設定モーダルエラー
                                    </div>
                                }
                            >
                                <SettingsModal
                                    isOpen={isSettingsModalOpen}
                                    onClose={() => setIsSettingsModalOpen(false)}
                                />
                            </ErrorBoundary>
                            
                            {!isOnline && (
                                <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                                    オフラインモード
                                </div>
                            )}
                        </HashRouter>
                    </AudioProvider>
                </FavoritesProvider>
            </AsyncErrorBoundary>
        </ErrorBoundary>
    );
}

export default App;