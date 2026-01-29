"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StreamEvent } from '@/lib/tool/services/streamingTypes';

interface ProgressiveLoadingProps {
    isAnalyzing: boolean;
    streamEvents?: StreamEvent[];
}

export default function ProgressiveLoading({ isAnalyzing, streamEvents = [] }: ProgressiveLoadingProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const allLinesRef = useRef<string[]>([]);

    // Scroll to content section when component mounts (when analyzing starts)
    useEffect(() => {
        if (isAnalyzing) {
            setTimeout(() => {
                const contentSection = document.querySelector('section.py-16');
                if (contentSection) {
                    const headerOffset = 100;
                    const elementPosition = contentSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }, 50);
        }
    }, [isAnalyzing]);

    // Build lines from all stream events
    useEffect(() => {
        if (!isAnalyzing) {
            setDisplayedLines([]);
            setCurrentLineIndex(0);
            allLinesRef.current = [];
            return;
        }

        const lines: string[] = [];

        for (const event of streamEvents) {
            if (event.type === 'stage_update' && event.stage) {
                lines.push(`── ${event.stage} ──`);
            } else if (event.type === 'prompt_snippet' && event.promptSnippet) {
                // Split prompt into lines and add them
                const promptLines = event.promptSnippet.split('\n').filter(l => l.trim());
                lines.push(...promptLines);
            } else if (event.type === 'response_snippet' && event.responseSnippet) {
                // Split response into lines and add them
                const responseLines = event.responseSnippet.split('\n').filter(l => l.trim());
                lines.push(...responseLines);
            }
        }

        allLinesRef.current = lines;
    }, [streamEvents, isAnalyzing]);

    // Reveal lines one at a time with delay
    useEffect(() => {
        if (!isAnalyzing) return;

        const interval = setInterval(() => {
            const allLines = allLinesRef.current;
            if (currentLineIndex < allLines.length) {
                // Keep only last 3 lines visible for scrolling effect
                const newLines = allLines.slice(
                    Math.max(0, currentLineIndex - 2),
                    currentLineIndex + 1
                );
                setDisplayedLines(newLines);
                setCurrentLineIndex(prev => prev + 1);
            }
        }, 150); // Show new line every 150ms

        return () => clearInterval(interval);
    }, [isAnalyzing, currentLineIndex]);

    if (!isAnalyzing) return null;

    const hasStreamData = streamEvents.length > 0;

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-accent rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                }}
                            />
                        ))}
                    </div>
                    <h3 className="text-xl font-medium text-foreground">
                        Analysing your business
                    </h3>
                </div>

                {/* Streaming Content Window */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-20 overflow-hidden p-3 font-mono text-xs select-none pointer-events-none flex flex-col justify-end">
                        {hasStreamData ? (
                            <AnimatePresence mode="popLayout">
                                {displayedLines.map((line, index) => (
                                    <motion.div
                                        key={`${currentLineIndex}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: index === displayedLines.length - 1 ? 0.6 : 0.3, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.15 }}
                                        className="text-foreground/50 truncate leading-relaxed"
                                    >
                                        {line}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <div className="text-foreground/40 flex items-center gap-2">
                                <span>Initialising analysis...</span>
                                <motion.span
                                    className="text-accent"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ▌
                                </motion.span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Subtle status */}
                <p className="mt-4 text-center text-sm text-foreground/50 italic">
                    This typically takes 30-45 seconds
                </p>
            </motion.div>
        </div>
    );
}
