import type { ReactNode } from "react";

export type SpecRow = {
  label: string;
  value: ReactNode;
  /** Set the value in Geist Mono: measurements, timecodes, spec values only. */
  mono?: boolean;
  /** A quieter second line under the value. */
  note?: ReactNode;
  /** Extra content under the value (a scale, a link). */
  extra?: ReactNode;
};

/** Hairline definition list: label left, value right; stacks under 520px. */
export default function SpecRows({ rows, className }: { rows: SpecRow[]; className?: string }) {
  return (
    <dl className={["spec", className].filter(Boolean).join(" ")}>
      {rows.map((r) => (
        <div className="spec-row" key={r.label}>
          <dt>{r.label}</dt>
          <dd>
            <span className={r.mono ? "spec-val mono" : "spec-val"}>{r.value}</span>
            {r.note && <span className="spec-note">{r.note}</span>}
            {r.extra}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type SpecStripItem = { value: string; label: string };

/** A row of millimetre specs (value in mono over a short label), e.g. across the bottom of a hero. */
export function SpecStrip({ items, className }: { items: SpecStripItem[]; className?: string }) {
  return (
    <dl className={["strip", className].filter(Boolean).join(" ")}>
      {items.map((it) => (
        <div className="strip-item" key={it.label}>
          <dt className="strip-label">{it.label}</dt>
          <dd className="strip-val mono">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
