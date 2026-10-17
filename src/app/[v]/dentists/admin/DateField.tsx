"use client";

import { useState } from "react";
import { todayInArea } from "@/lib/dentists/config";
import s from "../dentists.module.css";

/** YYYY-MM-DD, `days` after today in his time zone. */
function daysFromToday(days: number): string {
  const [y, m, d] = todayInArea().split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

type Props = {
  id: string;
  name?: string;
  defaultValue?: string | null;
  disabled?: boolean;
  invalid?: boolean;
  /** Controlled use (the upload form). */
  value?: string;
  onChange?: (value: string) => void;
};

/**
 * "Available until": a date, a one-tap "One week" for lecture slides ("they
 * can download it for a week, and then it's gone"), and a way back to no end.
 */
export default function DateField({ id, name = "availableUntil", defaultValue, disabled, invalid, value, onChange }: Props) {
  const [own, setOwn] = useState(defaultValue ?? "");
  const current = value ?? own;
  const set = (next: string) => (onChange ? onChange(next) : setOwn(next));

  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        Available until <span className={s.optional}>(optional)</span>
      </label>
      <div className={s.dateRow}>
        <input
          id={id}
          name={name}
          type="date"
          className={s.input}
          value={current}
          onChange={(e) => set(e.target.value)}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-hint`}
        />
        <button type="button" className="btn btn-quiet" onClick={() => set(daysFromToday(7))} disabled={disabled}>
          <span className="btn-label">One week</span>
        </button>
        {current && (
          <button type="button" className="btn btn-quiet" onClick={() => set("")} disabled={disabled}>
            <span className="btn-label">No end date</span>
          </button>
        )}
      </div>
      <p id={`${id}-hint`} className={s.hint}>
        After this day the file leaves the list and its link stops working. Leave it empty to keep the file until you remove it.
      </p>
    </div>
  );
}
