import { ProductImage } from "@/constants/type";

const Image_Section = ({ images }: ProductImage) => {
  console.log(images);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-[400px]">
      <img
        src={images.url}
        alt={images.alt}
        loading="lazy"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Image_Section;
