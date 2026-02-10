import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    const exploreLinks = [
        { name: "What We Do", href: "/what-we-do" },
        { name: "Who We Are", href: "/about" },
        { name: "How We Work", href: "/how-we-work" },
        { name: "Careers", href: "/careers" },
        { name: "AI Use Case Explorer", href: "/tools/ai-explorer" },
    ];

    const insightsLinks = [
        {
            name: "Beyond the Hype: 12 Things Every Business Leader Needs to Know About AI",
            href: "https://www.amcham.lu/newsletter/vitalij-farafonov-beyond-the-hype-12-things-every-business-leader-needs-to-know-about-ai/",
            external: true,
        },
    ];

    const connectLinks = [
        { name: "LinkedIn", href: "https://www.linkedin.com/company/foremost-ai/" },
    ];

    return (
        <footer className="bg-background-card border-t border-border py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="block">
                            <Logo className="h-8 w-auto" />
                        </Link>
                        <p className="text-foreground/60 max-w-sm font-medium">
                            Applied intelligence for the boardroom.
                        </p>
                        <p className="text-xs text-foreground/30 tracking-wide">
                            London · Luxembourg · Brussels
                        </p>
                    </div>

                    {/* Explore */}
                    <div className="md:col-span-2">
                        <h4 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">
                            Explore
                        </h4>
                        <ul className="space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Insights */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">
                            From the Practice
                        </h4>
                        <ul className="space-y-3">
                            {insightsLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-foreground/70 hover:text-foreground transition-colors leading-relaxed block"
                                        aria-label={`Read article (opens in new tab)`}
                                    >
                                        {link.name} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">
                            Connect
                        </h4>
                        <div className="space-y-4">
                            <a
                                href="mailto:office@foremost.ai"
                                className="block text-lg font-medium text-foreground hover:text-accent transition-colors"
                            >
                                office@foremost.ai
                            </a>

                            <div className="flex gap-4 pt-2">
                                {connectLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                                        aria-label={`Visit Foremost.ai on ${link.name} (opens in new tab)`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <p className="text-sm text-foreground/40">
                        © {new Date().getFullYear()} Foremost.ai. All rights reserved.
                    </p>
                    <Link
                        href="/privacy"
                        className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                    >
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
