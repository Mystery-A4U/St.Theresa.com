import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import EventsTable from "@/components/admin/EventsTable";

export default async function AdminEventsPage() {
  const supabase = createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false });

  return (
    <div className="min-h-screen bg-mist">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="section-label mb-1">Manage</p>
            <h1 className="font-serif text-2xl font-medium text-ink">Events</h1>
          </div>
          <Link
            href="/admin/events/new"
            className="rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            + New Event
          </Link>
        </div>

        <EventsTable events={events ?? []} />
      </div>
    </div>
  );
}
