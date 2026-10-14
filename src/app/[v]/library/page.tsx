import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import LibraryIndex, { type Audience, type LibraryEntry, type LibraryGroup } from "@/components/education/LibraryIndex";
import { ButtonLink } from "@/components/site/Button";
import Figure from "@/components/site/Figure";
import { href, isVersion, routes, type VersionId } from "@/components/site/links";
import { Section } from "@/components/site/Section";
import { airwayBite, doctor, library, type LibraryItem } from "@/content/aps";
import { lectures, literature, patientResources, understanding, type Resource } from "@/content/tmd";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Library",
  description: `Lectures, medical literature and patient resources from ${doctor.name}, with the ${airwayBite.shortName} instructions and tutorial.`,
};

const isFile = (url: string) => /\.(pdf|mp4)$/i.test(url);

/** aps.ts library item → row. The tutorial opens on the Airway Bite page, where its chapters live. */
function fromLibrary(item: LibraryItem, audience: Audience, v: VersionId): LibraryEntry {
  let link = item.href;
  let external = !!link && (/^https?:/.test(link) || isFile(link));
  if (item.kind === "Video" && link && link.endsWith(".mp4")) {
    link = href(v, `${routes.airwayBite}#tutorial`);
    external = false;
  }
  return {
    key: `aps:${item.title}`,
    title: item.title,
    description: item.description,
    kind: item.kind,
    format: item.format,
    meta: item.meta,
    href: link,
    external,
    status: item.status ?? (link ? "available" : "coming-soon"),
    audience,
  };
}

/** tmd.ts resource → row. Its meta carries the format ("… · PDF"); split it out. */
function fromResource(r: Resource): LibraryEntry {
  const parts = (r.meta ?? "").split(" · ").filter(Boolean);
  const format = parts.includes("PDF") || (r.href && /\.pdf$/i.test(r.href)) ? "PDF" : "Link";
  const meta = parts.filter((p) => p !== "PDF" && p !== r.kind).join(" · ") || undefined;
  return {
    key: `tmd:${r.title}`,
    title: r.title,
    description: r.description,
    kind: r.kind,
    format,
    meta,
    href: r.href,
    external: !!r.href,
    status: r.href ? "available" : "coming-soon",
    audience: r.audience,
  };
}

/** Keep the first entry for each title (aps.ts first, since it carries format and status). */
function unique(entries: LibraryEntry[]) {
  const seen = new Set<string>();
  return entries.filter((e) => {
    const k = e.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export default async function LibraryPage({ params }: { params: Promise<{ v: string }> }) {
  const { v } = await params;
  if (!isVersion(v)) notFound();

  const dentistItems = library.dentists as LibraryItem[];
  const lectureKinds = new Set(["Lecture", "Instructions", "Video"]);

  const lectureRows = unique([
    ...dentistItems.filter((i) => lectureKinds.has(i.kind)).map((i) => fromLibrary(i, "dentists", v)),
    ...lectures.map(fromResource),
  ]);
  const literatureRows = unique([
    ...literature.map(fromResource),
    ...dentistItems.filter((i) => !lectureKinds.has(i.kind)).map((i) => fromLibrary(i, "dentists", v)),
  ]);
  const patientRows = unique([
    ...patientResources.map(fromResource),
    ...(library.patients as LibraryItem[]).map((i) => fromLibrary(i, "patients", v)),
  ]);

  const [slideCauses] = understanding.approaches.figures;

  const groups: LibraryGroup[] = [
    {
      id: "lectures",
      title: "Lectures",
      lead: `Course slides from Dr. Droter’s teaching at the L.D. Pankey Institute, with the ${airwayBite.shortName} instructions and its chairside tutorial.`,
      aside: <Figure {...slideCauses} caption="From Dr. Droter’s TMD lecture." sizes="(min-width: 900px) 520px, 100vw" preload />,
      entries: lectureRows,
    },
    {
      id: "literature",
      title: "Medical literature",
      lead: "Dr. Droter’s published article on diagnosing the TMJ, and references on tooth wear and abrasion.",
      entries: literatureRows,
    },
    {
      id: "patients",
      title: "Patient resources",
      lead: "Handouts to use at home, or to bring to your dentist.",
      entries: patientRows,
    },
  ];

  return (
    <>
      <div className={`wrap ${s.mast}`}>
        <h1 className={`t-display ${s.title}`}>Library</h1>
        <p className={s.intro}>Lectures, medical literature and patient resources from {doctor.name}.</p>
      </div>

      <div className={`wrap ${s.index}`}>
        <LibraryIndex groups={groups} />
      </div>

      {/* ── Close: the Airway Bite, and the order ─────────────────────── */}
      <Section tone="porcelain" space="none" labelledBy="ab-title" className={s.ab}>
        <div className={s.abGrid}>
          <div className={s.abCopy}>
            <h2 className={`t-h2 ${s.abTitle}`} id="ab-title">
              The {airwayBite.shortName}
            </h2>
            <p className={s.abLead}>{airwayBite.summary}</p>
            <div className="actions">
              <ButtonLink href={href(v, routes.airwayBite)}>See the {airwayBite.shortName}</ButtonLink>
              <ButtonLink href={href(v, `${routes.airwayBite}#steps`)} variant="secondary">
                Chairside protocol
              </ButtonLink>
            </div>
          </div>
          <div className={s.abMedia}>
            <Image
              src="/aps/renders/device-airway-bite-three-quarter.png"
              alt={`The ${airwayBite.name}, three-quarter view`}
              width={2000}
              height={2000}
              sizes="(min-width: 900px) 46vw, 90vw"
              className={s.abImg}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
