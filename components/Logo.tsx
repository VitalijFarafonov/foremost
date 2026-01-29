"use client";

import Image from "next/image";

interface LogoProps {
    className?: string;
}

export default function Logo({ className = "h-8 w-auto" }: LogoProps) {
    return (
        <Image
            src="/logo_colour.jpg"
            alt="Foremost.ai"
            width={320}
            height={64}
            className={className}
            priority
        />
    );
}
