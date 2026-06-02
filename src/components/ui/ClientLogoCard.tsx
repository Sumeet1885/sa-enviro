import { LOGOS } from "@/constants/siteData";

// Show the first 6 logos in the card grid
const DISPLAY_LOGOS = LOGOS.slice(0, 6);

export default function ClientLogoCard() {
  return (
    <>
      <style>{`
        @keyframes clc-shimmer {
          0%   { left: -120%; }
          100% { left: 160%;  }
        }
        @keyframes clc-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes clc-pulse-ring {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0;   transform: scale(1.18); }
        }

        .clc-card       { animation: clc-fade-up 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .clc-shimmer    {
          position: absolute; top: 0; bottom: 0;
          width: 60px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: skewX(-18deg);
          pointer-events: none;
          animation: clc-shimmer 4s ease-in-out 1s infinite;
        }
        .clc-logo-tile {
          transition: transform 260ms ease, box-shadow 260ms ease;
        }
        .clc-logo-tile:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 8px 24px rgba(5, 30, 60, 0.22) !important;
        }
      `}</style>

      <div
        className="clc-card relative overflow-hidden flex flex-col"
        style={{
          width: 270,
          borderRadius: 20,
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.07) 100%)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          boxShadow: [
            "0 24px 60px rgba(5,25,55,0.35)",
            "0 4px 16px rgba(5,25,55,0.18)",
            "inset 0 1px 0 rgba(255,255,255,0.2)",
          ].join(", "),
          padding: "22px 20px 18px",
        }}
      >
        {/* Shimmer sweep */}
        <div className="clc-shimmer" />

        {/* Top accent line */}
        <div
          className="absolute top-0 inset-x-8 h-[2px] rounded-b pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(195 93% 65% / 0.8), transparent)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <span className="relative flex h-2 w-2">
              <span
                className="clc-pulse absolute inline-flex h-full w-full rounded-full"
                style={{
                  background: "hsl(195 93% 65%)",
                  animation: "clc-pulse-ring 2.4s ease-in-out infinite",
                }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "hsl(195 93% 65%)" }}
              />
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "hsl(195 93% 72%)" }}
            >
              Trusted Partners
            </span>
          </div>

          
        </div>

        {/* Divider */}
        <div
          className="mb-4"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          }}
        />

        {/* Logo grid — 3 columns × 2 rows */}
        <div
          className="grid gap-2.5"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {DISPLAY_LOGOS.map((logo, i) => (
            <div
              key={logo.id}
              className="clc-logo-tile flex items-center justify-center rounded-xl"
              style={{
                aspectRatio: "3 / 2",
                background: "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.4)",
                boxShadow: "0 4px 12px rgba(5,25,55,0.14)",
                padding: "8px 6px",
                animationDelay: `${0.15 + i * 0.06}s`,
              }}
            >
              <img
                src={logo.imgUrl}
                alt={logo.alt}
                loading="lazy"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div
          className="my-4"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        {/* Stats strip */}
        <div className="flex items-center justify-between px-1">
          {[
            { value: "50+", label: "Clients" },
            { value: "16+", label: "Years" },
            { value: "66+", label: "Projects" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span
                className="text-base font-bold leading-none"
                style={{ color: "hsl(195 93% 72%)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
