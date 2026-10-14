import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 is the default; 90 keeps the text in Dr. Droter's lecture slides, the
    // studio renders and the portrait crisp (q75 smears fine detail).
    qualities: [75, 90],
  },
};

export default nextConfig;
