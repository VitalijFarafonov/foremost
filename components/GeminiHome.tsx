import Header from "./Header";
import Hero from "./Hero";

import Footer from "./Footer";
import CTASection from "./CTASection";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GeminiHome() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <Hero />



            {/* The Problem We Solve */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-4xl mx-auto">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-medium tracking-tight mb-10"
                    >
                        Most organisations are busy with AI. Very few are being strategic about it.
                    </motion.h2>
                    <div className="space-y-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-foreground/70 leading-relaxed"
                        >
                            Boards are under pressure to act on AI. The result is often a rush toward pilots, platforms, and partners, without the strategic clarity to know which investments will matter in three years and which are noise.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg md:text-xl text-foreground/70 leading-relaxed"
                        >
                            The gap isn&apos;t technology. It&apos;s judgement. Knowing where AI creates genuine advantage for <em>your</em> business, where it doesn&apos;t, and having the governance to move with both speed and confidence.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg md:text-xl text-foreground/80 leading-relaxed font-medium"
                        >
                            Our role is to sit alongside leadership teams, helping them think clearly, then building and delivering alongside them so that decisions become real outcomes.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Where We Focus — Four Pillars */}
            <section className="py-16 md:py-20 px-6 bg-background-card">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Four Pillars</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            Where we create value.
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Strategic Clarity', tagline: 'From noise to clear priorities.', anchor: 'strategic-clarity' },
                            { title: 'Applied Intelligence', tagline: 'From pilots to scaled value.', anchor: 'applied-intelligence' },
                            { title: 'Human Potential', tagline: 'Elevating people alongside AI.', anchor: 'human-potential-&-imagination' },
                            { title: 'Governance', tagline: 'Guardrails for speed with confidence.', anchor: 'governance-as-enabler' },
                        ].map((pillar, index) => (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/what-we-do#${pillar.anchor}`}
                                    className="block p-8 border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 h-full"
                                >
                                    <h4 className="text-xl font-medium mb-3">{pillar.title}</h4>
                                    <p className="text-foreground/60 leading-relaxed mb-4">{pillar.tagline}</p>
                                    <span className="text-sm font-medium text-accent">Learn more →</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conviction Line */}
            <section className="py-16 md:py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="pl-8 border-l-4 border-accent/40 bg-accent/[0.03] py-6 pr-6 rounded-r-lg"
                    >
                        <p className="text-2xl md:text-3xl text-foreground/80 italic leading-relaxed font-light">
                            &ldquo;There is no standalone AI strategy. There are only business strategies that are more, or less, well-positioned for an AI-enabled world.&rdquo;
                        </p>
                        <p className="text-lg text-foreground/60 leading-relaxed mt-6">
                            This is where every engagement starts. We begin with your business, and only then design, build, and embed AI solutions that deliver measurable value.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* AI Explorer — Think With Us */}
            <section className="py-16 md:py-20 px-6 bg-background-card">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className=""
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Think With Us</h2>
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                            Where could AI create genuine advantage for your business?
                        </h3>
                        <p className="text-lg text-foreground/60 leading-relaxed mb-6 max-w-2xl">
                            Our AI Explorer helps leadership teams start thinking strategically about where AI could generate real value. Enter your industry and priorities, and in three minutes you&apos;ll have a clearer view of what deserves attention.
                        </p>
                        <Link
                            href="/tools/ai-explorer"
                            className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                        >
                            Begin the exercise →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Navigation Cards */}
            <section className="py-20 md:py-28 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/what-we-do" className="group block border border-border p-10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                            <h3 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors">What We Do</h3>
                            <p className="text-foreground/60 leading-relaxed mb-6">Advisory and execution across strategy, applied intelligence, people, and governance.</p>
                            <span className="text-sm font-medium text-accent">
                                Explore services →
                            </span>
                        </Link>

                        <Link href="/about" className="group block border border-border p-10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                            <h3 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors">Who We Are</h3>
                            <p className="text-foreground/60 leading-relaxed mb-6">Partners with backgrounds spanning MIT, Amazon, Microsoft, Deloitte, and EY: practitioners who&apos;ve led AI strategy, technology, and transformation at scale.</p>
                            <span className="text-sm font-medium text-accent">
                                Meet the team →
                            </span>
                        </Link>

                        <Link href="/how-we-work" className="group block border border-border p-10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                            <h3 className="text-2xl font-medium mb-4 group-hover:text-accent transition-colors">How We Work</h3>
                            <p className="text-foreground/60 leading-relaxed mb-6">Our approach: build your capability, not your dependency. Honest counsel, clear outcomes.</p>
                            <span className="text-sm font-medium text-accent">
                                Our approach →
                            </span>
                        </Link>
                    </div>
                </div>
            </section>

            <CTASection headline="Clarity starts with a conversation." variant="dark" />


            <Footer />
        </main>
    );
}
