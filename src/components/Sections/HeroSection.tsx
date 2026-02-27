// HeroSection.tsx
// When spotlightMember + rightContent are both provided, renders a premium
// frosted-glass spotlight card on the right with the avatar inside it.
// rightContent = the heroSpotRef anchor div from TeamSmooth.tsx

import { ReactNode } from "react";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

interface SpotlightMember {
  name: string;
  title: string;
  details: string;
  image?: string;
}

interface HeroSectionProps {
  title: string;
  heading: string;
  subtitle: string;
  rightContent?: ReactNode; // avatar anchor for scroll animation
  spotlightMember?: SpotlightMember; // data for the card text
  avatarFlying?: boolean; // true while circle is in mid-flight
}

export default function HeroSection({
  title,
  heading,
  subtitle,
  rightContent,
  spotlightMember,
  avatarFlying = false,
}: HeroSectionProps) {
  const showCard = rightContent && spotlightMember;

  // First sentence of bio
  const bio = spotlightMember
    ? spotlightMember.details.split(".")[0] + "."
    : "";

  return (
    <>
      <style>{`
        @keyframes hs-fade-up {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes hs-avatar-pop {
          0%   { transform: scale(0.80); opacity: 0; }
          65%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1);    opacity: 1; }
        }
        @keyframes hs-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes hs-pulse {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.55; }
          50%       { transform: translate(-50%,-50%) scale(1.25); opacity: 0;    }
        }
        @keyframes hs-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes hs-shimmer {
          0%   { left: -100%; }
          100% { left: 160%;  }
        }

        .hs-card         { animation: hs-fade-up   0.8s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .hs-avatar-pop   { animation: hs-avatar-pop 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hs-name-in      { animation: hs-text-in   0.55s cubic-bezier(0.22,1,0.36,1) 0.5s  both; }
        .hs-title-in     { animation: hs-text-in   0.55s cubic-bezier(0.22,1,0.36,1) 0.6s  both; }
        .hs-bio-in       { animation: hs-text-in   0.55s cubic-bezier(0.22,1,0.36,1) 0.72s both; }
        .hs-pulse-a      { animation: hs-pulse      2.8s ease-in-out 0s    infinite; }
        .hs-pulse-b      { animation: hs-pulse      2.8s ease-in-out 1.0s  infinite; }

        /* Animated conic border */
        .hs-border::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 24px;
          background: conic-gradient(
            from 0deg,
            transparent         0deg,
            rgba(56,189,248,.9) 70deg,
            rgba(147,210,240,.4)130deg,
            transparent         190deg,
            rgba(56,189,248,.2) 270deg,
            transparent         360deg
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
                        linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          animation: hs-spin 5s linear infinite;
        }

        /* Shimmer sweep */
        .hs-shimmer-bar {
          position  : absolute;
          top: 0; bottom: 0;
          width     : 55px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          transform : skewX(-15deg);
          pointer-events: none;
          animation: hs-shimmer 5s ease-in-out 1.2s infinite;
        }
      `}</style>

      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground overflow-hidden">
        <div className="container-wide">
          <div
            className={`flex items-center gap-14 ${showCard ? "justify-between" : "justify-start"}`}
          >
            {/* ── Left ──────────────────────────────────────────────────────── */}
            <AnimatedSection className="max-w-3xl flex-1 min-w-0">
              <span className="inline-block px-4 py-1.5 rounded-full bg-water-ocean/60 text-water-sky text-sm font-medium mb-4">
                {title}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                {heading}
              </h1>
              <p className="text-water-light/90 text-lg max-w-xl">{subtitle}</p>
            </AnimatedSection>

            {/* ── Right: Spotlight Card ──────────────────────────────────────── */}
            {showCard && (
              <div className="hidden lg:block flex-shrink-0">
                <div
                  className="hs-card hs-border relative overflow-hidden"
                  style={{
                    width: 268,
                    borderRadius: 22,
                    padding: "28px 22px 24px",
                    background:
                      "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 55%, rgba(10,25,60,0.45) 100%)",
                    backdropFilter: "blur(22px) saturate(1.5)",
                    WebkitBackdropFilter: "blur(22px) saturate(1.5)",
                    border: "1px solid rgba(255,255,255,0.11)",
                    boxShadow: [
                      "0 0 0 1px rgba(56,189,248,0.06)",
                      "0 30px 60px rgba(0,0,0,0.5)",
                      "0 10px 24px rgba(0,0,0,0.3)",
                      "inset 0 1px 0 rgba(255,255,255,0.13)",
                      "inset 0 -1px 0 rgba(0,0,0,0.18)",
                    ].join(", "),
                  }}
                >
                  {/* Shimmer sweep */}
                  <div className="hs-shimmer-bar" />

                  {/* Top radial glow */}
                  <div
                    className="absolute inset-x-0 top-0 pointer-events-none"
                    style={{
                      height: 110,
                      background:
                        "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(56,189,248,0.14), transparent)",
                    }}
                  />

                  {/* ── Label ───────────────────────────────────────────────── */}
                  <div className="relative flex items-center gap-2 mb-5">
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background:
                          "linear-gradient(to right, transparent, rgba(56,189,248,0.45))",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.47rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "rgba(147,210,240,0.6)",
                      }}
                    >
                      Team Spotlight
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background:
                          "linear-gradient(to left, transparent, rgba(56,189,248,0.45))",
                      }}
                    />
                  </div>

                  {/* ── Avatar ──────────────────────────────────────────────── */}
                  <div className="relative flex justify-center mb-5">
                    {/* Pulse rings */}
                    <div
                      className="hs-pulse-a absolute rounded-full"
                      style={{
                        width: 162,
                        height: 162,
                        top: "50%",
                        left: "50%",
                        border: "1.5px solid rgba(56,189,248,0.32)",
                        pointerEvents: "none",
                      }}
                    />
                    <div
                      className="hs-pulse-b absolute rounded-full"
                      style={{
                        width: 190,
                        height: 190,
                        top: "50%",
                        left: "50%",
                        border: "1px solid rgba(56,189,248,0.14)",
                        pointerEvents: "none",
                      }}
                    />

                    {/*
                      Avatar container — 140×140.
                      rightContent (heroSpotRef anchor) is placed INSIDE here
                      position:absolute so it sits exactly over the circle.
                      The scroll animation reads this element's bounding rect.
                    */}
                    <div
                      className="hs-avatar-pop relative"
                      style={{ width: 140, height: 140 }}
                    >
                      {/*
                        When avatarFlying=false: show the real circle.
                        When avatarFlying=true:  floating clone is in the air,
                        show a dimmed placeholder ring so the card stays beautiful
                        but clearly signals the avatar has "left" the card.
                      */}
                      {!avatarFlying ? (
                        /* ── Real circle ── */
                        <div
                          className="absolute inset-0 rounded-full overflow-hidden"
                          style={{
                            boxShadow: [
                              "0 0 0 2.5px rgba(56,189,248,0.45)",
                              "0 0 0 5px rgba(56,189,248,0.12)",
                              "0 0 35px rgba(56,189,248,0.4)",
                              "0 10px 28px rgba(0,0,0,0.45)",
                            ].join(", "),
                            transition: "opacity 200ms ease",
                          }}
                        >
                          {spotlightMember.image ? (
                            <img
                              src={spotlightMember.image}
                              alt={spotlightMember.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center text-white font-semibold"
                              style={{
                                background:
                                  "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
                                fontSize: "2.2rem",
                                fontFamily: "serif",
                                fontStyle: "italic",
                              }}
                            >
                              {spotlightMember.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* ── Placeholder hole while avatar is flying ── */
                        <div
                          className="absolute inset-0 rounded-full opacity-0"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1.5px dashed rgba(56,189,248,0.25)",
                            boxShadow: "inset 0 0 20px rgba(56,189,248,0.06)",
                            transition: "all 200ms ease",
                          }}
                        >
                          {/* Faint initial letter as ghost */}
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              fontFamily: "serif",
                              fontStyle: "italic",
                              fontSize: "2.2rem",
                              color: "rgba(56,189,248,0.15)",
                              userSelect: "none",
                            }}
                          >
                            {spotlightMember.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}

                      {/* Invisible scroll anchor — always present for rAF ref reads */}
                      {rightContent}
                    </div>
                  </div>

                  {/* ── Name ────────────────────────────────────────────────── */}
                  <div className="hs-name-in text-center mb-1">
                    <p
                      style={{
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        fontStyle: "italic",
                        fontWeight: 300,
                        fontSize: "1.18rem",
                        color: "rgba(255,255,255,0.95)",
                        letterSpacing: "0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {spotlightMember.name}
                    </p>
                  </div>

                  {/* ── Title ───────────────────────────────────────────────── */}
                  <div className="hs-title-in text-center mb-4">
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.56rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(56,189,248,0.85)",
                      }}
                    >
                      {spotlightMember.title}
                    </span>
                  </div>

                  {/* ── Divider ─────────────────────────────────────────────── */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "rgba(255,255,255,0.07)",
                      }}
                    />
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "rgba(56,189,248,0.55)",
                        boxShadow: "0 0 8px rgba(56,189,248,0.7)",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "rgba(255,255,255,0.07)",
                      }}
                    />
                  </div>

                  {/* ── Bio ─────────────────────────────────────────────────── */}
                  <div className="hs-bio-in">
                    <p
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: "0.71rem",
                        lineHeight: 1.8,
                        color: "rgba(200,228,245,0.7)",
                        textAlign: "center",
                        fontWeight: 300,
                      }}
                    >
                      {bio}
                    </p>
                  </div>

                  {/* ── Bottom gradient bar ──────────────────────────────────── */}
                  <div
                    className="absolute bottom-0 inset-x-10 pointer-events-none"
                    style={{
                      height: 2,
                      background:
                        "linear-gradient(90deg, transparent, rgba(56,189,248,0.55), transparent)",
                      borderRadius: "0 0 2px 2px",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Fallback: rightContent without card (no spotlightMember) */}
            {rightContent && !spotlightMember && (
              <div className="hidden lg:block flex-shrink-0">
                {rightContent}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
