import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { stats } from "@/constants/siteData";
import Counter from "@/components/ui/Counter";

export const StatsSection = () => {
  return (
    <section className="py-16 dark-section border-y border-border">
      <div className="container-wide">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <AnimatedSection direction="scale" delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold  mb-2">
                    {!isNaN(
                      Number(stat.value.substring(0, stat.value.length - 1)),
                    ) ? (
                      <>
                        <Counter
                          end={Number(
                            stat.value.substring(0, stat.value.length - 1),
                          )}
                        />
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className=" font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
