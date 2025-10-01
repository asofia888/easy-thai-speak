import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = '読み込み中...',
  fullScreen = false
}) => {
  const containerClass = fullScreen
    ? 'min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="inline-block">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingFallback;
