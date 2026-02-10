"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';

const ABOUT_CONTENT = {
    founding: {
        headline: "Built by practitioners, for leaders",
        story: "Foremost was founded by experienced business and technology professionals alongside leading AI experts. We saw boards and executive teams overwhelmed by AI noise, surrounded by technology vendors and consultancies, but lacking access to partners who could sit alongside leadership, bringing strategic clarity and the hands-on capability to design, build, and deliver AI solutions that work.",
        passion: "We are passionate about bringing clarity to the human side of AI implementation. Technology alone doesn't transform organisations; people do. Our work focuses on helping leaders manage the fears, uncertainties, and organisational dynamics that determine whether AI initiatives succeed or stall.",
        mission: "We believe UK and EU businesses must embrace AI to remain globally competitive. Our role is to accelerate that adoption, from strategic clarity through to hands-on delivery, with governance that enables confident execution."
    },
    values: [
        { name: "Clarity", description: "We cut through noise to surface what matters. Complex situations deserve clear thinking, not more complexity." },
        { name: "Rigour", description: "Our advice is grounded in evidence, not fashion. We do the analytical work that earns the right to an opinion." },
        { name: "Flexibility", description: "Of thinking, of approach, and of engagement. Every business is different. We adapt our methods to your context, not the other way around." },
        { name: "Impact", description: "We focus on outcomes that move the P&L, not impressive slide decks. If it doesn\u0027t change a decision or a number, it isn\u0027t advice." }
    ]
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Who We Are" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Who We Are.
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
            <section className="py-20 px-6 border-t border-border">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
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

                        <hr className="border-t border-border" />

                        <p className="text-xl text-foreground/70 leading-relaxed max-w-4xl">
                            {ABOUT_CONTENT.founding.passion}
                        </p>

                        <div className="pl-8 border-l-4 border-accent/40 bg-accent/[0.03] py-6 pr-6 rounded-r-lg">
                            <p className="text-xl text-foreground/80 leading-relaxed max-w-4xl font-medium">
                                {ABOUT_CONTENT.founding.mission}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section — Centrepiece */}
            <Team />

            {/* Values */}
            <section className="py-20 px-6 border-t border-border">
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
                                className="p-8 border border-border"
                            >
                                <h4 className="text-2xl font-medium mb-3 text-foreground">{value.name}</h4>
                                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Content */}
            <RelatedContent
                links={[
                    {
                        title: "What We Do",
                        description: "Advisory services across strategy, applied intelligence, people, and governance.",
                        href: "/what-we-do"
                    },
                    {
                        title: "How We Work",
                        description: "Our approach: build your capability, not your dependency. Honest counsel, clear outcomes.",
                        href: "/how-we-work"
                    },
                ]}
            />

            <CTASection headline="Curious? So are we." />

            <Footer />
        </main>
    );
}
