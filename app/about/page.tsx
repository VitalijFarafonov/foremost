"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';

// PLACEHOLDER CONTENT - Update with actual firm story when available
const ABOUT_CONTENT = {
    founding: {
        headline: "Built by practitioners, for leaders",
        story: "Foremost was founded by experienced business and technology professionals alongside leading AI experts. We saw boards and executive teams overwhelmed by AI noise, surrounded by technology vendors selling solutions and consultancies selling methodologies, but lacking access to advisors who could sit alongside leadership and help them think clearly about what AI meant for their specific business.",
        passion: "We are passionate about bringing clarity to the human side of AI implementation. Technology alone doesn't transform organisations; people do. Our work focuses on helping leaders manage the fears, uncertainties, and organisational dynamics that determine whether AI initiatives succeed or stall.",
        mission: "We believe UK and EU businesses must embrace AI to remain globally competitive. Our role is to accelerate that adoption: thoughtfully, strategically, and with governance that enables rather than constrains."
    },
    approach: [
        {
            title: "We think in business outcomes, not technology features",
            description: "AI is a means to an end. Every engagement starts with your strategic priorities, not with what's technically possible."
        },
        {
            title: "We build capability, not dependency",
            description: "Our goal is to make ourselves unnecessary. We measure success by the confidence and competence we leave behind."
        },
        {
            title: "We speak truth to power",
            description: "Boards don't need more hype. They need honest assessment, clear trade-offs, and the confidence to make difficult decisions."
        }
    ],
    values: [
        { name: "Clarity", description: "We cut through noise to surface what matters." },
        { name: "Rigour", description: "Our advice is grounded in evidence, not fashion." },
        { name: "Integrity", description: "We say what we believe, not what clients want to hear." },
        { name: "Impact", description: "We focus on outcomes that move the P&L, not impressive slide decks." }
    ]
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="About" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        About Foremost.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Clarity, confidence, and meaningful progress for leaders embracing AI.
                    </motion.p>
                </div>
            </section>



            {/* Origin Story */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Our Story</h2>
                            <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">
                                {ABOUT_CONTENT.founding.headline}
                            </h3>
                            <p className="text-xl text-foreground/70 leading-relaxed max-w-4xl">
                                {ABOUT_CONTENT.founding.story}
                            </p>
                        </div>
                        <p className="text-xl text-foreground/70 leading-relaxed max-w-4xl">
                            {ABOUT_CONTENT.founding.passion}
                        </p>
                        <p className="text-xl text-foreground/80 leading-relaxed max-w-4xl font-medium">
                            {ABOUT_CONTENT.founding.mission}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-20 px-6 bg-accent/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Our Approach</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            What makes us different
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {ABOUT_CONTENT.approach.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="border-l-2 border-accent/20 pl-6"
                            >
                                <h4 className="text-xl font-medium mb-4">{item.title}</h4>
                                <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Our Values</h2>
                        <h3 className="text-3xl md:text-4xl font-medium tracking-tight">
                            What we stand for
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {ABOUT_CONTENT.values.map((value, index) => (
                            <motion.div
                                key={value.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white p-8 border border-gray-100"
                            >
                                <h4 className="text-2xl font-medium mb-3 text-accent">{value.name}</h4>
                                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <Team />

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "How We Think",
                        description: "Our four core beliefs",
                        href: "/how-we-think"
                    },
                    {
                        title: "How We Work",
                        description: "Our partnership approach",
                        href: "/how-we-work"
                    },
                    {
                        title: "What We Do",
                        description: "Our advisory capabilities",
                        href: "/#what-we-do"
                    },
                ]}
            />

            {/* CTA Section */}
            <section className="py-32 px-6 bg-accent/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
                        Ready to bring clarity to your AI agenda?
                    </h2>
                    <a
                        href="mailto:office@foremost.ai"
                        className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
                    >
                        Start a Conversation
                    </a>
                </div>
            </section>

            <Footer />
        </main>
    );
}
