import React from 'react';

interface BackIconProps {
    className?: string;
}

const BackIcon: React.FC<BackIconProps> = ({ className = 'w-6 h-6' }) => {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
    );
};

export default BackIcon;
