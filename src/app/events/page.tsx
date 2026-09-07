import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/EventCard";
import type { SchoolEvent } from "@/lib/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events at St. Theresa Matriculation Higher Secondary School, Sendurai.",
};

export const revalidate = 30;

async function getEvents(): Promise<SchoolEvent[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: false });
  return data ?? [];
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div>
      <section className="bg-mist py-16 md:py-24">
        <div className="container-school">
          <p className="eyebrow mb-4">Events</p>
          <h1 className="max-w-2xl font-serif text-4xl font-medium leading-tight text-ink md:text-5xl">
            Celebrations, competitions and milestones
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate">
            A running record of what happens on and off our campus — from Annual
            Day to inter-school competitions.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-school">
          {events.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl2 border border-dashed border-ink/15 bg-mist p-16 text-center">
              <p className="text-sm text-slate">
                No events have been published yet. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
