import React from "react";
import Text from "@/components/ui/dynamic_Text";
import { useParams } from "react-router-dom";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { blogs } from "@/constants/siteData";

/**
 * ============================================================
 * PRODUCTION-GRADE BLOG PAGE — v3
 * ============================================================
 * Major change: content field is now plain text only.
 * No HTML tags in the data whatsoever.
 *
 * Plain-text content conventions (simple, intuitive):
 *  ## Heading 2        → <h2> section heading
 *  ### Heading 3       → <h3> sub-heading
 *  > Quote text        → styled blockquote card
 *  - Item or * Item    → bullet list item (consecutive lines = one list)
 *  1. Item             → numbered list item
 *  ---                 → visual divider
 *  (blank line)        → paragraph break
 *  (normal text)       → paragraph
 *
 * The PlainTextRenderer component handles all of this — no HTML
 * ever needs to appear in the content string.
 * ============================================================
 */

import { useState, useEffect } from "react";
import {
  Twitter,
  Linkedin,
  Link2,
  Check,
  Tag,
  MessageCircle,
  Clock,
  Calendar,
  Bookmark,
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as NavRight,
  Minus,
} from "lucide-react";

// ─── GLOBAL CSS (brand tokens + utilities only) ───────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

  :root {
    --c-primary:       #2563EB;
    --c-primary-light: #DBEAFE;
    --c-primary-dark:  #1E3A8A;
    --c-accent:        #0EA5E9;
    --c-bg:            #F1F5F9;
    --c-surface:       #FFFFFF;
    --c-border:        #E2E8F0;
    --c-text:          #0F172A;
    --c-text-muted:    #64748B;
    --c-tag-bg:        #EFF6FF;
    --c-tag-text:      #1D4ED8;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--c-bg);
    color: var(--c-text);
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  .ff-display { font-family: 'Lora', Georgia, serif; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--c-bg); }
  ::-webkit-scrollbar-thumb { background: var(--c-border); border-radius: 99px; }

  /* Reading progress */
  .progress-bar {
    position: fixed; top: 0; left: 0; height: 3px; z-index: 9999;
    background: linear-gradient(to right, var(--c-primary), var(--c-accent));
    border-radius: 0 2px 2px 0;
    transition: width .12s linear;
  }

  /* Sidebar: hide scrollbar visually */
  .sidebar-scroll { scrollbar-width: none; }
  .sidebar-scroll::-webkit-scrollbar { display: none; }

  /* Fade-up entry animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .anim-0 { animation: fadeUp .5s ease both; }
  .anim-1 { animation: fadeUp .5s .1s ease both; }
  .anim-2 { animation: fadeUp .5s .2s ease both; }
`;

// ─── PLAIN-TEXT CONTENT RENDERER ──────────────────────────────────────────────
/**
 * Parses a plain-text string line by line and produces styled React elements.
 *
 * Supported conventions:
 *   ## Text       → h2 heading with bottom border
 *   ### Text      → h3 sub-heading
 *   > Text        → blockquote card
 *   - Text        → unordered list item  (consecutive = one <ul>)
 *   * Text        → unordered list item
 *   1. Text       → ordered list item    (consecutive = one <ol>)
 *   ---           → <hr> divider
 *   (empty line)  → paragraph separator (groups text into <p> blocks)
 *   (plain text)  → paragraph text
 */

// ─── READING PROGRESS ─────────────────────────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setPct(
        scrollable > 0 ? Math.round((el.scrollTop / scrollable) * 100) : 0,
      );
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      className="progress-bar"
      style={{ width: `${pct}%` }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}

// ─── BLOG HEADER ──────────────────────────────────────────────────────────────
function BlogHeader({ title, image }) {
  const heroImg = Array.isArray(image) ? image[0] : image;
  return (
    <header className="anim-0 relative overflow-hidden rounded-2xl mb-10">
      <img
        src={heroImg}
        alt={`Cover image for: ${title}`}
        className="w-full object-cover block"
        style={{ height: "clamp(280px, 46vw, 540px)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,23,42,0) 0%, rgba(15,23,42,.5) 52%, rgba(15,23,42,.92) 100%)",
        }}
      />
    </header>
  );
}

