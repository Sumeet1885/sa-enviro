import ProductContentSection from "@/components/ui/ProductContentSection";
import ProductShowCase from "@/components/ui/ProductShowCase";
import { products } from "@/constants/siteData";

function Product_Content({ slug, layout }: { slug: string; layout?: string }) {
  const product = products.find((product) => product.key === slug);
  return (
    <>
      

      {product.images.length > 1 ? (
        <ProductShowCase
          layout={layout ? layout : Math.floor(Math.random() * 3).toString()}
          product={product}
          images={product.images}
        />
      ) : (
        <ProductContentSection
          layout={layout ? layout : Math.floor(Math.random() * 4).toString()}
          product={product}
        />
      )}
    </>
  );
}

export default Product_Content;
