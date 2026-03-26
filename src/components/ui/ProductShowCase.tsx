import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/constants/type";
import Extra_Text_Section from "@/components/ui/dynamic_Text";
import Text from "@/components/ui/Text";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
  url: string;
  alt: string;
}

interface RemoteTeamSectionProps {
  layout?: string;

  images?: ImageItem[];
  product: Product;
}

interface ContentSectionProps {
  className: string;
  product: Product;
  itemVariants: any;
  containerVariants: any;
}

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },
  image: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

const Content_Section: React.FC<ContentSectionProps> = ({
  className,
  itemVariants,
  product,
}) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
        <Text variant="title" weight="bold" className="mb-2" as={"h1"}>
          {product.main.title}{" "}
        </Text>
        <Text
          variant="body"
          size="sm"
          weight="normal"
          className="mb-2"
          as={"p"}
        >
          {product.main.description}{" "}
        </Text>
      </motion.div>

      <Extra_Text_Section extraContent={product.Page_Description || []} />
    </motion.div>
  );
};

interface ImageColumnProps {
  images: ImageItem[];
  columnKey: string;
  offsetClass?: string;
  imageVariants: any;
}

const ImageColumn: React.FC<ImageColumnProps> = ({
  images,
  columnKey,
  offsetClass = "",
  imageVariants,
}) => (
  <div className={`flex flex-col gap-4 ${offsetClass}`}>
    {images.map((image, index) => (
      <motion.div
        key={`${columnKey}-${index}`}
        className="rounded-xl overflow-hidden w-full"
        variants={imageVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-auto object-contain"
          loading="lazy"
          style={{
            display: "block",
          }}
        />
      </motion.div>
    ))}
  </div>
);

interface MasonryGridProps {
  leftColumnImages: ImageItem[];
  rightColumnImages: ImageItem[];
  containerVariants: any;
  imageVariants: any;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  leftColumnImages,
  rightColumnImages,
  containerVariants,
  imageVariants,
}) => (
  <div className="lg:sticky lg:top-20 lg:self-start hidden lg:block">
    <motion.div className="grid grid-cols-2 gap-4" variants={containerVariants}>
      <ImageColumn
        images={leftColumnImages}
        columnKey="left"
        imageVariants={imageVariants}
      />
      <ImageColumn
        images={rightColumnImages}
        columnKey="right"
        offsetClass="mt-20"
        imageVariants={imageVariants}
      />
    </motion.div>
  </div>
);

interface CarouselProps {
  images: ImageItem[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative h-56 md:h-96 overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-focus:ring-2 group-focus:ring-white/50 group-focus:outline-none transition-all duration-200">
          <ChevronLeft className="w-5 h-5 text-white" />
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNext}
        aria-label="Next image"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-sm border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-focus:ring-2 group-focus:ring-white/50 group-focus:outline-none transition-all duration-200">
          <ChevronRight className="w-5 h-5 text-white" />
        </span>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProductShowCase: React.FC<RemoteTeamSectionProps> = ({
  layout = "2",
  images,
  product,
}) => {
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [leftColumnImages, setLeftColumnImages] = useState<ImageItem[]>([]);
  const [rightColumnImages, setRightColumnImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const loadImageDimensions = async () => {
      const heights = await Promise.all(
        product.images.map((img) => {
          return new Promise<number>((resolve) => {
            const image = new Image();
            image.onload = () => {
              const aspectRatio = image.naturalHeight / image.naturalWidth;
              const displayHeight = 400 * aspectRatio;
              resolve(displayHeight);
            };
            image.onerror = () => resolve(400);
            image.src = img.url;
          });
        }),
      );
      setImageHeights(heights);
    };

    loadImageDimensions();
  }, [product.images]);

  useEffect(() => {
    if (imageHeights.length === 0) return;

    const left: ImageItem[] = [];
    const right: ImageItem[] = [];
    let leftHeight = 0;
    let rightHeight = 0;

    product.images.forEach((image, index) => {
      const height = imageHeights[index];

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

  const contentSection = (
    <Content_Section
      className={layout === "1" ? "pr-5" : "pl-5 lg:order-2"}
      product={product}
      itemVariants={ANIMATION_VARIANTS.item}
      containerVariants={ANIMATION_VARIANTS.container}
    />
  );

  const masonryGrid =
    images.length > 0 ? (
      <MasonryGrid
        leftColumnImages={leftColumnImages}
        rightColumnImages={rightColumnImages}
        containerVariants={ANIMATION_VARIANTS.container}
        imageVariants={ANIMATION_VARIANTS.image}
      />
    ) : null;

  const carousel =
    product.images.length > 0 ? (
      <div className="lg:hidden">
        <Carousel images={product.images} />
      </div>
    ) : null;

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-16 md:py-8"
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.container}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {layout === "1" ? (
            <>
              {carousel}
              {contentSection}
              {masonryGrid}
            </>
          ) : (
            <>
              {masonryGrid}
              {carousel}
              {contentSection}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductShowCase;
