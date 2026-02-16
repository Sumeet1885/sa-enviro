import React, { useState, useMemo } from "react";
import { galleryImages } from "@/constants/siteData";

interface Image {
  src: string;
  alt: string;
}

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images: Image[] = galleryImages;

  // Calculate grid columns dynamically - grows horizontally, keeps 4 rows
  const gridColumns = useMemo(() => {
    const itemsPerRow = Math.ceil(images.length / 4);
    return Math.max(6, itemsPerRow * 2); // Each image spans 2 columns
  }, [images.length]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  const closePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <style>{`
        .gallery-image-container {
          position: relative;
          z-index: 1;
        }

        .gallery-image-container:hover {
          z-index: 200;
        }

        .gallery-image {
          clip-path: path("M 80 20 C 100 0 100 0 120 20 C 140 40 160 60 180 80 C 200 100 200 100 180 120 C 160 140 140 160 120 180 C 100 200 100 200 80 180 C 60 160 40 140 20 120 C 0 100 0 100 20 80 Z");
          transition: filter 400ms ease-out, 
                      clip-path 400ms ease-out;
          position: relative;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        .gallery-image-container:hover .gallery-image {
          clip-path: path("M 0 0 C 100 0 100 0 200 0 C 200 50 200 50 200 80 C 200 100 200 100 200 120 C 200 150 200 150 200 200 C 100 200 100 200 0 200 C 0 150 0 150 0 120 C 0 100 0 100 0 80 Z");
        }

        .gallery-wrapper:has(.gallery-image-container:hover) .gallery-image {
          filter: brightness(0.5) saturate(0.5);
        }

        .gallery-wrapper .gallery-image-container:hover .gallery-image {
          filter: brightness(1) saturate(1.5);
        }

        .title-overlay {
          transition: opacity 250ms ease-out;
          z-index: 1;
        }
      `}</style>

      <article
        className="gallery-wrapper grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, calc(100px - 0.25rem))`,
          gridTemplateRows: "repeat(4, calc(100px - 0.25rem))",
        }}
      >
        {images.map((image, index) => {
          const isOffset =
            (Math.floor(index / 6) % 2 === 0 && index % 6 === 3) ||
            (Math.floor(index / 6) % 2 === 1 && index % 6 === 2);

          return (
            <div
              key={index}
              className={`gallery-image-container cursor-pointer ${
                isOffset ? "col-start-2 col-span-2" : "col-span-2"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="gallery-image w-full aspect-square object-obtain rounded-lg"
                onClick={() => handleImageClick(image)}
                loading="lazy"
              />
              <div
                className={`title-overlay relative inset-0 flex items-end justify-center pointer-events-none  ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="bg-black/70 text-white px-3 py-1 rounded text-sm backdrop-blur-sm max-w-[90%] text-center truncate">
                  {image.alt}
                </span>
              </div>
            </div>
          );
        })}
      </article>

      {/* Popup Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm"
          onClick={closePopup}
          style={{ animation: "fadeIn 200ms ease-out" }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { 
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to { 
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
          <div
            className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Close popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage.src.replace("w=800", "w=1600")}
              alt={selectedImage.alt}
              className="w-full h-auto "
            />
            <div className="p-6 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedImage.alt}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
