import Link from "next/link";
import ApsLogo from "@/components/shared/ApsLogo";
import { airwayBite, brand, contact, distributor, doctor } from "@/content/aps";
import { ArrowUpRight } from "./icons";
import { href, routes, tel, type VersionId } from "./links";

/** Site footer: brand, order route, nav columns, contact, legal line. */
export default function Footer({ v }: { v: VersionId }) {
  const columns = [
    {
      title: airwayBite.shortName,
      links: [
        { label: "Overview", to: href(v, routes.airwayBite) },
        { label: "Chairside steps", to: href(v, `${routes.airwayBite}#steps`) },
        { label: "Tutorial video", to: href(v, `${routes.airwayBite}#tutorial`) },
        { label: airwayBite.pdf.label, to: airwayBite.pdf.href, file: true },
        { label: "Appliances", to: href(v, routes.appliances) },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Understanding TMD", to: href(v, routes.understanding) },
        { label: "Conditions", to: href(v, routes.conditions) },
        { label: "Library", to: href(v, routes.library) },
      ],
    },
    {
      title: brand.name,
      links: [
        { label: `About ${doctor.shortName}`, to: href(v, routes.about) },
        { label: "Home", to: href(v) },
      ],
    },
  ];

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-top">
          <div className="ft-brand">
            <Link href={href(v)} aria-label="ArrowPath Sleep, home" className="ft-logo">
              <ApsLogo variant="lockup" className="ft-lockup" />
            </Link>
            <p className="ft-tagline">{brand.tagline}</p>
          </div>
          <div className="ft-order">
            <p className="ft-text">{distributor.note}</p>
            <a href={distributor.url} target="_blank" rel="noopener" className="btn btn-primary">
              <span className="btn-label">{distributor.cta}</span>
              <ArrowUpRight size={16} className="btn-icon" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="ft-grid">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="ft-col">
              <h2 className="ft-h">{col.title}</h2>
              <ul className="ft-list">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.file ? (
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
          ))}
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
          <p>
            {doctor.name} · {doctor.affiliation}
          </p>
          <a href={distributor.url} target="_blank" rel="noopener" className="ft-link">
            Ordering: {distributor.name}
            <ArrowUpRight size={14} className="ft-ext" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
