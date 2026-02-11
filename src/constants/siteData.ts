// Site data extracted from JSON - all content comes from here

import Image from "../assets/about-hero.jpg";
import Image1 from "@/assets/about-hero.jpg";
import Image2 from "@/assets/hero-water-treatment.jpg";
import Image3 from "@/assets/hero2.jpg";
import Image4 from "@/assets/hero3.jpg";

interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
}

interface NavigationItem {
  name: string;
  href: string;
}
interface HeroSlideItem {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
}

interface CTA {
  primary: {
    text: string;
    href: string;
  };
}

interface HeroData {
  cta: CTA;
  slides: HeroSlideItem[];
}

export const siteConfig: SiteConfig = {
  name: "SA Enviro Solutions",
  shortName: "SAES",
  tagline: "Leading Water Treatment Industry Into New Age",
  description:
    "SA Enviro Solutions (SAES) provides quality and customized services to address Environmental Aspects, specifically in Water and Wastewater Treatment, Zero Liquid Discharge, Air Pollution Control, Energy, Safety & Solid-Waste Management.",
  contact: {
    phone: "+91 9822392719",
    email: "info@saenvirosolutions.com",
    address: "Chinchwad, Pune, Maharashtra, India",
  },
  social: {
    facebook: "https://facebook.com/saenvirosolutions",
    linkedin: "https://linkedin.com/company/saenvirosolutions",
    twitter: "https://twitter.com/saenvirosolutions",
  },
};

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const heroData: HeroData = {
  cta: {
    primary: { text: "Explore", href: "/services" },
  },
  slides: [
    {
      id: 1,
      title: "Modern Wastewater Treatment Facility",
      subtitle: "Engineering clean water for a sustainable future",
      desc: "An aerial view of an advanced wastewater treatment plant featuring large circular clarifier tanks, interconnected pipelines.",
      img: Image1,
    },
    {
      id: 2,
      title: "Industrial Water Filtration System",
      subtitle: "Precision-engineered purification infrastructure",
      desc: "Interior view of a high-grade industrial filtration plant featuring stainless steel pressure vessels, interconnected pipe networks.",
      img: Image2,
    },
    {
      id: 3,
      title: "Rural Wastewater Treatment Site",
      subtitle: "Compact ecological water management",
      desc: "Top-down aerial view of a community-scale wastewater treatment plant featuring circular settling tanks, sludge basins.",
      img: Image3,
    },
    {
      id: 3,
      title: "Abstract Perspectives",
      subtitle: "Finding symmetry in chaos",
      desc: "Modern abstract forms and human emotion.",
      img: Image4,
    },
    {
      id: 4,
      title: "Municipal Clarifier Basin",
      subtitle: "Final stage sedimentation for clean discharge",
      desc: "Ground-level view of a circular secondary clarifier where treated water is separated from residual solids using a slow rotating bridge and scraper system.",
      img: Image4,
    },
  ],
};

export const aboutData = {
  title: "About Us",
  intro:
    "SA ENVIRO SOLUTIONS (SAES), provides quality and customized services to address Environmental Aspects, specifically in Water and Wastewater Treatment, Zero Liquid Discharge, Air Pollution Control, Energy, Safety & Solid-Waste Management.",
  description:
    "The company focused on its core competencies and providing value-based services. It is perceived in the market as a company who is committed to quality and delivery. We stand tall because of our philosophy of core values that can only be matched with our commitment.",
  founders:
    "SAES is managed by Mrs. Amruta Urdukhe & Mr. Santosh Urdukhe, Masters in Environmental Sciences, experienced in designing and developing water treatment machines and plants.",
  team: "The company has a team of qualified technical professionals in areas of Environment Science, Microbiology, Electrical, Mechanical, Instrumentation and Civil Engineering to offer efficient technology for treating water.",
  location:
    "SAES workshop is located at Chinchwad, Pune for fabrication of treatment machines.",
};

export const features = [
  {
    title: "Water Treatment",
    description:
      "The processes employed for water treatment depend on the quality of the water supply.",
    icon: "droplets",
  },
  {
    title: "Being Transparent With Clients",
    description:
      "Transparency will set the stage for an honest and long-lasting relationship with customers.",
    icon: "eye",
  },
  {
    title: "Complete Projects On Time",
    description:
      "We work through all tasks to ensure your project is successfully completed.",
    icon: "clock",
  },
];

