"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ForemostFitResult, PillarFit } from '@/lib/tool/types';

interface ForemostFitStepProps {
    data: ForemostFitResult;
    analysisId: string;
    onBack: () => void;
}

function PillarSection({ pillar, index }: { pillar: PillarFit; index: number }) {
    // Create anchor ID from pillar name
    const pillarId = pillar.pillarName.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');

    // Pillar-specific accent colours for visual differentiation
    const pillarAccents: Record<string, { border: string; bg: string }> = {
        'Strategic Clarity': { border: 'border-l-[#5B6B7C]', bg: 'bg-[#5B6B7C]/5' },
        'Applied Intelligence': { border: 'border-l-[#3A4149]', bg: 'bg-[#3A4149]/5' },
        'Human Potential & Imagination': { border: 'border-l-[#8A9B8F]', bg: 'bg-[#8A9B8F]/5' },
        'Governance as Enabler': { border: 'border-l-[#5B6B7C]', bg: 'bg-[#5B6B7C]/5' },
    };

    const accent = pillarAccents[pillar.pillarName] || { border: 'border-l-accent', bg: 'bg-accent/5' };

    return (
        <motion.div
            id={pillarId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`scroll-mt-24 rounded-xl ${accent.bg} p-8 border-l-4 ${accent.border}`}
        >
            {/* Pillar Header */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
                    {pillar.pillarName}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                    {pillar.pillarDescription}
                </p>
            </div>

            {/* Foremost Thinking */}
            <div className="pl-6 border-l-2 border-foreground/20 mb-6">
                <p className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-2">
                    Foremost Thinking
                </p>
                <p className="text-foreground/80 italic leading-relaxed">
                    {pillar.foremostThinking}
                </p>
            </div>

            {/* How Foremost Can Help - Discussion Box with warmer styling */}
            <div className="bg-[#8A9B8F]/10 border border-[#8A9B8F]/20 rounded-lg p-6 mb-6">
                <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">
                    How Foremost Can Help
                </h4>
                <p className="text-foreground/80 leading-relaxed">
                    {pillar.rationale}
                </p>
            </div>

            {/* Relevant Use Cases (if any) */}
            {pillar.relevantUseCases.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">
                        Linked Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {pillar.relevantUseCases.map((useCase) => (
                            <span
                                key={useCase.id}
                                className="px-3 py-1 bg-white/60 border border-foreground/10 rounded-full text-sm text-foreground/70"
                            >
                                {useCase.title}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}


export default function ForemostFitStep({ data, analysisId, onBack }: ForemostFitStepProps) {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleEmailReport = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSending(true);
        // TODO: Implement email sending
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setEmailSent(true);
        setIsSending(false);
    };

    // Guard against undefined pillars data
    if (!data?.pillars || data.pillars.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto text-center py-12"
            >
                <p className="text-foreground/60">Loading recommendations...</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
        >
            {/* Back Button at Top */}
            <button
                onClick={onBack}
                className="mb-8 px-4 py-2 text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Opportunities
            </button>


            {/* Sticky Navigation */}
            <div className="sticky top-20 z-10 bg-background/95 backdrop-blur-sm border-b border-gray-200 -mx-6 px-6 py-4 mb-12">
                <div className="flex items-center gap-4 overflow-x-auto">
                    <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">
                        Jump to:
                    </span>
                    {data.pillars.map((pillar) => {
                        const pillarId = pillar.pillarName.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
                        return (
                            <a
                                key={pillarId}
                                href={`#${pillarId}`}
                                className="text-sm text-accent hover:text-accent-warm transition-colors duration-300 whitespace-nowrap"
                            >
                                {pillar.pillarName}
                            </a>
                        );
                    })}
                </div>
            </div>

            {/* Pillar Sections */}
            <div className="space-y-16 mb-16">
                {data.pillars.map((pillar, index) => (
                    <PillarSection key={pillar.pillarName} pillar={pillar} index={index} />
                ))}
            </div>

            {/* Primary CTA - Right After Pillars */}
            <div className="bg-foreground text-background rounded-2xl p-12 mb-12 text-center">
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                    Ready to Put This Thinking to Work?
                </h3>
                <p className="text-background/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                    Schedule a strategic discussion to explore how Foremost can help you move from uncertainty to clear priorities and measurable outcomes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="mailto:office@foremost.ai?subject=AI Use Case Explorer Discussion"
                        className="inline-flex items-center justify-center px-8 py-4 bg-background text-foreground rounded-full text-lg font-medium hover:bg-accent hover:text-background transition-colors duration-300"
                    >
                        Schedule a Discussion
                    </a>
                    <Link
                        href="/how-we-think"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-background/20 text-background rounded-full text-lg font-medium hover:border-background/40 transition-colors duration-300"
                    >
                        Explore Our Thinking
                    </Link>
                </div>
            </div>

            {/* Email Capture Section */}
            <div className="bg-gradient-to-br from-accent/5 to-blue-50/50 border border-accent/20 rounded-2xl p-12 mb-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                        Receive Your Full Analysis
                    </h3>
                    <p className="text-foreground/70 leading-relaxed mb-8">
                        Get a comprehensive PDF report with all insights, use cases, and recommendations delivered to your inbox.
                    </p>

                    {!emailSent ? (
                        <form onSubmit={handleEmailReport} className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@company.com"
                                required
                                className="flex-1 px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isSending}
                                className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-50 whitespace-nowrap"
                            >
                                {isSending ? 'Sending...' : 'Email Report'}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <p className="text-green-800 font-medium">
                                ✓ Report sent to {email}
                            </p>
                            <p className="text-sm text-green-700 mt-2">
                                Check your inbox in the next few minutes.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <p className="text-sm text-foreground/50">
                    Analysis ID: {analysisId}
                </p>
            </div>
        </motion.div>
    );
}
