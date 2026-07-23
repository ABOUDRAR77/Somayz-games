import { motion } from 'framer-motion';

export default function UserJourneysSection() {
    return (
        <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-16">Explore premium modded<br/>games with full features.</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 rounded-3xl p-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 aspect-[9/16] max-w-[280px] mx-auto">
                            <img 
                                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=800&fit=crop" 
                                alt="Mod menu"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mod Menu Included</h3>
                        <p className="text-gray-600">Every download includes a working mod menu with unlimited money, unlocked skins, cars, and premium features.</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-3xl p-8">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 aspect-[9/16] max-w-[280px] mx-auto">
                            <img 
                                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=800&fit=crop" 
                                alt="Online play"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Online Multiplayer</h3>
                        <p className="text-gray-600">Most mods support online play. Join servers and play with friends using all unlocked items and custom features.</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}