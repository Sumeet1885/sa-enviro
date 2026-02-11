import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Droplets, Waves } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Logo from "@/assets/logo.webp";

import { navigation, siteConfig } from "@/constants/siteData";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Transform values based on scroll - EXPANDING instead of shrinking
  const navWidth = useTransform(scrollY, [0, 100], [50, 60]); // Expands width
  const navPadding = useTransform(scrollY, [0, 100], [12, 15]); // More padding
  const logoScale = useTransform(scrollY, [0, 100], [1, 1.0]); // Logo gets bigger

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        fixed top-6 z-50 
        transition-all duration-700 ease-out
        ${
          isScrolled
            ? "bg-[linear-gradient(135deg,rgba(0,0,0,0.35),rgba(0,0,0,0.15))]"
            : "backdrop-blur-md bg-white/10 border border-white/20"
        }
        rounded-full flex items-center justify-center gap-4 sm:gap-8 text-sm
        hover:shadow-2xl hover:shadow-cyan-400/40 
        group
      `}
      style={{
        width: `${navWidth.get()}%`,
        paddingTop: navPadding,
        paddingBottom: navPadding,
        marginLeft: "25%",
      }}
    >
      {/* Animated water ripple effect */}
      {isScrolled && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-teal-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Water wave effect */}
          {/* <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          /> */}
        </>
      )}

      {/* Droplet icons floating */}
      <AnimatePresence>
        {isScrolled && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-3 left-10"
            >
              <Droplets className="w-5 h-5 text-cyan-300 drop-shadow-lg" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute -top-3 right-10"
            >
              <Waves className="w-5 h-5 text-blue-300 drop-shadow-lg" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 group/logo relative right-7 transition-all duration-500"
      >
        <motion.div
          style={{ scale: logoScale }}
          whileHover={{
            scale: 1.2,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.6 },
          }}
          className={`
            w-12 h-12 rounded-xl flex items-center justify-center 
            transition-all duration-500
            ${isScrolled ? "" : "bg-white/10"}
          `}
        >
          <img
            src={Logo}
            alt="Company Logo"
            className="w-9 h-9 object-contain drop-shadow-lg"
          />

          {/* Pulsing water glow effect */}
          {isScrolled && (
            <>
              <motion.div
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-cyan-300 blur-lg -z-10"
              />
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.2, 1.5, 1.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-xl bg-blue-400 blur-xl -z-20"
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
            font-display font-bold transition-all duration-500
            ${
              isScrolled
                ? "text-2xl text-white drop-shadow-[0_2px_8px_rgba(6,182,212,0.8)]"
                : "text-xl text-white"
            }
          `}
          >
            {siteConfig.shortName}
          </span>
          <motion.span
            className={`
              block -mt-1 transition-all duration-500 font-medium
              ${
                isScrolled
                  ? "text-sm text-cyan-100 drop-shadow-[0_1px_4px_rgba(6,182,212,0.6)]"
                  : "text-xs text-white"
              }
            `}
            animate={{
              opacity: isScrolled ? 1 : 0.9,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Enviro Solutions
          </motion.span>
        </motion.div>
      </Link>

      {/* Navigation Links with better visibility */}
      {navigation.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          whileHover={{
            scale: 1.15,
            y: -3,
          }}
          className={`
            relative hidden lg:flex items-center
            transition-all duration-500 font-semibold
            ${
              isScrolled
                ? "text-white text-base drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                : "text-white/80 hover:text-white text-sm"
            }
          `}
        >
          {item.name}

          {/* Water wave underline effect */}
          <motion.span
            className={`
              absolute -bottom-1 left-0 h-0.5 rounded-full
              ${
                isScrolled
                  ? "bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-300 shadow-lg shadow-cyan-400/50"
                  : "bg-gradient-to-r from-cyan-400 to-blue-400"
              }
            `}
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />

          {/* Background glow on hover when scrolled */}
          {isScrolled && (
            <motion.span
              className="absolute inset-0 -inset-x-3 -inset-y-2 rounded-full bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/30 -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Extra glow effect */}
          {isScrolled && (
            <motion.span
              className="absolute inset-0 rounded-full bg-cyan-300/30 blur-md -z-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.a>
      ))}

      {/* Mobile Menu Button with better visibility */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          lg:hidden p-3 rounded-xl transition-all duration-500
          ${
            isScrolled
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/60 ring-2 ring-white/30"
              : "hover:bg-white/10 text-white"
          }
        `}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-6 h-6 drop-shadow-lg" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="w-6 h-6 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Dropdown with water theme */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`
              absolute top-full left-0 right-0 mt-4 
              lg:hidden rounded-3xl overflow-hidden
              ${
                isScrolled
                  ? "bg-gradient-to-br from-cyan-500/95 via-blue-600/95 to-teal-500/95 backdrop-blur-2xl border-2 border-cyan-300/50 shadow-2xl shadow-cyan-500/40"
                  : "bg-gradient-to-br from-cyan-400/30 via-blue-500/30 to-teal-400/30 backdrop-blur-xl border border-white/30"
              }
            `}
          >
            {/* Water ripple background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 via-blue-400/20 to-teal-300/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />

            <nav className="py-6 flex flex-col gap-3 px-6 relative z-10">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, type: "spring" }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      px-6 py-4 rounded-xl text-base font-bold transition-all duration-300
                      flex items-center gap-3 relative overflow-hidden group/link
                      ${
                        location.pathname === item.href
                          ? "bg-white/30 text-white shadow-2xl shadow-cyan-400/50 ring-2 ring-white/40 backdrop-blur-sm"
                          : "hover:bg-white/20 text-white hover:shadow-xl hover:shadow-cyan-400/30"
                      }
                      drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                    `}
                  >
                    {/* Wave shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Droplet icon for active */}
                    {location.pathname === item.href && (
                      <Droplets className="w-5 h-5 relative z-10" />
                    )}

                    <span className="relative z-10">{item.name}</span>

                    {/* Animated water droplet indicator */}
                    {location.pathname === item.href && (
                      <motion.span
                        layoutId="mobile-active-pill"
                        className="absolute right-4 w-3 h-3 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 shadow-lg shadow-cyan-300/50"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating water droplets effect when scrolled */}
      {isScrolled && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200/60 shadow-lg shadow-cyan-400/50"
              animate={{
                y: [-30, -60, -30],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
              style={{
                left: `${15 + i * 17}%`,
                top: "100%",
              }}
            />
          ))}
        </>
      )}
    </motion.nav>
  );
}
