'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

interface VolumeInfo {
    type: 'pdf';
    name: string;
    relativePath: string;
    size: number;
}

interface YearData {
    id: string;
    title: string;
    folderPath: string;
    volumes: VolumeInfo[];
}

// Sample volume data - this would come from the manifest.json
const volumeData: YearData[] = [
    {
        id: 'year-01',
        title: 'Year 01',
        folderPath: 'year-01',
        volumes: [
            { type: 'pdf', name: 'vol-01.pdf', relativePath: '/volumes/year-01/vol-01.pdf', size: 49869122 },
            { type: 'pdf', name: 'vol-04.pdf', relativePath: 'year-01/vol-04.pdf', size: 2341097 },
            { type: 'pdf', name: 'vol-4.5.pdf', relativePath: 'year-01/vol-4.5.pdf', size: 2090408 },
            { type: 'pdf', name: 'vol-05.pdf', relativePath: 'year-01/vol-05.pdf', size: 2457064 },
            { type: 'pdf', name: 'vol-06.pdf', relativePath: 'year-01/vol-06.pdf', size: 2396013 },
            { type: 'pdf', name: 'vol-07.pdf', relativePath: 'year-01/vol-07.pdf', size: 2840362 },
            { type: 'pdf', name: 'vol-7.5.pdf', relativePath: 'year-01/vol-7.5.pdf', size: 2504732 },
            { type: 'pdf', name: 'vol-08.pdf', relativePath: 'year-01/vol-08.pdf', size: 5951736 },
            { type: 'pdf', name: 'vol-09.pdf', relativePath: 'year-01/vol-09.pdf', size: 6124004 },
            { type: 'pdf', name: 'vol-10.pdf', relativePath: 'year-01/vol-10.pdf', size: 6328568 },
            { type: 'pdf', name: 'vol-11.pdf', relativePath: 'year-01/vol-11.pdf', size: 6410505 },
            { type: 'pdf', name: 'vol-11.5.pdf', relativePath: 'year-01/vol-11.5.pdf', size: 6596392 },
        ],
    },
    {
        id: 'year-02',
        title: 'Year 02',
        folderPath: 'year-02',
        volumes: [
            { type: 'pdf', name: 'vol-0.pdf', relativePath: 'year-02/vol-0.pdf', size: 4323437 },
            { type: 'pdf', name: 'vol-01.pdf', relativePath: 'year-02/vol-01.pdf', size: 7562736 },
            { type: 'pdf', name: 'vol-02.pdf', relativePath: 'year-02/vol-02.pdf', size: 6009364 },
            { type: 'pdf', name: 'vol-03.pdf', relativePath: 'year-02/vol-03.pdf', size: 13961866 },
            { type: 'pdf', name: 'vol-04.pdf', relativePath: 'year-02/vol-04.pdf', size: 7183234 },
            { type: 'pdf', name: 'vol-4.5.pdf', relativePath: 'year-02/vol-4.5.pdf', size: 5191507 },
            { type: 'pdf', name: 'vol-05.pdf', relativePath: 'year-02/vol-05.pdf', size: 6849313 },
            { type: 'pdf', name: 'vol-06.pdf', relativePath: 'year-02/vol-06.pdf', size: 5258949 },
            { type: 'pdf', name: 'vol-07.pdf', relativePath: 'year-02/vol-07.pdf', size: 5566221 },
            { type: 'pdf', name: 'vol-08.pdf', relativePath: 'year-02/vol-08.pdf', size: 5605510 },
            { type: 'pdf', name: 'vol-09.pdf', relativePath: 'year-02/vol-09.pdf', size: 6535639 },
            { type: 'pdf', name: 'vol-10.pdf', relativePath: 'year-02/vol-10.pdf', size: 8249823 },
            { type: 'pdf', name: 'vol-11.pdf', relativePath: 'year-02/vol-11.pdf', size: 8819752 },
            { type: 'pdf', name: 'vol-12.pdf', relativePath: 'year-02/vol-12.pdf', size: 10954014 },
        ],
    },
];

function getVolumeNumber(name: string): string {
    const match = name.match(/vol-(.+)\.pdf/);
    return match ? match[1] : name;
}

function getCoverPath(yearId: string, volName: string): string {
    const volNum = getVolumeNumber(volName);
    return `/covers/${yearId}/vol-${volNum}.png`;
}

function formatFileSize(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
}

