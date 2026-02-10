"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedContent from "@/components/RelatedContent";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

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
                        Board-level AI advisory. Done differently.
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

                    {/* The Kind of Work You'll Do */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 pt-12 border-t border-foreground/10"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">The Work</h2>
                        <h3 className="text-2xl font-medium mb-8 text-foreground">Advising at the highest level.</h3>
                        <ul className="space-y-4 text-foreground/70">
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Sit alongside CEOs, CFOs, and board chairs to shape how AI strengthens business strategy</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Translate complex technical possibilities into clear business decisions</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Design governance frameworks that enable confident adoption</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Build enterprise AI roadmaps grounded in commercial reality</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Lead executive education sessions that change how leaders think about AI</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Navigate the human dynamics (fear, politics, ambition) that determine whether AI initiatives succeed</span>
                            </li>
                        </ul>
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
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Strategic thinkers who can translate complexity into clarity for senior leaders</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Client-focused professionals who listen first and build relationships on substance, not hype</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>People who value outcomes over outputs and understand that real value comes from scaled impact, not pilots</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-foreground/30 mr-3">-</span>
                                <span>Professionals comfortable working across the UK and Europe</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Our Working Culture */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-16 pt-12 border-t border-foreground/10"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Our Working Culture</h2>
                        <h3 className="text-2xl font-medium mb-6 text-foreground">Built for depth, not volume.</h3>
                        <div className="space-y-6 text-foreground/70 leading-relaxed">
                            <p>
                                We value intellectual rigour, direct communication, and the kind of craft that comes from caring deeply about the quality of advice. There are no time sheets, no billable hour targets, and no bureaucracy.
                            </p>
                            <p>
                                Partners have autonomy over their work and genuine ownership of client relationships. We invest in each other&apos;s development because our reputation depends on the quality of every interaction.
                            </p>
                        </div>
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
                            We&apos;re building a firm where rigorous thinking meets practical execution. Where calm authority replaces hype. Where leaders come for clarity and leave with confidence.
                        </p>
                        <p className="text-lg text-foreground/80 font-medium">
                            If that resonates, we&apos;d like to hear from you.
                        </p>
                        <p className="text-sm text-foreground/50 leading-relaxed">
                            We don&apos;t list specific roles; we hire for exceptional people. Reach out to start a conversation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "Who We Are",
                        description: "Partners with backgrounds spanning MIT, Amazon, Microsoft, Deloitte, and EY: practitioners who’ve led AI strategy, technology, and transformation at scale.",
                        href: "/about"
                    },
                    {
                        title: "What We Do",
                        description: "Advisory services across strategy, applied intelligence, people, and governance.",
                        href: "/what-we-do"
                    },
                    {
                        title: "How We Work",
                        description: "Our approach: build your capability, not your dependency. Honest counsel, clear outcomes.",
                        href: "/how-we-work"
                    },
                ]}
            />

            <CTASection headline="Ready to join us?" buttonText="Get in Touch" />

            <Footer />
        </main>
    );
}
