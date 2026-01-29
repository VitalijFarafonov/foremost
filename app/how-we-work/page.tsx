"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';
import { HOW_WE_WORK } from '@/lib/content';

export default function HowWeWork() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="How We Work" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        How We Work.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        We build partnerships that strengthen your capability to lead AI independently.
                    </motion.p>
                </div>
            </section>

            {/* How We Work Principles */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <div className="space-y-20">
                        {HOW_WE_WORK.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="border-l-2 border-accent/20 pl-8"
                            >
                                <h2 className="text-3xl md:text-4xl font-medium mb-6 text-foreground">
                                    {principle.title}
                                </h2>
                                <div className="prose prose-lg max-w-none">
                                    {principle.content.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="text-foreground/70 leading-relaxed mb-4">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section id="commitment" className="py-32 px-6 bg-accent/5">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                            Our Commitment
                        </h2>
                        <div className="space-y-6 text-lg text-foreground/70 leading-relaxed">
                            <p>
                                We work with a small number of clients at any given time. This is intentional.
                            </p>
                            <p>
                                Deep partnerships require time, trust, and sustained engagement. We prioritise quality of relationship over volume of work.
                            </p>
                            <p>
                                We measure success not by the length of our engagements, but by the capability we leave behind. We equip your leadership team with the fluency and confidence to lead AI independently.
                            </p>
                            <p className="font-medium text-foreground">
                                When our work is done, you should feel more capable; not more dependent.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "How We Think",
                        description: "The four beliefs that shape our advice",
                        href: "/how-we-think"
                    },
                    {
                        title: "What We Do",
                        description: "Discover our service capabilities",
                        href: "/#what-we-do"
                    },
                    {
                        title: "Who We Are",
                        description: "Our story, approach, and team",
                        href: "/about"
                    },
                ]}
            />

            {/* CTA Section */}
            <section className="py-32 px-6 bg-accent/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        Ready to build capability, not dependency?
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
