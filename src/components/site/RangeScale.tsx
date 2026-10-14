/**
 * Card-ruler scale for the range of jaw movement: 0–12 mm, full range
 * typically 10–12 mm (solid to 10, dashed to 12), starting target at half the
 * range. Drawn from airwayBite.summaryLong and steps 4–5.
 */
export default function RangeScale({ className }: { className?: string }) {
  const x0 = 8;
  const unit = 26; // viewBox units per mm
  const x = (mm: number) => x0 + mm * unit;
  const ticks = Array.from({ length: 25 }, (_, i) => i / 2);

  return (
    <figure className={["rs", className].filter(Boolean).join(" ")}>
      <svg
        viewBox={`0 0 ${x(12) + 10} 56`}
        className="rs-svg"
        role="img"
        aria-label="Scale from 0 to 12 millimetres. The full range of movement typically ends between 10 and 12 millimetres; the starting target sits at half the range."
      >
        <line x1={x(0)} x2={x(10)} y1={7} y2={7} className="rs-range" />
        <line x1={x(10)} x2={x(12)} y1={7} y2={7} className="rs-range rs-range-var" />
        <line x1={x(0)} x2={x(0)} y1={2} y2={12} className="rs-range" />
        <line x1={x(10)} x2={x(10)} y1={3} y2={11} className="rs-range" />
        <line x1={x(12)} x2={x(12)} y1={3} y2={11} className="rs-range rs-range-var" />

        <rect x={x(5)} y={18} width={unit} height={6} rx={1} className="rs-target" />

        <line x1={x(0)} x2={x(12)} y1={18} y2={18} className="rs-base" />
        {ticks.map((mm) => (
          <line
            key={mm}
            x1={x(mm)}
            x2={x(mm)}
            y1={18}
            y2={Number.isInteger(mm) ? (mm % 2 === 0 ? 31 : 27) : 23}
            className="rs-tick"
          />
        ))}
        {[0, 2, 4, 6, 8, 10, 12].map((mm) => (
          <text key={mm} x={x(mm)} y={47} className="rs-num" textAnchor="middle">
            {mm}
          </text>
        ))}
      </svg>
      <figcaption className="rs-legend">
        <span>
          <i className="rs-key" aria-hidden="true" />
          Full range, typically <span className="mono">10–12 mm</span>
        </span>
        <span>
          <i className="rs-key rs-key-target" aria-hidden="true" />
          Starting target, <span className="mono">≈ 50%</span>
        </span>
      </figcaption>
    </figure>
  );
}
