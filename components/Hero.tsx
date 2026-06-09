"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6">
            <div className="max-w-7xl w-full mx-auto">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-foreground mb-8 text-balance"
                    >
                        Be foremost.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-xl md:text-2xl lg:text-3xl text-foreground/80 font-normal leading-relaxed text-balance max-w-2xl"
                    >
                        Applied Intelligence for Leadership.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="text-lg md:text-xl text-foreground/60 font-normal leading-relaxed text-balance max-w-2xl mt-6"
                    >
                        We work alongside leadership teams to cut through AI noise, build what matters, and deliver outcomes that move the P&L.
                    </motion.p>



                </div>
            </div>
        </section>
    );
}
