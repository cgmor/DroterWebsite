import Link from "next/link";
import { airwayBite, brand, contact, distributor, doctor } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { resourcePages } from "@/content/resources";
import { practice } from "@/content/tmd";
import { ArrowUpRight } from "./icons";
import { href, routes, tel, type SiteId } from "./links";
import SiteMark from "./SiteMark";

type Column = { title: string; links: { label: string; to: string; file?: boolean; external?: boolean }[] };

/** Site footer: brand, the site's action, nav columns, contact, legal line. */
export default function Footer({ v }: { v: SiteId }) {
  return v === "apsleep" ? <ApsFooter v={v} /> : <PracticeFooter v={v} />;
}

function ApsFooter({ v }: { v: SiteId }) {
  const columns: Column[] = [
    {
      title: "Sleep and airway",
      links: [
        { label: "Home", to: href(v) },
        { label: "Sleep problems", to: href(v, routes.conditions) },
        { label: "Appliances", to: href(v, routes.appliances) },
      ],
    },
    {
      title: "For dentists",
      links: [
        { label: "Dentist resources", to: href(v, routes.library) },
        { label: airwayBite.shortName, to: href(v, routes.airwayBite) },
        { label: livingTree.name, to: livingTree.url, external: true },
        { label: distributor.name, to: distributor.url, external: true },
      ],
    },
    {
      title: brand.name,
      links: [{ label: `About ${doctor.shortName}`, to: href(v, routes.about) }],
    },
  ];

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Link href={href(v)} aria-label="ArrowPath Sleep, home" className="ft-logo">
              <SiteMark v={v} className="ft-lockup" />
            </Link>
            <p className="ft-tagline">{brand.tagline}</p>
          </div>
        </div>

        <div className="ft-grid">
          <Columns columns={columns} />
          <div className="ft-col">
            <h2 className="ft-h">Contact</h2>
            <p className="ft-text">
              <a className="ft-link num" href={tel(contact.officePhone)}>
                {contact.officePhone}
              </a>
            </p>
            <address className="ft-text ft-address">
              {contact.company.name}
              {contact.company.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>
        </div>

        <div className="ft-base">
          <p>© 2026 {brand.legalName}</p>
        </div>
      </div>
    </footer>
  );
}

function PracticeFooter({ v }: { v: SiteId }) {
  const columns: Column[] = [
    {
      title: "Learn",
      links: [
        { label: "Understanding TMD", to: href(v, routes.understanding) },
        { label: "Conditions", to: href(v, routes.conditions) },
        { label: "Resources", to: href(v, routes.library) },
      ],
    },
    {
      title: "Patient resources",
      links: resourcePages.map((r) => ({ label: r.title, to: href(v, `${routes.library}/${r.slug}`) })),
    },
    {
      title: "Practice",
      links: [
        { label: `About ${doctor.shortName}`, to: href(v, routes.about) },
        { label: practice.heading, to: href(v, "/#new-patients") },
      ],
    },
  ];

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Link href={href(v)} aria-label={`${doctor.name}, home`} className="ft-logo">
              <SiteMark v={v} className="ft-lockup" />
            </Link>
            <p className="ft-tagline">{doctor.pullQuote}</p>
          </div>
        </div>

        <div className="ft-grid">
          <Columns columns={columns} />
          <div className="ft-col">
            <h2 className="ft-h">Contact</h2>
            <p className="ft-text">
              <a className="ft-link num" href={tel(practice.phone)}>
                {practice.phone}
              </a>
            </p>
            <address className="ft-text ft-address">
              {doctor.name}
              {practice.addressLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>
        </div>

        <div className="ft-base">
          <p>© 2026 {doctor.name}</p>
        </div>
      </div>
    </footer>
  );
}

function Columns({ columns }: { columns: Column[] }) {
  return columns.map((col) => (
    <nav key={col.title} aria-label={col.title} className="ft-col">
      <h2 className="ft-h">{col.title}</h2>
      <ul className="ft-list">
        {col.links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a className="ft-link" href={l.to} target="_blank" rel="noopener">
                {l.label}
                <ArrowUpRight size={12} className="ft-ext" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : l.file ? (
              <a className="ft-link" href={l.to}>
                {l.label}
              </a>
            ) : (
              <Link className="ft-link" href={l.to}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  ));
}
