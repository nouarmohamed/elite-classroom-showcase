'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HierarchySection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const text = textRef.current;
        const overlay = overlayRef.current;

        if (!section || !image || !text || !overlay) return;

        const ctx = gsap.context(() => {
            // Create timeline for scroll-driven animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'center center',
                    scrub: 1,
                },
            });

            // Fade out dark overlay to reveal image
            tl.fromTo(
                overlay,
                { opacity: 0.9 },
                { opacity: 0.3, duration: 1 }
            );

            // Parallax effect on image
            tl.fromTo(
                image,
                { scale: 1.2, y: 50 },
                { scale: 1, y: 0, duration: 1 },
                0
            );

            // Text reveal animation
            const textElements = text.querySelectorAll('.reveal-text');
            textElements.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });

            // Vertical line animation
            gsap.fromTo(
                '.hierarchy-line',
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 60%',
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
            className="relative min-h-screen w-full overflow-hidden bg-black"
        >
            {/* Background Image Container */}
            <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="/images/sections/hierarchy-executives.jpg"
                    alt="The power hierarchy"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Dark overlay for atmosphere */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"
                />
                {/* Grain texture overlay */}
                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4xNSIvPjwvc3ZnPg==')]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center min-h-screen">
                <div className="container mx-auto px-8 lg:px-16">
                    <div className="max-w-2xl">
                        {/* Section Label */}
                        <div ref={textRef} className="space-y-8">
                            <div className="flex items-center gap-4 reveal-text">
                                <div className="hierarchy-line w-px h-12 bg-[#c9a227] origin-top" />
                                <span className="text-xs tracking-[0.3em] text-zinc-500 uppercase font-light">
                                    The System
                                </span>
                            </div>

                            {/* Japanese Title */}
                            <p className="text-zinc-600 text-sm tracking-widest reveal-text">
                                階級制度
                            </p>

                            {/* Main Title */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight reveal-text">
                                The Hierarchy
                            </h2>

                            {/* Philosophy Quote */}
                            <blockquote className="border-l-2 border-[#c9a227]/50 pl-6 reveal-text">
                                <p className="text-xl md:text-2xl text-zinc-300 font-light italic leading-relaxed">
                                    "Those who stand at the top determine the rules. Those below simply follow."
                                </p>
                            </blockquote>

                            {/* Description */}
                            <p className="text-zinc-500 text-base leading-relaxed max-w-lg reveal-text">
                                In a society governed by meritocracy, power is not given — it is taken.
                                The elite don't ask for permission. They set the conditions for everyone else to follow.
                            </p>

                            {/* Stats/Numbers */}
                            <div className="flex gap-12 pt-8 reveal-text">
                                <div>
                                    <span className="block text-3xl font-light text-[#c9a227]">4</span>
                                    <span className="text-xs text-zinc-600 uppercase tracking-wider">Classes</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-light text-[#c9a227]">1</span>
                                    <span className="text-xs text-zinc-600 uppercase tracking-wider">Victor</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-light text-[#c9a227]">∞</span>
                                    <span className="text-xs text-zinc-600 uppercase tracking-wider">Casualties</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </section>
    );
}
