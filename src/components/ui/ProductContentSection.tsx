import Extra_Text_Section from "@/components/ui/dynamic_Text";
import Image_Section from "@/components/Sections/Image_Section";
import { Product } from "@/constants/type";
import Text from "@/components/ui/Text";

type ServiceSectionProps = {
  layout?: string;
  product: Product;
};

type LayoutConfig = {
  containerClass: string;
  imageClass: string;
  contentClass: string;
  imageOrder?: string;
  contentOrder?: string;
};

const LAYOUT_CONFIGS: Record<"1" | "2" | "3", LayoutConfig> = {
  "1": {
    containerClass: "grid lg:grid-cols-2 gap-12 items-center mb-10",
    imageClass: "relative",
    contentClass: "",
  },
  "2": {
    containerClass: "grid lg:grid-cols-2 gap-12 items-center",
    imageClass: "relative lg:order-2",
    contentClass: "lg:order-1",
  },
  "3": {
    containerClass: "flex flex-col items-center",
    imageClass: "relative w-full max-w-4xl mb-12",
    contentClass: "text-center max-w-4xl",
  },
};

const Content_Text_Section = ({
  className,
  content,
}: {
  className: string;
  content: { title: string; description: string };
}) => {
  return (
    <div className={className}>
      <Text variant="title" className="mb-6" as={"h2"}>
        {content.title}{" "}
      </Text>
      <Text variant="body" as={"p"}>
        {content.description}{" "}
      </Text>
    </div>
  );
};

const LayoutRenderer = ({
  layout,
  product,
  config,
}: {
  layout: "1" | "2" | "3";
  product: Product;
  config: LayoutConfig;
}) => {
  console.log(product);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className={config.containerClass}>
        <div className={config.imageClass}>
          <Image_Section images={product.images[0]} />
        </div>

        <Content_Text_Section
          className={config.contentClass}
          content={product.main}
        />
      </div>

      {product.Page_Description && (
        <Extra_Text_Section extraContent={product.Page_Description} />
      )}
    </div>
  );
};

const ProductContentSection = ({
  layout = "1",
  product,
}: ServiceSectionProps) => {
  const config = LAYOUT_CONFIGS[layout];

  return (
    <div className="bg-white">
      <LayoutRenderer layout={layout} product={product} config={config} />
    </div>
  );
};

export default ProductContentSection;
