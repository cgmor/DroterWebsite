import Image from "next/image";
import { doctor } from "@/content/aps";
import { ButtonLink } from "@/components/site/Button";
import { href, routes, type VersionId } from "@/components/site/links";
import s from "./home.module.css";

/** The PRODUCT.md credit line (an interface label): "Visiting Faculty, L.D. Pankey Institute · Founder, ArrowPath Sleep". The full sentence stays in his bio. */
export const facultyLine = `${doctor.affiliation} · ${doctor.title}`;

/**
 * Dr. Droter on porcelain: a modest framed portrait (at most 360px wide)
 * beside his credit line and his story.
 */
export default function AboutDroter({ v }: { v: VersionId }) {
  return (
    <section className={`sec tone-porcelain ${s.about}`} aria-labelledby="about-title" id="dr-droter">
      <div className={`wrap ${s.aboutWrap}`}>
        <div className={s.aboutMedia}>
          <Image src={doctor.headshot} alt={doctor.headshotAlt} fill sizes="(min-width: 1000px) 400px, 260px" quality={90} className={s.aboutImg} />
        </div>
        <div className={s.aboutCopy}>
          <h2 id="about-title" className="t-h2">
            {doctor.name}
          </h2>
          {facultyLine && <p className={`${s.cred} ${s.aboutCred}`}>{facultyLine}</p>}
          <p className={s.aboutStory}>{doctor.founderStory}</p>
          <blockquote className={s.aboutQuote}>
            <p>{doctor.pullQuote}</p>
          </blockquote>
          <div className={`actions ${s.aboutActions}`}>
            <ButtonLink href={href(v, routes.about)} variant="secondary">
              About {doctor.shortName}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
