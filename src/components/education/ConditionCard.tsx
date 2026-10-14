import Link from "next/link";
import { ArrowRight } from "@/components/site/icons";
import { pendingGuideNote, type ConditionGuide } from "@/content/tmd";
import s from "./ConditionCard.module.css";

type Props = {
  guide: ConditionGuide;
  href: string;
  /** Heading level of the card title. */
  as?: "h2" | "h3";
};

/**
 * One condition guide as a plain white card: the clinical name, the patient's
 * words, his one-line summary, and the category as its foot. The whole card is
 * the link. Used in even grids on a mist band (/conditions, related guides).
 */
export default function ConditionCard({ guide: g, href, as: H = "h2" }: Props) {
  return (
    <li className={s.card}>
      <H className={s.title}>
        <Link href={href} className={s.link}>
          {g.title}
        </Link>
      </H>
      <p className={s.words}>“{g.plainName}”</p>
      <p className={s.summary}>{g.summary}</p>
      {g.pending && <p className={s.note}>{pendingGuideNote}</p>}
      <p className={s.foot}>
        <span>{g.category}</span>
        <ArrowRight size={18} className={s.arrow} />
      </p>
    </li>
  );
}

/** The even grid the cards sit in: one column, two from 640px, three from 1000px. */
export function ConditionGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={[s.grid, className].filter(Boolean).join(" ")}>{children}</ul>;
}

export const cardStyles = s;
