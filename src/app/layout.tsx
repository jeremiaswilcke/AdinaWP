import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingCTA from '@/components/BookingCTA';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import { siteConfig } from '@/lib/config';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: `${siteConfig.name} – ${siteConfig.tagline}`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        'Adina Wilcke',
        'Slampoetin',
        'Sprecherin',
        'Moderatorin',
        'Autorin',
        'Poetry Slam',
        'Workshop',
        'Buchen',
    ],
    authors: [{ name: siteConfig.name }],
    openGraph: {
        type: 'website',
        locale: 'de_DE',
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: `${siteConfig.name} – ${siteConfig.tagline}`,
        description: siteConfig.description,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="de" className={`${inter.variable} ${cormorant.variable}`}>
            <body className="font-body antialiased">
                <SmoothScroll>
                    <ScrollProgress />
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                    <BookingCTA />
                </SmoothScroll>
            </body>
        </html>
    );
}
