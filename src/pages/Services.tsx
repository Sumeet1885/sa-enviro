 import { Link } from "react-router-dom";
 import { ArrowUpRight } from "lucide-react";
 import { SEO } from "@/components/layout/SEO";
 import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/motion";
 import { services, seoData } from "@/constants/siteData";
 
 const Services = () => {
   return (
     <>
       <SEO
         title={seoData.services.title}
         description={seoData.services.description}
       />
 
       {/* Hero */}
       <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
         <div className="container-wide">
           <AnimatedSection className="max-w-3xl">
             <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
               Our Services
             </span>
             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
               Comprehensive Water Treatment Solutions
             </h1>
             <p className="text-water-light/90 text-lg">
               From chemical dosing systems to complete water treatment plants,
               we offer end-to-end solutions for all your water treatment needs.
             </p>
           </AnimatedSection>
         </div>
       </section>
 
       {/* Services Grid */}
       <section className="section-padding bg-background">
         <div className="container-wide">
           <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {services.map((service) => (
               <StaggerItem key={service.id}>
                 <div className="group bg-card rounded-2xl overflow-hidden border border-border card-hover h-full flex flex-col">
                   <div className="aspect-[16/10] overflow-hidden">
                     <img
                       src={service.image}
                       alt={service.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                       loading="lazy"
                     />
                   </div>
                   <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                       {service.title}
                     </h3>
                     <p className="text-muted-foreground text-sm mb-4 flex-1">
                       {service.description}
                     </p>
                     <Link
                       to="/contact"
                       className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all mt-auto"
                     >
                       Get Quote
                       <ArrowUpRight className="w-4 h-4 ml-1" />
                     </Link>
                   </div>
                 </div>
               </StaggerItem>
             ))}
           </StaggerContainer>
         </div>
       </section>
 
       {/* CTA */}
       <section className="py-16 bg-muted/30 border-t border-border">
         <div className="container-wide text-center">
           <AnimatedSection>
             <h2 className="text-2xl font-display font-bold text-foreground mb-4">
               Need a Custom Solution?
             </h2>
             <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
               Contact us to discuss your specific requirements and get a tailored solution.
             </p>
             <Link
               to="/contact"
               className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
             >
               Contact Our Experts
               <ArrowUpRight className="w-5 h-5" />
             </Link>
           </AnimatedSection>
         </div>
       </section>
     </>
   );
 };
 
 export default Services;