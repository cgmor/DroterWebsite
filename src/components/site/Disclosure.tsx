"use client";

import { useId, useState, type ReactNode } from "react";
import { Minus, Plus } from "./icons";

type Props = {
  /** The complete version, revealed on expand. Always in the DOM (inert while closed). */
  children: ReactNode;
  /** Optional summary shown above the control (or render the summary yourself before it). */
  summary?: ReactNode;
  label?: string;
  collapseLabel?: string;
  defaultOpen?: boolean;
  className?: string;
};

/**
 * "Expand the full version": teach in layers. The panel animates its height
 * (grid rows 0fr → 1fr) with an exponential ease-out; reduced motion snaps.
 */
export default function Disclosure({
  children,
  summary,
  label = "Expand the full version",
  collapseLabel = "Show the summary only",
  defaultOpen = false,
  className,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className={["dsc", className].filter(Boolean).join(" ")} data-open={open || undefined}>
      {summary && <div className="dsc-summary">{summary}</div>}
      <button type="button" className="dsc-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="dsc-icon" aria-hidden="true">
          <Plus size={16} className="dsc-plus" />
          <Minus size={16} className="dsc-minus" />
        </span>
        <span>{open ? collapseLabel : label}</span>
      </button>
      <div className="dsc-panel" id={id} inert={!open}>
        <div className="dsc-clip">
          <div className="dsc-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
