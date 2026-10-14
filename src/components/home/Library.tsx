import { library, type LibraryItem } from "@/content/aps";
import { understanding } from "@/content/tmd";
import { ButtonLink } from "@/components/site/Button";
import { ArrowUpRight } from "@/components/site/icons";
import ImageCard from "@/components/site/ImageCard";
import { href, routes, type VersionId } from "@/components/site/links";
import Reveal from "@/components/site/Reveal";
import { Section, SectionHead, type Tone } from "@/components/site/Section";
import s from "./home.module.css";

/**
 * His lectures and the literature on his drdroter.com pages (Pankey TMD 2026,
 * Medical Literature), each described in his own link text or citation. The
 * Airway Bite's own instructions and video live with the device.
 */
type LinkedItem = LibraryItem & { href: string };
const ITEMS: LinkedItem[] = (library.dentists as LibraryItem[]).filter(
  (r): r is LinkedItem => Boolean(r.href) && (r.kind === "Lecture" || r.kind === "Article" || r.kind === "Reference"),
);
/** "Different diagnoses have different therapies", a slide from the Pankey course. */
const lectureSlide = understanding.approaches.figures[2];

const metaLine = (r: LibraryItem) => [r.meta, r.format].filter(Boolean).join(" · ");
/** His link text sometimes repeats the title ("Gill Ortho Ceph Analysis Extract"); print it once. */
const squash = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "");
const ownLine = (r: LibraryItem) => (r.description && squash(r.description) !== squash(r.title) ? r.description : "");

function Rows({ items }: { items: LinkedItem[] }) {
  return (
    <ul className={s.libRows}>
      {items.map((r) => (
        <li key={r.title} className={s.libRow}>
          <span>
            <a href={r.href} target="_blank" rel="noopener" className={`${s.rowLink} ${s.libTitle}`}>
              {r.title}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {ownLine(r) && <span className={s.libDesc}>{ownLine(r)}</span>}
          </span>
          <span className={s.libMeta}>{metaLine(r)}</span>
          <ArrowUpRight size={20} className={s.rowArrow} />
        </li>
      ))}
    </ul>
  );
}

/**
 * His lectures and the literature he publishes and recommends, under his own
 * page heading "Medical Literature". `featured` leads with the Pankey course
 * as a slide card (V2); otherwise a hairline index.
 */
export default function Library({
  v,
  title = "Medical Literature",
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
              href={lead.href}
              image={{ src: lectureSlide.src, alt: lectureSlide.alt }}
              title={lead.title}
              line={ownLine(lead) || undefined}
              meta={`${lead.kind} · ${lead.format}`}
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
