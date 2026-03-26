interface SCHEMA {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

interface SEO {
  title: string;
  description: string;
  keywords: string;
  url: string;
  image: string;
  schema: SCHEMA;
}

interface main {
  title: string;
  description: string;
  image:string;
  seo: SEO;
}

interface ParagraphBlock {
  type: "p";
  content: string;
}

interface SubtitleBlock {
  type: "subtitle";
  content: string;
}

interface KeyValueBlock {
  type: "keyValue";
  items: {
    key: string;
    value: string;
  }[];
}

interface ListBlock {
  type: "list";
  style: "bullet" | "number";
  items: string[];
}

export type PageDescriptionBlock =
  | ParagraphBlock
  | SubtitleBlock
  | KeyValueBlock
  | ListBlock;

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  key: string;
  main: main;
  images: ProductImage[];
  Page_Description?: PageDescriptionBlock[];
}

export interface SiteConfig {
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
  stats: {
    Experience: string;
    Members: string;
  };
}

export interface DropDown {
  name: string;
  key?: string;
  href?: string;
  description?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: DropDown[];
}
export interface HeroSlideItem {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  buttons: ButtonItem[];
}

export interface CTA {
  primary: {
    text: string;
    href: string;
  };
}

export interface ButtonItem {
  label: string;
  name: string;
  key: string;
}

export interface HeroData {
  cta: CTA;
  slides: HeroSlideItem[];
}

export interface Team_Member {
  name: string;
  title: string;
  details: string;
  functionality: string;
  highlight: boolean;
  image?: string;
}

export interface LogoItem {
  id: string;
  alt: string;
  imgUrl: string;
}
