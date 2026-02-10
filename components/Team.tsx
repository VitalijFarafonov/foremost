"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/lib/content";

export default function Team() {
    return (
        <section id="team" className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Team</h2>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight max-w-3xl">
                        Where rigorous thinking meets practical execution.
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TEAM_MEMBERS.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group bg-white p-8 border border-border hover:border-accent/20 transition-colors duration-500"
                        >
                            <div className="w-24 h-24 bg-gray-100 rounded-full mb-6 flex items-center justify-center overflow-hidden">
                                {member.image ? (
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover transition-transform duration-500"
                                        style={{ transform: `translateY(${member.imagePosition || '0%'}) scale(1.5)` }}
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="text-3xl font-medium text-foreground/30">
                                        {member.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <h4 className="text-lg font-medium mb-1">{member.name}</h4>
                            <p className="text-sm text-foreground/50 mb-4">{member.role}</p>
                            <p className="text-foreground/70 leading-relaxed text-sm">
                                {member.bio}
                            </p>
                            {member.credentials && member.credentials.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {member.credentials.map((credential: string) => (
                                        <span
                                            key={credential}
                                            className="text-xs text-foreground/40 bg-gray-50 px-2.5 py-1 border border-border"
                                        >
                                            {credential}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {member.linkedin && (
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-xs font-medium text-accent hover:underline"
                                >
                                    LinkedIn →
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
