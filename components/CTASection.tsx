"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CTASectionProps {
    headline: string;
    variant?: "light" | "dark";
    buttonText?: string;
}

export default function CTASection({ headline, variant = "light", buttonText = "Schedule a Discussion" }: CTASectionProps) {
    const [showOptions, setShowOptions] = useState(false);

    const isDark = variant === "dark";

    return (
        <section className={`py-12 md:py-16 px-6 ${isDark ? "bg-foreground text-background" : "border-t border-border"}`}>
            <div className="max-w-4xl mx-auto text-center">
                <h2 className={`text-2xl md:text-3xl font-medium tracking-tight mb-6 ${isDark ? "text-white" : ""}`}>
                    {headline}
                </h2>

                <AnimatePresence mode="wait">
                    {!showOptions ? (
                        <motion.button
                            key="cta-button"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setShowOptions(true)}
                            className={`inline-flex items-center justify-center px-6 py-3 rounded-sm text-base font-medium transition-colors duration-300 ${isDark
                                ? "border border-white/30 text-white hover:bg-white hover:text-foreground"
                                : "border border-foreground/15 text-foreground hover:bg-foreground hover:text-background"
                                }`}
                        >
                            {buttonText}
                        </motion.button>
                    ) : (
                        <motion.div
                            key="cta-options"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <a
                                href="mailto:office@foremost.ai?subject=Strategic%20Discussion"
                                className={`inline-flex items-center justify-center px-6 py-3 rounded-sm text-base font-medium transition-colors duration-300 ${isDark
                                    ? "border border-white/30 text-white hover:bg-white hover:text-foreground"
                                    : "border border-foreground/15 text-foreground hover:bg-foreground hover:text-background"
                                    }`}
                            >
                                Email Us
                            </a>
                            <a
                                href="/tools/ai-explorer"
                                className={`inline-flex items-center justify-center px-6 py-3 rounded-sm text-base font-medium transition-colors duration-300 ${isDark
                                    ? "text-white/60 hover:text-white"
                                    : "text-foreground/50 hover:text-foreground"
                                    }`}
                            >
                                Explore AI Opportunities →
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
