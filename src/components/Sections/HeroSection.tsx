import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  heading: string;
  subtitle: string;
  rightContent?: ReactNode;
  compact?: boolean;
}

export default function HeroSection({
  title,
  heading,
  subtitle,
  rightContent,
  compact = false,
}: HeroSectionProps) {
  return (
    <section
      className={`${
        compact ? "py-12 lg:py-16" : "py-24 lg:py-32"
      } bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground overflow-hidden`}
    >
      <div className="container-wide">
        <div
          className={`flex items-center gap-14 ${
            rightContent ? "justify-between" : "justify-start"
          }`}
        >
          <AnimatedSection className="max-w-3xl flex-1 min-w-0">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-ocean/60 text-water-sky text-sm font-medium mb-4">
              {title}
            </span>
            <h1
              className={`font-display font-bold mb-6 ${
                compact
                  ? "text-3xl sm:text-4xl lg:text-5xl"
                  : "text-4xl sm:text-5xl lg:text-6xl"
              }`}
            >
              {heading}
            </h1>
            <p className="text-water-light/90 text-lg max-w-xl">{subtitle}</p>
          </AnimatedSection>

          {rightContent && (
            <div className="hidden lg:block flex-shrink-0">{rightContent}</div>
          )}
        </div>
      </div>
    </section>
  );
}
