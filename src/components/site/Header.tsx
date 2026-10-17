"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, distributor, doctor } from "@/content/aps";
import SiteMark from "./SiteMark";
import h from "./header.module.css";
import { ArrowUpRight, Close, Menu } from "./icons";
import { NAV, href, routes, tel, type SiteId } from "./links";

/**
 * The header's one button. drdroter.com: call the office. APSleep.com leads
 * with patients, so its button is the dentist route; the Great Lakes order
 * button appears only on the Airway Bite page ("the lead in I don't want is
 * the airway bite").
 */
function siteAction(v: SiteId, rest: string) {
  if (v === "droter") return { href: tel(contact.officePhone), label: `Call ${contact.officePhone}`, external: false };
  if (rest === routes.airwayBite || rest.startsWith(`${routes.airwayBite}/`)) {
    return { href: distributor.url, label: distributor.cta, external: true };
  }
  return { href: href(v, routes.library), label: "For dentists", external: false };
}

/**
 * Sticky site header: brand, primary nav and the site's one action. Below 1180px the nav
 * moves into a sheet menu.
 */
export default function Header({ v }: { v: SiteId }) {
  const pathname = usePathname() ?? `/${v}`;
  const rest = pathname.slice(v.length + 1) || "/";
  const action = siteAction(v, rest);
  /* The nav is the same on every page: the site's standing button (APSleep.com:
     "For dentists") carries its own page, so the nav never repeats it, even on
     a page whose button is something else (the Airway Bite page's order
     button). On the button's own page the button is marked as the current page. */
  const standing = siteAction(v, routes.home);
  const nav = NAV[v].filter((item) => href(v, item.path) !== standing.href);
  const actionCurrent = !action.external && action.href === href(v, rest) ? "page" : undefined;
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1180px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.documentElement.classList.add("aps-locked");
    const t = window.setTimeout(() => firstRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("aps-locked");
    };
  }, [open]);

  const close = () => setOpen(false);
  const isActive = (path: string) => rest === path || rest.startsWith(`${path}/`);

  return (
    <header className="hd" data-open={open || undefined}>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div className="wrap hd-bar">
        <Link href={href(v)} className="hd-logo" aria-label={`${v === "apsleep" ? "ArrowPath Sleep" : doctor.name}, home`} onClick={close}>
          <SiteMark v={v} className="hd-lockup" />
        </Link>

        <nav aria-label="Main" className="hd-nav">
          <ul>
            {nav.map((item) => (
              <li key={item.path}>
                <Link href={href(v, item.path)} className="hd-link" aria-current={isActive(item.path) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hd-end">
          <a
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
            aria-current={actionCurrent}
            className={`btn btn-primary btn-sm hd-order ${h.order}`}
          >
            <span className="btn-label">{action.label}</span>
            {action.external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="hd-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="site-menu" className="hd-sheet">
        <div className="wrap hd-sheet-inner">
          <nav aria-label="Main, menu">
            <ul className="hd-sheet-list">
              {nav.map((item, i) => (
                <li key={item.path} style={{ "--i": i } as React.CSSProperties}>
                  <Link
                    ref={i === 0 ? firstRef : undefined}
                    href={href(v, item.path)}
                    className="hd-sheet-link"
                    aria-current={isActive(item.path) ? "page" : undefined}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hd-sheet-foot">
            <a
              href={action.href}
              {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
              aria-current={actionCurrent}
              className={`btn btn-primary btn-block ${h.action}`}
            >
              <span className="btn-label">{action.label}</span>
              {action.external && <ArrowUpRight size={16} className="btn-icon" />}
              {action.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
            <p className="hd-sheet-meta">
              <span>Office</span>
              <a href={tel(contact.officePhone)} className="num">
                {contact.officePhone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
