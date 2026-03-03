import { getReferences, getFeaturedImageUrl } from '@/lib/wordpress';
import AnimatedSection from '@/components/AnimatedSection';
import Image from 'next/image';

export const revalidate = 3600;

export default async function ReferenzenPage() {
    const references = await getReferences(); // fetches all

    return (
        <>
            {/* Header */}
            <section className="pt-40 pb-20 bg-gradient-to-b from-neutral-50 to-white text-center">
                <AnimatedSection>
                    <p className="text-primary-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4">
                        Referenzen
                    </p>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-neutral-900 font-semibold mb-6">
                        Kunden &amp; Kooperationen
                    </h1>
                    <p className="text-neutral-500 max-w-xl mx-auto text-lg leading-relaxed px-4">
                        Ein Auszug meiner bisherigen wunderbaren Partner, Kunden und Projekte.
                    </p>
                </AnimatedSection>
            </section>

            {/* Logos Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    {references.length === 0 ? (
                        <div className="text-center py-20 text-neutral-400">
                            Noch keine Referenzen hinterlegt. Im WordPress Backend unter &quot;Referenzen&quot; können diese hinzugefügt werden.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-center">
                            {references.map((ref, idx) => {
                                const logoUrl = getFeaturedImageUrl(ref as any);
                                return (
                                    <AnimatedSection key={ref.id} delay={idx * 0.05} className="flex justify-center p-6 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors aspect-[3/2] relative group">
                                        {logoUrl ? (
                                            <Image
                                                src={logoUrl}
                                                alt={ref.title.rendered}
                                                fill
                                                className="object-contain p-8 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                                            />
                                        ) : (
                                            <span className="text-lg font-display text-neutral-400 m-auto text-center px-4">
                                                {ref.title.rendered}
                                            </span>
                                        )}
                                    </AnimatedSection>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
