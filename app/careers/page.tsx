"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";

export default function CareersPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Careers" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Join Foremost.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Building the future of board-level AI advisory.
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <p className="text-xl text-foreground/80 leading-relaxed">
                            We're looking for exceptional people who share our commitment to clarity, rigour, and meaningful impact.
                        </p>

                        <p className="text-lg text-foreground/70 leading-relaxed">
                            Our work sits at the intersection of strategy, leadership, and applied intelligence. We help boards and executive teams navigate complexity with confidence. That requires people who think deeply, communicate clearly, and understand that great advisory work is built on trust, judgement, and discipline.
                        </p>
                    </motion.div>

                    {/* What We Look For */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 pt-12 border-t border-foreground/10"
                    >
                        <h2 className="text-2xl font-medium mb-8 text-foreground">What we look for</h2>
                        <ul className="space-y-4 text-foreground/70">
                            <li className="flex items-start">
                                <span className="text-accent mr-3 mt-1">—</span>
                                <span>Strategic thinkers who can translate complexity into clarity for senior leaders</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-3 mt-1">—</span>
                                <span>Client-focused professionals who listen first and build relationships on substance, not hype</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-3 mt-1">—</span>
                                <span>People who value outcomes over outputs and understand that real value comes from scaled impact, not pilots</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-accent mr-3 mt-1">—</span>
                                <span>Professionals comfortable working across the UK and Europe</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Closing */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 space-y-6"
                    >
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            We're building a firm where rigorous thinking meets practical execution. Where calm authority replaces hype. Where leaders come for clarity and leave with confidence.
                        </p>
                        <p className="text-lg text-foreground/80 font-medium">
                            If that resonates, we'd like to hear from you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "Who We Are",
                        description: "Our story, approach, and values",
                        href: "/about"
                    },
                    {
                        title: "How We Think",
                        description: "The beliefs that guide our work",
                        href: "/how-we-think"
                    },
                    {
                        title: "How We Work",
                        description: "Our partnership approach",
                        href: "/how-we-work"
                    },
                ]}
            />

            {/* CTA Section */}
            <section className="py-32 px-6 bg-accent/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        Ready to join us?
                    </h2>
                    <a
                        href="mailto:careers@foremost.ai"
                        className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
                    >
                        Get in Touch
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
