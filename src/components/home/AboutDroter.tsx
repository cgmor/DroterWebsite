import Image from "next/image";
import { doctor } from "@/content/aps";
import { ButtonLink } from "@/components/site/Button";
import { href, routes, type VersionId } from "@/components/site/links";
import s from "./home.module.css";

/**
 * Dr. Droter on porcelain: the headshot bleeds from the left edge and its grey
 * backdrop dissolves into the field; his story and credit line beside it.
 */
export default function AboutDroter({ v }: { v: VersionId }) {
  return (
    <section className={`sec tone-porcelain ${s.about}`} aria-labelledby="about-title" id="dr-droter">
      <div className={s.aboutMedia}>
        <Image src={doctor.headshot} alt={doctor.headshotAlt} fill sizes="(min-width: 1000px) 48vw, 100vw" className={s.aboutImg} />
      </div>
      <div className={`wrap ${s.aboutWrap}`}>
        <div className={s.aboutCopy}>
          <h2 id="about-title" className="t-h1">
            {doctor.name}
          </h2>
          <p className={`${s.cred} ${s.aboutCred}`}>
            {doctor.affiliation} · {doctor.title}
          </p>
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
