"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 400px
            const shouldShow = window.scrollY > 400;
            setIsVisible(shouldShow);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    {isExpanded ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-foreground text-background rounded-2xl shadow-2xl p-6 max-w-sm"
                        >
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-3 right-3 text-background/60 hover:text-background transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h4 className="text-lg font-medium mb-2">
                                Start a Conversation
                            </h4>
                            <p className="text-sm text-background/70 mb-4 leading-relaxed">
                                Discuss how Foremost can help you navigate AI with clarity and confidence.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="mailto:office@foremost.ai?subject=Strategic Discussion"
                                    className="block w-full px-5 py-3 bg-background text-foreground rounded-full text-center font-medium hover:bg-[#8A9B8F] hover:text-background transition-colors duration-300"
                                >
                                    Email Us
                                </a>
                                <a
                                    href="/tools/ai-explorer"
                                    className="block w-full px-5 py-3 border border-background/30 text-background rounded-full text-center font-medium hover:border-background/60 transition-colors duration-300"
                                >
                                    Try Our AI Use Case Explorer
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="group flex items-center gap-3 bg-foreground text-background px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <span className="font-medium">Schedule a discussion</span>
                            <span className="w-8 h-8 bg-[#8A9B8F] rounded-full flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors duration-300">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </span>
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
