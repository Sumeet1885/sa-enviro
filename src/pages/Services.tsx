import { SEO } from "@/components/layout/SEO";
import { seoData } from "@/constants/siteData";
import ServicesHero from "@/components/Sections/services/ServicesHero";
import ServicesGrid from "@/components/Sections/services/ServicesGrid";
import ServicesProcess from "@/components/Sections/services/ServicesProcess";

const Services = () => {
  return (
    <>
      <SEO
        title={seoData.services.title}
        description={seoData.services.description}
      />

      {/* ── HERO ── */}
      <ServicesHero />

      {/* ── SERVICE CARDS (tabbed grid + modal) ── */}
      <ServicesGrid />

      {/* ── HOW WE WORK (process stepper) ── */}
      <ServicesProcess />
    </>
  );
};

export default Services;
