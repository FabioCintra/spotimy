import React, { useContext, useEffect } from 'react';
import { SongContext } from '../store/SongsContext';

export default function SpotiMy({ loading }) {
    const { 
        allSongs, 
        currentIndex, 
        isPlaying, 
        currentTime, 
        togglePlay, 
        nextSong, 
        prevSong, 
        seek,
        stop
    } = useContext(SongContext);

    const currentSong = allSongs[currentIndex];

    useEffect(() => {
        if (loading) loading(false);

        // Cleanup function: para a música quando sai da tela
        return () => {
            stop();
        };
    }, [loading, stop]);

    const formatTime = (seconds) => {
        if (!seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * currentSong.duration;
        seek(newTime);
    };

    if (!currentSong) return <div className="h-screen bg-black text-white flex items-center justify-center">Nenhuma música selecionada</div>;

    const progress = (currentTime / currentSong.duration) * 100 || 0;

    return (
        <div className="h-screen bg-black text-white flex flex-col justify-end animate-in fade-in duration-500">
            <header className="flex-1 flex flex-col items-center justify-center p-10 gap-6">
                <div className="w-72 h-72 bg-gradient-to-br from-gray-700 to-black shadow-2xl rounded-lg flex items-center justify-center overflow-hidden relative group">
                    <svg className="w-32 h-32 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold truncate max-w-xs">{currentSong.name.replace(".webm", "").replace(".mp3", "")}</h1>
                    <p className="text-gray-400">Tocando agora</p>
                </div>
            </header>

            <footer className="bg-[#121212] border-t border-white/5 p-6 flex flex-col items-center gap-4">
                {/* Progress Bar */}
                <div className="w-full max-w-2xl flex items-center space-x-4">
                    <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={progress}
                        onChange={handleProgressChange}
                        className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
                    />
                    <span className="text-xs text-gray-400 w-10">{formatTime(currentSong.duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-8 mb-4">
                    <button onClick={prevSong} className="text-gray-400 hover:text-white transition-all transform hover:scale-110 active:scale-95">
                        <SkipBackIcon size={32} />
                    </button>
                    
                    <button 
                        onClick={togglePlay}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all active:scale-95 shadow-lg"
                    >
                        {!isPlaying ? <PlayIcon fill="black" size={28} /> : <PauseIcon fill="black" size={28} />}
                    </button>

                    <button onClick={nextSong} className="text-gray-400 hover:text-white transition-all transform hover:scale-110 active:scale-95">
                        <SkipForwardIcon size={32} />
                    </button>
                </div>
            </footer>
        </div>
    );
}

const PlayIcon = ({ size = 24, fill = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M7 6V18L17 12L7 6Z" />
    </svg>
);

const PauseIcon = ({ size = 24, fill = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
        <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" />
    </svg>
);

const SkipBackIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" />
    </svg>
);

const SkipForwardIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 18L14.5 12L6 6V18ZM16 6V18H18V6H16Z" />
    </svg>
);
