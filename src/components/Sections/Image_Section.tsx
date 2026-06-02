import { ImageType } from "@/constants/type";

const Image_Section = ({ images }: { images: ImageType }) => {
  if (!images || !images.url) return <div className="w-full h-[400px] bg-muted animate-pulse rounded-2xl" />;

  return (
    <div className="relative rounded-2xl overflow-hidden w-full h-[400px]">
      <img
        src={images.url}
        alt={images.alt || "Product image"}
        loading="lazy"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Image_Section;
