"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/slug";
import MediaUploader, { type UploadedItem } from "@/components/admin/MediaUploader";
import type { EventMedia, SchoolEvent } from "@/lib/types";

async function uploadFile(file: File, resourceType: "image" | "video") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("resourceType", resourceType);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Upload failed");
  }
  return (await res.json()) as { url: string; publicId: string };
}

async function deleteFromCloudinaryApi(mediaUrl: string, mediaType: "image" | "video") {
  const res = await fetch("/api/media/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mediaUrl, mediaType }),
  });
  if (!res.ok) throw new Error("Cloudinary delete failed");
}

export default function EventForm({
  mode,
  initialEvent,
  initialImages = [],
  initialVideos = [],
}: {
  mode: "create" | "edit";
  initialEvent?: SchoolEvent;
  initialImages?: EventMedia[];
  initialVideos?: EventMedia[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(initialEvent?.title ?? "");
  const [description, setDescription] = useState(initialEvent?.description ?? "");
  const [eventDate, setEventDate] = useState(initialEvent?.event_date ?? "");
  const [published, setPublished] = useState(initialEvent?.published ?? true);

  const [coverImage, setCoverImage] = useState<UploadedItem | null>(
    initialEvent?.cover_image ? { key: "cover", url: initialEvent.cover_image } : null
  );
  const [images, setImages] = useState<UploadedItem[]>(
    initialImages.map((m) => ({ key: m.id, url: m.media_url, caption: m.caption }))
  );
  const [videos, setVideos] = useState<UploadedItem[]>(
    initialVideos.map((m) => ({ key: m.id, url: m.media_url, caption: m.caption }))
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const slugPreview = slugify(title || "");

  // ── Cover image ───────────────────────────────────────
  async function handleCoverUpload(file: File) {
    const { url } = await uploadFile(file, "image");
    setCoverImage({ key: "cover", url });
  }
  async function handleCoverRemove(item: UploadedItem) {
    await deleteFromCloudinaryApi(item.url, "image");
    setCoverImage(null);
  }

  // ── Gallery images ────────────────────────────────────
  async function handleImageUpload(file: File) {
    const { url } = await uploadFile(file, "image");
    if (mode === "edit" && initialEvent) {
      const { data, error } = await supabase
        .from("event_media")
        .insert({ event_id: initialEvent.id, media_url: url, media_type: "image" })
        .select()
        .single();
      if (error) throw error;
      setImages((prev) => [...prev, { key: data.id, url }]);
    } else {
      setImages((prev) => [...prev, { key: crypto.randomUUID(), url }]);
    }
  }
  async function handleImageRemove(item: UploadedItem) {
    await deleteFromCloudinaryApi(item.url, "image");
    if (mode === "edit") {
      await supabase.from("event_media").delete().eq("id", item.key);
    }
    setImages((prev) => prev.filter((i) => i.key !== item.key));
  }

  // ── Videos ────────────────────────────────────────────
  async function handleVideoUpload(file: File) {
    const { url } = await uploadFile(file, "video");
    if (mode === "edit" && initialEvent) {
      const { data, error } = await supabase
        .from("event_media")
        .insert({ event_id: initialEvent.id, media_url: url, media_type: "video" })
        .select()
        .single();
      if (error) throw error;
      setVideos((prev) => [...prev, { key: data.id, url }]);
    } else {
      setVideos((prev) => [...prev, { key: crypto.randomUUID(), url }]);
    }
  }
  async function handleVideoRemove(item: UploadedItem) {
    await deleteFromCloudinaryApi(item.url, "video");
    if (mode === "edit") {
      await supabase.from("event_media").delete().eq("id", item.key);
    }
    setVideos((prev) => prev.filter((i) => i.key !== item.key));
  }

  // ── Save ──────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (mode === "create") {
        let slug = slugify(title);
        // Ensure uniqueness by checking for collisions.
        const { data: existing } = await supabase.from("events").select("slug").eq("slug", slug);
        if (existing && existing.length > 0) {
          slug = `${slug}-${Date.now().toString().slice(-5)}`;
        }

        const { data: newEvent, error: insertError } = await supabase
          .from("events")
          .insert({
            title,
            slug,
            description,
            event_date: eventDate,
            cover_image: coverImage?.url ?? null,
            published,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        const mediaRows = [
          ...images.map((i) => ({ event_id: newEvent.id, media_url: i.url, media_type: "image" })),
          ...videos.map((v) => ({ event_id: newEvent.id, media_url: v.url, media_type: "video" })),
        ];
        if (mediaRows.length > 0) {
          const { error: mediaError } = await supabase.from("event_media").insert(mediaRows);
          if (mediaError) throw mediaError;
        }
      } else if (initialEvent) {
        let slug = initialEvent.slug;
        if (slugify(title) !== initialEvent.slug) {
          const newSlug = slugify(title);
          const { data: existing } = await supabase
            .from("events")
            .select("slug")
            .eq("slug", newSlug)
            .neq("id", initialEvent.id);
          slug = existing && existing.length > 0 ? `${newSlug}-${Date.now().toString().slice(-5)}` : newSlug;
        }

        const { error: updateError } = await supabase
          .from("events")
          .update({
            title,
            slug,
            description,
            event_date: eventDate,
            cover_image: coverImage?.url ?? null,
            published,
          })
          .eq("id", initialEvent.id);

        if (updateError) throw updateError;
      }

      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while saving.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 rounded-xl2 bg-white p-7 shadow-card">
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">
            Event Title
          </label>
          <input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-maroon"
            placeholder="Annual Sports Day 2026"
          />
          {slugPreview && (
            <p className="mt-1.5 text-xs text-slate">
              URL: /events/<span className="font-medium text-ink">{slugPreview}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-none rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-maroon"
            placeholder="Describe the event in full..."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-ink">
              Event Date
            </label>
            <input
              id="date"
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full rounded-lg border border-ink/15 px-4 py-3 text-sm outline-none focus:border-maroon"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 text-sm font-medium text-ink">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded border-ink/25 accent-maroon"
              />
              Publish on website
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl2 bg-white p-7 shadow-card">
        <MediaUploader
          label="Cover Image"
          hint="Shown on the event card and details page"
          resourceType="image"
          multiple={false}
          items={coverImage ? [coverImage] : []}
          onUpload={handleCoverUpload}
          onRemove={handleCoverRemove}
        />
      </div>

      <div className="rounded-xl2 bg-white p-7 shadow-card">
        <MediaUploader
          label="Photo Gallery"
          hint="Multiple images"
          resourceType="image"
          multiple
          items={images}
          onUpload={handleImageUpload}
          onRemove={handleImageRemove}
        />
      </div>

      <div className="rounded-xl2 bg-white p-7 shadow-card">
        <MediaUploader
          label="Videos"
          hint="Multiple videos"
          resourceType="video"
          multiple
          items={videos}
          onUpload={handleVideoUpload}
          onRemove={handleVideoRemove}
        />
      </div>

      {error && <p className="rounded-lg bg-maroon/8 px-4 py-3 text-sm text-maroon">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-maroon px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving ? "Saving…" : mode === "create" ? "Create Event" : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/events")}
          className="rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink hover:border-maroon/40"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
