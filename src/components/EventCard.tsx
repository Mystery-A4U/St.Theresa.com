import Image from "next/image";
import Link from "next/link";
import { formatEventDate } from "@/lib/slug";
import type { SchoolEvent } from "@/lib/types";

export default function EventCard({ event }: { event: SchoolEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-xl2 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist2">
        {event.cover_image ? (
          <Image
            src={event.cover_image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-4xl text-ink/10">
            ST
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-maroon shadow-sm">
          {formatEventDate(event.event_date)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-medium text-ink transition-colors group-hover:text-maroon">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">
          {event.description}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-maroon">
          View details →
        </span>
      </div>
    </Link>
  );
}
