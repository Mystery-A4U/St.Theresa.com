import type { EventMedia } from "@/lib/types";

export default function EventVideos({ videos }: { videos: EventMedia[] }) {
  if (videos.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {videos.map((video) => (
        <div key={video.id} className="overflow-hidden rounded-xl2 bg-ink shadow-card">
          <video
            src={video.media_url}
            controls
            preload="metadata"
            playsInline
            className="aspect-video w-full bg-black"
          >
            Your browser does not support embedded video.
          </video>
          {video.caption && (
            <p className="px-4 py-3 text-sm text-white/80">{video.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
