

import { useEffect, useRef, useState, useCallback } from "react";

interface Member {
  name: string;
  role: string;
  color: string;
  highlight: boolean;
}

interface Particle {
  angle: number;
  speed: number;
  radius: number;
  size: number;
  opacity: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEMBERS: Member[] = [
  {
    name: "Arjun Mehta",
    role: "CEO & Founder",
    color: "#818cf8",
    highlight: false,
  },
  {
    name: "Priya Sharma",
    role: "Lead Engineer",
    color: "#38bdf8",
    highlight: false,
  },
  { name: "Rohan Das", role: "Design Head", color: "#fbbf24", highlight: true },
  {
    name: "Sneha Iyer",
    role: "Operations",
    color: "#34d399",
    highlight: false,
  },
  {
    name: "Vikram Nair",
    role: "Sales Lead",
    color: "#f472b6",
    highlight: false,
  },
];

const ROTATE_MS = 2800;
const BIG = 160;
const SMALL = 56;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    angle: (id / count) * Math.PI * 2,
    speed: (Math.random() * 0.3 + 0.08) * (id % 2 === 0 ? 1 : -1),
    radius: 70 + Math.random() * 55,
    size: Math.random() * 3 + 1.5,
    opacity: Math.random() * 0.5 + 0.25,
  }));
}

