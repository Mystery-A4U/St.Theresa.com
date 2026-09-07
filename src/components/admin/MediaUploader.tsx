"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type UploadedItem = {
  key: string; // local key (media row id if persisted, else temp id)
  url: string;
  caption?: string | null;
};

export default function MediaUploader({
  label,
  hint,
  resourceType,
  multiple,
  items,
  onUpload,
  onRemove,
}: {
  label: string;
  hint?: string;
  resourceType: "image" | "video";
  multiple: boolean;
  items: UploadedItem[];
  /** Called per selected file; parent uploads directly to Cloudinary and persists to Supabase if needed. */
  onUpload: (file: File) => Promise<void>;
  /** Called when the user removes an existing item. */
  onRemove: (item: UploadedItem) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [removingKey, setRemovingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(fileList)) {
        await onUpload(file);
      }
    } catch (err) {
      console.error(err);
      setError("One or more uploads failed. Please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove(item: UploadedItem) {
    setRemovingKey(item.key);
    try {
      await onRemove(item);
    } catch (err) {
      console.error(err);
      setError("Could not remove this file. Please try again.");
    } finally {
      setRemovingKey(null);
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label className="text-sm font-medium text-ink">{label}</label>
        {hint && <span className="text-xs text-slate">{hint}</span>}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl2 border-2 border-dashed border-ink/15 bg-mist px-6 py-8 text-center transition-colors hover:border-maroon/40"
      >
        <input
          ref={inputRef}
          type="file"
          accept={resourceType === "video" ? "video/*" : "image/*"}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-sm font-medium text-ink">
          {busy ? "Uploading…" : `Click to upload ${resourceType}${multiple ? "s" : ""}`}
        </p>
        <p className="mt-1 text-xs text-slate">
          {resourceType === "video" ? "MP4, MOV — up to 100MB" : "JPG, PNG, WEBP — up to 10MB"}
        </p>
      </div>

      {error && <p className="mt-2 text-xs text-maroon">{error}</p>}

      {items.length > 0 && (
        <div className={`mt-4 grid gap-3 ${resourceType === "video" ? "sm:grid-cols-2" : "grid-cols-3 sm:grid-cols-4"}`}>
          {items.map((item) => (
            <div key={item.key} className="group relative overflow-hidden rounded-lg border border-ink/10 bg-white">
              {resourceType === "video" ? (
                <video src={item.url} className="aspect-video w-full bg-black object-cover" muted />
              ) : (
                <div className="relative aspect-square w-full">
                  <Image src={item.url} alt="Uploaded media" fill className="object-cover" />
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                disabled={removingKey === item.key}
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-60"
                aria-label="Remove"
              >
                {removingKey === item.key ? "…" : "✕"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
