"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import InputStep from '@/components/tool/InputStep';
import StrategicInferenceStep from '@/components/tool/StrategicInferenceStep';
import TwoPathsStep from '@/components/tool/TwoPathsStep';
// MarketSignalsStep removed - now integrated inline in TwoPathsStep
// ForemostFitStep removed - Foremost Support section eliminated
import type { ToolInput, AnalysisResult, AnalysisStep, StrategicPriority } from '@/lib/tool/types';
import type { ProgressStep } from '@/components/tool/AnalysisProgress';
import type { StreamEvent } from '@/lib/tool/services/streamingTypes';

export default function StrategicOrientationTool() {
    const [currentStep, setCurrentStep] = useState<AnalysisStep>(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([]);
    const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
    // Track user-selected priorities (approved + custom) for use case generation
    const [selectedPriorities, setSelectedPriorities] = useState<StrategicPriority[]>([]);

    const initializeProgressSteps = (): ProgressStep[] => [
        { id: 1, label: 'Analyzing company website', status: 'pending' },
        { id: 2, label: 'Inferring strategic priorities', status: 'pending' },
        { id: 3, label: 'Generating AI use cases', status: 'pending' },
        { id: 4, label: 'Researching competitor initiatives', status: 'pending' },
        { id: 5, label: 'Mapping capabilities and governance', status: 'pending' },
        { id: 6, label: 'Creating strategic questions', status: 'pending' },
        { id: 7, label: 'Mapping to Foremost pillars', status: 'pending' },
    ];

    const updateProgressStep = (stepId: number, status: 'active' | 'complete') => {
        setProgressSteps((prev) =>
            prev.map((step) =>
                step.id === stepId ? { ...step, status } : step
            )
        );
    };

    const handleAnalyze = async (input: ToolInput) => {
        setIsAnalyzing(true);
        setError(null);
        setStreamEvents([]); // Reset stream events
        setProgressSteps([
            { id: 1, label: 'Analysing company and inferring strategy', status: 'active' },
        ]);

        try {
            // Use step1a-stream for FAST Strategic Inference (Phase 1)
            const response = await fetch('/api/tool/step1a-stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyName: input.companyName,
                    companyUrl: input.companyUrl,
                    industry: input.industry,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to start analysis');
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

                // Process complete SSE events from buffer
                const lines = buffer.split('\n\n');
                buffer = lines.pop() || ''; // Keep incomplete event in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const eventData = JSON.parse(line.slice(6)) as StreamEvent;

                            // Add event to state
                            setStreamEvents(prev => [...prev, eventData]);

                            if (eventData.type === 'complete' && eventData.data) {
                                // Step1a returns only strategicInference and companyData
                                const { strategicInference, companyData } = eventData.data as {
                                    strategicInference: AnalysisResult['strategicInference'];
                                    companyData: AnalysisResult['companyData'];
                                };

                                console.log('[Frontend] Step1a complete (Strategic Inference only):', eventData.data);

                                setResult({
                                    input,
                                    companyData,
                                    strategicInference,
                                    twoPaths: { reimagination: [], efficiency: [] }, // Empty - will be filled in step 2
                                    marketSignals: { signals: [], disclaimer: '' },
                                    foremostFit: { pillars: [] },
                                    generatedAt: new Date().toISOString(),
                                    analysisId: 'analysis-' + Date.now(),
                                });

                                setCurrentStep(2);

                                // Scroll to content section
                                setTimeout(() => {
                                    const contentSection = document.querySelector('section.py-16');
                                    if (contentSection) {
                                        const yOffset = -100;
                                        const y = contentSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }, 100);
                            }

                            // Handle error event
                            if (eventData.type === 'error') {
                                throw new Error(eventData.error || 'Analysis failed');
                            }
                        } catch (parseError) {
                            console.error('Failed to parse SSE event:', parseError);
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Analysis error:', err);
            setError(err instanceof Error ? err.message : 'Failed to analyze. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleNextStep = async (priorities?: StrategicPriority[]) => {
        if (!result || currentStep >= 3) return;

        // If priorities are provided (from StrategicInferenceStep), store them
        const prioritiesToUse = priorities || selectedPriorities;
        if (priorities) {
            setSelectedPriorities(priorities);
        }

        // Helper to create a fingerprint of priorities for change detection
        const getPriorityFingerprint = (p: StrategicPriority[]): string => {
            return p.map(pr => pr.priority).sort().join('|');
        };

        // Helper to check if data exists for the next step AND priorities haven't changed
        const hasValidDataForNextStep = (): boolean => {
            if (currentStep === 2) {
                // Check if twoPaths already has content
                const hasData = result.twoPaths.reimagination.length > 0 || result.twoPaths.efficiency.length > 0;
                if (!hasData) return false;

                // If new priorities are passed, check if they differ from stored
                if (priorities) {
                    const newFingerprint = getPriorityFingerprint(priorities);
                    const storedFingerprint = getPriorityFingerprint(selectedPriorities);

                    // If priorities differ, need to regenerate
                    if (newFingerprint !== storedFingerprint) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        };

        // If valid data already exists, just navigate forward without regenerating
        if (hasValidDataForNextStep()) {
            setCurrentStep((prev) => (prev + 1) as AnalysisStep);

            // Scroll to content section
            setTimeout(() => {
                const contentSection = document.querySelector('section.py-16');
                if (contentSection) {
                    const yOffset = -100;
                    const y = contentSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
            return;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            // Call the appropriate API based on current step
            if (currentStep === 2) {
                // Strategic Inference -> Two Paths: Call step2-stream for use case generation
                setProgressSteps([{ id: 1, label: 'Generating AI opportunities', status: 'active' }]);
                setStreamEvents([]); // Reset stream events for new phase

                const response = await fetch('/api/tool/step2-stream', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        companyData: result.companyData,
                        strategicPriorities: prioritiesToUse, // Use user-selected priorities (approved + custom)
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to generate use cases');
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
                                const eventData = JSON.parse(line.slice(6)) as StreamEvent;
                                setStreamEvents(prev => [...prev, eventData]);

                                if (eventData.type === 'complete' && eventData.data) {
                                    const { twoPaths } = eventData.data as {
                                        twoPaths: AnalysisResult['twoPaths'];
                                    };

                                    console.log('[Frontend] Step2 complete (Two Paths):', eventData.data);

                                    // Update result with twoPaths
                                    setResult({
                                        ...result,
                                        twoPaths,
                                    });
                                }

                                if (eventData.type === 'error') {
                                    throw new Error(eventData.error || 'Use case generation failed');
                                }
                            } catch (parseError) {
                                console.error('Failed to parse SSE event:', parseError);
                            }
                        }
                    }
                }

            }
            // Step 3 (TwoPathsStep) is now the final step - no more navigation needed

            // Move to next step AFTER data is set
            setCurrentStep((prev) => (prev + 1) as AnalysisStep);

            // Scroll to content section (not all the way to top)
            setTimeout(() => {
                const contentSection = document.querySelector('section.py-16');
                if (contentSection) {
                    const yOffset = -100; // Offset for fixed header
                    const y = contentSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);

        } catch (err) {
            console.error('Step error:', err);
            setError(err instanceof Error ? err.message : 'Failed to proceed. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as AnalysisStep);

            // Scroll to content section
            setTimeout(() => {
                const contentSection = document.querySelector('section.py-16');
                if (contentSection) {
                    const yOffset = -100; // Offset for fixed header
                    const y = contentSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="AI Use Case Explorer" />


            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-medium tracking-tighter mb-6"
                    >
                        AI Use Case Explorer
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        A conversation starter: exploring how AI might accelerate your strategy.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-left max-w-2xl mx-auto"
                    >
                        <p className="text-foreground/80 leading-relaxed">
                            This tool is designed to help you start thinking about how AI could support your business strategy, based on public signals and industry context.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Progress Indicator */}
            {currentStep > 1 && (
                <section className="py-8 px-6 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-2 rounded-full transition-all duration-300 ${step <= currentStep
                                            ? 'bg-accent w-12'
                                            : 'bg-gray-200 w-8'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="text-sm text-foreground/60">
                                Step {currentStep} of 3
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="flex-1 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <InputStep
                                key="step-1"
                                onAnalyze={handleAnalyze}
                                isAnalyzing={isAnalyzing}
                                error={error}
                                streamEvents={streamEvents}
                            />
                        )}


                        {currentStep === 2 && result && (
                            <StrategicInferenceStep
                                key="step-2"
                                data={result.strategicInference}
                                companyData={result.companyData}
                                onNext={handleNextStep}
                                onBack={handlePrevStep}
                                isAnalyzing={isAnalyzing}
                                streamEvents={streamEvents}
                                initialSelectedPriorities={selectedPriorities}
                            />
                        )}


                        {currentStep === 3 && result && result.twoPaths && (
                            <TwoPathsStep
                                key="step-3"
                                data={result.twoPaths}
                                strategicPriorities={result.strategicInference?.priorities}
                                companyData={result.companyData}
                                strategicInference={result.strategicInference}
                                onBack={handlePrevStep}
                                isAnalyzing={isAnalyzing}
                                streamEvents={streamEvents}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </main>
    );
}
