import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Team',
    description: 'Meet the Foremost.ai leadership team. Rigorous thinking and practical execution for board-level AI advisory.',
    openGraph: {
        title: 'Team | Foremost.ai',
        description: 'The leadership behind Foremost.ai. Strategic advisors helping boards navigate AI with confidence.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
