import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { getInitials } from "@/lib/utils";
import { ReactNode } from "react";


interface HeroSectionProps {
  title: string;
  heading: string;
  subtitle: string;
  rightContent?: ReactNode;
  spotlightMember?: {
    name: string;
    title: string;
    details: string;
    image?: string;
  };
  avatarFlying?: boolean;
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
            <AnimatedSection className="max-w-3xl flex-1 min-w-0">
              <span className="inline-block px-4 py-1.5 rounded-full bg-water-ocean/60 text-water-sky text-sm font-medium mb-4">
                {title}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                {heading}
              </h1>
              <p className="text-water-light/90 text-lg max-w-xl">{subtitle}</p>
            </AnimatedSection>

            {showCard && (
              <div className="hidden lg:block flex-shrink-0">
                <div
                  className="relative overflow-hidden rounded-[22px] border border-white/95 backdrop-blur-xl"
                  style={{
                    width: 268,
                    padding: "28px 22px 24px",
                    background: "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(28px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                    boxShadow: [
                      "0 16px 50px rgba(0,0,0,0.09)",
                      "0 4px 16px rgba(0,0,0,0.05)",
                      "0 0 0 1px rgba(160,140,220,0.15)",
                      "inset 0 1px 0 #fff",
                    ].join(", "),
                  }}
                >
                  <div className="hs-shimmer-bar" />

                  <div
                    className="absolute inset-x-0 top-0 pointer-events-none h-[110px]"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(120,90,255,0.07), transparent)",
                    }}
                  />

                  <div className="relative flex items-center gap-2 mb-5">
                    <div
                      className="flex-1 h-px"
                      style={{
                        background:
                          "linear-gradient(to left, transparent, rgba(100,80,200,0.2))",
                      }}
                    />
                  </div>

                  <div className="relative flex justify-center mb-5">
                    <div
                      className="hs-pulse-a absolute rounded-full pointer-events-none top-1/2 left-1/2"
                      style={{
                        width: 162,
                        height: 162,
                        border: "1.5px solid rgba(120,90,220,0.22)",
                      }}
                    />
                    <div
                      className="hs-pulse-b absolute rounded-full pointer-events-none top-1/2 left-1/2"
                      style={{
                        width: 190,
                        height: 190,
                        border: "1px solid rgba(120,90,220,0.10)",
                      }}
                    />

                    <div className="hs-avatar-pop relative w-[140px] h-[140px]">
                      {!avatarFlying ? (
                        <div
                          className="absolute inset-0 rounded-full overflow-hidden transition-opacity duration-200"
                          style={{
                            boxShadow: [
                              "0 0 0 2.5px rgba(120,90,220,0.3)",
                              "0 0 0 5px rgba(120,90,220,0.08)",
                              "0 0 35px rgba(120,90,220,0.2)",
                              "0 10px 28px rgba(80,50,180,0.12)",
                            ].join(", "),
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
                              className="w-full h-full flex items-center justify-center text-white font-light italic text-[2.2rem]"
                              style={{
                                background:
                                  "linear-gradient(135deg, #ddd6fe 0%, #a78bfa 55%, #818cf8 100%)",
                                fontFamily: "Georgia, serif",
                              }}
                            >
                              {getInitials(spotlightMember.name)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="absolute inset-0 rounded-full opacity-0 transition-all duration-200"
                          style={{
                            background: "rgba(120,90,220,0.03)",
                            border: "1.5px dashed rgba(120,90,220,0.2)",
                            boxShadow: "inset 0 0 20px rgba(120,90,220,0.06)",
                          }}
                        >
                          <div
                            className="w-full h-full flex items-center justify-center italic text-[2.2rem] select-none"
                            style={{
                              fontFamily: "Georgia, serif",
                              color: "rgba(120,90,220,0.15)",
                            }}
                          >
                            {getInitials(spotlightMember.name)}
                          </div>
                        </div>
                      )}

                      {rightContent}
                    </div>
                  </div>

                  <div className="hs-name-in text-center mb-1">
                    <p
                      className="italic font-light text-[1.18rem] leading-tight tracking-[0.01em] text-foreground"
                      style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {spotlightMember.name}
                    </p>
                  </div>

                  <div className="hs-title-in text-center mb-4 text-foreground">
                    <span
                      className="font-mono uppercase text-[0.56rem] tracking-[0.22em]"
                      style={{ color: "rgba(109,70,220,0.7)" }}
                    >
                      {spotlightMember.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="flex-1 h-px"
                      style={{ background: "rgba(100,80,160,0.09)" }}
                    />
                    <div
                      className="w-[5px] h-[5px] rounded-full"
                      style={{
                        background: "rgba(120,90,220,0.55)",
                        boxShadow: "0 0 8px rgba(120,90,220,0.5)",
                      }}
                    />
                    <div
                      className="flex-1 h-px"
                      style={{ background: "rgba(100,80,160,0.09)" }}
                    />
                  </div>

                  <div className="hs-bio-in text-black">
                    <p className="font-sans text-center font-light text-[0.85rem] leading-[1.8]">
                      {bio}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 inset-x-10 pointer-events-none h-[2px] rounded-b-[2px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(120,90,220,0.45), transparent)",
                    }}
                  />
                </div>
              </div>
            )}

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
