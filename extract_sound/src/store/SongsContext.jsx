import { createContext, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

export const SongContext = createContext({
    allSongs: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    setSongs: () => {},
    setIndex: () => {},
    togglePlay: () => {},
    nextSong: () => {},
    prevSong: () => {},
    seek: (time) => {},
    stop: () => {}
});

export default function SongsProvider({ children }) {
    const [songs, setSongs] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    
    const audioRef = useRef(new Audio());

    const nextSong = useCallback(() => {
        if (songs.length === 0) return;
        setIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    }, [songs.length]);

    const prevSong = useCallback(() => {
        if (songs.length === 0) return;
        setIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    }, [songs.length]);

    useEffect(() => {
        const audio = audioRef.current;
        const updateTime = () => setCurrentTime(audio.currentTime);
        const onEnded = () => nextSong();

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("ended", onEnded);
        };
    }, [nextSong]);

    useEffect(() => {
        if (songs.length > 0 && songs[index]) {
            try {
                const cleanPath = songs[index].path.replace(/\\/g, "/");
                const assetUrl = convertFileSrc(cleanPath);
                
                if (audioRef.current.src !== assetUrl) {
                    audioRef.current.src = assetUrl;
                    audioRef.current.load();
                }

                if (isPlaying) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(e => {
                            if (e.name !== "AbortError") {
                                console.error("Erro real ao tocar:", e);
                            }
                        });
                    }
                } else {
                    audioRef.current.pause();
                }
            } catch (err) {
                console.error("Erro ao processar áudio:", err);
            }
        }
    }, [index, songs, isPlaying]);

    const handleSongs = useCallback((songsList) => {
        setSongs(songsList);
    }, []);

    const handleIndex = useCallback((newIndex) => {
        setIndex(newIndex);
        setIsPlaying(true);
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Erro ao tocar áudio:", e));
        }
        setIsPlaying(prev => !prev);
    }, [isPlaying]);

    const seek = useCallback((time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }, []);

    const stop = useCallback(() => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    }, []);

    const ctxSong = useMemo(() => ({
        allSongs: songs,
        currentIndex: index,
        isPlaying,
        currentTime,
        setSongs: handleSongs,
        setIndex: handleIndex,
        togglePlay,
        nextSong,
        prevSong,
        seek,
        stop
    }), [songs, index, isPlaying, currentTime, handleSongs, handleIndex, togglePlay, nextSong, prevSong, seek, stop]);

    return (
        <SongContext.Provider value={ctxSong}>
            {children}
        </SongContext.Provider>
    );
}
