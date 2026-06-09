"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatWeDo from '@/components/WhatWeDo';
import Breadcrumb from '@/components/Breadcrumb';
import RelatedContent from '@/components/RelatedContent';
import CTASection from '@/components/CTASection';

export default function WhatWeDoPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="What We Do" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        What We Do.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Applied Intelligence for Leadership.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-foreground/60 max-w-3xl leading-relaxed mt-6"
                    >
                        We organise our work around four pillars, each addressing a distinct challenge that leadership teams face when embedding AI. Most organisations need a combination. We help you see which matter most for your business, and in what sequence.
                    </motion.p>
                </div>
            </section>

            <WhatWeDo />

            <CTASection headline="We'd welcome a conversation about your priorities." />

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "Who We Are",
                        description: "Partners with backgrounds spanning MIT, Amazon, Microsoft, Deloitte, and EY: practitioners who’ve led AI strategy, technology, and transformation at scale.",
                        href: "/about"
                    },
                    {
                        title: "How We Work",
                        description: "Our approach: build your capability, not your dependency. Honest counsel, clear outcomes.",
                        href: "/how-we-work"
                    },
                ]}
            />

            <Footer />
        </main>
    );
}
