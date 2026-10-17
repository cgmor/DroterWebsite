import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import s from "./library.module.css";

type Props = {
  title: string;
  /** One line (his words where there are any). */
  line: string;
  /** The foot: a short label set against the arrow. */
  foot: string;
  href: string;
  /** Documents (PDF) and other sites open in a new tab. */
  external?: boolean;
  as?: "h2" | "h3";
};

/**
 * A plain white card in an even grid (the same family as the condition cards):
 * title, one line, and a foot with a label and the arrow. The whole card is
 * the link.
 */
export default function ResourceCard({ title, line, foot, href, external = false, as: H = "h2" }: Props) {
  const Arrow = external ? ArrowUpRight : ArrowRight;
  return (
    <li className={s.card}>
      <H className={s.cardTitle}>
        {external ? (
          <a href={href} target="_blank" rel="noopener" className={s.cardLink} aria-label={`${title} (opens in a new tab)`}>
            {title}
          </a>
        ) : (
          <Link href={href} className={s.cardLink}>
            {title}
          </Link>
        )}
      </H>
      <p className={s.cardLine}>{line}</p>
      <p className={s.cardFoot}>
        <span>{foot}</span>
        <Arrow size={18} className={s.cardArrow} />
      </p>
    </li>
  );
}

/** The even grid the cards sit in: one column, two from 640px, three from 1000px (`cols={2}` stays at two). */
export function ResourceGrid({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 }) {
  return <ul className={[s.cards, cols === 3 ? s.cards3 : s.cards2].join(" ")}>{children}</ul>;
}
