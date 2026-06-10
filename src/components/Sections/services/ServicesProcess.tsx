import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const STEPS = [
  {
    n: "01",
    icon: "🔍",
    title: "Assess",
    desc: "Site survey, requirement analysis and environmental impact evaluation to understand your exact needs.",
  },
  {
    n: "02",
    icon: "📐",
    title: "Design",
    desc: "Engineering design, process selection and detailed technical drawings tailored to your application.",
  },
  {
    n: "03",
    icon: "⚙️",
    title: "Fabricate",
    desc: "Manufacturing with quality-checked materials, precision fabrication and ISO-compliant processes.",
  },
  {
    n: "04",
    icon: "🏗️",
    title: "Install",
    desc: "Erection, commissioning and on-site testing to ensure the system performs to specification.",
  },
  {
    n: "05",
    icon: "🛡️",
    title: "Support",
    desc: "AMC, online monitoring, calibration and ongoing technical support to keep your plant running.",
  },
] as const;

const STEP_DURATION_MS = 2400;

const PROCESS_STYLES = `
  @keyframes saesPulseRing {
    0%   { opacity: 0.7; transform: scale(1); }
    100% { opacity: 0;   transform: scale(1.65); }
  }
  @keyframes saesProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes saesProgressV {
    from { height: 0%; }
    to   { height: 100%; }
  }
  @keyframes saesGlow {
    0%, 100% { text-shadow: 0 0 8px hsl(var(--primary) / 0.4), 0 0 20px hsl(var(--primary) / 0.2); }
    50%       { text-shadow: 0 0 16px hsl(var(--primary) / 0.7), 0 0 40px hsl(var(--primary) / 0.4); }
  }

  /* Mobile vertical layout */
  .process-steps-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
  }

  /* Horizontal connector (desktop) */
  .process-connector-h {
    display: block;
  }
  /* Vertical connector (mobile) */
  .process-connector-v {
    display: none;
  }

  .process-step {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
    z-index: 1;
    transition: all 0.3s ease;
  }

  /* Mobile-specific progress bar */
  .step-progress-bar {
    margin-top: 14px;
    height: 2px;
    width: 100%;
  }

  @media (max-width: 640px) {
    .process-steps-container {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    /* Show vertical connector, hide horizontal */
    .process-connector-h {
      display: none;
    }
    .process-connector-v {
      display: block;
    }

    .process-step {
      flex-direction: row;
      align-items: flex-start;
      text-align: left;
      padding: 16px 0;
      gap: 16px;
      min-height: 80px;
    }

    .step-dot-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: 54px;
      margin-right: 0;
    }

    .step-content-col {
      flex: 1;
      padding-bottom: 8px;
      min-width: 0;
    }

    /* On mobile, progress bar becomes horizontal under text */
    .step-progress-bar {
      margin-top: 10px;
      height: 2px;
      width: 100%;
    }
  }
`;

