export default function ScreenLoading() {
    return (
        <div className="h-screen bg-[#121212] flex flex-col items-center justify-center text-white font-sans overflow-hidden relative">
            {/* Logo Centralizado */}
            <div className="flex flex-col items-center animate-fade-in">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent animate-pulse select-none">
                    SPOTIMY
                </h1>
                
                {/* Detalhe da barra verde (opcional, estilo Spotify) */}
                <div className="h-1.5 w-12 bg-green-500 rounded-full mt-4 shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
            </div>

            {/* Créditos no rodapé */}
            <footer className="absolute bottom-10 animate-fade-in [animation-delay:0.5s] opacity-0 [animation-fill-mode:forwards]">
                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold">
                    Developed by <span className="text-gray-400">Nesquik</span>
                </p>
            </footer>

            {/* Efeito de luz de fundo suave */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -z-10"></div>
        </div>
    );
}
