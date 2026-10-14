import Image from "next/image";
import { doctor } from "@/content/aps";
import { ButtonLink } from "@/components/site/Button";
import { href, routes, type VersionId } from "@/components/site/links";
import { Section, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

/** The PRODUCT.md credit line (an interface label): "Visiting Faculty, L.D. Pankey Institute · Founder, ArrowPath Sleep". The full sentence stays in his bio. */
export const facultyLine = `${doctor.affiliation} · ${doctor.title}`;

/** "He lectures nationally and is honored to be included in the Dentistry Today’s Top Clinicians…" (his bio, verbatim). */
const lectures = doctor.teaching[doctor.teaching.length - 1];

/**
 * Dr. Droter: a modest framed portrait (at most 340px wide) beside his credit
 * line, his story and the order of his training, set as a ruled credentials
 * strip (fragments of his bio, verbatim). `story` lets V1 show only the part
 * of his apsleep.com paragraph its orientation band has not already told.
 */
export default function AboutDroter({
  v,
  story = doctor.founderStory,
  tone = "mist",
}: {
  v: VersionId;
  story?: string;
  tone?: Tone;
}) {
  return (
    <Section tone={tone} labelledBy="about-title" id="dr-droter">
      <div className={s.aboutWrap}>
        <div className={s.aboutMedia}>
          <Image src={doctor.headshot} alt={doctor.headshotAlt} fill sizes="(min-width: 1000px) 340px, 240px" quality={90} className={s.aboutImg} />
        </div>
        <div className={s.aboutCopy}>
          <h2 id="about-title" className="t-h2">
            {doctor.name}
          </h2>
          {facultyLine && <p className={`${s.cred} ${s.aboutCred}`}>{facultyLine}</p>}
          <p className={s.aboutStory}>{story}</p>
          <p className={s.aboutNote}>{lectures}</p>
          <div className={`actions ${s.aboutActions}`}>
            <ButtonLink href={href(v, routes.about)} variant="secondary">
              About {doctor.shortName}
            </ButtonLink>
          </div>
        </div>
      </div>
      <dl className={s.creds} aria-label="Training">
        {doctor.training.map((t) => (
          <div key={t.place} className={s.credItem}>
            <dt className={s.credPlace}>{t.place}</dt>
            <dd className={s.credDetail}>{t.detail}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
