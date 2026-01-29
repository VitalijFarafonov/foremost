"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThinkingTeaser() {
    return (
        <section className="py-24 md:py-32 px-6 bg-accent/5">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-medium tracking-tight mb-6"
                >
                    Clarity in Complexity
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-xl text-foreground/70 mb-6 leading-relaxed"
                >
                    We don't sell AI strategies. We sharpen business strategies for an AI-enabled world.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-foreground/60 mb-10 leading-relaxed"
                >
                    Four beliefs guide how we advise.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Link
                        href="/how-we-think"
                        className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
                    >
                        Explore Our Thinking →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
