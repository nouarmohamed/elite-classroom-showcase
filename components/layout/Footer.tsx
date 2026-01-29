'use client';

import Link from 'next/link';

const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Characters', href: '#characters' },
    { label: 'Volumes', href: '/volumes' },
    { label: 'About', href: '#about' },
];

export default function Footer() {
    return (
        <footer
            className="relative py-16 px-8"
            style={{ background: 'var(--elite-black)' }}
        >
            {/* Top border accent */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, var(--elite-elevated), transparent)' }}
            />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <h3
                            className="font-serif text-2xl font-bold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Classroom of the Elite
                        </h3>
                        <p
                            className="text-sm leading-relaxed max-w-xs"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Welcome to the elite. Where only the strongest survive,
                            and true ability determines everything.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.3em] uppercase mb-6"
                            style={{ color: 'var(--gold)' }}
                        >
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm transition-colors duration-300 hover:text-crimson"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quote */}
                    <div>
                        <h4
                            className="text-xs tracking-[0.3em] uppercase mb-6"
                            style={{ color: 'var(--gold)' }}
                        >
                            Philosophy
                        </h4>
                        <blockquote
                            className="text-sm italic leading-relaxed"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            "Whether one admits it or not,
                            all humans are inherently unequal.
                            That is the undeniable truth of this world."
                        </blockquote>
                    </div>
                </div>

                {/* Bottom section */}
                <div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid var(--elite-elevated)' }}
                >
                    <p
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        © 2024 Elite Archives. Fan Project.
                    </p>

                    <p
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        ようこそ実力至上主義の教室へ
                    </p>
                </div>
            </div>

            {/* Decorative crimson line */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
                style={{ background: 'linear-gradient(to top, var(--crimson), transparent)' }}
            />
        </footer>
    );
}
