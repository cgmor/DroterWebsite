"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
  /** e.g. "35deg 70deg 120%" */
  cameraOrbit?: string;
  autoRotate?: boolean;
  exposure?: number;
  shadowIntensity?: number;
};

/**
 * Thin wrapper around <model-viewer>. The web component is registered on the
 * client only, so the server render is an empty, correctly sized box (plus the
 * poster, if given) and nothing shifts when it upgrades.
 */
export default function ModelViewer({
  src,
  alt,
  poster,
  className,
  style,
  cameraOrbit = "35deg 70deg 105%",
  autoRotate = true,
  exposure = 1,
  shadowIntensity = 0.6,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer").then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {ready && (
        <model-viewer
          src={src}
          alt={alt}
          poster={poster}
          camera-controls=""
          touch-action="pan-y"
          auto-rotate={autoRotate ? "" : undefined}
          auto-rotate-delay="0"
          rotation-per-second="18deg"
          interaction-prompt="none"
          camera-orbit={cameraOrbit}
          // React 19 sets this as a property, which model-viewer reads as a number.
          exposure={exposure}
          shadow-intensity={String(shadowIntensity)}
          environment-image="neutral"
          style={{ width: "100%", height: "100%", background: "transparent", outline: "none" }}
        />
      )}
    </div>
  );
}