export default function VolumeArchive() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeYear, setActiveYear] = useState('year-01');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section title reveal
            gsap.from('.archive-title', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });

            // Volume cards stagger
            gsap.from('.volume-card', {
                y: 80,
                opacity: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.volume-grid',
                    start: 'top 80%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [activeYear]);

    const currentYearData = volumeData.find((y) => y.id === activeYear);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 px-8 min-h-screen"
            style={{ background: 'var(--elite-black)' }}
        >
            {/* Background accent */}
            <div
                className="absolute top-0 right-0 w-1/2 h-1/2 opacity-30"
                style={{
                    background: 'radial-gradient(ellipse at 100% 0%, rgba(139, 0, 0, 0.2) 0%, transparent 60%)',
                }}
            />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="archive-title mb-16">
                    <p
                        className="text-xs tracking-[0.3em] uppercase mb-4"
                        style={{ color: 'var(--crimson)' }}
                    >
                        Classified Archives
                    </p>
                    <h2
                        className="display-large mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Light Novels
                    </h2>
                    <p
                        className="text-lg max-w-xl"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        Access the complete collection of Classroom of the Elite light novels.
                        Read online or download for offline access.
                    </p>
                </div>

                {/* Year tabs */}
                <div className="flex gap-4 mb-12">
                    {volumeData.map((year) => (
                        <button
                            key={year.id}
                            onClick={() => setActiveYear(year.id)}
                            className="relative px-6 py-3 text-sm tracking-wider uppercase transition-all duration-300"
                            style={{
                                color: activeYear === year.id ? 'var(--text-primary)' : 'var(--text-muted)',
                                background: activeYear === year.id ? 'var(--elite-surface)' : 'transparent',
                                border: `1px solid ${activeYear === year.id ? 'var(--crimson)' : 'var(--elite-elevated)'}`,
                            }}
                        >
                            {year.title}
                            {activeYear === year.id && (
                                <span
                                    className="absolute bottom-0 left-0 w-full h-0.5"
                                    style={{ background: 'var(--crimson)' }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Volume grid */}
                <div className="volume-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {currentYearData?.volumes.map((volume) => (
                        <VolumeCard
                            key={volume.name}
                            volume={volume}
                            yearId={activeYear}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function VolumeCard({ volume, yearId }: { volume: VolumeInfo; yearId: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const volNumber = getVolumeNumber(volume.name);
    const coverPath = getCoverPath(yearId, volume.name);

    return (
        <div
            className="volume-card relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card container */}
            <div
                className="relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-500"
                style={{
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    boxShadow: isHovered
                        ? '0 20px 40px rgba(139, 0, 0, 0.3)'
                        : '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
            >
                {/* Cover image */}
                {!imageError ? (
                    <img
                        src={coverPath}
                        alt={`Volume ${volNumber}`}
                        className="w-full h-full object-cover transition-transform duration-700"
                        style={{
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        }}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: 'var(--elite-surface)' }}
                    >
                        <span
                            className="font-serif text-4xl font-bold"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            {volNumber}
                        </span>
                    </div>
                )}

                {/* Overlay gradient */}
                <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(180deg, transparent 50%, rgba(5, 5, 5, 0.9) 100%)',
                        opacity: isHovered ? 1 : 0.5,
                    }}
                />

                {/* Classified stamp effect */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0 : 0.15 }}
                >
                    <span className="classified-stamp">Classified</span>
                </div>

                {/* Hover actions */}
                <div
                    className="absolute bottom-0 left-0 right-0 p-4 transition-all duration-500"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    <p
                        className="text-xs mb-2"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        {formatFileSize(volume.size)}
                    </p>

                    <div className="flex gap-2">
                        <Link
                            href={`/read/${yearId}/${volNumber}`}
                            className="flex-1 py-2 text-xs text-center uppercase tracking-wider transition-colors duration-300"
                            style={{
                                background: 'var(--crimson)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Read
                        </Link>
                        <a
                            href={`/volumes/${volume.relativePath.replace(/\\/g, '/')}`}
                            download
                            className="flex-1 py-2 text-xs text-center uppercase tracking-wider transition-colors duration-300"
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--text-muted)',
                                color: 'var(--text-primary)',
                            }}
                        >
                            Download
                        </a>
                    </div>
                </div>

                {/* Border */}
                <div
                    className="absolute inset-0 rounded-lg border transition-colors duration-300"
                    style={{
                        borderColor: isHovered ? 'var(--crimson)' : 'rgba(255, 255, 255, 0.05)',
                    }}
                />
            </div>

            {/* Volume label */}
            <div className="mt-4 text-center">
                <p
                    className="font-serif text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                >
                    Volume {volNumber}
                </p>
            </div>
        </div>
    );
}
