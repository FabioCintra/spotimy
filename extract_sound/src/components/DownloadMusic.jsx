import { useState, useRef, useEffect, useContext } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { SongContext } from '../store/SongsContext';

export default function DownloadMusic({loading}) {
    const [status, setStatus] = useState("Cole o link para começar");
    const textInput = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const ctxSong = useContext(SongContext);

    useEffect(() => {
        loading(false);
    },[])

    async function sendVideoLink(url) {
        setIsLoading(true);
        setStatus("Processando...");

        if (!url) {
            setStatus("URL inválida!");
            setIsLoading(false);
            return;
        }

        try {
            const value = await invoke("extract_sound", { url });
            setStatus(value);
            ctxSong.setSongs([]);
        } catch (error) {
            setStatus("Erro: " + error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-white font-sans p-4">
            <div className="w-full max-w-xl bg-[#1e1e1e] p-10 rounded-3xl shadow-2xl border border-white/5 space-y-8 flex flex-col items-center">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                        EXTRATOR DE ÁUDIO
                    </h1>
                    <p className="text-gray-400 text-sm">Converta vídeos do YouTube em MP3 instantaneamente</p>
                </div>

                <div className="w-full flex flex-col sm:flex-row gap-3">
                    <input
                        ref={textInput}
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="flex-1 bg-[#2a2a2a] border border-transparent focus:border-green-500 outline-none px-4 py-3 rounded-xl transition-all duration-300 text-sm"
                    />
                    <button
                        className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => sendVideoLink(textInput.current.value)}
                        disabled={isLoading}
                    >
                        {isLoading ? "EXTRAINDO..." : "EXTRAIR"}
                    </button>
                </div>

                <div className="w-full pt-4 border-t border-white/5 text-center">
                    <p className={`text-sm font-medium transition-all duration-500 ${status.includes("Erro") ? "text-red-400" : "text-gray-300"}`}>
                        {status}
                    </p>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
                        <p className="text-green-500 font-bold animate-pulse">PROCESSANDO ÁUDIO...</p>
                    </div>
                </div>
            )}
        </div>
    );
}