import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FakeLiveCounter() {
    const [count, setCount] = useState(47);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                // Randomly go up or down slightly to look real
                const change = Math.random() > 0.7 ? 1 : 0;
                return prev + change;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-400"
        >
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span>
                <span className="font-bold text-gray-900 dark:text-white">{count}</span> people downloading right now
            </span>
        </motion.div>
    );
}