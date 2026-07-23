import { useState } from 'react';
import { motion } from 'framer-motion';
import { allGames, simulationGames, racingGames, sportsGames } from '../data/data';
import PhoneMockup from './PhoneMockup';

export default function DesignPatternsSection() {
    const [activeTab, setActiveTab] = useState('All Games');
    const tabs = ['All Games', 'Simulation', 'Racing', 'Sports'];

    const getData = () => {
        switch(activeTab) {
            case 'Simulation': return simulationGames;
            case 'Racing': return racingGames;
            case 'Sports': return sportsGames;
            default: return allGames;
        }
    };

    const currentData = getData();

    return (
        <section id="games" className="py px-4">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Find your next game<br/>in seconds.</h2>

                <div className="inline-flex bg-gray-100 dark:bg-zinc-800 rounded-full p-1 gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-white dark:bg-zinc-700 text-black dark:text-white shadow-sm'
                                    : 'text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div className="max-w-6xl mx-auto px-4 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {currentData.map((item, index) => (
                        <PhoneMockup key={`${activeTab}-${item.slug}`} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}