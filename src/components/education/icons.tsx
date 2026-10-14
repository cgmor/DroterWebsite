/**
 * Education-only icons, drawn on the same 20-unit grid and 1.5 stroke as
 * `src/components/site/icons.tsx` so they sit in one family.
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

/** An important notice: a circle with an exclamation. */
export const Alert = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="10" r="7.25" />
    <path d="M10 6.25v4.5" />
    <circle cx="10" cy="13.6" r="0.35" fill="currentColor" />
  </Svg>
);

/** Restricted to dentists. */
export const Lock = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.25" y="8.75" width="11.5" height="8" rx="2" />
    <path d="M6.75 8.75V6.5a3.25 3.25 0 0 1 6.5 0v2.25" />
  </Svg>
);

/** Not yet published. */
export const Clock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="10" cy="10" r="7.25" />
    <path d="M10 6v4.25l2.75 1.75" />
  </Svg>
);

export const ChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 7.75 5 5 5-5" />
  </Svg>
);

export const ArrowLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16.5 10h-13M8.5 5l-5 5 5 5" />
  </Svg>
);