// ─── BLOG META ────────────────────────────────────────────────────────────────
function BlogMeta({ author, authorAvatar, date, readTime }) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const formatted = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="anim-1 flex flex-wrap items-center gap-4 pb-6 border-b"
      style={{ borderColor: "var(--c-border)" }}
    >
      {/* Author avatar + name */}
      <div className="flex items-center gap-3">
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={author}
            className="w-11 h-11 rounded-full object-cover"
            style={{ border: "2px solid var(--c-primary-light)" }}
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
            }}
          >
            {initials}
          </div>
        )}
        <div>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--c-text)" }}
          >
            {author}
          </p>
          <p className="text-xs" style={{ color: "var(--c-text-muted)" }}>
            Author
          </p>
        </div>
      </div>

      <span
        className="text-xl hidden sm:inline"
        style={{ color: "var(--c-border)" }}
        aria-hidden="true"
      >
        ·
      </span>

      <span
        className="flex items-center gap-1.5 text-sm"
        style={{ color: "var(--c-text-muted)" }}
      >
        <Calendar size={14} aria-hidden="true" />
        <time dateTime={date}>{formatted}</time>
      </span>

      <span
        className="text-xl hidden sm:inline"
        style={{ color: "var(--c-border)" }}
        aria-hidden="true"
      >
        ·
      </span>

      {/* <span
        className="flex items-center gap-1.5 text-sm"
        style={{ color: "var(--c-text-muted)" }}
      >
        <Clock size={14} aria-hidden="true" />
        {readTime}
      </span> */}
    </div>
  );
}

// ─── BLOG CONTENT ─────────────────────────────────────────────────────────────
/**
 * BlogContent: renders the optional excerpt lead + the plain-text body
 * via PlainTextRenderer. Zero HTML in the data.
 */
function BlogContent({ title, excerpt, content }) {
  return (
    <article aria-label="Blog post content">
      {title && (
        <h1
          className="anim-1 ff-display text-xl italic  my-7 pl-5 font-bold leading-tight"
          style={{
            color: "var(--c-text-muted)",
            borderLeft: "4px solid var(--c-primary)",
            lineHeight: "1.75",
          }}
        >
          {title}
        </h1>
      )}
      <h2
        className="ff-display font-bold mt-10 mb-4 pb-3 "
        style={{
          fontSize: "1.45rem",
          color: "var(--c-text)",
          borderBottom: "2px solid var(--c-primary-light)",
        }}
      >
        Blog Heading
      </h2>

      <p
        className="text-bold leading-loose mt-4"
        style={{ color: "var(--c-text-muted)", lineHeight: "1.9" }}
      >
        {excerpt}
      </p>
      <h2
        className="ff-display font-bold mt-10 mb-4 pb-3 "
        style={{
          fontSize: "1.45rem",
          color: "var(--c-text)",
          borderBottom: "2px solid var(--c-primary-light)",
        }}
      >
        Content
      </h2>
      <Text extraContent={content} />
      {/* <PlainTextRenderer content={content} /> */}
    </article>
  );
}

