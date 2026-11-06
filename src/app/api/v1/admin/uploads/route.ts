import { createHash } from "node:crypto";
import { requireUser } from "@/server/auth";
import { ApiError, assertSameOrigin, handle, ok } from "@/server/api";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const POST = handle(async (request) => {
  assertSameOrigin(request);
  await requireUser();

  const {
    CLOUDINARY_CLOUD_NAME: cloud,
    CLOUDINARY_API_KEY: key,
    CLOUDINARY_API_SECRET: secret,
  } = process.env;
  if (!cloud || !key || !secret) {
    throw new ApiError(503, "UPLOADS_NOT_CONFIGURED", "Image uploads aren't set up yet.");
  }

  const file = (await request.formData()).get("file");
  if (!(file instanceof File) || !ALLOWED_TYPES.includes(file.type) || file.size > MAX_BYTES) {
    throw new ApiError(400, "VALIDATION_ERROR", "Upload a JPEG, PNG or WebP image up to 8 MB.");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const folder = "mybhubaneswar";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${secret}`)
    .digest("hex");

  const form = new FormData();
  form.set("file", file);
  form.set("api_key", key);
  form.set("timestamp", timestamp);
  form.set("folder", folder);
  form.set("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new ApiError(502, "UPLOAD_FAILED", "The image couldn't be uploaded.");

  const { secure_url: src, width, height } = await response.json();
  return ok({ src, width, height }, undefined, 201);
});
