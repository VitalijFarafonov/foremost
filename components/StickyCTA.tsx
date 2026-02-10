"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);
    const pathname = usePathname();

    // Hide on pages where a floating CTA is inappropriate
    const hiddenPaths = ['/contact', '/privacy'];
    const isHiddenRoute = hiddenPaths.includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 800px for a more subtle feel
            const shouldShow = window.scrollY > 800;
            setIsVisible(shouldShow);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setFooterVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <AnimatePresence>
            {isVisible && !footerVisible && !isHiddenRoute && (
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
                            className="bg-background border border-gray-200 rounded-sm shadow-lg p-6 max-w-xs"
                        >
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-3 right-3 text-foreground/40 hover:text-foreground transition-colors"
                                aria-label="Close"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h4 className="text-base font-medium mb-2 text-foreground">
                                Start a Conversation
                            </h4>
                            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
                                We help leadership teams make confident decisions about AI.
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="mailto:office@foremost.ai?subject=Strategic Discussion"
                                    className="block w-full px-4 py-2.5 border border-foreground/15 text-foreground rounded-sm text-center text-sm font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
                                >
                                    Email Us
                                </a>
                                <a
                                    href="/tools/ai-explorer"
                                    className="block w-full px-4 py-2.5 text-foreground/50 rounded-sm text-center text-sm font-medium hover:text-foreground transition-colors duration-300"
                                >
                                    Explore AI Opportunities →
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="group flex items-center gap-2 bg-background border border-gray-200 text-foreground px-4 py-2.5 rounded-sm shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300"
                        >
                            <span className="text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors">Schedule a discussion</span>
                            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
