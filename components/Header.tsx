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
        { name: "What We Do", href: "/what-we-do" },
        { name: "Who We Are", href: "/about" },
        { name: "How We Work", href: "/how-we-work" },
        { name: "Careers", href: "/careers" },
    ];

    const handleNavClick = () => {
        setIsOpen(false);
    };

    const isActive = (href: string) => {
        return pathname === href;
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/10">
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
                            onClick={() => handleNavClick()}
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
                        className="px-5 py-2.5 text-sm font-medium border border-foreground/10 rounded-sm hover:bg-foreground hover:text-background transition-all duration-300"
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
                        className="md:hidden bg-background border-b border-border"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleNavClick()}
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
