// Site data extracted from JSON - all content comes from here

import Image from "../assets/about-hero.jpg";
import Image1 from "@/assets/about-hero.jpg";
import Image2 from "@/assets/hero-water-treatment.jpg";
import Image3 from "@/assets/hero2.jpg";
import Image4 from "@/assets/hero3.jpg";
import { Product } from "./type";
import { Description } from "@radix-ui/react-toast";
import { Layout } from "lucide-react";

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

interface DropDown {
  name: string;
  key: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: DropDown[];
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
    phone: "+91 8087758585",
    email: "sales@saenvirosolutions.com",
    address: "Chinchwad, Pune, Maharashtra, India",
  },
  social: {
    facebook: "https://facebook.com/saenvirosolutions",
    linkedin: "https://linkedin.com/company/saenvirosolutions",
    twitter: "https://twitter.com/saenvirosolutions",
  },
};

const Product_DropDown = [
  {
    name: "Sewage Treatment Plants",
    key: "sewage_treatment_plants",
  },
  {
    name: "Zero Liquid Discharge (ZLD)",
    key: "zero_liquid_discharge",
  },
  {
    name: "Effluent Treatment Plants",
    key: "effluent_treatment_plants",
  },
  {
    name: "Water Treatment Plants",
    key: "water_treatment_plants",
  },
  {
    name: "Ultra Filtration",
    key: "ultra_filtration",
  },
  {
    name: "Reverse Osmosis",
    key: "reverse_osmosis",
  },
  {
    name: "Demineralisation Plants",
    key: "demineralisation_plants",
  },
  {
    name: "Water Softeners Plant",
    key: "water_softeners_plant",
  },
];

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Products",
    href: "/products",
    dropdown: Product_DropDown,
  },
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

