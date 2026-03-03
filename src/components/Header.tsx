'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
                        : 'bg-transparent'
                    }`}
                style={{ height: 'var(--header-height)' }}
            >
                <div className="w-full h-full flex items-center justify-between px-6 lg:px-12">
                    {/* Logo / Site Name */}
                    <Link href="/" className="relative z-10 group">
                        <span
                            className={`font-display text-2xl lg:text-3xl font-semibold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-neutral-900' : 'text-white'
                                }`}
                        >
                            Adina
                            <span className="font-light ml-1">Wilcke</span>
                        </span>
                        <span
                            className={`block text-[0.65rem] uppercase tracking-[0.3em] mt-[-2px] transition-colors duration-300 ${isScrolled ? 'text-neutral-400' : 'text-white/60'
                                }`}
                        >
                            Slampoetin · Autorin
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {siteConfig.navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative text-sm uppercase tracking-[0.15em] font-medium transition-colors duration-300 group ${isScrolled
                                        ? 'text-neutral-600 hover:text-neutral-900'
                                        : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Link
                            href="/kontakt"
                            className={`ml-4 px-6 py-2.5 rounded-full text-sm uppercase tracking-[0.15em] font-semibold transition-all duration-300 ${isScrolled
                                    ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20'
                                    : 'bg-white/15 text-white backdrop-blur-sm border border-white/25 hover:bg-white/25'
                                }`}
                        >
                            Buchen
                        </Link>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Menü"
                    >
                        <span
                            className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen
                                    ? 'rotate-45 translate-y-[5px] bg-neutral-900'
                                    : isScrolled
                                        ? 'bg-neutral-900'
                                        : 'bg-white'
                                }`}
                        />
                        <span
                            className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen
                                    ? 'opacity-0'
                                    : isScrolled
                                        ? 'bg-neutral-900'
                                        : 'bg-white'
                                }`}
                        />
                        <span
                            className={`block w-6 h-[2px] transition-all duration-300 ${isMobileMenuOpen
                                    ? '-rotate-45 -translate-y-[5px] bg-neutral-900'
                                    : isScrolled
                                        ? 'bg-neutral-900'
                                        : 'bg-white'
                                }`}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center transition-all duration-300"
                style={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
                }}
            >
                <nav className="flex flex-col items-center gap-6">
                    {siteConfig.navigation.map((item, i) => (
                        <div
                            key={item.href}
                            style={{
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.3s ease ${0.1 + i * 0.05}s`,
                            }}
                        >
                            <Link
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-display font-medium text-neutral-800 hover:text-primary-500 transition-colors"
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                    <div
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.3s ease 0.5s',
                        }}
                    >
                        <Link
                            href="/kontakt"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mt-4 px-8 py-3 bg-primary-500 text-white rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/25 inline-block"
                        >
                            Jetzt Buchen
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}
