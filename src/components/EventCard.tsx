'use client';

import { SlamEvent } from '@/lib/events';
import Link from 'next/link';

interface EventCardProps {
    event: SlamEvent;
    compact?: boolean;
}

const sourceColors: Record<string, string> = {
    u20poetryslam: 'bg-purple-500/20 text-purple-300',
    poetryslam: 'bg-blue-500/20 text-blue-300',
    eigene: 'bg-primary-500/20 text-primary-300',
};

export default function EventCard({ event, compact = false }: EventCardProps) {
    const dateParts = event.displayDate.split(', ');

    return (
        <div className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1">
            {/* Date Badge */}
            <div className="flex items-start gap-5">
                <div className="flex-shrink-0 bg-gradient-to-br from-primary-500 to-accent-600 rounded-xl w-16 h-16 flex flex-col items-center justify-center text-white shadow-lg shadow-primary-500/20">
                    <span className="text-2xl font-bold leading-none">
                        {new Date(event.date).getDate()}
                    </span>
                    <span className="text-[0.6rem] uppercase tracking-wider opacity-80">
                        {new Date(event.date).toLocaleDateString('de-AT', { month: 'short' })}
                    </span>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded-full font-medium ${sourceColors[event.source] || sourceColors.eigene}`}>
                            {event.sourceLabel}
                        </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-primary-300 transition-colors leading-tight mb-1">
                        {event.title}
                    </h3>

                    {event.location && (
                        <p className="text-sm text-white/50 flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
                            </svg>
                            {event.location}
                        </p>
                    )}

                    {!compact && event.description && (
                        <p className="text-sm text-white/40 mt-2 line-clamp-2">
                            {event.description}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-3">
                        {event.ticketUrl && (
                            <a
                                href={event.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs uppercase tracking-wider font-semibold text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
                            >
                                Tickets →
                            </a>
                        )}
                        {event.link && (
                            <a
                                href={event.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
                            >
                                Mehr Info
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Event List Component
// ─────────────────────────────────────────────
interface EventListProps {
    events: SlamEvent[];
    limit?: number;
    compact?: boolean;
}

export function EventList({ events, limit, compact = false }: EventListProps) {
    const visible = limit ? events.slice(0, limit) : events;

    if (visible.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-white/40 text-lg">Aktuell keine bevorstehenden Events.</p>
                <p className="text-white/25 text-sm mt-2">Schau bald wieder vorbei!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {visible.map((event) => (
                <EventCard key={event.id} event={event} compact={compact} />
            ))}
            {limit && events.length > limit && (
                <Link
                    href="/events"
                    className="text-center text-primary-400 hover:text-primary-300 text-sm uppercase tracking-wider font-semibold py-4 transition-colors"
                >
                    Alle {events.length} Events anzeigen →
                </Link>
            )}
        </div>
    );
}
