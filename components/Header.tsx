"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Who We Are", href: "/about" },
        { name: "How We Think", href: "/how-we-think" },
        { name: "What We Do", href: "/#what-we-do" },
        { name: "How We Work", href: "/how-we-work" },
        { name: "Careers", href: "/careers" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Only intercept if its a hash link AND we are on the home page
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    };

    const isActive = (href: string) => {
        if (href.startsWith('/#')) {
            return pathname === '/';
        }
        return pathname === href;
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group">
                    <Logo className="h-10 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                isActive(link.href)
                                    ? "text-foreground border-b-2 border-accent"
                                    : "text-foreground/70 hover:text-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="mailto:office@foremost.ai"
                        className="px-5 py-2.5 text-sm font-medium border border-foreground/10 rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
                        aria-label="Send email to office@foremost.ai"
                    >
                        Connect
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isOpen}
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={cn("block w-full h-0.5 bg-current transform transition-transform", isOpen && "rotate-45 translate-y-2")} />
                        <span className={cn("block w-full h-0.5 bg-current transition-opacity", isOpen && "opacity-0")} />
                        <span className={cn("block w-full h-0.5 bg-current transform transition-transform", isOpen && "-rotate-45 -translate-y-2.5")} />
                    </div>
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-gray-100"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-lg font-medium text-foreground/80"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <a
                                href="mailto:office@foremost.ai"
                                className="text-lg font-medium text-accent"
                                aria-label="Send email to office@foremost.ai"
                            >
                                Connect →
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
}
