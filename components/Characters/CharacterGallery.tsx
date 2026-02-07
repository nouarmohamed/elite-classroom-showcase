'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Character {
    name: string;
    japaneseName: string;
    image: string;
    quote: string;
    class: string;
}

const characters: Character[] = [
    {
        name: 'Kiyotaka Ayanokoji',
        japaneseName: '綾小路 清隆',
        image: '/images/ayanokoji.jpg',
        quote: '"Every human is born with abilities, but their aptitude varies."',
        class: 'Class D',
    },
    {
        name: 'Suzune Horikita',
        japaneseName: '堀北 鈴音',
        image: '/images/Horikita-Suzune2.jpg',
        quote: '"I will reach Class A. That is my only goal."',
        class: 'Class D',
    },
    {
        name: 'Kakeru Ryuuen',
        japaneseName: '龍園 翔',
        image: '/images/Ryuen-Kakeru.jpg',
        quote: '"The strong devour the weak. That is the natural order."',
        class: 'Class C',
    },
    {
        name: 'Arisu Sakayanagi',
        japaneseName: '坂柳 有栖',
        image: '/images/Sakayanagi-Arisu.jpg',
        quote: '"I am interested in seeing the extent of your abilities."',
        class: 'Class A',
    },
    {
        name: 'Kouenji Rokusuke',
        japaneseName: '高円寺 六助',
        image: '/images/c4.jpeg',
        quote: '"I am a perfect being. I have no need to prove myself to anyone."',
        class: 'Class D',
    },
];

export default function CharacterGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const section = sectionRef.current;

            if (!container || !section) return;

            // Horizontal scroll animation
            const scrollWidth = container.scrollWidth - window.innerWidth;

            gsap.to(container, {
                x: -scrollWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const index = Math.floor(progress * characters.length);
                        setActiveIndex(Math.min(index, characters.length - 1));
                    },
                },
            });

            // Staggered reveal for cards
            const cards = container.querySelectorAll('.character-card');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    rotateY: 15,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: i * 0.1,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
            style={{ background: 'var(--elite-darker)' }}
        >
            {/* Section header */}
            <div className="absolute top-12 left-8 z-30">
                <p
                    className="text-xs tracking-[0.3em] uppercase mb-2"
                    style={{ color: 'var(--gold)' }}
                >
                    The Players
                </p>
                <h2
                    className="display-medium"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Characters
                </h2>
            </div>

            {/* Progress indicator */}
            <div className="absolute top-12 right-8 z-30 flex items-center gap-4">
                <span style={{ color: 'var(--text-muted)' }} className="text-sm font-mono">
                    {String(activeIndex + 1).padStart(2, '0')}
                </span>
                <div className="w-24 h-px" style={{ background: 'var(--elite-elevated)' }}>
                    <div
                        className="h-full transition-all duration-300"
                        style={{
                            background: 'var(--crimson)',
                            width: `${((activeIndex + 1) / characters.length) * 100}%`,
                        }}
                    />
                </div>
                <span style={{ color: 'var(--text-muted)' }} className="text-sm font-mono">
                    {String(characters.length).padStart(2, '0')}
                </span>
            </div>

            {/* Horizontal scroll container */}
            <div
                ref={containerRef}
                className="flex items-center gap-8 px-[15vw] pt-32 pb-12 min-h-screen"
                style={{ width: 'max-content' }}
            >
                {characters.map((character, index) => (
                    <CharacterCard key={character.name} character={character} index={index} />
                ))}
            </div>
        </section>
    );
}

function CharacterCard({ character, index }: { character: Character; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            ref={cardRef}
            className="character-card relative flex-shrink-0 w-[400px] h-[600px] cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card background */}
            <div
                className="absolute inset-0 rounded-2xl overflow-hidden transition-transform duration-700 ease-out"
                style={{
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                }}
            >
                {/* Image */}
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover transition-all duration-700"
                    style={{
                        filter: isHovered ? 'grayscale(0%) brightness(1.1)' : 'grayscale(30%) brightness(0.8)',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                />

                {/* Gradient overlay */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(5, 5, 5, 0.7) 60%, rgba(5, 5, 5, 0.95) 100%)',
                        opacity: isHovered ? 1 : 0.8,
                    }}
                />

                {/* Crimson glow on hover */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background: 'radial-gradient(ellipse at bottom, rgba(139, 0, 0, 0.3) 0%, transparent 70%)',
                        opacity: isHovered ? 1 : 0,
                    }}
                />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                {/* Class badge */}
                <span
                    className="inline-block px-3 py-1 text-xs tracking-wider uppercase mb-4 rounded"
                    style={{
                        background: 'rgba(139, 0, 0, 0.5)',
                        color: 'var(--text-primary)',
                        border: '1px solid rgba(139, 0, 0, 0.8)',
                    }}
                >
                    {character.class}
                </span>

                {/* Name */}
                <h3
                    className="text-2xl font-serif font-bold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {character.name}
                </h3>
                <p
                    className="text-sm mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {character.japaneseName}
                </p>

                {/* Quote - appears on hover */}
                <p
                    className="text-sm italic transition-all duration-500"
                    style={{
                        color: 'var(--text-muted)',
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    }}
                >
                    {character.quote}
                </p>
            </div>

            {/* Index number */}
            <div
                className="absolute top-6 right-6 font-mono text-6xl font-bold opacity-20"
                style={{ color: 'var(--text-primary)' }}
            >
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* Border */}
            <div
                className="absolute inset-0 rounded-2xl border transition-colors duration-500"
                style={{
                    borderColor: isHovered ? 'rgba(139, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.05)',
                }}
            />
        </div>
    );
}
