"use client";

import { useState } from "react";
import s from "./dentists.module.css";

type Props = {
  id: string;
  invalid?: boolean;
  describedBy?: string;
  autoComplete?: "current-password" | "off";
};

/**
 * The password input with a Show / Hide toggle: the dentist password is three
 * words and a number, said aloud, so seeing what you typed helps.
 */
export default function PasswordField({ id, invalid, describedBy, autoComplete = "current-password" }: Props) {
  const [shown, setShown] = useState(false);
  return (
    <div className={s.fieldWrap}>
      <input
        id={id}
        name="password"
        type={shown ? "text" : "password"}
        className={`${s.input} ${s.password}`}
        autoComplete={autoComplete}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        required
        maxLength={200}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        autoFocus
      />
      <button
        type="button"
        className={s.reveal}
        aria-controls={id}
        onClick={() => setShown((v) => !v)}
      >
        {shown ? "Hide" : "Show"}
        <span className="sr-only"> password</span>
      </button>
    </div>
  );
}
