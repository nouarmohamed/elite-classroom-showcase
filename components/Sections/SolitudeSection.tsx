'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SolitudeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const imageContainer = imageContainerRef.current;
        const text = textRef.current;
        const vignette = vignetteRef.current;

        if (!section || !imageContainer || !text || !vignette) return;

        const ctx = gsap.context(() => {
            // Vignette intensity on scroll
            gsap.fromTo(
                vignette,
                { opacity: 0.7 },
                {
                    opacity: 0.4,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                    },
                }
            );

            // Subtle parallax on image
            gsap.fromTo(
                imageContainer.querySelector('img'),
                { scale: 1.1, y: 30 },
                {
                    scale: 1,
                    y: -30,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                    },
                }
            );

            // Letter-by-letter title animation
            const titleSpan = text.querySelector('.letter-animate');
            if (titleSpan) {
                const chars = titleSpan.textContent?.split('') || [];
                titleSpan.innerHTML = '';
                chars.forEach((char) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.className = 'inline-block opacity-0 translate-y-4';
                    titleSpan.appendChild(span);
                });

                gsap.to(titleSpan.querySelectorAll('span'), {
                    opacity: 1,
                    y: 0,
                    duration: 0.05,
                    stagger: 0.04,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse',
                    },
                });
            }

            // Quote fade in
            gsap.fromTo(
                '.solitude-quote',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 40%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Japanese text fade
            gsap.fromTo(
                '.japanese-overlay',
                { opacity: 0 },
                {
                    opacity: 0.15,
                    duration: 2,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            {/* Background Image */}
            <div
                ref={imageContainerRef}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="/images/sections/solitude-piano.jpeg"
                    alt="Solitude - The weight of perfection"
                    fill
                    className="object-cover object-center"
                    priority
                />

                {/* Vignette overlay */}
                <div
                    ref={vignetteRef}
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)',
                    }}
                />

                {/* Color grade overlay - subtle warm tint */}
                <div className="absolute inset-0 bg-[#1a1410] opacity-30 mix-blend-multiply" />

                {/* Grain texture */}
                <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />
            </div>

            {/* Large Japanese text overlay */}
            <div className="japanese-overlay absolute inset-0 flex items-center justify-center pointer-events-none opacity-0">
                <span className="text-[20vw] font-light text-white/10 tracking-widest select-none">
                    孤独
                </span>
            </div>

            {/* Content */}
            <div
                ref={textRef}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8"
            >
                {/* Section label */}
                <span className="text-xs tracking-[0.4em] text-zinc-600 uppercase mb-8">
                    The Burden of Excellence
                </span>

                {/* Main title with letter animation */}
                <h2 className="letter-animate text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-[0.15em] mb-12">
                    SOLITUDE
                </h2>

                {/* Quote */}
                <blockquote className="solitude-quote max-w-2xl">
                    <p className="text-lg md:text-xl text-zinc-400 font-light italic leading-relaxed">
                        "To stand alone at the summit is not a reward. It is a sentence.
                        The view from the top reveals only how far there is to fall."
                    </p>
                    <footer className="mt-6 text-sm text-zinc-600 tracking-wider">
                        — The weight of perfection
                    </footer>
                </blockquote>
            </div>

            {/* Subtle animated line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-12">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#c9a227]/50 to-transparent animate-pulse" />
            </div>
        </section>
    );
}
