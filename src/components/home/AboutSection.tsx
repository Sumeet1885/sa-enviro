import { Award, Users, Wrench, Sparkles  } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/motion";
import { aboutData, siteConfig } from "@/constants/siteData";

export const AboutSection = () => {
  return (
    <section className="section-padding light-section relative overflow-hidden bg-background">

      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          

          <AnimatedSection direction="left" className="w-full">
            <div className="relative group">

              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-x" />
              
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border-[6px] border-card">
                <video
                  src="https://res.cloudinary.com/dwttz8kvz/video/upload/v1778074474/SAEnviro_1_t0abij"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>


              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Facility Live</span>
              </div>
            </div>
          </AnimatedSection>


          <div className="flex flex-col space-y-6 lg:space-y-8">
            <AnimatedSection direction="right">

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {aboutData.title}
                </span>
              </motion.div>

              <h2 className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-bold mb-4 leading-[1.1]">
                Leading the Way in <br />
                <span className="gradient-text italic font-serif">Water Treatment</span>
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed border-l-4 border-primary/30 pl-6 mb-4">
                {aboutData.intro}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed hidden sm:block">
                {aboutData.description}
              </p>
            </AnimatedSection>


            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Award, label: "Quality", value: "ISO Certified" },
                { icon: Users, label: "Expertise", value: `${siteConfig.stats.Members}+ Members` },
                { icon: Wrench, label: "Solutions", value: "Custom" },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div className="group flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-primary transition-all duration-500 mb-3">
                      <item.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-foreground tracking-tight leading-tight mb-1">{item.value}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{item.label}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>


          </div>
        </div>
      </div>
    </section>
  );
};
