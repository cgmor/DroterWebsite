import type { ReactNode } from "react";
import { Alert } from "./icons";
import s from "./education.module.css";

type Props = {
  children: ReactNode;
  /**
   * `important`: a clinical warning (ink frame + alert mark, never a side stripe).
   * `note`: a quiet caveat on a soft panel.
   */
  kind?: "important" | "note";
  className?: string;
};

/** An important notice or a quiet caveat, set inside the reading column. */
export default function Notice({ children, kind = "important", className }: Props) {
  return (
    <div className={[s.notice, kind === "note" ? s.noticeNote : s.noticeImportant, className].filter(Boolean).join(" ")} role="note">
      {kind === "important" && <Alert size={22} className={s.noticeIcon} />}
      <p className={s.noticeText}>{children}</p>
    </div>
  );
}
