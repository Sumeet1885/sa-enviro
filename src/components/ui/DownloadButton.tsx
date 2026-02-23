import { useState, useEffect, useRef } from "react";
import { DownloadIcon } from "lucide-react";

export default function DownloadButton() {
  const [phase, setPhase] = useState("idle");
  const [fillPct, setFillPct] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ripple, setRipple] = useState(null);
  const [checkOn, setCheckOn] = useState(false);

  const raf = useRef(null);
  const timeout = useRef(null);

  const clearAll = () => {
    cancelAnimationFrame(raf.current);
    clearTimeout(timeout.current);
  };

  const handleClick = (e) => {
    if (phase !== "idle") return;
    clearAll();

    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setPhase("ripple");

    timeout.current = setTimeout(() => {
      setRipple(null);
      setPhase("filling");
      setFillPct(0);

      const fillStart = performance.now();
      const animateFill = (now) => {
        const pct = Math.min(((now - fillStart) / 520) * 100, 100);
        setFillPct(pct);
        if (pct < 100) {
          raf.current = requestAnimationFrame(animateFill);
        } else {
          setPhase("loading");
          setProgress(0);
          const barStart = performance.now();
          const animateBar = (now2) => {
            const p = Math.min(((now2 - barStart) / 2200) * 100, 100);
            setProgress(p);
            if (p < 100) {
              raf.current = requestAnimationFrame(animateBar);
            } else {
              setPhase("done");
              setCheckOn(false);
              timeout.current = setTimeout(() => setCheckOn(true), 180);
              timeout.current = setTimeout(() => {
                setPhase("idle");
                setFillPct(0);
                setProgress(0);
                setCheckOn(false);
              }, 2800);
            }
          };
          raf.current = requestAnimationFrame(animateBar);
        }
      };
      raf.current = requestAnimationFrame(animateFill);
    }, 320);
  };

  useEffect(() => () => clearAll(), []);

  const isIdle = phase === "idle";
  const isRipple = phase === "ripple";
  const isFilling = phase === "filling";
  const isLoading = phase === "loading";
  const isDone = phase === "done";

  const textWhite = isFilling ? fillPct > 48 : isLoading || isDone;

  return (
    <>
      {/* Keyframes only — cannot be expressed in Tailwind */}
      <style>{`
        @keyframes rippleExpand {
          0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
          60%  { opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(9); opacity: 0; }
        }
        .dl-ripple { animation: rippleExpand 520ms ease-out forwards; }

        @keyframes dlBounce {
          0%,100% { transform: translateY(0); }
          45%     { transform: translateY(4px); }
          75%     { transform: translateY(-2px); }
        }
        .dl-bounce { animation: dlBounce 700ms ease-in-out infinite; }

        @keyframes checkDraw {
          from { stroke-dashoffset: 26; }
          to   { stroke-dashoffset: 0; }
        }
        .dl-check {
          stroke-dasharray: 26;
          stroke-dashoffset: 26;
          animation: checkDraw 380ms cubic-bezier(0.22,1,0.36,1) forwards;
        }

        @keyframes contentIn {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dl-in { animation: contentIn 260ms ease forwards; }

        @keyframes purpleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        .dl-purple { animation: purpleIn 300ms cubic-bezier(0.34,1.56,0.64,1) forwards; }
      `}</style>

      {/* ── Outer wrapper — sets button dimensions + clips overflow ── */}
      <div
        className="relative w-[250px] h-12 select-none hover:-translate-y-2 hover:shadow-xl shadow-sm transition-all duration-300 ease-out"
        style={{ overflow: "visible" }}
      >
        {/* ── Main button surface (clips fill + ripple inside) ── */}
        <div
          onClick={handleClick}
          className={[
            "absolute inset-0 rounded-[14px] overflow-hidden cursor-pointer",
            isIdle || isRipple
              ? "shadow-[0_2px_20px_rgba(0,0,0,0.09),0_1px_4px_rgba(0,0,0,0.05)]"
              : "",
          ].join(" ")}
        >
          {/* White base */}
          <div className="absolute inset-0 rounded-[14px] bg-popover" />

          {/* Green top-down fill */}
          {(isFilling || isLoading) && (
            <div
              className="absolute left-0 right-0 top-0 bg-[#2bba8a]"
              style={{
                height: isFilling ? `${fillPct}%` : "100%",
                borderRadius:
                  isFilling && fillPct < 95 ? "14px 14px 0 0" : "14px",
                transition: isFilling ? "none" : "border-radius 200ms ease",
              }}
            />
          )}

          {/* Purple done bg */}
          {isDone && (
            <div className="dl-purple absolute inset-0 rounded-[14px] bg-[#6366f1]" />
          )}

          {/* Pink ring ripple */}
          {ripple && (
            <div
              className="dl-ripple absolute w-9 h-9 rounded-full pointer-events-none z-10"
              style={{
                left: ripple.x,
                top: ripple.y,
                border: "2px solid rgba(220,60,120,0.85)",
                background: "transparent",
              }}
            />
          )}

          {/* ── Label layer ── */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 z-[5]">
            {/* Idle / Ripple / Filling */}
            {(isIdle || isRipple || isFilling) && (
              <a
                href="/Broucher.pdf"
                download
                className="flex items-center justify-evenly w-full font-normal text-pretty tracking-tight transition-colors duration-75"
                style={{
                  color: textWhite
                    ? "hsl(var(--popover))"
                    : "hsl(var(--popover-foreground))",
                }}
              >
                Download Broucher <DownloadIcon />
              </a>
            )}

            {/* Loading */}
            {isLoading && (
              <div className="dl-in flex items-center gap-2">
                <span className="dl-bounce flex items-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line
                      x1="9"
                      y1="2"
                      x2="9"
                      y2="11.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="5.5,8.5 9,12.5 12.5,8.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="3,14.5 3,15.5 15,15.5 15,14.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-semibold text-base text-white tracking-tight">
                  Loading
                </span>
              </div>
            )}

            {/* Done */}
            {isDone && (
              <div className="dl-in flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="8.5"
                    stroke="rgba(255,255,255,0.75)"
                    strokeWidth="1.5"
                  />
                  {checkOn && (
                    <path
                      className="dl-check"
                      d="M7.5 11.5 L10 14 L14.5 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  )}
                </svg>
                <span className="font-semibold text-base text-white tracking-tight">
                  Done
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
