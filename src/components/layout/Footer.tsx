import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUp,
  LucideIcon,
} from "lucide-react";
import { siteConfig, navigation } from "@/constants/siteData";
import logo from "@/assets/logo.webp";

// ─── Theme ───────────────────────────────────────────────────────────────────
const t = {
  bg: "#050914",
  surface: "#0A1121",
  textPrimary: "#FFFFFF",
  textSecondary: "#8E9AB3",
  accent: "#00A3FF",
  accentLight: "#4DD0E1",
  border: "#1A2438",
};

// ─── Social icon map ─────────────────────────────────────────────────────────
const socialIconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
};

// ─── Static link data ─────────────────────────────────────────────────────────
const companyLinks = navigation
  .filter((n) => n.name !== "Product")
  .map((n) => ({ name: n.name, to: n.href }));

const solutionLinks = [
  { name: "Water Treatment Plants", to: "/product/water_treatment_plants" },
  { name: "Sewage Treatment Plants", to: "/product/sewage_treatment_plants" },
  { name: "Effluent Treatment Plants", to: "/product/effluent_treatment_plants" },
  { name: "Zero Liquid Discharge", to: "/product/zero_liquid_discharge" },
  { name: "Reverse Osmosis", to: "/product/reverse_osmosis" },
];



// ─── Animation variants ───────────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 50, damping: 15 },
  },
};

const iconHover = {
  rest: { scale: 1 as number },
  hover: {
    scale: 1.12,
    transition: { type: "spring" as const, stiffness: 300 },
  },
};

// ─── useWindowSize hook ───────────────────────────────────────────────────────
const useWindowSize = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
};

