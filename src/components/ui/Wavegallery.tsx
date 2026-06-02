import { CSSProperties } from "react";

interface ImageItem {
  src: string;
  alt: string;
  nth: number;
}

interface NthStyle {
  translate?: string;
  placeSelf?: string;
  width: string;
  height: string;
}

const localImages = [
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060976/RO1_gk1ppp.jpg",
    alt: "Chemical Dosing System",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060976/OMS2_fbcrdl.jpg",
    alt: "The Clarifier",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060977/RO2_jjdtan.jpg",
    alt: "Biological MBBR Treatment",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060977/ETP1_ugtou4.jpg",
    alt: "Pressure Sand Filter",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060976/WhatsApp_Image_2026-05-06_at_10.55.12_AM_jqorj1.jpg",
    alt: "Tube Settlers",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060977/STP1_tcprpw.jpg",
    alt: "Activated Carbon Filters",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1773727163/Water-Treatment-Plants-WTP1_ggis8i.webp",
    alt: "Water Treatment Plants",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060975/OMS1_bsvsqe.jpg",
    alt: "Sewage Treatment Plants",
  },
  {
    src: "https://res.cloudinary.com/dwttz8kvz/image/upload/f_auto,q_auto/v1778060975/UF1_wx6qux.jpg",
    alt: "Effluent Treatment Plant",
  },
];

const images: ImageItem[] = localImages.map((img, index) => ({
  src: img.src,
  // Derive alt text from image URL filename
  alt: img.src.split('/').pop()?.split('.')[0].replace(/[-_]/g, ' ') ?? '',
  nth: index + 1,
}));

const S = 12;

const nthStyles: Record<number, NthStyle> = {
  1: { translate: `${2 * S}px ${4 * S}px`, placeSelf: "end",    width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
  2: { translate: `0px ${2 * S}px`,                              width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
  3: { translate: `${-2 * S}px ${4 * S}px`, placeSelf: "start", width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
  4: { translate: `${4 * S}px 0px`, placeSelf: "center",        width: `${4 * 4 * S}px`, height: `${3 * 4 * S}px` },
  5: { placeSelf: "center",                                      width: `${2 * 4 * S}px`, height: `${4 * 4 * S}px` },
  6: { translate: `${-4 * S}px 0px`, placeSelf: "center",       width: `${4 * 4 * S}px`, height: `${3 * 4 * S}px` },
  7: { translate: `${2 * S}px ${-4 * S}px`, placeSelf: "end",   width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
  8: { translate: `0px ${-2 * S}px`,                            width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
  9: { translate: `${-2 * S}px ${-4 * S}px`, placeSelf: "start",width: `${3 * 4 * S}px`, height: `${3 * 4 * S}px` },
};

const waveMask = `
  radial-gradient(${Math.sqrt(2) * S}px, #000 calc(100% - 1px), #0000),
  conic-gradient(#000 0 0) content-box,
  radial-gradient(${Math.sqrt(2) * S}px, #0000 100%, #000 calc(100% + 1px)) ${S}px ${S}px padding-box
`.trim();

export default function WaveGallery(): JSX.Element {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[550px] h-[480px] overflow-visible mx-auto">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          placeContent: "center",
          gap: "8px",
        }}
      >
        {images.map(({ src, alt, nth }: ImageItem) => {
          const pos: NthStyle = nthStyles[nth];

          const imgStyle: CSSProperties = {
            width: pos.width,
            height: pos.height,
            objectFit: "cover",
            padding: `${S}px`,
            border: `${S}px solid transparent`,
            background: "#ffffff",
            borderRadius: `${3.5 * S}px`,
            translate: pos.translate ?? "none",
            placeSelf: pos.placeSelf ?? "auto",
            WebkitMask: waveMask,
            mask: waveMask,
            maskSize: `${S * 4}px ${S * 4}px`,
          };

          return (
            <img
              key={src}
              src={src}
              alt={alt}
              style={imgStyle}
            />
          );
        })}
      </div>
    </div>
  );
}