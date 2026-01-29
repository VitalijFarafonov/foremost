"use client";

import Link from "next/link";

interface BreadcrumbProps {
    currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
    return (
        <nav className="md:hidden px-6 pt-24 pb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
                <li>
                    <Link
                        href="/"
                        className="text-foreground/40 hover:text-foreground transition-colors"
                    >
                        Home
                    </Link>
                </li>
                <li className="text-foreground/40">
                    <span>›</span>
                </li>
                <li>
                    <span className="text-foreground">{currentPage}</span>
                </li>
            </ol>
        </nav>
    );
}