export default function ServicesProcess() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, STEP_DURATION_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-background">
      <style>{PROCESS_STYLES}</style>

      {/* Subtle bg tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(var(--primary) / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-12 sm:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
            style={{
              background: "hsl(var(--primary) / 0.08)",
              border: "1px solid hsl(var(--primary) / 0.2)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "hsl(var(--primary))",
                boxShadow: "0 0 8px hsl(var(--primary))",
              }}
            />
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              Our Process
            </p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 text-foreground">
            How We Work
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: "1rem" }}>
            A proven methodology that delivers results every time.
          </p>
        </AnimatedSection>

        {/* Steps */}
        <div className="process-steps-container">

          {/* ── HORIZONTAL connector line (desktop only) ── */}
          <div
            className="process-connector-h absolute"
            style={{
              top: 27,
              left: "10%",
              right: "10%",
              height: 2,
              background: "hsl(var(--border))",
              borderRadius: 2,
              zIndex: 0,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--water-sea)))",
                boxShadow: "0 0 10px hsl(var(--primary) / 0.3)",
                width: `${(activeStep / (STEPS.length - 1)) * 100}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>

          {/* ── VERTICAL connector line (mobile only) ── */}
          <div
            className="process-connector-v"
            style={{
              position: "absolute",
              top: 27,
              bottom: 27,
              left: 27, // center of the 54px dot
              width: 2,
              background: "hsl(var(--border))",
              borderRadius: 2,
              zIndex: 0,
            }}
          >
            <motion.div
              style={{
                width: "100%",
                borderRadius: 2,
                background:
                  "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--water-sea)))",
                boxShadow: "0 0 10px hsl(var(--primary) / 0.3)",
                height: `${(activeStep / (STEPS.length - 1)) * 100}%`,
                transition: "height 0.5s ease",
              }}
            />
          </div>

          {/* ── STEPS ── */}
          {STEPS.map((step, i) => {
            const isActive = activeStep === i;
            const isPast = i < activeStep;

            return (
              <div
                key={step.n}
                className="process-step"
                onClick={() => setActiveStep(i)}
              >
                {/* Dot column (always rendered; on desktop is block, on mobile is flex-col) */}
                <div className="step-dot-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 54 }}>
                  {/* Dot */}
                  <div style={{ position: "relative", display: "inline-block", marginBottom: 4 }}>
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: -10,
                          borderRadius: "50%",
                          border: "1.5px solid hsl(var(--primary) / 0.4)",
                          animation: `saesPulseRing ${STEP_DURATION_MS}ms ease-out infinite`,
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        transition: "all 0.4s ease",
                        background: isActive
                          ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--water-sea)))"
                          : isPast
                          ? "hsl(var(--primary) / 0.12)"
                          : "hsl(var(--muted))",
                        border: isActive
                          ? "none"
                          : isPast
                          ? "1px solid hsl(var(--primary) / 0.3)"
                          : "1px solid hsl(var(--border))",
                        boxShadow: isActive
                          ? "0 0 20px hsl(var(--primary) / 0.35), 0 0 40px hsl(var(--primary) / 0.15)"
                          : "none",
                      }}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Content — sits next to dot on mobile, below dot on desktop */}
                <div
                  className="step-content-col"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "inherit", // overridden per breakpoint via CSS class
                  }}
                >
                  {/* Dot + label are stacked on desktop; on mobile they're side-by-side already */}
                  {/* Step number */}
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                      color: isActive
                        ? "hsl(var(--primary))"
                        : isPast
                        ? "hsl(var(--primary) / 0.5)"
                        : "hsl(var(--muted-foreground) / 0.4)",
                      textShadow: isActive
                        ? "0 0 10px hsl(var(--primary) / 0.5)"
                        : "none",
                      transition: "all 0.4s",
                    }}
                  >
                    {step.n}
                  </p>

                  {/* Title */}
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      marginBottom: 6,
                      color: isActive
                        ? "hsl(var(--foreground))"
                        : isPast
                        ? "hsl(var(--foreground) / 0.45)"
                        : "hsl(var(--muted-foreground) / 0.5)",
                      transition: "all 0.4s",
                      animation: isActive
                        ? `saesGlow ${STEP_DURATION_MS}ms ease-in-out infinite`
                        : "none",
                    }}
                  >
                    {step.title}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 12.5,
                      lineHeight: 1.6,
                      color: isActive
                        ? "hsl(var(--foreground) / 0.7)"
                        : "hsl(var(--muted-foreground) / 0.5)",
                      transition: "color 0.4s",
                    }}
                  >
                    {step.desc}
                  </p>

                  {/* Progress bar */}
                  {/* {isActive && (
                    <div
                      className="step-progress-bar"
                      style={{
                        height: 2,
                        borderRadius: 2,
                        background: "hsl(var(--border))",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        key={`progress-${activeStep}`}
                        style={{
                          height: "100%",
                          background:
                            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--water-sea)))",
                          borderRadius: 2,
                          animation: `saesProgress ${STEP_DURATION_MS}ms linear forwards`,
                        }}
                      />
                    </div>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}