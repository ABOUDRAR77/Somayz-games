import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PhoneMockup({ item, index }) {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
        >
            <Link to={`/${item.slug}`} className="block">
                {/* 
                    dark:bg-zinc-900 overrides item.color in dark mode.
                    This works because we use ".dark &" variant in index.css
                    which gives dark: classes higher specificity than regular classes.
                */}
                <div className={`game-card-glow ${item.color} dark:bg-zinc-900 dark:border dark:border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-3 shadow-lg overflow-hidden relative hover:shadow-xl dark:hover:shadow-violet-500/20 transition-shadow`}>
                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-black text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full z-10 shadow-md">
                        #{item.rank}
                    </div>

                    {/* Game Icon */}
                    <div className="rounded-[1rem] md:rounded-[1.5rem] overflow-hidden bg-white dark:bg-zinc-800 aspect-square flex items-center justify-center p-3 md:p-5 mb-2 md:mb-3">
                        {item.img ? (
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-contain"
                                loading="lazy"
                            />
                        ) : (
                            <div className="text-3xl md:text-5xl">🎮</div>
                        )}
                    </div>

                    {/* Title */}
                    <p className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white mb-2 text-center px-1 line-clamp-2 leading-tight">
                        {item.title}
                    </p>

                    {/* Download Button */}
                    <div className="flex items-center justify-center gap-2 w-full bg-black dark:bg-violet-600 text-white text-xs md:text-sm font-semibold py-2 md:py-2.5 rounded-xl text-center hover:bg-gray-800 dark:hover:bg-violet-500 transition-colors">
                        <span>Download</span> <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}