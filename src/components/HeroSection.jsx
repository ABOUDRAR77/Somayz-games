import { motion } from 'framer-motion';
import { gameIcons } from '../data/data';
import AnimatedCounter from './AnimatedCounter';
import FloatingIcon from './FloatingIcon';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {gameIcons.map((icon, index) => (
                <FloatingIcon key={index} icon={icon} index={index} />
            ))}

            {/* Removed z-10 so text stays behind the z-20 icons */}
            <div className="relative text-center px-4">


                <motion.p
                    className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
>
    #1 Mod APK Library
</motion.p>

<motion.div
    className="space-y-1"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
>
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
        Free Mods
    </h1>

    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
        Full Game
    </h1>
</motion.div>

<motion.div
    className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
>
    <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online Ready
    </span>
    <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> No Root
    </span>
    <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Weekly Updates
    </span>
</motion.div>
            </div>
        </section>
    );
}