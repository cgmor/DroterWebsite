/**
 * The shared files: one list for both sites.
 *
 * With BLOB_READ_WRITE_TOKEN set, files live in a private Vercel Blob store
 * under random pathnames, and a manifest (dentist-files/manifest.json, also
 * private) holds each file's title, note, dates and visibility. Files are only
 * ever streamed through /api/dentists/files/[id], so no storage URL reaches a
 * browser.
 *
 * Without Blob, the list falls back to the read-only folder
 * private/dentist-files/ (outside public/, traced into the server bundle by
 * next.config.ts) with its own manifest.json.
 *
 * Server only.
 */
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { BlobPreconditionFailedError, del, get, head, put } from "@vercel/blob";
import { BLOB_MANIFEST, ISO_DAY, todayInArea } from "./config";

export type DentistFile = {
  id: string;
  title: string;
  note: string | null;
  /** The name a download is saved under. */
  fileName: string;
  contentType: string;
  size: number;
  /** ISO timestamp. */
  uploadedAt: string;
  /** Last day it is offered (YYYY-MM-DD, his time zone), or null for no end. */
  availableUntil: string | null;
  visible: boolean;
  /** Blob pathname, or the file name inside private/dentist-files/. */
  key: string;
};

type Manifest = { version: 1; files: DentistFile[] };

export type StorageMode = "blob" | "local";

export function storageMode(): StorageMode {
  return process.env.BLOB_READ_WRITE_TOKEN ? "blob" : "local";
}

export const canUpload = () => storageMode() === "blob";

const LOCAL_DIR = path.join(process.cwd(), "private", "dentist-files");

/* ── Reading ────────────────────────────────────────────────────────────── */

function clean(m: unknown): Manifest {
  const files = Array.isArray((m as Manifest | null)?.files) ? (m as Manifest).files : [];
  return {
    version: 1,
    files: files.filter(
      (f): f is DentistFile =>
        !!f && typeof f.id === "string" && typeof f.title === "string" && typeof f.key === "string" && typeof f.fileName === "string",
    ),
  };
}

async function readBlobManifest(): Promise<{ manifest: Manifest; etag: string | null }> {
  const res = await get(BLOB_MANIFEST, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200) return { manifest: { version: 1, files: [] }, etag: null };
  const text = await new Response(res.stream).text();
  return { manifest: clean(JSON.parse(text)), etag: res.blob.etag };
}

async function readLocalManifest(): Promise<Manifest> {
  try {
    return clean(JSON.parse(await readFile(path.join(LOCAL_DIR, "manifest.json"), "utf8")));
  } catch {
    return { version: 1, files: [] };
  }
}

/** Every file, newest first, whatever its state. */
export async function listFiles(): Promise<DentistFile[]> {
  const { files } = storageMode() === "blob" ? (await readBlobManifest()).manifest : await readLocalManifest();
  return [...files].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function getFile(id: string): Promise<DentistFile | null> {
  if (!/^[A-Za-z0-9_-]{6,40}$/.test(id)) return null;
  return (await listFiles()).find((f) => f.id === id) ?? null;
}

export function isExpired(f: Pick<DentistFile, "availableUntil">, today = todayInArea()): boolean {
  return !!f.availableUntil && ISO_DAY.test(f.availableUntil) && today > f.availableUntil;
}

/** What dentists see: visible and not past its last day. */
export function isListed(f: DentistFile, today = todayInArea()): boolean {
  return f.visible && !isExpired(f, today);
}

/** The file's bytes as a web stream. */
export async function openFile(f: DentistFile): Promise<{ stream: ReadableStream<Uint8Array>; size: number } | null> {
  if (storageMode() === "blob") {
    const res = await get(f.key, { access: "private" });
    if (!res || res.statusCode !== 200) return null;
    return { stream: res.stream, size: res.blob.size };
  }
  const name = path.basename(f.key);
  if (name !== f.key || name.startsWith(".") || name === "manifest.json") return null;
  const full = path.join(LOCAL_DIR, name);
  try {
    const s = await stat(full);
    if (!s.isFile()) return null;
    return { stream: Readable.toWeb(createReadStream(full)) as ReadableStream<Uint8Array>, size: s.size };
  } catch {
    return null;
  }
}

/* ── Writing (Blob only) ────────────────────────────────────────────────── */

export class ReadOnlyStoreError extends Error {
  constructor() {
    super("File storage is not connected.");
  }
}

/** Read, change, write back, retrying if someone else wrote in between. */
async function mutate<T>(change: (files: DentistFile[]) => T): Promise<T> {
  if (storageMode() !== "blob") throw new ReadOnlyStoreError();
  for (let attempt = 0; ; attempt++) {
    const { manifest, etag } = await readBlobManifest();
    const result = change(manifest.files);
    try {
      await put(BLOB_MANIFEST, JSON.stringify(manifest, null, 2), {
        access: "private",
        contentType: "application/json",
        allowOverwrite: etag !== null,
        addRandomSuffix: false,
        cacheControlMaxAge: 60,
        ...(etag ? { ifMatch: etag } : {}),
      });
      return result;
    } catch (err) {
      if (attempt < 3 && (err instanceof BlobPreconditionFailedError || /already exists/i.test(String(err)))) continue;
      throw err;
    }
  }
}

function newId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(9));
  return Buffer.from(bytes).toString("base64url");
}

export type NewFile = Pick<DentistFile, "title" | "note" | "fileName" | "availableUntil" | "visible" | "key">;

/** Records a file that was uploaded to Blob, after checking it is really there. */
export async function addFile(input: NewFile): Promise<DentistFile> {
  if (storageMode() !== "blob") throw new ReadOnlyStoreError();
  const meta = await head(input.key);
  const file: DentistFile = {
    id: newId(),
    title: input.title,
    note: input.note,
    fileName: input.fileName,
    contentType: meta.contentType,
    size: meta.size,
    uploadedAt: new Date().toISOString(),
    availableUntil: input.availableUntil,
    visible: input.visible,
    key: input.key,
  };
  await mutate((files) => {
    if (files.some((f) => f.key === file.key)) throw new Error("That file is already listed.");
    files.push(file);
  });
  return file;
}

export type FilePatch = Partial<Pick<DentistFile, "title" | "note" | "availableUntil" | "visible">>;

export async function updateFile(id: string, patch: FilePatch): Promise<DentistFile | null> {
  return mutate((files) => {
    const f = files.find((x) => x.id === id);
    if (!f) return null;
    Object.assign(f, patch);
    return { ...f };
  });
}

/** Takes it off the list, then deletes the stored bytes. */
export async function removeFile(id: string): Promise<boolean> {
  const removed = await mutate((files) => {
    const i = files.findIndex((x) => x.id === id);
    return i === -1 ? null : files.splice(i, 1)[0];
  });
  if (!removed) return false;
  await del(removed.key).catch(() => {});
  return true;
}
