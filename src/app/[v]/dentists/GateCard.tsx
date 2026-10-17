import { Button } from "@/components/site/Button";
import { Section } from "@/components/site/Section";
import SiteMark from "@/components/site/SiteMark";
import type { AreaSite } from "@/lib/dentists/config";
import PasswordField from "./PasswordField";
import s from "./dentists.module.css";

const MESSAGES: Record<string, string> = {
  wrong: "That password didn't work. Check it and try again.",
  wait: "Too many tries. Wait a minute, then try again.",
  setup: "Sign-in isn't available yet.",
  expired: "The form expired. Try again.",
};

type Props = {
  v: AreaSite;
  title: string;
  /** One short neutral line under the title. */
  line: string;
  action: string;
  submitLabel: string;
  error?: string;
  /** Shown when nothing went wrong, e.g. after signing out. */
  status?: string;
  next?: string;
};

/**
 * The password page: one white card centred on a mist band. A plain form that
 * posts to a route handler, so it works before (or without) JavaScript.
 * The site's own mark closes the card.
 */
export default function GateCard({ v, title, line, action, submitLabel, error, status, next }: Props) {
  const message = error ? (MESSAGES[error] ?? MESSAGES.wrong) : status;
  return (
    <Section tone="mist" space="lg" labelledBy="gate-title" className={s.gateBand}>
      <div className={s.gate}>
        <div className={s.card}>
          <h1 id="gate-title" className={s.cardTitle}>
            {title}
          </h1>
          <p className={s.cardLine}>{line}</p>
          <form method="post" action={action} className={s.form}>
            <input type="hidden" name="site" value={v} />
            {next && <input type="hidden" name="next" value={next} />}
            <label htmlFor="gate-password" className={s.label}>
              Password
            </label>
            <PasswordField id="gate-password" invalid={!!error} describedBy={message ? "gate-message" : undefined} />
            {message && (
              <p id="gate-message" role={error ? "alert" : "status"} className={`${s.message} ${error ? s.error : s.quietMessage}`}>
                {message}
              </p>
            )}
            <Button type="submit" block className={s.submit}>
              {submitLabel}
            </Button>
          </form>
          <div className={s.cardFoot}>
            <SiteMark v={v} />
          </div>
        </div>
      </div>
    </Section>
  );
}
