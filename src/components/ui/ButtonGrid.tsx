/**
 * ButtonGrid.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Hero Button Grid — React + TypeScript + Tailwind CSS
 *
 * No backdrop. No dark gradient. Just outlined glassmorphic buttons.
 * The hero background image is fully visible at all times.
 *
 * Default: transparent bg, white outline, subtle inner glow
 * Hover:   slightly brighter outline + lift + text glow
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

export default function ButtonGrid({ ButtonRow, onClick }: ButtonGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  // ── Sliding pill ring geometry (desktop only) ───────────────────────────────
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
    <div className="mx-auto mt-5 w-fit max-w-full px-3 sm:px-0">
      {/* No wrapper backdrop — image shows through completely */}
      <div className="relative p-3">
        <div
          ref={rowRef}
          className="relative grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-2 sm:gap-2 md:gap-2"
          style={{ zIndex: 1 }}
        >
          {/* Desktop sliding ring pill — outline only, no fill */}
          <span
            aria-hidden
            className="absolute rounded-2xl transition-all duration-[450ms] pointer-events-none hidden md:block"
            style={{
              ...getRingStyle(),
              zIndex: 1,
              background: "transparent",
              border: "1.5px solid rgba(255,255,255,0.75)",
              boxShadow:
                "0 0 18px rgba(255,255,255,0.15), inset 0 0 12px rgba(255,255,255,0.06)",
            }}
          />

          {ButtonRow.map((btn, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <button
                key={btn.key}
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                type="button"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => onClick({ label: btn.name, key: btn.key })}
                className={[
                  "relative z-10",
                  "flex items-center justify-center gap-2",
                  "w-full md:w-auto",
                  "cursor-pointer select-none",
                  "rounded-2xl",
                  "font-mono font-semibold tracking-wide",
                  "text-[0.72rem] sm:text-[0.8rem] md:text-[0.85rem]",
                  "whitespace-nowrap",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-2",
                ].join(" ")}
                style={{
                  padding: "10px 20px",

                  // Fully transparent background — image always visible
                  background: "transparent",

                  // Outline only
                  border: isHovered ? "" : "1.5px solid rgba(255,255,255,0.28)",

                  // Glow on hover
                  boxShadow: isHovered
                    ? "0 0 18px rgba(255,255,255,0.18), inset 0 0 10px rgba(255,255,255,0.06)"
                    : "none",

                  // Text

                  textShadow: isHovered
                    ? "0 0 16px rgba(255,255,255,0.55)"
                    : "none",

                  transition: `all 220ms ${SPRING}`,
                }}
              >
                <span>{btn.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
