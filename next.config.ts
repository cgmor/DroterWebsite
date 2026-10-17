import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default; 90 keeps the text in Dr. Droter's lecture slides, the
    // studio renders and the portrait crisp (q75 smears fine detail).
    qualities: [75, 90],
  },
  // The three design versions (/v1, /v2, /v3) became two sites on Oct 15. Links
  // already sent for review land on the matching page of the right site.
  async redirects() {
    const ver = "/:ver(v1|v2|v3)";
    return [
      { source: `${ver}/airway-bite`, destination: "/apsleep/airway-bite", permanent: false },
      { source: `${ver}/appliances`, destination: "/apsleep/appliances", permanent: false },
      { source: `${ver}/understanding-tmd`, destination: "/droter/understanding-tmd", permanent: false },
      { source: `${ver}/conditions/:slug`, destination: "/droter/conditions/:slug", permanent: false },
      { source: `${ver}/conditions`, destination: "/droter/conditions", permanent: false },
      { source: `${ver}/library`, destination: "/droter/library", permanent: false },
      { source: `${ver}/about`, destination: "/droter/about", permanent: false },
      { source: ver, destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
