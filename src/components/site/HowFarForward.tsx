"use client";

import Image from "next/image";
import { useId, useState, type CSSProperties } from "react";
import { airwayBite } from "@/content/aps";
import { Section, SectionHead, type Tone } from "./Section";
import h from "./howfar.module.css";

/*
 * One illustration, one control. Dragging the jaw forward walks the tutorial's
 * own frames (cropped clear of the slider graphic drawn into the animation)
 * from the narrow airway at rest, through "not enough", to "just right", and
 * past it to "too far". Each position shows the matching line of Dr. Droter's
 * narration, verbatim.
 */

const [rest, forward, howFar] = airwayBite.airwayStory;
/** "…Forward too far, it’s uncomfortable, but not far enough, the airway does not open." */
const tooFarLine = howFar.body.match(/Forward too far, it’s uncomfortable/)?.[0] ?? howFar.body;
const notEnoughLine = howFar.body.match(/not far enough, the airway does not open/)?.[0] ?? howFar.body;

const POSITIONS = [
  {
    id: "rest",
    label: "At rest",
    tone: "rest",
    src: "/aps/stills/airway-rest.webp",
    alt: "Cross-section of the head during sleep: the tongue sits back and the airway behind it is narrow.",
    line: rest.body,
  },
  {
    id: "not-enough",
    label: "Not enough",
    tone: "short",
    src: "/aps/stills/airway-not-enough.webp",
    alt: "The lower jaw moved slightly forward: the airway is still narrow behind the tongue.",
    line: `${notEnoughLine.charAt(0).toUpperCase()}${notEnoughLine.slice(1)}.`,
  },
  {
    id: "just-right",
    label: "Just right",
    tone: "right",
    src: "/aps/stills/airway-just-right.webp",
    alt: "The lower jaw further forward: the airway behind the tongue is open.",
    line: forward.body,
  },
  {
    id: "too-far",
    label: "Too far",
    tone: "far",
    src: "/aps/stills/airway-too-far.webp",
    alt: "The lower jaw too far forward, highlighted: the airway is open but the position is uncomfortable.",
    line: `${tooFarLine}.`,
  },
] as const;

type Props = {
  id?: string;
  /** Defaults to his narration's question, "How far do you move it forward?". */
  title?: string;
  /** The one-line intro under the heading. Defaults to his purpose line (IFU slide 1). */
  lead?: string;
  /** Night is the airway moment; mist works on lighter pages. */
  tone?: Extract<Tone, "night" | "mist" | "white">;
};

export default function HowFarForward({ id = "how-far", title, lead = airwayBite.purpose, tone = "night" }: Props) {
  const [pos, setPos] = useState(0);
  const sliderId = useId();
  const current = POSITIONS[pos];
  const heading = title ?? howFar.title;

  return (
    <Section tone={tone} id={id} labelledBy={`${id}-title`}>
      <SectionHead id={`${id}-title`} title={heading} lead={lead} layout="center" />

      <div className={h.grid} style={{ "--pos": pos } as CSSProperties} data-tone={current.tone}>
        <figure className={h.stage}>
          {POSITIONS.map((p, i) => (
            <Image
              key={p.id}
              src={p.src}
              alt={i === pos ? p.alt : ""}
              aria-hidden={i === pos ? undefined : true}
              fill
              sizes="(min-width: 700px) 640px, 100vw"
              quality={90}
              className={h.frame}
              data-on={i === pos || undefined}
            />
          ))}
        </figure>

        <div className={h.control}>
          <label htmlFor={sliderId} className={h.readoutLabel}>
            Drag to move the jaw forward
          </label>

          <div className={h.track}>
            <span className={h.rail} aria-hidden="true">
              <span className={h.zoneRest} />
              <span className={h.zoneShort} />
              <span className={h.zoneRight} />
              <span className={h.zoneFar} />
            </span>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={POSITIONS.length - 1}
              step={1}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-valuetext={current.label}
              className={h.range}
            />
          </div>

          <ol className={h.stops}>
            {POSITIONS.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={h.stop}
                  data-tone={p.tone}
                  aria-pressed={i === pos}
                  onClick={() => setPos(i)}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Every line is laid, hidden, into the same cell, so the block holds the
            height of the longest one and dragging never moves the page. The
            credit stays under the current line; spare height falls below it. */}
        <figure className={h.narration}>
          <div className={h.lines}>
            {POSITIONS.map((p) => (
              <p key={`sizer-${p.id}`} className={`${h.line} ${h.sizer}`} aria-hidden="true">
                {p.line}
              </p>
            ))}
            <div className={h.entry}>
              <blockquote className={h.quote} aria-live="polite">
                <p key={current.id} className={`${h.line} ${h.live}`}>
                  {current.line}
                </p>
              </blockquote>
              <figcaption className={h.cite}>Dr. Droter, narrating the tutorial</figcaption>
            </div>
          </div>
        </figure>
      </div>
    </Section>
  );
}
