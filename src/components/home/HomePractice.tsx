import Image from "next/image";
import Link from "next/link";
import { doctor, education } from "@/content/aps";
import { practiceNine, sitePages } from "@/content/sites";
import { conditionGuides, understanding, type ConditionGuide } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { ArrowRight } from "@/components/site/icons";
import { href, routes, type SiteId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead } from "@/components/site/Section";
import { Figured } from "./Education";
import h from "./home.module.css";
import s from "./practice-home.module.css";

/*
 * drdroter.com, his practice: TMD and facial pain, for patients searching for
 * pain. In the order he described on the Oct 14 call: something about him,
 * a sort (patients | dentists), the common conditions, TMD in brief, then the
 * new-patient information. Every sentence is his; the interface adds only
 * labels. No Airway Bite, no ArrowPath Sleep, no links to the other site.
 *
 *   porcelain · white · mist · white (+ mist panel) · footer mist
 */

const def = understanding.definition;

/** His conditions intro (drdroter.com/jaw-joint-damage), sentence by sentence. */
const conditionsIntro = education.conditionsIntro.split(/(?<=\.)\s+/);

/** The nine from the old site, in its order (sites.ts), as his condition guides. */
const nine = practiceNine
  .map((slug) => conditionGuides.find((g) => g.slug === slug))
  .filter((g): g is ConditionGuide => Boolean(g));

