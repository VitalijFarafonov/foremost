"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';

// PLACEHOLDER CASE STUDIES - Replace with real client outcomes when available
const CASE_STUDIES = [
    {
        id: 1,
        title: "FTSE 250 Industrial Manufacturing",
        challenge: "Leadership team overwhelmed by AI vendor pitches with no strategic framework for evaluation.",
        outcome: "Board-approved AI investment thesis with clear 18-month roadmap and governance framework.",
        impact: [
            "Rejected 8 out of 12 vendor proposals as misaligned with strategic priorities",
            "Focused investment on 2 high-impact use cases with projected €4M annual benefit",
            "Established quarterly AI review cadence at board level"
        ],
        duration: "3 months",
        isPlaceholder: true
    },
    {
        id: 2,
        title: "Private Equity Portfolio Company - Financial Services",
        challenge: "Newly appointed CEO needed to present AI strategy to PE sponsors within 60 days.",
        outcome: "Presented credible, defensible AI strategy that secured continued sponsor confidence.",
        impact: [
            "Identified €12M efficiency opportunity in operations",
            "De-risked regulatory exposure through proactive EU AI Act assessment",
            "Established internal AI Center of Excellence structure"
        ],
        duration: "8 weeks",
        isPlaceholder: true
    },
    {
        id: 3,
        title: "European Mid-Market - Professional Services",
        challenge: "Partners divided on whether AI represented opportunity or threat to business model.",
        outcome: "Unified leadership behind 'AI-augmented' positioning with clear implementation path.",
        impact: [
            "Resolved partnership deadlock with evidence-based strategic framework",
            "Launched pilot AI-assisted delivery model in one practice area",
            "Developed partner education programme adopted firm-wide"
        ],
        duration: "4 months",
        isPlaceholder: true
    }
];

export default function ResultsPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Results" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Results That Matter.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Outcomes from our work with boards and executive teams navigating AI transformation.
                    </motion.p>
                </div>
            </section>

            {/* Placeholder Notice */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                        <p className="text-sm text-foreground/70">
                            <span className="font-semibold text-accent">Note:</span> The case studies below are representative examples of the outcomes we deliver.
                            Specific client details are anonymised to protect confidentiality. Detailed references available upon request.
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-12 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-20">
                        {CASE_STUDIES.map((study, index) => (
                            <motion.article
                                key={study.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-gray-100 last:border-0"
                            >
                                {/* Left: Context */}
                                <div className="lg:col-span-4">
                                    <span className="block text-4xl font-light text-foreground/10 mb-4">
                                        0{index + 1}
                                    </span>
                                    <h3 className="text-2xl font-medium mb-2">{study.title}</h3>
                                    <p className="text-sm text-foreground/50 mb-6">{study.duration} engagement</p>
                                    {study.isPlaceholder && (
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                                            Representative Example
                                        </span>
                                    )}
                                </div>

                                {/* Right: Details */}
                                <div className="lg:col-span-8 space-y-8">
                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">
                                            The Challenge
                                        </h4>
                                        <p className="text-lg text-foreground/80 leading-relaxed">
                                            {study.challenge}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">
                                            The Outcome
                                        </h4>
                                        <p className="text-lg text-foreground/80 leading-relaxed">
                                            {study.outcome}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-3">
                                            The Impact
                                        </h4>
                                        <ul className="space-y-3">
                                            {study.impact.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="text-accent mr-3 mt-1">—</span>
                                                    <span className="text-foreground/70 leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "How We Work",
                        description: "Our partnership approach",
                        href: "/how-we-work"
                    },
                    {
                        title: "What We Do",
                        description: "Our service capabilities",
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
                        Ready to discuss your AI agenda?
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
