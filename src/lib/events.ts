// ─────────────────────────────────────────────
// Events aggregator
// Combines events from:
//  1. u20poetryslam.at (WP REST API)
//  2. poetryslam.online (external link – API blocked)
//  3. Own WP backend (Custom Post Type "event")
// ─────────────────────────────────────────────

const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || '';

export interface SlamEvent {
    id: string;
    title: string;
    date: string;          // ISO date string
    displayDate: string;   // human-readable
    location?: string;
    description: string;
    ticketUrl?: string;
    source: 'u20poetryslam' | 'poetryslam' | 'eigene';
    sourceLabel: string;
    link?: string;
}

// ── u20poetryslam.at ──────────────────────────
async function fetchU20Events(): Promise<SlamEvent[]> {
    try {
        // Try the Events Calendar REST API first (The Events Calendar plugin)
        const res = await fetch(
            'https://u20poetryslam.at/wp-json/tribe/events/v1/events?per_page=10&start_date=now',
            { next: { revalidate: 3600 } }
        );

        if (res.ok) {
            const data = await res.json();
            return (data.events || []).map((e: Record<string, unknown>) => ({
                id: `u20-${e.id}`,
                title: e.title as string,
                date: (e.start_date as string) || '',
                displayDate: formatDate(e.start_date as string),
                location: (e.venue as Record<string, unknown>)?.venue as string || 'Dschungel Wien',
                description: stripHtml((e.excerpt as string) || (e.description as string) || ''),
                ticketUrl: (e.website as string) || (e.url as string) || undefined,
                source: 'u20poetryslam' as const,
                sourceLabel: 'U20 Poetry Slam',
                link: e.url as string,
            }));
        }
    } catch {
        // API not available, use fallback
    }

    // Fallback: Known upcoming dates from u20poetryslam.at event page
    const knownDates = [
        { date: '2025-03-06', title: 'schreib\' KLASSE! + U20 Poetry Slam' },
        { date: '2025-04-10', title: 'schreib\' KLASSE! + U20 Poetry Slam' },
        { date: '2025-05-08', title: 'schreib\' KLASSE! + U20 Poetry Slam' },
        { date: '2025-06-05', title: 'schreib\' KLASSE! + U20 Poetry Slam' },
    ];

    return knownDates
        .filter((e) => new Date(e.date) >= new Date())
        .map((e, i) => ({
            id: `u20-fallback-${i}`,
            title: e.title,
            date: e.date,
            displayDate: formatDate(e.date),
            location: 'Dschungel Wien, Wien',
            description: 'U20 Poetry Slam im Dschungel Wien. Junge Slampoet:innen, Wortkünstler:innen und Lyriker:innen auf der Bühne.',
            ticketUrl: 'https://www.dschungelwien.at/u20-poetry-slam',
            source: 'u20poetryslam' as const,
            sourceLabel: 'U20 Poetry Slam',
            link: 'https://u20poetryslam.at/veranstaltungen/',
        }));
}

// ── poetryslam.online ─────────────────────────
async function fetchPoetrySlamEvents(): Promise<SlamEvent[]> {
    try {
        const res = await fetch(
            'https://poetryslam.online/wp-json/tribe/events/v1/events?per_page=10&start_date=now',
            {
                next: { revalidate: 3600 },
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
            }
        );

        if (res.ok) {
            const data = await res.json();
            return (data.events || []).map((e: Record<string, unknown>) => ({
                id: `pso-${e.id}`,
                title: e.title as string,
                date: (e.start_date as string) || '',
                displayDate: formatDate(e.start_date as string),
                location: (e.venue as Record<string, unknown>)?.venue as string || '',
                description: stripHtml((e.excerpt as string) || (e.description as string) || ''),
                ticketUrl: (e.website as string) || (e.url as string) || undefined,
                source: 'poetryslam' as const,
                sourceLabel: 'poetryslam.online',
                link: e.url as string,
            }));
        }
    } catch {
        // API not available or error
    }

    return [];
}

function getPoetrySlamOnlineLink(): { label: string; url: string } {
    return {
        label: 'Alle Events auf poetryslam.online',
        url: 'https://poetryslam.online',
    };
}

// ── Own WP Events (Custom Post Type) ──────────
async function fetchOwnEvents(): Promise<SlamEvent[]> {
    if (!WP_API) return [];

    try {
        // Try custom post type "event" or fallback to posts with category "events"
        const res = await fetch(`${WP_API}/event?per_page=20&orderby=date&order=asc`, {
            next: { revalidate: 60 },
        });

        if (res.ok) {
            const events = await res.json();
            return events.map((e: Record<string, unknown>) => {
                const meta = (e.meta as Record<string, string>) || {};
                return {
                    id: `own-${e.id}`,
                    title: ((e.title as Record<string, string>)?.rendered || '') as string,
                    date: meta.event_date || (e.date as string),
                    displayDate: formatDate(meta.event_date || (e.date as string)),
                    location: meta.event_location || '',
                    description: stripHtml(((e.excerpt as Record<string, string>)?.rendered || '') as string),
                    ticketUrl: meta.event_ticket_url || undefined,
                    source: 'eigene' as const,
                    sourceLabel: 'Adina Wilcke',
                    link: (e.link as string) || undefined,
                };
            });
        }
    } catch {
        // WP not connected yet
    }

    return [];
}

// ── Main aggregator ───────────────────────────
export async function getAllEvents(): Promise<SlamEvent[]> {
    const [u20Events, ownEvents, psoEvents] = await Promise.all([
        fetchU20Events(),
        fetchOwnEvents(),
        fetchPoetrySlamEvents(),
    ]);

    const all = [...ownEvents, ...u20Events, ...psoEvents];

    // Sort by date ascending
    all.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return all;
}

export { getPoetrySlamOnlineLink };

// ── Helpers ───────────────────────────────────
function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('de-AT', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    } catch {
        return dateStr;
    }
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}
