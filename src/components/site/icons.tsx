/**
 * Line icons on a 20-unit grid, one stroke weight (1.5), round caps.
 * Stroke follows currentColor; size defaults to 18px. Decorative by default.
 */
type IconProps = { size?: number; className?: string };

function Svg({ size = 18, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 10h13M11.5 5l5 5-5 5" />
  </Svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 14 14 6M7 5.75h7.25V13" />
  </Svg>
);

export const ArrowDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3.5v13M5 11.5l5 5 5-5" />
  </Svg>
);

export const Play = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.25 4.2v11.6a.6.6 0 0 0 .9.52l9.9-5.8a.6.6 0 0 0 0-1.04l-9.9-5.8a.6.6 0 0 0-.9.52Z" fill="currentColor" stroke="none" />
  </Svg>
);

export const Download = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 3.5v9M6 8.75l4 4 4-4M4 16.25h12" />
  </Svg>
);

export const Plus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M10 4v12M4 10h12" />
  </Svg>
);

export const Minus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 10h12" />
  </Svg>
);

export const Menu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7h14M3 13h14" />
  </Svg>
);

export const Close = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 5 10 10M15 5 5 15" />
  </Svg>
);

export const Rotate = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16.25 10a6.25 6.25 0 1 1-1.83-4.42" />
    <path d="M15 2.75v3.5h-3.5" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 3.25H4.6a1.1 1.1 0 0 0-1.1 1.2c.6 6.3 5.6 11.3 11.9 11.9a1.1 1.1 0 0 0 1.2-1.1V12.9l-3.3-1.3-1.6 1.6a8.5 8.5 0 0 1-4.6-4.6l1.6-1.6L7 3.25Z" />
  </Svg>
);

export const Expand = (p: IconProps) => (
  <Svg {...p}>
    <path d="M11.5 3.5h5v5M8.5 16.5h-5v-5M16.5 3.5 11 9M3.5 16.5 9 11" />
  </Svg>
);

export const Check = (p: IconProps) => (
  <Svg {...p}>
    <path d="m4.5 10.5 3.5 3.5 7.5-8" />
  </Svg>
);

export const Document = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 2.75h6.5L15.25 6.5v10.75H5Z" />
    <path d="M11.25 2.75V6.75h4" />
  </Svg>
);
