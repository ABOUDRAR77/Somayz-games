import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    CheckCircle,
    ExternalLink,
    Loader2,
    AlertCircle,
    X,
    Zap,
    CircleDot,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";
import useOfferVerification from "../hooks/useOfferVerification";
import useAnalyticsEvent from "../hooks/useAnalyticsEvent";
import { trackEvent } from "../lib/analytics";
import { createPortal } from "react-dom";

const WORKER_URL = "https://delicate-waterfall-ba89.abdelhakaboudrar98.workers.dev/";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function OfferSkeleton() {
    return (
        <div className="w-full flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-white/10 shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-white/10 rounded-full w-2/3" />
                <div className="h-2 bg-white/5 rounded-full w-1/3" />
            </div>
            <div className="w-4 h-4 rounded bg-white/10 shrink-0" />
        </div>
    );
}

function OfferItem({ offer, index, onOfferClick, completed }) {
    return (
        <motion.button
            key={offer.id}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onOfferClick(offer, index)}
            disabled={completed}
            className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                "border-white/10 bg-white/5 hover:bg-violet-500/20 hover:border-violet-400/40",
                completed && "opacity-40 cursor-not-allowed"
            )}
        >
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 overflow-hidden shrink-0">
                <img
                    src={offer.network_icon || ""}
                    className="w-full h-full object-cover"
                    alt=""
                    loading="lazy"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-white truncate group-hover:text-violet-200 transition-colors">
                    {offer.name || ""}
                </h3>
                <p className="text-[10px] text-zinc-400 truncate uppercase font-medium tracking-wide">
                    {offer.anchor || "Click to verify"}
                </p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors shrink-0" />
        </motion.button>
    );
}

