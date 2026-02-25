import { SEO } from "@/components/layout/SEO";
import { seoData, products } from "@/constants/siteData";
import ProductContentSection from "@/components/ui/ProductContentSection";
import ProductShowCase from "@/components/ui/ProductShowCase";
import Product_Content from "@/components/Sections/ProductContent";
import { useParams } from "react-router-dom";

function Product() {
  const { slug } = useParams();

  const product = products.find((product) => product.key === slug);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={seoData.products.title}
        description={seoData.products.description}
      />
      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
        <div className="container-wide">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
              Product
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Our Product & Equipment
            </h1>
            <p className="text-water-light/90 text-lg">
              Explore our Product of water treatment solutions and
              installations.
            </p>
          </div>
        </div>
      </section>
      <Product_Content slug={slug} />
    </div>
  );
}

export default Product;
