import { Check } from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { whyChooseUs } from "@/constants/siteData";

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding dark-section relative overflow-hidden bg-water-deep/95 py-24">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-water-ocean/20 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-water-sky/10 rounded-full blur-[120px] -z-0" />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          

          <div className="max-w-xl">
            <AnimatedSection direction="left">

              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-2xl"
              >
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-water-light">
                  {whyChooseUs.title}
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-8 text-white leading-tight">
                Excellence in Every{" "}
                <span className="relative inline-block mt-2 sm:mt-0">
                  <svg
                    viewBox="0 0 300 95"
                    className="overflow-visible w-[180px] sm:w-[220px] h-auto"
                    aria-label="Drop."
                    style={{ verticalAlign: "baseline" }}
                  >
                    <defs>
                      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--water-ocean))" />
                        <stop offset="45%" stopColor="hsl(var(--water-sky))" />
                        <stop offset="100%" stopColor="hsl(var(--water-foam))" />
                      </linearGradient>
                    </defs>
                    <text
                      x="0" y="78"
                      fontFamily="'Playfair Display', serif"
                      fontStyle="italic"
                      fontWeight="700"
                      fontSize="80"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    > Drop. </text>
                    <text
                      x="0" y="78"
                      fontFamily="'Playfair Display', serif"
                      fontStyle="italic"
                      fontWeight="700"
                      fontSize="80"
                      fill="url(#textGrad)"
                    > Drop. </text>
                  </svg>
                </span>
              </h2>

              <p className="text-water-light/70 text-lg leading-relaxed font-light">
                {whyChooseUs.description}
              </p>
            </AnimatedSection>
          </div>


          <StaggerContainer className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.points.map((point, i) => (
              <StaggerItem key={i}>
                <div className="group relative flex items-center gap-5 p-5 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl min-h-[90px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  

                  <svg 
                    className="absolute -left-10 top-1/2 -translate-y-1/2 w-24 h-full rotate-90 opacity-100 transition-all duration-700 group-hover:scale-125" 
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      d="M0,256L11.4,240C22.9,224,46,192,69,192C91.4,192,114,224,137,234.7C160,245,183,235,206,213.3C228.6,192,251,160,274,149.3C297.1,139,320,149,343,181.3C365.7,213,389,267,411,282.7C434.3,299,457,277,480,250.7C502.9,224,526,192,549,181.3C571.4,171,594,181,617,208C640,235,663,277,686,256C708.6,235,731,149,754,122.7C777.1,96,800,128,823,165.3C845.7,203,869,245,891,224C914.3,203,937,117,960,112C982.9,107,1006,181,1029,197.3C1051.4,213,1074,171,1097,144C1120,117,1143,107,1166,133.3C1188.6,160,1211,224,1234,218.7C1257.1,213,1280,139,1303,133.3C1325.7,128,1349,192,1371,192C1394.3,192,1417,128,1429,96L1440,64L1440,320L1428.6,320Z"
                    />
                  </svg>


                  <div className="relative z-10 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                    <Check className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>


                  <div className="relative z-10 flex flex-col">
                    <span className="text-white font-bold text-sm tracking-tight leading-tight">
                      {point}
                    </span>
                    <span className="text-water-light/40 text-[10px] uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      Quality Guaranteed
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
