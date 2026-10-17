import { redirect } from "next/navigation";

/**
 * The QR code on every Airway Bite kit points at apsleep.com/airway-bite.
 * During the review it opens the APSleep draft's chairside page; at launch
 * this route is the chairside page itself.
 */
export default function AirwayBiteQr() {
  redirect("/apsleep/airway-bite");
}