/** His 2005 Dentistry Today article, to clinicians: its closing sentence on "TMJ" and "TMD". (Sentences may end inside a quotation: …“knee.”) */
const toClinicians = def.paragraphs[2].split(/(?<=[.!?][”"]?)\s+/).pop() ?? "";

/** To patients: the sentence that opens his closing word to them on drdroter.com/facial-pain ("Different Beliefs"). */
const toPatients = understanding.pain.beliefs.paragraphs.at(-1)?.split(/(?<=[.!?])\s+/)[0] ?? "";

/**
 * "TMDs- What are the choices? (190 Diagnoses, 7 Categories)": the image he
 * published on drdroter.com/facial-pain (Web-Images-23.7 017) directly under
 * his "190+ different causes" paragraph. The slide shows its own title, so it
 * carries no caption; the alt is that title.
 */
const choicesSlide = {
  ...understanding.approaches.figures[0],
  alt: "TMDs- What are the choices? (190 Diagnoses, 7 Categories)",
};

/**
 * His credit, in his words: "He is a visiting faculty member at the LD Pankey
 * Institute in Florida." (drdroter.com/about-dr-droter), set as a byline.
 */
const facultyLine = (() => {
  const m = doctor.bio[2].match(/^He is an? (visiting faculty member at [^.]+)\./);
  return m ? m[1][0].toUpperCase() + m[1].slice(1) : doctor.affiliation;
})();

/** The library page's own name on this site ("Resources" on drdroter.com). */
const libraryLabel = (v: SiteId) => sitePages[v].find((p) => p.slug === "library")?.label ?? "Library";

/**
 * TMD in brief, as his own figured sentences: the 190+ causes
 * (drdroter.com/jaw-joint-damage) and what the numbers show
 * (drdroter.com/about-tmd), each figure emphasised where it stands.
 */
const tmdFigures = [
  { value: "190+", label: conditionsIntro[0] },
  understanding.evidence.items[0],
  understanding.evidence.items[1],
];

export default function HomePractice({ v }: { v: SiteId }) {
  return (
    <>
      <PracticeOpening v={v} />
      <PracticeSort v={v} />
      <PracticeNine v={v} />
      <PracticeTmd v={v} />
      <Section space="md" flush="top" id="new-patients">
        <PracticePanel portrait={false} />
      </Section>
    </>
  );
}

/**
 * Something about him: a modest framed portrait (at most 380px wide) beside
 * his thesis as the h1, his "knee" line under it, and his name and
 * faculty line signing both.
 */
function PracticeOpening({ v }: { v: SiteId }) {
  return (
    <section className={`tone-porcelain ${s.hero}`} id="top" aria-labelledby="top-title">
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.portrait}>
          <Image
            src={doctor.headshot}
            alt={doctor.headshotAlt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1000px) 380px, 220px"
            quality={90}
            className={s.portraitImg}
          />
        </div>
        <div className={s.copy}>
          <h1 id="top-title" className={`t-display ${s.title}`}>
            {doctor.pullQuote}
          </h1>
          <p className={s.lead}>{understanding.thesis.line}</p>
          <div className={s.byline}>
            <p className={s.name}>{doctor.name}</p>
            <p className={s.cred}>{facultyLine}</p>
          </div>
          <div className={`actions ${s.heroActions}`}>
            <ButtonLink href={href(v, routes.about)} variant="secondary">
              About {doctor.shortName}
            </ButtonLink>
            <ButtonLink href="#new-patients" variant="quiet" icon="down">
              New Patient Information
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The quick sort he asked for ("we need to sort patients and doctors"):
 * patients to the conditions, Understanding TMD and the patient resources;
 * dentists straight to the medical literature (the library's #literature).
 * His heading and sentence open it; each way in carries a line of his.
 */
function PracticeSort({ v }: { v: SiteId }) {
  const doors = [
    {
      title: "For patients",
      line: toPatients,
      links: [
        { label: "Find your condition", to: href(v, routes.conditions) },
        { label: "Understanding TMD", to: href(v, routes.understanding) },
        { label: libraryLabel(v), to: href(v, routes.library) },
      ],
    },
    {
      title: "For dentists",
      line: toClinicians,
      links: [{ label: "Medical literature", to: href(v, `${routes.library}#literature`) }],
    },
  ];

  return (
    <Section labelledBy="sort-title" id="start">
      <SectionHead id="sort-title" title={understanding.title} lead={understanding.intro} layout="center" />
      <ul className={s.doors}>
        {doors.map((d) => (
          <li key={d.title} className={s.door}>
            <h3 className={`t-h3 ${s.doorTitle}`}>{d.title}</h3>
            <p className={s.doorLine}>{d.line}</p>
            <ul className={`actions ${s.doorActions}`}>
              {d.links.map((l) => (
                <li key={l.label}>
                  <ButtonLink href={l.to} variant="quiet">
                    {l.label}
                  </ButtonLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * The nine common conditions from the old site, as an even 3 × 3 grid of
 * plain cards: his heading for the condition and his one-line summary, the
 * whole card a link. The index link follows the grid.
 */
function PracticeNine({ v }: { v: SiteId }) {
  return (
    <Section tone="mist" labelledBy="cond-title" id="conditions">
      <SectionHead id="cond-title" title="Common conditions" lead={conditionsIntro.slice(1).join(" ")} layout="center" />
      <Reveal>
        <ul className={`${h.cards} ${s.nine}`}>
          {nine.map((g) => (
            <li key={g.slug} className={h.card}>
              <h3 className={h.cardTitle}>
                <Link href={href(v, routes.condition(g.slug))} className={`${h.rowLink} ${h.cardLink}`}>
                  {g.title}
                </Link>
              </h3>
              <p className={h.cardLine}>{g.summary}</p>
              <ArrowRight size={18} className={h.cardArrow} />
            </li>
          ))}
        </ul>
      </Reveal>
      <div className={s.after}>
        <ButtonLink href={href(v, routes.conditions)} variant="secondary">
          All conditions
        </ButtonLink>
      </div>
    </Section>
  );
}

/**
 * TMD in brief: his heading "TMD is not one disease" and his definition open
 * it; his figured sentences (190+, 70%, 86%) sit beside the "190 Diagnoses,
 * 7 Categories" image from his facial-pain page, with the way on to
 * Understanding TMD.
 */
function PracticeTmd({ v }: { v: SiteId }) {
  return (
    <Section labelledBy="tmd-title" id="tmd">
      <SectionHead id="tmd-title" title={def.heading} lead={def.paragraphs[1]} layout="center" />
      <div className={s.tmdBody}>
        <div className={s.tmdFacts}>
          <div className={s.figured}>
            {tmdFigures.map((f) => (
              <p key={f.label}>
                <Figured value={f.value} label={f.label} className={`num ${s.figure}`} />
              </p>
            ))}
          </div>
          <div className={s.tmdLink}>
            <ButtonLink href={href(v, routes.understanding)} variant="quiet">
              Understanding TMD
            </ButtonLink>
          </div>
        </div>
        <Figure {...choicesSlide} caption={undefined} sizes="(min-width: 1000px) 600px, 100vw" />
      </div>
    </Section>
  );
}
