import type { NextRequest } from "next/server";
import { isSameOrigin, seeOther, viewerFrom } from "@/lib/dentists/auth";
import { areaPath, isAreaSite, type AreaSite } from "@/lib/dentists/config";
import { cleanDay, cleanNote, cleanTitle } from "@/lib/dentists/fields";
import { removeFile, updateFile, type FilePatch } from "@/lib/dentists/store";

/**
 * The admin list's buttons (plain forms): intent = show | hide | update | delete.
 * Goes back to the admin page with what happened.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const form = await req.formData().catch(() => null);
  const siteField = form?.get("site");
  const site: AreaSite = isAreaSite(siteField) ? siteField : "apsleep";
  const back = (q: Record<string, string>) => seeOther(req, `${areaPath.admin(site)}?${new URLSearchParams(q)}`);

  const viewer = await viewerFrom(req);
  if (!viewer.admin) return seeOther(req, areaPath.adminSignIn(site));
  if (!isSameOrigin(req)) return back({ error: "expired" });

  const { id } = await params;
  const intent = String(form?.get("intent") ?? "");

  try {
    if (intent === "delete") {
      return back((await removeFile(id)) ? { done: "deleted" } : { error: "missing" });
    }

    let patch: FilePatch;
    if (intent === "show" || intent === "hide") {
      patch = { visible: intent === "show" };
    } else if (intent === "update") {
      const title = cleanTitle(form?.get("title"));
      const availableUntil = cleanDay(form?.get("availableUntil"));
      if (!title) return back({ error: "title", edit: id });
      if (availableUntil === undefined) return back({ error: "date", edit: id });
      patch = { title, note: cleanNote(form?.get("note")), availableUntil };
    } else {
      return back({ error: "unknown" });
    }

    const updated = await updateFile(id, patch);
    if (!updated) return back({ error: "missing" });
    return back({ done: intent === "update" ? "saved" : intent === "show" ? "shown" : "hidden" });
  } catch {
    return back({ error: "storage" });
  }
}
