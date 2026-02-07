'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
    { id: 'a1', title: 'OBSERVATION', sub: 'The world is a simulation' },
    { id: 'a2', title: 'THE MASK', sub: 'Truth lies beneath' },
    { id: 'a3', title: 'CALCULATION', sub: 'Every variable accounted for' },
    { id: 'a4', title: 'THE PIECES', sub: 'People are tools' },
    { id: 'a5', title: 'ENCOUNTER', sub: 'A variable appears' },
    { id: 'a6', title: 'ISOLATION', sub: 'The cold comfort of void' },
    { id: 'a7', title: 'CONFLICT', sub: 'Resistance is futile' },
    { id: 'a8', title: 'RUIN', sub: 'The shattering of self' },
    { id: 'a9', title: 'CONTROL', sub: 'Absolute dominion' },
    { id: 'a10', title: 'THE SUMMIT', sub: 'There is only one view' },
];

export default function PsychologicalDescent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Hard Cut & Glitch Logic
        const ctx = gsap.context(() => {
            // Master Timeline for Pinned Section
            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: `+=${STAGES.length * 100}%`, // 100vh per stage
                pin: true,
                scrub: 0, // Instant scrubbing for hard cuts
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * STAGES.length),
                        STAGES.length - 1
                    );

                    // Only update if stage changed (Hard Cut)
                    if (index !== currentStageRef.current) {
                        currentStageRef.current = index;
                        setCurrentStage(index);
                        triggerGlitch();
                    }
                }
            });

        }, container);

        // Mutable ref for callback access without re-render dependency issues
        const currentStageRef = { current: 0 };

        const triggerGlitch = () => {
            const glitchEl = document.querySelector('.glitch-overlay');
            if (glitchEl) {
                gsap.fromTo(glitchEl,
                    { opacity: 0.8, display: 'block' },
                    { opacity: 0, display: 'none', duration: 0.2, ease: "steps(3)" }
                );
            }
        };

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
            {/* Images Layer */}
            {STAGES.map((stage, i) => (
                <div
                    key={stage.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-75 ${i === currentStage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={`/images/sections/${stage.id}.jpg`}
                            alt={stage.title}
                            fill
                            className="object-cover"
                            priority={i < 2}
                        />
                        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />

                        {/* Unique filter per stage for variety */}
                        <div className="absolute inset-0 mix-blend-overlay opacity-50"
                            style={{ background: i % 2 === 0 ? 'linear-gradient(45deg, #ff000020, transparent)' : 'linear-gradient(-45deg, #0000ff20, transparent)' }}
                        />
                    </div>
                </div>
            ))}

            {/* Text Layer (Fixed on top) */}
            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <h2 className="glitch-text text-[15vw] md:text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-white leading-none mix-blend-difference">
                        {STAGES[currentStage]?.title}
                    </h2>
                    <p className="mt-4 text-crimson font-mono tracking-[0.5em] text-sm md:text-xl uppercase bg-black/50 px-4 py-1 inline-block backdrop-blur-sm">
                        {STAGES[currentStage]?.sub}
                    </p>
                </div>
            </div>

            {/* Glitch Overlay (Flash) */}
            <div className="glitch-overlay absolute inset-0 z-50 bg-white mix-blend-exclusion hidden pointer-events-none" />

            {/* CRT / Noise Overlay */}
            <div className="absolute inset-0 z-40 opacity-[0.1] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Progress Indicator */}
            <div className="absolute bottom-10 left-10 z-50 font-mono text-white/50 text-xs">
                STAGE 0{currentStage}/0{STAGES.length - 1}
            </div>
        </section>
    );
}