// ─── BLOG IMAGE GALLERY ───────────────────────────────────────────────────────
function BlogImageGallery({ image }) {
  const images = Array.isArray(image) ? image.slice(1) : [];
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  if (images.length === 0) return null;

  return (
    <section aria-label="Image gallery" className="my-10">
      <h2
        className="ff-display font-semibold mb-5 flex items-center gap-2"
        style={{ color: "var(--c-text)", fontSize: "1.15rem" }}
      >
        <Bookmark size={18} style={{ color: "var(--c-primary)" }} />
        Photo Gallery
        <span
          className="text-sm font-normal ml-1"
          style={{ color: "var(--c-text-muted)" }}
        >
          ({images.length} image{images.length !== 1 ? "s" : ""})
        </span>
      </h2>

      <div
        className={`grid gap-4 ${images.length === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden rounded-xl border block w-full text-left"
            style={{
              background: "var(--c-bg)",
              borderColor: "var(--c-border)",
              aspectRatio: "16 / 10",
              boxShadow: "0 2px 8px rgba(0,0,0,.07)",
              cursor: "zoom-in",
            }}
            aria-label={`Open image ${i + 2} in viewer`}
          >
            <img
              src={src}
              alt={`Gallery image ${i + 2}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,23,42,.7) 0%, transparent 60%)",
              }}
            >
              <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/25">
                <Bookmark size={11} /> View full size
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,.92)", backdropFilter: "blur(6px)" }}
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <div
            className="relative flex flex-col items-center"
            style={{ maxWidth: "90vw", maxHeight: "92vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightbox]}
              alt={`Full size gallery image ${lightbox + 2}`}
              className="rounded-xl shadow-2xl block"
              style={{
                maxWidth: "88vw",
                maxHeight: "80vh",
                objectFit: "contain",
                width: "auto",
                height: "auto",
              }}
            />
            <p className="text-white/60 text-sm mt-3">
              Image {lightbox + 2} of {images.length + 1}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              style={{ background: "var(--c-primary)", color: "#fff" }}
              aria-label="Close viewer"
            >
              <X size={16} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightbox((i) => (i - 1 + images.length) % images.length)
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,.15)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,.2)",
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setLightbox((i) => (i + 1) % images.length)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: "rgba(255,255,255,.15)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,.2)",
                  }}
                  aria-label="Next image"
                >
                  <NavRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── BLOG TAGS ────────────────────────────────────────────────────────────────
function BlogTags({ tags }) {
  if (!tags?.length) return null;
  return (
    <section aria-label="Post tags" className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="flex items-center gap-1 text-xs font-medium mr-1"
          style={{ color: "var(--c-text-muted)" }}
        >
          <Tag size={13} /> Tags:
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border cursor-default transition-all duration-150 hover:-translate-y-0.5"
            style={{
              background: "var(--c-tag-bg)",
              color: "var(--c-tag-text)",
              borderColor: "var(--c-primary-light)",
            }}
            role="listitem"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}

// ─── COMMENT CARD ─────────────────────────────────────────────────────────────
function CommentCard({ comment }) {
  const initials = comment.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const date = new Date(comment.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <li
      className="flex gap-4 p-5 rounded-xl border transition-shadow duration-200 hover:shadow-md list-none"
      style={{ background: "var(--c-surface)", borderColor: "var(--c-border)" }}
      aria-label={`Comment by ${comment.name}`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
        }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between flex-wrap gap-1 mb-2">
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--c-text)" }}
          >
            {comment.name}
          </span>
          <time
            dateTime={comment.date}
            className="text-xs"
            style={{ color: "var(--c-text-muted)" }}
          >
            {date}
          </time>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--c-text-muted)" }}
        >
          {comment.message}
        </p>
      </div>
    </li>
  );
}

// ─── COMMENT FORM ─────────────────────────────────────────────────────────────
function CommentForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: "var(--c-primary-light)" }}
      >
        <Check size={18} style={{ color: "var(--c-primary)" }} />
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--c-primary-dark)" }}
        >
          Thanks! Your comment will appear after moderation.
        </p>
      </div>
    );
  }

  const onFocus = (e) => {
    e.target.style.borderColor = "var(--c-primary)";
    e.target.style.boxShadow = "0 0 0 3px var(--c-primary-light)";
    e.target.style.outline = "none";
  };
  const onBlur = (e) => {
    e.target.style.borderColor = "var(--c-border)";
    e.target.style.boxShadow = "none";
  };

  const fieldBase = {
    borderColor: "var(--c-border)",
    background: "var(--c-surface)",
    color: "var(--c-text)",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color .15s, box-shadow .15s",
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="c-name"
          className="block text-xs font-medium mb-1.5"
          style={{ color: "var(--c-text-muted)" }}
        >
          Name *
        </label>
        <input
          id="c-name"
          type="text"
          value={name}
          required
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 text-sm rounded-lg border"
          style={fieldBase}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div>
        <label
          htmlFor="c-msg"
          className="block text-xs font-medium mb-1.5"
          style={{ color: "var(--c-text-muted)" }}
        >
          Message *
        </label>
        <textarea
          id="c-msg"
          value={msg}
          required
          rows={4}
          placeholder="Share your thoughts…"
          onChange={(e) => setMsg(e.target.value)}
          className="w-full px-4 py-2.5 text-sm rounded-lg border"
          style={{ ...fieldBase, resize: "vertical" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <button
        onClick={() => {
          if (name.trim() && msg.trim()) setDone(true);
        }}
        className="self-start text-sm font-medium px-5 py-2.5 rounded-lg text-white transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: "var(--c-primary)",
          boxShadow: "0 2px 8px rgba(37,99,235,.25)",
        }}
      >
        Post Comment
      </button>
    </div>
  );
}

