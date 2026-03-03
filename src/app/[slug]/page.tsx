import { getPageBySlug, getPages, getFeaturedImageUrl } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DiviContent from '@/components/DiviContent';
import HeroSection from '@/components/HeroSection';
import AnimatedSection from '@/components/AnimatedSection';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generate all page routes from WP at build time
export async function generateStaticParams() {
    try {
        const pages = await getPages();
        return pages.map((page) => ({ slug: page.slug }));
    } catch {
        return [];
    }
}

// Dynamic metadata from WP
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const page = await getPageBySlug(slug);
        if (!page) return {};
        return {
            title: page.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '–'),
        };
    } catch {
        return {};
    }
}

export default async function DynamicPage({ params }: PageProps) {
    const { slug } = await params;

    let page;
    try {
        page = await getPageBySlug(slug);
    } catch {
        // If WP API is not available, show a fallback
        return (
            <div className="pt-32 pb-24 px-6 lg:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <h1 className="font-display text-display-md text-neutral-900 mb-6 capitalize">
                            {slug.replace(/-/g, ' ')}
                        </h1>
                        <p className="text-lg text-neutral-500">
                            Diese Seite wird geladen, sobald die WordPress-Verbindung eingerichtet ist.
                        </p>
                    </AnimatedSection>
                </div>
            </div>
        );
    }

    if (!page) {
        notFound();
    }

    const featuredImage = getFeaturedImageUrl(page);
    const title = page.title.rendered.replace(/&amp;/g, '&').replace(/&#8211;/g, '–');

    return (
        <>
            {/* Page Hero */}
            <HeroSection
                title={title}
                backgroundImage={featuredImage || undefined}
            />

            {/* Page Content (Divi 5 rendered area) */}
            <section className="py-16 lg:py-24 px-6 lg:px-12">
                <div className="max-w-5xl mx-auto">
                    <AnimatedSection>
                        <DiviContent html={page.content.rendered} />
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}
