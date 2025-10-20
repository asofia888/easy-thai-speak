import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSavedConversations } from '../contexts/SavedConversationsContext';
import Icon from './common/Icon';
import LogoIcon from './icons/LogoIcon';

const Header = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
    const { reviewQueueCount } = useFavorites();
    const { savedConversations } = useSavedConversations();

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <LogoIcon className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-2xl font-bold text-slate-800 hidden sm:block group-hover:text-blue-600 transition-colors">
                        Easy Thai Speak
                    </span>
                </Link>
                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/saved-conversations"
                        className={({ isActive }) =>
                            `relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`
                        }
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className="hidden md:inline">保存済み</span>
                        {savedConversations.length > 0 && (
                             <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                                {savedConversations.length}
                            </span>
                        )}
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            `relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                isActive
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`
                        }
                    >
                        <Icon name="book-open" className="h-5 w-5" />
                        <span className="hidden md:inline">単語帳</span>
                        {reviewQueueCount > 0 && (
                             <span className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-slate-800 animate-pulse">
                                {reviewQueueCount}
                            </span>
                        )}
                    </NavLink>
                    <button
                        onClick={onOpenSettings}
                        className="p-2 rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        aria-label="音声設定を開く"
                    >
                        <Icon name="settings" className="h-6 w-6" />
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;