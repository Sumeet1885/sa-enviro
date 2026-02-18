import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LogoItem {
  id: string;
  alt: string;
  imgUrl: string;
}

// ─── Constant Data ─────────────────────────────────────────────────────────────
// Each entry needs only: id, alt text, and an image URL.
// Swap in your own URLs — any PNG, SVG, or WebP works.

const LOGOS: LogoItem[] = [
  {
    id: "picture-1",
    alt: "Industrial water treatment equipment setup view 1",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture1-585x439.jpg",
  },
  {
    id: "picture-2",
    alt: "Wastewater treatment facility filtration units",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture2-1-585x439.jpg",
  },
  {
    id: "picture-3",
    alt: "Effluent treatment plant piping and tank system",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture3-1-585x439.jpg",
  },
  {
    id: "picture-4",
    alt: "Water purification system technical diagram or view",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture4.png",
  },
  {
    id: "picture-5",
    alt: "Commercial sewage treatment plant installation",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture5-585x439.jpg",
  },
  {
    id: "picture-6",
    alt: "Multi-stage water filtration assembly",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture6-585x439.jpg",
  },
  {
    id: "picture-7",
    alt: "Industrial RO plant membrane housing",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture7-585x439.jpg",
  },
  {
    id: "picture-8",
    alt: "Sewage treatment plant aerator and tank system",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture8-585x439.jpg",
  },
  {
    id: "picture-13",
    alt: "Reverse osmosis water purification system",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture13-1-585x439.jpg",
  },
  {
    id: "picture-14",
    alt: "Package sewage treatment plant outdoor unit",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture14-1-585x439.jpg",
  },
  {
    id: "picture-15",
    alt: "Demineralization plant ion exchange columns",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture15-1-585x439.jpg",
  },
  {
    id: "picture-16",
    alt: "Effluent treatment system control valves and tanks",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture16-1-585x439.jpg",
  },
  {
    id: "picture-17",
    alt: "Industrial sand and carbon filter units",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture17-585x439.jpg",
  },
  {
    id: "picture-18",
    alt: "UF membrane filtration system assembly",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture18-585x439.jpg",
  },
  {
    id: "picture-19",
    alt: "Water softening plant setup",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture19-1-585x439.jpg",
  },
  {
    id: "picture-20",
    alt: "Wastewater recycling plant components",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/09/Picture20-585x439.jpg",
  },
  {
    id: "web-7",
    alt: "Modular sewage treatment plant view 7",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/7-585x439.webp",
  },
  {
    id: "web-8",
    alt: "Industrial effluent treatment tank view 8",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/8-585x439.webp",
  },
  {
    id: "web-9",
    alt: "Water purification plant instrumentation view 9",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/9-585x439.webp",
  },
  {
    id: "web-5",
    alt: "Activated sludge process system view 5",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/5-585x439.webp",
  },
  {
    id: "web-4",
    alt: "Commercial water treatment solution view 4",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/4-585x439.webp",
  },
  {
    id: "web-6",
    alt: "Filtration media tank assembly view 6",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/6-585x439.webp",
  },
  {
    id: "web-3",
    alt: "Compact sewage treatment plant design view 3",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/3-585x439.webp",
  },
  {
    id: "web-1",
    alt: "Standard water treatment plant setup view 1",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/1-585x439.webp",
  },
  {
    id: "web-2",
    alt: "Clarifier tank system view 2",
    imgUrl:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/2-585x439.webp",
  },
];

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