export default function TeamSection() {
  const [active, setActive] = useState(0);
  const [barWidth, setBarWidth] = useState(0); 

  const activeRef = useRef(0);
  const landedRef = useRef(false);
  const rotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rotateStart = useRef<number | null>(null);
  const rotateActive = useRef(false);
  const particles = useRef<Particle[]>(makeParticles(14));
  const rafRef = useRef<number>(0);


  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const teamSlotRef = useRef<HTMLDivElement>(null); 
  const teamBtnRef = useRef<HTMLButtonElement>(null); 
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const avRef = useRef<HTMLDivElement>(null);

  const handleSetActive = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  const resetAutoRotate = useCallback(() => {
    if (rotateTimer.current) clearInterval(rotateTimer.current);
    rotateStart.current = Date.now();
    rotateActive.current = true;
    rotateTimer.current = setInterval(() => {
      if (!landedRef.current) return;
      const next = (activeRef.current + 1) % MEMBERS.length;
      handleSetActive(next);
      rotateStart.current = Date.now();
    }, ROTATE_MS);
  }, [handleSetActive]);

  const tick = useCallback(() => {
    const av = avRef.current;
    const heroEl = heroAnchorRef.current;
    const teamSlot = teamSlotRef.current;
    const teamBtn = teamBtnRef.current;
    const teamSec = teamSectionRef.current;
    if (!av || !heroEl || !teamSlot || !teamBtn || !teamSec) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    const hRect = heroEl.getBoundingClientRect();
    const tRect = teamSlot.getBoundingClientRect();

    const hx = hRect.left + hRect.width / 2;
    const hy = hRect.top + hRect.height / 2;
    const tx = tRect.left + tRect.width / 2;
    const ty = tRect.top + tRect.height / 2;

    const heroDocY = heroEl.offsetTop + heroEl.offsetHeight / 2;
    const teamDocY = teamBtn.offsetTop + tRect.height / 2 + teamSec.offsetTop;

    const halfVh = vh / 2;
    const raw =
      (scrollY - (heroDocY - halfVh)) /
      (teamDocY - halfVh - (heroDocY - halfVh));
    const p = Math.min(1, Math.max(0, raw));
    const e = easeInOut(p);

    const size = lerp(BIG, SMALL, e);
    const glow = 1 - e;
    const x = lerp(hx, tx, e);
    const y = lerp(hy, ty, e);

    const col = MEMBERS[0].color;

    av.style.left = `${x - size / 2}px`;
    av.style.top = `${y - size / 2}px`;
    av.style.width = `${size}px`;
    av.style.height = `${size}px`;
    av.style.fontSize = `${size * 0.38}px`;
    av.style.background = `radial-gradient(circle at 35% 35%, ${col}dd, ${col}88)`;
    av.style.boxShadow = [
      `0 0 0 1px ${col}30`,
      `0 0 ${60 * glow}px ${30 * glow}px ${col}30`,
      `0 ${8 + 20 * glow}px ${30 + 50 * glow}px rgba(0,0,0,${0.4 + 0.25 * glow})`,
      `inset 0 1px 0 rgba(255,255,255,0.15)`,
    ].join(", ");

    const ringSizes = [300, 220, 160];
    const ringOps = [0.06, 0.09, 0.13];
    ringSizes.forEach((rs, i) => {
      const el = document.getElementById(
        `ts-ring-${i}`,
      ) as HTMLDivElement | null;
      if (!el) return;
      const s = rs + size * glow;
      el.style.width = `${s}px`;
      el.style.height = `${s}px`;
      el.style.opacity = `${glow * ringOps[i]}`;
      el.style.borderColor = col;
    });

    const heroLabel = document.getElementById("ts-hero-label");
    const heroName = document.getElementById("ts-hero-name");
    if (heroLabel) heroLabel.style.opacity = `${glow * 0.6}`;
    if (heroName) heroName.style.opacity = `${Math.max(0, glow * 2 - 1)}`;

    particles.current.forEach((pt, idx) => {
      pt.angle += pt.speed * 0.018;
      const r = pt.radius * (size / BIG);
      const px = Math.cos(pt.angle) * r;
      const py = Math.sin(pt.angle) * r;
      const op = p < 0.6 ? pt.opacity * glow * 1.5 : 0;
      const el = document.getElementById(
        `ts-particle-${idx}`,
      ) as HTMLDivElement | null;
      if (!el) return;
      el.style.left = `${size / 2 + px - pt.size / 2}px`;
      el.style.top = `${size / 2 + py - pt.size / 2}px`;
      el.style.opacity = `${Math.max(0, op)}`;
    });

    const wasLanded = landedRef.current;
    landedRef.current = p >= 0.97;

    if (landedRef.current && !wasLanded) resetAutoRotate();
    if (!landedRef.current && wasLanded) {
      if (rotateTimer.current) {
        clearInterval(rotateTimer.current);
        rotateTimer.current = null;
      }
      rotateActive.current = false;
      rotateStart.current = null;
    }

    av.style.pointerEvents = landedRef.current ? "auto" : "none";
    av.style.cursor = landedRef.current ? "pointer" : "default";

    if (!landedRef.current) {
      av.style.opacity = "1";
      av.style.filter = "none";
      av.style.outline = "none";
      av.style.transition = "none";
    } else {
      const isA0 = activeRef.current === 0;
      av.style.opacity = isA0 ? "1" : "0.35";
      av.style.filter = isA0 ? "none" : "grayscale(0.7)";
      av.style.outline = isA0 ? `2px solid ${col}60` : "none";
      av.style.outlineOffset = "3px";
      av.style.transition = "opacity 0.4s ease, filter 0.4s ease";
    }

    if (rotateActive.current && landedRef.current && rotateStart.current) {
      const fraction = Math.min(
        1,
        (Date.now() - rotateStart.current) / ROTATE_MS,
      );
      setBarWidth(fraction * 100);
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [resetAutoRotate]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (rotateTimer.current) clearInterval(rotateTimer.current);
    };
  }, [tick]);

  const col = MEMBERS[0].color;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=DM+Mono:wght@300;400&display=swap');
        .ts-serif  { font-family: 'Cormorant Garamond', serif; }
        .ts-mono   { font-family: 'DM Mono', monospace; }
        .ts-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .ts-member-btn {
          transition: width 0.5s cubic-bezier(.34,1.56,.64,1),
                      transform 0.5s cubic-bezier(.34,1.56,.64,1);
        }
        .ts-circle {
          transition: all 0.5s cubic-bezier(.34,1.56,.64,1);
        }
      `}</style>

      <div
        className="relative h-screen flex flex-col items-center justify-center gap-5 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #0f1628 0%, #080a0f 100%)",
        }}
      >
        <div className="ts-grid absolute inset-0 pointer-events-none" />

        {[0, 1, 2].map((i) => (
          <div
            key={i}
            id={`ts-ring-${i}`}
            className="absolute rounded-full border pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              borderColor: col,
            }}
          />
        ))}

        <p
          id="ts-hero-label"
          className="ts-mono relative z-10 text-[11px] tracking-[0.3em] uppercase text-white/25"
        >
          scroll to meet the team ↓
        </p>

        <div
          ref={heroAnchorRef}
          style={{
            width: BIG,
            height: BIG,
            borderRadius: "50%",
            visibility: "hidden",
            flexShrink: 0,
          }}
        />

        <div
          id="ts-hero-name"
          className="text-center pointer-events-none relative z-10"
        >
          <p className="ts-serif text-[30px] font-light text-[#f0ece6] tracking-[0.04em]">
            {MEMBERS[0].name}
          </p>
          <p
            className="ts-mono text-[11px] mt-1.5 tracking-[0.18em] uppercase"
            style={{ color: col }}
          >
            {MEMBERS[0].role}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #080a0f)",
          }}
        />
      </div>

      <div className="h-screen" style={{ background: "#080a0f" }} />

      <div
        ref={teamSectionRef}
        id="ts-team"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
        style={{ background: "#080a0f" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
          }}
        />

        <p className="ts-mono text-[10px] tracking-[0.35em] uppercase text-white/[0.18] mb-12">
          The full team
        </p>

        <div className="flex items-end justify-center gap-5 flex-wrap">
          {MEMBERS.map((m, i) => {
            const isActive = active === i;
            const isFirst = i === 0;

            return (
              <button
                key={i}
                ref={isFirst ? teamBtnRef : undefined}
                className="ts-member-btn flex flex-col items-center gap-2 bg-transparent border-none cursor-pointer p-0 relative"
                style={{
                  width: isActive ? 96 : 56,
                  transform: isActive ? "translateY(-12px)" : "translateY(0)",
                }}
                onClick={() => {
                  handleSetActive(i);
                  if (i === 0) resetAutoRotate();
                  else resetAutoRotate();
                }}
              >
                {m.highlight && (
                  <div
                    className="absolute -top-1.5 -right-1 z-20 w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-black font-medium"
                    style={{
                      background: "#fbbf24",
                      boxShadow: "0 2px 8px rgba(251,191,36,0.5)",
                    }}
                  >
                    ★
                  </div>
                )}

                <div
                  ref={isFirst ? teamSlotRef : undefined}
                  id={isFirst ? "ts-slot-0" : undefined}
                  className="ts-circle w-full rounded-full flex items-center justify-center ts-serif italic font-light text-white"
                  style={{
                    aspectRatio: "1",
                    background: isFirst
                      ? "transparent"
                      : isActive
                        ? `radial-gradient(circle at 35% 35%, ${m.color}ee, ${m.color}88)`
                        : `radial-gradient(circle at 35% 35%, ${m.color}44, ${m.color}22)`,
                    opacity: isFirst ? 0 : isActive ? 1 : 0.4,
                    filter: isActive ? "none" : "grayscale(0.5)",
                    boxShadow:
                      isActive && !isFirst
                        ? `0 0 0 1px ${m.color}40, 0 12px 32px ${m.color}40, inset 0 1px 0 rgba(255,255,255,0.12)`
                        : "none",
                    outline:
                      isActive && !isFirst ? `2px solid ${m.color}50` : "none",
                    outlineOffset: "3px",
                    fontSize: isActive
                      ? "clamp(1.4rem,3.5vw,2.2rem)"
                      : "clamp(0.8rem,1.8vw,1.1rem)",
                  }}
                >
                  {!isFirst && m.name.charAt(0)}
                </div>

                
                <span
                  className="ts-mono tracking-[0.08em] whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(255,255,255,0.2)",
                    fontSize: isActive ? "0.6rem" : "0.5rem",
                  }}
                >
                  {isActive ? m.name : m.name.split(" ")[0]}
                </span>

                {isActive && (
                  <div
                    className="w-full h-0.5 rounded-full overflow-hidden"
                    style={{ background: `${m.color}22` }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${isActive ? barWidth : 0}%`,
                        background: `linear-gradient(90deg, ${m.color}60, ${m.color})`,
                        transition: "none",
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <h3
            className="ts-serif font-light italic text-[#f0ece6] tracking-[0.03em] transition-all duration-500"
            style={{ fontSize: 34 }}
          >
            {MEMBERS[active].name}
          </h3>
          <p
            className="ts-mono text-[11px] mt-2 tracking-[0.2em] uppercase transition-all duration-500"
            style={{ color: MEMBERS[active].color }}
          >
            {MEMBERS[active].role}
          </p>
          <div
            className="w-9 h-px mx-auto mt-5 opacity-50 transition-all duration-500"
            style={{ background: MEMBERS[active].color }}
          />
        </div>
      </div>


      <div
        ref={avRef}
        className="fixed rounded-full flex items-center justify-center ts-serif italic font-light text-white select-none"
        style={{
          zIndex: 9999,
          willChange: "left, top, width, height",
          left: -300,
          top: -300,
          width: BIG,
          height: BIG,
          fontSize: BIG * 0.38,
        }}
        onClick={() => {
          if (landedRef.current) {
            handleSetActive(0);
            resetAutoRotate();
          }
        }}
      >
        {particles.current.map((pt, idx) => (
          <div
            key={idx}
            id={`ts-particle-${idx}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: pt.size,
              height: pt.size,
              background: col,
              boxShadow: `0 0 ${pt.size * 2}px ${col}`,
              opacity: 0,
            }}
          />
        ))}

        {MEMBERS[0].name.charAt(0)}
      </div>
    </>
  );
}
