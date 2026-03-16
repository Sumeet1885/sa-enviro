import { useState, useEffect, useRef, useCallback } from "react";
import { galleryImages } from "@/constants/siteData";


interface ImageItem {
  src: string;
  alt: string;
  category: string;
}


interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number; 
  loaded: boolean;
}


function useImageDimensions(images: ImageItem[]) {
  const [dimensions, setDimensions] = useState<Record<string, ImageDimensions>>(
    {},
  );

  useEffect(() => {
    images.forEach((img) => {
      if (dimensions[img.src]?.loaded) return;

      const el = new Image();
      el.onload = () => {
        setDimensions((prev) => ({
          ...prev,
          [img.src]: {
            width: el.naturalWidth,
            height: el.naturalHeight,
            aspectRatio: el.naturalWidth / el.naturalHeight,
            loaded: true,
          },
        }));
      };
      el.src = img.src;
    });
  }, [images]);

  return dimensions;
}


interface LightboxProps {
  images: ImageItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) => {
  const image = images[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-5 w-full max-w-6xl mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/50 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors cursor-pointer bg-transparent border-none"
        >
          Esc · Close
        </button>

        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-[80vh] object-contain rounded shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        />

        <div className="flex items-center justify-between w-full">
          <button
            onClick={onPrev}
            className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer bg-transparent border-none px-3 py-2"
          >
            ← Prev
          </button>
          <div className="text-center">
            <p className="text-white/90 text-sm font-light tracking-wide">
              {image.alt}
            </p>
            <p className="text-white/30 text-xs tracking-[0.25em] uppercase mt-1">
              {index + 1} / {images.length}
            </p>
          </div>
          <button
            onClick={onNext}
            className="text-white/50 hover:text-white text-xs tracking-widest uppercase transition-colors cursor-pointer bg-transparent border-none px-3 py-2"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};



interface MasonryGridProps {
  images: ImageItem[];
  dimensions: Record<string, ImageDimensions>;
  onOpen: (index: number) => void;
}

const MasonryGrid = ({ images, dimensions, onOpen }: MasonryGridProps) => {
  return (
    <div
      className="w-full"
      style={{
        columnCount: 3,
        columnGap: "8px",
      }}
    >
      {images.map((img, index) => {
        const dim = dimensions[img.src];
        const paddingBottom = dim?.loaded
          ? `${(1 / dim.aspectRatio) * 100}%`
          : "75%";

        return (
          <div
            key={img.src}
            className="relative overflow-hidden cursor-pointer group mb-2 break-inside-avoid rounded-sm"
            style={{ display: "inline-block", width: "100%" }}
            onClick={() => onOpen(index)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${img.alt}`}
            onKeyDown={(e) => e.key === "Enter" && onOpen(index)}
          >
            <div className="relative w-full" style={{ paddingBottom }}>
              {!dim?.loaded && (
                <div className="absolute inset-0 bg-stone-200 animate-pulse" />
              )}

              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out
                  group-hover:scale-[1.04] group-hover:brightness-90
                  ${dim?.loaded ? "opacity-100" : "opacity-0"}`}
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <p className="text-white text-xs font-light tracking-wide truncate leading-snug">
                  {img.alt}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/20 border border-white/0 group-hover:border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none backdrop-blur-sm">
                <span className="text-white text-xs">⤢</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};



interface ResponsiveMasonryProps {
  images: ImageItem[];
  dimensions: Record<string, ImageDimensions>;
  onOpen: (index: number) => void;
}

const ResponsiveMasonry = ({
  images,
  dimensions,
  onOpen,
}: ResponsiveMasonryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(3);

  const updateCols = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.offsetWidth;
    if (w < 640) setCols(1);
    else if (w < 1024) setCols(2);
    else setCols(3);
  }, []);

  useEffect(() => {
    updateCols();
    const ro = new ResizeObserver(updateCols);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateCols]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        style={{
          columnCount: cols,
          columnGap: "8px",
        }}
      >
        {images.map((img, index) => {
          const dim = dimensions[img.src];
          const paddingBottom = dim?.loaded
            ? `${(1 / dim.aspectRatio) * 100}%`
            : "75%";

          return (
            <div
              key={img.src}
              className="relative overflow-hidden cursor-pointer group mb-2 break-inside-avoid rounded-sm"
              style={{ display: "inline-block", width: "100%" }}
              onClick={() => onOpen(index)}
              role="button"
              tabIndex={0}
              aria-label={`Open ${img.alt}`}
              onKeyDown={(e) => e.key === "Enter" && onOpen(index)}
            >
              <div className="relative w-full" style={{ paddingBottom }}>
                {!dim?.loaded && (
                  <div className="absolute inset-0 bg-stone-200 animate-pulse rounded-sm" />
                )}

                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out
                    group-hover:scale-[1.04]
                    ${dim?.loaded ? "opacity-100" : "opacity-0"}`}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />

                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <p className="text-white text-xs font-light tracking-wide truncate">
                    {img.alt}
                  </p>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-7 h-7 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xs">⤢</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default function ImageGallery() {
  const dimensions = useImageDimensions(galleryImages);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const loadedCount = Object.values(dimensions).filter((d) => d.loaded).length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null,
    );
  const goNext = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null,
    );

  return (
    <div className="bg-stone-50 min-h-screen">
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <section className="max-w-screen-xl mx-auto px-4 py-16 lg:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-stone-400 mb-1 font-light">
              Gallery
            </p>
          </div>
          <p className="text-xs text-stone-400 tracking-widest uppercase">
            {loadedCount} / {galleryImages.length} loaded
          </p>
        </div>
        <ResponsiveMasonry
          images={galleryImages}
          dimensions={dimensions}
          onOpen={openLightbox}
        />
      </section>
    </div>
  );
}
