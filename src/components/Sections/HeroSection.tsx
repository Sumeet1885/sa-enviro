import { AnimatedSection } from "@/components/motion/AnimatedSection";

export default function HeroSection({
  title,
  heading,
  subtitle,
}: {
  title: string;
  heading: string;
  subtitle: string;
}) {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
      <div className="container-wide">
        <AnimatedSection className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-water-ocean/60 text-water-sky text-sm font-medium mb-4">
            {title}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
            {heading}
          </h1>
          <p className="text-water-light/90 text-lg max-w-xl">{subtitle}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}
