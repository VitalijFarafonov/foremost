"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressiveLoading from './ProgressiveLoading';
import type { ToolInput } from '@/lib/tool/types';
import type { StreamEvent } from '@/lib/tool/services/streamingTypes';

interface InputStepProps {
    onAnalyze: (input: ToolInput) => void;
    isAnalyzing: boolean;
    error: string | null;
    streamEvents?: StreamEvent[];
}

export default function InputStep({ onAnalyze, isAnalyzing, error, streamEvents = [] }: InputStepProps) {
    const [companyUrl, setCompanyUrl] = useState('');

    const normalizeUrl = (url: string): string => {
        let normalized = url.trim();

        // Remove www. if present at the start
        if (normalized.startsWith('www.')) {
            normalized = normalized.substring(4);
        }

        // Add https:// if no protocol
        if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
            normalized = 'https://' + normalized;
        }

        return normalized;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!companyUrl.trim()) {
            return;
        }

        const normalizedUrl = normalizeUrl(companyUrl);

        onAnalyze({
            companyName: '', // Will be extracted by AI
            companyUrl: normalizedUrl,
            // Industry will be extracted from company website analysis
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
        >
            {/* Show progress if analyzing */}
            {isAnalyzing ? (
                <ProgressiveLoading isAnalyzing={isAnalyzing} streamEvents={streamEvents} />
            ) : (
                <>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                        Enter your company website
                    </h2>
                    <p className="text-lg text-foreground/70 mb-12 leading-relaxed">
                        We'll analyse your website to extract strategic context, identify your industry, and generate AI use case recommendations. This typically takes 30-60 seconds.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Company URL */}
                        <div>
                            <label htmlFor="companyUrl" className="block text-sm font-medium text-foreground/80 mb-2">
                                Company Website <span className="text-accent">*</span>
                            </label>
                            <input
                                type="text"
                                id="companyUrl"
                                value={companyUrl}
                                onChange={(e) => setCompanyUrl(e.target.value)}
                                placeholder="example.com"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors"
                            />
                            <p className="text-sm text-foreground/50 mt-2">
                                Enter your company's website URL (we'll add https:// automatically)
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isAnalyzing || !companyUrl.trim()}
                            className="w-full px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isAnalyzing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Analysing...
                                </>
                            ) : (
                                'Begin Analysis'
                            )}
                        </button>
                    </form>
                </>
            )}
        </motion.div>
    );
}
