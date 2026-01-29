"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Thinking from '@/components/Thinking';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';
import { PILLARS } from '@/lib/content';

// Note: metadata export doesn't work in client components
// SEO is handled by parent layout for now

export default function HowWeThink() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="How We Think" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Clarity in Complexity.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Business strategy, accelerated by intelligence, not isolated "AI projects."
                        Four beliefs guide our advice.
                    </motion.p>
                </div>
            </section>

            {/* Principles Grid */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                        {PILLARS.map((pillar, index) => {
                            // Create kebab-case ID for anchor link
                            const pillarId = pillar.title
                                .toLowerCase()
                                .replace(/\s+&\s+/g, '-')
                                .replace(/\s+/g, '-');

                            return (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.05 }}
                                >
                                    <h3 className="text-2xl font-medium mb-4 text-foreground">{pillar.title}</h3>
                                    <p className="text-foreground/70 leading-relaxed mb-6">{pillar.description}</p>

                                    <div className="pl-6 border-l-2 border-accent/20 mb-4">
                                        <p className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-2">Foremost Thinking</p>
                                        <p className="text-foreground/80 italic">{pillar.foremostThinking}</p>
                                    </div>

                                    <Link
                                        href={`/#${pillarId}`}
                                        className="inline-flex items-center text-sm text-accent hover:text-accent-warm transition-colors duration-300 group"
                                    >
                                        See related services
                                        <svg
                                            className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Thinking Section Reuse */}
            <Thinking />

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "How We Work",
                        description: "See how we apply these principles in practice",
                        href: "/how-we-work"
                    },
                    {
                        title: "What We Do",
                        description: "Discover our service offerings",
                        href: "/#what-we-do"
                    },
                    {
                        title: "About & Team",
                        description: "Meet the people behind the thinking",
                        href: "/about#team"
                    },
                ]}
            />

            {/* CTA Section */}
            <section className="py-32 px-6 bg-accent/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        Ready to put this thinking to work?
                    </h2>
                    <a
                        href="mailto:office@foremost.ai"
                        className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
                    >
                        Schedule a Discussion
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
