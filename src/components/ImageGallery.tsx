'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

interface ImageGalleryProps {
    images: GalleryImage[];
    layout?: 'grid' | 'masonry';
    columns?: 2 | 3 | 4;
}

export default function ImageGallery({
    images,
    layout = 'grid',
    columns = 3,
}: ImageGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const colClass = {
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    if (layout === 'masonry') {
        return (
            <>
                <div className="gallery-grid masonry">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="img-hover-zoom cursor-pointer group"
                            onClick={() => setLightboxIndex(i)}
                        >
                            <div className="relative overflow-hidden rounded-lg bg-neutral-200 min-h-[200px] flex items-center justify-center">
                                {/* Placeholder visual since we don't have real images yet */}
                                <div className="w-full h-full min-h-[200px] bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center p-4">
                                    <span className="text-neutral-500 text-sm text-center">{img.alt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={images}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onNext={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))}
                        onPrev={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <div className={`grid ${colClass[columns]} gap-4`}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="img-hover-zoom cursor-pointer group aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-200"
                        onClick={() => setLightboxIndex(i)}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center p-4">
                            <span className="text-neutral-500 text-sm text-center">{img.alt}</span>
                        </div>
                    </div>
                ))}
            </div>
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNext={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null))}
                    onPrev={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null))}
                />
            )}
        </>
    );
}

// ─────────────────────────────────────────────
// Lightbox Component
// ─────────────────────────────────────────────
interface LightboxProps {
    images: GalleryImage[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
    const img = images[currentIndex];

    return (
        <div
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                aria-label="Schließen"
            >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Prev Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors"
                aria-label="Voriges Bild"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Image placeholder */}
            <div
                className="relative max-w-[90vw] max-h-[85vh] bg-neutral-800 rounded-lg p-12 flex items-center justify-center min-w-[400px] min-h-[300px]"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="text-white/60 text-lg">{img.alt}</span>
                <p className="absolute bottom-4 text-center text-white/50 text-sm tracking-wide w-full">
                    {currentIndex + 1}/{images.length}
                </p>
            </div>

            {/* Next Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors"
                aria-label="Nächstes Bild"
            >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    );
}
