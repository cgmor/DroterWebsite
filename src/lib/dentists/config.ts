/**
 * The dentist sharing area: one walled place, on both sites, where Dr. Droter
 * puts files he shares with other dentists ("I need a place I can just
 * personally go in and put stuff… a PDF file that I can share with other
 * dentists, and I'll choose which ones are in there or not."). One password
 * for dentists, a separate one for him, one shared store.
 *
 * Shared by src/proxy.ts, the route handlers under /api/dentists and the
 * pages under /[v]/dentists. Nothing here touches Node-only APIs, so the proxy
 * can import it on any runtime.
 */

export type Role = "dentist" | "admin";

/** The sites that carry the area (the `v` segment). Kept in step with src/content/sites.ts. */
export const AREA_SITES = ["apsleep", "droter"] as const;
export type AreaSite = (typeof AREA_SITES)[number];

export function isAreaSite(value: unknown): value is AreaSite {
  return typeof value === "string" && (AREA_SITES as readonly string[]).includes(value);
}

export const COOKIE: Record<Role, string> = {
  dentist: "dentist_session",
  admin: "dentist_admin",
};

/** Session lengths in seconds: about a month for dentists, a week for the admin. */
export const SESSION_TTL: Record<Role, number> = {
  dentist: 30 * 24 * 60 * 60,
  admin: 7 * 24 * 60 * 60,
};

/** Sent on every response in the area: pages, redirects, API answers and files. */
export const PRIVATE_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
  "Referrer-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
};

export function withPrivateHeaders<T extends Response>(res: T): T {
  for (const [k, v] of Object.entries(PRIVATE_HEADERS)) res.headers.set(k, v);
  return res;
}

/** Paths inside the area, per site. */
export const areaPath = {
  files: (site: AreaSite) => `/${site}/dentists`,
  signIn: (site: AreaSite) => `/${site}/dentists/sign-in`,
  admin: (site: AreaSite) => `/${site}/dentists/admin`,
  adminSignIn: (site: AreaSite) => `/${site}/dentists/admin/sign-in`,
};

/**
 * A post-sign-in destination is only honoured when it stays inside this
 * site's area (no open redirects).
 */
export function safeNext(value: unknown, site: AreaSite, fallback = areaPath.files(site)): string {
  if (typeof value !== "string" || !value) return fallback;
  const base = areaPath.files(site);
  if (value !== base && !value.startsWith(`${base}/`) && !value.startsWith(`${base}?`)) return fallback;
  if (value.includes("//") || value.includes("\\") || /[\u0000-\u001f]/.test(value)) return fallback;
  return value;
}

/* ── Files ──────────────────────────────────────────────────────────────── */

/** What he can upload: PDFs first, plus Word, PowerPoint and photos. Nothing a browser would run. */
export const FILE_TYPES: Record<string, { label: string; inline: boolean }> = {
  pdf: { label: "PDF", inline: true },
  doc: { label: "Word", inline: false },
  docx: { label: "Word", inline: false },
  ppt: { label: "PowerPoint", inline: false },
  pptx: { label: "PowerPoint", inline: false },
  jpg: { label: "JPEG", inline: true },
  jpeg: { label: "JPEG", inline: true },
  png: { label: "PNG", inline: true },
};

export const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export const ACCEPT_ATTR = Object.keys(CONTENT_TYPES)
  .map((e) => `.${e}`)
  .concat([...new Set(Object.values(CONTENT_TYPES))])
  .join(",");

/** A lecture deck can be large (the Pankey deck was 29 MB). */
export const MAX_FILE_BYTES = 500 * 1024 * 1024;

export function extensionOf(name: string): string {
  const m = /\.([a-z0-9]{2,5})$/i.exec(name.trim());
  return m ? m[1].toLowerCase() : "";
}

export function typeLabel(contentType: string, fileName = ""): string {
  const ext = extensionOf(fileName);
  if (FILE_TYPES[ext]) return FILE_TYPES[ext].label;
  const hit = Object.entries(CONTENT_TYPES).find(([, t]) => t === contentType);
  return hit ? FILE_TYPES[hit[0]].label : "File";
}

/** Blob pathnames: a random name under one prefix, so no URL can be guessed. */
export const BLOB_PREFIX = "dentist-files/";
export const BLOB_MANIFEST = `${BLOB_PREFIX}manifest.json`;
export const BLOB_UPLOAD_PATTERN = /^dentist-files\/f\/[A-Za-z0-9_-]{16,64}\.(pdf|docx?|pptx?|jpe?g|png)$/;
/** After Blob adds its random suffix. */
export const BLOB_STORED_PATTERN = /^dentist-files\/f\/[A-Za-z0-9_-]{16,64}(-[A-Za-z0-9]{6,40})?\.(pdf|docx?|pptx?|jpe?g|png)$/;

/** Dates are his: Bowie, Maryland. */
export const AREA_TIME_ZONE = "America/New_York";

/** Today as YYYY-MM-DD in his time zone. */
export function todayInArea(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: AREA_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
