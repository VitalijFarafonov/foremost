"use client";

import { motion, AnimatePresence } from 'framer-motion';

export interface ProgressStep {
    id: number;
    label: string;
    status: 'pending' | 'active' | 'complete';
}

interface AnalysisProgressProps {
    steps: ProgressStep[];
}

export default function AnalysisProgress({ steps }: AnalysisProgressProps) {
    const activeStep = steps.find(s => s.status === 'active');
    const completedCount = steps.filter(s => s.status === 'complete').length;
    const progress = (completedCount / steps.length) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
        >
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-foreground/60">
                        Step {completedCount + 1} of {steps.length}
                    </p>
                    <p className="text-sm text-foreground/60">
                        {Math.round(progress)}% complete
                    </p>
                </div>
            </div>

            {/* Current Step */}
            <AnimatePresence mode="wait">
                {activeStep && (
                    <motion.div
                        key={activeStep.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                        <div className="flex items-center gap-4">
                            {/* Spinner */}
                            <div className="flex-shrink-0">
                                <svg
                                    className="animate-spin h-8 w-8 text-accent"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>

                            {/* Step Label */}
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-foreground mb-1">
                                    {activeStep.label}
                                </h3>
                                <p className="text-sm text-foreground/60">
                                    This typically takes 5-10 seconds...
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Completed Steps */}
            <div className="mt-6 space-y-2">
                {steps
                    .filter(s => s.status === 'complete')
                    .map((step) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 text-sm text-foreground/50"
                        >
                            <svg
                                className="w-5 h-5 text-green-600 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>{step.label}</span>
                        </motion.div>
                    ))}
            </div>

            {/* Insight */}
            <div className="mt-8 bg-accent/5 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground/70 leading-relaxed">
                    <strong className="text-foreground">Behind the scenes:</strong> We're analyzing your website content, inferring strategic priorities, and mapping AI opportunities to Foremost's expertise. This analysis combines web scraping, natural language processing, and strategic reasoning.
                </p>
            </div>
        </motion.div>
    );
}
