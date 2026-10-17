import type { ReactNode } from "react";
import { airwayBite, distributor } from "@/content/aps";
import { ButtonLink } from "./Button";
import ModelStage from "./ModelStage";
import RangeScale from "./RangeScale";
import { Section, SectionHead } from "./Section";
import SpecRows, { type SpecRow } from "./SpecRows";
import { airwayNumbers } from "./specs";

const [singleUse, madeIn] = airwayBite.kit.notes;

const ROWS: SpecRow[] = [
  /* The kit label, as printed: "(1) APS Airway Bite (1) Ruler (1) Pencil". */
  { label: "In the kit", value: airwayBite.kit.contents.join(", ") },
  { label: "Anterior stop", value: airwayNumbers.anteriorStop, mono: true },
  { label: "Range of movement", value: airwayNumbers.range, mono: true, extra: <RangeScale /> },
  /* Dr. Droter's own words (IFU and IFU slides). */
  { label: "Holds with", value: "Flowable composite. Jaw is now held stable in forward position." },
  { label: "Capture", value: "Digital scan bite. Can also be used to take silicone bite registration." },
  { label: "Use", value: singleUse },
  { label: "Made in", value: madeIn.replace("Made in ", "") },
];

type Props = {
  /** Section id (anchor). */
  id?: string;
  /** Heading text. The client named this section; keep the default unless asked. */
  title?: string;
  /** The one-line intro under the heading (his words). Defaults to his IFU line on measuring the protrusive. */
  lead?: ReactNode;
  /** Show the order action under the spec sheet. */
  showOrder?: boolean;
};

/**
 * "Airway Bite, in detail": the rotating 3D model with Orbit / Front / Side /
 * Top presets beside the hairline spec sheet and the 0–12 mm range scale.
 * Every version keeps this section. Renders its own porcelain Section.
 */
export default function AirwayBiteInDetail({ id = "in-detail", title = `${airwayBite.shortName}, in detail`, lead = airwayBite.useWhen, showOrder = true }: Props) {
  return (
    <Section tone="porcelain" id={id} labelledBy={`${id}-title`} className="detail">
      <SectionHead id={`${id}-title`} title={title} lead={lead} layout="center" />
      <div className="detail-grid">
        <div className="detail-model">
          <ModelStage />
        </div>
        <div className="detail-body">
          <SpecRows rows={ROWS} />
          {showOrder && (
            <div className="actions detail-actions">
              <ButtonLink href={distributor.url}>{distributor.cta}</ButtonLink>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
