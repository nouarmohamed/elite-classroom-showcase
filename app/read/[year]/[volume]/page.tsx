'use client';

import { useEffect, useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

export default function ReaderPage() {
    const params = useParams();
    const year = params.year as string;
    const volume = params.volume as string;

    const [numPages, setNumPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showControls, setShowControls] = useState<boolean>(true);

    // Construct PDF path
    const pdfPath = `/volumes/${year}/vol-${volume}.pdf`;

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setIsLoading(false);
    };

    const onDocumentLoadError = (error: Error) => {
        console.error('Error loading PDF:', error);
        setError('Failed to load the volume. Please try again.');
        setIsLoading(false);
    };

    const goToPage = useCallback((page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, numPages)));
    }, [numPages]);

    const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
    const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    nextPage();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    prevPage();
                    break;
                case 'Escape':
                    setShowControls((prev) => !prev);
                    break;
                case '+':
                case '=':
                    setScale((s) => Math.min(s + 0.25, 3));
                    break;
                case '-':
                    setScale((s) => Math.max(s - 0.25, 0.5));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextPage, prevPage]);

    // Hide controls after inactivity
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const resetTimeout = () => {
            setShowControls(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => setShowControls(false), 3000);
        };

        window.addEventListener('mousemove', resetTimeout);
        resetTimeout();

        return () => {
            window.removeEventListener('mousemove', resetTimeout);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div
            className="min-h-screen relative"
            style={{ background: 'var(--elite-black)' }}
        >
            {/* Top navigation bar */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
                style={{
                    background: 'linear-gradient(to bottom, rgba(5, 5, 5, 0.95), transparent)',
                    padding: '1.5rem 2rem',
                }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Back button */}
                    <Link
                        href="/#volumes"
                        className="flex items-center gap-3 text-sm uppercase tracking-wider transition-colors duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Library
                    </Link>

                    {/* Volume title */}
                    <h1
                        className="font-serif text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {year.replace('-', ' ').toUpperCase()} — Volume {volume}
                    </h1>

                    {/* Download button */}
                    <a
                        href={pdfPath}
                        download
                        className="flex items-center gap-2 text-sm uppercase tracking-wider transition-colors duration-300"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Download
                    </a>
                </div>
            </header>

            {/* PDF Viewer */}
            <main className="flex items-center justify-center min-h-screen py-24">
                {isLoading && (
                    <div className="flex flex-col items-center gap-4">
                        <div
                            className="w-12 h-12 border-2 rounded-full animate-spin"
                            style={{ borderColor: 'var(--elite-elevated)', borderTopColor: 'var(--crimson)' }}
                        />
                        <p style={{ color: 'var(--text-muted)' }}>Loading volume...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center">
                        <p className="text-lg mb-4" style={{ color: 'var(--crimson)' }}>{error}</p>
                        <Link
                            href="/#volumes"
                            className="magnetic-btn"
                        >
                            Return to Library
                        </Link>
                    </div>
                )}

                <Document
                    file={pdfPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={null}
                    className="flex justify-center"
                >
                    <Page
                        pageNumber={currentPage}
                        scale={scale}
                        className="shadow-2xl"
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                    />
                </Document>
            </main>

            {/* Bottom controls */}
            <footer
                className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
                style={{
                    background: 'linear-gradient(to top, rgba(5, 5, 5, 0.95), transparent)',
                    padding: '2rem',
                }}
            >
                <div className="max-w-2xl mx-auto">
                    {/* Progress bar */}
                    <div
                        className="w-full h-1 mb-6 rounded-full overflow-hidden"
                        style={{ background: 'var(--elite-elevated)' }}
                    >
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                background: 'var(--crimson)',
                                width: numPages > 0 ? `${(currentPage / numPages) * 100}%` : '0%',
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Page navigation */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prevPage}
                                disabled={currentPage <= 1}
                                className="p-3 rounded-full transition-all duration-300 disabled:opacity-30"
                                style={{
                                    background: 'var(--elite-surface)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={currentPage}
                                    onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                                    min={1}
                                    max={numPages}
                                    className="w-16 px-3 py-2 text-center rounded border-none outline-none font-mono"
                                    style={{
                                        background: 'var(--elite-surface)',
                                        color: 'var(--text-primary)',
                                    }}
                                />
                                <span style={{ color: 'var(--text-muted)' }}>/ {numPages}</span>
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={currentPage >= numPages}
                                className="p-3 rounded-full transition-all duration-300 disabled:opacity-30"
                                style={{
                                    background: 'var(--elite-surface)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Zoom controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))}
                                className="p-2 rounded transition-colors duration-300"
                                style={{
                                    background: 'var(--elite-surface)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35M8 11h6" />
                                </svg>
                            </button>

                            <span
                                className="text-sm font-mono min-w-[4rem] text-center"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {Math.round(scale * 100)}%
                            </span>

                            <button
                                onClick={() => setScale((s) => Math.min(s + 0.25, 3))}
                                className="p-2 rounded transition-colors duration-300"
                                style={{
                                    background: 'var(--elite-surface)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                                </svg>
                            </button>
                        </div>

                        {/* Keyboard hints */}
                        <div className="hidden md:flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                            <span>← → Navigate</span>
                            <span>+/- Zoom</span>
                            <span>ESC Toggle UI</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Click zones for navigation */}
            <div
                className="fixed top-0 left-0 w-1/3 h-full z-30 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
                onClick={prevPage}
            >
                <div
                    className="absolute inset-0 flex items-center justify-start pl-8 bg-gradient-to-r from-black/20 to-transparent"
                    style={{ opacity: currentPage > 1 ? 1 : 0 }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity={0.5}>
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </div>
            </div>

            <div
                className="fixed top-0 right-0 w-1/3 h-full z-30 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
                onClick={nextPage}
            >
                <div
                    className="absolute inset-0 flex items-center justify-end pr-8 bg-gradient-to-l from-black/20 to-transparent"
                    style={{ opacity: currentPage < numPages ? 1 : 0 }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity={0.5}>
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
