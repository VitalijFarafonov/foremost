"use client";

import { motion } from "framer-motion";
import { PILLARS } from '@/lib/content';

export default function ValueProp() {
    return (
        <section id="philosophy" className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Clarity in Complexity</h2>
                    <p className="text-xl text-foreground/60 max-w-2xl">
                        We don't sell AI strategies. We clarify business strategies for an AI-enabled world.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {PILLARS.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <h3 className="text-xl font-medium mb-4 group-hover:text-accent transition-colors duration-300">
                                {pillar.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed text-lg text-balance mb-6">
                                {pillar.description}
                            </p>

                            <div className="pl-6 border-l-2 border-accent/20">
                                <p className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-2">Foremost Thinking</p>
                                <p className="text-foreground/80 italic text-balance">{pillar.foremostThinking}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
