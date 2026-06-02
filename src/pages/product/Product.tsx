import { SEO } from "@/components/layout/SEO";
import { products } from "@/constants/siteData";
import { useParams, Navigate } from "react-router-dom";
import ProductPage from "@/components/Sections/ProductPage";

function Product() {
  const { slug } = useParams();

  const product = products.find((product) => product.key === slug);

  if (!product) return <Navigate to="/" replace />;

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
      <ProductPage product={product} />
    </div>
  );
}

export default Product;