// ─── BLOG COMMENTS ────────────────────────────────────────────────────────────
function BlogComments({ comments }) {
  return (
    <section aria-label="Comments section" className="mt-12">
      <h2
        className="ff-display font-bold text-2xl mb-6 flex items-center gap-2.5"
        style={{ color: "var(--c-text)" }}
      >
        <MessageCircle size={22} style={{ color: "var(--c-primary)" }} />
        {comments.length} Comment{comments.length !== 1 ? "s" : ""}
      </h2>

      {comments.length > 0 && (
        <ul className="flex flex-col gap-3 mb-8 pl-0">
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </ul>
      )}

      <div
        className="rounded-xl border p-6"
        style={{
          background: "var(--c-surface)",
          borderColor: "var(--c-border)",
          boxShadow: "0 1px 4px rgba(0,0,0,.05)",
        }}
      >
        <h3
          className="ff-display font-bold text-lg mb-5"
          style={{ color: "var(--c-text)" }}
        >
          Leave a Comment
        </h3>
        <CommentForm />
      </div>
    </section>
  );
}

// ─── AUTHOR CARD ──────────────────────────────────────────────────────────────
function AuthorCard({ author, authorAvatar }) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="mt-10 rounded-2xl p-6 flex gap-5 items-center flex-wrap"
      style={{
        background: "var(--c-primary-light)",
        border: "1px solid var(--c-primary-light)",
      }}
    >
      {authorAvatar ? (
        <img
          src={authorAvatar}
          alt={author}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          style={{
            border: "3px solid white",
            boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          }}
        />
      ) : (
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--c-primary), var(--c-accent))",
            boxShadow: "0 4px 14px rgba(0,0,0,.12)",
          }}
        >
          {initials}
        </div>
      )}
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-0.5"
          style={{ color: "var(--c-primary)" }}
        >
          Written by
        </p>
        <p
          className="ff-display font-bold text-xl"
          style={{ color: "var(--c-text)" }}
        >
          {author}
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--c-text-muted)" }}>
          Passionate writer & industry expert sharing insights on the latest
          trends and innovations.
        </p>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ tags, category }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const enc =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.href)
      : "";
  const tweetUrl = `https://twitter.com/intent/tweet?url=${enc}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`;

  const card = {
    background: "var(--c-surface)",
    borderColor: "var(--c-border)",
    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
  };

  return (
    <aside
      aria-label="Sidebar"
      className="sidebar-scroll hidden lg:flex flex-col gap-5"
      style={{
        top: "2.5rem",
        width: "272px",
        flexShrink: 0,
        position: "sticky",
        // top: "5.5rem",
        // maxHeight: "calc(100vh - 7rem)",
        // overflowY: "auto",
      }}
    >
      {/* Category */}
      <div className="rounded-xl border p-5" style={card}>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--c-text-muted)" }}
        >
          Category
        </p>
        <span
          className="inline-flex items-center text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full text-white"
          style={{ background: "var(--c-primary)" }}
        >
          {category}
        </span>
      </div>

      {/* Tags */}
      <div className="rounded-xl border p-5" style={card}>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--c-text-muted)" }}
        >
          Tags
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border cursor-default transition-all duration-150 hover:-translate-y-0.5"
              style={{
                background: "var(--c-tag-bg)",
                color: "var(--c-tag-text)",
                borderColor: "var(--c-primary-light)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share */}
      <div className="rounded-xl border p-5" style={card}>
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--c-text-muted)" }}
        >
          Share Article
        </p>
        <div className="flex flex-col gap-2.5">
          {/* Twitter */}
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border w-full no-underline transition-all duration-150"
            style={{
              background: "var(--c-surface)",
              borderColor: "var(--c-border)",
              color: "var(--c-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1DA1F2";
              e.currentTarget.style.color = "#1DA1F2";
              e.currentTarget.style.background = "#F0F9FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--c-border)";
              e.currentTarget.style.color = "var(--c-text-muted)";
              e.currentTarget.style.background = "var(--c-surface)";
            }}
            aria-label="Share on Twitter"
          >
            <Twitter size={15} />
            <span className="flex-1">Twitter / X</span>
            <ChevronRight size={13} className="opacity-40" />
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border w-full no-underline transition-all duration-150"
            style={{
              background: "var(--c-surface)",
              borderColor: "var(--c-border)",
              color: "var(--c-text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#0A66C2";
              e.currentTarget.style.color = "#0A66C2";
              e.currentTarget.style.background = "#EFF6FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--c-border)";
              e.currentTarget.style.color = "var(--c-text-muted)";
              e.currentTarget.style.background = "var(--c-surface)";
            }}
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={15} />
            <span className="flex-1">LinkedIn</span>
            <ChevronRight size={13} className="opacity-40" />
          </a>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border w-full transition-all duration-150"
            style={{
              background: copied
                ? "var(--c-primary-light)"
                : "var(--c-surface)",
              borderColor: copied ? "var(--c-primary)" : "var(--c-border)",
              color: copied ? "var(--c-primary)" : "var(--c-text-muted)",
            }}
            onMouseEnter={(e) => {
              if (!copied) {
                e.currentTarget.style.borderColor = "var(--c-primary)";
                e.currentTarget.style.color = "var(--c-primary)";
                e.currentTarget.style.background = "var(--c-primary-light)";
              }
            }}
            onMouseLeave={(e) => {
              if (!copied) {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.color = "var(--c-text-muted)";
                e.currentTarget.style.background = "var(--c-surface)";
              }
            }}
            aria-label="Copy article link"
          >
            {copied ? <Check size={15} /> : <Link2 size={15} />}
            <span className="flex-1">{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── ROOT BLOG PAGE ───────────────────────────────────────────────────────────
function BlogPage() {
  const { slug } = useParams();

  const blog = blogs.find((blog) => blog.id.toString() === slug);

  console.log(slug);
  return (
    <>
      <style>{globalCSS}</style>
      <ReadingProgress />

      <div className="min-h-screen" style={{ background: "var(--c-bg)" }}>
        {/* Main */}
        <main
          className="mx-auto px-4 sm:px-6"
          style={{
            maxWidth: "1160px",
            paddingTop: "clamp(1.5rem, 4vw, 2.5rem)",
            paddingBottom: "4rem",
          }}
        >
          <BlogHeader title={blog.title} image={blog.image} />

          <div className="flex gap-10 items-start">
            {/* Article column */}
            <div className="flex-1 min-w-0">
              <BlogMeta
                author={blog.author}
                authorAvatar={blog.authorAvatar}
                date={blog.date}
                readTime={blog.readTime}
              />
              <div className="mt-7">
                <BlogContent
                  title={blog.title}
                  excerpt={blog.excerpt}
                  content={blog.content}
                />
              </div>
              {blog.image.length > 1 && <BlogImageGallery image={blog.image} />}
              <hr
                className="border-0 my-8"
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, transparent, var(--c-border), transparent)",
                }}
              />
              <BlogTags tags={blog.tags} />
              <AuthorCard
                author={blog.author}
                authorAvatar={blog.authorAvatar}
              />
              {/* <BlogComments comments={blog.comments} /> */}
            </div>

            {/* Sticky sidebar */}
            <Sidebar tags={blog.tags} category={blog.category} />
          </div>
        </main>
      </div>
    </>
  );
}

// ─── SAMPLE DATA (pure plain text — zero HTML) ────────────────────────────────
/**
 * Notice how the content field is now just a normal multiline string.
 * Writers/editors can fill this from any CMS, textarea, or API field
 * without knowing any HTML at all.
 *
 * Supported markers a writer can use naturally:
 *   ## for section headings
 *   ### for sub-headings
 *   > for pull quotes
 *   - or * for bullet points
 *   1. for numbered steps
 *   --- for a divider line
 *   blank line to start a new paragraph
 */

export default BlogPage;
