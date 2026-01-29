"use client";

import { motion } from 'framer-motion';
import type { CapabilitiesResult, UseCase, RiskLevel } from '@/lib/tool/types';

interface CapabilitiesStepProps {
    data: CapabilitiesResult;
    useCases: UseCase[];
    onNext: () => void;
    onBack: () => void;
}

const riskConfig: Record<RiskLevel, { color: string; bgColor: string; label: string }> = {
    low: {
        color: 'text-green-800',
        bgColor: 'bg-green-100 border-green-200',
        label: 'Low Risk',
    },
    medium: {
        color: 'text-amber-800',
        bgColor: 'bg-amber-100 border-amber-200',
        label: 'Medium Risk',
    },
    high: {
        color: 'text-red-800',
        bgColor: 'bg-red-100 border-red-200',
        label: 'High Risk',
    },
};

export default function CapabilitiesStep({
    data,
    useCases,
    onNext,
    onBack,
}: CapabilitiesStepProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Capabilities & Governance Requirements
            </h2>
            <p className="text-lg text-foreground/70 mb-12 leading-relaxed max-w-3xl">
                What you'll need to execute these use cases: from data foundations to governance frameworks.
            </p>

            <div className="space-y-8 mb-12">
                {data.capabilities.map((capability, index) => {
                    const useCase = useCases.find((uc) => uc.id === capability.useCaseId);
                    if (!useCase) return null;

                    return (
                        <motion.div
                            key={capability.useCaseId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border border-gray-200 rounded-lg p-8"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-foreground mb-2">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-sm text-foreground/60">{capability.category}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${riskConfig[capability.riskLevel].bgColor
                                            } ${riskConfig[capability.riskLevel].color}`}
                                    >
                                        {riskConfig[capability.riskLevel].label}
                                    </span>
                                    {capability.humanInTheLoop && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 border-blue-200 text-blue-800">
                                            Human-in-the-Loop Required
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Data Prerequisites */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-3">
                                        Data Prerequisites
                                    </h4>
                                    <ul className="space-y-2">
                                        {capability.dataPrerequisites.map((prereq, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-foreground/70 leading-relaxed flex items-start gap-2"
                                            >
                                                <span className="text-accent mt-1 flex-shrink-0">•</span>
                                                <span>{prereq}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Governance Requirements */}
                                <div>
                                    <h4 className="text-sm font-medium text-foreground/50 uppercase tracking-wider mb-3">
                                        Governance & Risk Management
                                    </h4>
                                    <ul className="space-y-2">
                                        {capability.governanceRequirements.map((req, i) => (
                                            <li
                                                key={i}
                                                className="text-sm text-foreground/70 leading-relaxed flex items-start gap-2"
                                            >
                                                <span className="text-accent mt-1 flex-shrink-0">•</span>
                                                <span>{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Key Insight */}
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-12">
                <p className="text-sm text-foreground/80 leading-relaxed">
                    <strong className="text-foreground">Foremost Insight:</strong> The shift from "buying tools" to "building capabilities" is critical. Governance isn't a barrier; it's what enables you to scale with confidence.
                </p>
            </div>

            {/* Navigation */}
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

                <button
                    onClick={onNext}
                    className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:bg-accent transition-colors duration-300 flex items-center gap-2"
                >
                    Continue to Decision Lens
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
}
