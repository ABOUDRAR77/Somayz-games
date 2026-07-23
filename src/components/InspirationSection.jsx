import { motion } from 'framer-motion';
import { featuresData } from '../data/data';

export default function InspirationSection() {
    return (
        <section id="features" className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
            <motion.h2
                className="text-4xl md:text-6xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                From download to gameplay.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
                {featuresData.map((item, index) => (
                    <motion.div
                        key={item.title}
                        className="bg-gray-50 dark:bg-zinc-900 dark:border dark:border-white/10 rounded-3xl overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                    >
                        <div className="h-48 overflow-hidden">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}