import clsx from "clsx";

type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "display-xxl"
  | "display-xl"
  | "display-lg"
  | "hero-heading"
  | "hero-text"
  | "section-heading"
  | "section-subheading"
  | "card-title"
  | "card-description"
  | "testimonial-quote"
  | "testimonial-author"
  | "button"
  | "nav"
  | "footer"
  | "form-label"
  | "input"
  | "badge"
  | "copyright";

type TextSize = "sm" | "md" | "lg" | "xl";
type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  className?: string;
  as?: React.ElementType;
}

export default function Text({
  children,
  variant = "body",
  size,
  weight,
  className,
  as: Component = "p",
}: TextProps) {
  const baseStyles = "text-foreground mb-2";

  const variantStyles = {
    title: "title-style font-display",
    subtitle: "subtitle-style font-display",
    body: "text-base font-sans",
    caption: "text-xs font-sans text-muted-foreground",
    "display-xxl": "text-display-xxl font-display",
    "display-xl": "text-display-xl font-display",
    "display-lg": "text-display-lg font-display",
    "hero-heading": "text-hero-heading font-display",
    "hero-text": "text-hero-text font-sans",
    "section-heading": "text-section-heading font-display",
    "section-subheading": "text-section-subheading font-sans",
    "card-title": "text-card-title font-display",
    "card-description": "text-card-description font-sans",
    "testimonial-quote": "text-testimonial-quote font-display",
    "testimonial-author": "text-testimonial-author font-sans",
    button: "text-button-text font-sans",
    nav: "text-nav-link font-sans",
    footer: "text-footer-link font-sans",
    "form-label": "text-form-label font-sans",
    input: "text-input-text font-sans",
    badge: "text-badge-text font-sans",
    copyright: "text-copyright-text font-sans",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
  };

  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };

  return (
    <Component
      className={clsx(
        baseStyles,
        variantStyles[variant],
        size && sizeStyles[size],
        weight && weightStyles[weight],
        className
      )}
    >
      {children}
    </Component>
  );
}
