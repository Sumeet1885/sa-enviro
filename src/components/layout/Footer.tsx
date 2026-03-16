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

  return (
    <footer className="dark-section">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  scale: 1.25,

                  transition: { duration: 0.7, ease: "easeInOut" },
                }}
                className={`
              w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center 
              transition-all duration-700 relative flex-shrink-0 border-2 bg-gradient-to-r from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-3xl 
              
            `}
              >
                <motion.img
                  src={logo}
                  alt="Company Logo"
                  className="w-7 h-7 sm:w-10 sm:h-10 object-contain relative z-10"
                  animate={{
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <div>
                <span className="font-display text-xl font-bold">
                  {siteConfig.shortName}
                </span>
                <span className="block text-xs gradient-water-deep -mt-1">
                  Enviro Solutions
                </span>
              </div>
            </Link>
            <p className=" text-sm leading-relaxed">
              {siteConfig.description.substring(0, 150)}...
            </p>
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                const Icon = socialIconMap[platform.toLowerCase()];
                if (!Icon) return null; // skip if no matching icon found

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
              {navigation.map(
                (item) =>
                  !item.dropdown && (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ),
              )}
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
              className="text-water-light/60 hover:text-water-sky transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
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
