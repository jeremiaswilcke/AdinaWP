'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookingCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.8);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                pointerEvents: isVisible ? 'auto' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <Link href="/kontakt" className="floating-cta">
                ✦ Jetzt Buchen
            </Link>
        </div>
    );
}
