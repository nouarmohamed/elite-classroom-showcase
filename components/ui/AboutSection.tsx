'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger reveal for content
            gsap.from('.about-content > *', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 60%',
                },
            });

            // Stats counter animation
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach((stat) => {
                const target = parseInt(stat.getAttribute('data-target') || '0');
                gsap.fromTo(stat,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: stat,
                            start: 'top 80%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 px-8"
            style={{ background: 'var(--elite-black)' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <div className="about-content">
                        <p
                            className="text-xs tracking-[0.3em] uppercase mb-4"
                            style={{ color: 'var(--gold)' }}
                        >
                            About the Series
                        </p>

                        <h2
                            className="display-medium mb-8"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Welcome to Advanced Nurturing High School
                        </h2>

                        <p
                            className="text-lg mb-6 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Koudo Ikusei Senior High School is a leading prestigious school with
                            state-of-the-art facilities. Students are given a high degree of freedom
                            in order to closely mimic real life.
                        </p>

                        <p
                            className="text-lg mb-8 leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            The students here are the nation's elite—or so it appears. In reality,
                            this school is a battleground where only the cunning survive. Behind the
                            facade of a perfect educational institution lies a ruthless system that
                            pits class against class, student against student.
                        </p>

                        <div
                            className="w-24 h-px mb-8"
                            style={{ background: 'var(--crimson)' }}
                        />

                        <p
                            className="text-sm italic"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            "What is true ability? What is true genius?"
                        </p>
                    </div>

                    {/* Right: Stats */}
                    <div className="grid grid-cols-2 gap-8">
                        <StatCard number={35} label="Light Novel Volumes" />
                        <StatCard number={3} label="Anime Seasons" />
                        <StatCard number={3} label="School Years" />
                        <StatCard number={100} suffix="M+" label="Copies Sold" />
                    </div>
                </div>
            </div>

            {/* Decorative element */}
            <div
                className="absolute bottom-0 right-0 w-1/3 h-px"
                style={{ background: 'linear-gradient(to left, var(--crimson), transparent)' }}
            />
        </section>
    );
}

function StatCard({ number, suffix = '', label }: { number: number; suffix?: string; label: string }) {
    return (
        <div
            className="glass-card p-8 text-center"
        >
            <div className="flex items-baseline justify-center">
                <span
                    className="stat-number font-serif text-5xl font-bold"
                    style={{ color: 'var(--crimson)' }}
                    data-target={number}
                >
                    0
                </span>
                {suffix && (
                    <span
                        className="font-serif text-3xl font-bold ml-1"
                        style={{ color: 'var(--crimson)' }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
            <p
                className="mt-2 text-sm uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
            >
                {label}
            </p>
        </div>
    );
}
