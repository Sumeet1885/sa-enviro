import { useState } from "react";
import { LOGOS, LogoItem } from "@/constants/siteData";

// ─── Types ────────────────────────────────────────────────────────────────────

// ─── Constant Data ─────────────────────────────────────────────────────────────
// Each entry needs only: id, alt text, and an image URL.
// Swap in your own URLs — any PNG, SVG, or WebP works.

// ─── Logo Card ────────────────────────────────────────────────────────────────

interface LogoCardProps {
  logo: LogoItem;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex items-center justify-center  rounded-2xl bg-white  cursor-pointer"
      style={{
        boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={logo.imgUrl}
        loading="lazy"
        alt={logo.alt}
        className="w-full h-full s object-contain select-none pointer-events-none"
        style={{
          /* Default: fully grayscale + dimmed */
          filter: "grayscale(0%)",
          opacity: 1,
          transition: "filter 0.45s ease, opacity 0.45s ease",
        }}
        draggable={false}
      />
    </div>
  );
};

// ─── Main LogoShowcase ────────────────────────────────────────────────────────

const LogoShowcase: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-centerpx-4 py-16 sm:py-24">
      {/* Header text */}
      <div className="text-center mb-10 sm:mb-14 space-y-2">
        <p className="text-[11px] text-foreground font-semibold uppercase tracking-[0.22em]     ">
          Trusted by world-class teams
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground/80 tracking-tight">
          Companies that rely on us
        </h2>
      </div>

      {/*
        Responsive grid:
          xs  (default) → 2 cols
          sm  (≥640px)  → 3 cols
          lg  (≥1024px) → 4 cols
          xl  (≥1280px) → 6 cols
      */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {LOGOS.map((logo) => (
          <LogoCard key={logo.id} logo={logo} />
        ))}
      </div>
    </section>
  );
};

export default LogoShowcase;
