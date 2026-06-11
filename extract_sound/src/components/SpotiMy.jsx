import React, { useState } from 'react';

export default function SpotiMy() {
    const [isPause, setIsPause] = useState(false);

    function handlePause() {
        setIsPause(pause => !pause);
    }

    return (
        <div className="h-screen bg-black text-white flex flex-col justify-end">
            <header className="flex-1 flex items-center justify-center p-10">
                <div className="w-80 h-80 bg-[#282828] shadow-2xl rounded-lg flex items-center justify-center overflow-hidden group relative">
                    <span className="text-gray-500 font-bold text-lg group-hover:hidden transition-all">Sua Música</span>
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center transition-all">
                         <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                            <PlayIcon size={32} />
                         </div>
                    </div>
                </div>
            </header>

            <footer className="bg-[#121212] border-t border-white/5 p-4 flex flex-col items-center">
                {/* Progress Bar Container */}
                <div className="w-full max-w-4xl flex items-center space-x-3 mb-2">
                    <span className="text-[10px] text-gray-400">0:00</span>
                    <div className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer relative group">
                        <div className="absolute left-0 top-0 h-full bg-white group-hover:bg-green-500 rounded-full w-[30%] transition-colors"></div>
                        <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full hidden group-hover:block shadow-md"></div>
                    </div>
                    <span className="text-[10px] text-gray-400">3:45</span>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <SkipBackIcon />
                    </button>
                    
                    <button 
                        onClick={handlePause}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 active:scale-95 shadow-lg"
                    >
                        {isPause ? <PlayIcon fill="black" /> : <PauseIcon fill="black" />}
                    </button>

                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <SkipForwardIcon />
                    </button>
                </div>
            </footer>
        </div>
    );
}

// Simple Icon Components to keep the code clean
const PlayIcon = ({ size = 24, fill = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M7 6V18L17 12L7 6Z" />
    </svg>
);

const PauseIcon = ({ size = 24, fill = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" />
    </svg>
);

const SkipBackIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" />
    </svg>
);

const SkipForwardIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" />
    </svg>
);