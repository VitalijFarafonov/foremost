"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedContent from '@/components/RelatedContent';
import CTASection from '@/components/CTASection';
import { SITE_CONFIG } from '@/lib/content';

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Contact" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Start a Conversation.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        We work with a small number of boards and executive teams at any given time. If you&apos;re thinking seriously about AI&apos;s role in your business strategy, we&apos;d welcome a conversation.
                    </motion.p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                        {/* Left Column: Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-12"
                        >
                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Email</h3>
                                <a
                                    href={`mailto:${SITE_CONFIG.email}`}
                                    className="text-2xl font-medium hover:text-accent transition-colors"
                                    aria-label="Send email to office@foremost.ai"
                                >
                                    {SITE_CONFIG.email}
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Social</h3>
                                <a
                                    href={SITE_CONFIG.linkedin}
                                    className="text-xl font-medium hover:text-accent transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Visit Foremost.ai on LinkedIn (opens in new tab)"
                                >
                                    LinkedIn →
                                </a>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Where We Work</h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    Our partners are based across London, Luxembourg, and Brussels. We advise clients throughout the UK and Europe, with engagements delivered through a combination of in-person sessions and sustained remote collaboration.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column: Subscribe Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="bg-white p-10 border border-gray-100">
                                <h3 className="text-2xl font-medium mb-4">Stay Informed</h3>
                                <p className="text-foreground/70 mb-8 leading-relaxed">
                                    Receive our quarterly perspectives on AI strategy, governance, and board oversight.
                                </p>

                                <a
                                    href="mailto:office@foremost.ai?subject=Newsletter%20Subscription&body=I%20would%20like%20to%20subscribe%20to%20Foremost.ai%20quarterly%20insights."
                                    className="w-full inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-sm font-medium hover:bg-accent transition-colors duration-300"
                                    aria-label="Subscribe to newsletter via email"
                                >
                                    Subscribe via Email
                                </a>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "What We Do",
                        description: "Advisory services across strategy, applied intelligence, people, and governance.",
                        href: "/what-we-do"
                    },
                    {
                        title: "Who We Are",
                        description: "Partners with backgrounds spanning MIT, Amazon, Microsoft, Deloitte, and EY: practitioners who've led AI strategy, technology, and transformation at scale.",
                        href: "/about"
                    },
                ]}
            />



            <Footer />
        </main>
    );
}
