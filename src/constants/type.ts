interface main {
  title: string;
  description: string;
}

// Paragraph Block
interface ParagraphBlock {
  type: "p";
  content: string;
}

// Subtitle Block
interface SubtitleBlock {
  type: "subtitle";
  content: string;
}

// Key-Value Block
interface KeyValueBlock {
  type: "keyValue";
  items: {
    key: string;
    value: string;
  }[];
}

// List Block
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
    experience: string;
  };
}

export interface DropDown {
  name: string;
  key?: string;
  href?: string;
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
}

export interface CTA {
  primary: {
    text: string;
    href: string;
  };
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
}

export interface LogoItem {
  id: string;
  alt: string;
  imgUrl: string;
}
