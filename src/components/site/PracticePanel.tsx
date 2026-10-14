import Image from "next/image";
import { doctor } from "@/content/aps";
import { practice } from "@/content/tmd";
import { tel } from "./links";

type Props = {
  /** Panel surface. Use `white` when the surrounding Section is mist. */
  surface?: "mist" | "white";
  /** Small portrait of Dr. Droter beside the heading. */
  portrait?: boolean;
  id?: string;
};

/**
 * Light-touch practice panel: "See Dr. Droter in Bowie, Maryland", the
 * office phone, the address. Not a new-patient section. Place inside a Section.
 */
export default function PracticePanel({ surface = "mist", portrait = true, id = "practice" }: Props) {
  return (
    <aside className={`pp pp-${surface}`} aria-labelledby={`${id}-title`} id={id}>
      <div className="pp-main">
        {portrait && (
          <div className="pp-portrait">
            <Image src={doctor.headshot} alt={doctor.headshotAlt} width={1991} height={2416} sizes="120px" quality={90} className="pp-img" />
          </div>
        )}
        <div className="pp-copy">
          <h2 className="t-h3 pp-title" id={`${id}-title`}>
            {practice.heading}
          </h2>
          <p className="pp-body">{practice.body}</p>
        </div>
      </div>
      <div className="pp-contact">
        <a href={tel(practice.phone)} className="pp-phone num">
          {practice.phone}
        </a>
        <address className="pp-address">
          {doctor.name}
          {practice.addressLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </address>
      </div>
    </aside>
  );
}
