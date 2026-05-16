import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: "Games", href: "#games" },
        { label: "Features", href: "#features" },
    ];

    const handleLinkClick = () => setMenuOpen(false);

    return (
        <header>
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl rounded-full px-4 md:px-6 py-3 shadow-lg border border-gray-100 w-[calc(100%-2rem)] max-w-xl md:max-w-none md:w-auto">
                <div className="flex items-center justify-between md:justify-center gap-4 md:gap-8">
                    {/* Logo */}
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 font-bold text-lg md:text-xl hover:opacity-70 transition-opacity shrink-0"
                        onClick={handleLinkClick}
                    >
                        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <span>GameWave</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        {navLinks.map((link) => (
                            <a 
                                key={link.label} 
                                href={link.href} 
                                className="hover:text-black transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <a 
                        href="#games" 
                        className="hidden md:block bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shrink-0"
                    >
                        Download Now
                    </a>

                    {/* Mobile Burger Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 h-4 relative flex flex-col justify-between">
                            <span className={`block w-full h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                            <span className={`block w-full h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block w-full h-0.5 bg-black rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                        </div>
                    </button>
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
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute right-0 top-0 h-full w-64 bg-white shadow-2xl p-6 pt-24 flex flex-col gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Close menu"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Mobile Links */}
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-lg font-medium text-gray-600 hover:text-black py-3 border-b border-gray-100 transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            {/* Mobile CTA */}
                            <motion.a
                                href="#games"
                                onClick={handleLinkClick}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-4 bg-black text-white text-center px-5 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
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