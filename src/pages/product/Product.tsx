import { SEO } from "@/components/layout/SEO";
import { products } from "@/constants/siteData";
import Product_Content from "@/components/Sections/ProductContent";
import { useParams } from "react-router-dom";

function ProductHeroImage({ src, alt }: { src: string; alt?: string }) {
  return (
    <div className="hidden lg:block w-full ml-10">
      <div className="w-[85%] aspect-[3/2] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_0_1px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.15)]">
        <img
          src={src}
          alt={alt ?? "Product image"}
          width={1200}
          height={800}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
    </div>
  );
}

function Product() {
  const { slug } = useParams();

  const layout = slug === "water_softeners_plant" ? "2" : "1";
  const product = products.find((product) => product.key === slug);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={product.main.seo.title}
        description={product.main.seo.description}
        keywords={product.main.seo.keywords}
        image={product.main.seo.image}
        url={product.main.seo.url}
        schema={product.main.seo.schema}
      />


      <section className="py-24 lg:py-32 bg-gradient-to-br from-water-deep to-water-ocean text-primary-foreground">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            <div className="max-w-xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-water-sky/20 text-water-sky text-sm font-medium mb-4">
                Product
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
                {"Our Product & Equipment"}
              </h1>
              <p className="text-water-light/90 text-lg leading-relaxed">
                {
                  "Explore our range of water treatment solutions and installations."
                }
              </p>
            </div>


            <ProductHeroImage
              src={product.main.image}
              alt={product.main.title}
            />
          </div>
        </div>
      </section>


      <Product_Content slug={slug} layout={layout} />
    </div>
  );
}

export default Product;
