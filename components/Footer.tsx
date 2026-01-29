import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    const exploreLinks = [
        { name: "Who We Are", href: "/about" },
        { name: "How We Think", href: "/how-we-think" },
        { name: "What We Do", href: "/#what-we-do" },
        { name: "How We Work", href: "/how-we-work" },
        { name: "Careers", href: "/careers" },
        { name: "AI Use Case Explorer", href: "/tools/ai-explorer" },
    ];

    const connectLinks = [
        { name: "LinkedIn", href: "https://www.linkedin.com/company/foremost-ai/" },
    ];

    return (
        <footer className="bg-background border-t border-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <Link href="/" className="block">
                            <Logo className="h-8 w-auto" />
                        </Link>
                        <p className="text-foreground/60 max-w-sm font-medium">
                            Applied intelligence for leadership.
                        </p>
                    </div>

                    {/* Explore */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
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

                    {/* Connect */}
                    <div className="md:col-span-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/40 mb-4">
                            Connect
                        </h4>
                        <div className="space-y-4">
                            <a
                                href="mailto:office@foremost.ai"
                                className="block text-lg font-medium text-foreground hover:text-accent transition-colors"
                            >
                                office@foremost.ai
                            </a>
                            <a
                                href="mailto:office@foremost.ai"
                                className="inline-flex items-center justify-center px-6 py-3 border border-foreground/10 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-colors w-fit"
                            >
                                Schedule a Discussion
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
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
