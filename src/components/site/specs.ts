import { airwayBite } from "@/content/aps";
import type { SpecStripItem } from "./SpecRows";

/**
 * Airway Bite numbers, each traced to its source so no page invents one.
 *  - 4 mm anterior stop: phase one caption (IFU) and the GLB model name.
 *  - 10–12 mm range: step 4.
 *  - ≈ 50% starting target: step 5.
 *
 * The model's bounding box (14.6 × 22.0 × 13.8 mm) is not printed: it is not
 * one of his numbers.
 */
export const airwayNumbers = {
  anteriorStop: "4 mm",
  range: "10–12 mm",
  target: "≈ 50%",
  /** Measured from the device's CAD (GLB bounding box), not a quoted claim. */
  envelope: "14.6 × 22.0 × 13.8 mm",
} as const;

/**
 * The millimetre spec row for heroes (V1 first viewport): millimetres only.
 * The starting target (≈ 50%) is not a measurement; it goes in running text,
 * in body type, never in this row.
 */
export const airwaySpecStrip: SpecStripItem[] = [
  { label: "Anterior stop", value: airwayNumbers.anteriorStop },
  { label: "Typical range of movement", value: airwayNumbers.range },
  /* Measured from the device's CAD file, not a claim. */
  { label: "Overall size", value: airwayNumbers.envelope },
];

/** "(1) APS Airway Bite" → "APS Airway Bite". */
export const kitItems = airwayBite.kit.contents.map((c) => c.replace(/^\(\d+\)\s*/, ""));
