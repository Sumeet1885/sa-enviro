import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Linkedin,
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
  bg: "#0D3B66",
  surface: "#0A1121",
  textPrimary: "#FFFFFF",
  textSecondary: "#FFFFFF",
  accent: "#00A3FF",
  accentLight: "#4DD0E1",
  border: "rgba(255, 255, 255, 0.2)",
};

// ─── Custom Whatsapp Icon Component ─────────────────────────────────────────
const WhatsappIcon = ({ size = 16, ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.704 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── Social icon map ─────────────────────────────────────────────────────────
const socialIconMap: Record<string, React.ComponentType<any>> = {
  linkedin: Linkedin,
  instagram: Instagram,
  whatsapp: WhatsappIcon,
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
          fontSize: "16px",
          fontWeight: 800,
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
              style={{ fontSize: "15px", display: "block" }}
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
                  fontSize: "16px",
                  fontWeight: 800,
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
