import { useState } from "react";
import SpotiMy from "./SpotiMy";
import DownloadMusic from "./DownloadMusic";

export default function Menu(){
    const [actualScreen, setActualScreen] = useState("SportiMy");

    function handlActualScreen(screen){
        setActualScreen(screen);
    }
    return(
        <>
        {!actualScreen
            ? (
                <div>
                    <button>Baixar Musica</button>
                    <button>Minhas Musicas</button>
                </div>
            )
            : (actualScreen === "SportiMy" ? <SpotiMy/> : <DownloadMusic/>)
        }
        </>
        
    );
}