import type { NextRequest } from "next/server";
import { jsonError, viewerFrom } from "@/lib/dentists/auth";
import { CONTENT_TYPES, extensionOf, FILE_TYPES, PRIVATE_HEADERS } from "@/lib/dentists/config";
import { contentDisposition } from "@/lib/dentists/format";
import { getFile, isListed, openFile } from "@/lib/dentists/store";

/**
 * Streams one shared file. Dentists get files that are visible and not past
 * their last day; everything else is a 404. The admin can open any file.
 * `?download=1` saves instead of opening.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await viewerFrom(req);
  if (!viewer.dentist) return jsonError(401, "Sign in first.");

  const { id } = await params;
  const file = await getFile(id).catch(() => null);
  if (!file || (!viewer.admin && !isListed(file))) return jsonError(404, "Not found.");

  const body = await openFile(file).catch(() => null);
  if (!body) return jsonError(404, "Not found.");

  /* The type comes from our own allow-list by the stored name's extension, never from the upload. */
  const ext = extensionOf(file.key);
  const attachment = req.nextUrl.searchParams.has("download") || !FILE_TYPES[ext]?.inline;

  return new Response(body.stream, {
    headers: {
      ...PRIVATE_HEADERS,
      "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
      "Content-Length": String(body.size),
      "Content-Disposition": contentDisposition(file.fileName, attachment),
    },
  });
}
