/** Validation for what the admin types: titles, notes, dates, file names. */
import { ISO_DAY } from "./config";

export const LIMITS = { title: 140, note: 600, fileName: 150 } as const;

const oneLine = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";

export function cleanTitle(v: unknown): string {
  return oneLine(v, LIMITS.title);
}

export function cleanNote(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, LIMITS.note);
  return s || null;
}

/** YYYY-MM-DD within a sane range, or null for "no end date". Anything else is invalid (undefined). */
export function cleanDay(v: unknown): string | null | undefined {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string" || !ISO_DAY.test(v)) return undefined;
  const d = new Date(`${v}T12:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) return undefined;
  const year = d.getUTCFullYear();
  return year >= 2024 && year <= 2100 ? v : undefined;
}

/** The name a download is saved under; always ends in the stored file's extension. */
export function cleanFileName(v: unknown, ext: string): string {
  const base = oneLine(v, 400).split(/[\\/]/).pop() ?? "";
  let name = base.replace(/^\.+/, "").slice(-LIMITS.fileName) || "file";
  const m = /\.([a-z0-9]{2,5})$/i.exec(name);
  if (!m || m[1].toLowerCase() !== ext) name = `${name}.${ext}`;
  return name;
}
