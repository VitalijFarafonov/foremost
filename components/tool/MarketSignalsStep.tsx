"use client";

import { motion } from 'framer-motion';
import type { MarketSignalsResult } from '@/lib/tool/types';

interface MarketSignalsStepProps {
    data: MarketSignalsResult;
    onNext: () => void;
    onBack: () => void;
}

export default function MarketSignalsStep({ data, onNext, onBack }: MarketSignalsStepProps) {
    // Debug logging
    console.log('[MarketSignalsStep] Received data:', data);
    console.log('[MarketSignalsStep] Signals array:', data?.signals);
    console.log('[MarketSignalsStep] Number of signals:', data?.signals?.length || 0);

    // Defensive checks
    const signals = data?.signals || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Market Signals
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed max-w-3xl">
                Patterns of experimentation from peer organisations.
            </p>

            {/* Signals Table */}
            {signals.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-12">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Country
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Initiative
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {signals.map((signal, index) => (
                                    <motion.tr
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                                            {signal.company}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground/70">
                                            {signal.country}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground/80 max-w-md">
                                            {signal.initiative}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-foreground/60 whitespace-nowrap">
                                            {new Date(signal.date).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: 'short',
                                            })}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 mb-12 text-center">
                    <p className="text-lg text-foreground/60 mb-2">No market signals found</p>
                    <p className="text-sm text-foreground/50">
                        We couldn't find recent AI initiatives from competitors in your industry. This could mean the industry is early in AI adoption, or the information isn't publicly available yet.
                    </p>
                </div>
            )}

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
                    Continue to Foremost Support
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
}
