export type EventMedia = {
  id: string;
  event_id: string;
  media_url: string;
  media_type: "image" | "video";
  caption: string | null;
  created_at: string;
};

export type SchoolEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_date: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  event_media?: EventMedia[];
};
