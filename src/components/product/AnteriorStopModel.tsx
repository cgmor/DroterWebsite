"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rotate } from "@/components/site/icons";
import { useReducedMotion } from "@/components/site/motion";
import s from "./product.module.css";

/**
 * The two APS Temp Anterior Stop models in /aps/3d. Labels and the 3.0 mm
 * designation are traced to the models' own node names:
 * "APS Temp Anterior Stop 3.0 mm Narrow" and "APS Temp Anterior Stop 3.0 mm Low Vert".
 * Each poster is a Blender studio render of the same GLB, taken from the
 * viewer's opening orbit (see public/aps/renders/README-provenance.txt).
 */
const VARIANTS = [
  {
    id: "narrow",
    label: "Narrow",
    src: "/aps/3d/temp-anterior-stop-narrow.glb",
    poster: "/aps/renders/temp-anterior-stop-narrow.png",
  },
  {
    id: "low-vert",
    label: "Low vertical",
    src: "/aps/3d/temp-anterior-stop-low-vert.glb",
    poster: "/aps/renders/temp-anterior-stop-low-vert.png",
  },
] as const;

type VariantId = (typeof VARIANTS)[number]["id"];
/** "still": the model failed or is taking too long; the studio render stays. */
type Status = "loading" | "loaded" | "still";

/** Same frosted-resin exposure as the Airway Bite stage. */
const EXPOSURE = 0.5;
/** The renders were taken from this orbit, so the poster hands over to the model without a jump. */
const ORBIT = "150deg 56deg 96%";
/** After this long the render is treated as the view; a late load still fades the model in. */
const LOAD_TIMEOUT_MS = 12000;

/**
 * Rotating 3D model of the APS Temp Anterior Stop with a Narrow / Low vertical
 * switch. Built on <model-viewer> like the foundation's ModelStage: zoom and
 * pan are off so the page keeps scrolling, auto-rotate honours reduced motion.
 * The studio render of the chosen version holds the stage until the GLB has
 * loaded, and stays as the view if the model errors, times out or WebGL is off.
 */
export default function AnteriorStopModel({ name }: { name: string }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [variant, setVariant] = useState<VariantId>("narrow");
  const [status, setStatus] = useState<Status>("loading");
  const mvRef = useRef<HTMLElement>(null);
  const current = VARIANTS.find((x) => x.id === variant)!;

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setStatus("still");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = mvRef.current;
    if (!ready || !el) return;
    const onLoad = () => setStatus("loaded");
    const onError = () => setStatus("still");
    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [ready]);

  // Never sit on a pending stage: each version gets a bounded wait.
  useEffect(() => {
    const t = window.setTimeout(() => setStatus((st) => (st === "loading" ? "still" : st)), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [variant]);

  const choose = (id: VariantId) => {
    if (id === variant) return;
    setStatus("loading");
    setVariant(id);
  };

  const loaded = status === "loaded";

  return (
    <figure className={`ms ${s.model}`}>
      <div className={`ms-stage ${s.modelStage}`} data-loaded={loaded || undefined}>
        {VARIANTS.map((x) => (
          <Image
            key={x.id}
            src={x.poster}
            alt={x.id === variant && !loaded ? `${name}, ${x.label.toLowerCase()} version: studio render` : ""}
            aria-hidden={x.id !== variant || loaded || undefined}
            fill
            sizes="(min-width: 1000px) 680px, 100vw"
            quality={90}
            className={s.modelPoster}
            data-active={x.id === variant || undefined}
          />
        ))}
        {ready && (
          <model-viewer
            ref={mvRef}
            className="ms-viewer"
            src={current.src}
            alt={`Interactive 3D model of the ${name}, ${current.label.toLowerCase()} version. Drag to rotate.`}
            camera-controls=""
            disable-zoom=""
            disable-pan=""
            touch-action="pan-y"
            auto-rotate={reduced ? undefined : ""}
            auto-rotate-delay="0"
            rotation-per-second="18deg"
            interaction-prompt="none"
            camera-orbit={ORBIT}
            exposure={EXPOSURE}
            shadow-intensity="0.55"
            environment-image="neutral"
          >
            {/* The studio render is the loading state; suppress model-viewer's own bar. */}
            <div slot="progress-bar" />
          </model-viewer>
        )}
        <p className="sr-only" role="status">
          {status === "still" ? "The 3D model isn’t available; a studio render is shown." : ""}
        </p>
      </div>
      <div className="ms-bar">
        <p className="ms-hint">
          {status === "still" ? (
            "Studio render"
          ) : (
            <>
              <Rotate size={16} />
              Drag to rotate
            </>
          )}
        </p>
        <div className="seg" role="group" aria-label="Model version">
          {VARIANTS.map((x) => (
            <button key={x.id} type="button" className="seg-opt" aria-pressed={x.id === variant} onClick={() => choose(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      </div>
      <figcaption className={s.modelCap}>
        {name}, <span className="mono">3.0 mm</span> · {current.label}
      </figcaption>
    </figure>
  );
}
