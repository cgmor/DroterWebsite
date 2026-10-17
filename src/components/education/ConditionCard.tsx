import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import type { ConditionGuide } from "@/content/tmd";
import s from "./ConditionCard.module.css";

type Props = {
  guide: ConditionGuide;
  href: string;
  /** Heading level of the card title. */
  as?: "h2" | "h3";
  /**
   * The card's foot line. Defaults to the guide's category (drdroter.com).
   * A list (APSleep.com: the appliances for it) is set inline, dot-separated,
   * each name its own item.
   */
  meta?: string | string[];
};

/**
 * One condition guide as a plain card: the clinical name, the patient's words,
 * his one-line summary, and a foot line (the category, or on APSleep.com the
 * appliances for it). The whole card is the link. A guide awaiting his full
 * write-up says so on its own page, not on the card (as on the home page).
 * The card takes the band's surface: white on a mist band, mist on white.
 */
export default function ConditionCard({ guide: g, href, as: H = "h2", meta = g.category }: Props) {
  return (
    <li className={s.card}>
      <H className={s.title}>
        <Link href={href} className={s.link}>
          {g.title}
        </Link>
      </H>
      <p className={s.words}>“{g.plainName}”</p>
      <p className={s.summary}>{g.summary}</p>
      <div className={s.foot}>
        {Array.isArray(meta) ? (
          <ul className={s.metaList}>
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ) : (
          <p>{meta}</p>
        )}
        <ArrowRight size={18} className={s.arrow} />
      </div>
    </li>
  );
}

type GridProps = {
  children: React.ReactNode;
  className?: string;
  /** Columns at full width: 3 (default) or 2 (a short set, e.g. four cards as two even rows). */
  cols?: 2 | 3;
};

/** The even grid the cards sit in: one column, two from 640px, three from 1000px (or two throughout). */
export function ConditionGrid({ children, className, cols = 3 }: GridProps) {
  return <ul className={[s.grid, cols === 2 && s.grid2, className].filter(Boolean).join(" ")}>{children}</ul>;
}
