"use client";

import { motion } from "framer-motion";

export default function NewsletterSignup() {
    return (
        <section className="py-16 px-6 border-t border-gray-100">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-medium tracking-tight mb-4"
                >
                    Stay Informed
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                    Quarterly perspectives on AI governance, strategy, and board oversight.
                    Insight, not noise.
                </motion.p>

                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    href="mailto:office@foremost.ai?subject=Newsletter%20Subscription&body=I%20would%20like%20to%20subscribe%20to%20Foremost.ai%20quarterly%20insights."
                    className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background rounded-sm font-medium hover:bg-accent transition-colors duration-300"
                >
                    Subscribe via Email
                </motion.a>


            </div>
        </section>
    );
}
