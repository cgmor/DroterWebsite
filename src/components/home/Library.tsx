import { lectures, literature, understanding, type Resource } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowUpRight } from "@/components/site/icons";
import ImageCard from "@/components/site/ImageCard";
import { href, routes, type VersionId } from "@/components/site/links";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

const ITEMS: Resource[] = [...lectures, ...literature];
/** "Different diagnoses have different therapies", a slide from the Pankey course. */
const lectureSlide = understanding.approaches.figures[2];

function Rows({ items }: { items: Resource[] }) {
  return (
    <ul className={s.libRows}>
      {items.map((r) => (
        <li key={r.title} className={s.libRow}>
          <span>
            <a href={r.href} target="_blank" rel="noopener" className={`${s.rowLink} ${s.libTitle}`}>
              {r.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className={s.libDesc}>{r.description}</span>
          </span>
          {r.meta && <span className={s.libMeta}>{r.meta}</span>}
          <ArrowUpRight size={20} className={s.rowArrow} />
        </li>
      ))}
    </ul>
  );
}

/**
 * His lectures and the literature he publishes and recommends. `featured`
 * leads with the Pankey course as a slide card (V2); otherwise a hairline index.
 */
export default function Library({
  v,
  title = "Lectures and literature",
  tone = "white",
  featured = false,
}: {
  v: VersionId;
  title?: string;
  tone?: Tone;
  featured?: boolean;
}) {
  const [lead, ...rest] = ITEMS;
  return (
    <Section tone={tone} labelledBy="lib-title" id="library">
      <SectionHead
        id="lib-title"
        title={title}
        lead="Slides from his TMD course at the L.D. Pankey Institute, his published article on the orthopedic approach to diagnosing the TMJ, and recommended reading."
        layout="split"
        actions={
          <ButtonLink href={href(v, routes.library)} variant="quiet">
            The full library
          </ButtonLink>
        }
      />
      <Reveal>
        {featured ? (
          <div className={s.libFeatured}>
            <ImageCard
              href={lead.href!}
              image={{ src: lectureSlide.src, alt: lectureSlide.alt }}
              title={lead.title}
              line={lead.description}
              meta={lead.meta}
              ratio="16/10"
              fit="contain"
              field="white"
              as="h3"
              sizes="(min-width: 1000px) 540px, 100vw"
            />
            <Rows items={rest} />
          </div>
        ) : (
          <Rows items={ITEMS} />
        )}
      </Reveal>
    </Section>
  );
}
