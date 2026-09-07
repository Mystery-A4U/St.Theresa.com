"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { EventMedia } from "@/lib/types";

export default function EventGallery({ images }: { images: EventMedia[] }) {
  const [index, setIndex] = useState(-1);

  if (images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl2 shadow-card"
            aria-label={`Open image ${i + 1} in lightbox`}
          >
            <Image
              src={img.media_url}
              alt={img.caption ?? "Event photo"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((img) => ({
          src: img.media_url,
          alt: img.caption ?? "Event photo",
          title: img.caption ?? undefined,
        }))}
      />
    </div>
  );
}
