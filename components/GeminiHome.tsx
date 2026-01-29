import Header from "./Header";
import Hero from "./Hero";
import ThinkingTeaser from "./ThinkingTeaser";
import WhatWeDo from "./WhatWeDo";
import Thinking from "./Thinking";
import NewsletterSignup from "./NewsletterSignup";
import Footer from "./Footer";

export default function GeminiHome() {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <Hero />
            <ThinkingTeaser />
            <WhatWeDo />
            <Thinking />
            <NewsletterSignup />
            <Footer />
        </main>
    );
}
