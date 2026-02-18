import clsx from "clsx";

type TextVariant = "title" | "subtitle" | "body" | "caption";
type TextSize = "sm" | "md" | "lg" | "xl";
type TextWeight = "normal" | "medium" | "bold";

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
  size = "md",
  weight = "normal",
  className,
  as: Component = "p",
}: TextProps) {
  const baseStyles = "text-foreground mb-2 ";

  // className="ff-display font-bold mt-10 mb-4 pb-3"
  //               style={{
  //                 fontSize: "1.45rem",
  //                 color: "var(--c-text)",
  //                 borderBottom: "2px solid var(--c-primary-light)",
  //               }}

  const variantStyles = {
    title: "title-style",
    subtitle: "subtitle-style",
    body: "",
    caption: "text-muted-foreground",
  };

  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
  };

  const weightStyles = {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  return (
    <Component
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        weightStyles[weight],
        className,
      )}
    >
      {children}
    </Component>
  );
}
