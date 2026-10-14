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
import { href, isVersion, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section, SectionHead } from "@/components/site/Section";
import { doctor, education } from "@/content/aps";
import { conditionGuides, pendingGuideNote } from "@/content/tmd";
import s from "./page.module.css";

type Params = Promise<{ v: string; slug: string }>;

export function generateStaticParams() {
  return conditionGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const g = conditionGuides.find((x) => x.slug === slug);
  if (!g) return {};
  return { title: g.title, description: g.summary };
}

/** Three related guides (one even row): the same category first, then the next guides in list order. */
function relatedTo(slug: string, category: string) {
  const others = conditionGuides.filter((x) => x.slug !== slug);
  const same = others.filter((x) => x.category === category);
  const at = conditionGuides.findIndex((x) => x.slug === slug);
  const after = [...conditionGuides.slice(at + 1), ...conditionGuides.slice(0, at)].filter((x) => x.category !== category);
  return [...same, ...after].slice(0, 3);
}

export default async function ConditionPage({ params }: { params: Params }) {
  const { v, slug } = await params;
  if (!isVersion(v)) notFound();
  const g = conditionGuides.find((x) => x.slug === slug);
  if (!g) notFound();

  const related = relatedTo(g.slug, g.category);

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
          All conditions
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
              {/* Two items, not a sentence: his name, and the category as a link back to it. */}
              <div className={s.bylineText}>
                <span className={s.bylineName}>{doctor.name}</span>
                <span className={s.bylineMeta}>
                  <Link href={href(v, `${routes.conditions}#${categoryId(g.category)}`)} className={s.bylineCat}>
                    {g.category}
                  </Link>
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

      {/* ── The complete version, one expand away ─────────────────────── */}
      <section className={`wrap ${s.fullSec}`} aria-labelledby="full-title">
        <Disclosure
          className={s.dsc}
          summary={
            <div className={s.fullHead}>
              <h2 className={`t-h2 ${s.fullTitle}`} id="full-title">
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

      {/* ── Related guides: one even row of the same cards as /conditions ── */}
      <Section tone="mist" space="md" labelledBy="related-title">
        <SectionHead
          id="related-title"
          layout="center"
          title="Related conditions"
          actions={
            <Link href={href(v, routes.conditions)} className={s.allLink}>
              All conditions
            </Link>
          }
        />
        <ConditionGrid>
          {related.map((r) => (
            <ConditionCard key={r.slug} guide={r} href={href(v, routes.condition(r.slug))} as="h3" />
          ))}
        </ConditionGrid>
      </Section>

      {/* ── Close ─────────────────────────────────────────────────────── */}
      <Section space="md" labelledBy="practice-title">
        <p className={s.patientsLine}>{education.patientsLine}</p>
        <PracticePanel />
      </Section>
    </>
  );
}
