import Link from "next/link";

export default function Thinking() {
    return (
        <section id="thinking" className="py-24 md:py-32 px-6 bg-foreground text-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-widest text-background/40 mb-4">From the Practice</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white">
                            Insights
                        </h3>
                    </div>
                    {/* <a href="#" className="hidden md:block text-sm font-medium text-white/60 hover:text-white transition-colors">View all →</a> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Link
                        href="https://www.amcham.lu/newsletter/vitalij-farafonov-beyond-the-hype-12-things-every-business-leader-needs-to-know-about-ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        aria-label="Read article on AmCham Luxembourg website (opens in new tab)"
                    >
                        <article className="border-t border-white/20 pt-8 group-hover:border-white/60 transition-colors duration-500">
                            <p className="text-sm text-white/40 mb-4">Thought Leadership / 2024</p>
                            <h4 className="text-2xl font-medium text-white mb-4 group-hover:text-white/90 transition-colors">
                                Beyond the Hype: 12 Things Every Business Leader Needs to Know About AI
                            </h4>
                            <p className="text-white/60 leading-relaxed mb-6">
                                A guide for leaders looking to cut through the noise and understand the practical implications of AI adoption.
                            </p>
                            <span className="inline-block text-sm font-medium text-white underline decoration-white/30 underline-offset-4 group-hover:decoration-white transition-all">
                                Read Article →
                            </span>
                        </article>
                    </Link>
                </div>
            </div>
        </section>
    );
}
