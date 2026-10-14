import type { ReactNode } from "react";
import Figure from "@/components/site/Figure";
import type { GuideSection } from "@/content/tmd";
import Notice from "./Notice";
import s from "./education.module.css";

type Props = {
  sections: GuideSection[];
  /** Heading level for each section (h3 when the page already has an h2 above). */
  as?: "h2" | "h3";
  /** Prefix for section ids, so anchors stay unique on the page. */
  idPrefix?: string;
};

export const sectionId = (prefix: string, heading: string) =>
  `${prefix}-${heading
    .toLowerCase()
    .replace(/[’'“”]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

/**
 * Renders Dr. Droter's condition write-ups verbatim from tmd.ts. Blocks render
 * in the order the author wrote them in the data (paragraphs, list, steps,
 * callout); a section's lecture slide sits beside its text on wide screens and
 * stays in view while the text is read.
 */
export default function GuideBody({ sections, as: H = "h3", idPrefix = "full" }: Props) {
  const withFigures = sections.some((sec) => sec.figure);

  return (
    <div className={[s.guide, withFigures ? s.guideSplit : s.guideColumn].join(" ")}>
      {sections.map((sec) => {
        const id = sectionId(idPrefix, sec.heading);
        const blocks: ReactNode[] = [];

        for (const key of Object.keys(sec) as (keyof GuideSection)[]) {
          if (key === "paragraphs" && sec.paragraphs?.length) {
            sec.paragraphs.forEach((p, i) => blocks.push(<p key={`p${i}`}>{p}</p>));
          } else if (key === "list" && sec.list?.length) {
            blocks.push(
              <ul key="list">
                {sec.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>,
            );
          } else if (key === "steps" && sec.steps?.length) {
            blocks.push(
              <ol key="steps" className={s.guideSteps}>
                {sec.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>,
            );
          } else if (key === "callout" && sec.callout) {
            blocks.push(
              <Notice key="callout" className={s.guideNotice}>
                {sec.callout}
              </Notice>,
            );
          }
        }

        return (
          <section key={sec.heading} className={s.gs} aria-labelledby={id}>
            <div className={["prose", s.gsText].join(" ")}>
              <H className={s.gsTitle} id={id}>
                {sec.heading}
              </H>
              {blocks}
            </div>
            {sec.figure && (
              <div className={s.gsFig}>
                <Figure {...sec.figure} sizes="(min-width: 1000px) 600px, 100vw" />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
