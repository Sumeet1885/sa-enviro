import { useState } from "react";
import { X } from "lucide-react";

import { SEO } from "@/components/layout/SEO";
import { galleryImages, seoData } from "@/constants/siteData";
import HeroSection from "@/components/Sections/HeroSection";
import ImageGallery from "@/components/Sections/GallerySection";

const Gallery = () => {

  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "equipment", "filters", "plants", "treatment"];
  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <>
      <SEO
        title={seoData.gallery.title}
        description={seoData.gallery.description}
      />

      <HeroSection
        title="Gallery"
        heading="📸 Project Gallery"
        subtitle="A Visual Showcase of Our Water, Wastewater & Environmental Engineering Projects"
      />

      <ImageGallery />
    </>
  );
};

export default Gallery;
