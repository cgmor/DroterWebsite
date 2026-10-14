"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "@/components/site/icons";
import s from "./education.module.css";

type Props = {
  items: { q: string; a: string }[];
  /** Heading level of each question (h3 under a section h2). */
  as?: "h3" | "h4";
};

/**
 * Accessible accordion: each question is a heading wrapping a button
 * (aria-expanded / aria-controls); answers stay in the DOM and are inert while
 * closed. Height eases open with the same grid-rows motion as Disclosure.
 */
export default function Faq({ items, as: H = "h3" }: Props) {
  const [open, setOpen] = useState<number[]>([]);
  const uid = useId();

  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className={s.faq}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <div key={item.q} className={s.faqItem} data-open={isOpen || undefined}>
            <H className={s.faqQ}>
              <button type="button" id={btnId} className={s.faqBtn} aria-expanded={isOpen} aria-controls={panelId} onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className={s.faqIcon} aria-hidden="true">
                  <Plus size={16} className={s.faqPlus} />
                  <Minus size={16} className={s.faqMinus} />
                </span>
              </button>
            </H>
            <div className={s.faqPanel} id={panelId} role="region" aria-labelledby={btnId} inert={!isOpen}>
              <div className={s.faqClip}>
                <p className={s.faqA}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
