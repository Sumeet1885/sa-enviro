 import { Check } from "lucide-react";
 import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/motion";
 import { whyChooseUs } from "@/constants/siteData";
 
 export const WhyChooseUsSection = () => {
   return (
     <section className="section-padding bg-water-deep text-primary-foreground relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10">
         <div className="absolute top-0 left-0 w-96 h-96 bg-water-sky rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-water-sea rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
       </div>
 
       <div className="container-wide relative z-10">
         <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
           {/* Content */}
           <div>
             <AnimatedSection direction="left">
               <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
                 {whyChooseUs.title}
               </span>
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                 Excellence in Every{" "}
                 <span className="text-water-sky">Drop</span>
               </h2>
               <p className="text-water-light/80 text-lg leading-relaxed">
                 {whyChooseUs.description}
               </p>
             </AnimatedSection>
           </div>
 
           {/* Points Grid */}
           <StaggerContainer className="grid sm:grid-cols-2 gap-4">
             {whyChooseUs.points.map((point, i) => (
               <StaggerItem key={i}>
                 <div className="flex items-center gap-3 p-4 rounded-xl bg-water-ocean/30 backdrop-blur-sm border border-water-ocean/30">
                   <div className="w-8 h-8 rounded-lg bg-water-sky/20 flex items-center justify-center flex-shrink-0">
                     <Check className="w-5 h-5 text-water-sky" />
                   </div>
                   <span className="text-water-light font-medium text-sm">
                     {point}
                   </span>
                 </div>
               </StaggerItem>
             ))}
           </StaggerContainer>
         </div>
       </div>
     </section>
   );
 };