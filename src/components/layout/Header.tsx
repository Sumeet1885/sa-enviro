import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplets, Waves, ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Logo from "@/assets/logo.webp";

import { navigation, siteConfig } from "@/constants/siteData";

// Navigation item type with optional dropdown
export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: {
    name: string;
    key: string;
  }[];
}

// Dropdown Component
interface DropdownProps {
  item: NavigationItem;
  isScrolled: boolean;
  index: number;
}

const Dropdown: React.FC<DropdownProps> = ({ item, isScrolled, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsOpen(true), 300);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setIsOpen(false), 200);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  if (!item.dropdown) {
    return (
      <motion.a
        href={item.href}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        className={`
          relative flex items-center
          transition-all duration-500 font-semibold whitespace-nowrap
          ${
            isScrolled
              ? "text-white text-base drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]"
              : "text-white text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          }
        `}
      >
        {item.name}

        {/* Strong underline effect */}
        <motion.span
          className={`
            absolute -bottom-1 left-0 h-[2px] rounded-full
            ${
              isScrolled
                ? "bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 shadow-[0_0_16px_rgba(139,92,246,0.9)]"
                : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.7)]"
            }
          `}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Strong background glow on hover */}
        {isScrolled && (
          <>
            <motion.span
              className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm border border-violet-400/30 -z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl -z-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </motion.a>
    );
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        whileHover={{
          scale: 1.08,
          y: -2,
        }}
        className={`
          relative flex items-center gap-1.5
          transition-all duration-500 font-semibold whitespace-nowrap
          ${
            isScrolled
              ? "text-white text-base drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]"
              : "text-white text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          }
        `}
      >
        {item.name}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>

        {/* Strong underline effect */}
        <motion.span
          className={`
            absolute -bottom-1 left-0 h-[2px] rounded-full
            ${
              isScrolled
                ? "bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 shadow-[0_0_16px_rgba(139,92,246,0.9)]"
                : "bg-gradient-to-r from-violet-500 to-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.7)]"
            }
          `}
          initial={{ width: 0 }}
          animate={{ width: isOpen ? "100%" : 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Strong background glow on hover */}
        {isScrolled && (
          <>
            <motion.span
              className="absolute inset-0 -inset-x-4 -inset-y-2 rounded-2xl bg-gradient-to-r from-violet-600/20 to-purple-600/20 backdrop-blur-sm border border-violet-400/30 -z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-xl -z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </>
        )}
      </motion.button>

      {/* Dropdown Menu */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
        absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-56 max-w-xs z-50
        rounded-2xl overflow-hidden
        ${
          isScrolled
            ? "bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-3xl border-2 border-violet-400/50 shadow-[0_16px_64px_rgba(139,92,246,0.4)]"
            : "bg-gradient-to-br from-slate-800/90 via-slate-900/85 to-slate-800/90 backdrop-blur-2xl border-2 border-slate-600/50 shadow-[0_12px_48px_rgba(0,0,0,0.5)]"
        }
      `}
          >
            {/* Gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-fuchsia-600/10"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <ul className="p-2 relative z-10">
              {item.dropdown.map((dropItem, idx) => (
                <motion.a
                  key={dropItem.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                >
                  <Link
                    to={`product/${dropItem.key}`}
                    className={`
                flex flex-col px-4 py-3 rounded-xl
                transition-all duration-300
                text-white font-medium
                hover:bg-gradient-to-r hover:from-violet-600/30 hover:to-purple-600/30
                hover:shadow-[0_4px_24px_rgba(139,92,246,0.3)]
                hover:border-violet-400/40
                group/item
                relative overflow-hidden
                whitespace-nowrap
              `}
                  >
                    {/* Shine effect */}
                    <motion.div
                      id={dropItem.key}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />

                    <span className="relative z-10 text-sm font-semibold">
                      {dropItem.name}
                    </span>
                  </Link>
                </motion.a>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Item Component with Dropdown
interface MobileMenuItemProps {
  item: NavigationItem;
  location: ReturnType<typeof useLocation>;
  onClose: () => void;
  index: number;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  item,
  location,
  onClose,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.08 * index,
        type: "spring",
        stiffness: 300,
      }}
    >
      {/* Parent Link/Button */}
      {item.dropdown ? (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-full px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300
            flex items-center justify-between relative overflow-hidden group/link
            ${
              location.pathname === item.href
                ? "bg-gradient-to-r from-violet-600/40 to-purple-600/40 text-white shadow-[0_8px_32px_rgba(139,92,246,0.5)] border-2 border-violet-400/60 backdrop-blur-sm"
                : "hover:bg-gradient-to-r hover:from-violet-600/25 hover:to-purple-600/25 text-white hover:shadow-[0_4px_24px_rgba(139,92,246,0.3)] border-2 border-transparent hover:border-violet-400/40"
            }
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]
          `}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          <div className="flex items-center gap-3 relative z-10">
            {location.pathname === item.href && (
              <Droplets className="w-5 h-5 text-violet-300 drop-shadow-[0_2px_8px_rgba(139,92,246,0.8)]" />
            )}
            <span>{item.name}</span>
          </div>

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>
      ) : (
        <Link
          to={item.href}
          onClick={onClose}
          className={`
            px-6 py-4 rounded-2xl text-base font-bold transition-all duration-300
            flex items-center gap-3 relative overflow-hidden group/link
            ${
              location.pathname === item.href
                ? "bg-gradient-to-r from-violet-600/40 to-purple-600/40 text-white shadow-[0_8px_32px_rgba(139,92,246,0.5)] border-2 border-violet-400/60 backdrop-blur-sm"
                : "hover:bg-gradient-to-r hover:from-violet-600/25 hover:to-purple-600/25 text-white hover:shadow-[0_4px_24px_rgba(139,92,246,0.3)] border-2 border-transparent hover:border-violet-400/40"
            }
            drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]
          `}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />

          {location.pathname === item.href && (
            <Droplets className="w-5 h-5 relative z-10 text-violet-300 drop-shadow-[0_2px_8px_rgba(139,92,246,0.8)]" />
          )}

          <span className="relative z-10">{item.name}</span>

          {location.pathname === item.href && (
            <motion.span
              layoutId="mobile-active-pill"
              className="absolute right-4 w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 shadow-[0_0_16px_rgba(139,92,246,0.9)]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />
          )}
        </Link>
      )}

      {/* Mobile Dropdown Items - Collapsible */}
      <AnimatePresence>
        {item.dropdown && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 ml-4 pl-4 border-l-2 border-violet-400/30 space-y-1 overflow-hidden"
          >
            {item.dropdown.map((dropItem, idx) => (
              <motion.div
                key={dropItem.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <Link
                  to={`product/${dropItem.key}`}
                  onClick={onClose}
                  className="block px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-violet-600/20 rounded-lg transition-all group/subitem relative overflow-hidden"
                >
                  {/* Shine effect for dropdown items */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />

                  <span className="relative z-10 font-medium">
                    {dropItem.name}
                  </span>
                  {dropItem.description && (
                    <span className="relative z-10 block text-xs text-slate-400 mt-0.5 group-hover/subitem:text-violet-300 transition-colors">
                      {dropItem.description}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Transform values based on scroll
  const navPadding = useTransform(scrollY, [0, 100], [5, 5]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 1.0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
        className={`
          w-full max-w-4xl
          transition-all duration-700 ease-out
          ${
            isScrolled
              ? "bg-gradient-to-r from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-3xl border-2 border-violet-400/60"
              : "bg-gradient-to-r from-slate-800/80 via-slate-900/75 to-slate-800/80 backdrop-blur-2xl border-2 border-slate-600/60"
          }
          rounded-full flex items-center justify-between px-4 sm:px-6 lg:px-8 text-sm
          shadow-[0_16px_48px_rgba(0,0,0,0.5)]
          hover:shadow-[0_20px_64px_rgba(139,92,246,0.45)] 
          group
        `}
        style={{
          paddingTop: navPadding,
          paddingBottom: navPadding,
        }}
      >
        {/* Strong gradient overlay for depth */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600/15 via-purple-600/15 to-fuchsia-600/15"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        )}

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 group/logo relative transition-all duration-500 flex-shrink-0"
        >
          <motion.div
            style={{ scale: logoScale }}
            whileHover={{
              scale: 1.25,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.7, ease: "easeInOut" },
            }}
            className={`
              w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center 
              transition-all duration-700 relative flex-shrink-0
              ${
                isScrolled
                  ? "bg-gradient-to-br from-violet-600/40 via-purple-600/35 to-fuchsia-600/40 backdrop-blur-md border-2 border-violet-400/60 shadow-[0_0_40px_rgba(139,92,246,0.6)]"
                  : "bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-2 border-slate-600/50 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
              }
            `}
          >
            <motion.img
              src={Logo}
              alt="Company Logo"
              className="w-7 h-7 sm:w-10 sm:h-10 object-contain relative z-10"
              animate={{
                filter: isScrolled
                  ? [
                      "drop-shadow(0 4px 16px rgba(139,92,246,0.6))",
                      "drop-shadow(0 6px 24px rgba(139,92,246,0.9))",
                      "drop-shadow(0 4px 16px rgba(139,92,246,0.6))",
                    ]
                  : "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Glow effects */}
            {isScrolled && (
              <>
                <motion.div
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                    scale: [0.9, 1.15, 0.9],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-400/60 via-purple-500/50 to-fuchsia-500/60 blur-md -z-10"
                />
                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                    scale: [1.1, 1.35, 1.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/50 to-purple-600/50 blur-lg -z-20"
                />
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1.3, 1.6, 1.3],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/40 via-purple-600/40 to-fuchsia-600/40 blur-2xl -z-30"
                />
                <motion.div
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1.5, 2, 1.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-600/30 blur-3xl -z-40"
                />
              </>
            )}
          </motion.div>

          <motion.div
            className="hidden sm:block"
            animate={{
              x: isScrolled ? 0 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <span
              className={`
              font-display font-bold transition-all duration-500 whitespace-nowrap
              ${
                isScrolled
                  ? "text-lg sm:text-2xl text-white drop-shadow-[0_3px_16px_rgba(139,92,246,0.8)]"
                  : "text-base sm:text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              }
            `}
            >
              {siteConfig.shortName}
            </span>
            <motion.span
              className={`
                block -mt-1 transition-all duration-500 font-medium whitespace-nowrap
                ${
                  isScrolled
                    ? "text-xs sm:text-sm text-violet-200 drop-shadow-[0_2px_8px_rgba(139,92,246,0.6)]"
                    : "text-[10px] sm:text-xs text-slate-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                }
              `}
              animate={{
                opacity: isScrolled ? [0.85, 1, 0.85] : 0.9,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Enviro Solutions
            </motion.span>
          </motion.div>
        </Link>

        {/* Navigation Links with Dropdowns */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navigation.map((item, index) => (
            <Dropdown
              key={item.name}
              item={item}
              isScrolled={isScrolled}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            lg:hidden p-2 sm:p-3 rounded-2xl transition-all duration-500 relative overflow-hidden flex-shrink-0
            ${
              isScrolled
                ? "bg-gradient-to-br from-violet-600/40 to-purple-600/40 backdrop-blur-md text-white border-2 border-violet-400/60 shadow-[0_8px_32px_rgba(139,92,246,0.5)]"
                : "bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-2 border-slate-600/50 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            }
          `}
          aria-label="Toggle menu"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`
                absolute top-full left-0 right-0 mt-4 
                lg:hidden rounded-3xl overflow-hidden
                ${
                  isScrolled
                    ? "bg-gradient-to-br from-slate-900/95 via-indigo-950/90 to-slate-900/95 backdrop-blur-3xl border-2 border-violet-400/50 shadow-[0_16px_64px_rgba(139,92,246,0.4)]"
                    : "bg-gradient-to-br from-slate-800/85 via-slate-900/80 to-slate-800/85 backdrop-blur-2xl border-2 border-slate-600/50 shadow-[0_12px_48px_rgba(0,0,0,0.4)]"
                }
              `}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-violet-600/15 via-purple-600/15 to-fuchsia-600/15"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              />

              <nav className="py-6 flex flex-col gap-2 px-6 relative z-10">
                {navigation.map((item, index) => (
                  <MobileMenuItem
                    key={item.name}
                    item={item}
                    location={location}
                    onClose={() => setIsOpen(false)}
                    index={index}
                  />
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles */}
        {isScrolled && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-violet-400/70 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                animate={{
                  y: [-20, -50, -20],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0, 0.9, 0],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 3.5 + Math.random() * 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 15}%`,
                  top: "100%",
                }}
              />
            ))}
          </>
        )}
      </motion.nav>
    </div>
  );
}