const ContentLocker = ({ onUnlock, isOpen, onClose, game }) => {
    const [mounted, setMounted] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [userId, setUserId] = useState(null);
    const [offers, setOffers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { sendEvent } = useAnalyticsEvent();

    useEffect(() => {
        setMounted(true);
        let stored = localStorage.getItem("content_locker_user_id");
        if (!stored) {
            stored = `user_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem("content_locker_user_id", stored);
        }
        setUserId(stored);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            trackEvent("locker_impression", {
                game_slug: game?.slug || "",
                game_name: game?.title || "",
                user_id: userId,
                content_type: "offer_wall",
            });

            setIsLoading(true);
            fetch(WORKER_URL, { cache: "force-cache" })
                .then((r) => {
                    if (!r.ok) throw new Error("Failed");
                    return r.json();
                })
                .then((data) => {
                    setOffers(data);
                    setIsError(false);
                })
                .catch(() => setIsError(true))
                .finally(() => setIsLoading(false));
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen, userId, game]);

    const isVerified = useOfferVerification(userId, verifying);

    useEffect(() => {
        if (isVerified && !completed) {
            setVerifying(false);
            setCompleted(true);
            sendEvent("locker_unlock", { user_id: userId }, "ContentLocker");
            setTimeout(() => {
                onUnlock();
            }, 1500);
        }
    }, [isVerified, completed, onUnlock, userId, sendEvent]);

    const handleOfferClick = useCallback((offer, index) => {
        if (!userId) return;

        const trackedUrl = `${offer.url}${offer.url.includes("?") ? "&" : "?"}sub1=${userId}`;
        window.open(trackedUrl, "_blank");
        setVerifying(true);

        trackEvent("offer_click", {
            offer_id: offer.id || "",
            offer_name: offer.name || "Unknown Offer",
            offer_network: offer.anchor || "",
            offer_position: index + 1,
            game_slug: game?.slug || "",
            game_name: game?.title || "",
            user_id: userId,
            content_type: "offer_wall",
        });

        sendEvent("offer_click", { offer_name: offer.name, game_slug: game?.slug }, "ContentLocker");
    }, [userId, game, sendEvent]);

    const bgImage = game?.img || "";

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[34343] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}
                >
                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 24 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.88, opacity: 0, y: 24 }}
                        transition={{ type: "spring", damping: 24, stiffness: 320 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm rounded-2xl overflow-hidden relative max-h-[88vh] overflow-y-auto"
                        style={{
                            background: "linear-gradient(145deg, #18181b 0%, #0f0f12 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(139,92,246,0.15)",
                        }}
                    >
                        {/* Ambient glow */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(139,92,246,0.12) 0%, transparent 70%)",
                            }}
                        />

                        {/* Close */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-all z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Header */}
                        <div
                            className="p-5 border-b border-white/8 text-center relative overflow-hidden"
                            style={{
                                backgroundImage: bgImage
                                    ? `var(--locker-header-gradient, linear-gradient(rgba(24,24,27,0.92),rgba(24,24,27,0.98))), url(${bgImage})`
                                    : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="relative z-10">
                                {/* Game title badge */}
                                {game?.title && (
                                    <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-3 py-1 text-[10px] font-semibold text-zinc-300 mb-3 uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                                        {game.title}
                                    </div>
                                )}

                                <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
                                    style={{
                                        background: completed
                                            ? "linear-gradient(135deg,#22c55e,#16a34a)"
                                            : "linear-gradient(135deg,#7c3aed,#4f46e5)",
                                        boxShadow: completed
                                            ? "0 8px 24px rgba(34,197,94,0.35)"
                                            : "0 8px 24px rgba(124,58,237,0.45)",
                                    }}
                                >
                                    {completed ? (
                                        <CheckCircle className="w-7 h-7 text-white" />
                                    ) : (
                                        <Lock className="w-7 h-7 text-white" />
                                    )}
                                </div>

                                <h2 className="text-lg font-bold mb-1 text-white">
                                    {completed ? "Access Granted!" : "Unlock Your Download"}
                                </h2>
                                {!completed && (
                                    <p className="text-zinc-400 text-xs max-w-[220px] mx-auto leading-relaxed">
                                        Complete one quick task to get instant free access.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-4 space-y-3">
                            {completed ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-3 py-6 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                        style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)", boxShadow: "0 8px 24px rgba(34,197,94,0.4)" }}>
                                        <CheckCircle className="w-9 h-9 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-base text-white">Download Unlocked!</p>
                                        <p className="text-xs text-zinc-400 mt-1">Starting your download now…</p>
                                    </div>
                                    <Loader2 className="w-4 h-4 animate-spin text-violet-400 mt-1" />
                                </motion.div>
                            ) : (
                                <>
                                    {/* Steps card */}
                                    <div className="rounded-xl p-3 relative overflow-hidden"
                                        style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>
                                        <div className="absolute top-0 right-0 p-2 opacity-20">
                                            <Zap className="w-8 h-8 text-violet-400" />
                                        </div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-2.5 flex items-center gap-1.5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-400" />
                                            </span>
                                            How It Works
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {[
                                                "Pick any task from the list below",
                                                "Complete the full task instructions",
                                                "Download unlocks instantly — no waiting",
                                            ].map((text, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-[11px] text-zinc-300 leading-tight"
                                                >
                                                    <span className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 text-[9px] font-bold"
                                                        style={{ background: "rgba(139,92,246,0.3)", color: "#a78bfa" }}>
                                                        {i + 1}
                                                    </span>
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Task header */}
                                    <div className="flex items-center justify-between px-0.5">
                                        <h4 className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest flex items-center gap-1.5">
                                            <CircleDot className="w-2.5 h-2.5 text-green-400" />
                                            Available Tasks
                                        </h4>
                                        <span className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                                            style={{ background: "rgba(34,197,94,0.15)", color: "#86efac" }}>
                                            Live Now
                                        </span>
                                    </div>

                                    {/* Offers list */}
                                    <div className="space-y-2">
                                        {isLoading ? (
                                            <>
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                            </>
                                        ) : isError ? (
                                            <div className="flex flex-col items-center gap-2.5 py-6 text-center">
                                                <AlertCircle className="w-7 h-7 text-red-400" />
                                                <p className="text-xs text-zinc-400">Could not load tasks. Check your connection.</p>
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors"
                                                    style={{ background: "rgba(255,255,255,0.08)", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.1)" }}
                                                >
                                                    <RefreshCw className="w-3 h-3" /> Retry
                                                </button>
                                            </div>
                                        ) : (
                                            offers?.slice(0, 4).map((offer, index) => (
                                                <OfferItem
                                                    key={offer.id}
                                                    offer={offer}
                                                    index={index}
                                                    onOfferClick={handleOfferClick}
                                                    completed={completed}
                                                />
                                            ))
                                        )}
                                    </div>

                                    {verifying && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center gap-2 justify-center rounded-xl px-3 py-2.5"
                                            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
                                        >
                                            <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-400" />
                                            <span className="text-[10px] font-semibold text-violet-300">
                                                Verifying your completion…
                                            </span>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-3 flex items-center justify-between"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.3)" }}>
                            <div className="flex items-center gap-1.5">
                                {verifying ? (
                                    <Loader2 className="w-2.5 h-2.5 animate-spin text-violet-400" />
                                ) : (
                                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${completed ? "bg-green-400" : "bg-yellow-400"}`} />
                                )}
                                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                                    Status:{" "}
                                    <span className={completed ? "text-green-400" : verifying ? "text-violet-400" : "text-zinc-400"}>
                                        {verifying ? "Verifying…" : completed ? "Unlocked ✓" : "Awaiting"}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-600">
                                <ShieldCheck className="w-3 h-3" />
                                <span className="text-[9px] font-medium">Secure & Safe</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ContentLocker;