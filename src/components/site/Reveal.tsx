"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Tag = "div" | "section" | "li" | "article" | "figure" | "header" | "ul" | "ol";

type Props = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  id?: string;
};

/**
 * Content settles into place as it enters the viewport: it starts already
 * visible (no blank page without JS or with reduced motion) and eases from
 * 25% opacity and a 16px offset with an exponential ease-out. Only elements
 * below the fold at mount are animated.
 */
export default function Reveal({ as = "div", className, delay = 0, id, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("rv");
    if (delay) el.style.setProperty("--rv-delay", `${delay}ms`);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("rv-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Component = as as "div";
  return (
    <Component ref={ref as React.RefObject<HTMLDivElement>} className={className} id={id}>
      {children}
    </Component>
  );
}
