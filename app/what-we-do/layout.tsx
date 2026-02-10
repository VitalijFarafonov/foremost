import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'What We Do',
    description: 'Strategically applied intelligence. Advisory services across strategic clarity, applied intelligence, human potential, and AI governance for boards and executive teams.',
};

export default function WhatWeDoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
