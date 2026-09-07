import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deleteFromCloudinary, publicIdFromUrl } from "@/lib/cloudinary";

export const runtime = "nodejs";

/**
 * POST /api/media/delete
 * Body: { mediaUrl: string, mediaType: "image" | "video" }
 *
 * Deletes the asset from Cloudinary. The caller (admin UI) is responsible
 * for removing the corresponding Supabase row afterwards, which is safe
 * client-side because Row Level Security only permits authenticated users
 * to delete — the same check enforced here.
 */
export async function POST(request: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { mediaUrl, mediaType } = (await request.json()) as {
    mediaUrl: string;
    mediaType: "image" | "video";
  };

  const publicId = publicIdFromUrl(mediaUrl);
  if (!publicId) {
    return NextResponse.json({ error: "Could not resolve Cloudinary asset" }, { status: 400 });
  }

  try {
    await deleteFromCloudinary(publicId, mediaType === "video" ? "video" : "image");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
