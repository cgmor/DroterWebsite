import { redirect } from "next/navigation";

/**
 * The QR code on every Airway Bite kit points at apsleep.com/airway-bite.
 * During the design review it opens the chairside page of version 1; at
 * launch this route becomes the chairside page itself.
 */
export default function AirwayBiteQr() {
  redirect("/v1/airway-bite");
}
