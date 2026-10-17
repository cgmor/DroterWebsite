import Link from "next/link";
import { library, type LibraryItem } from "@/content/aps";
import { literature } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight, ArrowUpRight } from "@/components/site/icons";
import { href, routes, type SiteId } from "@/components/site/links";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

type Row = { key: string; title: string; line: string; meta: string; href: string; external: boolean };

/**
 * What each site lists, with no lecture slides and no patient downloads:
 *  - drdroter.com: the medical literature from his drdroter.com pages, each
 *    described in his own link text or citation;
 *  - APSleep.com: the Airway Bite's documents for dentists (the printable
 *    instructions, and the tutorial on the Airway Bite page). Nothing hosted
 *    on drdroter.com, so the two sites do not link to each other.
 */
function rowsFor(v: SiteId): Row[] {
  if (v === "droter") {
    return literature
      .filter((r): r is typeof r & { href: string } => Boolean(r.href))
      .map((r) => ({
        key: r.title,
        title: r.title,
        line: r.description,
        meta: r.meta ?? "",
        href: r.href,
        external: true,
      }));
  }
  return (library.dentists as LibraryItem[])
    .filter((r): r is LibraryItem & { href: string } => Boolean(r.href))
    .map((r) => {
      const video = r.kind === "Video";
      return {
        key: r.title,
        title: r.title,
        line: r.description,
        meta: [r.meta, r.format].filter(Boolean).join(" · "),
        href: video ? href(v, `${routes.airwayBite}#tutorial`) : r.href,
        external: !video,
      };
    });
}

function Rows({ items }: { items: Row[] }) {
  return (
    <ul className={s.libRows}>
      {items.map((r) => {
        const Arrow = r.external ? ArrowUpRight : ArrowRight;
        return (
          <li key={r.key} className={s.libRow}>
            <span>
              {r.external ? (
                <a href={r.href} target="_blank" rel="noopener" className={`${s.rowLink} ${s.libTitle}`}>
                  {r.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <Link href={r.href} className={`${s.rowLink} ${s.libTitle}`}>
                  {r.title}
                </Link>
              )}
              {r.line && <span className={s.libDesc}>{r.line}</span>}
            </span>
            <span className={s.libMeta}>{r.meta}</span>
            <Arrow size={20} className={s.rowArrow} />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * A short index for the home compositions: "Medical Literature" (his own page
 * heading) on drdroter.com, "For dentists" on APSleep.com, with a way to the
 * full page. Renders nothing when there is nothing to list. `featured` is kept
 * for older compositions and no longer changes the layout (it used to lead with
 * a lecture slide).
 */
export default function Library({
  v,
  title,
  tone = "white",
}: {
  v: SiteId;
  title?: string;
  tone?: Tone;
  featured?: boolean;
}) {
  const items = rowsFor(v);
  if (items.length === 0) return null;
  const droter = v === "droter";
  return (
    <Section tone={tone} labelledBy="lib-title" id="library">
      <SectionHead
        id="lib-title"
        title={title ?? (droter ? "Medical Literature" : "For dentists")}
        layout="center"
        actions={
          <ButtonLink href={href(v, droter ? `${routes.library}#literature` : routes.library)} variant="quiet">
            {droter ? "All resources" : "More for dentists"}
          </ButtonLink>
        }
      />
      <Reveal>
        <Rows items={items} />
      </Reveal>
    </Section>
  );
}
