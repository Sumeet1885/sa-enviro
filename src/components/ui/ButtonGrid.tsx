/**
 * ButtonGrid.tsx
 * Wave-fill hover effect — pure Tailwind + React state.
 * Container/grid/layout: MOBILE RESPONSIVE.
 */

import { useRef, useState } from "react";

export interface ButtonItem {
  label: string;
  name: string;
  key: string;
}

interface ButtonGridProps {
  ButtonRow: ButtonItem[];
  onClick: (value: { label: string; key: string }) => void;
}

const SPRING =
  "linear(0,0.008 1.1%,0.031 2.2%,0.129 4.8%,0.257 7.2%,0.671 14.2%,0.789 16.5%,0.881 18.6%,0.957 20.7%,1.019 22.9%,1.063 25.1%,1.094 27.4%,1.114 30.7%,1.112 34.5%,1.018 49.9%,0.99 59.1%,1)";

const WAVE_STYLE = `
  @keyframes btn-pulse {
    0%, 100% { box-shadow: 0 0 0 1px rgba(255,255,255,0.25), 0 0 14px rgba(255,255,255,0.08), 0 0 32px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 20px rgba(255,255,255,0.03); }
    50%       { box-shadow: 0 0 0 1px rgba(255,255,255,0.55), 0 0 22px rgba(255,255,255,0.18), 0 0 50px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.20), inset 0 0 28px rgba(255,255,255,0.06); }
  }
  @keyframes btn-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  .btn-pulse { animation: btn-pulse 3s ease-in-out infinite; }
  .btn-shimmer-after::after {
    content: attr(data-label);
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.85) 50%, transparent 70%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: btn-shimmer 3.5s linear infinite;
    pointer-events: none;
  }
`;

const PULSE_DELAYS = [
  "delay-0",
  "[animation-delay:0.4s]",
  "[animation-delay:0.8s]",
  "[animation-delay:1.2s]",
  "[animation-delay:1.6s]",
  "[animation-delay:2.0s]",
];

const SHIMMER_DELAYS = [
  "[animation-delay:0s]",
  "[animation-delay:0.5s]",
  "[animation-delay:1.0s]",
  "[animation-delay:1.5s]",
  "[animation-delay:2.0s]",
  "[animation-delay:2.5s]",
];

export default function ButtonGrid({ ButtonRow, onClick }: ButtonGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  const getGeometry = () => {
    const btn = buttonRefs.current[hoveredIndex];
    if (hoveredIndex < 0 || !btn || !rowRef.current) return null;
    const bR = btn.getBoundingClientRect();
    const rR = rowRef.current.getBoundingClientRect();
    return {
      left: bR.left - rR.left,
      top: bR.top - rR.top,
      width: bR.width,
      height: bR.height,
    };
  };

  const geo = getGeometry();

  const getRingStyle = (): React.CSSProperties => {
    if (!geo)
      return {
        opacity: 0,
        pointerEvents: "none",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    return {
      left: geo.left,
      top: geo.top,
      width: geo.width,
      height: geo.height,
      opacity: 1,
      pointerEvents: "none",
      transitionTimingFunction: SPRING,
    };
  };

  return (
    <>
      <style>{WAVE_STYLE}</style>

      {/* ── Outer wrapper: full width on mobile, centered fit on desktop ── */}
      <div className="w-full px-3 sm:px-4 md:px-0 md:w-fit md:mx-auto mt-5 max-w-full">
        <div className="relative p-2 sm:p-3">
          <div
            ref={rowRef}
            className={[
              "relative",
              // Mobile: 2 equal columns, no overflow
              "grid grid-cols-2",
              // Tablet: 3 columns
              "sm:grid-cols-3",
              // Desktop: flex row, wraps naturally
              "md:flex md:flex-wrap md:justify-center",
              // Gaps per breakpoint
              "gap-2 sm:gap-2 md:gap-2",
            ].join(" ")}
            style={{ zIndex: 1 }}
          >
            {/* Desktop sliding ring — UNTOUCHED */}
            <span
              aria-hidden
              className="absolute rounded-2xl transition-all duration-[450ms] pointer-events-none hidden md:block"
              style={{
                ...getRingStyle(),
                zIndex: 1,
                background: "transparent",
              }}
            />

            {ButtonRow.map((btn, i) => {
              const isHovered = hoveredIndex === i;
              const delayClass = PULSE_DELAYS[i] ?? "[animation-delay:0s]";
              const shimmerDelayClass =
                SHIMMER_DELAYS[i] ?? "[animation-delay:0s]";

              return (
                <button
                  key={btn.key}
                  ref={(el) => {
                    buttonRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => onClick({ label: btn.name, key: btn.key })}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                  className={[
                    // ── Layout ──
                    "relative z-10",
                    "flex items-center justify-center gap-1.5",

                    // ── Width: full in grid, auto in flex ──
                    "w-full md:w-auto",

                    // ── Height: fixed so rows are uniform on mobile ──
                    "min-h-[40px] sm:min-h-[44px]",

                    // ── Padding scales with screen ──
                    "px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-2.5",

                    // ── Text: fluid scaling, never overflows ──
                    "font-mono font-bold uppercase tracking-[0.05em]",
                    "text-[0.62rem] sm:text-[0.72rem] md:text-[0.85rem]",

                    // ── Prevents text wrapping inside button ──
                    "whitespace-nowrap",

                    // ── Prevents long labels from breaking the grid column ──
                    "overflow-hidden",
                    "min-w-0",

                    // ── Shape ──
                    "rounded-xl sm:rounded-2xl",

                    // ── Glass base ──
                    "bg-white/5",
                    "backdrop-blur-md",
                    "border border-white/20",

                    // ── Cursor ──
                    "cursor-pointer select-none",

                    // ── Focus ring ──
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-2",

                    // ── Pulse (paused on hover) ──
                    // !isHovered ? `btn-pulse ${delayClass}` : "",

                    // ── Active press ──
                    "active:-translate-y-px active:scale-[1.01]",
                    "transition-transform duration-150",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* ── White wave fill layer ── */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-white pointer-events-none z-0 transition-[clip-path] duration-[700ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      clipPath: isHovered
                        ? "inset(0 0 0% 0)"
                        : "inset(0 0 100% 0)",
                    }}
                  />

                  {/* ── Label: sits above wave, flips black on hover ── */}
                  <span
                    className={[
                      "btn-shimmer-after",
                      "relative z-10",
                      "inline-block",
                      // Truncate if label is extremely long
                      "truncate max-w-full",
                      "transition-colors duration-[700ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                      isHovered ? "text-black" : "text-white",
                      shimmerDelayClass,
                    ].join(" ")}
                    data-label={btn.name}
                  >
                    {btn.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
