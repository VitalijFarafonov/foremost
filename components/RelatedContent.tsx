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
}

export default function RelatedContent({ links }: RelatedContentProps) {
    return (
        <section className="py-20 px-6 border-t border-gray-100">
            <div className="max-w-5xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-3xl font-medium mb-12"
                >
                    Explore More
                </motion.h3>
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
                                className="group block p-6 border border-gray-100 hover:border-accent/20 transition-all duration-300 h-full"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <span className="text-accent text-lg">→</span>
                                    <h4 className="text-lg font-medium group-hover:text-accent transition-colors">
                                        {link.title}
                                    </h4>
                                </div>
                                <p className="text-sm text-foreground/60 leading-relaxed">
                                    {link.description}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
