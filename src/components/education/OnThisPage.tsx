"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "./icons";
import s from "./education.module.css";

export type ContentsItem = { id: string; label: string };

type Props = {
  items: ContentsItem[];
  /** Accessible name of the navigation landmark. */
  label?: string;
  className?: string;
};

/**
 * In-page contents. Wide screens: a sticky rail of section names along a
 * hairline, the current section marked by a filled node. Narrow screens: a
 * compact bar pinned under the header that names the current section and
 * opens the full list. The current section follows the scroll.
 */
export default function OnThisPage({ items, label = "On this page", className }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const listId = useId();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = Math.min(window.innerHeight * 0.32, 260);
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top - line <= 0) current = el.id;
      }
      // At the very bottom, the last section is current even if short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = targets[targets.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  // Close the compact list on Escape or a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const current = items.find((it) => it.id === active);

  return (
    <nav ref={navRef} className={[s.toc, className].filter(Boolean).join(" ")} aria-label={label} data-open={open || undefined}>
      <button type="button" className={s.tocToggle} aria-expanded={open} aria-controls={listId} onClick={() => setOpen((o) => !o)}>
        <span className={s.tocToggleLabel}>Contents</span>
        <span className={s.tocCurrent}>{current?.label ?? items[0]?.label}</span>
        <ChevronDown size={18} className={s.tocChevron} />
      </button>
      <p className={s.tocTitle} aria-hidden="true">
        {label}
      </p>
      <ol className={s.tocList} id={listId}>
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={s.tocLink}
              aria-current={active === it.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
