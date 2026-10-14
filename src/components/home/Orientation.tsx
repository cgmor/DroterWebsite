import { airwayBite, brand, doctor } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { href, routes, type VersionId } from "@/components/site/links";
import { Section, SectionHead } from "@/components/site/Section";
import s from "./home.module.css";

/**
 * His apsleep.com/about paragraph, sentence by sentence (verbatim). The first
 * and last say what ArrowPath Sleep is and who it is for; the middle two tell
 * his practice story under the portrait.
 */
export const founder = doctor.founderStory.split(/(?<=\.)\s+/);

/** His 2021 APSleep.com headline, set as a heading (no closing full stop). */
const tagline = brand.tagline.replace(/\.$/, "");

/**
 * His narration on why the jaw goes forward ("…the airway is more open. It
 * gets rid of snoring, can get rid of obstructive sleep apnea."), without the
 * "But" that ties it to the line before. His definition of the job
 * (`airwayBite.purpose`) already leads the "How far" band below.
 */
const forwardLine = airwayBite.airwayStory[1].body.replace(/^But if/, "If");

/**
 * The orientation right after the V1 hero: what ArrowPath Sleep is and who it
 * is for, then three plain ways in: dentists to the Airway Bite, patients to
 * his TMD teaching, everyone to the man. Every sentence is his.
 */
export default function Orientation({ v }: { v: VersionId }) {
  const paths = [
    {
      title: "For dentists",
      line: forwardLine,
      href: href(v, routes.airwayBite),
      cta: `The ${airwayBite.shortName}`,
    },
    {
      title: "For patients",
      line: understanding.intro,
      href: href(v, routes.understanding),
      cta: "Understanding TMD",
    },
    {
      title: doctor.shortName,
      line: doctor.pullQuote,
      href: href(v, routes.about),
      cta: `About ${doctor.shortName}`,
    },
  ];

  return (
    <Section labelledBy="aps-title" id="arrowpath-sleep">
      <SectionHead
        id="aps-title"
        layout="center"
        title={tagline}
        lead={`${founder[0]} ${founder[founder.length - 1]}`}
        className={s.oriHead}
      />
      <ul className={s.paths}>
        {paths.map((p) => (
          <li key={p.title} className={s.path}>
            <h3 className={`t-h3 ${s.pathTitle}`}>{p.title}</h3>
            <p className={s.pathLine}>{p.line}</p>
            <ButtonLink href={p.href} variant="quiet" className={s.pathCta}>
              {p.cta}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
