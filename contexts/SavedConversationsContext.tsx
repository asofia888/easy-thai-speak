import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ConversationLine } from '../types';

export interface SavedConversation {
    id: string;
    title: string;
    conversation: ConversationLine[];
    createdAt: string;
    lastAccessedAt: string;
}

interface SavedConversationsContextType {
    savedConversations: SavedConversation[];
    saveConversation: (title: string, conversation: ConversationLine[]) => string;
    deleteConversation: (id: string) => void;
    getConversation: (id: string) => SavedConversation | undefined;
    updateLastAccessed: (id: string) => void;
}

const SavedConversationsContext = createContext<SavedConversationsContextType | undefined>(undefined);

const STORAGE_KEY = 'easy-thai-speak-saved-conversations';

export const SavedConversationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);

    // Load saved conversations from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSavedConversations(parsed);
            }
        } catch (error) {
            console.error('Failed to load saved conversations:', error);
        }
    }, []);

    // Save to localStorage whenever savedConversations changes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(savedConversations));
        } catch (error) {
            console.error('Failed to save conversations:', error);
        }
    }, [savedConversations]);

    const saveConversation = (title: string, conversation: ConversationLine[]): string => {
        const id = `saved-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newConversation: SavedConversation = {
            id,
            title,
            conversation,
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString(),
        };

        setSavedConversations(prev => [newConversation, ...prev]);
        return id;
    };

    const deleteConversation = (id: string) => {
        setSavedConversations(prev => prev.filter(conv => conv.id !== id));
    };

    const getConversation = (id: string): SavedConversation | undefined => {
        return savedConversations.find(conv => conv.id === id);
    };

    const updateLastAccessed = (id: string) => {
        setSavedConversations(prev =>
            prev.map(conv =>
                conv.id === id
                    ? { ...conv, lastAccessedAt: new Date().toISOString() }
                    : conv
            )
        );
    };

    return (
        <SavedConversationsContext.Provider
            value={{
                savedConversations,
                saveConversation,
                deleteConversation,
                getConversation,
                updateLastAccessed,
            }}
        >
            {children}
        </SavedConversationsContext.Provider>
    );
};

export const useSavedConversations = () => {
    const context = useContext(SavedConversationsContext);
    if (context === undefined) {
        throw new Error('useSavedConversations must be used within a SavedConversationsProvider');
    }
    return context;
};
