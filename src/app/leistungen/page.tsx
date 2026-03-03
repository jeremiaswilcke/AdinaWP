import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata = {
    title: 'Poetry & More | Adina Wilcke',
    description: 'Poetry Slam, Moderation, Buch und Sprecherin.',
};

const services = [
    {
        id: 'poetry',
        title: 'Poetry Slam',
        description: 'Worte, die bewegen. Auf der Bühne, für Unternehmen oder als Workshop. Adina Wilcke bringt Ihre Themen auf den Punkt – humorvoll, tiefgründig und immer authentisch.',
        image: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1200&auto=format&fit=crop',
        className: 'md:col-span-2 md:row-span-2', // Large Feature Box
        bookingRef: 'Buchungsanfrage – Poetry Slam'
    },
    {
        id: 'moderation',
        title: 'Moderatorin',
        description: 'Professionelle und charmante Begleitung für Ihr Event. Ob Gala, Podiumsdiskussion oder hybrides Format.',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop',
        className: 'md:col-span-1 md:row-span-2', // Tall Portrait Box
        bookingRef: 'Buchungsanfrage – Moderation'
    },
    {
        id: 'speaker',
        title: 'Sprecherin',
        description: 'Eine Stimme mit Charakter. Für Voice-Over, Hörbücher, Werbung oder Imagefilme.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop',
        className: 'md:col-span-1 md:row-span-1', // Small Square Box
        bookingRef: 'Buchungsanfrage – Sprecherin'
    },
    {
        id: 'book',
        title: 'Autorin',
        description: 'Bücher, Kolumnen und maßgeschneiderte Texte. Wenn es mehr als nur gesprochene Worte sein sollen.',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=800&auto=format&fit=crop',
        className: 'md:col-span-1 md:row-span-1', // Small Square Box
        bookingRef: 'Allgemeine Anfrage'
    },
    {
        id: 'workshops',
        title: 'Workshops',
        description: 'Kreatives Schreiben und Performance-Training für Schulen, Teams oder Einzelpersonen.',
        image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop',
        className: 'md:col-span-3 md:row-span-1', // Wide Landscape Box
        bookingRef: 'Buchungsanfrage – Workshop'
    },
];

export default function PoetryAndMorePage() {
    return (
        <>
            <div className="h-[var(--header-height)]" />

            <section className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
                <AnimatedSection className="text-center mb-16 lg:mb-24">
                    <span className="text-xs uppercase tracking-[0.3em] text-primary-500 font-semibold mb-4 block">
                        Portfolio
                    </span>
                    <h1 className="font-display text-display-md text-neutral-900 mb-6">
                        Poetry & <span className="text-primary-500 italic">More</span>
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Entdecken Sie die vielfältigen Facetten von Adina Wilcke.
                        Von packenden Bühnenauftritten bis hin zur professionellen Moderation.
                    </p>
                </AnimatedSection>

                {/* The Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                    {services.map((service, index) => (
                        <AnimatedSection
                            key={service.id}
                            direction="up"
                            delay={index * 0.1}
                            className={`group relative overflow-hidden rounded-[2rem] bg-neutral-100 ${service.className}`}
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                                <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
                                    {service.title}
                                </h2>

                                {/* Hidden description that reveals on hover (Desktop) or is semi-visible (Mobile) */}
                                <div className="overflow-hidden md:max-h-0 md:opacity-0 md:group-hover:max-h-[200px] md:group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <p className="text-white/90 text-sm md:text-base mb-6 max-w-md leading-relaxed">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={`/kontakt?service=${encodeURIComponent(service.bookingRef)}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white text-white hover:text-neutral-900 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                                    >
                                        Anfragen
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Always visible on Mobile, hidden on md: because it's replaced by the hover effect */}
                                <div className="mt-4 md:hidden">
                                    <Link
                                        href={`/kontakt?service=${encodeURIComponent(service.bookingRef)}`}
                                        className="inline-flex items-center gap-2 text-white/90 text-sm font-semibold uppercase tracking-wider"
                                    >
                                        Anfragen <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </section>
        </>
    );
}
