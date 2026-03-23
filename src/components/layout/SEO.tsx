import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/constants/siteData";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export const SEO = ({
  title = siteConfig.name,
  description = siteConfig.description,
  image = "/",
  url = "",
  keywords,
  schema,
}: SEOProps) => {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="applicatiosn/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : [schema])}
        </script>
      )}
    </Helmet>
  );
};
