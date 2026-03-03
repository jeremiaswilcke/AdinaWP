'use client';

interface DiviContentProps {
    html: string;
}

/**
 * DiviContent renders the raw HTML output from WordPress/Divi 5.
 * This allows editors to use all Divi 5 modules in the WP backend,
 * and they render seamlessly in the headless frontend.
 *
 * The CSS classes for Divi are loaded via the divi-content and wp-content
 * style classes defined in globals.css.
 */
export default function DiviContent({ html }: DiviContentProps) {
    if (!html) {
        return null;
    }

    return (
        <div
            className="divi-content wp-content"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
