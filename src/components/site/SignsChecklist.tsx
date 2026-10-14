"use client";

import { useId, useState } from "react";
import { understanding } from "@/content/tmd";
import { Check } from "./icons";

type Props = {
  /** Show the heading ("Signs and symptoms"). Turn off when the page sets its own. */
  showHeading?: boolean;
  id?: string;
};

/**
 * Interactive signs-and-symptoms list from tmd.ts `understanding.signs`.
 * Educational only: nothing is stored or sent, and the count line never
 * suggests a diagnosis. Place inside a Section.
 */
export default function SignsChecklist({ showHeading = true, id = "signs" }: Props) {
  const s = understanding.signs;
  const [checked, setChecked] = useState<boolean[]>(() => s.items.map(() => false));
  const uid = useId();
  const count = checked.filter(Boolean).length;
  const total = s.items.length;

  const line = count === 0 ? "Nothing checked yet." : `${count} of ${total} checked.`;

  return (
    <div className="sc" id={id}>
      <div className="sc-head">
        {showHeading && (
          <h2 className="t-h2" id={`${id}-title`}>
            {s.heading}
          </h2>
        )}
        <p className="t-lead sc-intro">{s.intro}</p>
      </div>

      <fieldset className="sc-set" aria-labelledby={showHeading ? `${id}-title` : undefined} aria-describedby={`${uid}-count`}>
        {!showHeading && <legend className="sr-only">{s.heading}</legend>}
        <ul className="sc-list">
          {s.items.map((item, i) => (
            <li key={item}>
              <label className="sc-item">
                <input
                  type="checkbox"
                  className="sc-input"
                  checked={checked[i]}
                  onChange={(e) => setChecked((prev) => prev.map((x, j) => (j === i ? e.target.checked : x)))}
                />
                <span className="sc-box" aria-hidden="true">
                  <Check size={16} />
                </span>
                <span className="sc-text">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="sc-foot">
        <p className="sc-count" id={`${uid}-count`} aria-live="polite" data-some={count > 0 || undefined}>
          {line}
        </p>
        <p className="sc-note">{s.note}</p>
        {count > 0 && (
          <button type="button" className="lnk sc-clear" onClick={() => setChecked(s.items.map(() => false))}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
