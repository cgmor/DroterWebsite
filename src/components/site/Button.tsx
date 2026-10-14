import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Phone, Play } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonIcon = "arrow" | "external" | "down" | "play" | "download" | "phone" | "none";

type Common = {
  children: ReactNode;
  /** primary = signal-blue pill (one per view), secondary = outlined pill, quiet = text link with arrow. */
  variant?: ButtonVariant;
  size?: "md" | "sm";
  /** Icon after the label (`play` sits before it). Defaults: external links → "external", quiet → "arrow". */
  icon?: ButtonIcon;
  /** Stretch to the container width (mobile menus, cards). */
  block?: boolean;
  className?: string;
};

const ICONS = {
  arrow: ArrowRight,
  external: ArrowUpRight,
  down: ArrowDown,
  play: Play,
  download: Download,
  phone: Phone,
} as const;

function classes({ variant = "primary", size = "md", block, className }: Partial<Common>) {
  return ["btn", `btn-${variant}`, size === "sm" && "btn-sm", block && "btn-block", className].filter(Boolean).join(" ");
}

function Inner({ children, icon }: { children: ReactNode; icon: ButtonIcon }) {
  const Icon = icon === "none" ? null : ICONS[icon];
  const lead = icon === "play" || icon === "phone";
  return (
    <>
      {Icon && lead && <Icon size={16} className="btn-icon btn-icon-lead" />}
      <span className="btn-label">{children}</span>
      {Icon && !lead && <Icon size={16} className="btn-icon" />}
    </>
  );
}

type LinkProps = Common & {
  href: string;
  /** Opens in a new tab with rel="noopener". Implied for http(s) URLs. */
  external?: boolean;
  /** Plain <a> (downloads, tel:, hash links on the same page). */
  plain?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal paths use next/link; http(s) opens in a new tab. */
export function ButtonLink({ href, external, plain, variant = "primary", size, icon, block, className, children, ...rest }: LinkProps) {
  const isExternal = external ?? /^https?:/.test(href);
  const ic: ButtonIcon = icon ?? (isExternal ? "external" : variant === "quiet" ? "arrow" : "none");
  const cls = classes({ variant, size, block, className });

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener" className={cls} {...rest}>
        <Inner icon={ic}>{children}</Inner>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (plain || /^(tel:|mailto:|#)/.test(href) || /\.(pdf|mp4)$/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        <Inner icon={ic}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner icon={ic}>{children}</Inner>
    </Link>
  );
}

type ButtonProps = Common & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

/** A real <button> with the same variants. Defaults to type="button". */
export function Button({ variant = "primary", size, icon = "none", block, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={classes({ variant, size, block, className })} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
