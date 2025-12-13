import React from 'react';

export const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Background Glow Layer */}
            <div className="absolute inset-0 bg-violet-600 blur-xl opacity-40 rounded-full" />

            {/* The SVG */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 w-full h-full drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="chipGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#5b21b6" />
                    </linearGradient>
                </defs>

                {/* Chip Body */}
                <rect x="20" y="20" width="60" height="60" rx="14" fill="url(#chipGradient)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                {/* Circuit Pins (Stylized) */}
                <path d="M50 12V20 M50 80V88 M12 50H20 M80 50H88" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />

                {/* Inner Tech Pattern */}
                <path d="M28 28 L34 28 M72 28 L66 28 M28 72 L34 72 M72 72 L66 72" stroke="white" strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round" />

                {/* The AI "Eye/Core" */}
                <path d="M50 35L65 50L50 65L35 50L50 35Z" fill="white" className="animate-pulse" />
                <circle cx="50" cy="50" r="4" fill="#6d28d9" />
            </svg>
        </div>
    );
};