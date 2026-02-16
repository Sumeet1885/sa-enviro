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
