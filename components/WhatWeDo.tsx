"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, WHAT_WE_DO_INTRO } from "@/lib/content";

export default function WhatWeDo() {
    // State: Set of expanded pillar indices (allows multiple open)
    const [expandedPillars, setExpandedPillars] = useState<Set<number>>(new Set([0])); // First pillar expanded by default

    // Handle anchor links from "How We Think" page
    useEffect(() => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            const pillarIndex = SERVICES.findIndex(
                p => p.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-') === hash
            );
            if (pillarIndex !== -1) {
                setExpandedPillars(prev => new Set(prev).add(pillarIndex));
                // Delay to ensure expansion animation completes, then scroll with offset for fixed header
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        const headerOffset = 100; // Fixed header height (80px) + padding (20px)
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 350); // Wait for expansion animation (300ms) + small buffer
            }
        }
    }, []);

    const togglePillar = (index: number) => {
        setExpandedPillars(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <section id="what-we-do" className="py-24 md:py-32 px-6 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Intro Header */}
                <div className="mb-24 max-w-4xl">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">What We Do</h2>
                    <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        {WHAT_WE_DO_INTRO.title}
                    </h3>
                    <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl">
                        {WHAT_WE_DO_INTRO.description}
                    </p>
                </div>

                {/* Pillars Accordion */}
                <div className="space-y-6">
                    {SERVICES.map((pillar, index) => {
                        // Create kebab-case ID from pillar title
                        const pillarId = pillar.title
                            .toLowerCase()
                            .replace(/\s+&\s+/g, '-')
                            .replace(/\s+/g, '-');

                        const isExpanded = expandedPillars.has(index);

                        return (
                            <motion.div
                                key={pillar.title}
                                id={pillarId}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="border border-gray-100 rounded-lg overflow-hidden bg-white"
                            >
                                {/* Pillar Header (Clickable) */}
                                <button
                                    onClick={() => togglePillar(index)}
                                    className="w-full text-left px-8 py-8 hover:bg-gray-50/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    aria-expanded={isExpanded}
                                    aria-controls={`pillar-content-${index}`}
                                >
                                    <div className="flex items-start justify-between gap-8">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-6 mb-4">
                                                {/* Enhanced Number Indicator */}
                                                <span className="text-6xl md:text-7xl font-light text-accent/30 leading-none -mt-2">
                                                    0{index + 1}
                                                </span>
                                                <div className="flex-1 pt-1">
                                                    <h4 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-3">
                                                        {pillar.title}
                                                    </h4>
                                                    <p className="text-accent font-medium text-lg mb-4">
                                                        {pillar.tagline}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-foreground/70 leading-relaxed max-w-3xl ml-0 md:ml-[5.5rem]">
                                                {pillar.description}
                                            </p>
                                        </div>

                                        {/* Chevron Icon */}
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex-shrink-0 mt-2"
                                        >
                                            <svg
                                                className="w-6 h-6 text-accent"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </button>

                                {/* Pillar Content (Collapsible) */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            id={`pillar-content-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8 pt-4 border-t border-gray-100">
                                                {/* Service Capabilities */}
                                                {pillar.services.some((s: any) => s.group) ? (
                                                    <div className="space-y-12">
                                                        {Array.from(new Set(pillar.services.map((s: any) => s.group).filter(Boolean))).map((group: any) => (
                                                            <div key={group} className="space-y-6">
                                                                <h5 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 border-b border-gray-100 pb-2">
                                                                    {group}
                                                                </h5>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                                                    {pillar.services.filter((s: any) => s.group === group).map((service) => (
                                                                        <div key={service.title} className="group">
                                                                            <h5 className="text-lg font-medium mb-3 group-hover:text-accent transition-colors duration-300">
                                                                                {service.title}
                                                                            </h5>
                                                                            <p className="text-sm text-foreground/60 leading-relaxed">
                                                                                {service.description}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-6">
                                                        {pillar.services.map((service) => (
                                                            <div key={service.title} className="group">
                                                                <h5 className="text-lg font-medium mb-3 group-hover:text-accent transition-colors duration-300">
                                                                    {service.title}
                                                                </h5>
                                                                <p className="text-sm text-foreground/60 leading-relaxed">
                                                                    {service.description}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Strategic CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-32 pt-16 border-t border-gray-100 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-6">
                        Ready to cut through the noise?
                    </h3>
                    <p className="text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Let's talk about what matters most.
                    </p>
                    <a
                        href="mailto:office@foremost.ai"
                        className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
                        aria-label="Send email to schedule a discussion"
                    >
                        Schedule a Discussion
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
