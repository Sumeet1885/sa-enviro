import { Quote } from "lucide-react";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { testimonials } from "@/constants/siteData";

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-light/50 text-water-deep text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Testimonials Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            //  <StaggerItem key={i}>
            //    <div className="bg-card rounded-2xl p-8 border border-border card-hover h-full">
            //      <Quote className="w-10 h-10 text-water-sky/30 mb-4" />
            //      <p className="text-foreground text-lg mb-6 leading-relaxed">
            //        "{testimonial.quote}"
            //      </p>
            //      <div className="flex items-center gap-3">
            //        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-sea to-water-deep flex items-center justify-center text-primary-foreground font-semibold">
            //          {testimonial.author.charAt(0)}
            //        </div>
            //        <div>
            //          <div className="font-semibold text-foreground">
            //            {testimonial.author}
            //          </div>
            //          <div className="text-sm text-muted-foreground">
            //            Verified Client
            //          </div>
            //        </div>
            //      </div>
            //    </div>
            //  </StaggerItem>
            <StaggerItem key={i}>
              <div className="group relative h-full">
                {/* Glowing background effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700" />

                {/* Main testimonial card */}
                <div className="relative bg-white dark:bg-card rounded-2xl p-8 border border-blue-100/50 dark:border-blue-900/30 shadow-lg hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2 overflow-hidden backdrop-blur-sm">
                  {/* Animated gradient mesh background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
                  </div>

                  {/* Flowing top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Content wrapper */}
                  <div className="relative z-10">
                    {/* Quote icon with glass effect */}
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-500" />
                      <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 p-3 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 backdrop-blur-sm">
                        <Quote className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>

                    {/* Quote text with gradient on hover */}
                    <blockquote className="relative mb-8">
                      <p className="text-slate-700 dark:text-foreground/90 text-lg leading-relaxed group-hover:text-slate-900 dark:group-hover:text-foreground transition-colors duration-300">
                        "{testimonial.quote}"
                      </p>

                      {/* Decorative quotation mark */}
                      <div className="absolute -left-2 -top-2 text-6xl text-blue-400/10 font-serif leading-none select-none">
                        "
                      </div>
                    </blockquote>

                    {/* Author section with enhanced design */}
                    <div className="flex items-center gap-4 relative">
                      {/* Animated line separator */}
                      <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900/50 to-transparent" />

                      {/* Avatar with animated ring */}
                      <div className="relative group/avatar">
                        {/* Animated ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-pulse" />

                        {/* Avatar */}
                        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                          {testimonial.author.charAt(0)}

                          {/* Shine effect */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
                        </div>

                        {/* Verified badge */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-md transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Author details */}
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-foreground text-base mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {testimonial.author}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" />
                            <span>Verified Client</span>
                          </div>

                          {/* Star rating */}
                          <div className="flex gap-0.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className="w-3.5 h-3.5 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner water drop decoration */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:rotate-12">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full backdrop-blur-sm border border-blue-300/30 dark:border-blue-700/30" />
                  </div>

                  {/* Animated dots pattern */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 h-1 rounded-full bg-blue-400"
                          style={{ animationDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
