'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
    { id: 'w1', title: 'THE CALM', jp: '静寂', desc: 'A moment of stillness before the storm.' },
    { id: 'w2', title: 'THE SLOPES', jp: '白銀', desc: 'A race against gravity and expectations.' },
    { id: 'w3', title: 'CONFRONTATION', jp: '対立', desc: 'The moment words lose their meaning.' },
    { id: 'w4', title: 'CHECKMATE', jp: '王手', desc: 'Two geniuses, one board, zero luck.' },
    { id: 'w5', title: 'VELOCITY', jp: '速度', desc: 'Leaving the ordinary behind.' },
];

export default function CinematicMoments() {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            // Pinned Sequence Logic
            SCENES.forEach((scene, i) => {
                const panel = panelsRef.current[i];
                if (!panel) return;

                const img = panel.querySelector('.cinematic-image');
                const text = panel.querySelector('.cinematic-text');
                const bars = panel.querySelectorAll('.letterbox-bar');

                ScrollTrigger.create({
                    trigger: panel,
                    start: "top top",
                    pin: true,
                    pinSpacing: false, // Overlap effect
                    scrub: true,
                    end: "+=100%", // Explicitly pin for the height of the panel
                });

                // Ken Burns Effect on Scroll
                gsap.to(img, {
                    scale: 1.15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });

                // Text Reveal
                gsap.fromTo(text,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: panel,
                            start: "top center",
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );

                // Letterbox Animation (Entrance)
                gsap.from(bars, {
                    height: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: panel,
                        start: "top bottom",
                    }
                });
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative bg-[#0a0a0a]">
            {SCENES.map((scene, i) => (
                <div
                    key={scene.id}
                    ref={(el) => { panelsRef.current[i] = el; }}
                    className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10"
                    style={{ zIndex: i + 1 }} // Ensure stacking order
                >
                    {/* Image Container with Ken Burns */}
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src={`/images/cinematic/${scene.id}.jpg`}
                            alt={scene.title}
                            fill
                            className="cinematic-image object-cover"
                            priority={i < 2}
                        />
                        {/* Film Grain Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />

                        {/* Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
                    </div>

                    {/* Letterbox Bars */}
                    <div className="letterbox-bar absolute top-0 left-0 right-0 h-[10vh] bg-black z-20" />
                    <div className="letterbox-bar absolute bottom-0 left-0 right-0 h-[10vh] bg-black z-20" />

                    {/* Content */}
                    <div className="cinematic-text relative z-30 text-center mix-blend-difference">
                        <p className="text-crimson font-serif tracking-[1em] text-sm md:text-base mb-4 uppercase">
                            Scene 0{i + 1}
                        </p>
                        <h2 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 leading-none opacity-90 font-serif">
                            {scene.jp}
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-light text-white tracking-widest mt-[-2rem] uppercase ">
                            {scene.title}
                        </h3>
                        <p className="mt-8 text-zinc-400 font-mono text-xs md:text-sm tracking-widest max-w-md mx-auto border-t border-zinc-700 pt-4">
                            {scene.desc}
                        </p>
                    </div>
                </div>
            ))}

            {/* Spacer for final scroll out */}
            <div className="h-screen" />
        </section>
    );
}
