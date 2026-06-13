export default function LoadingCircle(){
    return(
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(34,197,94,0.3)]"></div>
            </div>
        </div>
    );
}