import { typeLabel } from "@/lib/dentists/config";
import { formatBytes, formatDay, formatInstant } from "@/lib/dentists/format";
import type { DentistFile } from "@/lib/dentists/store";
import s from "./dentists.module.css";

/** The file's facts in one quiet line: (state ·) type · size · added · last day. */
export default function FileMeta({ file, state, expired }: { file: DentistFile; state?: string; expired?: boolean }) {
  const size = formatBytes(file.size);
  return (
    <ul className={s.meta}>
      {state && <li className={s.state}>{state}</li>}
      <li>{typeLabel(file.contentType, file.fileName)}</li>
      {size && <li>{size}</li>}
      <li>Added {formatInstant(file.uploadedAt)}</li>
      {file.availableUntil && (
        <li>
          {expired ? "Ended" : "Available until"} {formatDay(file.availableUntil)}
        </li>
      )}
    </ul>
  );
}

export const fileHref = (id: string, download = false) => `/api/dentists/files/${encodeURIComponent(id)}${download ? "?download=1" : ""}`;
