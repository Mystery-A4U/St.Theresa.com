import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { formatEventDate } from "@/lib/slug";
import EventGallery from "@/components/EventGallery";
import EventVideos from "@/components/EventVideos";
import type { EventMedia, SchoolEvent } from "@/lib/types";

export const revalidate = 30;

async function getEvent(slug: string): Promise<SchoolEvent | null> {
  const supabase = createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!event) return null;

  const { data: media } = await supabase
    .from("event_media")
    .select("*")
    .eq("event_id", event.id)
    .order("created_at", { ascending: true });

  return { ...event, event_media: media ?? [] };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEvent(params.slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.description.slice(0, 155),
  };
}

export default async function EventDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEvent(params.slug);
  if (!event) notFound();

  const media = event.event_media ?? [];
  const images: EventMedia[] = media.filter((m) => m.media_type === "image");
  const videos: EventMedia[] = media.filter((m) => m.media_type === "video");

  return (
    <div>
      {/* Cover */}
      <section className="relative h-[46vh] min-h-[340px] w-full overflow-hidden bg-ink md:h-[56vh]">
        {event.cover_image ? (
          <Image
            src={event.cover_image}
            alt={event.title}
            fill
            priority
            className="object-cover opacity-80"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <div className="container-school relative flex h-full flex-col justify-end pb-12">
          <Link href="/events" className="mb-4 w-fit text-sm font-medium text-white/80 hover:text-white">
            ← Back to Events
          </Link>
          <p className="mb-2 text-sm font-medium text-gold-light">
            {formatEventDate(event.event_date)}
          </p>
          <h1 className="max-w-3xl font-serif text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20">
        <div className="container-school">
          <div className="prose-school max-w-3xl whitespace-pre-line text-[15px] leading-relaxed">
            {event.description}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {images.length > 0 && (
        <section className="bg-mist py-16 md:py-20">
          <div className="container-school">
            <p className="section-label mb-2">Photo Gallery</p>
            <h2 className="mb-8 font-serif text-2xl font-medium text-ink md:text-3xl">
              Moments from the day
            </h2>
            <EventGallery images={images} />
          </div>
        </section>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container-school">
            <p className="section-label mb-2">Video</p>
            <h2 className="mb-8 font-serif text-2xl font-medium text-ink md:text-3xl">
              Watch the highlights
            </h2>
            <EventVideos videos={videos} />
          </div>
        </section>
      )}
    </div>
  );
}
