export default function Footer() {
    return (
        <footer className="py-12 px-4 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                    <span>GameWave</span>
                </div>
                <p className="text-gray-500 text-sm">© 2026 GameWave. All rights reserved.</p>
            </div>
        </footer>
    );
}