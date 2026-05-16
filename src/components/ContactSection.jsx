import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Hook this up to your backend or email service (Formspree, EmailJS, etc.)
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <section className="py-20 px-4 md:px-12 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">
                        Have a question or need help? Send us a message and we'll get back to you.
                    </p>
                </div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                        <p className="text-gray-500">We'll reply as soon as possible.</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors placeholder:text-gray-400"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">How can we help you?</label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
                                placeholder="I need help with..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-semibold py-4 rounded-2xl hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </button>
                    </form>
                )}
            </motion.div>
        </section>
    );
}