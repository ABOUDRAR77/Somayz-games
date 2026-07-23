import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fakeUsers = [
    // North America
    { name: "Alex", country: "US", time: "2 sec ago" },
    { name: "Jake", country: "US", time: "5 sec ago" },
    { name: "Ryan", country: "US", time: "8 sec ago" },
    { name: "Tyler", country: "US", time: "11 sec ago" },
    { name: "Brandon", country: "US", time: "14 sec ago" },
    { name: "Dylan", country: "CA", time: "17 sec ago" },
    { name: "Ethan", country: "CA", time: "20 sec ago" },
    { name: "Logan", country: "CA", time: "23 sec ago" },
    { name: "Mason", country: "CA", time: "26 sec ago" },
    
    // Europe
    { name: "Mohamed", country: "UK", time: "3 sec ago" },
    { name: "Omar", country: "UK", time: "6 sec ago" },
    { name: "Kai", country: "DE", time: "9 sec ago" },
    { name: "Lukas", country: "DE", time: "12 sec ago" },
    { name: "Felix", country: "DE", time: "15 sec ago" },
    { name: "Hugo", country: "FR", time: "18 sec ago" },
    { name: "Louis", country: "FR", time: "21 sec ago" },
    { name: "Adrien", country: "FR", time: "24 sec ago" },
    { name: "Marco", country: "IT", time: "27 sec ago" },
    { name: "Luca", country: "IT", time: "30 sec ago" },
    { name: "Mateo", country: "ES", time: "33 sec ago" },
    { name: "Sergio", country: "ES", time: "36 sec ago" },
    { name: "Kacper", country: "PL", time: "39 sec ago" },
    { name: "Nikolaj", country: "DK", time: "42 sec ago" },
    { name: "Emil", country: "SE", time: "45 sec ago" },
    { name: "Oliver", country: "NO", time: "48 sec ago" },
    { name: "Daan", country: "NL", time: "51 sec ago" },
    { name: "Bram", country: "NL", time: "54 sec ago" },
    { name: "Finn", country: "BE", time: "57 sec ago" },
    
    // Latin America (Brazil + others)
    { name: "Lucas", country: "BR", time: "4 sec ago" },
    { name: "Gabriel", country: "BR", time: "7 sec ago" },
    { name: "Enzo", country: "BR", time: "10 sec ago" },
    { name: "Matheus", country: "BR", time: "13 sec ago" },
    { name: "Rafael", country: "BR", time: "16 sec ago" },
    { name: "Thiago", country: "BR", time: "19 sec ago" },
    { name: "João", country: "BR", time: "22 sec ago" },
    { name: "Pedro", country: "BR", time: "25 sec ago" },
    { name: "Gustavo", country: "BR", time: "28 sec ago" },
    { name: "Bruno", country: "BR", time: "31 sec ago" },
    { name: "Carlos", country: "MX", time: "34 sec ago" },
    { name: "Diego", country: "MX", time: "37 sec ago" },
    { name: "Juan", country: "AR", time: "40 sec ago" },
    { name: "Santiago", country: "AR", time: "43 sec ago" },
    { name: "Sebastián", country: "CL", time: "46 sec ago" },
    { name: "Andrés", country: "CO", time: "49 sec ago" },
    { name: "José", country: "PE", time: "52 sec ago" },
    
    // Middle East
    { name: "Hassan", country: "SA", time: "6 sec ago" },
    { name: "Ahmed", country: "SA", time: "9 sec ago" },
    { name: "Youssef", country: "SA", time: "12 sec ago" },
    { name: "Khaled", country: "SA", time: "15 sec ago" },
    { name: "Omar", country: "AE", time: "18 sec ago" },
    { name: "Abdullah", country: "AE", time: "21 sec ago" },
    { name: "Mustafa", country: "TR", time: "24 sec ago" },
    { name: "Kerem", country: "TR", time: "27 sec ago" },
    { name: "Yusuf", country: "TR", time: "30 sec ago" },
    { name: "Amir", country: "IR", time: "33 sec ago" },
    { name: "Reza", country: "IR", time: "36 sec ago" },
    
    // Asia
    { name: "Yuki", country: "JP", time: "5 sec ago" },
    { name: "Haruto", country: "JP", time: "8 sec ago" },
    { name: "Riku", country: "JP", time: "11 sec ago" },
    { name: "Min-jun", country: "KR", time: "14 sec ago" },
    { name: "Seo-jun", country: "KR", time: "17 sec ago" },
    { name: "Wei", country: "CN", time: "20 sec ago" },
    { name: "Hao", country: "CN", time: "23 sec ago" },
    { name: "Arjun", country: "IN", time: "26 sec ago" },
    { name: "Rohan", country: "IN", time: "29 sec ago" },
    { name: "Vikram", country: "IN", time: "32 sec ago" },
    { name: "Raj", country: "IN", time: "35 sec ago" },
    { name: "Minh", country: "VN", time: "38 sec ago" },
    { name: "Tuan", country: "VN", time: "41 sec ago" },
    { name: "Nat", country: "TH", time: "44 sec ago" },
    { name: "Pong", country: "TH", time: "47 sec ago" },
    { name: "Fahad", country: "PK", time: "50 sec ago" },
    { name: "Bilal", country: "PK", time: "53 sec ago" },
    { name: "Dimitri", country: "RU", time: "56 sec ago" },
    { name: "Ivan", country: "RU", time: "59 sec ago" },
    
    // Africa
    { name: "Kwame", country: "GH", time: "7 sec ago" },
    { name: "Kofi", country: "GH", time: "10 sec ago" },
    { name: "Chinedu", country: "NG", time: "13 sec ago" },
    { name: "Emeka", country: "NG", time: "16 sec ago" },
    { name: "Tendai", country: "ZW", time: "19 sec ago" },
    { name: "Thabo", country: "ZA", time: "22 sec ago" },
    { name: "Siyabonga", country: "ZA", time: "25 sec ago" },
    { name: "Amara", country: "KE", time: "28 sec ago" },
    
    // Oceania
    { name: "Liam", country: "AU", time: "9 sec ago" },
    { name: "Noah", country: "AU", time: "12 sec ago" },
    { name: "Jackson", country: "AU", time: "15 sec ago" },
    { name: "Aiden", country: "NZ", time: "18 sec ago" },
    { name: "Leo", country: "NZ", time: "21 sec ago" },
];

