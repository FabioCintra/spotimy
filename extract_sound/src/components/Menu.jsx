import { useState } from "react";
import SpotiMy from "./SpotiMy";
import DownloadMusic from "./DownloadMusic";
import LoadingCircle from "./LoadingCircle";
import ListSongs from "./ListSongs";

export default function Menu() {
    const [actualScreen, setActualScreen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function handleActualScreen(screen) {
        setIsLoading(true);
        setActualScreen(screen);
    }

    return (
        <div className="h-screen w-screen bg-[#121212] flex items-center justify-center font-sans">
            {isLoading && <LoadingCircle />}
            {!actualScreen ? (
                <div className="flex flex-col sm:flex-row gap-8 p-4 animate-in fade-in zoom-in duration-500">
                    <button
                        onClick={() => handleActualScreen("DownloadMusic")}
                        className="group relative w-64 h-64 bg-[#1e1e1e] border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-110 hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500 transition-colors duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-200 group-hover:text-white">Baixar Música</span>
                        <p className="text-xs text-gray-500 text-center px-4">Converta links do YouTube para MP3</p>
                    </button>

                    <button
                        onClick={() => handleActualScreen("ListSongs")}
                        className="group relative w-64 h-64 bg-[#1e1e1e] border border-white/5 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-110 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500 group-hover:text-black transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-200 group-hover:text-white">Minhas Músicas</span>
                        <p className="text-xs text-gray-500 text-center px-4">Gerencie sua biblioteca local</p>
                    </button>
                </div>
            ) : (
                <div className="w-full h-full relative">
                    <button 
                        onClick={() => setActualScreen(null)}
                        className="absolute top-6 left-6 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all duration-300"
                        title="Voltar ao Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    {actualScreen === "ListSongs" && <ListSongs loading={setIsLoading} onSelect={() => setActualScreen("SpotiMy")} />}
                    {actualScreen === "DownloadMusic" && <DownloadMusic loading={setIsLoading} />}
                    {actualScreen === "SpotiMy" && <SpotiMy loading={setIsLoading} />}
                </div>
            )}
        </div>
    );
}
