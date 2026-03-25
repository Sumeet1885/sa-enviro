import Image1 from "@/assets/about-hero.webp";
import Image2 from "@/assets/hero-water-treatment.webp";
import Image3 from "@/assets/hero2.webp";
import Image4 from "@/assets/hero3.webp";
import {
  Product,
  SiteConfig,
  NavigationItem,
  HeroData,
  Team_Member,
  LogoItem,
} from "./type";

export const siteConfig: SiteConfig = {
  name: "SA Enviro Solutions",
  shortName: "SAES",
  tagline: "Leading Water Treatment Industry Into New Age",
  description:
    "SA Enviro Solutions (SAES) provides quality and customized services to address Environmental Aspects, specifically in Water and Wastewater Treatment, Zero Liquid Discharge, Air Pollution Control, Energy, Safety & Solid-Waste Management.",
  contact: {
    phone: "+91 8087748585 / 8087758585",
    email: "sales@saenvirosolutions.com",
    address: "Chinchwad, Pune, Maharashtra, India",
  },
  social: {
    facebook: "https://facebook.com/saenvirosolutions",
    linkedin: "https://linkedin.com/company/saenvirosolutions",
    twitter: "https://twitter.com/saenvirosolutions",
  },
  stats: {
    Experience: "16",
    Members: "45",
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
  {
    name: "AMC Services",
    key: "amc_services",
  },
];

const Option_Dropdown = [
  { name: "Gallery", href: "/gallery" },
  { name: "Client", href: "/client" },
  { name: "Team", href: "/team" },
];

export const navigation: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Product",
    href: "/product",
    dropdown: Product_DropDown,
  },
  { name: "Services", href: "/services" },

  { name: "Blogs", href: "/blogs" },

  { name: "Option", href: "/option", dropdown: Option_Dropdown },

  { name: "Contact", href: "/contact" },
];

