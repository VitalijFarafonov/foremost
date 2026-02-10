"use client";

export default function Careers() {
    return (
        <section className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Join Us</h2>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
                        Building the future of board-level AI advisory
                    </h3>

                    <div className="space-y-6 text-foreground/70 leading-relaxed">
                        <p className="text-lg md:text-xl">
                            We're looking for people who share our commitment to clarity, rigour, and meaningful impact.
                        </p>

                        <p>
                            Our work sits at the intersection of strategy, leadership, and AI advisory. We help boards and executive teams chart a course through complexity with confidence. That requires people who think deeply, communicate clearly, and understand that great advisory work is built on trust, judgement, and discipline.
                        </p>

                        <div className="pt-8 border-t border-foreground/10">
                            <h4 className="text-lg font-medium mb-4 text-foreground">What we look for</h4>
                            <ul className="space-y-3 text-foreground/70">
                                <li className="flex items-start">
                                    <span className="text-accent mr-3 mt-1">-</span>
                                    <span>Strategic thinkers who can translate complexity into clarity for senior leaders</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-3 mt-1">-</span>
                                    <span>Client-focused professionals who listen first and build relationships on substance, not hype</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-3 mt-1">-</span>
                                    <span>People who value outcomes over outputs and understand that real value comes from scaled impact, not pilots</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-accent mr-3 mt-1">-</span>
                                    <span>Professionals comfortable working across the UK and Europe, understanding the nuances of different markets and regulatory environments</span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-8">
                            <p className="text-foreground/70">
                                We're building a firm where rigorous thinking meets practical execution. Where calm authority replaces hype. Where leaders come for clarity and leave with confidence.
                            </p>
                        </div>

                        <div className="pt-8">
                            <p className="text-foreground/70 mb-6">
                                If that resonates, we'd like to hear from you.
                            </p>
                            <a
                                href="mailto:careers@foremost.ai"
                                className="inline-block text-foreground font-medium border-b-2 border-accent/30 hover:border-accent transition-colors duration-300 pb-1"
                            >
                                Get in touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
