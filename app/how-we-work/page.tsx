"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';

const OUR_APPROACH = [
    {
        title: "Business first. Technology second.",
        description: "Every engagement starts with your strategic priorities, not with what's technically possible."
    },
    {
        title: "We build capability, not dependency.",
        description: "We deliver alongside your teams, transfer knowledge at every stage, and measure success by the confidence and competence we leave behind."
    },
    {
        title: "Candour over comfort.",
        description: "Boards don't need more hype. They need honest assessment and the clarity to make difficult decisions."
    }
];

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

            {/* Three Principles */}
            <section className="py-20 px-6 bg-background-card">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Three Principles</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            What makes us different
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {OUR_APPROACH.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="border-l-2 border-accent/20 pl-6"
                            >
                                <h4 className="text-xl font-medium mb-4">{item.title}</h4>
                                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section id="our-process" className="py-20 px-6 border-t border-border">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Our Process</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            From first conversation to lasting capability.
                        </h3>
                    </motion.div>

                    <div className="space-y-12">
                        {[
                            {
                                step: '01',
                                title: 'Listen & Understand',
                                description: 'We begin by immersing ourselves in your business context, competitive pressures, and organisational dynamics. No templates. No assumptions.'
                            },
                            {
                                step: '02',
                                title: 'Diagnose & Prioritise',
                                description: 'We assess where you stand today: your AI maturity, data foundations, talent, and governance. From there, we identify the highest-value opportunities.'
                            },
                            {
                                step: '03',
                                title: 'Design & Recommend',
                                description: 'We develop a clear roadmap: what to do, in what order, with what resources. Every recommendation includes a delivery path and a business case.'
                            },
                            {
                                step: '04',
                                title: 'Deliver & Embed',
                                description: 'We work alongside your teams to execute, ensuring knowledge transfer at every stage. Our goal is to build your capability, not create dependency.'
                            },
                            {
                                step: '05',
                                title: 'Govern & Evolve',
                                description: 'We establish governance frameworks and review cadences that allow you to move with confidence as the AI landscape evolves.'
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                                className="flex items-start gap-8"
                            >
                                <span className="text-5xl md:text-6xl font-light text-accent/25 leading-none flex-shrink-0 -mt-1">
                                    {item.step}
                                </span>
                                <div className="flex-1 border-l-2 border-accent/15 pl-8 py-1">
                                    <h4 className="text-xl font-medium mb-3">{item.title}</h4>
                                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What It Looks Like */}
            <section className="py-20 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">What It Looks Like</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            Working with us
                        </h3>
                    </motion.div>

                    <div className="space-y-8 text-lg text-foreground/70 leading-relaxed">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="font-medium text-foreground">We work with a small number of clients at any given time.</span> This is intentional. Deep partnerships require sustained attention, genuine trust, and a thorough understanding of your business.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className="font-medium text-foreground">We start by listening.</span> Your business context, your competitive pressures, and the real constraints behind your ambitions. We don&apos;t produce strategy decks that gather dust. Every recommendation is tied to a delivery path, a business case your board can act on, and a timeline grounded in operational reality.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <span className="font-medium text-foreground">The strategy is always yours.</span> We provide rigorous perspective and deep expertise to sharpen it. You make the decisions.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <span className="font-medium text-foreground">We don&apos;t stop at strategy.</span> From clarity and prioritisation through to delivery, governance, and the people side that determines adoption. One partner. The full scope.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="font-medium text-foreground text-xl"
                        >
                            When our work is done, you should feel more capable, not more dependent. Our engagement model is designed to transfer knowledge, embed skills, and leave your team stronger.
                        </motion.p>
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
                        description: "Partners with backgrounds spanning MIT, Amazon, Microsoft, Deloitte, and EY: practitioners who’ve led AI strategy, technology, and transformation at scale.",
                        href: "/about"
                    },
                ]}
            />

            <CTASection headline="Partnership that leaves you stronger." />

            <Footer />
        </main>
    );
}