export const services = [
  {
    id: "chemical-dosing",
    title: "Chemical Dosing System",
    description:
      "The Chemical dosing system is designed for adding of chemicals into water to separate solids by conditioning.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Chemical-Dosing-System-1.webp",
    link: "/services/chemical-dosing",
  },
  {
    id: "clarifier",
    title: "The Clarifier",
    description:
      "The Clarifiers are settling tanks used to separate solid particulates from liquids. SA Enviro Solutions provide variety of Clarifiers to suit various solid separation methods in settling of solids.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/The-Clarifier.png",
    link: "/services/clarifier",
  },
  {
    id: "biological-treatment",
    title: "Biological Treatment",
    description:
      "The biologically accomplishment of waste water is done by using a variety of microorganisms.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Biological-MBBR-Treatment.webp",
    link: "/services/biological-treatment",
  },
  {
    id: "tube-settlers",
    title: "Tube Settlers",
    description:
      "The Tube settlers are designed to enter flocculated water through multiple tube deck from the bottom and flow upward in angle of 60°.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Tube-settlers-2.webp",
    link: "/services/tube-settlers",
  },
  {
    id: "pressure-sand-filters",
    title: "Pressure Sand Filters",
    description:
      "These Filters are custom designed to suit the process requirement. The backwash is taken after every interval to maintain the efficiency of filter and filtrate water quality.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Pressure-Sand-Filter-activated-carbon-filter1.webp",
    link: "/services/pressure-sand-filters",
  },
  {
    id: "activated-carbon-filters",
    title: "Activated Carbon Filters",
    description:
      "The Activated Carbon Filters consist of Activated carbon granules supported by very fine quartz filter media. The various grades of carbon are available for specialized treatments.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Activated-Carbon-Filters.webp",
    link: "/services/activated-carbon-filters",
  },
  {
    id: "dual-media-filters",
    title: "Dual Media Filters",
    description:
      "The Dual Media Filter are utilized for higher flow rates with a smaller footprint. High filtration velocities are achieved by proper selection of Media, and designing of Distribution.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/logosaeenviro.gif",
    link: "/services/dual-media-filters",
  },
  {
    id: "reverse-osmosis",
    title: "Reverse Osmosis (RO)",
    description:
      "RO is a water purification process that uses a partially permeable membrane to separate ions, unwanted molecules and larger particles from drinking water.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Reverse-Osmosis-RO-2.webp",
    link: "/services/reverse-osmosis",
  },
  {
    id: "water-treatment-plants",
    title: "Water Treatment Plants",
    description:
      "SA Enviro Solutions supply a wide range of Water Treatment Plants, Packaged Water Treatment Plants.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Water-Treatment-Plants-WTP1.webp",
    link: "/services/water-treatment-plants",
  },
  {
    id: "sewage-treatment",
    title: "Sewage Treatment Plants",
    description:
      "We offer a huge range of Sewage Treatment Plants, which are used in the national as well as international market.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/Sewage-Treatment-Plants.png",
    link: "/services/sewage-treatment",
  },
  {
    id: "effluent-treatment",
    title: "Effluent Treatment Plant",
    description:
      "We at SA Enviro Solutions manufacture and supply effluent treatment Plants. The effluent treatment plants are designed to treat the effluent coming from different process of the plant.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/Effluent-Treatment-Plant.webp",
    link: "/services/effluent-treatment",
  },
  {
    id: "dm-plants",
    title: "Demineralisation Plants (DM Plants)",
    description:
      "It is the process of removing mineral salts from water by using the ion exchange process. Demineralization produces water of a higher quality than conventional distillation.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/logosaeenviro.gif",
    link: "/services/dm-plants",
  },
  {
    id: "water-softeners",
    title: "Water Softeners Plant",
    description:
      "The Water Softeners are available in different sizes and materials, manually operated or fully Automatic and ready to install.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/logosaeenviro.gif",
    link: "/services/water-softeners",
  },
  {
    id: "ultraviolet-units",
    title: "Ultraviolet Units",
    description:
      "UV disinfection systems for water treatment, providing chemical-free sterilization.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/ULTRAVIOLET-UNITS.png",
    link: "/services/ultraviolet-units",
  },
  {
    id: "swimming-pool-filtration",
    title: "Swimming Pool Water Filtration Plants",
    description:
      "We offer a large variety of Pool Filtration Systems, Dosing Systems & Accessories. The skimmer and level deck techniques ensure perfect water quality at all times.",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2021/10/Swimming-Pool-Water-Filtration-Plants.png",
    link: "/services/swimming-pool-filtration",
  },
  {
    id: "ultra-filtration",
    title: "Ultra Filtration (UF)",
    description:
      "Advanced membrane filtration technology for removing suspended solids, bacteria, and other contaminants.",
    image: "https://saenvirosolutions.com/wp-content/uploads/2022/04/UF1.png",
    link: "/services/ultra-filtration",
  },
];

