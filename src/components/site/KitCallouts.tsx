import Image from "next/image";
import { airwayBite } from "@/content/aps";
import { kitItems } from "./specs";

/** Callouts on the kit still, as fractions of the 1920 × 816 frame. */
const CALLOUTS = [
  { text: kitItems[2], x: 31.2, y: 40, dir: "left" },
  { text: kitItems[0], x: 47.9, y: 51, dir: "up" },
  { text: kitItems[1], x: 70.6, y: 74, dir: "right" },
] as const;

/**
 * The kit still from the tutorial, edge to edge on porcelain, with leader-line
 * callouts (pencil, device, card ruler). Under 900px the frame crops to 4:3
 * and the labels list below it. Place inside a porcelain Section with
 * width="full" (or any porcelain field) so the still bleeds.
 */
export default function KitCallouts({ className }: { className?: string }) {
  return (
    <figure className={["kit", className].filter(Boolean).join(" ")}>
      <div className="kit-stage">
        <Image
          src="/aps/stills/kit-clean.webp"
          alt={`The ${airwayBite.kitName} laid out: a pencil, the Airway Bite and the APS card ruler.`}
          width={1920}
          height={816}
          sizes="100vw"
          className="kit-img"
        />
        <ul className="kit-pins" aria-hidden="true">
          {CALLOUTS.map((c) => (
            <li key={c.text} className={`co co-${c.dir}`} style={{ left: `${c.x}%`, top: `${c.y}%` }}>
              <span className="co-line" />
              <span className="co-text">{c.text}</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="kit-cap">
        <span className="sr-only">In the kit: </span>
        <ul className="kit-list">
          {kitItems.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <span className="kit-notes">{airwayBite.kit.notes.join(" · ")}</span>
      </figcaption>
    </figure>
  );
}
