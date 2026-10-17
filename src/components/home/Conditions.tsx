import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { education } from "@/content/aps";
import { conditionGuides, type ConditionGuide } from "@/content/tmd";
import { ArrowRight } from "@/components/site/icons";
import ImageCard from "@/components/site/ImageCard";
import { href, routes, type SiteId } from "@/components/site/links";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

/** The guides written in his own words (drdroter.com and his osteoarthritis document). */
const ownWords = (g: ConditionGuide) => g.source !== "TMJ Brochure 2026";

/** His conditions intro (drdroter.com/jaw-joint-damage), from its second sentence: why the conditions differ. */
const conditionsLead = education.conditionsIntro.split(/(?<=\.)\s+/).slice(1).join(" ");

/** Cells left in the last row of an n-item grid of `cols` columns (a full row when it divides evenly). */
const rest = (n: number, cols: number) => cols - (n % cols);

/**
 * Every condition guide, in the order /conditions lists them, as plain cards
 * on the band: his heading for the condition, his one-line summary, the whole
 * card a link. The last cell links to the index and fills out the final row
 * at every column count, so no row is left ragged.
 */
export function ConditionCards({ v, guides = conditionGuides }: { v: SiteId; guides?: ConditionGuide[] }) {
  const n = guides.length;
  const fill = { "--rest-2": rest(n, 2), "--rest-3": rest(n, 3) } as CSSProperties;
  return (
    <ul className={s.cards} style={fill}>
      {guides.map((g) => (
        <li key={g.slug} className={s.card}>
          <h3 className={s.cardTitle}>
            <Link href={href(v, routes.condition(g.slug))} className={`${s.rowLink} ${s.cardLink}`}>
              {g.title}
            </Link>
          </h3>
          <p className={s.cardLine}>{g.summary}</p>
          <ArrowRight size={18} className={s.cardArrow} />
        </li>
      ))}
      <li className={`${s.card} ${s.cardMore}`}>
        <h3 className={s.cardTitle}>
          <Link href={href(v, routes.conditions)} className={`${s.rowLink} ${s.cardLink}`}>
            All conditions
            <ArrowRight size={18} className={s.cardMoreArrow} />
          </Link>
        </h3>
        <p className={s.cardMoreLine}>{education.patientsLine}</p>
      </li>
    </ul>
  );
}

/**
 * V3: the guides that carry one of his slides as image cards, then every
 * other guide as a plain card. Two wide over three when there are five; the
 * wide pair absorbs any remainder so each row is full.
 */
export function ConditionGallery({ v }: { v: SiteId }) {
  const withSlide = conditionGuides.filter((g) => g.hero && ownWords(g));
  const others = conditionGuides.filter((g) => !withSlide.includes(g));
  const m = withSlide.length % 3;
  const wide = m === 2 ? 2 : m === 1 && withSlide.length >= 4 ? 4 : m === 1 ? 1 : 0;
  return (
    <>
      <ul className={s.gallery}>
        {withSlide.map((g, i) => {
          const isWide = i < wide;
          const solo = isWide && wide === 1;
          return (
            <li key={g.slug} className={solo ? s.gallerySolo : isWide ? s.galleryWide : s.galleryItem}>
              <ImageCard
                href={href(v, routes.condition(g.slug))}
                image={{ src: g.hero!.src, alt: g.hero!.alt }}
                title={g.title}
                line={g.summary}
                ratio="16/10"
                fit="contain"
                field="white"
                sizes={isWide ? "(min-width: 1000px) 640px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1000px) 420px, (min-width: 640px) 50vw, 100vw"}
              />
            </li>
          );
        })}
      </ul>
      <div className={s.galleryMore}>
        <ConditionCards v={v} guides={others} />
      </div>
    </>
  );
}

/**
 * The conditions section frame shared by all three homes: a centred opening,
 * then the cards (or V3's gallery). The last card links to the index.
 */
export function ConditionsSection({ tone = "mist", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <Section tone={tone} labelledBy="cond-title" id="conditions">
      <SectionHead id="cond-title" title="Common conditions" lead={conditionsLead} layout="center" />
      <Reveal>{children}</Reveal>
    </Section>
  );
}
