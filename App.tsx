
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import LoadingFallback from './components/LoadingFallback';
import { ErrorBoundary, AsyncErrorBoundary } from './components/ErrorBoundary';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { AudioProvider } from './contexts/AudioContext';
import { SavedConversationsProvider } from './contexts/SavedConversationsContext';
import { preloadCommonRoutes } from './utils/preloadRoutes';

// Code splitting: Lazy load route components
const TopicSelection = lazy(() => import('./components/TopicSelection'));
const ConversationView = lazy(() => import('./components/ConversationView'));
const FavoritesView = lazy(() => import('./components/FavoritesView'));
const RoleplayView = lazy(() => import('./components/RoleplayView'));
const SavedConversationsView = lazy(() => import('./components/SavedConversationsView'));
const LegalView = lazy(() => import('./components/LegalView'));
const NotFoundView = lazy(() => import('./components/NotFoundView'));
const SettingsModal = lazy(() => import('./components/SettingsModal'));

function App() {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Preload common routes after initial render
        preloadCommonRoutes();

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
                <SavedConversationsProvider>
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
                                        <Suspense fallback={<LoadingFallback fullScreen />}>
                                            <Routes>
                                                <Route path="/" element={<TopicSelection />} />
                                                <Route path="/conversation/:topicId" element={<ConversationView />} />
                                                <Route path="/favorites" element={<FavoritesView />} />
                                                <Route path="/saved-conversations" element={<SavedConversationsView />} />
                                                <Route path="/roleplay" element={<RoleplayView />} />
                                                <Route path="/legal" element={<LegalView />} />
                                                <Route path="*" element={<NotFoundView />} />
                                            </Routes>
                                        </Suspense>
                                    </ErrorBoundary>
                                </main>
                                
                                <footer className="text-center p-4 text-slate-500 text-sm">
                                    <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-2">
                                        <Link to="/legal" className="hover:underline hover:text-slate-700 transition-colors">プライバシーポリシー</Link>
                                        <Link to="/legal" className="hover:underline hover:text-slate-700 transition-colors">免責事項</Link>
                                    </div>
                                    <p>© 2024 Easy Thai Speak. All rights reserved.</p>
                                </footer>
                            </div>
                            
                            <ErrorBoundary
                                fallback={
                                    <div className="fixed bottom-4 left-4 bg-red-500 text-white text-sm px-4 py-2 rounded-lg">
                                        設定モーダルエラー
                                    </div>
                                }
                            >
                                <Suspense fallback={null}>
                                    <SettingsModal
                                        isOpen={isSettingsModalOpen}
                                        onClose={() => setIsSettingsModalOpen(false)}
                                    />
                                </Suspense>
                            </ErrorBoundary>
                            
                            {!isOnline && (
                                <div className="fixed bottom-4 right-4 bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
                                    オフラインモード
                                </div>
                            )}
                            </HashRouter>
                        </AudioProvider>
                    </FavoritesProvider>
                </SavedConversationsProvider>
            </AsyncErrorBoundary>
        </ErrorBoundary>
    );
}

export default App;