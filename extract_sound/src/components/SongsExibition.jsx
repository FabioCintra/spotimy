import { useEffect, useRef, useState } from "react";

export default function SongsExibition({ song }) {
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const [scrollAmount, setScrollAmount] = useState(0);

    useEffect(() => {
        if (textRef.current && containerRef.current) {
            const diff = containerRef.current.clientWidth - textRef.current.scrollWidth;
            if (diff < 0) {
                // O valor negativo é quanto precisamos mover para a esquerda
                setScrollAmount(diff - 20); // -20 para dar uma folguinha no final
            } else {
                setScrollAmount(0);
            }
        }
    }, [song.name]);

    const formatDuration = (seconds) => {
        if (!seconds || seconds <= 0) return "--:--";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <button 
            className="w-full bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-md p-3 flex flex-col items-start group"
            style={{ "--scroll-amount": `${scrollAmount}px` }}
        >
            <div ref={containerRef} className="w-full overflow-hidden whitespace-nowrap">
                <span 
                    ref={textRef}
                    className={`text-white text-[15px] font-medium block ${scrollAmount !== 0 ? 'animate-marquee' : ''}`}
                >
                    {song.name.replace(".webm", "").replace(".mp3", "")}
                </span>
            </div>
            <span className="text-gray-400 text-[12px]">
                {formatDuration(song.duration)}
            </span>
        </button>
    );
}
