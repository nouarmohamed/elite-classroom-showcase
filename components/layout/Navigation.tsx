'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { href: '#characters', label: 'Characters' },
    { href: '#volumes', label: 'Volumes' },
    { href: '#about', label: 'About' },
];

export default function Navigation() {
    const navRef = useRef<HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                delay: 1.5,
            });
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    padding: isScrolled ? '1rem 2rem' : '1.5rem 2rem',
                }}
            >
                <div
                    className="max-w-7xl mx-auto flex items-center justify-between rounded-full px-8 py-4 transition-all duration-500"
                    style={{
                        background: isScrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
                        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                        border: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-serif text-xl font-bold tracking-tight transition-colors duration-300 hover:text-crimson"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        COTE
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="relative text-sm tracking-wider uppercase transition-colors duration-300 group"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {link.label}
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                                    style={{ background: 'var(--crimson)' }}
                                />
                            </a>
                        ))}

                        <Link
                            href="/volumes"
                            className="magnetic-btn ml-4"
                        >
                            Read Now
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 relative w-8 h-8"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className="absolute left-0 top-2 w-8 h-px transition-all duration-300"
                            style={{
                                background: 'var(--text-primary)',
                                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
                            }}
                        />
                        <span
                            className="absolute left-0 top-4 w-8 h-px transition-all duration-300"
                            style={{
                                background: 'var(--text-primary)',
                                opacity: isMobileMenuOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="absolute left-0 top-6 w-8 h-px transition-all duration-300"
                            style={{
                                background: 'var(--text-primary)',
                                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
                            }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 transition-all duration-500 flex flex-col items-center justify-center gap-8 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                style={{ background: 'rgba(5, 5, 5, 0.98)' }}
            >
                {navLinks.map((link, index) => (
                    <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-serif text-4xl font-bold transition-all duration-500"
                        style={{
                            color: 'var(--text-primary)',
                            transitionDelay: `${index * 100}ms`,
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        {link.label}
                    </a>
                ))}

                <Link
                    href="/volumes"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="magnetic-btn mt-8"
                    style={{
                        transitionDelay: '300ms',
                        opacity: isMobileMenuOpen ? 1 : 0,
                    }}
                >
                    Read Now
                </Link>
            </div>
        </>
    );
}
