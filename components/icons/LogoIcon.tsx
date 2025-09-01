import React from 'react';

const LogoIcon = ({ className }: { className?: string }) => (
    <img
        src="/logo.jpg"
        alt="Easy Thai Speak Logo"
        className={`${className} rounded-lg object-cover`}
        aria-hidden="true"
    />
);

export default LogoIcon;