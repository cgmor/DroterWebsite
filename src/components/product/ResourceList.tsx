import type { Resource } from "@/content/tmd";
import { ArrowUpRight } from "@/components/site/icons";
import s from "./product.module.css";

/**
 * Lectures and literature as a hairline list: title, one line, source and
 * format, each row one link (external PDFs open in a new tab).
 */
export default function ResourceList({ items, className }: { items: Resource[]; className?: string }) {
  return (
    <ul className={[s.res, className].filter(Boolean).join(" ")}>
      {items.map((r) => (
        <li key={r.title} className={s.resItem}>
          {r.href ? (
            <a href={r.href} target="_blank" rel="noopener" className={s.resLink}>
              <span className={s.resMain}>
                <span className={s.resTitle}>{r.title}</span>
                <span className={s.resDesc}>{r.description}</span>
              </span>
              {r.meta && <span className={s.resMeta}>{r.meta}</span>}
              <ArrowUpRight size={20} className={s.resArrow} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <div className={s.resLink}>
              <span className={s.resMain}>
                <span className={s.resTitle}>{r.title}</span>
                <span className={s.resDesc}>{r.description}</span>
              </span>
              {r.meta && <span className={s.resMeta}>{r.meta}</span>}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