export const whyChooseUs = {
  title: "Why Choose Us",
  description:
    "The company has a team of qualified technical professionals in areas of Environment Science, Microbiology, Electrical, Mechanical, Instrumentation and Civil Engineering to offer efficient technology for treating water.",
  points: [
    "Qualitative Products",
    "Cost-Effective Products/Services",
    "Competitive Prices",
    "Infrastructure",
    "Expert Team With Experience",
    "Service Support After Supply",
    "Satisfied Customers",
  ],
};

export const testimonials = [
  {
    quote:
      "We just wanted to say we are very happy with your system. We are very happy with the results we just got back for our water sample.",
    author: "M/s Srikem Laboratories Pvt Ltd",
  },
  {
    quote: "Thank you so much, saenvirosolutions! Wonderfully quick!",
    author: "M/s Ducol Organics & Colours Pvt. Ltd",
  },
  {
    quote:
      "We appreciate the prompt response with the drain and we are really happy with your services.",
    author: "M/s Sadguru Refinery",
  },
  {
    quote:
      "I just wanted to thank you again for providing excellent customer service... You're the best!",
    author: "M/s Chemspec Chemicals Limited",
  },
];

export const stats = [
  { value: "10+", label: "Completed Projects" },
  { value: "30+", label: "Workers" },
  { value: "2+", label: "Office Locations" },
  { value: "Free", label: "Consulting Service" },
];

export const certifications = [
  {
    title: "ISO Certification 1",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/ISO-CERTIFICATION-1-449x650.webp",
  },
  {
    title: "ISO Certification 2",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/ISO-CERTIFICATION-2-449x650.webp",
  },
  {
    title: "ISO Certification 3",
    image:
      "https://saenvirosolutions.com/wp-content/uploads/2025/12/ISO-CERTIFICATION-3-434x650.webp",
  },
];

export const galleryImages = [
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Chemical-Dosing-System-1.webp",
    alt: "Chemical Dosing System",
    category: "equipment",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/The-Clarifier.png",
    alt: "The Clarifier",
    category: "equipment",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Biological-MBBR-Treatment.webp",
    alt: "Biological MBBR Treatment",
    category: "treatment",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Tube-settlers-2.webp",
    alt: "Tube Settlers",
    category: "equipment",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Pressure-Sand-Filter-activated-carbon-filter1.webp",
    alt: "Pressure Sand Filter",
    category: "filters",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Activated-Carbon-Filters.webp",
    alt: "Activated Carbon Filters",
    category: "filters",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Reverse-Osmosis-RO-Plants-1.webp",
    alt: "Reverse Osmosis Plants",
    category: "plants",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Water-Treatment-Plants-WTP1.webp",
    alt: "Water Treatment Plants",
    category: "plants",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2021/10/Sewage-Treatment-Plants.png",
    alt: "Sewage Treatment Plants",
    category: "plants",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2025/12/Effluent-Treatment-Plant.webp",
    alt: "Effluent Treatment Plant",
    category: "plants",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2021/10/ULTRAVIOLET-UNITS.png",
    alt: "Ultraviolet Units",
    category: "equipment",
  },
  {
    src: "https://saenvirosolutions.com/wp-content/uploads/2021/10/Swimming-Pool-Water-Filtration-Plants.png",
    alt: "Swimming Pool Filtration",
    category: "plants",
  },
];

export const seoData = {
  home: {
    title: "SA Enviro Solutions | Water Treatment & Environmental Services",
    description:
      "Leading provider of water treatment, wastewater treatment, zero liquid discharge, and environmental solutions in Pune, India.",
  },
  about: {
    title: "About Us | SA Enviro Solutions",
    description:
      "Learn about SA Enviro Solutions - experts in water treatment with qualified professionals in Environmental Science, Engineering, and more.",
  },
  services: {
    title: "Our Services | SA Enviro Solutions",
    description:
      "Comprehensive water treatment services including RO plants, sewage treatment, effluent treatment, and more.",
  },
  gallery: {
    title: "Project Gallery | SA Enviro Solutions",
    description:
      "View our completed water treatment projects and equipment installations.",
  },
  contact: {
    title: "Contact Us | SA Enviro Solutions",
    description:
      "Get in touch with SA Enviro Solutions for your water treatment needs. Located in Chinchwad, Pune.",
  },
};
