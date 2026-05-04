"use client";

import Image from "next/image";
import { useState } from "react";

interface StageData {
  id: string;
  label: string;
  color: string;
  src: string;
  desc: string;
}

const stages: StageData[] = [
  {
    id: "normal",
    label: "Normal",
    color: "#3A7BD5",
    src: "/conditions/osteoarthritis/zoomin/TMJ1.png",
    desc: "Healthy joint. Smooth cartilage covers the condyle. The disc sits centered between the fossa and condyle. No friction, no wear.",
  },
  {
    id: "early",
    label: "Early OA",
    color: "#5B93DE",
    src: "/conditions/osteoarthritis/zoomin/TMJ2.png",
    desc: "Cartilage begins to soften and thin from past trauma. Mild joint soreness may appear. Subtle changes visible on CBCT.",
  },
  {
    id: "moderate",
    label: "Moderate OA",
    color: "#D4874D",
    src: "/conditions/osteoarthritis/zoomin/TMJ3.png",
    desc: "Significant cartilage loss. Friction causes bone changes — the condyle begins to flatten. Pain with chewing is common. The disc may thin or displace.",
  },
  {
    id: "advanced",
    label: "Advanced OA",
    color: "#C45A3C",
    src: "/conditions/osteoarthritis/zoomin/TMJ4.png",
    desc: "Cartilage is largely gone. The condyle flattens and develops irregularities. Disc damage is severe. Pain and limited motion are persistent.",
  },
  {
    id: "severe",
    label: "Severe OA",
    color: "#A83C28",
    src: "/conditions/osteoarthritis/zoomin/TMJ5.png",
    desc: "Bone grinds on bone (eburnation). The condyle is flattened and irregular with osteophytes. The disc is severely damaged or absent.",
  },
];

export default function OsteoarthritisDiagram() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="bg-[var(--soft-gray)] rounded-xl p-6 md:p-8">
      <h3 className="text-lg font-bold text-[var(--deep-navy)] mb-1">
        Osteoarthritis Progression
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Click any stage to see how the joint degrades over time.
      </p>

      <div className="bg-white rounded-lg border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => setActiveIdx(i)}
                aria-pressed={activeIdx === i}
                className="flex flex-col items-center flex-1 min-w-0 group cursor-pointer"
              >
                <div
                  className="relative w-full aspect-square transition-all"
                  style={{
                    opacity: activeIdx === i ? 1 : 0.35,
                  }}
                >
                  <Image
                    src={stage.src}
                    alt={`${stage.label} TMJ cross-section`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 18vw, 140px"
                  />
                </div>
                <p
                  className="text-[10px] sm:text-xs font-semibold mt-1 transition-opacity"
                  style={{
                    color: stage.color,
                    opacity: activeIdx === i ? 1 : 0.45,
                  }}
                >
                  {stage.label}
                </p>
              </button>
              {i < stages.length - 1 && (
                <svg
                  className="flex-shrink-0 w-4 sm:w-6 h-3 -mt-4 text-gray-300"
                  viewBox="0 0 24 12"
                  fill="none"
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="19"
                    y2="6"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                  <polygon points="18,3 23,6 18,9" fill="currentColor" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {stages.map((stage, i) => (
          <button
            key={stage.id}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-md text-sm transition-all ${
              activeIdx === i
                ? "text-white font-medium shadow-sm"
                : "bg-white text-[var(--text-secondary)] hover:bg-gray-100 border border-gray-200"
            }`}
            style={activeIdx === i ? { backgroundColor: stage.color } : {}}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <div className="flex items-start gap-3">
        <div
          className="w-1.5 rounded-full self-stretch flex-shrink-0 mt-1"
          style={{ backgroundColor: stages[activeIdx].color }}
        />
        <div>
          <p className="font-semibold text-[var(--deep-navy)] mb-1">
            {stages[activeIdx].label}
          </p>
          <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
            {stages[activeIdx].desc}
          </p>
        </div>
      </div>
    </div>
  );
}
