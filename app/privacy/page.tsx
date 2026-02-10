"use client";

import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />
            <Breadcrumb currentPage="Privacy Policy" />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-medium tracking-tighter mb-8"
                    >
                        Privacy Policy.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-relaxed"
                    >
                        Last updated: January 2026
                    </motion.p>
                </div>
            </section>

            <section className="flex-1 pb-20 px-6 border-t border-gray-100">
                <div className="max-w-4xl mx-auto pt-12">

                    <div className="prose prose-lg max-w-none space-y-8 text-foreground/80">
                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">1. Introduction</h2>
                            <p className="leading-relaxed">
                                Foremost.ai ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">2. Information We Collect</h2>
                            <p className="leading-relaxed mb-4">We may collect and process the following data:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Contact information</strong>: Name, email address, and company details when you reach out to us.</li>
                                <li><strong>Newsletter subscriptions</strong>: Email address when you subscribe to our insights.</li>
                                <li><strong>Usage data</strong>: Anonymised information about how you interact with our website.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">3. How We Use Your Information</h2>
                            <p className="leading-relaxed mb-4">We use your data to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Respond to your enquiries and provide our advisory services</li>
                                <li>Send you our quarterly newsletter (if subscribed)</li>
                                <li>Improve our website and user experience</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">4. Data Sharing</h2>
                            <p className="leading-relaxed">
                                We do not sell your personal data. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">5. Your Rights</h2>
                            <p className="leading-relaxed mb-4">Under GDPR and UK data protection law, you have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Data portability</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">6. Cookies</h2>
                            <p className="leading-relaxed">
                                We use essential cookies to ensure our website functions correctly. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-medium text-foreground mb-4">7. Contact Us</h2>
                            <p className="leading-relaxed">
                                For any questions about this privacy policy or your personal data, please contact us at{' '}
                                <a href="mailto:office@foremost.ai" className="text-accent hover:underline">
                                    office@foremost.ai
                                </a>.
                            </p>
                        </section>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
