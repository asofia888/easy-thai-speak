import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { ToastType } from '../components/Toast';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextType {
    toasts: Toast[];
    showToast: (message: string, type?: ToastType, duration?: number) => void;
    showSuccess: (message: string, duration?: number) => void;
    showError: (message: string, duration?: number) => void;
    showWarning: (message: string, duration?: number) => void;
    showInfo: (message: string, duration?: number) => void;
    removeToast: (id: string) => void;
    clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Memoize the showToast function
    const showToast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newToast: Toast = {
            id,
            type,
            message,
            duration,
        };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    // Memoize convenience methods
    const showSuccess = useCallback((message: string, duration = 5000) => {
        showToast(message, 'success', duration);
    }, [showToast]);

    const showError = useCallback((message: string, duration = 7000) => {
        showToast(message, 'error', duration);
    }, [showToast]);

    const showWarning = useCallback((message: string, duration = 6000) => {
        showToast(message, 'warning', duration);
    }, [showToast]);

    const showInfo = useCallback((message: string, duration = 5000) => {
        showToast(message, 'info', duration);
    }, [showToast]);

    // Memoize removeToast function
    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Memoize clearAll function
    const clearAll = useCallback(() => {
        setToasts([]);
    }, []);

    // Memoize context value
    const contextValue = useMemo(() => ({
        toasts,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeToast,
        clearAll,
    }), [toasts, showToast, showSuccess, showError, showWarning, showInfo, removeToast, clearAll]);

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
