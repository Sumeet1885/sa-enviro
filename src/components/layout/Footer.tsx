import { Link } from "react-router-dom";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, navigation, services, products } from "@/constants/siteData";
import logo from "@/assets/logo.webp";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
  website: Globe,
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const featuredServices = services.slice(0, 6);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dark-section">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center group">
              {/* Outer container pill */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "20px",
                  padding: "6px 14px 6px 6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow:
                    "0 2px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.06)",
                  transition: "all 0.35s ease",
                }}
                className="hover:bg-white/[0.13] hover:border-white/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.28)]"
              >
                {/* Logo icon box */}
                <motion.div
                  whileHover={{
                    scale: 1.25,
                    transition: { duration: 0.7, ease: "easeInOut" },
                  }}
                  style={{

                    borderRadius: "14px",
                    width: "40px",
                    height: "40px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,1), 0 0 0 1px rgba(255,255,255,0.6)",
                  }}
                  className="sm:!w-[52px] sm:!h-[52px] sm:!rounded-[16px]"
                >
                  {/* Top highlight streak */}
                  <span
                    style={{
                      position: "absolute",
                      top: "1px",
                      left: "8px",
                      right: "8px",
                      height: "1px",
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)",
                      borderRadius: "9999px",
                    }}
                  />

                  <motion.img
                    src={logo}
                    alt="Company Logo"
                    width={40}
                    height={40}
                    className="w-7 h-7 sm:w-10 sm:h-10 object-contain relative z-10"
                    animate={{
                      filter: [
                        "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                        "drop-shadow(0 2px 8px rgba(30,100,200,0.3))",
                        "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                      ],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* Text */}
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                  <span
                    className="font-display text-xl font-bold"
                    style={{
                      color: "#ffffff",
                      letterSpacing: "-0.01em",
                      textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                    }}
                  >
                    {siteConfig.shortName}
                  </span>
                  <motion.span
                    className="text-xs font-medium tracking-widest uppercase"
                    style={{
                      marginTop: "2px",
                      background:
                        "linear-gradient(90deg, #93d0ff, #c8e8ff, #7ec8f8, #93d0ff)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  >
                    Enviro Solutions
                  </motion.span>
                </div>
              </div>
            </Link>
            <p className=" text-sm leading-relaxed">
              {siteConfig.description.substring(0, 150)}...
            </p>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIconMap[platform.toLowerCase()];
                if (!Icon) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group"
                  >
                    <Icon className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => {

                if (item.name === "Product") return null;


                if (item.name === "Options" && item.dropdown) {
                  return item.dropdown.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.href}
                        onClick={handleScrollToTop}
                        className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ));
                }
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={handleScrollToTop}
                      className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {featuredServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    onClick={handleScrollToTop}
                    className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group">
                  <MapPin className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                </div>
                <span className=" text-sm hover:text-water-sky">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-water-light/80 hover:text-water-sky transition-colors text-sm"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group">
                    <Phone className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                  </div>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3  hover:text-water-sky transition-colors text-sm "
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group">
                    <Mail className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                  </div>
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-water-ocean/30">
        <div className="container-wide py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-water-light/60 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              onClick={handleScrollToTop}
              className="text-water-light/60 hover:text-water-sky transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              onClick={handleScrollToTop}
              className="text-water-light/60 hover:text-water-sky transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
