"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ApsLogo from "@/components/shared/ApsLogo";
import { contact, distributor } from "@/content/aps";
import h from "./header.module.css";
import { ArrowUpRight, Close, Menu } from "./icons";
import { AUDIENCES, NAV, href, tel, type VersionId } from "./links";

/** Which audience the current path belongs to, if any. */
function audienceFor(rest: string) {
  return AUDIENCES.find((a) => a.owns.some((p) => rest === p || rest.startsWith(`${p}/`)))?.id ?? null;
}

function AudienceSwitch({ v, rest, onNavigate, className }: { v: VersionId; rest: string; onNavigate?: () => void; className?: string }) {
  const active = audienceFor(rest);
  return (
    <nav aria-label="Audience" className={["aud", className].filter(Boolean).join(" ")}>
      {AUDIENCES.map((a) => (
        <Link
          key={a.id}
          href={href(v, a.path)}
          className="aud-opt"
          data-on={active === a.id || undefined}
          aria-current={rest === a.path ? "page" : undefined}
          onClick={onNavigate}
        >
          {a.label}
        </Link>
      ))}
    </nav>
  );
}

/**
 * Sticky site header: lockup, primary nav, the Dentists | Patients switch and
 * the Order action. Below 1180px the nav and switch move into a sheet menu.
 */
export default function Header({ v }: { v: VersionId }) {
  const pathname = usePathname() ?? `/${v}`;
  const rest = pathname.slice(v.length + 1) || "/";
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
        <Link href={href(v)} className="hd-logo" aria-label="ArrowPath Sleep, home" onClick={close}>
          <ApsLogo variant="lockup" className="hd-lockup" />
        </Link>

        <nav aria-label="Main" className="hd-nav">
          <ul>
            {NAV.map((item) => (
              <li key={item.path}>
                <Link href={href(v, item.path)} className="hd-link" aria-current={isActive(item.path) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hd-end">
          <AudienceSwitch v={v} rest={rest} className={`hd-aud ${h.aud}`} />
          <a href={distributor.url} target="_blank" rel="noopener" className={`btn btn-primary btn-sm hd-order ${h.order}`}>
            <span className="btn-label">{distributor.cta}</span>
            <span className="sr-only"> (opens in a new tab)</span>
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
          <AudienceSwitch v={v} rest={rest} onNavigate={close} className="aud-block" />
          <nav aria-label="Main, menu">
            <ul className="hd-sheet-list">
              {NAV.map((item, i) => (
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
            <a href={distributor.url} target="_blank" rel="noopener" className="btn btn-primary btn-block">
              <span className="btn-label">{distributor.cta}</span>
              <ArrowUpRight size={16} className="btn-icon" />
              <span className="sr-only"> (opens in a new tab)</span>
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
