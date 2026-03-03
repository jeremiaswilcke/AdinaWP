// WordPress Headless API Configuration & Helpers
// This module connects the Next.js frontend to WordPress REST API

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://adinawilcke.com/wp-json/wp/v2';

export interface WPPost {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    featured_media: number;
    date: string;
    categories: number[];
    tags: number[];
    _embedded?: {
        'wp:featuredmedia'?: Array<{
            source_url: string;
            alt_text: string;
            media_details: {
                width: number;
                height: number;
                sizes: Record<string, { source_url: string; width: number; height: number }>;
            };
        }>;
    };
}

export interface WPReference {
    id: number;
    title: { rendered: string };
    _embedded?: WPPost['_embedded'];
}

export interface WPPage {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    featured_media: number;
    template: string;
    _embedded?: WPPost['_embedded'];
}

export interface WPMedia {
    id: number;
    source_url: string;
    alt_text: string;
    media_details: {
        width: number;
        height: number;
        sizes: Record<string, { source_url: string; width: number; height: number }>;
    };
}

export interface WPMenu {
    items: Array<{
        ID: number;
        title: string;
        url: string;
        slug: string;
        children?: WPMenu['items'];
    }>;
}

async function fetchAPI<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${WP_API_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

    const res = await fetch(url.toString(), {
        next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
        throw new Error(`WP API Error: ${res.status} ${res.statusText} – ${endpoint}`);
    }

    return res.json();
}

// ─────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────
export async function getPages(): Promise<WPPage[]> {
    return fetchAPI<WPPage[]>('/pages', { per_page: '100', _embed: '1' });
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
    const pages = await fetchAPI<WPPage[]>('/pages', { slug, _embed: '1' });
    return pages.length > 0 ? pages[0] : null;
}

// ─────────────────────────────────────────────
// Posts
// ─────────────────────────────────────────────
export async function getPosts(perPage = 10, page = 1): Promise<WPPost[]> {
    return fetchAPI<WPPost[]>('/posts', {
        per_page: perPage.toString(),
        page: page.toString(),
        _embed: '1',
    });
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
    const posts = await fetchAPI<WPPost[]>('/posts', { slug, _embed: '1' });
    return posts.length > 0 ? posts[0] : null;
}

// ─────────────────────────────────────────────
// References (Kunden / Kooperationen)
// ─────────────────────────────────────────────
export async function getReferences(limit?: number): Promise<WPReference[]> {
    const params: Record<string, string> = { _embed: '1' };
    if (limit) params.per_page = limit.toString();
    else params.per_page = '100'; // fetch up to 100 on the overview page

    try {
        return await fetchAPI<WPReference[]>('/referenz', params);
    } catch {
        // Return empty if CPT is not yet created in WP Backend
        return [];
    }
}

// ─────────────────────────────────────────────
// Media
// ─────────────────────────────────────────────
export async function getMedia(id: number): Promise<WPMedia> {
    return fetchAPI<WPMedia>(`/media/${id}`);
}

export async function getMediaItems(perPage = 50): Promise<WPMedia[]> {
    return fetchAPI<WPMedia[]>('/media', { per_page: perPage.toString() });
}

export async function getGalleryImages(parentSlug: string): Promise<WPMedia[]> {
    try {
        const page = await getPageBySlug(parentSlug);
        if (!page) return [];

        return await fetchAPI<WPMedia[]>('/media', {
            parent: page.id.toString(),
            per_page: '100',
        });
    } catch {
        return [];
    }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
export function getFeaturedImageUrl(post: WPPost | WPPage): string | null {
    const media = post._embedded?.['wp:featuredmedia']?.[0];
    return media?.source_url || null;
}

export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}
