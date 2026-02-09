import { Link } from "react-router-dom";
import {
  Droplets,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";
import { siteConfig, navigation, services } from "@/constants/siteData";
import logo from "@/assets/logo.webp";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const featuredServices = services.slice(0, 6);

  return (
    <footer className="bg-water-deep text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg  flex items-center justify-center">
                <img src={logo} alt="Company Logo" />
                {/* <Droplets className="w-6 h-6 text-water-deep" /> */}
              </div>
              <div>
                <span className="font-display text-xl font-bold">
                  {siteConfig.shortName}
                </span>
                <span className="block text-xs text-water-light -mt-1">
                  Enviro Solutions
                </span>
              </div>
            </Link>
            <p className="text-water-light/80 text-sm leading-relaxed">
              {siteConfig.description.substring(0, 150)}...
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-water-ocean/50 flex items-center justify-center hover:bg-water-sea transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-water-ocean/50 flex items-center justify-center hover:bg-water-sea transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-water-ocean/50 flex items-center justify-center hover:bg-water-sea transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-water-light/80 hover:text-water-sky transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
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

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-water-sky flex-shrink-0 mt-0.5" />
                <span className="text-water-light/80 text-sm">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center gap-3 text-water-light/80 hover:text-water-sky transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-water-sky flex-shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-3 text-water-light/80 hover:text-water-sky transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-water-sky flex-shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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
