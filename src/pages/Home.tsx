import { SEO } from "@/components/layout/SEO";
import {
  HeroSection,
  AboutSection,
  BrochureSection,
  ServicesSection,
  WhyChooseUsSection,
  StatsSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home";
import { seoData } from "@/constants/siteData";

const Home = () => {
  return (
    <>
      <SEO title={seoData.home.title} description={seoData.home.description} />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <BrochureSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Home;
