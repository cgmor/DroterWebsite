import { NextResponse, type NextRequest } from "next/server";
import { isSameOrigin, jsonError, viewerFrom } from "@/lib/dentists/auth";
import { BLOB_STORED_PATTERN, extensionOf, PRIVATE_HEADERS } from "@/lib/dentists/config";
import { cleanDay, cleanFileName, cleanNote, cleanTitle } from "@/lib/dentists/fields";
import { addFile, canUpload } from "@/lib/dentists/store";

/**
 * Lists a file the admin's browser has just uploaded to Blob:
 * { key, fileName, title, note?, availableUntil?, visible }.
 */
export async function POST(req: NextRequest) {
  const viewer = await viewerFrom(req);
  if (!viewer.admin) return jsonError(401, "Sign in first.");
  if (!isSameOrigin(req)) return jsonError(403, "Refused.");
  if (!canUpload()) return jsonError(503, "File storage is not connected.");

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return jsonError(400, "Bad request.");

  const key = typeof body.key === "string" ? body.key : "";
  if (!BLOB_STORED_PATTERN.test(key)) return jsonError(400, "Unexpected file.");
  const title = cleanTitle(body.title);
  if (!title) return jsonError(400, "Give the file a title.");
  const availableUntil = cleanDay(body.availableUntil);
  if (availableUntil === undefined) return jsonError(400, "That date isn't valid.");

  try {
    const file = await addFile({
      key,
      title,
      note: cleanNote(body.note),
      fileName: cleanFileName(body.fileName, extensionOf(key)),
      availableUntil,
      visible: body.visible !== false,
    });
    return NextResponse.json({ ok: true, id: file.id }, { headers: PRIVATE_HEADERS });
  } catch (err) {
    return jsonError(400, err instanceof Error ? err.message : "Could not add the file.");
  }
}
