"use client";

import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/site/Button";
import { Document } from "@/components/site/icons";
import { ACCEPT_ATTR, CONTENT_TYPES, extensionOf, MAX_FILE_BYTES, type AreaSite } from "@/lib/dentists/config";
import { formatBytes } from "@/lib/dentists/format";
import DateField from "./DateField";
import s from "../dentists.module.css";

type Phase = { kind: "idle" } | { kind: "uploading"; pct: number } | { kind: "saving" } | { kind: "error"; message: string };

function randomName(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** "Pankey-TMD_2026 final.pdf" → "Pankey TMD 2026 final" */
function titleFrom(fileName: string): string {
  return fileName
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

/**
 * Add a file: pick or drop it, give it a title (and a note and a last day if
 * wanted), upload. The browser sends the file straight to the private store,
 * then lists it; the page refreshes to show it.
 */
export default function UploadForm({ v }: { v: AreaSite }) {
  const router = useRouter();
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [until, setUntil] = useState("");
  const [visible, setVisible] = useState(true);
  const [over, setOver] = useState(false);
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const busy = phase.kind === "uploading" || phase.kind === "saving";

  function choose(f: File | null | undefined) {
    if (!f) return;
    const ext = extensionOf(f.name);
    if (!CONTENT_TYPES[ext]) {
      setPhase({ kind: "error", message: "That kind of file can't be shared here. Use a PDF, Word, PowerPoint, JPEG or PNG file." });
      return;
    }
    if (f.size > MAX_FILE_BYTES) {
      setPhase({ kind: "error", message: `That file is ${formatBytes(f.size)}. The limit is ${formatBytes(MAX_FILE_BYTES)}.` });
      return;
    }
    setFile(f);
    setPhase({ kind: "idle" });
    if (!title.trim()) setTitle(titleFrom(f.name));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!file) return setPhase({ kind: "error", message: "Choose a file first." });
    if (!title.trim()) return setPhase({ kind: "error", message: "Give the file a title." });

    const ext = extensionOf(file.name);
    try {
      setPhase({ kind: "uploading", pct: 0 });
      const blob = await upload(`dentist-files/f/${randomName()}.${ext}`, file, {
        access: "private",
        handleUploadUrl: "/api/dentists/admin/upload",
        contentType: CONTENT_TYPES[ext],
        multipart: file.size > 8 * 1024 * 1024,
        onUploadProgress: (p) => setPhase({ kind: "uploading", pct: Math.round(p.percentage) }),
      });
      setPhase({ kind: "saving" });
      const res = await fetch("/api/dentists/admin/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: blob.pathname, fileName: file.name, title, note, availableUntil: until || null, visible }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "The file uploaded but couldn't be listed. Try again.");
      }
      setFile(null);
      setTitle("");
      setNote("");
      setUntil("");
      setVisible(true);
      if (inputRef.current) inputRef.current.value = "";
      setPhase({ kind: "idle" });
      router.replace(`/${v}/dentists/admin?done=added`, { scroll: false });
      router.refresh();
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : "The upload didn't finish. Check the connection and try again.";
      setPhase({ kind: "error", message });
    }
  }

  const pct = phase.kind === "uploading" ? phase.pct : phase.kind === "saving" ? 100 : 0;

  return (
    <form className={s.uploadGrid} onSubmit={submit} noValidate>
      <label
        className={`${s.drop} ${s.span2}`}
        data-over={over || undefined}
        aria-disabled={busy || undefined}
        onDragOver={(e) => {
          e.preventDefault();
          if (!busy) setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          if (!busy) choose(e.dataTransfer.files?.[0]);
        }}
      >
        <Document size={24} className={s.dropIcon} />
        <span className={s.dropTitle}>{file ? file.name : "Choose a file, or drop it here"}</span>
        <span className={s.dropHint}>
          {file
            ? `${formatBytes(file.size)} · Choose another to replace it`
            : `PDF, Word, PowerPoint, JPEG or PNG, up to ${formatBytes(MAX_FILE_BYTES)}`}
        </span>
        <input
          ref={inputRef}
          type="file"
          name="file"
          accept={ACCEPT_ATTR}
          className={s.dropInput}
          disabled={busy}
          onChange={(e) => choose(e.target.files?.[0])}
          aria-label="Choose a file"
        />
      </label>

      <div className={s.field}>
        <label htmlFor={`${uid}-title`} className={s.label}>
          Title
        </label>
        <input
          id={`${uid}-title`}
          className={s.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={140}
          disabled={busy}
          required
        />
      </div>

      <DateField id={`${uid}-until`} value={until} onChange={setUntil} disabled={busy} />

      <div className={`${s.field} ${s.span2}`}>
        <label htmlFor={`${uid}-note`} className={s.label}>
          Note <span className={s.optional}>(optional)</span>
        </label>
        <textarea
          id={`${uid}-note`}
          className={s.input}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={600}
          rows={3}
          disabled={busy}
        />
      </div>

      <div className={`${s.field} ${s.span2}`}>
        <div className={s.submitRow}>
          <label className={s.check}>
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} disabled={busy} />
            Show it to dentists now
          </label>
          <Button type="submit" disabled={busy} icon="none">
            {phase.kind === "uploading" ? `Uploading ${pct}%` : phase.kind === "saving" ? "Adding…" : "Upload"}
          </Button>
        </div>
        {busy && (
          <div className={s.progress} role="status">
            <div className={s.bar}>
              <div className={s.barFill} style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
            <span className="sr-only">{phase.kind === "saving" ? "Adding the file" : `Uploading, ${pct} percent`}</span>
          </div>
        )}
        {phase.kind === "error" && (
          <p className={`${s.message} ${s.error}`} role="alert">
            {phase.message}
          </p>
        )}
      </div>
    </form>
  );
}
