import Link from "next/link";
import { airwayBite, brand, contact, distributor, doctor } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { resourcePages } from "@/content/resources";
import { practice } from "@/content/tmd";
import { ArrowUpRight } from "./icons";
import { href, routes, tel, type SiteId } from "./links";
import SiteMark from "./SiteMark";

/**
 * His credit, in his words: "He is a visiting faculty member at the LD Pankey
 * Institute in Florida." (drdroter.com/about-dr-droter), as on the About page.
 */
const facultyLine = (() => {
  const m = doctor.bio[2].match(/He is an? (visiting faculty member at [^.]+)\./);
  return m ? m[1][0].toUpperCase() + m[1].slice(1) : doctor.affiliation;
})();

type Column = { title: string; links: { label: string; to: string; file?: boolean; external?: boolean }[] };

/**
 * Site footer: the brand with the contact beside it (so the top row is filled
 * across), then the link columns, then the legal line.
 */
export default function Footer({ v }: { v: SiteId }) {
  return v === "apsleep" ? <ApsFooter v={v} /> : <PracticeFooter v={v} />;
}

/** Phone and address: the right half of the footer's top row. */
function Contact({ phone, lines }: { phone: string; lines: string[] }) {
  return (
    <div className="ft-contact">
      <h2 className="ft-h">Contact</h2>
      <p className="ft-text">
        <a className="ft-link num" href={tel(phone)}>
          {phone}
        </a>
      </p>
      <address className="ft-text ft-address">
        {lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </address>
    </div>
  );
}

function ApsFooter({ v }: { v: SiteId }) {
  /* Three columns, none of them a single link: the company (home, about),
     the patient side, the dentist side. */
  const columns: Column[] = [
    {
      title: brand.name,
      links: [
        { label: "Home", to: href(v) },
        { label: `About ${doctor.shortName}`, to: href(v, routes.about) },
      ],
    },
    {
      title: "Sleep and airway",
      links: [
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
          <Contact phone={contact.officePhone} lines={[contact.company.name, ...contact.company.lines]} />
        </div>

        <div className="ft-grid">
          <Columns columns={columns} />
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
        {/* A letterhead: his name and his credit line beside the office. No
            tagline: his line would repeat the home page's h1 word for word. */}
        <div className="ft-top">
          <div className="ft-brand">
            <Link href={href(v)} aria-label={`${doctor.name}, home`} className="ft-logo">
              <SiteMark v={v} className="ft-lockup" />
            </Link>
            <p className="ft-cred">{facultyLine}</p>
          </div>
          <Contact phone={practice.phone} lines={practice.addressLines} />
        </div>

        <div className="ft-grid">
          <Columns columns={columns} />
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
                {/* The ↗ holds to the last word, so a wrapped label never strands it. */}
                {l.label.slice(0, l.label.lastIndexOf(" ") + 1)}
                <span className="ft-nowrap">
                  {l.label.slice(l.label.lastIndexOf(" ") + 1)}
                  <ArrowUpRight size={12} className="ft-ext" />
                </span>
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
