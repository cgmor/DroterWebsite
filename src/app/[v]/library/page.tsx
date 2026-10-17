import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LibraryRows } from "@/components/education/LibraryIndex";
import { ButtonLink } from "@/components/site/Button";
import { href, isSite, siteHas, routes, type SiteId } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section, SectionHead } from "@/components/site/Section";
import { airwayBite, distributor, education, library } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { resourcePages, resourceSite } from "@/content/resources";
import { sitePages } from "@/content/sites";
import { literature } from "@/content/tmd";
import SharedFilesLink from "../dentists/SharedFilesLink";
import { fromResource } from "./entries";
import ResourceCard, { ResourceGrid } from "./ResourceCard";
import s from "./library.module.css";

/** The page's name in each site's nav: "Resources" on drdroter.com, "For dentists" on APSleep.com. */
const pageLabel = (v: SiteId) => sitePages[v].find((p) => p.slug === "library")?.label ?? "Library";

export async function generateMetadata({ params }: { params: Promise<{ v: string }> }): Promise<Metadata> {
  const { v } = await params;
  if (!isSite(v)) return {};
  return v === resourceSite
    ? { title: pageLabel(v), description: education.patientsLine }
    : { title: pageLabel(v), description: airwayBite.purpose };
}

export default async function LibraryPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isSite(v) || !siteHas(v, "library")) notFound();
  return v === resourceSite ? <Resources v={v} /> : <ForDentists v={v} />;
}

/* ───────────────────────── drdroter.com: Resources ───────────────────────── */

/**
 * His patient handouts as web pages (not downloads), then the medical
 * literature from his drdroter.com pages, then the practice.
 */
function Resources({ v }: { v: SiteId }) {
  const rows = literature.map(fromResource);
  return (
    <>
      <Section tone="mist" space="md" labelledBy="resources-title">
        <SectionHead as="h1" id="resources-title" layout="center" className={s.head} title={pageLabel(v)} lead={education.patientsLine} />
        <ResourceGrid>
          {resourcePages.map((r) => (
            <ResourceCard key={r.slug} title={r.title} line={r.line} foot={r.label} href={href(v, `${routes.library}/${r.slug}`)} />
          ))}
        </ResourceGrid>
      </Section>

      {rows.length > 0 && (
        <Section space="md" id="literature" labelledBy="literature-title">
          {/* His page heading; his drdroter.com Medical Literature page has no intro, so none is written for it. */}
          <SectionHead id="literature-title" layout="center" className={s.head} title="Medical Literature" />
          <LibraryRows entries={rows} className={s.literature} />
          <SharedFilesLink v={v} />
        </Section>
      )}

      <Section space="md" flush="top" labelledBy="practice-title">
        <PracticePanel />
      </Section>
    </>
  );
}

/* ───────────────────────── APSleep.com: For dentists ───────────────────────── */

/**
 * For dentists: the Airway Bite's own documents (the page, the printable
 * instructions, the tutorial), then where to order: the Airway Bite from Great
 * Lakes Dental, the appliances from Living Tree Dental Lab; then his published
 * medical literature (self-hosted under /aps/literature, so nothing links to
 * drdroter.com). No lecture slides, no patient downloads. The Airway Bite page
 * carries the pictures; this page stays a calm index.
 */
function ForDentists({ v }: { v: SiteId }) {
  const rows = literature.map(fromResource);
  const ifu = library.dentists.find((i) => i.kind === "Instructions");
  const tutorial = library.dentists.find((i) => i.kind === "Video");
  /** The tutorial's length as a timecode: "2 min 15 s" → "2:15". */
  const [, min, sec] = airwayBite.video.durationLabel.match(/(\d+)\s*min\s*(\d+)\s*s/) ?? [];
  const videoLength = min ? `${min}:${sec.padStart(2, "0")}` : airwayBite.video.durationLabel;

  return (
    <>
      <Section tone="mist" space="md" labelledBy="dentists-title">
        <SectionHead as="h1" id="dentists-title" layout="center" className={s.head} title={pageLabel(v)} lead={airwayBite.purpose} />
        <ResourceGrid>
          <ResourceCard title={airwayBite.shortName} line={airwayBite.summary} foot={airwayBite.category} href={href(v, routes.airwayBite)} />
          {ifu?.href && (
            <ResourceCard
              title={airwayBite.pdf.label}
              line={ifu.description}
              foot={[ifu.format, ifu.meta?.split(" · ")[0]].filter(Boolean).join(" · ")}
              href={ifu.href}
              external
            />
          )}
          {tutorial && (
            <ResourceCard
              title="Chairside tutorial"
              line={tutorial.description}
              foot={`${tutorial.format} · ${videoLength}`}
              href={href(v, `${routes.airwayBite}#tutorial`)}
            />
          )}
        </ResourceGrid>
        <SharedFilesLink v={v} />
      </Section>

      <Section space="md" labelledBy="order-title">
        <SectionHead id="order-title" layout="center" className={s.head} title="Ordering" />
        <ul className={s.orders}>
          <li className={s.order}>
            <h3 className={s.orderName}>{airwayBite.shortName}</h3>
            <p className={s.orderLine}>{distributor.note}</p>
            <p className={s.orderNote}>{airwayBite.kit.line}</p>
            <div className={`actions ${s.orderActions}`}>
              <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
              <ButtonLink href={href(v, routes.airwayBite)} variant="quiet">
                See the {airwayBite.shortName}
              </ButtonLink>
            </div>
          </li>
          <li className={s.order}>
            <h3 className={s.orderName}>Appliances</h3>
            <p className={s.orderLine}>{livingTree.name}</p>
            <p className={s.orderNote}>{library.livingTree.line}</p>
            <div className={`actions ${s.orderActions}`}>
              <ButtonLink href={livingTree.url} variant="secondary">
                {livingTree.name}
              </ButtonLink>
              <ButtonLink href={href(v, routes.appliances)} variant="quiet">
                See the appliances
              </ButtonLink>
            </div>
          </li>
        </ul>
      </Section>

      {rows.length > 0 && (
        <Section space="md" id="literature" labelledBy="literature-title" className={s.hairTop}>
          <SectionHead id="literature-title" layout="center" className={s.head} title="Medical Literature" />
          <LibraryRows entries={rows} className={s.literature} />
        </Section>
      )}
    </>
  );
}