export const team_member: Team_Member[] = [
  {
    name: "Santosh D. Urdukhe",
    title: "Director & CEO",
    details:
      "Santosh Urdukhe, an expert in environmental aspects, has a Master’s degree in Environment Science. He has industrial experience in pollution control and allied services and products, specifically in designing, fabricating, setting up and maintaining water treatment plants. \n*Erection and commissioning of CETP 27.5MLD at Taloja MIDC, Mumbai. \n*Operation and Maintenance of CETP 27.5MLD at Taloja MIDC, Mumbai, Pune. \n*Erection and commissioning of ETP (HTDS) 120m3/day, ETP (LTDS) 360m3/day, UF and RO 360m3/day at Clariant India Ltd, Bonthapally, Telangana. \n*Erection and commissioning of STP 350m3/day at Chambal fertilisers and chemicals ltd, Kota Rajasthan. \n*In Mahindra Vehicle Manufacturing Ltd, Chakan, Pune Operation and Maintenance of ETP (1560m3/day), STP (480m3/day) & (168m3/day). \n*In Radico NV Distilleries Maharashtra Ltd, Shendra, Aurangabad Operation and Maintenance of ETP (1020m3/day). \n*In Mayuge Sugars & Distilleries Ltd, Uganda, Africa Operation and Maintenance of Biogas Plant (400m3/day), CPU (400m3/day) and Bio-Composting.",
    functionality:
      "Functionally he looks after Project Management, Procurement & Quality.",
    highlight: false,
  },
  {
    name: "Amruta S. Urdukhe",
    title: "Sales Co-ordinator",
    details:
      "She deals with Lab Co-ordination. Her expertise is in NABL certification, audit and water, soil, hazardous waste, air analysis. She did her masters in Environmental sciences from Pune University. Her involvement in Academic Co-ordination, Lectures, Practical’s, internal examination, project guide for M.Sc. Environment Science Students and EIA project work for nearly 6 years in at Dept. of Environmental Science, Vasantdada Sugar Institute, Manjri BK, Pune.",
    functionality: "Functionally she looks after Finance and Sales.",
    highlight: false,
  },
  {
    name: "Ganesh Gaikwad",
    title: "HR & Admin Head",
    details:
      "His qualification D.E.E. 1994 Maharashtra Board and PGDBM in HR 2009 Pune University. Master in Business Study in HR 2010 Pune University Dip. Labour Law 2011 Pune University. Dip. Industrial Safety 2021 Maharashtra Board. DNV GL certified Lead Auditor for ISO 9001:2015. License holder for Electrical Supervisor. His total experience in manufacturing, process & service industry is for 25 years. He worked as a Deputy General Manager with M/s Sadguru Sugar Factory Ltd.",
    functionality:
      "Functionally he looks after Human Resource, Admin & Employee Relations.",
    highlight: false,
  },
  {
    name: "Dr. Vikrant Aher",
    title: "Process Head",
    details:
      "He is a Process Co-ordinator and expert in the field of Remote Sensing, GIS and Environmental Engineering. He did his masters in Environmental Science and Geoinformatics from Pune University and doing his doctorate from University of Pune, Pune. He also done post graduate diploma in Water & Wastewater. He has taught Geoinformatics, Land Use-Planning and Environmental Engineering courses at Dept. of Environmental Science, University of Pune for nearly 8 years. Since joining Rincon Environmental Consultancy in 2013, he has worked extensively in GIS based study for EIA project, Command area development study, Water Audit, Pollution studies and Environmental Management Studies, Environmental Audit, Design and Turnkey Installation of Air Pollution Control Systems and Effluent Treatment Plants.",
    functionality: "Functionally he looks after Process and Technical support.",
    highlight: false,
  },
  {
    name: "Raju B Wagaskar",
    title: "EHS Manager",
    details:
      "Dynamic professional with nearly 24 years of experience in Safety, Utility Projects. Expert in Safety, Legal compliance in various Industries. He has done his Mechanical Engineering from Pune University and Advance Diploma in Industrial Safety from Mumbai Board. Expert in operation and maintenance of equipment in Facility management. Worked with Mahindra and Mahindra for 14 years as Project and Operational Manager. Prior to joining SA Enviro solutions also worked as Operations Manager in M/s Vibra Industries which is in wiring harness manufacturing.",
    functionality:
      "Functionally he looks after Operations, Maintenance & Safety.",
    highlight: false,
  },
  {
    name: "Umakant Maharana",
    title: "Technical Consultant",
    details:
      "He is a certified energy auditor. His qualification is in Mechanical Engineering. He has total 32 years of experience in the field of waste water treatment, research and development. Handling Trunkey projects. He is a Proprietor of EEcon Consulting Engineers.",
    functionality: "Functionally he is a Third-Party Technical Advisor.",
    highlight: true,
  },
];

