'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Initial reveal timeline
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Overlay reveal
            tl.to(overlayRef.current, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 1.2,
                delay: 0.3,
            });

            // Image scale and reveal
            tl.from(imageRef.current, {
                scale: 1.3,
                opacity: 0,
                duration: 1.5,
            }, '-=0.8');

            // Title reveal - letter by letter feel
            tl.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
            }, '-=1');

            // Subtitle reveal
            tl.from(subtitleRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
            }, '-=0.5');

            // Scroll indicator
            tl.from(scrollIndicatorRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.6,
            }, '-=0.3');

            // Parallax on scroll
            gsap.to(imageRef.current, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Title parallax (slower)
            gsap.to(titleRef.current, {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden"
            style={{ background: 'var(--elite-black)' }}
        >
            {/* Background gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(139, 0, 0, 0.15) 0%, transparent 50%)',
                }}
            />

            {/* Reveal overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-40"
                style={{ background: 'var(--elite-black)' }}
            />

            {/* Main character image */}
            <div
                ref={imageRef}
                className="absolute inset-0 z-10 flex items-center justify-center"
            >
                <div className="relative h-full w-full max-w-4xl">
                    {/* Vignette overlay */}
                    <div
                        className="absolute inset-0 z-20"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 30%, var(--elite-black) 100%)',
                        }}
                    />
                    {/* Character image */}
                    <img
                        src="/images/ayanokoji.jpg"
                        alt="Ayanokoji Kiyotaka"
                        className="h-full w-full object-cover object-top opacity-80"
                        style={{
                            filter: 'grayscale(20%) contrast(1.1)',
                            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                        }}
                    />
                </div>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4">
                {/* Main title */}
                <h1
                    ref={titleRef}
                    className="glitch display-huge text-center"
                    data-text="CLASSROOM OF THE ELITE"
                    style={{
                        color: 'var(--text-primary)',
                        textShadow: '0 0 80px rgba(139, 0, 0, 0.3)',
                    }}
                >
                    CLASSROOM<br />OF THE ELITE
                </h1>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="mt-8 text-center font-sans text-lg tracking-widest uppercase"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    ようこそ実力至上主義の教室へ
                </p>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollIndicatorRef}
                className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-4"
            >
                <span
                    className="text-xs tracking-[0.3em] uppercase"
                    style={{ color: 'var(--text-muted)' }}
                >
                    Scroll
                </span>
                <div className="h-12 w-px relative overflow-hidden" style={{ background: 'var(--text-muted)' }}>
                    <div
                        className="absolute top-0 left-0 w-full h-1/3 animate-scroll-indicator"
                        style={{ background: 'var(--crimson)' }}
                    />
                </div>
            </div>

            {/* Decorative lines */}
            <div className="absolute top-0 left-8 h-full w-px z-20 opacity-20" style={{ background: 'var(--text-muted)' }} />
            <div className="absolute top-0 right-8 h-full w-px z-20 opacity-20" style={{ background: 'var(--text-muted)' }} />
        </section>
    );
}
