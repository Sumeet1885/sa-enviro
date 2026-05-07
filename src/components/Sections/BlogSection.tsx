import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Heart,
  ArrowUpRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { blogs } from "@/constants/siteData";
import { PageDescriptionBlock } from "@/constants/type";

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

export interface Blog {
  key: string;
  title: string;
  excerpt: string;
  content: PageDescriptionBlock[];
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  comments: Comment[];
}

const CommentItem: React.FC<{ comment: Comment; index: number }> = ({
  comment,
  index,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index, duration: 0.4 }}
      className="flex gap-3 py-4 border-b border-slate-100 last:border-0"
    >
      <div className="shrink-0">
        {comment.avatar ? (
          <img
            loading="lazy"
            src={comment.avatar}
            alt={comment.author}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold ring-2 ring-slate-100">
            {comment.author.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-semibold text-slate-800">
            {comment.author}
          </span>
          <span className="text-[0.7rem] text-slate-400 shrink-0">
            {comment.date}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{comment.text}</p>
        <button
          onClick={() => {
            setLiked(!liked);
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
          }}
          className={`mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
            }`}
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500" : ""}`} />
          {likeCount}
        </button>
      </div>
    </motion.div>
  );
};

const BlogCard: React.FC<{
  blog: Blog;
  index: number;
  onClick: () => void;
  featured?: boolean;
}> = ({ blog, index, onClick, featured = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.08 * index, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`
        group relative bg-card rounded-2xl overflow-hidden cursor-pointer
        border-border
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-1.5
        ${featured ? "md:col-span-2" : ""}
      `}
    >
      <Link to={`/blog/${blog.key}`}>
        <div
          className={`relative overflow-hidden ${featured ? "h-64 sm:h-80" : "h-48 sm:h-52"}`}
        >
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-popover backdrop-blur-sm text-xs font-bold text-primary shadow-sm">
              {blog.category}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-popover flex items-center justify-center shadow-md"
          >
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </motion.div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5">
              {blog.authorAvatar ? (
                <img
                  loading="lazy"
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-water-deep/50 to-cyan-400 flex items-center justify-center text-white text-[0.6rem] font-bold shrink-0">
                  {blog.author.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-card-foreground">
                {blog.author}
              </span>
            </div>
            <span className="text-card-foreground">·</span>

            <span className="text-card-foreground">·</span>
          </div>

          <h3
            className={`font-bold text-foreground leading-snug mb-2 group-hover:text-water-deep/90 transition-colors ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
              }`}
          >
            {blog.title}
          </h3>

          <p className="text-sm text-card-foreground leading-relaxed line-clamp-2 mb-4">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-card-foreground">{blog.date}</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold gradient-text group-hover:gap-2 transition-all">
              Read more <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: "0%" }}
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </Link>
    </motion.article>
  );
};

export default function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  React.useEffect(() => {
    if (selectedBlog) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll";
    } else {

      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
    };
  }, [selectedBlog]);


  const filtered: Blog[] = blogs;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Latest Articles
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              Stories &amp;{" "}
              <span className="relative inline-block">
                Insights
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 6 Q50 0 100 5 Q150 10 200 4"
                    stroke="url(#underline-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient
                      id="underline-gradient"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="mt-3 text-foreground text-base sm:text-lg max-w-lg">
              Explore our latest articles, ideas, and perspectives from the
              team.
            </p>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            <span className="text-4xl font-extrabold gradient-text">
              {blogs.length}
            </span>
            <p className="text-xs text-foreground font-medium mt-0.5 uppercase tracking-wider">
              Articles
            </p>
          </div>
        </motion.div>

      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((blog: Blog, index: number) => (
              <BlogCard
                key={blog.key}
                blog={blog}
                index={index}
                onClick={() => setSelectedBlog(blog)}
                featured={index === 0 && filtered.length >= 3}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-card-foreground"
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">
              No articles in this category yet.
            </p>
          </motion.div>
        )}
      </div>

    </section>
  );
}
