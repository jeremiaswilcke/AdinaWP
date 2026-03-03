// Site-wide configuration
export const siteConfig = {
    name: 'Adina Wilcke',
    tagline: 'Slampoetin · Sprecherin · Moderatorin · Autorin',
    description:
        'Adina Wilcke – Slampoetin, Sprecherin, Moderatorin und Autorin. Buchen Sie Adina für Ihr Event, Workshop oder Moderation.',
    url: 'https://adinawilcke.com',
    bookingEmail: 'kontakt@adinawilcke.com',
    social: {
        instagram: 'https://www.instagram.com/adinawilcke/',
        youtube: '',
        spotify: '',
    },

    // Navigation items (will be replaced by WP menu API when available)
    navigation: [
        { label: 'Home', href: '/' },
        { label: 'Poetry & More', href: '/poetry-and-more' },
        { label: 'Workshops', href: '/workshops' },
        { label: 'Podcast & More', href: '/podcast-and-more' },
        { label: 'Events', href: '/events' },
        { label: 'Buch', href: '/buch' },
        { label: 'Media', href: '/media' },
        { label: 'Vita', href: '/vita' },
    ],
} as const;
