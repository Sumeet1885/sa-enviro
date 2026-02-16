import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Product } from "@/constants/type";
import Extra_Text_Section from "@/components/ui/dynamic_Text";
import Text from "@/components/ui/Used/Text";
import { products } from "@/constants/siteData";
import Image_Section from "@/assets/Small Section/Image_Section";

interface StatItem {
  number: string;
  label: string;
}

interface ImageItem {
  url: string;
  alt: string;
}

interface RemoteTeamSectionProps {
  layout?: "1" | "2";

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
  containerVariants,
  product,
}) => {
  return (
    <motion.div className={className} variants={itemVariants}>
      {/* Header Section */}
      <motion.div className="mb-6 sm:mb-8" variants={itemVariants}>
        <Text
          variant="title"
          size="xl"
          weight="bold"
          className="mb-2"
          as={"h1"}
        >
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

      {/* Mission Section */}
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
  <div className="lg:sticky lg:top-20 lg:self-start">
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

  return (
    <div className="min-h-screen">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20"
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.container}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
          {layout === "1" ? (
            <>
              {contentSection}
              {masonryGrid}
            </>
          ) : (
            <>
              {masonryGrid}
              {contentSection}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductShowCase;
