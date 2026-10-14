import type { ReactNode } from "react";

export type Tone = "white" | "mist" | "porcelain" | "night";

type SectionProps = {
  children: ReactNode;
  /** Ground. `porcelain` matches the animation stills; `night` is for sleep and airway moments. */
  tone?: Tone;
  /** `wide` = 1320px content column, `text` = reading column (~46rem), `full` = edge to edge (no column). */
  width?: "wide" | "text" | "full";
  /** Vertical rhythm. `lg` is the page default; `none` lets media bleed to the edges. */
  space?: "lg" | "md" | "sm" | "none";
  /** Drop the top or bottom padding (e.g. a band that continues the one above). */
  flush?: "top" | "bottom" | "both";
  id?: string;
  /** id of the heading that names the section. */
  labelledBy?: string;
  as?: "section" | "div" | "aside";
  className?: string;
};

/** A full-width band with a ground, vertical rhythm and a content column. */
export function Section({
  children,
  tone = "white",
  width = "wide",
  space = "lg",
  flush,
  id,
  labelledBy,
  as: Tag = "section",
  className,
}: SectionProps) {
  const cls = ["sec", `tone-${tone}`, `space-${space}`, flush && `flush-${flush}`, className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} id={id} aria-labelledby={labelledBy}>
      {width === "full" ? children : <div className={width === "text" ? "wrap wrap-text" : "wrap"}>{children}</div>}
    </Tag>
  );
}

type HeadProps = {
  title: ReactNode;
  /** id for the heading (pair with Section `labelledBy`). */
  id?: string;
  lead?: ReactNode;
  /** Buttons or a link, set beside the heading (split) or under it (stack). */
  actions?: ReactNode;
  /** Heading element. */
  as?: "h1" | "h2" | "h3";
  /** Visual size, independent of the element. Defaults: h1 → "h1", otherwise "h2". */
  size?: "display" | "h1" | "h2" | "h3";
  /** `stack` = title, lead, actions in one column; `split` = title left, lead + actions right (desktop). */
  layout?: "stack" | "split";
  className?: string;
};

/**
 * Section heading. Headings carry themselves: there is deliberately no
 * eyebrow/kicker slot.
 */
export function SectionHead({ title, id, lead, actions, as: H = "h2", size, layout = "stack", className }: HeadProps) {
  const sz = size ?? (H === "h1" ? "h1" : "h2");
  return (
    <header className={["shead", `shead-${layout}`, className].filter(Boolean).join(" ")}>
      <H className={`t-${sz} shead-title`} id={id}>
        {title}
      </H>
      {(lead || actions) && (
        <div className="shead-aside">
          {lead && <p className="t-lead shead-lead">{lead}</p>}
          {actions && <div className="actions">{actions}</div>}
        </div>
      )}
    </header>
  );
}

/** Long-form reading column: paragraphs, lists, h2/h3 with more space above than below. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={["prose", className].filter(Boolean).join(" ")}>{children}</div>;
}
