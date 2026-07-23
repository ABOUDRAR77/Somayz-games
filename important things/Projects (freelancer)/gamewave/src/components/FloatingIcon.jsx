import { motion } from 'framer-motion';

export default function FloatingIcon({ icon, index }) {
    return (
        <motion.div
            className="absolute rounded-3xl shadow-2xl flex items-center justify-center pointer-events-none overflow-hidden z-20"
            style={{
                top: icon.top,
                left: icon.left,
                width: icon.size,
                height: icon.size,
                backgroundColor: icon.color,
                willChange: 'transform',
            }}
            animate={{
                y: [0, -15, 0],
            }}
            transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
            }}
        >
            {icon.image ? (
                <img 
                    src={icon.image} 
                    alt={icon.name}
                    className="w-3/4 h-3/4 object-contain rounded-xl"
                    loading="lazy"
                />
            ) : (
                <div className="w-3/4 h-3/4 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                    {icon.name}
                </div>
            )}
        </motion.div>
    );
}