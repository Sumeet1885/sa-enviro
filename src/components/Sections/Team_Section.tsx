

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
} from "react";
import { team_member } from "@/constants/siteData";

const AUTOROTATE_MS = 7000;
const BIO_CLAMP_LINES = 3;

const HIGHLIGHT_INDEX = team_member.flatMap((u, i) => (u.highlight ? [i] : []));

interface TeamSliderProps {
  firstAvatarRef?: RefObject<HTMLDivElement>;
  holdPrimaryDetails?: boolean;
  freezeCarousel?: boolean;
}

export default function TeamSlider({
  firstAvatarRef,
  holdPrimaryDetails = false,
  freezeCarousel = false,
}: TeamSliderProps) {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter-start" | "enter">(
    "idle",
  );
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [barKey, setBarKey] = useState(0);

  const bioRef = useRef<HTMLParagraphElement>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const freezeRef = useRef(freezeCarousel);
  const isMountedRef = useRef(false);

  freezeRef.current = freezeCarousel;

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    if (freezeRef.current) return;
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1 >= team_member.length ? 0 : p + 1));
    }, AUTOROTATE_MS);
  }, [stopInterval]);


  useEffect(() => {
    startInterval();
    isMountedRef.current = true;
    return () => {
      stopInterval();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startInterval, stopInterval]);


  useEffect(() => {
    if (!isMountedRef.current) return;
    if (freezeCarousel) {

      stopInterval();
    } else {

      setActive(0);
      setDisplayed(0);
      setPhase("idle");
      setExpanded(false);
      setBarKey((k) => k + 1);
      startInterval();
    }

  }, [freezeCarousel]);

  useEffect(() => {
    if (active === displayed) return;
    setPhase("exit");
    const t = setTimeout(() => {
      setDisplayed(active);
      setExpanded(false);
      setPhase("enter-start");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("enter")),
      );
    }, 340);
    return () => clearTimeout(t);
  }, [active, displayed]);

  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 2);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [displayed, expanded, phase]);


  const handleClick = useCallback(
    (i: number) => {
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = null;
      }
      stopInterval();
      setActive(i);
      setBarKey((k) => k + 1);
      resumeTimerRef.current = setTimeout(() => {
        startInterval();
        resumeTimerRef.current = null;
      }, AUTOROTATE_MS);
    },
    [startInterval, stopInterval],
  );

  const panelIndex = holdPrimaryDetails ? 0 : displayed;
  const user = team_member[panelIndex];
  const isHighlight = (i: number) => HIGHLIGHT_INDEX.includes(i);

  const ease = "cubic-bezier(0.4,0,0.2,1)";
  const contentFade = ((): React.CSSProperties => {
    if (phase === "exit")
      return {
        opacity: 0,
        transform: "translateY(10px)",
        transition: `opacity 300ms ${ease}, transform 300ms ${ease}`,
      };
    if (phase === "enter-start")
      return { opacity: 0, transform: "translateY(-10px)", transition: "none" };
    if (phase === "enter")
      return {
        opacity: 1,
        transform: "translateY(0)",
        transition: `opacity 460ms ${ease}, transform 480ms cubic-bezier(0.22,1.2,0.36,1)`,
      };
    return { opacity: 1, transform: "translateY(0)" };
  })();

  const avatarTransition: React.CSSProperties = {
    transition:
      "width 420ms cubic-bezier(0.4,0,0.2,1), transform 420ms cubic-bezier(0.4,0,0.2,1)",
  };

  return (
    <>
      <style>{`
        @keyframes fillBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .ts-fill { animation: fillBar 7s linear forwards; transform-origin: left; }

        @keyframes popIn {
          from { transform: scale(0.88); opacity: 0.3; }
          to   { transform: scale(1);    opacity: 1;   }
        }
        .ts-pop { animation: popIn 400ms cubic-bezier(0.22,1.2,0.36,1) forwards; }

        @keyframes hlPulse {
          0%,100% { box-shadow: 0 0 0 2px rgba(251,191,36,.75), 0 0 0 5px rgba(251,191,36,.12); }
          50%      { box-shadow: 0 0 0 3px rgba(251,191,36,.9),  0 0 0 9px rgba(251,191,36,.06); }
        }
        .ts-hl { animation: hlPulse 2.4s ease-in-out infinite; }

        .ts-bio::-webkit-scrollbar       { width: 2px; }
        .ts-bio::-webkit-scrollbar-track  { background: transparent; }
        .ts-bio::-webkit-scrollbar-thumb  { background: var(--primary,#1d4ed8); border-radius: 999px; }
      `}</style>

      <div className="w-full bg-background flex items-start justify-center px-4 py-6 sm:px-6 sm:py-12">
        <div className="w-full max-w-[1000px] flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-5 sm:mb-8 border-b border-foreground/10">
            <span className="font-mono text-3xl sm:text-xl text-[0.55rem] tracking-[0.22em] uppercase text-foreground/50">
              Our Team
            </span>
            <span className="font-mono text-[0.75rem] tracking-[0.15em] text-foreground/50">
              {String(displayed + 1).padStart(2, "0")} /{" "}
              {String(team_member.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-5 md:gap-7 mb-6 sm:mb-10 flex-wrap">
            {team_member.map((u, i) => {
              const isActive = active === i;
              const isFeatured = isHighlight(i);
              return (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  className="relative flex flex-col items-center gap-2 cursor-pointer outline-none border-none bg-transparent p-0 flex-shrink-0 group"
                  style={{
                    width: isActive
                      ? "clamp(64px,13vw,130px)"
                      : "clamp(40px,7vw,76px)",
                    transform: isActive ? "translateY(-10px)" : "translateY(0)",
                    zIndex: isActive ? 10 : 1,
                    ...avatarTransition,
                  }}
                >
                  {isFeatured && (
                    <div className="absolute -top-2 -right-1 z-20 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-amber-400 text-white shadow-md text-[0.52rem] font-semibold">
                      ★
                    </div>
                  )}

                  <div
                    ref={i === 0 ? firstAvatarRef : undefined}
                    className={[
                      "relative rounded-full overflow-hidden w-full aspect-square transition-all duration-500",
                      isActive
                        ? [
                          "ts-pop shadow-xl",
                          isFeatured
                            ? "ring-2 ring-amber-400/80 ring-offset-2 ring-offset-background"
                            : "ring-2 ring-primary/40 ring-offset-2 ring-offset-background",
                        ].join(" ")
                        : [
                          "opacity-45 grayscale group-hover:opacity-70 group-hover:grayscale-0",
                          isFeatured ? "ts-hl" : "",
                        ].join(" "),
                    ].join(" ")}
                  >
                    {u.image ? (
                      <img
                        src={u.image}
                        alt={u.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-light italic"
                        style={{
                          background:
                            "var(--gradient-water-deep, linear-gradient(135deg,#1d4ed8,#38bdf8))",
                          fontSize: isActive
                            ? "clamp(1.6rem,4vw,2.8rem)"
                            : "clamp(0.9rem,2vw,1.4rem)",
                        }}
                      >
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <span
                    className={[
                      "text-center font-mono leading-tight truncate w-full px-0.5 transition-colors duration-200",
                      isActive
                        ? "text-foreground/80"
                        : "text-foreground/35 group-hover:text-foreground/55",
                    ].join(" ")}
                    style={{
                      fontSize: isActive
                        ? "clamp(0.58rem,1.2vw,0.68rem)"
                        : "clamp(0.48rem,1vw,0.56rem)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {isActive ? u.name : u.name.split(" ")[0]}
                  </span>

                  {isActive && (
                    <div className="w-full h-[2px] rounded-full overflow-hidden bg-foreground/8">
                      <div
                        key={barKey}
                        className="ts-fill h-full rounded-full"
                        style={{
                          background:
                            "var(--gradient-water-deep, linear-gradient(90deg,#1d4ed8,#38bdf8))",
                        }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="border-t border-foreground/10 pt-4 sm:pt-5"
            style={contentFade}
          >
            {isHighlight(panelIndex) && (
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-amber-700 bg-amber-50 border border-amber-200 text-[0.6rem] tracking-[0.15em] uppercase font-medium font-mono">
                  <span>★</span> Featured Member
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 mb-2s sm:mb-6">
              <h2 className="font-light italic gradient-text leading-tight text-[clamp(1.5rem,4vw,2.2rem)]">
                {user.name}
              </h2>
              <span className="font-sans text-xs tracking-[0.18em] uppercase font-medium text-primary/90 flex-shrink-0 flex items-center gap-2">
                <span className="block h-px w-4 flex-shrink-0 gradient-text" />
                {user.title}
              </span>
            </div>

            <div
              className="w-10 h-px mb-4 mt-4"
              style={{
                background:
                  "var(--gradient-water-deep, linear-gradient(90deg,#1d4ed8,#38bdf8))",
              }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.6fr] gap-5 sm:gap-12 lg:gap-16 items-start">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[0.85rem] tracking-[0.2em] uppercase text-foreground/80">
                  Speciality
                </span>
                <p className="font-semibold font-display leading-snug text-foreground text-[clamp(1.05rem,2.4vw,1.38rem)]">
                  {user.functionality}
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[0.75rem] tracking-[0.2em] uppercase text-foreground/80 mb-3">
                  About
                </span>
                <div className="relative">
                  <p
                    ref={bioRef}
                    className={[
                      "font-light leading-[1.9] text-foreground text-sm sm:text-[0.95rem] transition-all duration-500 font-display",
                      expanded
                        ? "ts-bio overflow-y-auto max-h-[150px] sm:max-h-[180px] pr-2"
                        : "overflow-hidden",
                    ].join(" ")}
                    style={
                      !expanded
                        ? {
                          display: "-webkit-box",
                          WebkitLineClamp: BIO_CLAMP_LINES,
                          WebkitBoxOrient: "vertical" as const,
                          overflow: "hidden",
                        }
                        : undefined
                    }
                  >
                    {user.details}
                  </p>
                  {!expanded && isTruncated && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                  )}
                </div>

                {isTruncated && (
                  <button
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-3 flex items-center gap-2 cursor-pointer outline-none border-none bg-transparent p-0 w-fit group"
                  >
                    <span
                      className="block h-px w-4 transition-all duration-300 group-hover:w-6"
                      style={{
                        background:
                          "var(--gradient-water-deep, linear-gradient(90deg,#1d4ed8,#38bdf8))",
                      }}
                    />
                    <span className="font-mono text-[0.75rem] tracking-[0.15em] uppercase font-semibold text-primary/70 group-hover:text-primary transition-colors duration-200">
                      {expanded ? "Read less" : "Read more"}
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      className={`transition-transform duration-300 text-primary/60 ${expanded ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <polyline points="2,3 5,7 8,3" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
