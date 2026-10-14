import Link from "next/link";
import type { ReactNode } from "react";
import { education } from "@/content/aps";
import { conditionGuides, type ConditionGuide } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight } from "@/components/site/icons";
import ImageCard from "@/components/site/ImageCard";
import { href, routes, type VersionId } from "@/components/site/links";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

/** Plain name and clinical name on the left, the one-line summary on the right. The whole row links. */
export function ConditionRows({ v, guides = conditionGuides }: { v: VersionId; guides?: ConditionGuide[] }) {
  return (
    <ul className={s.rows}>
      {guides.map((g) => (
        <li key={g.slug} className={s.row}>
          <span>
            <Link href={href(v, routes.condition(g.slug))} className={`${s.rowLink} ${s.rowName}`}>
              {g.plainName}
            </Link>
            <span className={s.rowTitle}>{g.title}</span>
          </span>
          <span className={s.rowSummary}>{g.summary}</span>
          <ArrowRight size={20} className={s.rowArrow} />
        </li>
      ))}
    </ul>
  );
}

/** V2: the conditions as the patient would say them, in two columns. */
export function ConditionIndex({ v }: { v: VersionId }) {
  return (
    <ul className={s.index}>
      {conditionGuides.map((g) => (
        <li key={g.slug} className={s.indexItem}>
          <Link href={href(v, routes.condition(g.slug))} className={`${s.rowLink} ${s.indexName}`}>
            {g.plainName}
          </Link>
          <span className={s.rowTitle}>{g.title}</span>
          <ArrowRight size={20} className={s.rowArrow} />
        </li>
      ))}
    </ul>
  );
}

/** V3: the guides that carry one of his slides as image cards (two wide over three), the rest as rows. */
export function ConditionGallery({ v }: { v: VersionId }) {
  const withSlide = conditionGuides.filter((g) => g.hero);
  const rest = conditionGuides.filter((g) => !g.hero);
  return (
    <>
      <ul className={s.gallery}>
        {withSlide.map((g, i) => (
          <li key={g.slug} className={i < 2 ? s.galleryWide : s.galleryItem}>
            <ImageCard
              href={href(v, routes.condition(g.slug))}
              image={{ src: g.hero!.src, alt: g.hero!.alt }}
              title={g.plainName}
              line={g.title}
              meta={g.category}
              ratio="16/10"
              fit="contain"
              field="white"
              sizes={i < 2 ? "(min-width: 1000px) 640px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1000px) 420px, (min-width: 640px) 50vw, 100vw"}
            />
          </li>
        ))}
      </ul>
      <div className={s.galleryMore}>
        <h3 className="t-h3">More guides</h3>
        <ConditionRows v={v} guides={rest} />
      </div>
    </>
  );
}

/** The conditions section frame shared by all three homes; the list form varies by version. */
export function ConditionsSection({
  v,
  tone = "mist",
  children,
  after,
}: {
  v: VersionId;
  tone?: Tone;
  children: ReactNode;
  after?: ReactNode;
}) {
  return (
    <Section tone={tone} labelledBy="cond-title" id="conditions">
      <SectionHead
        id="cond-title"
        title={education.conditionsHeading}
        lead={education.conditionsIntro}
        layout="split"
        actions={
          <ButtonLink href={href(v, routes.conditions)} variant="quiet">
            All conditions
          </ButtonLink>
        }
      />
      <Reveal>{children}</Reveal>
      {after}
    </Section>
  );
}
