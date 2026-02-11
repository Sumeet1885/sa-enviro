import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const AnimatedImgCard = ({ aboutImage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for mouse movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  // Parallax effects for floating elements
  const statsX = useSpring(useTransform(mouseX, [-1, 1], [-25, 25]), {
    stiffness: 100,
    damping: 15,
  });
  const statsY = useSpring(useTransform(mouseY, [-1, 1], [-25, 25]), {
    stiffness: 100,
    damping: 15,
  });
  const badgeX = useSpring(useTransform(mouseX, [-1, 1], [20, -20]), {
    stiffness: 120,
    damping: 15,
  });
  const badgeY = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), {
    stiffness: 120,
    damping: 15,
  });

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      {/* Main Container */}
      <motion.div
        ref={containerRef}
        className="relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1200,
        }}
      >
        {/* Animated Background Glow with Mouse Following */}
        <motion.div
          className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 rounded-3xl blur-3xl"
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
            scale: isHovered ? 1.15 : 1,
          }}
          style={{
            x: useTransform(mouseX, [-1, 1], [-20, 20]),
            y: useTransform(mouseY, [-1, 1], [-20, 20]),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating Particles that Follow Mouse */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/50 rounded-full blur-sm pointer-events-none z-10"
            style={{
              left: `${15 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              x: useTransform(
                mouseX,
                [-1, 1],
                [-30 * (i % 2 ? 1 : -1), 30 * (i % 2 ? 1 : -1)],
              ),
              y: useTransform(
                mouseY,
                [-1, 1],
                [-30 * (i % 2 ? -1 : 1), 30 * (i % 2 ? -1 : 1)],
              ),
            }}
            animate={{
              scale: isHovered ? [1, 1.5, 1] : 1,
              opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main 3D Tilting Card */}
        <motion.div
          className="relative z-0"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            z: isHovered ? 50 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated Rainbow Border */}
          <motion.div
            className="absolute -inset-1 rounded-2xl opacity-75 z-0 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-teal-500/40"
            style={{
              background:
                "linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
              backgroundSize: "300% 300%",
            }}
            animate={{
              backgroundPosition: isHovered
                ? ["0% 50%", "100% 50%", "0% 50%"]
                : "0% 50%",
            }}
            transition={{
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Main Image Container */}
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-black z-0"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
          >
            {/* Holographic Overlay Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.4) 100%)",
                backgroundSize: "200% 200%",
                mixBlendMode: "overlay",
              }}
              animate={{
                backgroundPosition: isHovered
                  ? ["0% 0%", "100% 100%"]
                  : "0% 0%",
              }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            />

            {/* Image with Parallax */}
            <motion.div
              className="relative w-full h-full z-0"
              style={{
                x: useTransform(mouseX, [-1, 1], [-15, 15]),
                y: useTransform(mouseY, [-1, 1], [-15, 15]),
                scale: isHovered ? 1.15 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={aboutImage}
                alt="SA Enviro Solutions Facility"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Spotlight Effect Following Mouse */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(circle 200px at ${useTransform(mouseX, [-1, 1], [0, 100])}% ${useTransform(mouseY, [-1, 1], [0, 100])}%, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                opacity: isHovered ? 1 : 0,
              }}
            />

            {/* Scan Lines Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
              }}
              animate={{
                y: isHovered ? [0, -4, 0] : 0,
              }}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            />

            {/* Glitch Effect on Hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  x: [-2, 2, -2, 0],
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                style={{
                  background:
                    "linear-gradient(90deg, #ff0080 0%, transparent 50%, #40e0d0 100%)",
                  mixBlendMode: "screen",
                }}
              />
            )}
          </motion.div>

          {/* Click to Expand Hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-md border border-white/20 z-30"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ delay: 0.5 }}
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🔍 Click to view full size
            </motion.span>
          </motion.div>
        </motion.div>

        {/* ========================================== */}
        {/* FLOATING 3D TROPHY BADGE - TOP LEFT - IN FRONT */}
        {/* ========================================== */}
        <motion.div
          className="absolute -top-8 -left-8 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-teal-500/40 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl border-2 border-white/30 overflow-hidden backdrop-blur-sm"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(100px)",
            x: badgeX,
            y: badgeY,
            rotateX: useTransform(mouseY, [-0.5, 0.5], [-15, 15]),
            rotateY: useTransform(mouseX, [-0.5, 0.5], [15, -15]),
          }}
          animate={{
            boxShadow: isHovered
              ? [
                  "0 20px 40px rgba(var(--primary-rgb), 0.6)",
                  "0 30px 60px rgba(255, 0, 128, 0.8)",
                  "0 20px 40px rgba(var(--primary-rgb), 0.6)",
                ]
              : "0 20px 40px rgba(var(--primary-rgb), 0.4)",
          }}
          whileHover={{
            scale: 1.2,
            rotateZ: [0, -10, 10, 0],
            zIndex: 60,
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity },
            rotateZ: { duration: 0.5 },
            scale: { type: "spring", stiffness: 300 },
          }}
        >
          {/* Animated Shimmer Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Glowing Particles Inside Badge */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}

          <div className="relative flex items-center gap-2.5 z-10">
            {/* Animated Trophy Icon */}
            <motion.span
              className="text-3xl"
              animate={{
                rotate: isHovered ? [0, -15, 15, -15, 0] : 0,
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 0.8,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 1,
              }}
              style={{
                filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
              }}
            >
              🏆
            </motion.span>

            {/* Animated Text */}
            <motion.span
              className="text-base font-black tracking-wider"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
              animate={{
                scale: isHovered ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
              }}
            >
              CERTIFIED
            </motion.span>
          </div>

          {/* Pulsing Ring Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/50"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Corner Glow */}
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full"
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            style={{
              filter: "blur(4px)",
            }}
          />
        </motion.div>

        {/* ========================================== */}
        {/* FLOATING 3D STATS CARD - IN FRONT */}
        {/* ========================================== */}
        <motion.div
          className="absolute -bottom-8 -right-8 bg-gradient-to-br from-card/95 via-card to-card/90 rounded-2xl shadow-2xl border-2 border-primary/40 overflow-hidden backdrop-blur-xl"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(80px)",
            x: statsX,
            y: statsY,
            rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
            rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
          }}
          whileHover={{
            scale: 1.15,
            rotateZ: -5,
            boxShadow: "0 40px 80px rgba(var(--primary-rgb), 0.6)",
            borderColor: "var(--primary)",
            zIndex: 60,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          {/* Animated Mesh Background */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(var(--primary-rgb), 0.15) 2px, transparent 2px),
                linear-gradient(90deg, rgba(var(--primary-rgb), 0.15) 2px, transparent 2px)
              `,
              backgroundSize: "30px 30px",
            }}
            animate={{
              backgroundPosition: isHovered
                ? ["0px 0px", "30px 30px"]
                : "0px 0px",
            }}
            transition={{
              duration: 4,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            }}
          />

          {/* Glowing Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: "inset 0 0 40px rgba(var(--primary-rgb), 0.6)",
            }}
            animate={{
              opacity: isHovered ? [0.5, 1, 0.5] : 0.3,
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Radial Gradient Pulse */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(var(--primary-rgb), 0.4) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative p-8">
            {/* Animated Counter with 3D Effect */}
            <motion.div
              className="text-6xl font-display font-black mb-3 relative"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                scale: isHovered ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              <motion.span
                className="relative inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0080, #ff8c00, #40e0d0)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(var(--primary-rgb), 0.8))",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                10+
              </motion.span>

              {/* Pulsing Glow Behind Number */}
              <motion.div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(var(--primary-rgb), 0.6) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Text with Wave Animation */}
            <motion.div
              className="text-black font-semibold mb-4"
              style={{
                background:
                  "linear-gradient(90deg, var(--muted-foreground) 0%, var(--primary) 50%, var(--muted-foreground) 100%)",
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Years of Excellence
            </motion.div>

            {/* Animated Multi-Layer Progress Bar */}
          </div>

          {/* 3D Corner Accent with Pulse */}
          <motion.div
            className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(var(--primary-rgb), 0.6) 0%, transparent 70%)",
              clipPath: "polygon(100% 0, 0 0, 100% 100%)",
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};