export const products: Product[] = [
  {
    key: "sewage_treatment_plants",
    main: {
      title: "Sewage Treatment Plants",
      description:
        "On the Activated Sludge Process basis sewage treatment plants are designed. The advanced technologies involved to treat sewage such as MBBR technology, UASB technology and Sequential Batch Reactor (SBR). These technologies are discussed below:",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/stp1-585x390.jpg",
        alt: "Sewage Treatment Plant - View 1",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2021/10/Sewage-Treatment-Plants.png",
        alt: "Sewage Treatment Plant - Overview",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/stp3-585x390.jpg",
        alt: "Sewage Treatment Plant - View 2",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/stp4-585x390.jpg",
        alt: "Sewage Treatment Plant - View 3",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/stp6-585x390.jpg",
        alt: "Sewage Treatment Plant - View 4",
      },
    ],

    Page_Description: [
      {
        type: "p",
        content:
          "We offer a huge range of Sewage Treatment Plants, which are used in the national as well as international market. These products are manufactured using latest techniques using modern machines and we offer these products in a cost effective as well as reliable manner. Our products are easily available in different specifications and we check these on the basis of different quality parameter using various quality controller. These products are available with customized services to our clients.",
      },
      {
        type: "subtitle",
        content: "Sequential Batch Reactor (SBR)",
      },
      {
        type: "p",
        content:
          "SBR is an application of Activated Sludge Process that is operated on a batch basis. It is used in small communities where space is limited. The design principles for this reactor are keyed to the following treatment steps:",
      },
      {
        type: "keyValue",
        items: [
          {
            key: "Fill",
            value: "During this phase, the basin receives influent wastewater.",
          },
          {
            key: "React",
            value: "During this phase aeration and mixing units are on.",
          },
          {
            key: "Settle",
            value:
              "Air and mixing are turned off. The activated sludge is allowed to settle.",
          },
        ],
      },
      {
        type: "subtitle",
        content: "Moving Bed Biofilm Reactor (MBBR)",
      },
      {
        type: "p",
        content:
          "MBBR is an economical and efficient solution for wastewater treatment. MBBR system consists of an aeration tank containing special plastic elements called media, to support the growth of biofilm in the reactor. These media have a large surface area for optimal contact with water, air and bacteria. The bacteria grow on the surface of the media and break down the organic matter from the wastewater. It significantly increases the capacity and efficiency of the existing plant and decreases the carbon footprint.",
      },
      {
        type: "subtitle",
        content: "Membrane Bioreactor (MBR)",
      },
      {
        type: "p",
        content:
          "MBR is used in biological treatment with membrane separation. Membrane Bioreactor consists of a biological reactor with suspended biomass and solids separation by Microfiltration (MF) or Ultrafiltration (UF) membranes. ",
      },
      {
        type: "subtitle",
        content: "Anaerobic Treatment",
      },
      {
        type: "p",
        content:
          "Anaerobic Treatment is an energy-efficient process in which bacteria transforms organic waste in the wastewater into biogas in the absence of oxygen. To achieve this oxygen-free environment, the entry of air into anaerobic tanks is prevented, typically by a gastight cover.",
      },
      {
        type: "subtitle",
        content: "Up flow Anaerobic Sludge Blanket (UASB)",
      },
      {
        type: "p",
        content:
          "Up flow Anaerobic Sludge Blanket (UASB) technology, also known as UASB reactor is a form of an anaerobic digester that is used for wastewater treatment. In this process, wastewater flows upward through the blanket of sludge and microorganism degrade the organic matter and produces methane gas as a by-product, which further can be used as fuel.",
      },
      {
        type: "subtitle",
        content: "Integrated Sewage Treatment Plant",
      },
      {
        type: "p",
        content:
          "We offer an excellent quality range of Integrated Sewage Treatment Plants, which are used for the treatment of both sewage water as well as solid wet waste together. These products are used as an alternative energy source and the treat water is used for different purposes such as farming, gardening, washing and flushing. Our products are available at genuine prices to our clients and these are available on the basis of latest techniques.",
      },
      {
        type: "subtitle",
        content: "Application:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Residential Buildings",
          "Industries",
          "Hotels & Resorts",
          "Education Institutes",
        ],
      },
      {
        type: "subtitle",
        content: "Combined Sewage Cum Effluent Treatment Plants",
      },
      {
        type: "p",
        content:
          "We offer a wide range of Combined Sewage cum Effluent Treatment Plants that satisfies two purposes simultaneously. These are efficiently designed to treat and manage both sewage and effluent at the same time. This plant proficiently drains out water from sewage and effluents and hence making it usable for other application such as gardening, farming and washing. Our range of combined sewage cum effluent treatment plants is available in standard specification and can also be customized to meet the varied requirements of our clients.",
      },
      {
        type: "subtitle",
        content: "Features:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Low operating cost",
          "Less manpower engaged",
          "Compact in size",
          "Low electrical consumption",
        ],
      },
    ],
  },
  {
    key: "zero_liquid_discharge",
    main: {
      title: "Zero Liquid Discharge (ZLD)",
      description:
        "ZLD is a strategic wastewater management system that ensures that there will be no discharge of industrial wastewater into the environment. It is achieved by treating wastewater through recycling and then recovery and reuse for industrial purpose.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/zld-1024x332.png",
        alt: "Zero Liquid Discharge",
      },
    ],
  },
  {
    key: "effluent_treatment_plants",
    main: {
      title: "Effluent Treatment Plant",
      description:
        "We at SA Enviro Solutions manufacture and supply effluent treatment plants. The effluent treatment plants are designed to treat the effluent coming from different process of the plant. The treatment of different effluents varies with the type of effluent. The industrial effluent treatment plants involve different stages of treatment including physio-chemical treatment and biological treatment followed by tertiary treatment. Integrated functions with simple control make the operation much easier. Our engineers can also custom design the effluent treatment plants based on the specific application requirement of the customers. Our Industrial effluent treatment plants have a compact design and can be easily installed on the site.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/etp4-409x390.png",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/etp5-585x390.png",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/etp3.png",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/etp2.png",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/etp1.jpg",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
    ],
    Page_Description: [
      {
        type: "subtitle",
        content: "The Effluent Treatment Plants Applications:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Manufacturing industry",
          "Pharmaceutical industry",
          "Chemical & Paint manufacturing companies",
          "Textile, Paper & Dyes",
          "Dairy industry",
          "Plating & Coating industry",
          "Coolant treatment",
          "Pickling industry",
          "Food Industries",
          "Fertilizer Industries",
          "Automobile Industries",
          "Foundries",
          "Sugar Industries",
          "Distilleries",
        ],
      },
    ],
  },
  {
    key: "water_treatment_plants",
    main: {
      title: "Water Treatment Plants",
      description:
        "SA Enviro Solutions supply a wide range of Water Treatment Plants, Packaged Water Treatment Plants. We also offer effective turnkey solutions for these plants to our clients. Wide range of plants are demanded in API, Chemical, Paint, Food processing and Dye industries.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/WTP.png",
        alt: "Industrial Water Treatment Plant System",
      },
    ],
    Page_Description: [
      {
        type: "subtitle",
        content: "Water Treatment Plants supplied by SAES",
      },
      {
        type: "list",
        style: "number",
        items: [
          "Drinking Water Treatment Plants",
          "Municipal Water Treatment Plants",
          "Raw Water Treatment Plants",
          "Packaged Drinking Water Treatment Plants",
          "Sea Water Treatment Plants",
          "Turnkey Water Treatment Plants",
          "Process Water Treatment Plants",
          "Automatic (Scada operated) Water Treatment Plants",
        ],
      },
    ],
  },
  {
    key: "ultra_filtration",
    main: {
      title: "Ultra Filtration (UF)",
      description:
        "Ultrafiltration is a low-pressure membrane process used to separate bacteria, viruses, and high molecular weight compounds colloidal and particulate matters from a feed stream.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/UF1.png",
        alt: "Ultra Filtration (UF)",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/UF2.png",
        alt: "Ultra Filtration (UF) membrane unit with vertical pressure vessels",
      },
    ],
    Page_Description: [],
  },
  {
    key: "reverse_osmosis",
    main: {
      title: "Reverse osmosis (RO)",
      description:
        "RO is a water purification process that uses a partially permeable membrane to separate ions, unwanted molecules and larger particles from drinking water. In reverse osmosis, an applied pressure is used to overcome osmotic pressure, a colligative property that is driven by chemical potential differences of the solvent, a thermodynamic parameter.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/RO1-585x390.png",
        alt: "Reverse Osmosis (RO) ",
      },
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/RO2-538x390.jpg",
        alt: "Reverse Osmosis (RO) system with blue filtration tanks and control panel",
      },
    ],
    Page_Description: [
      {
        type: "p",
        content:
          "Reverse osmosis differs from filtration in that the mechanism of fluid flow is by osmosis across a membrane. The predominant removal mechanism in membrane filtration is straining, or size exclusion, where the pores are 0.01 micrometre's or larger, so the process can theoretically achieve perfect efficiency regardless of parameters such as the solution's pressure and concentration. Reverse osmosis instead involves solvent diffusion across a membrane that is either nonporous or uses nanofiltration with pores 0.001 micrometre's in size.",
      },
      {
        type: "p",
        content:
          "The predominant removal mechanism is from differences in solubility or diffusivity, and the process is dependent on pressure, solute concentration, and other conditions. Based on the raw water quality, the pre-treatment process for RO Plants may consist of all or some of the following treatment steps:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "Clarification followed by Sand Filtration for Turbidity removal",
          "Water disinfection with chlorine",
          "Hardness reduction by Softening",
          "Addition of scale inhibitor",
          "Reduction of free chlorine using sodium bisulfite/ Activated carbon filters",
          "Final removal of suspended particles using cartridge filters",
        ],
      },
      {
        type: "p",
        content:
          "SA Enviro Solutions designs RO plant for Industrial, Commercial, Institutional & Domestic use on small to large scale.",
      },
    ],
  },
  {
    key: "demineralisation_plants",
    main: {
      title: "Demineralisation Plants [DM]",
      description:
        "It is the process of removing mineral salts from water by using the ion exchange process. Demineralisation produces water of a higher quality than conventional distillation.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2022/04/DMplants-585x340.gif",
        alt: "Demineralisation [DM] Plant process diagram",
      },
    ],
    Page_Description: [
      {
        type: "p",
        content:
          "We SA Enviro Solutions manufacture a wide range of custom-built Demineralised Water plant for industrial process water applications, with inherent design to conserve water, and save costs. The DM Plants are available in different sizes and materials, manually operated or fully Automatic, ready to install & are available as standard models.",
      },
      {
        type: "p",
        content:
          "Demineralized Water also known as Deionized Water; Water that has had its mineral ions removed. Mineral ions such as cations of sodium, calcium, iron, copper, etc and anions such as chloride, sulphate, nitrate, etc are common ions present in Water.",
      },
      {
        type: "p",
        content:
          "Deionization is a physical process which uses specially-manufactured ion exchange resins which provides ion exchange site for the replacement of the mineral salts in Water with Water forming H+ and OH- ions. Because the majority of Water impurities are dissolved salts, deionization produces a high purity Water that is generally similar to distilled Water, and this process is quick and without scale build-up.",
      },
      {
        type: "p",
        content:
          "De-mineralization technology is the proven process for treatment of Water. A DM Water System produces mineral free Water by operating on the principles of ion exchange, Degasification, and polishing. Demineralized Water System finds wide application in the field of steam, power, process, and cooling.",
      },
    ],
  },
  {
    key: "water_softeners_plant",
    main: {
      title: "Water Softeners Plant",
      description:
        "The Water Softeners are available in different sizes and materials, manually operated or fully Automatic and ready to install. The Water Softening Plants are available as standard models or custom-built versions for specific needs.",
    },
    images: [
      {
        url: "https://saenvirosolutions.com/wp-content/uploads/2021/10/logosaeenviro.gif",
        alt: "SA Enviro Solutions Company Logo",
      },
    ],
    Page_Description: [
      {
        type: "subtitle",
        content: "The Range of Water Softening Plants:",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "FRP Water Softeners",
          "MS Water Softeners",
          "MS Rubber lined Water Softeners",
        ],
      },
      {
        type: "subtitle",
        content: "Advantages of water softening",
      },
      {
        type: "list",
        style: "bullet",
        items: [
          "High capacity Cation exchange resin",
          "Consistent treated water quality",
          "Low operating costs",
          "Easy to install and operate",
          "Produces soft, non-scale forming water",
        ],
      },
    ],
  },
];
