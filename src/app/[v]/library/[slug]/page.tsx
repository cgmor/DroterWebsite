import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LibraryRows } from "@/components/education/LibraryIndex";
import { ArrowLeft } from "@/components/education/icons";
import { ArrowUpRight } from "@/components/site/icons";
import { href, isSite, siteHas, routes } from "@/components/site/links";
import PracticePanel from "@/components/site/PracticePanel";
import { Section, SectionHead } from "@/components/site/Section";
import {
  hotColdHot,
  resourcePages,
  resourceSite,
  supplements,
  toothpaste,
  type Product,
  type ProductGroup,
} from "@/content/resources";
import { sitePages } from "@/content/sites";
import { literature } from "@/content/tmd";
import { fromResource } from "../entries";
import ResourceCard, { ResourceGrid } from "../ResourceCard";
import s from "../library.module.css";

type Params = Promise<{ v: string; slug: string }>;

/** Only drdroter.com carries his handouts; APSleep.com's /library/* is a 404. */
export function generateStaticParams({ params }: { params: { v: string } }) {
  return params.v === resourceSite ? resourcePages.map((r) => ({ slug: r.slug })) : [];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { v, slug } = await params;
  const page = v === resourceSite ? resourcePages.find((r) => r.slug === slug) : undefined;
  return page ? { title: page.title, description: page.line } : {};
}

const yearOf = (title: string) => title.match(/\b(19|20)\d{2}\b/)?.[0];

export default async function ResourcePage({ params }: { params: Params }) {
  const { v, slug } = await params;
  if (!isSite(v) || v !== resourceSite || !siteHas(v, "library")) notFound();
  const page = resourcePages.find((r) => r.slug === slug);
  if (!page) notFound();

  const others = resourcePages.filter((r) => r.slug !== slug);
  const label = sitePages[v].find((p) => p.slug === "library")?.label ?? "Resources";

  return (
    <>
      <div className="wrap">
        <div className={s.top}>
          <Link href={href(v, routes.library)} className={s.back}>
            <ArrowLeft size={16} className={s.backIcon} />
            All {label.toLowerCase()}
          </Link>
        </div>
        {slug === hotColdHot.slug && <HotColdHot />}
        {slug === supplements.slug && <Supplements />}
        {slug === toothpaste.slug && <Toothpaste />}
      </div>

      {/* ── The other handouts: one even row of the same cards as /library ── */}
      <Section tone="mist" space="md" labelledBy="more-title">
        <SectionHead
          id="more-title"
          layout="center"
          className={s.head}
          title={`More ${label.toLowerCase()}`}
          actions={
            <Link href={href(v, routes.library)} className={s.allLink}>
              All {label.toLowerCase()}
            </Link>
          }
        />
        <ResourceGrid cols={2}>
          {others.map((r) => (
            <ResourceCard key={r.slug} as="h3" title={r.title} line={r.line} foot={r.label} href={href(v, `${routes.library}/${r.slug}`)} />
          ))}
        </ResourceGrid>
      </Section>

      <Section space="md" labelledBy="practice-title">
        <PracticePanel />
      </Section>
    </>
  );
}

/* ───────────────────────── Pieces ───────────────────────── */

function Mast({ title, lead, byline }: { title: string; lead?: string; byline?: ReactNode[] }) {
  return (
    <header className={s.mast}>
      <h1 className={`t-h1 ${s.title}`}>{title}</h1>
      {lead && <p className={s.lead}>{lead}</p>}
      {byline && byline.length > 0 && (
        <ul className={s.byline}>
          {byline.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </header>
  );
}

/** His products as hairline rows: the name against his notes, his "Disadvantage" line, and a buy link once there is one. */
function Products({ items }: { items: Product[] }) {
  return (
    <ul className={s.products}>
      {items.map((p) => (
        <li key={p.name} className={s.product}>
          <h3 className={s.pName}>{p.name}</h3>
          {(p.notes.length > 0 || p.disadvantage || p.buyUrl) && (
            <div className={s.pBody}>
              {p.notes.map((n) => (
                <p key={n}>{n}</p>
              ))}
              {p.disadvantage && (
                <p className={s.pDis}>
                  <span className={s.pDisLabel}>Disadvantage:</span> {p.disadvantage}
                </p>
              )}
              {p.buyUrl && (
                <a href={p.buyUrl} target="_blank" rel="noopener sponsored" className={`lnk ${s.pBuy}`}>
                  Buy on Amazon
                  <ArrowUpRight size={16} className="lnk-icon" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

function Group({ g, id }: { g: ProductGroup; id: string }) {
  return (
    <section className={s.group} aria-labelledby={id}>
      <h2 className={s.groupTitle} id={id}>
        {g.heading}
      </h2>
      {g.advice && (
        <div className={s.advice}>
          <h3 className={s.subTitle}>{g.advice.heading}</h3>
          {g.advice.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      )}
      <Products items={g.products} />
    </section>
  );
}

const slugId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ───────────────────────── Hot, Cold, Hot ───────────────────────── */

function HotColdHot() {
  const h = hotColdHot;
  return (
    <>
      <Mast title={h.title} lead={h.line} />
      <div className={s.doc}>
        <div className={s.hch}>
          <p className={s.purpose}>{h.purpose}</p>
          <section className={s.group} aria-labelledby="directions-title">
            <h2 className={s.groupTitle} id="directions-title">
              {h.label}
            </h2>
            <ol className={s.steps}>
              {h.steps.map((st, i) => (
                <li key={st} className={s.step}>
                  <span className={`num ${s.stepN}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <p className={s.stepText}>{st}</p>
                </li>
              ))}
            </ol>
            {h.repeat && <p className={s.repeat}>{h.repeat}</p>}
          </section>
        </div>
      </div>
    </>
  );
}

/* ───────────────────────── Supplements ───────────────────────── */

function Supplements() {
  const d = supplements;
  return (
    <>
      <Mast
        title={d.title}
        byline={[
          d.author,
          yearOf(d.docTitle),
          <>
            {d.whereToBuy.heading}: {d.whereToBuy.text}
          </>,
        ].filter(Boolean)}
      />
      <div className={s.doc}>
        {d.groups.map((g) => (
          <Group key={g.heading} g={g} id={`${slugId(g.heading)}-title`} />
        ))}
      </div>
    </>
  );
}

/* ───────────────────────── Toothpaste ───────────────────────── */

function Toothpaste() {
  const d = toothpaste;
  const reading = literature.filter((r) => d.reading.some((t) => r.title.startsWith(t))).map(fromResource);
  return (
    <>
      <Mast title={d.title} byline={[d.author, yearOf(d.docTitle)].filter(Boolean)} />
      <div className={s.doc}>
        <div className={s.pair}>
          <section className={s.pairCol} aria-labelledby="advice-title">
            <h2 className={s.groupTitle} id="advice-title">
              {d.advice.heading}
            </h2>
            <ul className={s.ruled}>
              {d.advice.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
          <section className={s.pairCol} aria-labelledby="recs-title">
            <h2 className={s.groupTitle} id="recs-title">
              {d.recommendations.heading}
            </h2>
            <ul className={s.ruled}>
              {d.recommendations.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>

        {d.groups.map((g) => (
          <Group key={g.heading} g={g} id={`${slugId(g.heading)}-title`} />
        ))}

        {reading.length > 0 && (
          <section className={s.group} aria-labelledby="reading-title">
            <h2 className={s.groupTitle} id="reading-title">
              Medical Literature
            </h2>
            <LibraryRows entries={reading} />
          </section>
        )}
      </div>
    </>
  );
}

