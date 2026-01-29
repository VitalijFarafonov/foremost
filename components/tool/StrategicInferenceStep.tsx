"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StrategicInferenceResult, CompanyData, StrategicPriority } from '@/lib/tool/types';
import type { StreamEvent } from '@/lib/tool/services/streamingTypes';
import ProgressiveLoading from './ProgressiveLoading';

interface StrategicInferenceStepProps {
    data: StrategicInferenceResult;
    companyData?: CompanyData;
    onNext: (selectedPriorities: StrategicPriority[]) => void;
    onBack: () => void;
    isAnalyzing?: boolean;
    streamEvents?: StreamEvent[];
    initialSelectedPriorities?: StrategicPriority[]; // For restoring state when navigating back
}

const confidenceColors = {
    high: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    low: 'bg-gray-100 text-gray-800 border-gray-200',
};

export default function StrategicInferenceStep({
    data,
    companyData,
    onNext,
    onBack,
    isAnalyzing = false,
    streamEvents = [],
    initialSelectedPriorities = [],
}: StrategicInferenceStepProps) {
    // Sort priorities by confidence: high -> medium -> low
    const confidenceOrder = { high: 0, medium: 1, low: 2 };
    const sortedPriorities = [...(data?.priorities || [])].sort(
        (a, b) => confidenceOrder[a.confidence] - confidenceOrder[b.confidence]
    );

    // Determine initial approved/rejected state based on initialSelectedPriorities
    const getInitialApproved = (): Set<number> => {
        // If we have stored selections, restore them
        if (initialSelectedPriorities.length > 0) {
            const approvedSet = new Set<number>();
            const storedPriorityTexts = new Set(initialSelectedPriorities.map(p => p.priority));
            sortedPriorities.forEach((p, index) => {
                if (storedPriorityTexts.has(p.priority)) {
                    approvedSet.add(index);
                }
            });
            return approvedSet;
        }
        // Default: all priorities are approved initially
        return new Set(sortedPriorities.map((_, i) => i));
    };

    // Get initial custom strategies from initialSelectedPriorities
    const getInitialCustomStrategies = (): string[] => {
        if (initialSelectedPriorities.length > 0) {
            return initialSelectedPriorities
                .filter(p => p.rationale === 'User-defined strategic priority')
                .map(p => p.priority);
        }
        return [];
    };

    // Track which priorities are approved (thumbs up)
    const [approvedPriorities, setApprovedPriorities] = useState<Set<number>>(getInitialApproved);
    const [rejectedPriorities, setRejectedPriorities] = useState<Set<number>>(new Set());

    // Custom strategies input (supports multiple)
    const [customStrategies, setCustomStrategies] = useState<string[]>(getInitialCustomStrategies);
    const [showCustomInput, setShowCustomInput] = useState(getInitialCustomStrategies().length > 0);
    const [newCustomStrategy, setNewCustomStrategy] = useState('');

    // Editing state for LLM-generated priorities
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedPriorities, setEditedPriorities] = useState<Map<number, string>>(new Map());

    // Editing state for custom priorities
    const [editingCustomIndex, setEditingCustomIndex] = useState<number | null>(null);

    const handleThumbsUp = (index: number) => {
        const newApproved = new Set(approvedPriorities);
        const newRejected = new Set(rejectedPriorities);

        // Toggle behavior: clicking thumbs up always selects it (can't unselect)
        // If already approved, do nothing (stay approved)
        if (!approvedPriorities.has(index)) {
            newApproved.add(index);
            newRejected.delete(index);
        }

        setApprovedPriorities(newApproved);
        setRejectedPriorities(newRejected);
    };

    const handleThumbsDown = (index: number) => {
        const newApproved = new Set(approvedPriorities);
        const newRejected = new Set(rejectedPriorities);

        // Toggle behavior: clicking thumbs down always selects it (can't unselect)
        // If already rejected, do nothing (stay rejected)
        if (!rejectedPriorities.has(index)) {
            newRejected.add(index);
            newApproved.delete(index);
        }

        setApprovedPriorities(newApproved);
        setRejectedPriorities(newRejected);
    };

    const handleStartEdit = (index: number) => {
        setEditingIndex(index);
        // Initialize with current priority text (either edited or original)
        if (!editedPriorities.has(index)) {
            const newEdited = new Map(editedPriorities);
            newEdited.set(index, sortedPriorities[index].priority);
            setEditedPriorities(newEdited);
        }
    };

    const handleSaveEdit = (index: number, newText: string) => {
        const newEdited = new Map(editedPriorities);
        newEdited.set(index, newText.trim());
        setEditedPriorities(newEdited);
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    const handleNext = () => {
        // Build list of selected priorities
        const selectedPriorities: StrategicPriority[] = [];

        // Add approved inferred priorities (with any edits applied)
        sortedPriorities.forEach((priority, index) => {
            if (approvedPriorities.has(index)) {
                // Use edited version if available
                const priorityText = editedPriorities.get(index) || priority.priority;
                selectedPriorities.push({
                    ...priority,
                    priority: priorityText,
                });
            }
        });

        // Add custom strategies if provided
        customStrategies.forEach(strategy => {
            if (strategy.trim()) {
                selectedPriorities.unshift({
                    priority: strategy.trim(),
                    confidence: 'high',
                    evidence: [],
                    rationale: 'User-defined strategic priority',
                });
            }
        });

        onNext(selectedPriorities);
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
                Strategic Inference
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Based on public signals, here's our inferred view of your strategic priorities.
                <span className="text-foreground/90"> Vote on each or add your own.</span>
            </p>

            {/* Two-column layout: Priorities (left) | Company Context (right) */}
            <div className="grid lg:grid-cols-3 gap-8 mb-10">
                {/* Left Column: Strategic Priorities (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-4">
                        Likely Strategic Priorities
                    </h3>
                    {sortedPriorities.map((priority, index) => {
                        const isApproved = approvedPriorities.has(index);
                        const isRejected = rejectedPriorities.has(index);
                        const isEditing = editingIndex === index;
                        const displayPriority = editedPriorities.get(index) || priority.priority;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`bg-white border rounded-lg p-6 transition-all duration-300 ${isRejected
                                    ? 'border-red-200 opacity-50'
                                    : isApproved
                                        ? 'border-green-300 shadow-sm'
                                        : 'border-gray-200'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    {isEditing ? (
                                        <div className="flex-1 mr-4">
                                            <textarea
                                                value={editedPriorities.get(index) || priority.priority}
                                                onChange={(e) => {
                                                    const newEdited = new Map(editedPriorities);
                                                    newEdited.set(index, e.target.value);
                                                    setEditedPriorities(newEdited);
                                                }}
                                                className="w-full px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none text-lg font-medium"
                                                rows={2}
                                                autoFocus
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handleSaveEdit(index, editedPriorities.get(index) || priority.priority)}
                                                    className="px-3 py-1 bg-accent text-white rounded text-sm font-medium hover:bg-accent/90 transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <h4 className="text-lg font-medium text-foreground flex-1">
                                            {index + 1}. {displayPriority}
                                            {editedPriorities.has(index) && (
                                                <span className="ml-2 text-xs text-accent">(edited)</span>
                                            )}
                                        </h4>
                                    )}
                                    {/* Edit and Thumbs Up/Down Buttons */}
                                    {!isEditing && (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleStartEdit(index)}
                                                className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-accent transition-all"
                                                title="Edit this priority"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleThumbsUp(index)}
                                                className={`p-1.5 rounded-full transition-all ${isApproved
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'text-gray-400 hover:bg-gray-100 hover:text-green-600'
                                                    }`}
                                                title="Include this priority"
                                            >
                                                <svg className="w-4 h-4" fill={isApproved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleThumbsDown(index)}
                                                className={`p-1.5 rounded-full transition-all ${isRejected
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'text-gray-400 hover:bg-gray-100 hover:text-red-600'
                                                    }`}
                                                title="Exclude this priority"
                                            >
                                                <svg className="w-4 h-4" fill={isRejected ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Strategic Rationale - Board-level explanation */}
                                {priority.rationale && !isRejected && !isEditing && (
                                    <div className="bg-accent/5 rounded-lg p-4">
                                        <p className="text-sm font-medium text-accent mb-2">
                                            Strategic Rationale
                                        </p>
                                        <p className="text-foreground/80 leading-relaxed text-sm">
                                            {priority.rationale}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Add Custom Strategy Section */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-foreground/60 uppercase tracking-wider">
                                Your Strategic Priorities
                            </h3>
                            {!showCustomInput && (
                                <button
                                    onClick={() => setShowCustomInput(true)}
                                    className="flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add priority
                                </button>
                            )}
                        </div>

                        {/* Existing custom strategies */}
                        {customStrategies.length > 0 && (
                            <div className="space-y-3 mb-4">
                                {customStrategies.map((strategy, index) => {
                                    const isEditingCustom = editingCustomIndex === index;

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/30 rounded-lg p-4 group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-medium rounded">
                                                            Custom
                                                        </span>
                                                    </div>
                                                    {isEditingCustom ? (
                                                        <div className="mt-2">
                                                            <textarea
                                                                value={strategy}
                                                                onChange={(e) => {
                                                                    setCustomStrategies(prev =>
                                                                        prev.map((s, i) => i === index ? e.target.value : s)
                                                                    );
                                                                }}
                                                                className="w-full px-3 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none text-foreground font-medium"
                                                                rows={2}
                                                                autoFocus
                                                            />
                                                            <div className="flex gap-2 mt-2">
                                                                <button
                                                                    onClick={() => setEditingCustomIndex(null)}
                                                                    className="px-3 py-1 bg-accent text-white rounded text-sm font-medium hover:bg-accent/90 transition-colors"
                                                                >
                                                                    Done
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-foreground font-medium">{strategy}</p>
                                                    )}
                                                </div>
                                                {!isEditingCustom && (
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                        <button
                                                            onClick={() => setEditingCustomIndex(index)}
                                                            className="p-1.5 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-full transition-all"
                                                            title="Edit this priority"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setCustomStrategies(prev => prev.filter((_, i) => i !== index));
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                            title="Remove this priority"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Add new custom strategy input */}
                        {showCustomInput && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border-2 border-dashed border-accent/30 rounded-lg p-5 hover:border-accent/50 transition-colors"
                            >
                                <label className="text-sm font-medium text-accent mb-3 block">
                                    Add a strategic priority
                                </label>
                                <textarea
                                    value={newCustomStrategy}
                                    onChange={(e) => setNewCustomStrategy(e.target.value)}
                                    placeholder="e.g., Expand into adjacent markets through strategic acquisitions"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none text-foreground"
                                    rows={2}
                                    autoFocus
                                />
                                <div className="flex items-center justify-between mt-3">
                                    <p className="text-xs text-foreground/50">
                                        This will be prioritised when generating AI opportunities.
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setShowCustomInput(false);
                                                setNewCustomStrategy('');
                                            }}
                                            className="px-3 py-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (newCustomStrategy.trim()) {
                                                    setCustomStrategies(prev => [...prev, newCustomStrategy.trim()]);
                                                    setNewCustomStrategy('');
                                                    // Keep input open for adding more
                                                }
                                            }}
                                            disabled={!newCustomStrategy.trim()}
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${newCustomStrategy.trim()
                                                ? 'bg-accent text-white hover:bg-accent/90'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Show "Add another" button after adding first one */}
                        {customStrategies.length > 0 && !showCustomInput && (
                            <button
                                onClick={() => setShowCustomInput(true)}
                                className="w-full mt-3 py-3 border-2 border-dashed border-gray-200 rounded-lg text-gray-500 hover:border-accent/50 hover:text-accent transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add another priority
                            </button>
                        )}
                    </div>

                    {/* Continue Button - Under strategies */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleNext}
                            disabled={isAnalyzing || (approvedPriorities.size === 0 && customStrategies.length === 0)}
                            className={`w-full px-8 py-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 ${isAnalyzing || (approvedPriorities.size === 0 && customStrategies.length === 0)
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-foreground text-background hover:bg-accent'
                                }`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Explore AI Use Cases
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Column: Company Context (1/3 width) */}
                <div className="space-y-6">
                    {/* Company Description Pane */}
                    {companyData && (
                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h3 className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                    Company Overview
                                </h3>
                            </div>
                            <h4 className="text-base font-medium text-foreground mb-1">
                                {companyData.companyName}
                            </h4>
                            <p className="text-xs text-foreground/50 mb-3">
                                {companyData.industry}
                            </p>
                            <p className="text-foreground/70 text-sm leading-relaxed">
                                {companyData.description}
                            </p>
                            {companyData.keyThemes && companyData.keyThemes.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                                        Key Themes
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {companyData.keyThemes.slice(0, 5).map((theme, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                                {theme}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Competitors Pane */}
                    {companyData?.competitors && companyData.competitors.length > 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h3 className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                                    Example Competitors
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {companyData.competitors.map((competitor, i) => (
                                    <li key={i} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                                        <p className="font-medium text-foreground text-sm">
                                            {competitor.name}
                                        </p>
                                        <p className="text-foreground/60 text-xs mt-0.5 leading-relaxed">
                                            {competitor.strategicFocus}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Selection Summary */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider mb-2">
                            Selection Summary
                        </p>
                        <p className="text-sm text-foreground/70">
                            <span className="font-medium text-green-600">{approvedPriorities.size}</span> priorities selected
                            {customStrategies.length > 0 && (
                                <span className="text-accent"> + {customStrategies.length} custom</span>
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Disclaimer - at the bottom */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-foreground/60 leading-relaxed">
                    <strong className="text-foreground/70">Note:</strong> This analysis is based on your company's public information, with AI use cases generated to support these priorities. It should be validated against your internal strategy.
                </p>
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

