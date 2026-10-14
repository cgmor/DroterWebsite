import { airwayBite, distributor } from "@/content/aps";
import { ButtonLink } from "./Button";
import ModelStage from "./ModelStage";
import RangeScale from "./RangeScale";
import { Section } from "./Section";
import SpecRows, { type SpecRow } from "./SpecRows";
import { airwayNumbers, kitItems } from "./specs";

const [singleUse, madeIn] = airwayBite.kit.notes;
const capture = airwayBite.advantages.find((a) => a.title === "Digital or silicone")!;
const locks = airwayBite.advantages.find((a) => a.title === "Locks with composite")!;

const ROWS: SpecRow[] = [
  { label: "In the kit", value: kitItems.join(", ") },
  { label: "Anterior stop", value: airwayNumbers.anteriorStop, mono: true },
  {
    label: "Range of movement",
    value: airwayNumbers.range,
    mono: true,
    note: "Typical, fully retruded to fully protruded",
    extra: <RangeScale />,
  },
  { label: "Holds with", value: locks.body },
  { label: "Capture", value: capture.body },
  { label: "Overall size", value: airwayNumbers.envelope, mono: true },
  { label: "Use", value: singleUse.replace("Single Patient Use Only", "Single patient use only") },
  { label: "Made in", value: madeIn.replace("Made in ", "") },
];

type Props = {
  /** Section id (anchor). */
  id?: string;
  /** Heading text. The client named this section; keep the default unless asked. */
  title?: string;
  /** Show the order action under the spec sheet. */
  showOrder?: boolean;
};

/**
 * "Airway Bite, in detail": the rotating 3D model with Orbit / Front / Side /
 * Top presets beside the hairline spec sheet and the 0–12 mm range scale.
 * Every version keeps this section. Renders its own porcelain Section.
 */
export default function AirwayBiteInDetail({ id = "in-detail", title = `${airwayBite.shortName}, in detail`, showOrder = true }: Props) {
  return (
    <Section tone="porcelain" id={id} labelledBy={`${id}-title`} className="detail">
      <div className="detail-grid">
        <header className="detail-head">
          <h2 className="t-h2" id={`${id}-title`}>
            {title}
          </h2>
          <p className="t-lead detail-lead">{airwayBite.useWhen}</p>
        </header>
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
