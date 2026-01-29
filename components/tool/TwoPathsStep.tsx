"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TwoPathsResult, UseCase, StrategicPriority, MarketSignalsResult, CompanyData, StrategicInferenceResult } from '@/lib/tool/types';
import type { StreamEvent } from '@/lib/tool/services/streamingTypes';
import ProgressiveLoading from './ProgressiveLoading';

interface TwoPathsStepProps {
    data: TwoPathsResult;
    strategicPriorities?: StrategicPriority[];
    companyData?: CompanyData;
    strategicInference?: StrategicInferenceResult;
    onBack: () => void;
    isAnalyzing?: boolean;
    streamEvents?: StreamEvent[];
}


function UseCaseCard({ useCase, index }: { useCase: UseCase; index: number }) {
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [showForemostHelp, setShowForemostHelp] = useState(false);
    const [foremostHelp, setForemostHelp] = useState<string | null>(null);
    const [isLoadingHelp, setIsLoadingHelp] = useState(false);

    const hasAnalysisContent = (useCase.advantages && useCase.advantages.length > 0) ||
        (useCase.risks && useCase.risks.length > 0) ||
        (useCase.uncertainties && useCase.uncertainties.length > 0) ||
        (useCase.tradeoffs && useCase.tradeoffs.length > 0);

    const handleForemostHelpClick = async () => {
        if (foremostHelp) {
            // If already generated, just toggle visibility
            setShowForemostHelp(!showForemostHelp);
            return;
        }

        setIsLoadingHelp(true);
        setShowForemostHelp(true);

        try {
            const response = await fetch('/api/tool/foremost-help', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ useCase }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate help');
            }

            const data = await response.json();
            setForemostHelp(data.foremostHelp);
        } catch (error) {
            console.error('Error generating Foremost help:', error);
            setForemostHelp('Unable to generate recommendations at this time. Please try again.');
        } finally {
            setIsLoadingHelp(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-lg overflow-hidden transition-colors duration-300 ${useCase.path === 'reimagination'
                ? 'bg-accent/5 border border-accent/20 hover:border-accent/40'
                : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                }`}
        >
            {/* Main Content - Always Visible */}
            <div className="p-6">
                <h4 className="text-lg font-medium text-foreground mb-3">
                    {useCase.title}
                </h4>
                <p className="text-foreground/70 leading-relaxed mb-4">
                    {useCase.description}
                </p>

                {/* Strategic Priority Labels */}
                {useCase.tags && useCase.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {useCase.tags.map((tag, i) => (
                            <span
                                key={i}
                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${useCase.path === 'reimagination'
                                    ? 'bg-accent/15 text-accent border border-accent/20'
                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Strategic Rationale */}
                {useCase.strategicRationale && (
                    <p className="text-foreground/70 text-sm leading-relaxed mt-3">{useCase.strategicRationale}</p>
                )}

                {/* Analysis Details Toggle Button */}
                {hasAnalysisContent && (
                    <button
                        onClick={() => setShowAnalysis(!showAnalysis)}
                        className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground/80 transition-colors mt-4"
                    >
                        <motion.svg
                            className="w-4 h-4"
                            animate={{ rotate: showAnalysis ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                        <span>Advantages, Risks, Uncertainties & Tradeoffs</span>
                    </button>
                )}

                {/* Analysis Content - Collapsible */}
                <AnimatePresence>
                    {showAnalysis && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6 overflow-hidden mt-4"
                        >
                            {/* Advantages and Disadvantages Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Advantages */}
                                {useCase.advantages && useCase.advantages.length > 0 && (
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Advantages
                                        </h5>
                                        <ul className="space-y-2">
                                            {useCase.advantages.map((adv, i) => (
                                                <li key={i} className="text-sm text-green-900 flex items-start gap-2">
                                                    <span className="text-green-600 mt-1">•</span>
                                                    {adv}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Disadvantages */}
                                {useCase.risks && useCase.risks.length > 0 && (
                                    <div className="bg-red-50 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-red-800 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            Risks
                                        </h5>
                                        <ul className="space-y-2">
                                            {useCase.risks.map((risk, i) => (
                                                <li key={i} className="text-sm text-red-900 flex items-start gap-2">
                                                    <span className="text-red-600 mt-1">•</span>
                                                    {risk}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Uncertainties and Tradeoffs */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Uncertainties */}
                                {useCase.uncertainties && useCase.uncertainties.length > 0 && (
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01" />
                                            </svg>
                                            Uncertainties
                                        </h5>
                                        <ul className="space-y-2">
                                            {useCase.uncertainties.map((unc, i) => (
                                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                    <span className="text-gray-400 mt-1">•</span>
                                                    {unc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tradeoffs */}
                                {useCase.tradeoffs && useCase.tradeoffs.length > 0 && (
                                    <div className="bg-amber-50 rounded-lg p-4">
                                        <h5 className="text-sm font-medium text-amber-800 mb-3 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                            </svg>
                                            Tradeoffs
                                        </h5>
                                        <ul className="space-y-2">
                                            {useCase.tradeoffs.map((trade, i) => (
                                                <li key={i} className="text-sm text-amber-900 flex items-start gap-2">
                                                    <span className="text-amber-600 mt-1">•</span>
                                                    {trade}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* How Foremost Can Help Button */}
                <button
                    onClick={handleForemostHelpClick}
                    className={`flex items-center gap-2 text-sm mt-4 transition-colors ${useCase.path === 'reimagination'
                        ? 'text-accent hover:text-accent/80'
                        : 'text-foreground/60 hover:text-foreground/80'
                        }`}
                >
                    <motion.svg
                        className="w-4 h-4"
                        animate={{ rotate: showForemostHelp ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                    <span>How Foremost Can Help</span>
                    {isLoadingHelp && (
                        <motion.div
                            className="w-3 h-3 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </button>

                {/* Foremost Help Content - Collapsible */}
                <AnimatePresence>
                    {showForemostHelp && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-4"
                        >
                            <div className={`rounded-lg p-4 ${useCase.path === 'reimagination'
                                ? 'bg-accent/10 border border-accent/20'
                                : 'bg-blue-50 border border-blue-200'
                                }`}>
                                {isLoadingHelp ? (
                                    <div className="flex items-center gap-3 text-foreground/60">
                                        <motion.div
                                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <span className="text-sm">Analysing how Foremost can help with this opportunity...</span>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <h5 className={`text-sm font-medium flex items-center gap-2 ${useCase.path === 'reimagination' ? 'text-accent' : 'text-blue-800'
                                            }`}>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Foremost Advisory Support
                                        </h5>
                                        <p className={`text-sm leading-relaxed whitespace-pre-line ${useCase.path === 'reimagination' ? 'text-foreground/80' : 'text-blue-900'
                                            }`}>
                                            {foremostHelp}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}


export default function TwoPathsStep({ data, strategicPriorities, companyData, strategicInference, onBack, isAnalyzing = false, streamEvents = [] }: TwoPathsStepProps) {
    const [showCompetitorSummary, setShowCompetitorSummary] = useState(false);
    const [competitorData, setCompetitorData] = useState<MarketSignalsResult | null>(null);
    const [isLoadingCompetitors, setIsLoadingCompetitors] = useState(false);

    // Email capture state
    const [email, setEmail] = useState('');
    const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
    const [emailSubmitted, setEmailSubmitted] = useState(false);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmittingEmail(true);
        try {
            const response = await fetch('/api/tool/request-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    companyData,
                    strategicPriorities,
                    twoPaths: data,
                }),
            });

            if (response.ok) {
                setEmailSubmitted(true);
            }
        } catch (error) {
            console.error('Error submitting email:', error);
        } finally {
            setIsSubmittingEmail(false);
        }
    };

    const handleViewCompetitors = async () => {
        if (competitorData) {
            // If already loaded, just toggle visibility
            setShowCompetitorSummary(!showCompetitorSummary);
            return;
        }

        setIsLoadingCompetitors(true);
        setShowCompetitorSummary(true);

        try {
            const response = await fetch('/api/tool/step3-stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    industry: companyData?.industry,
                    strategicInference: strategicInference,
                    companyName: companyData?.companyName,
                    companyIndustry: companyData?.industry,
                    competitors: companyData?.competitors,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch competitor data');
            }

            const reader = response.body?.getReader();
            if (!reader) {
                throw new Error('No response stream available');
            }

            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const eventData = JSON.parse(line.slice(6));
                            if (eventData.type === 'complete' && eventData.data) {
                                setCompetitorData(eventData.data.marketSignals);
                            }
                        } catch (parseError) {
                            console.error('Failed to parse SSE event:', parseError);
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching competitor data:', error);
        } finally {
            setIsLoadingCompetitors(false);
        }
    };

    // Show streaming panel when analyzing
    if (isAnalyzing && streamEvents.length > 0) {
        return <ProgressiveLoading isAnalyzing={isAnalyzing} streamEvents={streamEvents} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Two Paths to Value
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                AI opportunities aligned with your strategic priorities, organized by ambition and certainty.
            </p>

            {/* Path A: Reimagination */}
            <div className="mb-16">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium text-foreground">
                                Path A: Business Reimagination
                            </h3>
                            <p className="text-sm text-foreground/60">
                                High Ambition / High Uncertainty
                            </p>
                        </div>
                    </div>
                    <p className="text-foreground/70 leading-relaxed pl-15">
                        These opportunities fundamentally change your business model or customer offering. Limited to 2-3 ideas to maintain focus on what truly matters.
                    </p>
                </div>

                <div className="grid gap-6">
                    {data.reimagination.map((useCase, index) => (
                        <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
                    ))}
                </div>
            </div>

            {/* Path B: Efficiency */}
            <div className="mb-12">
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-medium text-foreground">
                                Path B: Efficiency & Optimization
                            </h3>
                            <p className="text-sm text-foreground/60">
                                High Certainty / Operational Focus
                            </p>
                        </div>
                    </div>
                    <p className="text-foreground/70 leading-relaxed pl-15">
                        These opportunities improve how you currently operate: reducing costs, increasing speed, or enhancing productivity.
                    </p>
                </div>

                <div className="grid gap-6">
                    {data.efficiency.map((useCase, index) => (
                        <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
                    ))}
                </div>
            </div>

            {/* Industry AI Usage Section */}
            <div className="mb-12">
                <button
                    onClick={handleViewCompetitors}
                    disabled={isLoadingCompetitors}
                    className="flex items-center gap-3 text-accent hover:text-accent/80 transition-colors duration-300 group"
                >
                    <motion.svg
                        className="w-5 h-5"
                        animate={{ rotate: showCompetitorSummary ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                    <span className="text-lg font-medium">See how others in your industry are using AI</span>
                    {isLoadingCompetitors && (
                        <motion.div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    )}
                </button>

                <AnimatePresence>
                    {showCompetitorSummary && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mt-6"
                        >
                            <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-foreground">Industry AI Initiatives</h3>
                                        <p className="text-sm text-foreground/60">How similar organisations are deploying AI</p>
                                    </div>
                                </div>

                                {isLoadingCompetitors ? (
                                    <div className="flex items-center gap-3 text-foreground/60 py-8">
                                        <motion.div
                                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        <span>Researching AI initiatives in your industry...</span>
                                    </div>
                                ) : competitorData && competitorData.signals.length > 0 ? (
                                    <div className="space-y-4">
                                        {competitorData.signals.map((signal, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-white/80 rounded-lg p-4 border border-blue-100"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-medium text-foreground">{signal.company}</span>
                                                            <span className="text-xs text-foreground/50">{signal.country}</span>
                                                        </div>
                                                        <p className="text-foreground/70 text-sm leading-relaxed">{signal.initiative}</p>
                                                        {signal.source && (
                                                            <a
                                                                href={signal.source}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 mt-2 transition-colors"
                                                            >
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                                Source
                                                            </a>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-foreground/40 whitespace-nowrap">
                                                        {new Date(signal.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-foreground/60 py-4">
                                        No recent AI initiatives found from competitors in your industry. This could indicate an early adoption opportunity.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Email Report CTA */}
            <div className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-8 mb-8">
                <div className="max-w-2xl">
                    <h3 className="text-xl font-medium text-foreground mb-2">
                        Get Your Personalised AI Opportunities Report
                    </h3>
                    <p className="text-foreground/70 mb-6">
                        Receive a detailed PDF report summarising the AI opportunities aligned with your strategic priorities, complete with implementation considerations and next steps.
                    </p>

                    {!emailSubmitted ? (
                        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isSubmittingEmail || !email.trim()}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${isSubmittingEmail || !email.trim()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-accent text-white hover:bg-accent/90'
                                    }`}
                            >
                                {isSubmittingEmail ? (
                                    <>
                                        <motion.div
                                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Report
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4"
                        >
                            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <div>
                                <p className="text-green-800 font-medium">Report requested successfully!</p>
                                <p className="text-green-700 text-sm">We'll send your personalised AI opportunities report to {email} shortly.</p>
                            </div>
                        </motion.div>
                    )}

                    <p className="text-xs text-foreground/50 mt-3">
                        By submitting, you agree to receive this report and occasional updates from Foremost. You can unsubscribe at any time.
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-start pt-8 border-t border-gray-200">
                <button
                    onClick={onBack}
                    className="px-6 py-3 text-foreground/60 hover:text-foreground transition-colors duration-300 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
            </div>
        </motion.div>
    );
}
