import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryId } from "@/components/education/categories";
import ConditionCard, { ConditionGrid } from "@/components/education/ConditionCard";
import GuideBody from "@/components/education/GuideBody";
import { ArrowLeft } from "@/components/education/icons";
import Disclosure from "@/components/site/Disclosure";
import Figure from "@/components/site/Figure";
import { href, isSite, routes, type SiteId } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import { applianceGuide, doctor } from "@/content/aps";
import { siteConditions } from "@/content/sites";
import { appliancesFor, relatedGuides } from "@/content/solutions";
import { conditionGuides, pendingGuideNote, type ConditionGuide, type Figure as FigureData } from "@/content/tmd";
import NextSteps from "../NextSteps";
import s from "./page.module.css";

type Params = Promise<{ v: string; slug: string }>;

export function generateStaticParams({ params }: { params: { v: string } }) {
  return isSite(params.v) ? siteConditions[params.v].map((slug) => ({ slug })) : [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = conditionGuides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: g.title, description: g.summary };
}

/** The guides a site carries, in its order. */
const siteGuides = (v: SiteId) =>
  siteConditions[v].map((slug) => conditionGuides.find((g) => g.slug === slug)).filter((g): g is ConditionGuide => Boolean(g));

/**
 * The guide as each site shows it. The products chart section ("Are you
 * wearing the correct night guard?") moves into What to do next on APSleep.com
 * and is left off drdroter.com, which carries no ArrowPath products; there the
 * animation stills are also described without the product's name. His text is
 * otherwise untouched.
 */
function guideFor(v: SiteId, g: ConditionGuide): ConditionGuide {
  const plain = (f: FigureData): FigureData =>
    v === "droter" ? { ...f, alt: f.alt.replace("Dr. Droter’s Airway Bite animation", "Dr. Droter’s animation") } : f;
  return {
    ...g,
    hero: g.hero && plain(g.hero),
    full: g.full
      .filter((sec) => sec.heading !== applianceGuide.title)
      .map((sec) => (sec.figure ? { ...sec, figure: plain(sec.figure) } : sec)),
  };
}

export default async function ConditionPage({ params }: { params: Params }) {
  const { v, slug } = await params;
  if (!isSite(v) || !siteConditions[v].includes(slug)) notFound();
  const found = conditionGuides.find((x) => x.slug === slug);
  if (!found) notFound();

  const g = guideFor(v, found);
  const related = relatedGuides(siteGuides(v), g);
  const sleep = v === "apsleep";

  const signs = (
    <section className={s.signs} aria-labelledby="signs-title">
      <h2 className={s.signsTitle} id="signs-title">
        Signs
      </h2>
      <ul className={s.signsList}>
        {g.signs.map((sign) => (
          <li key={sign}>{sign}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <>
      {/* ── The simplified version: everything about the condition in one
            block (title, the patient's words, his summary, the signs), beside
            his slide or illustration when there is one. ───────────────────── */}
      <div className={`wrap ${s.top}`}>
        <Link href={href(v, routes.conditions)} className={s.back}>
          <ArrowLeft size={16} className={s.backIcon} />
          {sleep ? "All sleep problems" : "All conditions"}
        </Link>

        <div className={s.mast} data-hero={g.hero ? true : undefined}>
          <div className={s.mastCopy}>
            <h1 className={`t-h1 ${s.title}`}>{g.title}</h1>
            <p className={s.words}>“{g.plainName}”</p>
            <p className={s.summary}>{g.summary}</p>
            {g.pending && <p className={s.pending}>{pendingGuideNote}</p>}
            {g.hero && signs}
            <div className={s.byline}>
              <Image src={doctor.headshot} alt="" width={1991} height={2416} sizes="44px" quality={90} className={s.bylinePortrait} />
              {/* Two items, not a sentence: his name, and on drdroter.com the
                  category as a link back to it (APSleep.com: his credit line). */}
              <div className={s.bylineText}>
                <span className={s.bylineName}>{doctor.name}</span>
                <span className={s.bylineMeta}>
                  {sleep ? (
                    doctor.title
                  ) : (
                    <Link href={href(v, `${routes.conditions}#${categoryId(g.category)}`)} className={s.bylineCat}>
                      {g.category}
                    </Link>
                  )}
                </span>
              </div>
            </div>
          </div>
          {g.hero ? (
            <div className={s.mastFig}>
              <Figure {...g.hero} sizes="(min-width: 1000px) 600px, 100vw" preload />
            </div>
          ) : (
            signs
          )}
        </div>
      </div>

      {/* ── The complete version, one expand away: a slim control row (the
            title over one quiet line naming its sections, the expand button
            at the right), the write-up opening under it. ───────────────── */}
      <section className={`wrap ${s.fullSec}`} aria-labelledby="full-title">
        <Disclosure
          className={s.dsc}
          summary={
            <div className={s.fullHead}>
              <h2 className={s.fullTitle} id="full-title">
                The complete version
              </h2>
              <ol className={s.fullIndex} aria-label="Sections">
                {g.full.map((sec) => (
                  <li key={sec.heading}>{sec.heading}</li>
                ))}
              </ol>
            </div>
          }
        >
          <GuideBody sections={g.full} as="h3" idPrefix={g.slug} />
        </Disclosure>
      </section>

      {/* ── What to do next: the appliances and the lab (APSleep.com), or
            his step and the practice (drdroter.com). ──────────────────── */}
      <NextSteps v={v} slug={g.slug} />

      {/* ── Related guides from the same site: one even row of the same
            cards as the index, on white so the mist footer stays apart. ── */}
      <Section space="md" labelledBy="related-title">
        <SectionHead
          id="related-title"
          layout="center"
          title={sleep ? "Other sleep problems" : "Related conditions"}
          actions={
            sleep ? undefined : (
              <Link href={href(v, routes.conditions)} className={s.allLink}>
                All conditions
              </Link>
            )
          }
        />
        <ConditionGrid className={s.related}>
          {related.map((r) => (
            <ConditionCard
              key={r.slug}
              guide={r}
              href={href(v, routes.condition(r.slug))}
              as="h3"
              meta={sleep ? appliancesFor(r.slug) : undefined}
            />
          ))}
        </ConditionGrid>
      </Section>
    </>
  );
}
