import { getAllEvents, getPoetrySlamOnlineLink } from '@/lib/events';
import { EventList } from '@/components/EventCard';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const revalidate = 3600; // Re-fetch every hour

export default async function EventsPage() {
    const events = await getAllEvents();
    const psoLink = getPoetrySlamOnlineLink();

    return (
        <>
            {/* Hero */}
            <section className="pt-40 pb-20 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-center">
                <AnimatedSection>
                    <p className="text-primary-400 text-sm uppercase tracking-[0.3em] mb-4">
                        Termine & Auftritte
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6">
                        Events
                    </h1>
                    <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed px-4">
                        Poetry Slams, Workshops, Moderationen und mehr.
                        Live-Termine mit Adina Wilcke und Veranstaltungen der Slam-Community.
                    </p>
                </AnimatedSection>
            </section>

            {/* Events List */}
            <section className="py-20 bg-neutral-950">
                <div className="max-w-3xl mx-auto px-6">
                    <AnimatedSection>
                        <EventList events={events} />
                    </AnimatedSection>

                    {/* External Links */}
                    <AnimatedSection delay={0.2}>
                        <div className="mt-16 border-t border-white/10 pt-12">
                            <h2 className="font-display text-xl text-white/60 mb-6 text-center">
                                Weitere Event-Quellen
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <a
                                    href={psoLink.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary-500/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-lg">
                                        🎤
                                    </div>
                                    <div>
                                        <span className="text-white font-medium group-hover:text-primary-300 transition-colors">
                                            poetryslam.online
                                        </span>
                                        <span className="block text-xs text-white/30">Events & Community</span>
                                    </div>
                                    <svg className="w-4 h-4 ml-auto text-white/20 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                                <a
                                    href="https://u20poetryslam.at/veranstaltungen/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary-500/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg">
                                        ✦
                                    </div>
                                    <div>
                                        <span className="text-white font-medium group-hover:text-primary-300 transition-colors">
                                            U20 Poetry Slam
                                        </span>
                                        <span className="block text-xs text-white/30">Veranstaltungen Wien</span>
                                    </div>
                                    <svg className="w-4 h-4 ml-auto text-white/20 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>

                    {/* CTA */}
                    <AnimatedSection delay={0.3}>
                        <div className="mt-16 text-center">
                            <p className="text-white/40 mb-4">Eigenes Event planen?</p>
                            <Link
                                href="/kontakt"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25 hover:-translate-y-0.5"
                            >
                                Adina buchen →
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
