import { airwayBite } from "@/content/aps";
import type { SpecStripItem } from "./SpecRows";

/**
 * Airway Bite numbers, each traced to its source so no page invents one.
 *  - 4 mm anterior stop: phase one caption (IFU) and the GLB model name.
 *  - 10–12 mm range: summaryLong[0] and step 4.
 *  - ≈ 50% starting target: step 5.
 *  - about five minutes: advantages[0].
 *  - 14.6 × 22.0 × 13.8 mm: bounding box of /aps/3d/airway-bite.glb.
 */
export const airwayNumbers = {
  anteriorStop: "4 mm",
  range: "10–12 mm",
  target: "≈ 50%",
  chairside: "≈ 5 min",
  envelope: "14.6 × 22.0 × 13.8 mm",
} as const;

/**
 * The millimetre spec row for heroes (V1 first viewport): millimetres only.
 * The starting target (≈ 50%) and the chairside time (about five minutes) are
 * not measurements; they go in running text, in body type, never in this row.
 */
export const airwaySpecStrip: SpecStripItem[] = [
  { label: "Anterior stop", value: airwayNumbers.anteriorStop },
  { label: "Typical range of movement", value: airwayNumbers.range },
  { label: "Overall size", value: airwayNumbers.envelope },
];

/** "(1) APS Airway Bite" → "APS Airway Bite". */
export const kitItems = airwayBite.kit.contents.map((c) => c.replace(/^\(\d+\)\s*/, ""));
