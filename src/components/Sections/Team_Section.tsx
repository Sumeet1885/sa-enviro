import React, {
  useState,
  useEffect,
  useRef,
  useCallback,

} from "react";
import { team_member } from "@/constants/siteData";

const AUTOROTATE_TIMING = 7000;

export default function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter-start" | "enter">(
    "idle",
  );
  const [detailShown] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutorotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1 === team_member.length ? 0 : prev + 1));
    }, AUTOROTATE_TIMING);
    return () => stopAutorotate();
  }, [stopAutorotate]);

  useEffect(() => {
    if (active === displayed) return;
    setPhase("exit");
    const swapTimer = setTimeout(() => {
      setDisplayed(active);
      setPhase("enter-start");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("enter"));
      });
    }, 420);
    return () => clearTimeout(swapTimer);
  }, [active, displayed]); 

  const handleButtonClick = (index: number): void => {
    stopAutorotate();
    setActive(index);
  };

  const avatarStyle = ((): React.CSSProperties => {
    const ease = "cubic-bezier(0.4, 0, 0.2, 1)";
    if (phase === "exit")
      return {
        opacity: 0,
        transform: "translateX(80px) translateY(30px) scale(0.7)",
        transition: `opacity 420ms ${ease}, transform 420ms ${ease}`,
      };
    if (phase === "enter-start")
      return {
        opacity: 0,
        transform: "translateX(-80px) translateY(30px) scale(0.6)",
        transition: "none",
      };
    if (phase === "enter")
      return {
        opacity: 1,
        transform: "translateX(0px) translateY(0px) scale(1)",
        transition: `opacity 600ms ${ease}, transform 700ms cubic-bezier(0.22, 1.2, 0.36, 1)`,
      };
    return {
      opacity: 1,
      transform: "translateX(0) translateY(0) scale(1)",
      transition: `opacity 600ms ${ease}, transform 700ms cubic-bezier(0.22, 1.2, 0.36, 1)`,
    };
  })();

  const user = team_member[displayed];

  const waterSkyGradient = "linear-gradient(135deg, #1d4ed8, #38bdf8)";
  const waterSkyShadow = "0 4px 20px rgba(56,189,248,0.45)";
  const waterSkyGlow = "0 2px 8px rgba(56,189,248,0.35)";
  const waterSkyBtnGlow = "0 4px 20px rgba(56,189,248,0.4)";

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-blue-50 overflow-hidden px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-6xl mx-auto">
        {/* ══ Avatar halo + Title ═══════════════════════════════════════════ */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Halo glow ring behind avatar */}
          <div className="relative flex items-center justify-center mb-5">
            {/* Outer glow */}
            <div
              className="absolute w-28 h-28 rounded-full opacity-30 blur-xl"
              style={{ background: "var(--gradient-water-deep)" }}
            />
            {/* Mid ring */}
            <div
              className="absolute w-20 h-20 rounded-full opacity-20 blur-md"
              style={{ background: "var(--gradient-water-deep)" }}
            />
            {/* Main avatar */}
            <div
              key={displayed}
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl select-none"
              style={{
                ...avatarStyle,
                background: "var(--gradient-water-deep)",
                boxShadow: waterSkyShadow,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Name */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 mb-1 tracking-tight">
            {user.name}
          </h3>

          {/* Title */}
          <p className="text-sm sm:text-base font-medium text-blue-500 px-4 leading-snug break-words max-w-xl">
            {user.title}
          </p>
        </div>

        {/* ══ Selector Buttons ════════════════════════════════════════════ */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-8 px-2">
          {team_member.map((u, index) => {
            const isActive = active === index;
            return (
              <button
                key={index}
                onClick={() => handleButtonClick(index)}
                className={[
                  "inline-flex items-center gap-1.5 sm:gap-2.5 rounded-full outline-none",
                  "transition-all duration-[250ms] cursor-pointer",
                  "py-1.5 pl-1.5 pr-2.5 sm:py-2 sm:pl-2 sm:pr-4",
                  "min-w-0",
                  isActive
                    ? "text-popover"
                    : "bg-blue-100 text-blue-800 hover:bg-primary/15 hover:-translate-y-px",
                ].join(" ")}
                style={
                  isActive
                    ? {
                        background: "var(--gradient-water-deep)",
                        boxShadow: "var(--gradient-water-sky)",
                      }
                    : {}
                }
              >
                {/* Mini letter avatar */}
                <div
                  className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[0.6rem] sm:text-xs font-extrabold shrink-0"
                  style={
                    isActive
                      ? {
                          background: "var(--gradient-water-deep)",
                          color: "#fff",
                        }
                      : {
                          background: "var(--gradient-water-deep)",
                          color: "var(--popover)",
                          boxShadow: "var(--gradient-water-sky)",
                        }
                  }
                >
                  {u.name.charAt(0).toUpperCase()}
                </div>

                {/* Name */}
                <span className="text-[0.7rem] sm:text-[0.8rem] font-semibold tracking-tight whitespace-nowrap">
                  {u.name}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/80 shrink-0 ml-auto" />
                )}
              </button>
            );
          })}
        </div>

        {/* ══ Detail Panel ════════════════════════════════════════════════ */}
        <div
          className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
          style={{
            maxHeight: detailShown ? "600px" : "0px",
            opacity: detailShown ? 1 : 0,
          }}
        >
          {/* Divider */}
          <div className="flex items-center gap-3 px-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            <span className="text-[0.65rem] text-water-ocean font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
              Work
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          </div>

          {/* Functionality badge */}
          <div className="flex justify-center mb-4">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white"
              style={{
                background: "var(--gradient-water-deep)",
                boxShadow: "var(--gradient-water-sky)",
              }}
            >
              {user.functionality}
            </span>
          </div>

          {/* Details paragraph */}
          <p className="text-sm sm:text-base text-water-ocean/60 leading-relaxed text-center px-4 pb-6 w-full mx-auto break-words">
            {user.details}
          </p>
        </div>
      </div>
    </div>
  );
}
