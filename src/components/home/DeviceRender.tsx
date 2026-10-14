import Image from "next/image";
import type { CSSProperties } from "react";
import s from "./home.module.css";

/**
 * The studio renders in /aps/renders are 2000 × 2000 transparent PNGs with
 * the device in the middle. To show the device at scale without the
 * transparent margin widening the layout (or the page on a phone), the box is
 * cut to the device's own silhouette plus a little air:
 *  - the outer box has the silhouette's aspect ratio;
 *  - the inner frame is the box's width by the render's full height, so
 *    `object-fit: cover` scales the square to that height and `object-position`
 *    lands the silhouette exactly on the box's width;
 *  - negative block margins (a percentage of the width) take up the empty
 *    space above and below.
 * No element is wider than the box. Silhouettes are the alpha bounding boxes
 * measured from the PNGs (x0, y0, x1, y1); re-measure if a render is re-exported.
 */
const RENDERS = {
  "three-quarter": { src: "/aps/renders/device-airway-bite-three-quarter.png", box: [295, 591, 1597, 1729] },
  side: { src: "/aps/renders/device-airway-bite-side.png", box: [284, 561, 1708, 1479] },
  top: { src: "/aps/renders/device-airway-bite-top.png", box: [556, 344, 1443, 1660] },
} as const;

export type RenderView = keyof typeof RENDERS;

const SIDE = 2000;
/** Air kept around the silhouette, in render pixels. */
const PAD = 40;

const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

function frame(view: RenderView) {
  const [x0, y0, x1, y1] = RENDERS[view].box;
  const left = Math.max(0, x0 - PAD);
  const top = Math.max(0, y0 - PAD);
  const w = Math.min(SIDE, x1 + PAD) - left;
  const h = Math.min(SIDE, y1 + PAD) - top;
  return {
    box: { aspectRatio: `${w} / ${h}` } satisfies CSSProperties,
    frame: { aspectRatio: `${w} / ${SIDE}`, marginTop: `-${pct(top / w)}`, marginBottom: `-${pct((SIDE - top - h) / w)}` } satisfies CSSProperties,
    img: { objectFit: "cover", objectPosition: `${pct(left / (SIDE - w))} 50%` } satisfies CSSProperties,
  };
}

type Props = {
  view?: RenderView;
  alt: string;
  /**
   * The rendered image is wider than the box (the transparent margin is cut
   * away), about 1.4× for the three-quarter view: size for that.
   */
  sizes: string;
  eager?: boolean;
  className?: string;
};

/** One device render, cut to its silhouette. Server-safe; also used inside the client DeviceStage. */
export default function DeviceRender({ view = "three-quarter", alt, sizes, eager, className }: Props) {
  const f = frame(view);
  return (
    <div className={[s.render, className].filter(Boolean).join(" ")} style={f.box}>
      <div className={s.renderFrame} style={f.frame}>
        <Image
          src={RENDERS[view].src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className={s.renderImg}
          style={f.img}
        />
      </div>
    </div>
  );
}
