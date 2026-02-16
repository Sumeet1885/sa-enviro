import React from "react";
import { SEO } from "@/components/layout/SEO";
import Carousel from "@/components/ui/carousel";
import ProductInfo from "@/components/ui/productInfo";
import { seoData, products } from "@/constants/siteData";
import ProductContentSection from "@/components/ProductContentSection";
import ProductShowCase from "@/components/ui/Used/ProductShowCase";
import { useParams } from "react-router-dom";
import { randomInt } from "crypto";
import { log } from "console";

function Product() {
  const { slug } = useParams();

  const product = products.find((product) => product.key === slug);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={seoData.gallery.title}
        description={seoData.gallery.description}
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
      {product.images.length > 1 ? (
        <ProductShowCase
          layout={Math.floor(Math.random() * 3).toString()}
          product={product}
          images={product.images}
        />
      ) : (
        <ProductContentSection
          layout={Math.floor(Math.random() * 4).toString()}
          product={product}
        />
      )}
    </div>
  );
}

export default Product;
