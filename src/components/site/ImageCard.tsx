import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";

type Props = {
  href: string;
  image: { src: string; alt: string };
  title: string;
  /** One line under the title. */
  line?: string;
  /** Small trailing detail: a duration, a format ("PDF"), a count. */
  meta?: string;
  /** Media ratio. */
  ratio?: "4/3" | "16/10" | "3/2" | "1/1" | "4/5";
  /** `cover` crops to the ratio; `contain` shows the whole image on the field (renders, slides). */
  fit?: "cover" | "contain";
  /** Media field behind the image. Porcelain matches the stills and renders. */
  field?: "porcelain" | "mist" | "white" | "night";
  /** Opens in a new tab. Implied for http(s). */
  external?: boolean;
  as?: "h2" | "h3" | "h4";
  sizes?: string;
  className?: string;
};

/** Rounded (20px) image card: media, title, one line. The whole card is the link. */
export default function ImageCard({
  href,
  image,
  title,
  line,
  meta,
  ratio = "4/3",
  fit = "cover",
  field = "porcelain",
  external,
  as: H = "h3",
  sizes = "(min-width: 1100px) 420px, (min-width: 700px) 50vw, 100vw",
  className,
}: Props) {
  const isExternal = external ?? /^https?:/.test(href);
  const plain = isExternal || /\.(pdf|mp4)$/.test(href);
  const Arrow = isExternal ? ArrowUpRight : ArrowRight;
  const label = (
    <>
      {title}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  return (
    <article className={["ic", className].filter(Boolean).join(" ")}>
      <div className={`ic-media field-${field} fit-${fit}`} style={{ aspectRatio: ratio.replace("/", " / ") }}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="ic-img" />
      </div>
      <div className="ic-body">
        <H className="ic-title">
          {plain ? (
            <a href={href} className="ic-link" target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener" : undefined}>
              {label}
            </a>
          ) : (
            <Link href={href} className="ic-link">
              {label}
            </Link>
          )}
        </H>
        {line && <p className="ic-line">{line}</p>}
        <p className="ic-foot" aria-hidden={meta ? undefined : true}>
          {meta && <span className="ic-meta">{meta}</span>}
          <Arrow size={18} className="ic-arrow" />
        </p>
      </div>
    </article>
  );
}
