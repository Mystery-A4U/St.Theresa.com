"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { formatEventDate } from "@/lib/slug";
import type { SchoolEvent } from "@/lib/types";

export default function EventsTable({ events }: { events: SchoolEvent[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      // event_media rows cascade-delete automatically (on delete cascade).
      // Note: this removes database records; Cloudinary assets for this
      // event's media should be cleaned up from the Cloudinary dashboard
      // if no longer needed.
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Could not delete this event. Please try again.");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  }

  if (events.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-ink/15 bg-white p-16 text-center">
        <p className="text-sm text-slate">No events yet. Create your first one to get started.</p>
        <Link
          href="/admin/events/new"
          className="mt-4 inline-block rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white"
        >
          + New Event
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl2 bg-white shadow-card">
      {events.map((event, i) => (
        <div
          key={event.id}
          className={`flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between ${
            i !== events.length - 1 ? "border-b border-ink/8" : ""
          }`}
        >
          <div>
            <p className="font-medium text-ink">{event.title}</p>
            <p className="mt-0.5 text-xs text-slate">
              {formatEventDate(event.event_date)} · /events/{event.slug}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                event.published ? "bg-green-100 text-green-700" : "bg-ink/5 text-ink/50"
              }`}
            >
              {event.published ? "Published" : "Draft"}
            </span>
            <Link
              href={`/events/${event.slug}`}
              target="_blank"
              className="text-sm font-medium text-ink/60 hover:text-ink"
            >
              View
            </Link>
            <Link
              href={`/admin/events/${event.id}/edit`}
              className="text-sm font-medium text-maroon hover:underline"
            >
              Edit
            </Link>

            {pendingDelete === event.id ? (
              <span className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(event.id)}
                  disabled={deletingId === event.id}
                  className="text-sm font-medium text-maroon hover:underline"
                >
                  {deletingId === event.id ? "Deleting…" : "Confirm"}
                </button>
                <button
                  onClick={() => setPendingDelete(null)}
                  className="text-sm font-medium text-ink/50 hover:text-ink"
                >
                  Cancel
                </button>
              </span>
            ) : (
              <button
                onClick={() => setPendingDelete(event.id)}
                className="text-sm font-medium text-ink/50 hover:text-maroon"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
