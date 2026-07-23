import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { allGames } from "../data/data";
import ContentLocker from "./ContentLocker";
import FakeSocialProof from "./FakeSocialProof";
import FakeLiveCounter from "./FakeLiveCounter";

export default function GameDetail() {
    const { slug } = useParams();
    const game = allGames.find((g) => g.slug === slug) || allGames[0];

    const [lockerOpen, setLockerOpen] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    const handleDownload = () => {
        if (unlocked) {
            window.location.href = `${game.downloadLink}`;
        } else {
            setLockerOpen(true);
        }
    };

    const handleUnlock = () => {
        setUnlocked(true);
        setLockerOpen(false);
        setTimeout(() => {
            window.location.href = `${game.downloadLink}`;
        }, 500);
    };

    const features = [
        { label: "Mod Menu", value: "Included", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
        { label: "File Size", value: "1.4 GB", icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" },
        { label: "Version", value: "Latest", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
        { label: "Online", value: "Supported", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    ];

    return (
        <div className="pt-28 pb-20 px-4 md:px-12 max-w-6xl mx-auto">
            <ContentLocker
                isOpen={lockerOpen}
                onClose={() => setLockerOpen(false)}
                onUnlock={handleUnlock}
                game={game}
            />

            {/* Fake Social Proof Popup */}
            <FakeSocialProof />

            {/* Back */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-10 text-sm font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to games
                </Link>
            </motion.div>

            {/* Hero */}
            <motion.div
                className="grid md:grid-cols-2 gap-12 items-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Image */}
                <div className={`${game.color} rounded-[2.5rem] p-8 flex items-center justify-center aspect-square relative`}>
                    <div className="absolute top-6 left-6 bg-black text-white text-sm font-bold px-4 py-2 rounded-full">
                        Rank #{game.rank}
                    </div>
                    {game.img ? (
                        <img src={game.img} alt={game.title} className="w-4/5 h-4/5 object-contain drop-shadow-2xl" />
                    ) : (
                        <div className="text-9xl">🎮</div>
                    )}
                </div>

                {/* Info */}
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 text-xs font-semibold mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Verified &amp; Working
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{game.title}</h1>

                    <p className="text-gray-500 dark:text-zinc-400 text-lg mb-6 leading-relaxed">
                        Download the fully modded APK with unlimited resources, unlocked skins, and online multiplayer support.
                    </p>

                    {/* FAKE LIVE COUNTER */}
                    <div className="mb-6">
                        <FakeLiveCounter />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={handleDownload}
                            className="bg-black dark:bg-violet-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 dark:hover:bg-violet-500 active:scale-95 transition-all flex items-center gap-3"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {unlocked ? "Download Now" : "Download APK"}
                        </button>

                        <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 font-semibold">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            100% Secure
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {features.map((feat, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-zinc-900 dark:border dark:border-white/10 rounded-3xl p-6 text-center border border-gray-100">
                        <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <svg className="w-5 h-5 text-gray-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feat.icon} />
                            </svg>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider mb-1">{feat.label}</div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{feat.value}</div>
                    </div>
                ))}
            </motion.div>

            {/* How to Download */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gray-50 dark:bg-zinc-900 dark:border dark:border-white/10 rounded-[2rem] p-8 md:p-12 mb-20"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">How to download</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Click Download", desc: "Tap the download button above to start the unlock process." },
                        { step: "02", title: "Complete Offer", desc: "Finish one quick sponsor offer. It takes 1–2 minutes and verifies you are human." },
                        { step: "03", title: "Install & Play", desc: "The APK unlocks automatically. Allow unknown sources and install." },
                    ].map((item, i) => (
                        <div key={i} className="text-center">
                            <div className="text-5xl font-bold text-gray-200 dark:text-zinc-700 mb-4">{item.step}</div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <button
                        onClick={handleDownload}
                        className="bg-black dark:bg-violet-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-800 dark:hover:bg-violet-500 active:scale-95 transition-all inline-flex items-center gap-3"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {unlocked ? "Start Download" : "Unlock Download"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}