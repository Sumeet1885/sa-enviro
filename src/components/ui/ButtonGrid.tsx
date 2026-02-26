/**
 * ButtonGrid.tsx
 * Buttons that pop against any background image.
 * Container/grid/layout: UNTOUCHED.
 * Only button appearance changed.
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

  // ── Sliding pill ring geometry (desktop only) — UNCHANGED ──────────────────
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
      <style>{`
        /* ── Shimmer sweep across the button text ── */
        @keyframes btn-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* ── Subtle breathing pulse on the border ── */
        @keyframes btn-pulse {
          0%, 100% { box-shadow:
            0 0 0 1px rgba(255,255,255,0.55),
            0 0 14px rgba(255,255,255,0.18),
            0 0 32px rgba(255,255,255,0.08),
            inset 0 1px 0 rgba(255,255,255,0.20),
            inset 0 0 20px rgba(255,255,255,0.06); }
          50% { box-shadow:
            0 0 0 1px rgba(255,255,255,0.85),
            0 0 22px rgba(255,255,255,0.30),
            0 0 50px rgba(255,255,255,0.12),
            inset 0 1px 0 rgba(255,255,255,0.30),
            inset 0 0 28px rgba(255,255,255,0.10); }
        }

        .hb-btn {
          /* Frosted glass base — always readable against ANY bg image */
          background: rgba(255, 255, 255, 0.10) !important;
          backdrop-filter: blur(10px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(10px) saturate(160%) !important;

          border: 1px solid rgba(255, 255, 255, 0.55) !important;

          color: #ffffff !important;
          font-weight: 700 !important;
          letter-spacing: 0.06em !important;
          text-transform: uppercase !important;

          /* Layered shadow so button always reads against dark OR light bg */
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.55),
            0 0 14px rgba(255,255,255,0.18),
            0 0 32px rgba(255,255,255,0.08),
            inset 0 1px 0 rgba(255,255,255,0.20),
            inset 0 0 20px rgba(255,255,255,0.06) !important;

          animation: btn-pulse 3s ease-in-out infinite !important;

          /* Shimmer text */
          background-clip: unset !important;

          transition:
            transform 180ms cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 180ms ease,
            background 180ms ease,
            border-color 180ms ease !important;
        }

        /* Stagger the pulse so buttons don't all breathe together */
        .hb-btn:nth-child(2) { animation-delay: 0.4s !important; }
        .hb-btn:nth-child(3) { animation-delay: 0.8s !important; }
        .hb-btn:nth-child(4) { animation-delay: 1.2s !important; }
        .hb-btn:nth-child(5) { animation-delay: 1.6s !important; }
        .hb-btn:nth-child(6) { animation-delay: 2.0s !important; }


        .hb-btn:active {
          transform: translateY(-1px) scale(1.01) !important;
        }

        /* Shimmer span inside button */
        .hb-btn .hb-label {
          position: relative;
          display: inline-block;
        }

        .hb-btn .hb-label::after {
          content: attr(data-label);
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.85) 50%,
            transparent 70%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: btn-shimmer 3.5s linear infinite;
          pointer-events: none;
        }

        .hb-btn:nth-child(2) .hb-label::after { animation-delay: 0.5s; }
        .hb-btn:nth-child(3) .hb-label::after { animation-delay: 1.0s; }
        .hb-btn:nth-child(4) .hb-label::after { animation-delay: 1.5s; }
        .hb-btn:nth-child(5) .hb-label::after { animation-delay: 2.0s; }
        .hb-btn:nth-child(6) .hb-label::after { animation-delay: 2.5s; }

        /* Tiny dot indicator — "clickable" cue */
        .hb-btn .hb-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 6px rgba(255,255,255,0.8);
          flex-shrink: 0;
          animation: btn-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* ── Container/grid — UNTOUCHED ─────────────────────────────────────── */}
      <div className="mx-auto mt-5 w-fit max-w-full px-3 sm:px-0">
        <div className="relative p-3">
          <div
            ref={rowRef}
            className="relative grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-center gap-2 sm:gap-2 md:gap-2"
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
                border: "1.5px solid rgba(255,255,255,0.75)",
                boxShadow:
                  "0 0 18px rgba(255,255,255,0.15), inset 0 0 12px rgba(255,255,255,0.06)",
              }}
            />

            {ButtonRow.map((btn, i) => {
              return (
                <button
                  key={btn.key}
                  ref={(el) => {
                    buttonRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => onClick({ label: btn.name, key: btn.key })}
                  className={[
                    "hb-btn",
                    "relative z-10",
                    "flex items-center justify-center gap-2",
                    "w-full md:w-auto",
                    "cursor-pointer select-none",
                    "rounded-2xl",
                    "font-mono tracking-wide",
                    "text-[0.72rem] sm:text-[0.8rem] md:text-[0.85rem]",
                    "whitespace-nowrap",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-2",
                  ].join(" ")}
                  style={{ padding: "10px 20px" }}
                >
                  {/* Tiny glow dot — "I am clickable" cue */}
                  <span className="hb-dot" aria-hidden />

                  {/* Label with shimmer sweep */}
                  <span className="hb-label" data-label={btn.name}>
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
