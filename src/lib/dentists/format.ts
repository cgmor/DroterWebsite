import { AREA_TIME_ZONE, ISO_DAY } from "./config";

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  const mb = bytes / (1024 * 1024);
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

const dayFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const instantFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: AREA_TIME_ZONE });

/** "2026-10-23" → "Oct 23, 2026". */
export function formatDay(day: string): string {
  if (!ISO_DAY.test(day)) return day;
  return dayFormat.format(new Date(`${day}T12:00:00Z`));
}

/** An ISO timestamp as a date in his time zone. */
export function formatInstant(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : instantFormat.format(d);
}

/** A Content-Disposition value that survives any file name. */
export function contentDisposition(fileName: string, attachment: boolean): string {
  const safe = fileName.replace(/[\r\n"\\]/g, "").trim() || "file";
  const ascii = safe.replace(/[^\x20-\x7e]/g, "_");
  return `${attachment ? "attachment" : "inline"}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
}
