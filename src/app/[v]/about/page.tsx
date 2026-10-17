import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import ResourceList from "@/components/product/ResourceList";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { href, isSite, siteHas, routes, type SiteId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Prose, Section, SectionHead } from "@/components/site/Section";
import { brand, doctor } from "@/content/aps";
import { sitePages } from "@/content/sites";
import { literature, understanding, type Resource } from "@/content/tmd";
import s from "./page.module.css";

/*
 * /[v]/about, one page per site, both in his own words:
 *   drdroter.com  Dr. Droter and his practice: his drdroter.com biography
 *                 (which carries his training and teaching), the facts, his
 *                 beliefs on facial pain, the medical literature, new-patient
 *                 information.
 *   APSleep.com   ArrowPath Sleep: his apsleep.com/about paragraph ("In 2021
 *                 he formed ArrowPath Sleep…"), then Dr. Droter's biography
 *                 (and the medical literature, once hosted here). The facial-
 *                 pain figures stay on the pain-focused site.
 * No lecture slides, and no links between the two sites.
 */

/** Sentences; never broken after a title or an initial ("Dr. Droter", "L.D. Pankey"). */
const sentences = (text: string) => text.split(/(?<!\b(?:Dr|Mr|Mrs|Ms|St|[A-Z])\.)(?<=[.!?][”"]?)\s+/);

/** Descriptions are his own sentences (drdroter.com/about-dr-droter; apsleep.com/about). */
export async function generateMetadata({ params }: { params: Promise<{ v: string }> }): Promise<Metadata> {
  const { v } = await params;
  if (!isSite(v)) return {};
  return v === "droter"
    ? { title: `About ${doctor.shortName}`, description: sentences(doctor.bio[1])[0] }
    : { title: "About", description: sentences(doctor.founderStory).at(-1) };
}

/** "John R. Droter, DDS": the name holds together; it may break only before the degree. */
const [nameMain, degree] = doctor.name.split(", ");
const nameNoBreak = nameMain.replace(/ /g, " ");

/**
 * His credit, in his words: "He is a visiting faculty member at the LD Pankey
 * Institute in Florida." (drdroter.com/about-dr-droter), set under his name.
 */
const facultyLine = (() => {
  const m = sentences(doctor.bio[2])[0].match(/^He is an? (visiting faculty member at .+)\.$/);
  return m ? m[1][0].toUpperCase() + m[1].slice(1) : doctor.affiliation;
})();

/** The facts as one typeset passage: each label is his whole sentence; its figure is set in place, by weight. */
const facts = doctor.facts.map((f) => {
  const at = f.label.indexOf(f.value);
  return at < 0
    ? { key: f.label, before: f.label, value: "", after: "" }
    : { key: f.label, before: f.label.slice(0, at), value: f.value, after: f.label.slice(at + f.value.length) };
});

const beliefs = understanding.pain.beliefs;

export default async function AboutPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isSite(v) || !siteHas(v, "about")) notFound();
  /* His own article; the rest of the literature is on the site's library page. */
  const items = literature.filter((r) => r.own && onSite(v, r.href));

  if (v === "droter") {
    /* white · mist · white (· white, ruled) · white (+ mist panel) · footer
       mist. His biography above already gives his training and teaching in
       his own words, so they are not repeated as lists. */
    return (
      <>
        <DoctorOpening />
        <Facts />
        <Beliefs />
        {items.length > 0 && <Literature v={v} items={items} ruled />}
        <Section space="md" flush={items.length > 0 ? "top" : undefined} as="div">
          <PracticePanel portrait={false} />
        </Section>
      </>
    );
  }

  /* white · white, ruled (· white, ruled) · footer mist. The facts are his
     facial-pain practice's (questionnaires, causes of TMD, therapies), so
     they stay on drdroter.com; the sites are kept "somewhat separate". */
  return (
    <>
      <CompanyOpening />
      <Biography />
      {items.length > 0 && <Literature v={v} items={items} ruled />}
    </>
  );
}

/**
 * No links between the two sites (Cole, Oct 15): a document hosted on the
 * other site's domain is left out until it is hosted here; an empty section
 * is not shown.
 */
const OTHER_SITE: Record<SiteId, RegExp> = {
  droter: /(^|\.|\/\/)apsleep\.com/i,
  apsleep: /(^|\.|\/\/)drdroter\.com/i,
};
const onSite = (v: SiteId, url?: string) => !url || !OTHER_SITE[v].test(url);

/** A modest framed portrait: never wider than 380px. */
function Portrait() {
  return (
    <div className={s.portrait}>
      <Image
        src={doctor.headshot}
        alt={doctor.headshotAlt}
        width={1991}
        height={2416}
        sizes="(min-width: 640px) 380px, 260px"
        quality={90}
        loading="eager"
        fetchPriority="high"
        className={s.portraitImg}
      />
    </div>
  );
}

/** drdroter.com: his name and his biography (drdroter.com/about-dr-droter, verbatim), beside the portrait. */
function DoctorOpening() {
  return (
    <section className={s.open} aria-labelledby="about-title">
      <div className={`wrap ${s.openGrid}`}>
        <div className={s.portraitCol}>
          <Portrait />
        </div>
        <div className={s.openCopy}>
          <h1 className={s.name} id="about-title">
            {nameNoBreak}, <span className={s.degree}>{degree}</span>
          </h1>
          <Prose className={s.openBio}>
            {doctor.bio.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </Prose>
        </div>
      </div>
    </section>
  );
}

/** APSleep.com: his apsleep.com/about page as it was, a portrait and his paragraph, under the company's name. */
function CompanyOpening() {
  return (
    <section className={s.open} aria-labelledby="about-title">
      <div className={`wrap ${s.openGrid}`}>
        <div className={s.portraitCol}>
          <Portrait />
        </div>
        <div className={s.openCopy}>
          <h1 className={s.name} id="about-title">
            {brand.name}
          </h1>
          <p className={s.story}>{doctor.founderStory}</p>
          <div className={s.signature}>
            <p className={s.sigName}>{doctor.name}</p>
            <p className={s.cred}>{facultyLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** APSleep.com: his drdroter.com biography under its own title, in one reading column, continuing the white opening under a hairline. */
function Biography() {
  return (
    <Section labelledBy="bio-title" flush="top">
      <div className={s.ruled}>
        <SectionHead id="bio-title" title={`About ${doctor.shortName}`} layout="center" />
        <Prose className={s.bioCol}>
          {doctor.bio.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </Prose>
      </div>
    </Section>
  );
}

/** One passage; each number sits in its sentence at the passage's size, as on the home. */
function Facts() {
  return (
    <Section tone="mist" space="md" as="div">
      <p className={s.facts}>
        {facts.map((f, i) => (
          <Fragment key={f.key}>
            {i > 0 && " "}
            {f.before}
            {f.value && <span className={s.factVal}>{f.value}</span>}
            {f.after}
          </Fragment>
        ))}
      </p>
    </Section>
  );
}

/**
 * drdroter.com: his "Different Beliefs" (drdroter.com/facial-pain). The
 * sentence he set in bold opens it as the key line under the heading; the
 * three-types image from the same page follows, then his text in one reading
 * column, signed. Nothing sits in a side column.
 */
function Beliefs() {
  return (
    <Section labelledBy="approach-title">
      <SectionHead id="approach-title" title={beliefs.heading} lead={beliefs.emphasis} layout="center" />
      <div className={s.approach}>
        {/* The image speaks for itself (its alt names it); no caption. */}
        <Figure
          {...understanding.pain.figure}
          caption={undefined}
          className={s.approachFig}
          sizes="(min-width: 680px) 600px, 100vw"
        />
        <figure className={s.ownWords}>
          <blockquote>
            {beliefs.paragraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </blockquote>
          <figcaption className={s.ownWordsBy}>{doctor.name}</figcaption>
        </figure>
      </div>
    </Section>
  );
}

/** His own article from his drdroter.com "Medical Literature", then the way to the rest on the site's library page. */
function Literature({ v, items, ruled }: { v: SiteId; items: Resource[]; ruled?: boolean }) {
  const libraryLabel = sitePages[v].find((p) => p.slug === "library")?.label ?? "Library";
  return (
    <Section labelledBy="lit-title" flush={ruled ? "top" : undefined}>
      <div className={ruled ? s.ruled : undefined}>
        <SectionHead id="lit-title" title="Medical Literature" layout="center" />
        <div className={s.litCol}>
          <ResourceList items={items} />
          <div className={s.litMore}>
            <ButtonLink href={href(v, routes.library)} variant="quiet">
              {libraryLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
