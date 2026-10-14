import Link from "next/link";
import { airwayBite, applianceGuide, distributor } from "@/content/aps";
import { ArrowRight, ArrowUpRight } from "./icons";
import { href, routes, type VersionId } from "./links";

type Props = {
  v: VersionId;
  /** Show the distributor line under the matrix. */
  showOrder?: boolean;
};

/**
 * "Choosing the correct night guard": indication → APS appliance → description
 * → note, as a hairline matrix (stacks on phones). Airway rows carry the
 * airway line; the MAD row links to the Airway Bite. Place inside a Section.
 */
export default function ApplianceGuide({ v, showOrder = true }: Props) {
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
          const airway = g.indication.includes("Airway");
          const isMad = g.indication === "Airway";
          return (
            <div className="ag-group" role="rowgroup" key={g.indication} data-airway={airway || undefined}>
              {g.items.map((item, i) => (
                <div className="ag-row" role="row" key={item.name}>
                  <span role={i === 0 ? "rowheader" : "cell"} className="ag-ind">
                    {i === 0 && (
                      <>
                        {airway && <i className="airway-line" aria-hidden="true" />}
                        {g.indication}
                      </>
                    )}
                  </span>
                  <span role="cell" className="ag-name">
                    {item.name}
                  </span>
                  <span role="cell" className="ag-detail">
                    {item.detail}
                  </span>
                  <span role="cell" className="ag-note">
                    {i === 0 && "note" in g && g.note}
                    {i === 0 && isMad && (
                      <Link href={href(v, routes.airwayBite)} className="lnk">
                        Record it with the {airwayBite.shortName}
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
          <span>{distributor.note}</span>
          <a className="lnk" href={distributor.url} target="_blank" rel="noopener">
            {distributor.cta}
            <ArrowUpRight size={16} className="lnk-icon" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      )}
    </div>
  );
}
