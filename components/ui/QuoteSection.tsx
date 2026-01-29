'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
    {
        text: "Talent is something you bloom, instinct is something you polish.",
        author: "Kiyotaka Ayanokoji",
        japanese: "才能は開花させるもの、センスは磨くもの。"
    },
    {
        text: "In this world, winning is everything. The winners write history, and the losers are erased from it.",
        author: "Kakeru Ryuuen",
        japanese: "この世界では勝つことが全てだ。"
    },
    {
        text: "People who can't throw something important away, can never hope to change anything.",
        author: "Arisu Sakayanagi",
        japanese: "大切なものを捨てられない人間は、何も変えることはできない。"
    },
    {
        text: "All people are nothing but tools. It doesn't matter how it's done.",
        author: "Kiyotaka Ayanokoji",
        japanese: "人は皆、道具に過ぎない。"
    },
    {
        text: "The strong devour the weak. That is the one ironclad rule of this world.",
        author: "Manabu Horikita",
        japanese: "弱肉強食。それがこの世界の鉄則だ。"
    },
];

export default function QuoteSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                setIsAnimating(true);
                setActiveIndex((prev) => (prev + 1) % quotes.length);
                setTimeout(() => setIsAnimating(false), 1000);
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const currentQuote = quotes[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative py-40 px-8 overflow-hidden"
            style={{ background: 'var(--elite-darker)' }}
        >
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, var(--text-muted) 0, var(--text-muted) 1px, transparent 0, transparent 50%)',
                    backgroundSize: '30px 30px',
                }}
            />

            {/* Crimson accent */}
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48"
                style={{ background: 'var(--crimson)' }}
            />

            <div className="max-w-5xl mx-auto relative">
                {/* Quote mark */}
                <div
                    className="absolute -top-8 -left-4 font-serif text-[12rem] leading-none opacity-10 select-none"
                    style={{ color: 'var(--crimson)' }}
                >
                    "
                </div>

                {/* Quote content */}
                <div className="relative z-10">
                    {/* Japanese text */}
                    <p
                        className={`text-lg mb-8 transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {currentQuote.japanese}
                    </p>

                    {/* Main quote */}
                    <blockquote
                        className={`quote-text mb-12 transition-all duration-700 delay-100 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                    >
                        "{currentQuote.text}"
                    </blockquote>

                    {/* Author */}
                    <p
                        className={`quote-author transition-all duration-700 delay-200 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
                    >
                        — {currentQuote.author}
                    </p>
                </div>

                {/* Progress dots */}
                <div className="flex gap-3 mt-16">
                    {quotes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (!isAnimating) {
                                    setIsAnimating(true);
                                    setActiveIndex(index);
                                    setTimeout(() => setIsAnimating(false), 1000);
                                }
                            }}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                                background: index === activeIndex ? 'var(--crimson)' : 'var(--elite-elevated)',
                                transform: index === activeIndex ? 'scale(1.5)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
