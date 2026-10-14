"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { airwayBite } from "@/content/aps";
import { Section, type Tone } from "./Section";

const STATES = [
  {
    id: "not-enough",
    label: "Not enough",
    src: "/aps/stills/intro-airway-not-enough-clean.webp",
    alt: "Jaw not far enough forward: the airway stays narrow.",
  },
  {
    id: "just-right",
    label: "Just right",
    src: "/aps/stills/intro-airway-how-far-clean.webp",
    alt: "Jaw forward to the position in between: the airway is open and the patient comfortable.",
  },
  {
    id: "too-far",
    label: "Too far",
    src: "/aps/stills/intro-airway-too-far-clean.webp",
    alt: "Jaw too far forward: uncomfortable for the patient.",
  },
] as const;

const FRAMES = [
  { src: "/aps/stills/intro-airway-narrow-clean.webp", alt: "Cross-section of the airway during sleep, narrow behind the tongue." },
  { src: "/aps/stills/intro-airway-jaw-forward-clean.webp", alt: "The same cross-section with the lower jaw moved forward and the airway more open." },
];

type Props = {
  id?: string;
  /** Defaults to the tutorial's own question, "How far forward?". */
  title?: string;
  /** Night is the airway moment; mist works on lighter pages. */
  tone?: Extract<Tone, "night" | "mist" | "white">;
};

/**
 * "How far forward?": the airway story from the tutorial in three stills.
 * The third is live: Not enough / Just right / Too far swaps the frame.
 * Renders its own Section.
 */
export default function HowFarForward({ id = "how-far", title, tone = "night" }: Props) {
  const story = airwayBite.airwayStory;
  const [index, setIndex] = useState(1);
  const group = useRef<HTMLDivElement>(null);
  const heading = title ?? story[2].title;

  const select = (i: number, focus = false) => {
    setIndex(i);
    if (focus) (group.current?.children[i] as HTMLElement | undefined)?.focus();
  };

  return (
    <Section tone={tone} id={id} labelledBy={`${id}-title`} className="hff">
      <header className="hff-head">
        <h2 className="t-h1" id={`${id}-title`}>
          {heading}
        </h2>
        <p className="t-lead hff-lead">{airwayBite.purpose}</p>
      </header>

      <div className="hff-grid">
        <ol className="hff-setup">
          {FRAMES.map((f, i) => (
            <li key={f.src} className="hff-item">
              <div className="hff-frame">
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1000px) 30vw, (min-width: 560px) 50vw, 100vw" className="hff-img" />
              </div>
              <h3 className="hff-title">{story[i].title}</h3>
              <p className="hff-body">{story[i].body}</p>
            </li>
          ))}
        </ol>

        <div className="hff-live">
          <div className="hff-frame hff-frame-live">
            {STATES.map((s, i) => (
              <Image
                key={s.id}
                src={s.src}
                alt={i === index ? s.alt : ""}
                aria-hidden={i === index ? undefined : true}
                fill
                sizes="(min-width: 1000px) 62vw, 100vw"
                className="hff-img hff-swap"
                data-on={i === index || undefined}
              />
            ))}
          </div>

          <div className="gauge">
            <div className="gauge-track" aria-hidden="true">
              {STATES.map((s, i) => (
                <span key={s.id} className="gauge-seg" data-on={i === index || undefined} />
              ))}
              <span className="gauge-knob" style={{ left: `${(index * 2 + 1) * (100 / 6)}%` }} />
            </div>
            <div className="gauge-opts" role="radiogroup" aria-label="Jaw position" ref={group}>
              {STATES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={i === index}
                  tabIndex={i === index ? 0 : -1}
                  className="gauge-opt"
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                    if (!step) return;
                    e.preventDefault();
                    select((index + step + STATES.length) % STATES.length, true);
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <p className="hff-body hff-answer">{story[2].body}</p>
        </div>
      </div>
    </Section>
  );
}
