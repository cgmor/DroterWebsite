"use client";

import { useEffect, useRef } from "react";
import { airwayBite } from "@/content/aps";
import DeviceRender from "./DeviceRender";
import s from "./home.module.css";

/**
 * V1's one authored motion moment: the Airway Bite render at product scale,
 * cut to its silhouette (DeviceRender) so it can run large without widening
 * the page. On desktop it bleeds off the hero's right edge and bottom. It
 * settles in on load (already visible, exponential ease-out), then, as the
 * page scrolls, eases toward the viewer and lifts off its contact shadow.
 * The scroll value is smoothed (lerped) so the motion trails the wheel the way
 * a rendered product page does. Reduced motion keeps it still.
 */
export default function DeviceStage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const tick = () => {
      current += (target - current) * 0.09;
      if (Math.abs(target - current) < 0.0004) current = target;
      el.style.setProperty("--p", current.toFixed(4));
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={s.stage}>
      <span className={s.stageShadow} aria-hidden="true" />
      <div className={s.stageMove}>
        <div className={s.stageSettle}>
          <DeviceRender
            view="three-quarter"
            alt={`The ${airwayBite.name}, three-quarter view: the 4 mm anterior stop rising from the base.`}
            sizes="(min-width: 1000px) 96vw, 132vw"
            eager
          />
        </div>
      </div>
    </div>
  );
}
