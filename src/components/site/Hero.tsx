import type { ReactNode } from "react";
import type { Tone } from "./Section";

type Props = {
  /** The h1. Light display type; keep it short enough for 2–3 lines. */
  title: ReactNode;
  lead?: ReactNode;
  /** Usually a primary and a secondary ButtonLink. */
  actions?: ReactNode;
  /** The visual: a render, a portrait, the TMJ plates. It bleeds to the viewport edge on its side. */
  media: ReactNode;
  /** A full-width row under the hero grid, e.g. <SpecStrip items={airwaySpecStrip} />. */
  below?: ReactNode;
  tone?: Tone;
  mediaSide?: "right" | "left";
  /** `display` (64–96px) for home heroes, `h1` for inner pages. */
  size?: "display" | "h1";
  /** Fill the first viewport (minus the header). */
  tall?: boolean;
  id?: string;
  className?: string;
};

/**
 * First-viewport hero: copy on one side, media bleeding off the other, an
 * optional row below. Porcelain by default so renders and stills sit seamlessly.
 */
export default function Hero({
  title,
  lead,
  actions,
  media,
  below,
  tone = "porcelain",
  mediaSide = "right",
  size = "display",
  tall = true,
  id = "top",
  className,
}: Props) {
  return (
    <section
      className={["hero", `tone-${tone}`, `hero-media-${mediaSide}`, tall && "hero-tall", className].filter(Boolean).join(" ")}
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className={`t-${size} hero-title`} id={`${id}-title`}>
            {title}
          </h1>
          {lead && <p className="t-lead hero-lead">{lead}</p>}
          {actions && <div className="actions hero-actions">{actions}</div>}
        </div>
        <div className="hero-media">{media}</div>
      </div>
      {below && <div className="wrap hero-below">{below}</div>}
    </section>
  );
}
