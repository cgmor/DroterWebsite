"use client";

import Image from "next/image";
import { airwayBite } from "@/content/aps";
import { useReducedMotion } from "./motion";

type LoopName = keyof typeof airwayBite.loops;

type Props = {
  /** One of aps.ts `airwayBite.loops`: "airwayOpening" | "kitReveal" | "stepsMontage". */
  name: LoopName;
  alt: string;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

/**
 * A short silent loop (1920 × 816, porcelain ground). Reduced motion, and the
 * server render, show the poster still; the video takes over after hydration.
 */
export default function Loop({ name, alt, className, sizes = "100vw", preload }: Props) {
  const reduced = useReducedMotion();
  const l = airwayBite.loops[name];

  if (reduced) {
    return <Image src={l.poster} alt={alt} width={1920} height={816} className={className} sizes={sizes} quality={90} preload={preload} />;
  }

  return (
    <video className={className} width={1920} height={816} poster={l.poster} autoPlay muted loop playsInline preload="auto" aria-label={alt}>
      <source src={l.webm} type="video/webm" />
      <source src={l.mp4} type="video/mp4" />
    </video>
  );
}
