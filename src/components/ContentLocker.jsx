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
} from "lucide-react";
import useOfferVerification from "../hooks/useOfferVerification";
import useAnalyticsEvent from "../hooks/useAnalyticsEvent";
import { trackEvent } from "../lib/analytics";
import { createPortal } from "react-dom";

const WORKER_URL = "https://gamewave.mhamed-ouzed.workers.dev/";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function OfferSkeleton() {
    return (
        <div className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 bg-gray-50 animate-pulse">
            <div className="w-8 h-8 rounded-md bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-gray-200 rounded-full w-2/3" />
                <div className="h-2 bg-gray-100 rounded-full w-1/3" />
            </div>
            <div className="w-3.5 h-3.5 rounded bg-gray-200 shrink-0" />
        </div>
    );
}

function OfferItem({ offer, index, onOfferClick, completed }) {
    return (
        <motion.button
            key={offer.id}
            whileHover={{ scale: 1.01, x: 3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOfferClick(offer, index)}
            disabled={completed}
            className={cn(
                "w-full flex items-center gap-3 p-2.5 rounded-lg border border-gray-100",
                "bg-gray-50 hover:bg-gray-100 hover:border-gray-200 transition-all text-left group",
                completed && "opacity-50 cursor-not-allowed"
            )}
        >
            <div className="w-8 h-8 rounded-md bg-white border border-gray-200 overflow-hidden shrink-0">
                <img
                    src={offer.network_icon || ""}
                    className="w-full h-full object-cover"
                    alt=""
                    loading="lazy"
                />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs truncate group-hover:text-gray-900 transition-colors">
                    {offer.name || ""}
                </h3>
                <p className="text-[9px] text-gray-400 truncate uppercase font-medium">
                    {offer.anchor || "Click to verify"}
                </p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
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
                    className="fixed inset-0 z-[34343] flex items-center justify-center p-3 bg-black/70 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 22, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden relative max-h-[85vh] overflow-y-auto"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-gray-500 hover:text-black transition-colors z-10"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Header */}
                        <div
                            className="p-4 border-b border-gray-100 text-center relative overflow-hidden"
                            style={{
                                backgroundImage: bgImage
                                    ? `linear-gradient(rgba(255,255,255,0.92),rgba(255,255,255,0.98)), url(${bgImage})`
                                    : "none",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="relative z-10">
                                <div className="mx-auto w-12 h-12 bg-gray-50 rounded-xl border-2 border-gray-200 flex items-center justify-center mb-2 shadow-sm">
                                    {completed ? (
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Lock className="w-6 h-6 text-gray-900" />
                                    )}
                                </div>
                                <h2 className="text-base font-bold mb-0.5 text-gray-900">
                                    {completed ? "Verified!" : "Verification Required"}
                                </h2>
                                {!completed && (
                                    <p className="text-gray-500 text-[11px] max-w-[220px] mx-auto">
                                        Complete one task to unlock your free download.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-3 space-y-2">
                            {completed ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center gap-2 py-4 text-center"
                                >
                                    <CheckCircle className="w-10 h-10 text-green-500" />
                                    <div>
                                        <p className="font-bold text-base text-gray-900">
                                            Download Unlocked!
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Your download will start in a moment…
                                        </p>
                                    </div>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-900 mt-1" />
                                </motion.div>
                            ) : (
                                <>
                                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-2.5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1.5 opacity-10">
                                            <Zap className="w-6 h-6 text-gray-900" />
                                        </div>
                                        <h3 className="text-[10px] font-bold uppercase tracking-tighter text-gray-900 mb-2 flex items-center gap-1.5">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 opacity-75" />
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-900" />
                                            </span>
                                            Required Actions
                                        </h3>
                                        <ul className="space-y-1.5">
                                            {[
                                                "Select one task from the list below",
                                                "Complete the task instructions fully",
                                                "Verification is automatic — download unlocks instantly",
                                            ].map((text, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-[11px] text-gray-500 leading-tight"
                                                >
                                                    <span className="bg-gray-200 text-gray-700 font-bold rounded w-4 h-4 flex items-center justify-center shrink-0 text-[9px]">
                                                        {i + 1}
                                                    </span>
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between px-0.5">
                                        <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-1.5">
                                            <CircleDot className="w-2.5 h-2.5 text-green-500" />
                                            Task Selection
                                        </h4>
                                        <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                                            Available Now
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        {isLoading ? (
                                            <>
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                                <OfferSkeleton />
                                            </>
                                        ) : isError ? (
                                            <div className="flex flex-col items-center gap-2 py-4 text-center">
                                                <AlertCircle className="w-6 h-6 text-red-500" />
                                                <p className="text-xs text-gray-500">
                                                    Could not load tasks. Check your connection.
                                                </p>
                                                <button
                                                    onClick={() => window.location.reload()}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-gray-200 text-[10px] font-medium hover:bg-gray-50 transition-colors"
                                                >
                                                    <RefreshCw className="w-2.5 h-2.5" /> Retry
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
                                            className="flex items-center gap-1.5 justify-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5"
                                        >
                                            <Loader2 className="w-3 h-3 animate-spin text-gray-900" />
                                            <span className="text-[10px] font-medium text-gray-900">
                                                Verifying your task completion…
                                            </span>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-2 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2">
                            <div className="flex items-center gap-1.5">
                                {verifying ? (
                                    <Loader2 className="w-2.5 h-2.5 animate-spin text-gray-900" />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                )}
                                <span className="text-[9px] font-bold uppercase tracking-tighter text-gray-400">
                                    Status:{" "}
                                    {verifying ? "Verifying…" : completed ? "Unlocked ✓" : "Awaiting Selection"}
                                </span>
                            </div>
                            <div className="h-2.5 w-px bg-gray-200" />
                            <span className="text-[9px] font-mono text-gray-300">
                                v2.5.0
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ContentLocker;