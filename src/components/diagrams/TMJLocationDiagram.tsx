"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TMJLocationDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-10"
    >
      {/* Container with SVG arrow spanning the full width */}
      <div className="relative max-w-2xl mx-auto">
        <div className="grid grid-cols-[1fr_1.5fr] items-center gap-0">
          {/* Left — label */}
          <div className="pr-4 py-8">
            <p className="text-sm text-[var(--text-secondary)] mb-1">Healthy</p>
            <p className="text-xl font-bold text-[var(--deep-navy)] leading-tight mb-1">
              Temporomandibular<br />Joint
            </p>
            <p className="text-2xl font-bold text-[var(--medium-blue)]">
              &ldquo;TMJ&rdquo;
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
              Sits just in front of each ear, connecting the jawbone to the skull.
            </p>
          </div>

          {/* Right — image */}
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/conditions/osteoarthritis/TMJ-NoArrow.png"
              alt="Anatomical illustration of the skull showing the temporomandibular joint area with muscles"
              width={800}
              height={650}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* SVG arrow spanning from label area to TMJ on the image */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 205 100"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="tmj-head"
              markerWidth="6"
              markerHeight="5"
              refX="5.5"
              refY="2.5"
              orient="auto"
            >
              <polygon points="0 0, 6 2.5, 0 5" fill="#4CAF50" />
            </marker>
          </defs>
          <line
            x1="74"
            y1="38"
            x2="152"
            y2="55"
            stroke="#4CAF50"
            strokeWidth="1.2"
            markerEnd="url(#tmj-head)"
          />
        </svg>
      </div>
    </motion.div>
  );
}
