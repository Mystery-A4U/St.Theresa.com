import { v2 as cloudinary } from "cloudinary";

/**
 * Server-only Cloudinary configuration.
 * CLOUDINARY_API_SECRET must never be imported into a Client Component —
 * this module is only ever used from Route Handlers / Server Actions.
 */
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  resource_type: string;
};

/**
 * Uploads a base64/data-URI or remote buffer to Cloudinary
 * under the school's media folder structure.
 */
export async function uploadToCloudinary(
  fileDataUri: string,
  opts: { folder: string; resourceType: "image" | "video" }
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(fileDataUri, {
    folder: opts.folder,
    resource_type: opts.resourceType,
  });
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type,
  };
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" = "image"
) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/** Extracts the Cloudinary public_id from a secure_url, including folder path. */
export function publicIdFromUrl(url: string): string | null {
  try {
    const afterUpload = url.split("/upload/")[1];
    if (!afterUpload) return null;
    const withoutVersion = afterUpload.replace(/^v\d+\//, "");
    const withoutExt = withoutVersion.replace(/\.[a-zA-Z0-9]+$/, "");
    return withoutExt;
  } catch {
    return null;
  }
}
