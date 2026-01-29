"use client";

import { TEAM_MEMBERS } from "@/lib/content";

export default function Team() {
    return (
        <section id="team" className="py-24 md:py-32 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-foreground/40 mb-4">Team</h2>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight max-w-3xl">
                        Where rigorous thinking meets practical execution.
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TEAM_MEMBERS.map((member) => (
                        <div key={member.name} className="group bg-white p-8 border border-gray-100 hover:border-accent/20 transition-colors duration-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mb-6 flex items-center justify-center text-foreground/20 text-xs overflow-hidden">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-medium text-foreground/40">
                                        {member.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <h4 className="text-lg font-medium mb-1">{member.name}</h4>
                            <p className="text-sm text-foreground/50 mb-4">{member.role}</p>
                            <p className="text-foreground/70 leading-relaxed text-sm">
                                {member.bio}
                            </p>
                            {member.linkedin && (
                                <a href={member.linkedin} className="inline-block mt-4 text-xs font-medium text-accent hover:underline">
                                    LinkedIn →
                                </a>
                            )}
                        </div>
                    ))}

                    {/* Collective Placeholder */}
                    <div className="group bg-white p-8 border border-gray-100 hover:border-accent/20 transition-colors duration-500">
                        <div className="mb-6 h-16 flex items-center">
                            <span className="text-2xl font-medium text-foreground/10">The Network</span>
                        </div>

                        <h4 className="text-lg font-medium mb-1">Subject Matter Experts</h4>
                        <p className="text-sm text-foreground/50 mb-4">Global</p>
                        <p className="text-foreground/70 leading-relaxed text-sm">
                            A curated network of domain experts in specific verticals, regulatory frameworks, and technical implementation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
