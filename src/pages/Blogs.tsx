import { SEO } from "@/components/layout/SEO";
import { seoData, blogs } from "@/constants/siteData";
import BlogsSection from "@/components/Sections/BlogSection";
import HeroSection from "@/components/Sections/HeroSection";
import { useParams } from "react-router-dom";
import BlogPage from "@/components/Sections/BlogPage";
import { BookOpen, PenLine, Tag } from "lucide-react";

const BlogsHeroRight = () => {
  const totalArticles = blogs.length;
  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))];
  const totalTags = [...new Set(blogs.flatMap((b) => b.tags))].length;

  return (
    <div className="relative">
      {/* Glow orb behind card */}
      <div
        style={{
          position: "absolute",
          inset: "-24px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(14,165,233,0.35) 0%, transparent 70%)",
          filter: "blur(24px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Glass card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          padding: "28px 32px",
          minWidth: "260px",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            height: "3px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            marginBottom: "20px",
          }}
        />

        {/* Big article count */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span
            style={{
              display: "block",
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1,
              background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-2px",
            }}
          >
            {totalArticles}
          </span>
          <span
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(186,230,253,0.8)",
              marginTop: "4px",
            }}
          >
            Published Articles
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            marginBottom: "16px",
          }}
        />

        {/* Stats row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
            }}
          >
            <BookOpen
              size={15}
              style={{ color: "#38bdf8", flexShrink: 0 }}
            />
            <span style={{ fontSize: "13px", color: "rgba(226,232,240,0.9)", flex: 1 }}>
              Expert Articles
            </span>
            <span
              style={{
                fontWeight: 700,
                color: "#e0f2fe",
                fontSize: "14px",
              }}
            >
              {totalArticles}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
            }}
          >
            <PenLine
              size={15}
              style={{ color: "#a78bfa", flexShrink: 0 }}
            />
            <span style={{ fontSize: "13px", color: "rgba(226,232,240,0.9)", flex: 1 }}>
              Categories
            </span>
            <span
              style={{
                fontWeight: 700,
                color: "#e0f2fe",
                fontSize: "14px",
              }}
            >
              {categories.length || 1}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 12px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "10px",
            }}
          >
            <Tag
              size={15}
              style={{ color: "#34d399", flexShrink: 0 }}
            />
            <span style={{ fontSize: "13px", color: "rgba(226,232,240,0.9)", flex: 1 }}>
              Unique Tags
            </span>
            <span
              style={{
                fontWeight: 700,
                color: "#e0f2fe",
                fontSize: "14px",
              }}
            >
              {totalTags}
            </span>
          </div>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            marginTop: "16px",
            textAlign: "center",
            padding: "6px 12px",
            borderRadius: "9999px",
            background: "rgba(56,189,248,0.12)",
            border: "1px solid rgba(56,189,248,0.25)",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#7dd3fc",
              letterSpacing: "0.08em",
            }}
          >
            ✦ Knowledge Hub
          </span>
        </div>
      </div>
    </div>
  );
};

const Client = () => {
  const { slug } = useParams();

  return (
    <>
      <SEO
        title={seoData.blogs.title}
        description={seoData.blogs.description}
      />

      <HeroSection
        title="Our Blogs"
        heading="SAES Knowledge Hub"
        subtitle="Insights, Innovations & Industry Updates in Water, Wastewater, ZLD & Environmental Engineering"
        rightContent={<BlogsHeroRight />}
        compact
      />
      {!slug ? <BlogsSection /> : <BlogPage />}
    </>
  );
};

export default Client;
