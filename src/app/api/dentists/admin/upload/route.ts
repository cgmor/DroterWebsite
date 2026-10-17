import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin, jsonError, viewerFrom } from "@/lib/dentists/auth";
import { BLOB_UPLOAD_PATTERN, CONTENT_TYPES, MAX_FILE_BYTES, PRIVATE_HEADERS } from "@/lib/dentists/config";
import { canUpload } from "@/lib/dentists/store";

/**
 * Issues a short-lived client token so the admin's browser uploads straight
 * to the private Blob store (a function can't take a 29 MB body). The token
 * only allows our random pathname pattern, our file types and our size cap.
 * The file is listed afterwards by POST /api/dentists/admin/files.
 */
export async function POST(req: NextRequest) {
  const viewer = await viewerFrom(req);
  if (!viewer.admin) return jsonError(401, "Sign in first.");
  if (!isSameOrigin(req)) return jsonError(403, "Refused.");
  if (!canUpload()) return jsonError(503, "File storage is not connected.");

  const body = (await req.json().catch(() => null)) as HandleUploadBody | null;
  if (!body || body.type !== "blob.generate-client-token") return jsonError(400, "Bad request.");

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!BLOB_UPLOAD_PATTERN.test(pathname)) throw new Error("Unexpected file name.");
        return {
          allowedContentTypes: [...new Set(Object.values(CONTENT_TYPES))],
          maximumSizeInBytes: MAX_FILE_BYTES,
          addRandomSuffix: true,
          allowOverwrite: false,
          validUntil: Date.now() + 30 * 60 * 1000,
        };
      },
    });
    return NextResponse.json(result, { headers: PRIVATE_HEADERS });
  } catch (err) {
    return jsonError(400, err instanceof Error ? err.message : "Upload refused.");
  }
}
