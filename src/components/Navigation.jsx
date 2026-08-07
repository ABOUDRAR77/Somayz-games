import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    const navLinks = [
        { label: "Games", href: "#games" },
        { label: "Features", href: "#features" },
    ];

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <header>
            <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-full px-4 md:px-6 py-3 shadow-lg border border-gray-100 dark:border-white/10 md:w-auto">
                <div className="flex items-center justify-between md:justify-center gap-2 md:gap-8">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 md:gap-2 font-bold text-base md:text-xl hover:opacity-70 transition-opacity min-w-0"
                        onClick={handleLinkClick}
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 shrink-0" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span className="hidden sm:inline">PlayNextGames</span>
                        <span className="sm:hidden">PlayNext</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-zinc-400">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="hover:text-black dark:hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop: Theme Toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.svg
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5 text-amber-400"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.73 0-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5 text-gray-600"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>

                        <a
                            href="#games"
                            className="bg-black dark:bg-violet-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-violet-500 transition-colors shrink-0"
                        >
                            Download Now
                        </a>
                    </div>

                    {/* Mobile: Theme Toggle + Burger */}
                    <div className="md:hidden flex items-center gap-1">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {isDark ? (
                                    <motion.svg
                                        key="sun-m"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5 text-amber-400"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07-6.07-.71.71M6.34 17.66l-.71.71m12.73 0-.71-.71M6.34 6.34l-.71-.71M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                    </motion.svg>
                                ) : (
                                    <motion.svg
                                        key="moon-m"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5 text-gray-600"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </motion.svg>
                                )}
                            </AnimatePresence>
                        </button>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 h-4 relative flex flex-col justify-between">
                                <span className={`block w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                                <span className={`block w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block w-full h-0.5 bg-black dark:bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-zinc-900 shadow-2xl p-6 pt-24 flex flex-col gap-2 border-l border-gray-100 dark:border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-lg font-medium text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white py-3 border-b border-gray-100 dark:border-zinc-800 transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#games"
                                onClick={handleLinkClick}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 bg-black dark:bg-violet-600 text-white text-center px-5 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-violet-500 transition-colors"
                            >
                                Download Now
                            </motion.a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}