export const heroData: HeroData = {
  cta: {
    primary: { text: "Explore", href: "/services" },
  },
  slides: [
    {
      id: 1,
      title: "Water Treatment Plant",
      subtitle: "Reliable Water Purification Solutions",
      desc: "Our Water Treatment Plant ensures the efficient purification and management of water using advanced technologies, delivering safe, sustainable, and high-quality water for industrial and community needs.",
      img: Image3,
      buttons: [
        {
          label: "UF",
          name: "Ultra Filtration",
          key: "ultra_filtration",
        },
        {
          label: "RO",
          name: "Reverse Osmosis",
          key: "reverse_osmosis",
        },
        {
          label: "DP",
          name: "Demineralisation Plants",
          key: "demineralisation_plants",
        },
        {
          label: "WSP",
          name: "Water Softeners Plant",
          key: "water_softeners_plant",
        },
      ],
    },
    {
      id: 2,
      title: "Waste Water Treatment",
      subtitle: "Efficient Wastewater Management Solutions",
      desc: "Our wastewater treatment systems are designed to effectively remove contaminants, ensuring environmentally safe discharge and sustainable water reuse through advanced treatment technologies.",
      img: Image2,
      buttons: [
        {
          label: "STP",
          name: "Sewage Treatment Plants",
          key: "sewage_treatment_plants",
        },
        {
          label: "ZLD",
          name: "Zero Liquid Discharge ",
          key: "zero_liquid_discharge",
        },
        {
          label: "ETP",
          name: "Effluent Treatment Plants",
          key: "effluent_treatment_plants",
        },
      ],
    },
    {
      id: 3,
      title: "Service",
      subtitle: "Reliable Annual Maintenance Solutions",
      desc: "Our AMC services ensure regular inspection, maintenance, and timely support to keep your systems operating efficiently, minimizing downtime and extending equipment lifespan.",
      img: Image1,

      buttons: [
        {
          label: "AMC",
          name: "AMC Services",
          key: "amc_services",
        },
      ],
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
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Chemical-Dosing-System_m9hwjp.webp",
    link: "/services/chemical-dosing",
  },
  {
    id: "clarifier",
    title: "The Clarifier",
    description:
      "The Clarifiers are settling tanks used to separate solid particulates from liquids. SA Enviro Solutions provide variety of Clarifiers to suit various solid separation methods in settling of solids.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/The-Clarifier_sf5j93.webp",
    link: "/services/clarifier",
  },
  {
    id: "biological-treatment",
    title: "Biological Treatment",
    description:
      "The biologically accomplishment of waste water is done by using a variety of microorganisms.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Biological-MBBR-Treatment_1_lzlwpo.webp",
    link: "/services/biological-treatment",
  },
  {
    id: "tube-settlers",
    title: "Tube Settlers",
    description:
      "The Tube settlers are designed to enter flocculated water through multiple tube deck from the bottom and flow upward in angle of 60°.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/Tube-settlers-2_hqcfdl.webp",
    link: "/services/tube-settlers",
  },
  {
    id: "pressure-sand-filters",
    title: "Pressure Sand Filters",
    description:
      "These Filters are custom designed to suit the process requirement. The backwash is taken after every interval to maintain the efficiency of filter and filtrate water quality.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725956/Pressure-Sand-Filter-activated-carbon-filter1_yqs77v.webp",
    link: "/services/pressure-sand-filters",
  },
  {
    id: "activated-carbon-filters",
    title: "Activated Carbon Filters",
    description:
      "The Activated Carbon Filters consist of Activated carbon granules supported by very fine quartz filter media. The various grades of carbon are available for specialized treatments.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Activated-Carbon-Filters_pyagph.webp",
    link: "/services/activated-carbon-filters",
  },
  {
    id: "dual-media-filters",
    title: "Dual Media Filters",
    description:
      "The Dual Media Filter are utilized for higher flow rates with a smaller footprint. High filtration velocities are achieved by proper selection of Media, and designing of Distribution.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725955/logosaeenviro_o9itfb.gif",
    link: "/services/dual-media-filters",
  },
  {
    id: "reverse-osmosis",
    title: "Reverse Osmosis (RO)",
    description:
      "RO is a water purification process that uses a partially permeable membrane to separate ions, unwanted molecules and larger particles from drinking water.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725956/Reverse-Osmosis-RO-2_ttxitp.webp",
    link: "/services/reverse-osmosis",
  },
  {
    id: "water-treatment-plants",
    title: "Water Treatment Plants",
    description:
      "SA Enviro Solutions supply a wide range of Water Treatment Plants, Packaged Water Treatment Plants.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773727163/Water-Treatment-Plants-WTP1_ggis8i.webp",
    link: "/services/water-treatment-plants",
  },
  {
    id: "sewage-treatment",
    title: "Sewage Treatment Plants",
    description:
      "We offer a huge range of Sewage Treatment Plants, which are used in the national as well as international market.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants_ms44gc.webp",
    link: "/services/sewage-treatment",
  },
  {
    id: "effluent-treatment",
    title: "Effluent Treatment Plant",
    description:
      "We at SA Enviro Solutions manufacture and supply effluent treatment Plants. The effluent treatment plants are designed to treat the effluent coming from different process of the plant.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/Effluent-Treatment-Plant_e9js1o.webp",
    link: "/services/effluent-treatment",
  },
  {
    id: "dm-plants",
    title: "Demineralisation Plants (DM Plants)",
    description:
      "It is the process of removing mineral salts from water by using the ion exchange process. Demineralization produces water of a higher quality than conventional distillation.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/DMplants-585x340_dih1yh.gif",
    link: "/services/dm-plants",
  },
  {
    id: "water-softeners",
    title: "Water Softeners Plant",
    description:
      "The Water Softeners are available in different sizes and materials, manually operated or fully Automatic and ready to install.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725955/logosaeenviro_o9itfb.gif",
    link: "/services/water-softeners",
  },
  {
    id: "ultraviolet-units",
    title: "Ultraviolet Units",
    description:
      "UV disinfection systems for water treatment, providing chemical-free sterilization.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants-Tube_ei19jk.webp",
    link: "/services/ultraviolet-units",
  },
  {
    id: "swimming-pool-filtration",
    title: "Swimming Pool Water Filtration Plants",
    description:
      "We offer a large variety of Pool Filtration Systems, Dosing Systems & Accessories. The skimmer and level deck techniques ensure perfect water quality at all times.",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/Swimming-Pool-Water-Filtration-Plants_vokkvx.webp",
    link: "/services/swimming-pool-filtration",
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
  { value: "66", label: "Completed Projects" },
  { value: "45", label: "Workers" },
  { value: "2", label: "Office Locations" },
  { value: "Free", label: "Consulting Service" },
];

export const BroucherStats = [
  { value: "66", label: "Completed Projects" },
  { value: "45", label: "Workers" },
  { value: "16", label: "Experience" },
];
export const certifications = [
  {
    title: "ISO Certification 1",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/ISO-CERTIFICATION-1-449x650_ndrbmd.webp",
  },
  {
    title: "ISO Certification 2",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/ISO-CERTIFICATION-2-449x650_cbdcgb.webp",
  },
  {
    title: "ISO Certification 3",
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/ISO-CERTIFICATION-3-434x650_g7uik2.webp",
  },
];

export const galleryImages = [
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Chemical-Dosing-System_m9hwjp.webp",
    alt: "Chemical Dosing System",
    category: "equipment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/The-Clarifier_sf5j93.webp",
    alt: "The Clarifier",
    category: "equipment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Biological-MBBR-Treatment_1_lzlwpo.webp",
    alt: "Biological MBBR Treatment",
    category: "treatment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/Tube-settlers-2_hqcfdl.webp",
    alt: "Tube Settlers",
    category: "equipment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725956/Pressure-Sand-Filter-activated-carbon-filter1_yqs77v.webp",
    alt: "Pressure Sand Filter",
    category: "filters",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Activated-Carbon-Filters_pyagph.webp",
    alt: "Activated Carbon Filters",
    category: "filters",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773727163/Water-Treatment-Plants-WTP1_ggis8i.webp",
    alt: "Water Treatment Plants",
    category: "plants",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants_ms44gc.webp",
    alt: "Sewage Treatment Plants",
    category: "plants",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/Effluent-Treatment-Plant_e9js1o.webp",
    alt: "Effluent Treatment Plant",
    category: "plants",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants-Tube_ei19jk.webp",
    alt: "Ultraviolet Units",
    category: "equipment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/Swimming-Pool-Water-Filtration-Plants_vokkvx.webp",
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

  team: {
    title: "Our Team | SA Enviro Solutions",
    description:
      "Meet the experienced professionals behind SA Enviro Solutions, dedicated to delivering innovative and sustainable water treatment solutions.",
  },

  blogs: {
    title: "Blogs & Insights | SA Enviro Solutions",
    description:
      "Explore expert articles and insights on water treatment, wastewater management, zero liquid discharge, environmental compliance, and sustainability.",
  },

  products: {
    title: "Our Products | SA Enviro Solutions",
    description:
      "Discover our range of advanced water treatment products including RO plants, sewage treatment plants, effluent treatment systems, and custom solutions.",
  },

  clients: {
    title: "Our Clients | SA Enviro Solutions",
    description:
      "Trusted by leading industries and organizations across India for reliable and efficient water and environmental solutions.",
  },
};

export const blogs = [
  {
    id: 1,
    title: "Learn about Water Softeners Plant",
    excerpt:
      "The Water Softeners are available in different sizes and materials, manually operated or fully automatic and ready to install.",
    content: [
      {
        type: "p",
        content:
          "The Water Softeners are available in different sizes and materials, manually operated or fully automatic and ready to install. The Water Softening Plants are available as standard models or custom-built versions for specific needs.",
      },
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
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
    author: "SA Enviro Solutions",
    authorAvatar: "",
    date: "Oct 22, 2021",
    category: "Uncategorized",
    tags: [
      "Water Softeners",
      "Water Softening Plant",
      "Industrial Water Softener",
      "Commercial Water Softener",
      "Automatic Water Softener",
      "Manual Water Softener",
    ],
    comments: [],
  },
  {
    id: 2,
    title: "What is Sewage Treatment Plants",
    excerpt:
      "The Water Softeners are available in different sizes and materials, manually operated or fully automatic and ready to install.",
    content: [
      {
        type: "p",
        content:
          "On the Activated Sludge Process basis sewage treatment plants are designed. The advanced technologies involved to treat sewage such as MBBR technology, UASB technology and Sequential Batch Reactor (SBR). These technologies are discussed below:",
      },
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
          "MBR is used in biological treatment with membrane separation. Membrane Bioreactor consists of a biological reactor with suspended biomass and solids separation by Microfiltration (MF) or Ultrafiltration (UF) membranes.",
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
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/v1773725958/Sewage-Treatment-Plants_ms44gc.webp",
    author: "SA Enviro Solutions",
    authorAvatar: "",
    date: "Oct 22, 2021",
    category: "Uncategorized",
    tags: [
      "Sewage Treatment Plant",
      "STP Plant",
      "Wastewater Treatment Plant",
      "Industrial Sewage Treatment",
      "Commercial STP",
      "Integrated Sewage Treatment Plant",
    ],
    comments: [],
  },
  {
    id: 3,
    title: "About Effluent Treatment Plant",
    excerpt:
      "We at SA Enviro Solutions manufacture and supply effluent treatment Plants. The effluent treatment plants are designed to treat the effluent coming from different process of the plant. The treatment of different effluents varies with the type of effluent.",
    content: [
      {
        type: "p",
        content:
          "We at SA Enviro Solutions manufacture and supply effluent treatment Plants. The effluent treatment plants are designed to treat the effluent coming from different process of the plant. The treatment of different effluents varies with the type of effluent. The industrial effluent treatment plants involve different stages of treatment including physio-chemical treatment and biological treatment followed by tertiary treatment. Integrated functions with simple control make the operation much easier. Our engineers can also custom design the effluent treatment plants based on the specific application requirement of the customers. Our Industrial effluent treatment plants have a compact design and can be easily installed on the site.",
      },
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
    image:
      "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
    author: "SA Enviro Solutions",
    authorAvatar: "",
    date: "Oct 22, 2021",
    readTime: "1 min read",
    category: "",
    tags: [
      "Effluent Treatment Plant",
      "ETP Plant",
      "Industrial Effluent Treatment",
      "Wastewater Treatment System",
      "Industrial Wastewater Management",
      "Physico Chemical Treatment",
    ],
    comments: [],
  },
];

export const LOGOS: LogoItem[] = [
  {
    id: "picture-1",
    alt: "client-1",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726344/Picture1-585x439_w28rjd.webp",
  },
  {
    id: "picture-2",
    alt: "client-2",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726345/Picture2-1-585x439_to7rpo.webp",
  },
  {
    id: "picture-3",
    alt: "client-3",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726346/Picture3-1-585x439_n8fzlk.webp",
  },
  {
    id: "picture-4",
    alt: "client-4",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726348/Picture4_iwjefs.webp",
  },
  {
    id: "picture-5",
    alt: "client-5",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726349/Picture5-585x439_zryxb9.webp",
  },
  {
    id: "picture-6",
    alt: "client-6",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726350/Picture6-585x439_eyiyb9.webp",
  },
  {
    id: "picture-7",
    alt: "client-7",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726353/Picture8-585x439_dzubk3.webp",
  },
  {
    id: "picture-8",
    alt: "client-8",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726352/Picture7-585x439_tjwivx.webp",
  },
  {
    id: "picture-9",
    alt: "client-9",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726356/Picture13-1-585x439_gh4pb1.webp",
  },
  {
    id: "picture-10",
    alt: "client-10",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726357/Picture14-1-585x439_jvd1ov.webp",
  },
  {
    id: "picture-11",
    alt: "client-11",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726359/Picture15-1-585x439_outf58.webp",
  },
  {
    id: "picture-12",
    alt: "client-12",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726360/Picture16-1-585x439_qnbtal.webp",
  },
  {
    id: "picture-13",
    alt: "client-13",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726362/Picture17-585x439_zskpcz.webp",
  },
  {
    id: "picture-14",
    alt: "client-14",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726363/Picture18-585x439_t9uska.webp",
  },
  {
    id: "picture-15",
    alt: "client-15",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726365/Picture19-1-585x439_qxrveh.webp",
  },
  {
    id: "picture-16",
    alt: "client-16",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726366/Picture20-585x439_y1krni.webp",
  },
  {
    id: "picture-17",
    alt: "client-17",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726340/7-585x439_nt9hkx.webp",
  },
  {
    id: "picture-18",
    alt: "client-18",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726343/9-585x439_y4qrly.webp",
  },
  {
    id: "picture-19",
    alt: "client-19",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726341/8-585x439_zirh5b.webp",
  },
  {
    id: "picture-20",
    alt: "client-20",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726337/5-585x439_eptnq7.webp",
  },
  {
    id: "picture-21",
    alt: "client-21",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726335/4-585x439_co3eap.webp",
  },
  {
    id: "picture-22",
    alt: "client-22",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726338/6-585x439_yqalth.webp",
  },
  {
    id: "picture-23",
    alt: "client-23",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726333/3-585x439_fhul1z.webp",
  },
  {
    id: "picture-24",
    alt: "client-24",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726332/1-585x439_qbewgv.webp",
  },
  {
    id: "picture-25",
    alt: "client-25",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773726333/2-585x439_ub9vgm.webp",
  },
  {
    id: "picture-26",
    alt: "client-26",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1774417431/Picture11-1-585x439_mr4esk.webp",
  },
  {
    id: "picture-27",
    alt: "client-27",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1774417430/Picture9-1-585x439_yi7wc5.webp",
  },
  {
    id: "picture-28",
    alt: "client-28",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1774417430/Picture12-1-585x439_bqebff.webp",
  },
  {
    id: "picture-29",
    alt: "client-29",
    imgUrl: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1774417430/Picture10-1-585x439_omix0l.webp",
  },
];

export const products: Product[] = [
  {
    key: "sewage_treatment_plants",
    main: {
      title: "Sewage Treatment Plants",
      description:
        "On the Activated Sludge Process basis sewage treatment plants are designed. The advanced technologies involved to treat sewage such as MBBR technology, UASB technology and Sequential Batch Reactor (SBR). These technologies are discussed below:",
      seo: {
        title:
          "Sewage Treatment Plant (STP) Manufacturer in India | SA Enviro Solutions",
        description:
          "Advanced Sewage Treatment Plants using SBR, MBBR & UASB technology for residential, industrial and commercial wastewater treatment.",
        keywords:
          "sewage treatment plant, STP plant manufacturer, wastewater treatment system, sewage water treatment plant India, SBR STP, MBBR STP, UASB technology",
        url: "https://yourdomain.com/products/sewage-treatment-plants",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants_ms44gc.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Sewage Treatment Plant",
          name: "Sewage Treatment Plant (STP)",
          description:
            "Design, manufacturing and installation of Sewage Treatment Plants using SBR, MBBR and UASB technologies for residential, industrial and commercial wastewater treatment.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pune",
              addressCountry: "India",
            },
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725959/stp1-585x390_qdovao.webp",
        alt: "Sewage Treatment Plant - View 1",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/Sewage-Treatment-Plants_ms44gc.webp",
        alt: "Sewage Treatment Plant - Overview",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725959/stp3-585x390_xu5ct9.webp",
        alt: "Sewage Treatment Plant - View 2",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725960/stp4-585x390_haxc9t.webp",
        alt: "Sewage Treatment Plant - View 3",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725960/stp6-585x390_gsjiju.webp",
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
      seo: {
        title:
          "Zero Liquid Discharge (ZLD) System | Industrial Wastewater Recycling",
        description:
          "Zero Liquid Discharge (ZLD) systems designed to recycle industrial wastewater and eliminate liquid discharge while maximizing water reuse.",
        keywords:
          "zero liquid discharge system, ZLD plant, industrial wastewater recycling, water reuse system, ZLD wastewater treatment",
        url: "https://yourdomain.com/products/zero-liquid-discharge",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725965/zld-1024x332_b4pteu.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Zero Liquid Discharge System",
          name: "Zero Liquid Discharge (ZLD) System",
          description:
            "Industrial Zero Liquid Discharge systems designed to recycle wastewater and eliminate liquid discharge through advanced water recovery technologies.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725965/zld-1024x332_b4pteu.webp",
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
      seo: {
        title:
          "Effluent Treatment Plant (ETP) Manufacturer | Industrial Wastewater Treatment",
        description:
          "Effluent Treatment Plants designed for industries like chemical, pharma, textile and food processing to treat industrial wastewater safely.",
        keywords:
          "effluent treatment plant, ETP plant manufacturer, industrial wastewater treatment, effluent treatment system, ETP plant India",
        url: "https://yourdomain.com/products/effluent-treatment-plants",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/etp5-585x390_kxoqs6.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Effluent Treatment Plant",
          name: "Industrial Effluent Treatment Plant (ETP)",
          description:
            "Industrial effluent treatment plants designed to treat wastewater from chemical, pharmaceutical, textile and manufacturing industries.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/Tube-settlers-2_hqcfdl.webp",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725953/etp5-585x390_kxoqs6.webp",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/Biological-MBBR-Treatment_1_lzlwpo.webp",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/etp2_sdicc6.webp",
        alt: "Industrial Effluent Treatment Plant Setup",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/etp1_jty4yv.webp",
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
      seo: {
        title:
          "Water Treatment Plant Manufacturer | Industrial & Municipal WTP",
        description:
          "High quality water treatment plants for industrial, municipal and commercial applications including packaged and turnkey WTP solutions.",
        keywords:
          "water treatment plant, WTP plant manufacturer, industrial water treatment system, municipal water treatment plant, packaged WTP",
        url: "https://yourdomain.com/products/water-treatment-plants",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725964/WTP_yvvfad.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Water Treatment Plant",
          name: "Industrial Water Treatment Plants",
          description:
            "Design and supply of industrial and municipal water treatment plants including packaged and turnkey water purification systems.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725964/WTP_yvvfad.webp",
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
      seo: {
        title:
          "Ultra Filtration (UF) System | Industrial Water Filtration Solutions",
        description:
          "Ultrafiltration (UF) membrane systems for removing bacteria, viruses and suspended particles from water for industrial and commercial use.",
        keywords:
          "ultra filtration system, UF water treatment plant, UF membrane filtration, ultrafiltration plant India",
        url: "https://yourdomain.com/products/ultra-filtration",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/UF1_cbo64i.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Ultra Filtration System",
          name: "Ultra Filtration (UF) Water Treatment System",
          description:
            "Ultrafiltration membrane systems for removing bacteria, viruses and suspended particles from water for industrial and commercial use.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/UF1_cbo64i.webp",
        alt: "Ultra Filtration (UF)",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725962/UF2_imr2jn.webp",
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
      seo: {
        title:
          "Reverse Osmosis (RO) Plant | Industrial RO Water Purification Systems",
        description:
          "Reverse Osmosis (RO) plants for industrial, commercial and domestic water purification with advanced membrane filtration technology.",
        keywords:
          "reverse osmosis plant, RO water treatment system, industrial RO plant manufacturer, RO water purification system",
        url: "https://yourdomain.com/products/reverse-osmosis",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725957/RO1-585x390_u0sgvg.webp",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Reverse Osmosis Plant",
          name: "Industrial Reverse Osmosis (RO) Water Treatment Plant",
          description:
            "Industrial reverse osmosis water purification systems designed for commercial, institutional and industrial water treatment.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725957/RO1-585x390_u0sgvg.webp",
        alt: "Reverse Osmosis (RO) ",
      },
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725958/RO2-538x390_bjubd5.webp",
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
      seo: {
        title:
          "Demineralisation Plant (DM Plant) | Industrial Deionized Water Systems",
        description:
          "Demineralisation plants designed to remove mineral salts from water using ion exchange technology for industrial applications.",
        keywords:
          "demineralisation plant, DM water plant, deionized water system, industrial DM plant manufacturer",
        url: "https://yourdomain.com/products/demineralisation-plants",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/DMplants-585x340_dih1yh.gif",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Demineralisation Plant",
          name: "Demineralisation (DM) Water Treatment Plant",
          description:
            "Demineralisation plants using ion exchange technology to remove dissolved mineral salts and produce high purity industrial water.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725952/DMplants-585x340_dih1yh.gif",
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
      seo: {
        title: "Industrial Water Softener Plant | Hard Water Treatment Systems",
        description:
          "Water softening plants designed to remove hardness from water using ion exchange resin for industrial and commercial use.",
        keywords:
          "water softener plant, industrial water softener system, hard water treatment plant, water softening system India",
        url: "https://yourdomain.com/products/water-softeners-plant",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Water Softening System",
          name: "Industrial Water Softener Plant",
          description:
            "Water softening plants designed to remove hardness from water using ion exchange resin technology for industrial and commercial applications.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
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
  {
    key: "amc_services",
    main: {
      title: "AMC Services",
      description:
        'SA Enviro Solutions provide Annual Maintenance Contract (AMC) Services for ETP (Effluent Treatment Plants), WTP (Water Treatment Plants), WWTP (Wastewater Treatment Plants), STP (Sewage Treatment Plants), DM (Demineralization) Plants, RO (Reverse Osmosis) Plants and our setup is situated in Pune, Maharashtra, India. We are specialized in providing "Operation and Maintenance" (AMC) facility including of Health, Safety & Water and Wastewater Treatment Plants.',
      seo: {
        title:
          "AMC Services for STP, ETP, WTP & RO Plants | SA Enviro Solutions",
        description:
          "Professional Annual Maintenance Contract (AMC) services for STP, ETP, WTP, RO and DM plants ensuring smooth and efficient plant operation.",
        keywords:
          "AMC services for water treatment plants, STP maintenance service, ETP AMC service, wastewater treatment plant maintenance",
        url: "https://yourdomain.com/products/amc-services",
        image:
          "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Water Treatment Plant Maintenance",
          name: "AMC Services for Water Treatment Plants",
          description:
            "Annual Maintenance Contract (AMC) services for STP, ETP, WTP, RO and DM plants ensuring efficient operation and long-term reliability.",
          provider: {
            "@type": "Organization",
            name: "SA Enviro Solutions",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pune",
              addressCountry: "India",
            },
          },
          areaServed: "India",
        },
      },
    },
    images: [
      {
        url: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773725961/logosaeenviro_o9itfb.gif",
        alt: "SA Enviro Solutions Company Logo",
      },
    ],
    Page_Description: [
      {
        type: "subtitle",
        content: "AMC Service:",
      },
      {
        type: "p",
        content:
          "We have a dedicated expert service department as well as highly trained plant operators who have been given extensive responsibilities on the plant sites. This staff ensures that all the plants are operated as per the required standards and to the fullest capacity. The water that is treated in these plants has been analysed in labs approved by the Government. They take care that all the maintenance schedules are adhered to do and all guidelines followed. When we undertake Annual maintenance contracts, the service engineers we have hired make plant visits and see if all the jobs are being completed as per the requirements.",
      },
      {
        type: "p",
        content:
          "The arrangement and supply of Spare parts for such plants is also a part of the AMC contracts.",
      },
    ],
  },
];
