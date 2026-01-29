import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How We Think',
    description: 'Four core beliefs that guide Foremost.ai advisory. We believe in business strategy accelerated by intelligence, not isolated AI projects.',
    openGraph: {
        title: 'How We Think | Foremost.ai',
        description: 'Four core beliefs that guide Foremost.ai advisory. Clarity in complexity for board-level AI decisions.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
