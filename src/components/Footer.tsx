import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-neutral-950 text-white overflow-hidden">
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-8">
                {/* Upper Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16">
                    {/* Brand Column */}
                    <div>
                        <h3 className="font-display text-3xl font-semibold mb-2">
                            Adina <span className="font-light">Wilcke</span>
                        </h3>
                        <p className="text-neutral-500 text-sm uppercase tracking-[0.2em] mb-6">
                            {siteConfig.tagline}
                        </p>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                            Lebendige Worte, mitreißende Auftritte und inspirierende Workshops.
                            Buchen Sie Adina für Ihr nächstes Event.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-6 font-semibold">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-3">
                            {siteConfig.navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact & Booking Column */}
                    <div>
                        <h4 className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-6 font-semibold">
                            Kontakt & Buchung
                        </h4>
                        <div className="flex flex-col gap-4">
                            <a
                                href={`mailto:${siteConfig.bookingEmail}`}
                                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                            >
                                {siteConfig.bookingEmail}
                            </a>

                            <Link
                                href="/kontakt"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/20 w-fit"
                            >
                                Anfrage senden
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>

                            {/* Social Links */}
                            <div className="flex gap-4 mt-4">
                                {siteConfig.social.instagram && (
                                    <a
                                        href={siteConfig.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-600 text-xs tracking-wider">
                        © {currentYear} Adina Wilcke. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/impressum"
                            className="text-neutral-600 hover:text-neutral-400 text-xs tracking-wider transition-colors"
                        >
                            Impressum
                        </Link>
                        <Link
                            href="/datenschutz"
                            className="text-neutral-600 hover:text-neutral-400 text-xs tracking-wider transition-colors"
                        >
                            Datenschutz
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
