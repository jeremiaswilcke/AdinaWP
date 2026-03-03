import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import FixedBackground from '@/components/FixedBackground';

export default function KontaktPage() {
    return (
        <>
            <FixedBackground />
            {/* Spacer for fixed header */}
            <div className="h-[var(--header-height)]" />

            <section className="py-24 lg:py-32 px-6 lg:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Info */}
                    <AnimatedSection direction="left">
                        <span className="text-xs uppercase tracking-[0.3em] text-primary-500 font-semibold mb-4 block">
                            Buchung & Kontakt
                        </span>
                        <h1 className="font-display text-display-md text-neutral-900 mb-6">
                            Lassen Sie uns zusammen
                            <br />
                            <span className="text-primary-500">etwas Besonderes schaffen.</span>
                        </h1>
                        <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                            Sie möchten Adina für einen Poetry Slam, eine Moderation, einen
                            Workshop oder als Sprecherin buchen? Schreiben Sie mir und
                            erzählen Sie mir von Ihrem Projekt.
                        </p>
                        <div className="space-y-4 text-neutral-600">
                            <div className="flex items-center gap-3">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-500">
                                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:kontakt@adinawilcke.com" className="hover:text-primary-500 transition-colors">
                                    kontakt@adinawilcke.com
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* Right: Contact Form */}
                    <AnimatedSection direction="right" delay={0.2}>
                        <form className="space-y-6 bg-white rounded-3xl p-8 lg:p-10 shadow-xl shadow-neutral-200/50 border border-neutral-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-neutral-800"
                                        placeholder="Ihr Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                                        E-Mail *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-neutral-800"
                                        placeholder="ihre@email.de"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                                    Betreff
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-neutral-800"
                                >
                                    <option>Buchungsanfrage – Poetry Slam</option>
                                    <option>Buchungsanfrage – Moderation</option>
                                    <option>Buchungsanfrage – Workshop</option>
                                    <option>Buchungsanfrage – Sprecherin</option>
                                    <option>Allgemeine Anfrage</option>
                                    <option>Presseanfrage</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                                    Wunschtermin
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-neutral-800"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-2">
                                    Nachricht *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-neutral-800 resize-none"
                                    placeholder="Erzählen Sie mir von Ihrem Event oder Projekt..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-8 py-4 bg-primary-500 text-white rounded-full text-sm uppercase tracking-[0.2em] font-bold hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40"
                            >
                                Anfrage absenden
                            </button>

                            <p className="text-center text-neutral-400 text-xs">
                                Ich melde mich innerhalb von 48 Stunden bei Ihnen.
                            </p>
                        </form>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
