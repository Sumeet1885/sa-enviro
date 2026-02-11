import React from "react";
import { motion } from "framer-motion";

// ============================================================================
// MINIMALISTIC ANIMATED AUTHOR CARD
// ============================================================================

// Place this outside your component

interface AuthorCardProps {
  testimonial: {
    quote: string;
    author: string;
  };
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ testimonial }) => {
  return (
    // <!-- Author card -->
    <div className="author-card relative w-full max-w-2xl my-8 md:my-2 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
      {/* <!-- Author badge with animation --> */}
      <span className="author-badge absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed">
        author
      </span>

      {/* <!-- Animated Avatar (No Image Required) --> */}
      <div className="w-full flex justify-center sm:justify-start sm:w-auto">
        <div className="avatar-wrapper relative w-20 h-20 mt-3 mr-3 group">
          {/* <!-- 3D layered background for depth --> */}
          <div className="absolute inset-0 rounded-full  blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 rounded-full  blur-sm opacity-80 transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0"></div>

          {/* <!-- Main avatar circle --> */}
          <motion.div
            className="flex items-center justify-center w-20 h-20 mt-3 mr-3 rounded-full relative z-10 border border-white/40 overflow-hidden backdrop-blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.15) 100%)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            }}
            whileHover={{
              scale: 1.08,
              rotate: 3,
              borderColor: "rgba(168, 85, 247, 0.6)",
              boxShadow: "0 12px 40px rgba(168, 85, 247, 0.25)",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
          >
            <span
              className="text-2xl font-semibold uppercase tracking-wide"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))",
              }}
            >
              {testimonial.author.charAt(0)}
            </span>

            {/* Subtle rotating gradient */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background:
                  "conic-gradient(from 0deg, #6366f1, #a855f7, #6366f1)",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* <!-- Content --> */}
      <div className="w-full sm:w-auto flex flex-col items-center sm:items-start">
        <p className="author-name font-display mb-2 text-2xl font-semibold dark:text-gray-200 transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400">
          {testimonial.author}
        </p>
        <div className="mb-4 md:text-lg text-gray-400 transition-all duration-300">
          <p className="description-text">{testimonial.quote}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
