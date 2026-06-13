import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import SongsExibition from "./SongsExibition";

export default function ListSongs({loading}) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function getSongs() {
            try {
                const response = await invoke("get_songs");
                console.log(response);
                setSongs(response);
            } catch (error) {
                console.error("Erro ao carregar músicas:", error);
                setSongs([]);
            }
            finally{
                loading(false);
            }
        }
        getSongs();
    }, []);

    return (
        <div className="w-full h-full flex flex-col gap-5 p-4 pt-24 overflow-y-auto">
            {!songs || songs.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 gap-4 opacity-60">
                    <svg 
                        className="animate-fly w-16 h-16 fill-current text-white" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M12,2C11.45,2 11,2.45 11,3C11,3.31 11.14,3.59 11.36,3.78L7.42,7.72C6.54,7.26 5.45,7.37 4.71,8.11C3.73,9.08 3.73,10.67 4.71,11.64C5.45,12.38 6.54,12.5 7.42,12.03L11,15.61V17H13V15.61L16.58,12.03C17.46,12.5 18.55,12.38 19.29,11.64C20.27,10.67 20.27,9.08 19.29,8.11C18.55,7.37 17.46,7.26 16.58,7.72L12.64,3.78C12.86,3.59 13,3.31 13,3C13,2.45 12.55,2 12,2M12,5.41L15.17,8.58C14.71,8.68 14.3,8.94 14.05,9.32L12,7.27L9.95,9.32C9.7,8.94 9.29,8.68 8.83,8.58L12,5.41M6.12,9.52C6.32,9.52 6.5,9.6 6.64,9.73C6.92,10 6.92,10.45 6.64,10.73C6.5,10.86 6.32,10.94 6.12,10.94C5.93,10.94 5.75,10.86 5.61,10.73C5.33,10.45 5.33,10 5.61,9.73C5.75,9.6 5.93,9.52 6.12,9.52M17.88,9.52C18.07,9.52 18.25,9.6 18.39,9.73C18.67,10 18.67,10.45 18.39,10.73C18.25,10.86 18.07,10.94 17.88,10.94C17.68,10.94 17.5,10.86 17.36,10.73C17.08,10.45 17.08,10 17.36,9.73C17.5,9.6 17.68,9.52 17.88,9.52M11,18V20H13V18H11M11,21V22H13V21H11Z" />
                    </svg>
                    <p className="text-white font-medium text-lg tracking-wider">Silêncio... Nenhuma música encontrada</p>
                </div>
            ) : (
                songs.map((song, index) => (
                    <SongsExibition key={index} song={song} />
                ))
            )}
        </div>
    );
}
