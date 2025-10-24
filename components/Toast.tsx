import React, { useEffect } from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import AlertTriangleIcon from './icons/AlertTriangleIcon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 5000, onClose }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
            case 'error':
                return <XCircleIcon className="w-5 h-5 text-red-600" />;
            case 'warning':
                return <AlertTriangleIcon className="w-5 h-5 text-yellow-600" />;
            case 'info':
            default:
                return (
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200';
            case 'error':
                return 'bg-red-50 border-red-200';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200';
            case 'info':
            default:
                return 'bg-blue-50 border-blue-200';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'success':
                return 'text-green-800';
            case 'error':
                return 'text-red-800';
            case 'warning':
                return 'text-yellow-800';
            case 'info':
            default:
                return 'text-blue-800';
        }
    };

    return (
        <div
            className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${getBackgroundColor()} animate-slide-in`}
            role="alert"
            aria-live="polite"
        >
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className={`flex-grow ${getTextColor()} text-sm font-medium`}>
                {message}
            </div>
            <button
                onClick={() => onClose(id)}
                className={`flex-shrink-0 ${getTextColor()} hover:opacity-70 transition-opacity`}
                aria-label="閉じる"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <style>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default React.memo(Toast);