// ─── Sub-components ───────────────────────────────────────────────────────────
interface FooterLinkItem {
  name: string;
  to: string;
}

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: FooterLinkItem[];
}) => (
  <motion.div
    variants={fadeUp}
    style={{ display: "flex", flexDirection: "column", gap: "24px" }}
  >
    <div>
      <h4
        style={{
          fontSize: "13px",
          fontWeight: 600,
          margin: "0 0 14px 0",
          letterSpacing: "0.1em",
          color: t.textPrimary,
        }}
      >
        {title}
      </h4>
      <div style={{ width: "24px", height: "2px", backgroundColor: t.border }} />
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {links.map((link) => (
        <motion.div
          key={link.name}
          initial="rest"
          whileHover="hover"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <motion.span
            variants={{
              rest: { x: 0, color: t.accent, opacity: 0.7 },
              hover: { x: 4, color: t.accentLight, opacity: 1 },
            }}
            style={{ display: "flex" }}
          >
            <ChevronRight size={13} />
          </motion.span>
          <Link
            to={link.to}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ textDecoration: "none" }}
          >
            <motion.span
              variants={{
                rest: { color: t.textSecondary },
                hover: { color: t.textPrimary },
              }}
              style={{ fontSize: "14px", display: "block" }}
            >
              {link.name}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const ContactItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <motion.div
    whileHover={{ x: 4 }}
    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
  >
    <motion.div
      whileHover={{
        backgroundColor: "rgba(0,163,255,0.12)",
        borderColor: t.accent,
      }}
      style={{
        width: "38px",
        height: "38px",
        borderRadius: "50%",
        border: `1px solid ${t.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: t.accent,
        flexShrink: 0,
        transition: "all 0.3s ease",
      }}
    >
      {icon}
    </motion.div>
    <div style={{ paddingTop: "8px" }}>{children}</div>
  </motion.div>
);

// ─── Leaf SVG decoration ──────────────────────────────────────────────────────
const LeafIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="11" stroke={t.accent} strokeWidth="1" strokeOpacity="0.4" />
    <path
      d="M9 15C9 15 7.5 10.5 12 7.5C16.5 4.5 18 9 18 9C18 9 19.5 13.5 15 16.5C10.5 19.5 9 15 9 15Z"
      stroke={t.accent}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14L17 8"
      stroke={t.accent}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Main Footer ──────────────────────────────────────────────────────────────
export const Footer = () => {
  const width = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: t.bg,
        color: t.textPrimary,
        fontFamily:
          '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow top-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle at 0% 0%, rgba(0,163,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Main grid ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "60px 5% 48px" : "80px 5% 56px",
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "1fr 1fr"
              : "2fr 1.2fr 1.5fr 1.8fr",
            gap: isMobile ? "48px" : isTablet ? "40px" : "36px",
            marginBottom: "64px",
          }}
        >
          {/* ── Column 1: Brand ── */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              paddingRight: isMobile ? 0 : "32px",
            }}
          >
            {/* Logo */}
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ display: "inline-block" }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: `1px solid ${t.border}`,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
              >
                <img
                  src={logo}
                  alt="SA Enviro Solutions"
                  style={{
                    height: "67px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>

            {/* Divider */}
            <div
              style={{ width: "36px", height: "2px", backgroundColor: t.border }}
            />

            {/* Description */}
            <p
              style={{
                color: t.textSecondary,
                fontSize: "14px",
                lineHeight: 1.85,
                margin: 0,
              }}
            >
              {siteConfig.description.substring(0, 160)}...
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIconMap[platform.toLowerCase()];
                if (!Icon) return null;
                return (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="rest"
                    whileHover="hover"
                    variants={iconHover}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      border: `1px solid ${t.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: t.textSecondary,
                      textDecoration: "none",
                      transition: "border-color 0.2s, color 0.2s, background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = t.accent;
                      el.style.color = t.accent;
                      el.style.background = "rgba(0,163,255,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = t.border;
                      el.style.color = t.textSecondary;
                      el.style.background = "transparent";
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ── Column 2: Company ── */}
          <FooterColumn title="COMPANY" links={companyLinks} />

          {/* ── Column 3: Products ── */}
          <FooterColumn title="PRODUCTS" links={solutionLinks} />

          {/* ── Column 4: Contact ── */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div>
              <h4
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  margin: "0 0 14px 0",
                  letterSpacing: "0.1em",
                  color: t.textPrimary,
                }}
              >
                CONTACT
              </h4>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: t.border,
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <ContactItem icon={<MapPin size={16} />}>
                <span
                  style={{
                    color: t.textSecondary,
                    fontSize: "14px",
                    lineHeight: 1.6,
                  }}
                >
                  {siteConfig.contact.address}
                </span>
              </ContactItem>

              <ContactItem icon={<Phone size={16} />}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  {siteConfig.contact.phone.split("/").map((p, i) => {
                    const clean = p.trim();
                    return (
                      <a
                        key={i}
                        href={`tel:${clean.replace(/[^0-9+]/g, "")}`}
                        style={{
                          color: t.textSecondary,
                          textDecoration: "none",
                          fontSize: "14px",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            t.accentLight)
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            t.textSecondary)
                        }
                      >
                        {clean}
                      </a>
                    );
                  })}
                </div>
              </ContactItem>

              <ContactItem icon={<Mail size={16} />}>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                >
                  {siteConfig.contact.email.split(",").map((e, i) => {
                    const clean = e.trim();
                    return (
                      <a
                        key={i}
                        href={`mailto:${clean}`}
                        style={{
                          color: t.textSecondary,
                          textDecoration: "none",
                          fontSize: "13px",
                          wordBreak: "break-all",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(ev) =>
                          ((ev.currentTarget as HTMLElement).style.color =
                            t.accentLight)
                        }
                        onMouseLeave={(ev) =>
                          ((ev.currentTarget as HTMLElement).style.color =
                            t.textSecondary)
                        }
                      >
                        {clean}
                      </a>
                    );
                  })}
                </div>
              </ContactItem>

              <ContactItem icon={<Globe size={16} />}>
                <a
                  href="https://saenvirosolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: t.textSecondary,
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = t.accentLight)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = t.textSecondary)
                  }
                >
                  www.saenvirosolutions.com
                </a>
              </ContactItem>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Divider ── */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: t.border,
            marginBottom: "28px",
          }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "20px" : "0",
            position: "relative",
            width: "100%",
          }}
        >
          {/* Copyright */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            
            <span
              style={{
                color: t.textSecondary,
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              © {currentYear} {siteConfig.name}. All rights reserved. Managed by{" "}
              <motion.a
                href="https://agilewaters.com"
                target="_blank"
                rel="noopener noreferrer"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  color: t.accentLight,
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-block",
                }}
              >
                AgileWaters
              </motion.a>
              .
            </span>
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -4 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              position: isMobile ? "static" : "absolute",
              right: 0,
            }}
          >
            <motion.div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: `1px solid ${t.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.textSecondary,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = t.accent;
                el.style.color = t.accent;
                el.style.background = "rgba(0,163,255,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = t.border;
                el.style.color = t.textSecondary;
                el.style.background = "transparent";
              }}
            >
              <ArrowUp size={16} />
            </motion.div>
            <span
              style={{
                color: t.textSecondary,
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              Back to Top
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};
