import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  User,
  Tag,
  MessageCircle,
  Send,
  Heart,
  Bookmark,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { blogs } from "@/constants/siteData";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Comment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  comments: Comment[];
}

// ── Comment Item ──────────────────────────────────────────────────────────────
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
      {/* Avatar */}
      <div className="shrink-0">
        {comment.avatar ? (
          <img
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

      {/* Content */}
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
          className={`mt-2 flex items-center gap-1.5 text-xs font-medium transition-colors ${
            liked ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${liked ? "fill-rose-500" : ""}`} />
          {likeCount}
        </button>
      </div>
    </motion.div>
  );
};

// ── Blog Modal ────────────────────────────────────────────────────────────────
const BlogModal: React.FC<{ blog: Blog; onClose: () => void }> = ({
  blog,
  onClose,
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(blog.comments);
  const [bookmarked, setBookmarked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      author: "You",
      avatar: "",
      date: "Just now",
      text: comment.trim(),
      likes: 0,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.18)] overflow-hidden flex flex-col"
      >
        {/* Hero Image */}
        <div className="relative h-52 sm:h-72 shrink-0 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Top bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/30">
              {blog.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <Bookmark
                  className={`w-4 h-4 ${bookmarked ? "fill-white" : ""}`}
                />
              </button>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-5 right-5">
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight drop-shadow-md">
              {blog.title}
            </h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <div className="flex items-center gap-2">
              {blog.authorAvatar ? (
                <img
                  src={blog.authorAvatar}
                  alt={blog.author}
                  className="w-7 h-7 rounded-full object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                  {blog.author.charAt(0)}
                </div>
              )}
              <span className="text-sm font-semibold text-slate-700">
                {blog.author}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <User className="w-3.5 h-3.5" />
              {blog.date}
            </div>
          </div>

          {/* Blog content */}
          <div className="px-6 py-6">
            <p className="text-base text-slate-600 leading-relaxed mb-5 font-medium">
              {blog.excerpt}
            </p>
            <div className="text-sm text-slate-600 leading-[1.9] space-y-4 whitespace-pre-line">
              {blog.content}
            </div>

            {/* Tags */}
            {blog.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Comments ── */}
          <div className="px-6 pb-6 border-t border-slate-100">
            <div className="flex items-center gap-2 pt-5 mb-4">
              <MessageCircle className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-bold text-slate-800">
                Comments
                <span className="ml-2 text-sm font-normal text-slate-400">
                  ({comments.length})
                </span>
              </h3>
            </div>

            {/* Comment list */}
            <div className="mb-5">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <CommentItem key={c.id} comment={c} index={i} />
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-6">
                  No comments yet. Be the first!
                </p>
              )}
            </div>

            {/* Add comment */}
            <form onSubmit={handleSubmit} className="flex gap-3 items-end">
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 resize-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={!comment.trim()}
                className="mb-0.5 w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Blog Card ─────────────────────────────────────────────────────────────────
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
        group relative bg-white rounded-2xl overflow-hidden cursor-pointer
        border border-slate-100
        shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]
        transition-all duration-500 hover:-translate-y-1.5
        ${featured ? "md:col-span-2" : ""}
      `}
    >
      {/* Image */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-blue-600 shadow-sm">
            {blog.category}
          </span>
        </div>

        {/* Arrow button on hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <ArrowUpRight className="w-4 h-4 text-slate-700" />
        </motion.div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            {blog.authorAvatar ? (
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-[0.6rem] font-bold shrink-0">
                {blog.author.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium text-slate-500">
              {blog.author}
            </span>
          </div>
          <span className="text-slate-200">·</span>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock className="w-3 h-3" />
            {blog.readTime}
          </div>
          <span className="text-slate-200">·</span>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <MessageCircle className="w-3 h-3" />
            {blog.comments.length}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-slate-900 leading-snug mb-2 group-hover:text-blue-600 transition-colors ${
            featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          }`}
        >
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">{blog.date}</span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 group-hover:gap-2 transition-all">
            Read more <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Bottom accent line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400"
        initial={{ width: "0%" }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.article>
  );
};

// ── Main Blog Section ─────────────────────────────────────────────────────────
export default function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  // ── Lock body scroll when modal is open ──────────────────────────────────
  React.useEffect(() => {
    if (selectedBlog) {
      // Save current scroll position and lock
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflowY = "scroll"; // keep scrollbar visible to avoid layout shift
    } else {
      // Restore scroll position on close
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      // Cleanup on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflowY = "";
    };
  }, [selectedBlog]);
  // ─────────────────────────────────────────────────────────────────────────

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b: Blog) => b.category))),
  ];

  const filtered: Blog[] =
    activeCategory === "All"
      ? blogs
      : blogs.filter((b: Blog) => b.category === activeCategory);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16 sm:py-24 px-4 sm:px-6">
      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">
                Latest Articles
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
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
            <p className="mt-3 text-slate-500 text-base sm:text-lg max-w-lg">
              Explore our latest articles, ideas, and perspectives from the
              team.
            </p>
          </div>

          {/* Post count */}
          <div className="shrink-0 text-right hidden sm:block">
            <span className="text-4xl font-extrabold text-blue-500">
              {filtered.length}
            </span>
            <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wider">
              Articles
            </p>
          </div>
        </motion.div>

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_4px_14px_rgba(59,130,246,0.35)] scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Blog Grid ── */}
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
                key={blog.id}
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
            className="text-center py-20 text-slate-400"
          >
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">
              No articles in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedBlog && (
          <BlogModal
            blog={selectedBlog}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
