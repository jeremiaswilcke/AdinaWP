import HeroSection from '@/components/HeroSection';
import AnimatedSection from '@/components/AnimatedSection';
import ImageGallery from '@/components/ImageGallery';
import { EventList } from '@/components/EventCard';
import { getAllEvents } from '@/lib/events';
import { getReferences, getFeaturedImageUrl, getGalleryImages } from '@/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

// Demo images for initial build – will be replaced by WP media
const demoImages = [
    { src: '/images/hero-placeholder.jpg', alt: 'Adina Wilcke auf der Bühne' },
    { src: '/images/gallery-1.jpg', alt: 'Poetry Slam Auftritt' },
    { src: '/images/gallery-2.jpg', alt: 'Workshop Impression' },
    { src: '/images/gallery-3.jpg', alt: 'Moderation Event' },
    { src: '/images/gallery-4.jpg', alt: 'Lesung' },
    { src: '/images/gallery-5.jpg', alt: 'Sprachaufnahme Studio' },
    { src: '/images/gallery-6.jpg', alt: 'Portrait' },
];

export default async function HomePage() {
    const [events, references, wpGallery] = await Promise.all([
        getAllEvents(),
        getReferences(6),
        getGalleryImages('home-gallery')
    ]);

    const displayImages = wpGallery.length > 0
        ? wpGallery.map(img => ({ src: img.source_url, alt: img.alt_text || 'Galerie Bild' }))
        : demoImages;

    return (
        <>
            {/* ── Hero ─────────────────────────────── */}
            <HeroSection
                title="Adina Wilcke"
                subtitle="Slampoetin · Sprecherin · Moderatorin · Autorin – Worte, die bewegen."
                ctaText="Entdecken"
                ctaHref="#about"
            />

            {/* ── About Teaser ─────────────────────── */}
            <section id="about" className="py-24 lg:py-32 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <AnimatedSection direction="left">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                                <span className="text-neutral-400 text-sm uppercase tracking-widest">Portrait Bild</span>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection direction="right" delay={0.2}>
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-500 font-semibold mb-4 block">
                            Über Adina
                        </span>
                        <h2 className="font-display text-display-md text-neutral-900 mb-6">
                            Worte, die berühren.
                            <br />
                            <span className="text-primary-500">Auftritte, die bleiben.</span>
                        </h2>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                            Adina Wilcke ist Slampoetin, Sprecherin, Moderatorin und Autorin.
                            Seit über einem Jahrzehnt steht sie auf Bühnen in ganz Deutschland
                            und verwandelt Sprache in Erlebnis. Ihre Poetry Slams berühren,
                            ihre Moderationen begeistern und ihre Workshops inspirieren.
                        </p>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            Ob Firmenveranstaltung, Festival oder private Feier – Adina bringt
                            Energie, Tiefgang und das gewisse Etwas mit.
                        </p>
                        <Link
                            href="/vita"
                            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-semibold text-sm uppercase tracking-wider group transition-colors"
                        >
                            Mehr erfahren
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── Services / Was ich mache ──────────── */}
            <section className="py-24 lg:py-32 bg-neutral-950 text-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <AnimatedSection className="text-center mb-20">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-400 font-semibold mb-4 block">
                            Leistungen
                        </span>
                        <h2 className="font-display text-display-lg mb-4">
                            Was ich für Sie tun kann
                        </h2>
                        <div className="divider mx-auto !bg-primary-500" />
                    </AnimatedSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🎤',
                                title: 'Poetry & Slam',
                                description:
                                    'Lebendige Auftritte, die das Publikum fesseln. Poetry Slam, Lesungen und Spoken Word.',
                                href: '/poetry-and-more',
                            },
                            {
                                icon: '🎙️',
                                title: 'Moderation',
                                description:
                                    'Professionelle Moderation für Galas, Konferenzen und Events jeder Größe.',
                                href: '/kontakt',
                            },
                            {
                                icon: '📝',
                                title: 'Workshops',
                                description:
                                    'Kreative Schreib- und Performanceworkshops für alle Altersgruppen.',
                                href: '/workshops',
                            },
                            {
                                icon: '📖',
                                title: 'Buch & Texte',
                                description:
                                    'Autorin mit Veröffentlichungen, Ghostwriting und individuelle Texte auf Bestellung.',
                                href: '/buch',
                            },
                        ].map((service, i) => (
                            <AnimatedSection key={service.title} delay={i * 0.1}>
                                <Link
                                    href={service.href}
                                    className="block group p-8 rounded-2xl border border-white/10 hover:border-primary-500/40 bg-white/5 hover:bg-white/10 transition-all duration-500 h-full"
                                >
                                    <div className="text-4xl mb-6">{service.icon}</div>
                                    <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1 mt-6 text-primary-400 text-xs uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Mehr
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </Link>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Referenzen / Kunden & Kooperationen ── */}
            <section className="py-24 lg:py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-500 font-semibold mb-4 block">
                            Referenzen
                        </span>
                        <h2 className="font-display text-display-lg text-neutral-900 mb-4">
                            Kunden &amp; Kooperationen
                        </h2>
                        <div className="divider mx-auto" />
                    </AnimatedSection>

                    <AnimatedSection>
                        {references.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
                                {references.map((ref, i) => {
                                    const logoUrl = getFeaturedImageUrl(ref as any);
                                    return (
                                        <div key={ref.id} className="relative w-full aspect-[3/2] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                            {logoUrl ? (
                                                <Image src={logoUrl} alt={ref.title.rendered} fill className="object-contain p-4" />
                                            ) : (
                                                <span className="flex items-center justify-center w-full h-full text-xs text-neutral-400 text-center font-display leading-tight">{ref.title.rendered}</span>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="text-center text-neutral-400">
                                Referenzen können im WP Backend unter &quot;Referenzen&quot; hinzugefügt werden.
                            </div>
                        )}
                    </AnimatedSection>

                    {references.length > 0 && (
                        <AnimatedSection className="text-center mt-16">
                            <Link href="/referenzen" className="inline-flex items-center gap-2 text-primary-500 font-semibold text-sm uppercase tracking-wider group hover:text-primary-600 transition-colors">
                                Alle ansehen
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </AnimatedSection>
                    )}
                </div>
            </section>

            {/* ── Gallery Preview ───────────────────── */}
            <section className="py-24 lg:py-32 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-500 font-semibold mb-4 block">
                            Impressionen
                        </span>
                        <h2 className="font-display text-display-lg text-neutral-900 mb-4">
                            Einblicke in meine Arbeit
                        </h2>
                        <div className="divider mx-auto" />
                    </AnimatedSection>

                    <AnimatedSection>
                        <ImageGallery images={displayImages} layout="masonry" />
                    </AnimatedSection>

                    <AnimatedSection className="text-center mt-12">
                        <Link
                            href="/media"
                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-900 text-neutral-900 rounded-full text-sm uppercase tracking-[0.15em] font-semibold hover:bg-neutral-900 hover:text-white transition-all duration-300"
                        >
                            Alle Medien ansehen
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </AnimatedSection>
                </div>
            </section>

            {/* ── Events ─────────────────────────── */}
            <section className="py-24 lg:py-32 bg-neutral-950 text-white">
                <div className="max-w-3xl mx-auto px-6 lg:px-12">
                    <AnimatedSection className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-400 font-semibold mb-4 block">
                            Termine
                        </span>
                        <h2 className="font-display text-display-lg mb-4">
                            Nächste Events
                        </h2>
                        <div className="divider mx-auto !bg-primary-500" />
                    </AnimatedSection>

                    <AnimatedSection>
                        <EventList events={events} limit={3} compact />
                    </AnimatedSection>
                </div>
            </section>

            {/* ── CTA Section (Buchbarkeit) ─────────── */}
            <section className="py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.3),transparent_50%)]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                    <AnimatedSection>
                        <h2 className="font-display text-display-lg text-white mb-6">
                            Bereit für unvergessliche Worte?
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Ob Poetry Slam, Moderation, Workshop oder individueller Text –
                            lassen Sie uns gemeinsam etwas Besonderes schaffen.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link
                                href="/kontakt"
                                className="px-10 py-4 bg-white text-primary-700 rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-neutral-100 transition-all duration-300 shadow-xl"
                            >
                                Jetzt Anfragen
                            </Link>
                            <a
                                href={`mailto:${siteConfig.bookingEmail}`}
                                className="px-10 py-4 bg-transparent text-white rounded-full text-sm uppercase tracking-[0.2em] font-semibold border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300"
                            >
                                E-Mail schreiben
                            </a>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
