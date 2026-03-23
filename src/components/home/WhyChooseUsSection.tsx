import { Check } from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { whyChooseUs } from "@/constants/siteData";

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding dark-section relative overflow-hidden">
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>
            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-1.5 rounded-full gradient-water-deep  text-sm font-medium mb-4">
                {whyChooseUs.title}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                Excellence in Every{" "}
                <span className="inline-flex items-baseline">
                  <svg
                    viewBox="0 0 300 95"
                    className="overflow-visible"
                    aria-label="Drop."
                    style={{
                      height: "1em",
                      width: "auto",
                      verticalAlign: "baseline",
                      position: "relative",
                      top: "0.15em",
                    }}
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
                        <stop
                          offset="100%"
                          stopColor="hsl(var(--water-deep))"
                        />
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
                      Drop.
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
                      Drop.
                    </text>
                  </svg>
                </span>
              </h2>
              <p className="text-water-light/80 text-lg leading-relaxed">
                {whyChooseUs.description}
              </p>
            </AnimatedSection>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {whyChooseUs.points.map((point, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center gap-3 p-4 rounded-xl card ">
                  <div className="w-8 h-8 rounded-lg  flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 " />
                  </div>
                  <span className=" font-medium text-sm">{point}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
