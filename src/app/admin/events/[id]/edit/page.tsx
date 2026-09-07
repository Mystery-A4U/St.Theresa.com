import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: event } = await supabase.from("events").select("*").eq("id", params.id).single();
  if (!event) notFound();

  const { data: media } = await supabase
    .from("event_media")
    .select("*")
    .eq("event_id", event.id)
    .order("created_at", { ascending: true });

  const images = (media ?? []).filter((m) => m.media_type === "image");
  const videos = (media ?? []).filter((m) => m.media_type === "video");

  return (
    <div className="min-h-screen bg-mist">
      <AdminNav />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="section-label mb-1">Edit</p>
        <h1 className="mb-8 font-serif text-2xl font-medium text-ink">{event.title}</h1>
        <EventForm mode="edit" initialEvent={event} initialImages={images} initialVideos={videos} />
      </div>
    </div>
  );
}
