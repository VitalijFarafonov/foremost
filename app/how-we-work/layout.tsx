import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How We Work',
    description: 'We build long-term partnerships that strengthen your capability to navigate AI independently. Learn about our engagement approach.',
    openGraph: {
        title: 'How We Work | Foremost.ai',
        description: 'Building capability, not dependency. Our approach to board-level AI advisory partnerships.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
