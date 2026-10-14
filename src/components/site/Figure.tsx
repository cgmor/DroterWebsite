"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { Close, Expand } from "./icons";

type Props = {
  src: string;
  alt: string;
  /** Intrinsic pixel size (the tmd.ts Figure type carries these). */
  width: number;
  height: number;
  caption?: string;
  /** `plate` = framed lecture-slide plate on a mat; `inline` = the image alone with 20px corners. */
  variant?: "plate" | "inline";
  /** next/image sizes for the in-page image. */
  sizes?: string;
  /** Preload when the figure is the page's largest image above the fold. */
  preload?: boolean;
  className?: string;
};

/**
 * Dr. Droter's lecture slides and clinical illustrations as figure plates.
 * Click (or Enter) to enlarge in a modal lightbox; Escape or the backdrop closes it.
 * Spread a tmd.ts `Figure` straight in: <Figure {...fig} />.
 *
 * In the page, a figure is never shown wider than half its source width
 * (`--fig-max`), so every pixel on a 2× screen is a real one: a 1200px slide
 * stops at 600px, a 1024px illustration at 512px. The lightbox shows it larger.
 */
export default function Figure({
  src,
  alt,
  width,
  height,
  caption,
  variant = "plate",
  sizes = "(min-width: 1100px) 760px, 100vw",
  preload,
  className,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();
  const maxStyle = { "--fig-max": `${Math.round(width / 2)}px` } as CSSProperties;

  return (
    <figure className={["fig", `fig-${variant}`, className].filter(Boolean).join(" ")} style={maxStyle}>
      <button type="button" className="fig-trigger" onClick={open} aria-haspopup="dialog">
        <span className="fig-mat">
          <Image src={src} alt={alt} width={width} height={height} sizes={sizes} quality={90} preload={preload} className="fig-img" />
        </span>
        <span className="fig-zoom" aria-hidden="true">
          <Expand size={16} />
        </span>
        <span className="sr-only">Enlarge</span>
      </button>
      {caption && <figcaption className="fig-cap">{caption}</figcaption>}

      <dialog
        ref={dialog}
        className="lb"
        aria-label={caption ?? alt}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="lb-body">
          <Image src={src} alt={alt} width={width} height={height} sizes="100vw" quality={90} className="lb-img" />
          {caption && <p className="lb-cap">{caption}</p>}
        </div>
        <button type="button" className="lb-close" onClick={close} aria-label="Close" autoFocus>
          <Close size={20} />
        </button>
      </dialog>
    </figure>
  );
}
