import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const { count: totalEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true });

  const { count: publishedEvents } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  const { data: recentEvents } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-mist">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-sm text-slate">Welcome back,</p>
        <h1 className="font-serif text-2xl font-medium text-ink">{user?.email}</h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl2 bg-white p-6 shadow-card">
            <p className="text-xs font-semibold tracking-wide text-gold-dark">TOTAL EVENTS</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-ink">{totalEvents ?? 0}</p>
          </div>
          <div className="rounded-xl2 bg-white p-6 shadow-card">
            <p className="text-xs font-semibold tracking-wide text-gold-dark">PUBLISHED</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-ink">{publishedEvents ?? 0}</p>
          </div>
          <div className="flex flex-col justify-between rounded-xl2 bg-maroon p-6 shadow-card">
            <p className="text-xs font-semibold tracking-wide text-white/70">QUICK ACTION</p>
            <Link
              href="/admin/events/new"
              className="mt-3 w-fit rounded-full bg-white px-5 py-2.5 text-sm font-medium text-maroon"
            >
              + New Event
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium text-ink">Recent Events</h2>
            <Link href="/admin/events" className="text-sm font-medium text-maroon hover:underline">
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl2 bg-white shadow-card">
            {recentEvents && recentEvents.length > 0 ? (
              recentEvents.map((event, i) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i !== recentEvents.length - 1 ? "border-b border-ink/8" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium text-ink">{event.title}</p>
                    <p className="text-xs text-slate">{event.event_date}</p>
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
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm font-medium text-maroon hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="px-6 py-8 text-center text-sm text-slate">No events yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
