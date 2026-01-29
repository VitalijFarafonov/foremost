"use client";

import { motion } from "framer-motion";

export default function Hero() {
    const scrollToContent = () => {
        const nextSection = document.querySelector('section:nth-of-type(2)');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center pt-20 pb-10 px-6 relative">
            <div className="max-w-7xl w-full mx-auto">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-foreground mb-8 text-balance"
                    >
                        Stay foremost.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-normal leading-relaxed text-balance max-w-2xl"
                    >
                        Applied intelligence for the boardroom.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-16 h-px w-24 bg-foreground/20"
                    />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                onClick={scrollToContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground/60 transition-colors cursor-pointer"
                aria-label="Scroll to explore"
            >
                <span className="text-xs font-medium uppercase tracking-widest">Explore</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </motion.div>
            </motion.button>
        </section>
    );
}

