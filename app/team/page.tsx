"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import RelatedContent from '@/components/RelatedContent';
import Breadcrumb from '@/components/Breadcrumb';

export default function TeamPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Team" />
            <div className="pt-20">
                <Team />
            </div>

            <RelatedContent
                links={[
                    {
                        title: "How We Think",
                        description: "How we see AI's role in strategy",
                        href: "/how-we-think"
                    },
                    {
                        title: "How We Work",
                        description: "Partnership over dependency",
                        href: "/how-we-work"
                    },
                    {
                        title: "What We Do",
                        description: "Our advisory capabilities",
                        href: "/#what-we-do"
                    },
                ]}
            />

            <Footer />
        </main>
    );
}
