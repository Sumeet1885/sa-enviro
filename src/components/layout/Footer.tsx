import { Link } from "react-router-dom";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, navigation, services } from "@/constants/siteData";
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

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "20px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 2px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 0 1px rgba(255,255,255,0.06)",
                  transition: "all 0.35s ease",
                }}
                className="hover:bg-white/[0.13] hover:border-white/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.28)]"
              >
                  <motion.img
                    src={logo}
                    alt="Company Logo"
                    className="w-full h-auto max-h-24 object-contain relative z-10"
                  />
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
            <h3 className="font-display text-lg font-semibold mb-6 ">
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
              
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group shrink-0">
                  <Phone className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {siteConfig.contact.phone.split('/').map((phone, index) => {
                    const cleanPhone = phone.trim();
                    const telLink = cleanPhone.replace(/[^0-9+]/g, '');
                    return (
                      <a
                        key={index}
                        href={`tel:${telLink}`}
                        className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                      >
                        {cleanPhone}
                      </a>
                    );
                  })}
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-white group shrink-0">
                  <Mail className="w-5 h-5 transition-colors duration-200 group-hover:text-black" />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {siteConfig.contact.email.split(',').map((email, index) => {
                    const cleanEmail = email.trim();
                    return (
                      <a
                        key={index}
                        href={`mailto:${cleanEmail}`}
                        className="text-water-light/80 hover:text-water-sky transition-colors text-sm break-all"
                      >
                        {cleanEmail}
                      </a>
                    );
                  })}
                </div>
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

