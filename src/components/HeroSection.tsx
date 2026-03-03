'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    backgroundVideo?: string;
    ctaText?: string;
    ctaHref?: string;
    overlay?: boolean;
}

export default function HeroSection({
    title,
    subtitle,
    backgroundImage,
    backgroundVideo,
    ctaText = 'Mehr erfahren',
    ctaHref = '#content',
    overlay = true,
}: HeroSectionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Small delay so the CSS transition actually plays
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-section">
            {/* Background Video */}
            {backgroundVideo && (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            )}

            {/* Background Image */}
            {backgroundImage && !backgroundVideo && (
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            {/* Fallback gradient if no media */}
            {!backgroundImage && !backgroundVideo && (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900" />
            )}

            {/* Overlay */}
            {overlay && <div className="hero-overlay" />}

            {/* Content */}
            <div className="hero-content max-w-4xl">
                <h1
                    className="font-display text-display-xl text-white font-semibold mb-6 transition-all duration-1000 ease-out"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    {title}
                </h1>

                {subtitle && (
                    <p
                        className="text-xl md:text-2xl text-white/75 font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-800 ease-out"
                        style={{
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                            transitionDelay: '0.3s',
                        }}
                    >
                        {subtitle}
                    </p>
                )}

                <div
                    className="flex gap-4 justify-center flex-wrap transition-all duration-600 ease-out"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: '0.6s',
                    }}
                >
                    <Link
                        href={ctaHref}
                        className="px-8 py-4 bg-primary-500 text-white rounded-full text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary-600 transition-all duration-300 shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5"
                    >
                        {ctaText}
                    </Link>
                    <Link
                        href="/kontakt"
                        className="px-8 py-4 bg-white/10 text-white rounded-full text-sm uppercase tracking-[0.2em] font-semibold backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                        Anfragen
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000"
                    style={{ opacity: mounted ? 1 : 0, transitionDelay: '1.2s' }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2 animate-bounce">
                        <div className="w-1 h-2 bg-white/60 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
}
