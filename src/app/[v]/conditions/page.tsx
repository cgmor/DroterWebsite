import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryId, guidesByCategory } from "@/components/education/categories";
import ConditionCard, { ConditionGrid } from "@/components/education/ConditionCard";
import { ButtonLink } from "@/components/site/Button";
import { ArrowRight } from "@/components/site/icons";
import { href, isSite, siteHas, routes, type SiteId } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import { applianceGuide, doctor, education } from "@/content/aps";
import { siteConditions, sitePages } from "@/content/sites";
import { appliancesFor } from "@/content/solutions";
import { conditionGuides, understanding, type ConditionGuide } from "@/content/tmd";
import NextSteps from "./NextSteps";
import s from "./page.module.css";

type Params = Promise<{ v: string }>;

/** The index title is the site's own nav label for it ("Sleep problems" on APSleep.com). */
const SLEEP_TITLE = sitePages.apsleep.find((p) => p.slug === "conditions")?.label ?? "Sleep problems";
/**
 * The opening line: his 2021 apsleep.com heading for his products chart. Each
 * card below answers it for one problem (its foot names the appliances). The
 * site's tagline is not repeated here: it is the home's h1 and the footer's.
 */
const SLEEP_LEAD = applianceGuide.title;

/** His apsleep.com/about sentence naming the four problems, for search results. */
const SLEEP_DESCRIPTION =
  doctor.founderStory.split(/(?<=\.)\s+/).find((x) => x.startsWith("Common problems")) ?? doctor.founderStory;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { v } = await params;
  return v === "apsleep"
    ? { title: SLEEP_TITLE, description: SLEEP_DESCRIPTION }
    : { title: education.conditionsHeading, description: education.conditionsIntro };
}

/** The guides a site carries, in its order. */
const siteGuides = (v: SiteId) =>
  siteConditions[v].map((slug) => conditionGuides.find((g) => g.slug === slug)).filter((g): g is ConditionGuide => Boolean(g));

export default async function ConditionsPage({ params }: { params: Params }) {
  const { v } = await params;
  if (!isSite(v) || !siteHas(v, "conditions")) notFound();
  return v === "apsleep" ? <SleepProblems v={v} /> : <CommonConditions v={v} />;
}

/* ── APSleep.com: the four sleep problems, each card naming its appliances ── */

function SleepProblems({ v }: { v: SiteId }) {
  const guides = siteGuides(v);
  return (
    <>
      <Section tone="mist" space="md" labelledBy="conditions-title">
        <SectionHead as="h1" id="conditions-title" layout="center" className={s.head} title={SLEEP_TITLE} lead={SLEEP_LEAD} />
        <ConditionGrid cols={2}>
          {guides.map((g) => (
            <ConditionCard key={g.slug} guide={g} href={href(v, routes.condition(g.slug))} meta={appliancesFor(g.slug)} />
          ))}
        </ConditionGrid>
      </Section>

      <NextSteps v={v} tone="white" />
    </>
  );
}

/* ── drdroter.com: the nine, then more conditions, then his categories ──── */

function CommonConditions({ v }: { v: SiteId }) {
  const guides = siteGuides(v);
  const understandingLabel = sitePages[v].find((p) => p.slug === "understanding-tmd")?.label ?? "Understanding TMD";
  /** The old site's nine first ("On my practice site, yes"), then the rest. */
  const nine = guides.slice(0, 9);
  const more = guides.slice(9);
  const onSite = new Set(guides.map((g) => g.slug));
  const groups = guidesByCategory()
    .map((c) => ({ ...c, guides: c.guides.filter((g) => onSite.has(g.slug)) }))
    .filter((c) => c.guides.length > 0);

  return (
    <>
      {/* ── One mist band: a centred opening, the nine as an even grid, then
            the further conditions under their own centred head. ─────────── */}
      <Section tone="mist" space="md" labelledBy="conditions-title">
        <SectionHead
          as="h1"
          id="conditions-title"
          layout="center"
          className={s.head}
          title={education.conditionsHeading}
          lead={education.conditionsIntro}
        />
        <ConditionGrid>
          {nine.map((g) => (
            <ConditionCard key={g.slug} guide={g} href={href(v, routes.condition(g.slug))} />
          ))}
        </ConditionGrid>

        {more.length > 0 && (
          <section className={s.moreGroup} aria-labelledby="more-title">
            <SectionHead id="more-title" layout="center" className={s.head} title="More conditions" lead={understanding.intro} />
            {/* An even count as two even rows (four: 2 + 2), so no card is
                left alone in a row; an odd count keeps the three-up grid. */}
            <ConditionGrid cols={more.length % 2 === 0 ? 2 : 3}>
              {more.map((g) => (
                <ConditionCard key={g.slug} guide={g} href={href(v, routes.condition(g.slug))} as="h3" />
              ))}
            </ConditionGrid>
            {/* The way into his explanation of TMD, as a quiet link under the
                grid (the home's "All conditions"), not a card among the conditions. */}
            {siteHas(v, "understanding-tmd") && (
              <div className={s.after}>
                <ButtonLink href={href(v, routes.understanding)} variant="secondary">
                  {understandingLabel}
                </ButtonLink>
              </div>
            )}
          </section>
        )}
      </Section>

      {/* ── His classification, as a compact ruled index (the anchors that
            /understanding-tmd and each guide's byline link to). ──────────── */}
      <Section space="md" labelledBy="categories-title">
        <SectionHead
          id="categories-title"
          layout="center"
          className={s.head}
          title="By category"
          lead={understanding.definition.paragraphs[1]}
        />
        <ol className={s.cats}>
          {groups.map((c) => (
            <li key={c.name} id={categoryId(c.name)} className={s.cat}>
              <h3 className={s.catName}>{c.name}</h3>
              <ul className={s.catGuides}>
                {c.guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={href(v, routes.condition(g.slug))} className={s.catLink}>
                      {g.title}
                      <ArrowRight size={16} className={s.catArrow} />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── Close: his practice. White, so the mist footer stays apart; it
            continues the white band above, so one padding between them. ── */}
      <NextSteps v={v} tone="white" flush="top" />
    </>
  );
}
