'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHARACTERS = [
    { id: 'c1', name: 'KIYOTAKA', title: 'THE MASTERPIECE', desc: 'Efficiency is my only tenet.' },
    { id: 'c2', name: 'ARISU', title: 'THE QUEEN', desc: 'Talent is born, not made.' },
    { id: 'c3', name: 'SUZUNE', title: 'THE LEADER', desc: 'I will reach Class A alone.' },
    { id: 'c4', name: 'KOENJI', title: 'THE PERFECT', desc: 'I answer to no one.' },
    { id: 'c5', name: 'ISHIGAMI', title: 'THE STRATEGIST', desc: 'Silence is the loudest scream.' },
    { id: 'c6', name: 'KANZAKI', title: 'THE SUPPORT', desc: 'Loyalty defines a man.' },
    { id: 'c7', name: 'KEI', title: 'THE PARTNER', desc: 'I will survive, no matter what.' },
    { id: 'c8', name: 'RYUEN', title: 'THE TYRANT', desc: 'Violence is also a strategy.' },
    { id: 'c9', name: 'NANASE', title: 'THE SERVANT', desc: 'I will follow you to the end.' },
    { id: 'c10', name: 'KUSHIDA', title: 'THE MASK', desc: 'Everyone has a secret.' },
];

export default function EliteRoster() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const slider = sliderRef.current;
        if (!container || !slider) return;

        const ctx = gsap.context(() => {
            // Horizontal Scroll
            const totalWidth = slider.scrollWidth;
            const viewportWidth = window.innerWidth;
            const scrollDistance = totalWidth - viewportWidth;

            gsap.to(slider, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    pin: true,
                    scrub: 1,
                    end: `+=${scrollDistance}`,
                    anticipatePin: 1
                }
            });

            // Card Animations
            const cards = gsap.utils.toArray('.roster-card') as HTMLElement[];
            cards.forEach((card) => {
                // Parallax on image inside card
                const img = card.querySelector('.card-image');
                if (img) {
                    gsap.fromTo(img,
                        { scale: 1.2 },
                        {
                            scale: 1,
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: gsap.getById("rosterScroll"), // Need to link horizontal
                                start: "left right",
                                end: "right left",
                                scrub: true
                            }
                        }
                    );
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    return (
        <section ref={containerRef} className="relative h-screen bg-[#050505] overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(40,20,20,0.2),transparent_70%)]" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="absolute top-10 left-10 z-10">
                <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-600 tracking-tighter">
                    ELITE ROSTER
                </h2>
                <div className="h-1 w-24 bg-crimson mt-2" />
            </div>

            <div
                ref={sliderRef}
                className="flex items-center h-full px-[20vw] gap-[5vw] w-max will-change-transform"
            >
                {CHARACTERS.map((char, i) => (
                    <div
                        key={char.id}
                        className="roster-card group relative w-[22vw] h-[34vw] min-w-[300px] min-h-[450px] perspective-1000 cursor-none"
                        onMouseMove={(e) => handleMouseMove(e, i)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Card Container with 3D transform */}
                        <div className="relative w-full h-full transform-style-3d border border-white/10 overflow-hidden bg-black transition-colors duration-500 group-hover:border-crimson/50">

                            {/* Image Layer */}
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={`/images/characters/${char.id}.jpg`}
                                    alt={char.name}
                                    fill
                                    className="card-image object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 80vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            </div>

                            {/* Text Layer */}
                            <div className="absolute bottom-0 left-0 w-full p-8 transform translate-z-20">
                                <p className="text-crimson text-xs font-mono tracking-[0.3em] mb-2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                                    {char.title}
                                </p>
                                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase mix-blend-difference">
                                    {char.name}
                                </h3>
                                <div className="w-0 h-px bg-white mt-4 transition-all duration-500 group-hover:w-full" />
                                <p className="text-zinc-400 text-sm mt-4 opacity-0 translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                                    "{char.desc}"
                                </p>
                            </div>

                            {/* Glitch Overlay Effect */}
                            <div className="absolute inset-0 bg-crimson mix-blend-color-dodge opacity-0 transition-opacity duration-100 group-hover:opacity-10 pointer-events-none" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Cursor Hint (Optional - CSS managed better) */}
        </section>
    );
}
