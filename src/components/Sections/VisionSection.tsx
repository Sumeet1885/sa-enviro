import { Droplets, Leaf, Waves } from "lucide-react";
import { AnimatedSection } from "@/components/motion";
import { siteConfig } from "@/constants/siteData";

export const VisionSection = () => {
  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <section className="section-padding dark-section">
        <div className="container-wide max-w-4xl mx-auto">
          <AnimatedSection>
            <p className="f-up text-[11px] tracking-[0.35em] uppercase  font-sans mb-10">
              {siteConfig.name ?? "AquaCare"} · Vision
            </p>

            <h2
              className="f-up text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-popover leading-[1.06] mb-12"
              style={{ letterSpacing: "-0.025em", animationDelay: "0.08s" }}
            >
              Our commitment
              <br />
              <svg
                viewBox="0 0 420 90"
                className="w-full max-w-[420px] overflow-visible md:text-xl"
                style={{ height: "clamp(64px, 10vw, 90px)" }}
                aria-label="World."
              >
                <defs>
                  <linearGradient
                    id="textGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="hsl(var(--water-ocean))" />
                    <stop offset="45%" stopColor="hsl(var(--water-sky))" />
                    <stop offset="100%" stopColor="hsl(var(--water-deep))" />
                  </linearGradient>
                </defs>

                <text
                  x="0"
                  y="78"
                  fontFamily="'Playfair Display', serif"
                  fontStyle="italic"
                  fontWeight="700"
                  fontSize="88"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  to the future.
                </text>

                <text
                  x="0"
                  y="78"
                  fontFamily="'Playfair Display', serif"
                  fontStyle="italic"
                  fontWeight="700"
                  fontSize="88"
                  fill="url(#textGrad)"
                >
                  to the future.
                </text>
              </svg>
            </h2>

            <div className="f-up" style={{ animationDelay: "0.16s" }}>
              <div className="flex items-start gap-5 mb-8">
                <Droplets
                  className="w-5 h-5  flex-shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <p className="text-base sm:text-lg text-popover/80 font-sans leading-relaxed">
                  We are building toward a world where clean water is not a
                  privilege but a guarantee — reachable for every home and
                  business, without exception.
                </p>
              </div>

              <div className="w-full h-px bg-popover mb-8" />

              <div className="flex items-start gap-5 mb-8">
                <Leaf
                  className="w-5 h-5 text-popover flex-shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <p className="text-base sm:text-lg text-popover/80 font-sans leading-relaxed">
                  Every system we design closes the loop. By 2026, nothing
                  leaves our installations without purpose — every by-product
                  reclaimed, every process optimised for a zero-waste outcome.
                </p>
              </div>

              <div className="w-full h-px bg-popover mb-8" />

              <div className="flex items-start gap-5">
                <Waves
                  className="w-5 h-5 text-popover flex-shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <p className="text-base sm:text-lg text-popover/80 font-sans leading-relaxed">
                  By 2027, intelligence will be embedded into every installation
                  we deliver — predictive, proactive, always on — so that purity
                  is maintained by design, not reaction.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};
