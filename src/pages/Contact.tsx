import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SEO } from "@/components/layout/SEO";
import { seoData, siteConfig } from "@/constants/siteData";

// --- Theme & Constants ---
const theme = {
  colors: {
    primary: "#0f52ba", // Deep corporate sapphire blue
    primaryHover: "#0a3d8f",
    accent: "#005DE8", // Bright blue accent matching overall theme
    darkBg: "#ffffff", // Changed to white for page background
    textLight: "#ffffff",
    textDark: "#1e293b",
    textMuted: "#64748b",
    textMutedLight: "#94a3b8",
    bgWhite: "#ffffff",
    bgLightGray: "#f8fafc",
    borderLight: "#e2e8f0",
    borderDark: "rgba(13, 59, 102, 0.1)",
  },
  fonts: {
    sans: 'var(--font-family-sans)',
    serif: 'var(--font-family-serif)',
  },
  shadows: {
    card: "0 25px 50px -12px rgba(0, 0, 0, 0.05)",
    glow: "0 0 40px rgba(79, 172, 254, 0.3)",
    input: "0 2px 4px rgba(0,0,0,0.02)",
  },
};

// --- SVG Icons (Inline for zero dependencies) ---
const Icons = {
  Drop: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  ),
  Pin: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Chat: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Clock: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  User: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Building: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  ChevronDown: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Pen: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Lock: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  ArrowRight: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  PaperPlane: (props: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
};

// --- Custom Hooks ---
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);
  return matches;
};

// --- Reusable Components ---

