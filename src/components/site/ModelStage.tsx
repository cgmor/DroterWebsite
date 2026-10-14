"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { airwayBite } from "@/content/aps";
import { Rotate } from "./icons";
import { useReducedMotion } from "./motion";

/** The model's long axis sits on the diagonal, so the elevations are at ±45°. */
const VIEWS = [
  { id: "orbit", label: "Orbit", orbit: "35deg 70deg 92%" },
  { id: "front", label: "Front", orbit: "45deg 90deg 92%" },
  { id: "side", label: "Side", orbit: "-45deg 90deg 92%" },
  { id: "top", label: "Top", orbit: "45deg 12deg 92%" },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

/** The frosted-resin material reads best well below the default exposure. */
const EXPOSURE = 0.5;

type MV = HTMLElement & {
  cameraOrbit: string;
  autoRotate: boolean;
  resetTurntableRotation?: (theta?: number) => void;
  jumpCameraToGoal?: () => void;
};

/**
 * The rotating 3D Airway Bite on the porcelain field, with view presets.
 * The studio render stands in until the GLB has loaded (and stays if WebGL
 * is unavailable), so the stage never shows an empty box.
 */
export default function ModelStage({ poster = "/aps/renders/device-airway-bite-three-quarter.png" }: { poster?: string }) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<ViewId>("orbit");
  const mvRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = mvRef.current;
    if (!ready || !el) return;
    const onLoad = () => setLoaded(true);
    el.addEventListener("load", onLoad);
    return () => el.removeEventListener("load", onLoad);
  }, [ready]);

  const choose = (id: ViewId) => {
    setView(id);
    const mv = mvRef.current as MV | null;
    if (!mv) return;
    const target = VIEWS.find((x) => x.id === id)!;
    mv.autoRotate = id === "orbit" && !reduced;
    mv.resetTurntableRotation?.(0);
    mv.cameraOrbit = target.orbit;
    if (reduced) mv.jumpCameraToGoal?.();
  };

  return (
    <div className="ms">
      <div className="ms-stage" data-loaded={loaded || undefined}>
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1000px) 700px, 100vw"
          quality={90}
          className="ms-poster"
        />
        {ready && (
          <model-viewer
            ref={mvRef}
            className="ms-viewer"
            src={airwayBite.model.glb}
            alt={`Interactive 3D model of the ${airwayBite.name}. Drag to rotate.`}
            camera-controls=""
            disable-zoom=""
            disable-pan=""
            touch-action="pan-y"
            auto-rotate={reduced ? undefined : ""}
            auto-rotate-delay="0"
            rotation-per-second="18deg"
            interaction-prompt="none"
            interpolation-decay="120"
            camera-orbit={VIEWS[0].orbit}
            exposure={EXPOSURE}
            shadow-intensity="0.55"
            environment-image="neutral"
          />
        )}
      </div>
      <div className="ms-bar">
        <p className="ms-hint">
          <Rotate size={16} />
          Drag to rotate
        </p>
        <div className="seg" role="group" aria-label="Model view">
          {VIEWS.map((x) => (
            <button key={x.id} type="button" className="seg-opt" aria-pressed={x.id === view} onClick={() => choose(x.id)}>
              {x.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
