import Link from "next/link";
import { airwayBite, applianceGuide } from "@/content/aps";
import { livingTree } from "@/content/labs";
import { ArrowRight, ArrowUpRight } from "./icons";
import { href, routes, siteHas, type SiteId } from "./links";

type Props = {
  v: SiteId;
  /** Show the ordering line under the matrix: Living Tree Dental Lab, and his note for patients. */
  showOrder?: boolean;
  /**
   * Link each indication to its section on the appliances page:
   * `"section"` = an in-page anchor (#clenching …; use on /appliances itself),
   * `"page"` = /<site>/appliances#clenching (only on sites that carry that page).
   * Off by default.
   */
  linkTo?: "section" | "page";
};

/**
 * "Are you wearing the correct night guard?": indication → APS appliance →
 * description → note, as a hairline matrix (stacks on phones). All four
 * indications are set alike; the MAD row's note is a plain link to the Airway
 * Bite (on sites that carry that page). An appliance his chart gives no
 * description (APS Lat-Brux) leaves that cell empty. Place inside a Section.
 */
export default function ApplianceGuide({ v, showOrder = true, linkTo }: Props) {
  const toSection = (id: string) =>
    linkTo === "section" ? `#${id}` : linkTo === "page" && siteHas(v, "appliances") ? href(v, `${routes.appliances}#${id}`) : null;
  const airwayBiteLink = siteHas(v, "airway-bite");

  return (
    <div className="ag">
      <div className="ag-table" role="table" aria-label={applianceGuide.title}>
        <div className="ag-head" role="rowgroup">
          <div className="ag-row" role="row">
            <span role="columnheader">Indication</span>
            <span role="columnheader">Appliance</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Note</span>
          </div>
        </div>

        {applianceGuide.groups.map((g) => {
          const isMad = g.id === "airway";
          const to = toSection(g.id);
          return (
            <div className="ag-group" role="rowgroup" key={g.id}>
              {g.items.map((item, i) => (
                <div className="ag-row" role="row" key={item.name}>
                  <span role={i === 0 ? "rowheader" : "cell"} className="ag-ind">
                    {i === 0 &&
                      (to ? (
                        <a href={to} className="ag-ind-link">
                          {g.indication}
                        </a>
                      ) : (
                        g.indication
                      ))}
                  </span>
                  <span role="cell" className="ag-name">
                    {item.name}
                  </span>
                  <span role="cell" className="ag-detail">
                    {item.detail}
                  </span>
                  <span role="cell" className="ag-note">
                    {i === 0 && g.note}
                    {i === 0 && isMad && airwayBiteLink && (
                      <Link href={href(v, routes.airwayBite)} className="lnk">
                        {airwayBite.shortName}
                        <ArrowRight size={16} className="lnk-icon" />
                      </Link>
                    )}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {showOrder && (
        <p className="ag-foot">
          <a className="lnk" href={livingTree.url} target="_blank" rel="noopener">
            Order from {livingTree.name}
            <ArrowUpRight size={16} className="lnk-icon" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <span>{livingTree.patientNote}</span>
        </p>
      )}
    </div>
  );
}