const countryFlags = {
    // North America
    US: "🇺🇸", CA: "🇨🇦", MX: "🇲🇽",
    // South America
    BR: "🇧🇷", AR: "🇦🇷", CL: "🇨🇱", CO: "🇨🇴", PE: "🇵🇪",
    // Europe
    UK: "🇬🇧", DE: "🇩🇪", FR: "🇫🇷", IT: "🇮🇹", ES: "🇪🇸", 
    PL: "🇵🇱", DK: "🇩🇰", SE: "🇸🇪", NO: "🇳🇴", NL: "🇳🇱", BE: "🇧🇪",
    // Middle East
    SA: "🇸🇦", AE: "🇦🇪", TR: "🇹🇷", IR: "🇮🇷", PK: "🇵🇰",
    // Asia
    JP: "🇯🇵", KR: "🇰🇷", CN: "🇨🇳", IN: "🇮🇳", VN: "🇻🇳", TH: "🇹🇭", RU: "🇷🇺",
    // Africa
    GH: "🇬🇭", NG: "🇳🇬", ZW: "🇿🇼", ZA: "🇿🇦", KE: "🇰🇪",
    // Oceania
    AU: "🇦🇺", NZ: "🇳🇿",
};

const getRealisticTime = () => {
    const options = ["just now", "1m ago", "2m ago", "3m ago", "5m ago"];
    // 60% chance it says "just now" for high urgency
    return Math.random() > 0.4 ? options[0] : options[Math.floor(Math.random() * options.length)];
};

export default function RealSocialProof() {
    const [visibleNotification, setVisibleNotification] = useState(null);
    const timeoutRef = useRef(null);

    // Core loop function to handle showing and hiding
    const triggerNotificationLoop = () => {
        // 1. Pick a random user and attach a freshly generated timestamp
        const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
        setVisibleNotification({
            ...randomUser,
            displayTime: getRealisticTime()
        });

        // 2. Hide the notification after 4 seconds
        timeoutRef.current = setTimeout(() => {
            setVisibleNotification(null);

            // 3. Queue up the next notification after a natural, random delay (5 to 12 seconds)
            const nextDelay = 5000 + Math.random() * 7000;
            timeoutRef.current = setTimeout(triggerNotificationLoop, nextDelay);
        }, 4000);
    };

    useEffect(() => {
        // Initial delay before the very first popup (3 seconds)
        timeoutRef.current = setTimeout(triggerNotificationLoop, 3000);

        // Crucial: Clear all pending timeouts when the component unmounts
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <AnimatePresence>
            {visibleNotification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 20, stiffness: 150 }}
                    className="fixed bottom-6 right-6 z-50 max-w-xs w-full sm:w-72"
                >
                    <div className="bg-white border border-gray-100 shadow-2xl rounded-xl p-3.5 flex items-center gap-3">
                        {/* Status Icon with a subtle ping pulse animation */}
                        <div className="relative w-9 h-9 bg-emerald-50 rounded-full flex items-center justify-center shrink-0">
                            <span className="absolute top-0 right-0 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        
                        <div className="flex-1 min-w-0 text-left">
                            <p className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                                <span className="truncate">{visibleNotification.name}</span>
                                <span className="shrink-0">{countryFlags[visibleNotification.country]}</span>
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                just downloaded the game
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                {visibleNotification.displayTime}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}