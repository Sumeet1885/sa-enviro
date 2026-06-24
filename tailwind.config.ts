import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-family-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-family-serif)", "Merriweather", "Georgia", "serif"],
        serif: ["var(--font-family-serif)", "Merriweather", "Georgia", "serif"],
      },
      fontSize: {
        "display-xxl": ["var(--text-display-xxl-size)", { lineHeight: "var(--line-height-tight)" }],
        "display-xl": ["var(--text-display-xl-size)", { lineHeight: "var(--line-height-tight)" }],
        "display-lg": ["var(--text-display-lg-size)", { lineHeight: "var(--line-height-tight)" }],
        "hero-heading": ["var(--text-hero-heading-size)", { lineHeight: "var(--line-height-tight)" }],
        "hero-text": ["var(--text-hero-text-size)", { lineHeight: "var(--line-height-relaxed)" }],
        "section-heading": ["var(--text-section-heading-size)", { lineHeight: "var(--line-height-tight)" }],
        "section-subheading": ["var(--text-section-subheading-size)", { lineHeight: "var(--line-height-normal)" }],
        "card-title": ["var(--text-card-title-size)", { lineHeight: "var(--line-height-tight)" }],
        "card-description": ["var(--text-card-description-size)", { lineHeight: "var(--line-height-relaxed)" }],
        "testimonial-quote": ["var(--text-testimonial-quote-size)", { lineHeight: "var(--line-height-relaxed)" }],
        "testimonial-author": ["var(--text-testimonial-author-size)", { lineHeight: "var(--line-height-normal)" }],
        "button-text": ["var(--text-button-text-size)", { lineHeight: "1" }],
        "nav-link": ["var(--text-nav-link-size)", { lineHeight: "var(--line-height-normal)" }],
        "footer-link": ["var(--text-footer-link-size)", { lineHeight: "var(--line-height-normal)" }],
        "form-label": ["var(--text-form-label-size)", { lineHeight: "var(--line-height-normal)" }],
        "input-text": ["var(--text-input-text-size)", { lineHeight: "var(--line-height-normal)" }],
        "badge-text": ["var(--text-badge-text-size)", { lineHeight: "1" }],
        "copyright-text": ["var(--text-copyright-text-size)", { lineHeight: "var(--line-height-normal)" }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        water: {
          deep: "hsl(var(--water-deep))",
          ocean: "hsl(var(--water-ocean))",
          sea: "hsl(var(--water-sea))",
          sky: "rgb(var(--water-sky) / <alpha-value>)",
          light: "hsl(var(--water-light))",
          foam: "hsl(var(--water-foam))",
        },
        steel: {
          DEFAULT: "hsl(var(--steel))",
          dark: "hsl(var(--steel-dark))",
        },
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out",
        "fade-in-left": "fade-in-left 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.6s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "gradient-ocean": "hsl(var(--gradient-ocean))",
        "gradient-sky": "hsl(var(--gradient-sky))",
        "gradient-water": "hsl(var(--gradient-water))",
        "gradient-hero": "hsl(var(--gradient-hero))",
      },
      boxShadow: {
        water: "hsl(var(--shadow-water))",
        soft: "hsl(var(--shadow-md))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
