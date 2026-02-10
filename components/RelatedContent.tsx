"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface RelatedLink {
    title: string;
    description: string;
    href: string;
}

interface RelatedContentProps {
    links: RelatedLink[];
    heading?: string;
}

export default function RelatedContent({ links, heading }: RelatedContentProps) {
    return (
        <section className="py-20 px-6 border-t border-border">
            <div className="max-w-7xl mx-auto">
                {heading && (
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-medium mb-12"
                    >
                        {heading}
                    </motion.h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {links.map((link, index) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="group block border border-border p-10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 h-full"
                            >
                                <h4 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors">
                                    {link.title}
                                </h4>
                                <p className="text-foreground/60 leading-relaxed mb-6">
                                    {link.description}
                                </p>
                                <span className="text-sm font-medium text-accent">
                                    Learn more →
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
