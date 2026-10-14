"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { Clock, Lock } from "./icons";
import s from "./education.module.css";

export type Audience = "dentists" | "patients" | "both";

export type LibraryEntry = {
  key: string;
  title: string;
  description: string;
  kind: string;
  format: string;
  meta?: string;
  /** Resolved link. Omitted when the item is not published. */
  href?: string;
  /** Opens in a new tab (documents and other sites). */
  external?: boolean;
  status: "available" | "coming-soon" | "dentists-only";
  audience: Audience;
};

export type LibraryGroup = {
  id: string;
  title: string;
  lead?: ReactNode;
  /** A figure or note set beside the group heading. */
  aside?: ReactNode;
  entries: LibraryEntry[];
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "dentists", label: "Dentists" },
  { id: "patients", label: "Patients" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const shows = (f: FilterId, a: Audience) => f === "all" || a === "both" || a === f;

const STATUS = {
  "coming-soon": { label: "Coming soon", Icon: Clock },
  "dentists-only": { label: "Dentists only", Icon: Lock },
} as const;

/**
 * The library as ruled rows, grouped, with an audience filter. Unpublished
 * items read as a quiet state ("Coming soon", "Dentists only"), never a link.
 */
export default function LibraryIndex({ groups }: { groups: LibraryGroup[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const total = groups.reduce((n, g) => n + g.entries.length, 0);
  const visible = groups.map((g) => ({ ...g, rows: g.entries.filter((e) => shows(filter, e.audience)) }));
  const shown = visible.reduce((n, g) => n + g.rows.length, 0);

  return (
    <div className={s.lib}>
      <div className={s.libBar}>
        <div className="seg" role="group" aria-label="Show resources for">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className="seg-opt" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <p className={s.libCount} aria-live="polite">
          {filter === "all" ? `${total} resources` : `${shown} of ${total} resources, for ${filter}`}
        </p>
      </div>

      {visible.map((g) =>
        g.rows.length === 0 ? null : (
          <section key={g.id} className={s.libGroup} aria-labelledby={`${g.id}-title`} id={g.id}>
            <header className={s.libHead}>
              <div className={s.libHeadCopy}>
                <h2 className={`t-h2 ${s.libTitle}`} id={`${g.id}-title`}>
                  {g.title}
                </h2>
                {g.lead && <p className={s.libLead}>{g.lead}</p>}
              </div>
              {g.aside && <div className={s.libAside}>{g.aside}</div>}
            </header>

            <ul className={s.rows}>
              {g.rows.map((e) => (
                <Row key={e.key} e={e} />
              ))}
            </ul>
          </section>
        ),
      )}
    </div>
  );
}

function Row({ e }: { e: LibraryEntry }) {
  const live = e.status === "available" && !!e.href;
  const state = e.status !== "available" ? STATUS[e.status] : null;
  const Arrow = e.external ? ArrowUpRight : ArrowRight;

  let title: ReactNode = e.title;
  if (live && e.href) {
    title = e.external ? (
      <a href={e.href} target="_blank" rel="noopener" className={s.rowLink}>
        {e.title}
        <span className="sr-only"> ({e.format}, opens in a new tab)</span>
      </a>
    ) : (
      <Link href={e.href} className={s.rowLink}>
        {e.title}
      </Link>
    );
  }

  return (
    <li className={s.row} data-live={live || undefined}>
      <span className={s.rowKind}>{e.kind}</span>
      <div className={s.rowMain}>
        <h3 className={s.rowTitle}>{title}</h3>
        {e.description && <p className={s.rowDesc}>{e.description}</p>}
        {state && (
          <p className={s.rowState}>
            <state.Icon size={16} />
            {state.label}
          </p>
        )}
      </div>
      <span className={s.rowMeta}>{e.meta}</span>
      <span className={s.rowFormat}>{e.format === e.kind ? "" : e.format}</span>
      <span className={s.rowIcon} aria-hidden="true">
        {live ? <Arrow size={18} /> : null}
      </span>
    </li>
  );
}