// Updated InputField to support value, onChange, disabled, and error handling
const InputField = ({
  label,
  required,
  placeholder,
  type = "text",
  isTextArea = false,
  options = [],
  value,
  onChange,
  disabled,
  error,
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    boxShadow: isFocused ? `0 0 0 2px rgba(255, 255, 255, 0.2)` : "none",
    border: `1px solid ${error ? "#ef4444" : isFocused ? "#ffffff" : "rgba(255, 255, 255, 0.15)"}`,
    overflow: "hidden",
    display: "flex",
    alignItems: isTextArea ? "flex-start" : "center",
  };

  const inputBaseStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    border: "none",
    backgroundColor: "transparent",
    fontFamily: theme.fonts.sans,
    fontSize: "14.5px",
    color: "#ffffff",
    outline: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
      }}
    >
      {label && (
        <label
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: theme.fonts.sans,
          }}
        >
          {label} {required && <span style={{ color: "#ffffff" }}>*</span>}
        </label>
      )}
      <div style={containerStyle}>
        {isTextArea ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{ ...inputBaseStyle, minHeight: "120px", resize: "vertical" }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : options.length > 0 ? (
          <div style={{ width: "100%", position: "relative" }}>
            <select
              style={{ ...inputBaseStyle, appearance: "none", cursor: "pointer", color: value ? "#ffffff" : "rgba(255, 255, 255, 0.6)" }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              onChange={onChange}
              disabled={disabled}
            >
              <option value="" disabled hidden style={{ backgroundColor: "#0d3b66", color: "#ffffff" }}>
                {placeholder}
              </option>
              {options.map((opt: string, i: number) => (
                <option key={i} value={opt} style={{ backgroundColor: "#0d3b66", color: "#ffffff" }}>
                  {opt}
                </option>
              ))}
            </select>
            <Icons.ChevronDown
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "16px",
                color: "rgba(255, 255, 255, 0.6)",
                pointerEvents: "none",
              }}
            />
          </div>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={inputBaseStyle}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      </div>
      {error && (
        <span
          style={{
            fontSize: "12px",
            color: "#ef4444",
            fontFamily: theme.fonts.sans,
            marginTop: "-4px",
            paddingLeft: "4px",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, subtitle, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.08)"}`,
        boxShadow: isHovered ? theme.shadows.card : "none",
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          backgroundColor: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.12)",
          color: isHovered ? "#0D3B66" : "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transition: "all 0.3s ease",
        }}
      >
        <Icon style={{ width: "24px", height: "24px" }} />
      </div>
      <div>
        <h4
          style={{
            margin: "0 0 6px 0",
            fontSize: "15px",
            fontWeight: 600,
            color: "#ffffff",
            fontFamily: theme.fonts.serif,
          }}
        >
          {title}
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.5,
            fontFamily: theme.fonts.sans,
          }}
        >
          {subtitle.split("\n").map((line: string, i: number) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </motion.div>
  );
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export const validateContactForm = (
  formData: FormData,
): { errors: FormErrors; isValid: boolean } => {
  const errors: FormErrors = {};

  if (!formData.name?.trim()) {
    errors.name = "Name is required.";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (formData.name.trim().length > 50) {
    errors.name = "Name must not exceed 50 characters.";
  } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
    errors.name =
      "Name can only contain letters, spaces, hyphens, or apostrophes.";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Enter a valid email address. (e.g. user@example.com)";
  } else if (formData.email.trim().length > 100) {
    errors.email = "Email must not exceed 100 characters.";
  }

  if (!formData.phone?.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[\d\s\-()\[\]]{7,15}$/.test(formData.phone.trim())) {
    errors.phone = "Enter a valid phone number. (e.g. +1 234 567 8900)";
  }

  if (!formData.company?.trim()) {
    errors.company = "Company name is required.";
  } else if (formData.company.trim().length < 2) {
    errors.company = "Company name must be at least 2 characters.";
  } else if (formData.company.trim().length > 100) {
    errors.company = "Company name must not exceed 100 characters.";
  }

  if (!formData.service?.trim()) {
    errors.service = "Please select a service.";
  }

  if (!formData.message?.trim()) {
    errors.message = "Message is required.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (formData.message.trim().length > 1000) {
    errors.message = "Message must not exceed 1000 characters.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

// --- Background Pattern Component (matching Blog/About page hero section) ---
const BackgroundPattern = () => (
  <div style={{
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.6
  }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <linearGradient id="about-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <path d="M-100 200 C 200 100, 400 400, 800 200 S 1200 400, 1600 100" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <path d="M-100 220 C 250 120, 350 420, 850 220 S 1150 420, 1600 120" fill="none" stroke="#bae6fd" strokeWidth="0.5" opacity="0.4" />
      <path d="M-100 240 C 300 140, 300 440, 900 240 S 1100 440, 1600 140" fill="none" stroke="#e0f2fe" strokeWidth="1.5" opacity="0.3" />
      <path d="M-100 800 C 300 900, 500 600, 1000 800 S 1400 600, 1800 900" fill="none" stroke="#e0f2fe" strokeWidth="1" opacity="0.5" />
      <circle cx="10%" cy="20%" r="300" fill="url(#about-hero-grad)" opacity="0.4" />
      <circle cx="90%" cy="80%" r="400" fill="url(#about-hero-grad)" opacity="0.3" />
    </svg>
  </div>
);

export default function Contact() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Form states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: FormData = {
      name,
      email,
      phone,
      company,
      service,
      message,
    };
    const { errors: validationErrors, isValid } = validateContactForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const MESSAGE = `
      Respected Sir/Madam,

      This is ${name}, representing ${company || "N/A"}.
      I would like to inquire about ${service || "your services"}.

      You may reach me at ${phone || "N/A"} or ${email}.

      Message:
      ${message}

      Looking forward to your response.

      Sincerely,
      ${name}
    `.trim();

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE || "",
        { user_email: email, user_message: MESSAGE },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setService("");
      setMessage("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Failed to send message ❌");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  // --- Styles ---
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    fontFamily: theme.fonts.sans,
    backgroundColor: theme.colors.darkBg,
    overflow: "hidden",
  };

  const topSectionStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    width: "100%",
    paddingTop:"70px"
  };

  const leftPanelStyle: React.CSSProperties = {
    flex: isMobile ? "none" : "1.1",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: isMobile ? "32px 6% 10% 6%" : "40px 6% 8% 6%",
    color: theme.colors.textDark,
    zIndex: 1,
  };

  const leftBackgroundStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `
      linear-gradient(to right, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 60%, rgba(15, 23, 42, 0.4) 100%),
      url('https://images.unsplash.com/photo-1584483751717-b64ecfdf4dd3?q=80&w=2070&auto=format&fit=crop')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  };

  const rightPanelStyle: React.CSSProperties = {
    flex: isMobile ? "none" : "0.9",
    backgroundColor: theme.colors.darkBg,
    borderRadius: isMobile ? "40px 40px 0 0" : "40px 0 0 0",
    marginTop: isMobile ? "-40px" : "0",
    position: "relative",
    zIndex: 2,
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    padding: isMobile ? "40px 24px 20px 24px" : "40px 5% 40px 5%",
  };

  const bottomSectionStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: theme.colors.darkBg,
    padding: isMobile ? "20px 24px 60px 24px" : "40px 5% 80px 5%",
    position: "relative",
    zIndex: 2,
    display: "flex",
    justifyContent: "center",
  };

  return (
    <>
      <SEO title={seoData.contact.title} description={seoData.contact.description} />
      <div style={wrapperStyle}>
        <div style={topSectionStyle}>
          {/* --- LEFT PANEL (Visual & Storytelling) --- */}
          <div style={leftPanelStyle}>
            <BackgroundPattern />

            {/* Subtle Ambient Glow */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "10%",
                width: "300px",
                height: "300px",
                background: theme.colors.primary,
                filter: "blur(150px)",
                opacity: 0.3,
                zIndex: -1,
                borderRadius: "50%",
              }}
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ maxWidth: "600px", zIndex: 2 }}
            >
              {/* Main Typography */}
              <h1
                style={{
                  fontFamily: theme.fonts.serif,
                  fontSize: isMobile ? "2.5rem" : "clamp(2.5rem, 4.5vw, 4.5rem)",
                  lineHeight: 1.1,
                  margin: "0 0 24px 0",
                  fontWeight: 700,
                  color: "#0A1526"
                }}
              >
                Let’s Build <br />
                A Cleaner, <br />
                <span
                  style={{
                    color: theme.colors.accent,
                    fontWeight: 600,
                  }}
                >
                  Sustainable
                </span>{" "}
                <br />
                Future Together.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.6,
                  color: "#475569",
                  maxWidth: "400px",
                  margin: "0 0 40px 0",
                  fontWeight: 400,
                }}
              >
                Have a project in mind or need expert guidance?
                <br />
                We're here to help you find the right water treatment solution.
              </p>

              {/* Location Info Element */}
              <motion.div
                variants={fadeUpVariant}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "24px",
                  background: "#0D3B66",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "16px",
                  maxWidth: "400px",
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icons.Pin
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#ffffff",
                    }}
                  />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 700, color: "#ffffff", fontFamily: theme.fonts.serif }}>
                    Global Solutions. Local Commitment.
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.5 }}>
                    {siteConfig.contact.address}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* --- RIGHT PANEL (Reach Us Directly) --- */}
          <div style={rightPanelStyle}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                backgroundColor: "#0D3B66",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "24px",
                padding: isMobile ? "32px 20px" : "48px 40px",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
                width: "100%",
                maxWidth: isMobile ? "100%" : "420px",
                alignSelf: isMobile ? "stretch" : "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#ffffff",
                  }}
                >
                  Reach Us Directly
                </h3>
                <div style={{ width: "40px", height: "2px", backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "20px",
                }}
              >
                <InfoCard
                  icon={Icons.Phone}
                  title="Call Us"
                  subtitle={siteConfig.contact.phone}
                  delay={0.1}
                />
                <InfoCard
                  icon={Icons.Mail}
                  title="Email Us"
                  subtitle={siteConfig.contact.email}
                  delay={0.2}
                />
                <InfoCard
                  icon={Icons.Chat}
                  title="Live Chat"
                  subtitle={"Available Mon-Sat\n9:00 AM - 6:00 PM"}
                  delay={0.3}
                />
                <InfoCard
                  icon={Icons.Clock}
                  title="Business Hours"
                  subtitle={"Mon - Sat\n9:00 AM - 6:00 PM"}
                  delay={0.4}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- BOTTOM FULL-WIDTH SECTION (Form) --- */}
        <div style={bottomSectionStyle}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundColor: "#0D3B66",
              borderRadius: "32px",
              padding: isMobile ? "32px 20px" : "48px 40px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
              width: "100%",
              maxWidth: "1000px", // Keeps the wide form nicely constrained and premium
            }}
          >
            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "48px 20px" }}>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "24px",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontFamily: theme.fonts.serif,
                  }}
                >
                  Thank You!
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: theme.fonts.sans,
                    lineHeight: 1.5,
                  }}
                >
                  We'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Form Header */}
                <div style={{ marginBottom: "32px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "28px",
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: theme.fonts.serif,
                    }}
                  >
                    Send Us a Message
                  </h3>
                </div>

                {/* Form Grid (Optimized for wide layout) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "24px",
                    marginBottom: "32px",
                  }}
                >
                  <InputField
                    label="Name"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e: any) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: "" }));
                    }}
                    disabled={isLoading}
                    error={errors.name}
                  />
                  <InputField
                    label="Email"
                    required
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: "" }));
                    }}
                    disabled={isLoading}
                    error={errors.email}
                  />
                  <InputField
                    label="Phone"
                    placeholder="+91 00000 00000"
                    type="tel"
                    value={phone}
                    onChange={(e: any) => {
                      setPhone(e.target.value);
                      setErrors((p) => ({ ...p, phone: "" }));
                    }}
                    disabled={isLoading}
                    error={errors.phone}
                  />
                  <InputField
                    label="Company"
                    placeholder="Company name"
                    value={company}
                    onChange={(e: any) => {
                      setCompany(e.target.value);
                      setErrors((p) => ({ ...p, company: "" }));
                    }}
                    disabled={isLoading}
                    error={errors.company}
                  />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <InputField
                      label="Service Interested In"
                      placeholder="e.g., Water Treatment Plant, RO System"
                      value={service}
                      onChange={(e: any) => {
                        setService(e.target.value);
                        setErrors((p) => ({ ...p, service: "" }));
                      }}
                      disabled={isLoading}
                      error={errors.service}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <InputField
                      label="Message"
                      required
                      placeholder="Tell us about your requirements..."
                      isTextArea={true}
                      value={message}
                      onChange={(e: any) => {
                        setMessage(e.target.value);
                        setErrors((p) => ({ ...p, message: "" }));
                      }}
                      disabled={isLoading}
                      error={errors.message}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <motion.button
                  type="submit"
                  whileHover={{
                    scale: isLoading ? 1 : 1.01,
                    backgroundColor: isLoading ? "#005DE8" : "#0047b3",
                  }}
                  whileTap={{ scale: isLoading ? 1 : 0.99 }}
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "16px 32px",
                    backgroundColor: "#005DE8",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: isLoading ? "not-allowed" : "pointer",
                    opacity: isLoading ? 0.8 : 1,
                    fontFamily: theme.fonts.sans,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin"
                        style={{
                          width: "20px",
                          height: "20px",
                          fill: "none",
                          animation: "spin 1s linear infinite",
                        }}
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          style={{ opacity: 0.25 }}
                        />
                        <path
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          style={{ opacity: 0.75 }}
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Icons.PaperPlane style={{ width: "20px" }} />
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

        {/* --- MAP SECTION --- */}
        <section style={{ height: "384px", backgroundColor: "rgba(255, 255, 255, 0.05)", position: "relative", zIndex: 2 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1756641332554!2d73.7718946!3d18.5209623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0fd0cfe2717%3A0xe534b896a7893206!2sSA%20ENVIRO%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1771998843750!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SA Enviro Solutions Location"
          ></iframe>
        </section>
      </div>
    </>
  );
}
