import type { Metadata } from "next";
import s from "./dentists.module.css";

/**
 * The dentist sharing area (both sites): password page, the shared files, and
 * Dr. Droter's admin page. Never indexed or archived; src/proxy.ts also sends
 * X-Robots-Tag and turns crawlers away before any of this renders.
 */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "same-origin",
};

export default function DentistAreaLayout({ children }: { children: React.ReactNode }) {
  return <div className={s.area}>{children}</div>;
}
