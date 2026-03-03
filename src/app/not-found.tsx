import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <AnimatedSection className="text-center">
                <span className="text-8xl font-display font-bold text-primary-200 mb-4 block">404</span>
                <h1 className="font-display text-display-sm text-neutral-900 mb-4">
                    Seite nicht gefunden
                </h1>
                <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                    Die gesuchte Seite existiert leider nicht oder wurde verschoben.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full text-sm uppercase tracking-[0.15em] font-semibold hover:bg-primary-600 transition-all duration-300 shadow-lg shadow-primary-500/25"
                >
                    Zurück zur Startseite
                </Link>
            </AnimatedSection>
        </div>
    );
}
