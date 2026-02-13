import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface StatItem {
  number: string;
  label: string;
}

interface ImageItem {
  url: string;
  alt: string;
}

interface RemoteTeamSectionProps {
  layout?: "1" | "2"; // "1" = content left, images right (default) | "2" = images left, content right
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  missionTitle?: string;
  missionParagraphs?: string[];
  additionalText?: string;
  numbersTitle?: string;
  stats?: StatItem[];
  images?: ImageItem[];
}

const ProductShowCase: React.FC<RemoteTeamSectionProps> = ({
  layout = "2",
  eyebrow = "ABOUT",
  title = "On a mission to empower remote teams",
  subtitle = "Aliquam nec quis metus amet quisque sollicituper neque, nibh sem. At arcu, et sit nisi, risus eget adipiscin. Quisque id sit vitae feugiat eleifend.",
  missionTitle = "Our mission",
  missionParagraphs = [
    "Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.",
    "Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.",
  ],
  additionalText = "Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.",
  numbersTitle = "The numbers",
  stats = [
    { number: "$150M", label: "Total raised" },
    { number: "30K", label: "Companies served" },
    { number: "1.5M", label: "Daily active users" },
    { number: "200M", label: "Total messages sent" },
  ],
  images = [
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
      alt: "Team collaboration",
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
      alt: "Office workspace",
    },
    {
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
      alt: "Team meeting",
    },
    {
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop",
      alt: "Remote work",
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
      alt: "Office workspace",
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
      alt: "Office workspace",
    },
  ],
}) => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [leftColumnImages, setLeftColumnImages] = useState<ImageItem[]>([]);
  const [rightColumnImages, setRightColumnImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    // Load all images and get their natural dimensions
    const loadImageDimensions = async () => {
      const heights = await Promise.all(
        images.map((img) => {
          return new Promise<number>((resolve) => {
            const image = new Image();
            image.onload = () => {
              // Calculate height relative to a fixed width (e.g., 400px column width)
              const aspectRatio = image.naturalHeight / image.naturalWidth;
              const displayHeight = 400 * aspectRatio; // Assuming 400px column width
              resolve(displayHeight);
            };
            image.onerror = () => resolve(400); // Default height if error
            image.src = img.url;
          });
        }),
      );
      setImageHeights(heights);
    };

    loadImageDimensions();
  }, [images]);

  useEffect(() => {
    if (imageHeights.length === 0) return;

    // Distribute images to balance column heights
    const left: ImageItem[] = [];
    const right: ImageItem[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    images.forEach((image, index) => {
      const height = imageHeights[index];

      // Add to shorter column
      if (leftHeight <= rightHeight) {
        left.push(image);
        leftHeight += height;
      } else {
        right.push(image);
        rightHeight += height;
      }
    });

    setLeftColumnImages(left);
    setRightColumnImages(right);
  }, [imageHeights, images]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {/* Conditional rendering based on layout */}
          {layout === "1" ? (
            <>
              {/* Left Column - Content */}
              <motion.div className="pr-5" variants={itemVariants}>
                {/* Header Section */}
                <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
                  <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-5">
                    {eyebrow}
                  </p>
                  <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold leading-[1.2] mb-6 sm:mb-8 max-w-[600px]">
                    {title}
                  </h1>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] max-w-[500px]">
                    {subtitle}
                  </p>
                </motion.div>
                {/* Our Mission */}
                <div className="mb-12">
                  <h3 className="text-[14px] font-semibold mb-5 tracking-[0.5px]">
                    {missionTitle}
                  </h3>
                  {missionParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[14px] leading-[1.8] mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Additional Text */}
                {additionalText && (
                  <div className="mb-12">
                    <p className="text-[14px] leading-[1.8]">
                      {additionalText}
                    </p>
                  </div>
                )}

                {/* The Numbers */}
                {stats.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-[14px] font-semibold mb-8 tracking-[0.5px]">
                      {numbersTitle}
                    </h3>
                    <motion.div
                      className="grid grid-cols-2 gap-x-10 gap-y-12"
                      variants={containerVariants}
                    >
                      {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col"
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-[48px] font-bold leading-none mb-2">
                            {stat.number}
                          </div>
                          <div className="text-[13px] font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>

              {/* Right Column - Balanced Masonry Layout with Sticky Bottom */}
              {images.length > 0 && (
                <div className="lg:sticky lg:top-20 lg:self-start">
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={containerVariants}
                  >
                    {/* Left Column of Images - Auto-balanced */}
                    <div className="flex flex-col gap-4">
                      {leftColumnImages.map((image, index) => (
                        <motion.div
                          key={`left-${index}`}
                          className="rounded-xl overflow-hidden w-full"
                          variants={imageVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            style={{
                              display: "block",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Right Column of Images - Auto-balanced */}
                    <div className="flex flex-col gap-4 mt-20">
                      {rightColumnImages.map((image, index) => (
                        <motion.div
                          key={`right-${index}`}
                          className="rounded-xl overflow-hidden w-full"
                          variants={imageVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            style={{
                              display: "block",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Layout 2: Images Left, Content Right */}
              {/* Left Column - Balanced Masonry Layout with Sticky Bottom */}
              {images.length > 0 && (
                <div className="lg:sticky lg:top-20 lg:self-start lg:order-1">
                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={containerVariants}
                  >
                    {/* Left Column of Images - Auto-balanced */}
                    <div className="flex flex-col gap-4">
                      {leftColumnImages.map((image, index) => (
                        <motion.div
                          key={`left-${index}`}
                          className="rounded-xl overflow-hidden w-full"
                          variants={imageVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            style={{
                              display: "block",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Right Column of Images - Auto-balanced */}
                    <div className="flex flex-col gap-4 mt-20">
                      {rightColumnImages.map((image, index) => (
                        <motion.div
                          key={`right-${index}`}
                          className="rounded-xl overflow-hidden w-full"
                          variants={imageVariants}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                            style={{
                              display: "block",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Right Column - Content */}
              <motion.div className="pr-5 lg:order-2" variants={itemVariants}>
                {/* Header Section */}
                <motion.div className="mb-12 sm:mb-16" variants={itemVariants}>
                  <p className="text-[13px] font-semibold tracking-[1.5px] uppercase mb-5">
                    {eyebrow}
                  </p>
                  <h1 className="text-[32px] sm:text-[38px] md:text-[42px] font-bold leading-[1.2] mb-6 sm:mb-8 max-w-[600px]">
                    {title}
                  </h1>
                  <p className="text-[14px] sm:text-[15px] leading-[1.6] max-w-[500px]">
                    {subtitle}
                  </p>
                </motion.div>
                {/* Our Mission */}
                <div className="mb-12">
                  <h3 className="text-[14px] font-semibold mb-5 tracking-[0.5px]">
                    {missionTitle}
                  </h3>
                  {missionParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[14px] leading-[1.8] mb-4 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Additional Text */}
                {additionalText && (
                  <div className="mb-12">
                    <p className="text-[14px] leading-[1.8]">
                      {additionalText}
                    </p>
                  </div>
                )}

                {/* The Numbers */}
                {stats.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-[14px] font-semibold mb-8 tracking-[0.5px]">
                      {numbersTitle}
                    </h3>
                    <motion.div
                      className="grid grid-cols-2 gap-x-10 gap-y-12"
                      variants={containerVariants}
                    >
                      {stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col"
                          variants={itemVariants}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-[48px] font-bold leading-none mb-2">
                            {stat.number}
                          </div>
                          <div className="text-[13px] font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductShowCase;
