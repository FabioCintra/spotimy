import { useState, useRef, useEffect} from "react";
import "./index.css";
import DownloadMusic from "./components/DownloadMusic.jsx";
import ScreenLoading from "./components/ScreenLoading.jsx";
import Menu from "./components/Menu.jsx";
import SongsProvider from "./store/SongsContext.jsx";

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  function handleLoading(){
    setIsLoading(false);
  }

  useEffect(() => {
    async function loading(){
      await esperar(5000);
      handleLoading();
    }
    loading();
  },[]);

  return (
    <SongsProvider>
      {isLoading 
        ? <ScreenLoading />
        : <Menu />
      }
    </SongsProvider>
  );
}

export default App;
