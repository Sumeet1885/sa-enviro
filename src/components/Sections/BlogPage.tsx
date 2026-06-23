
import Text from "@/components/ui/dynamic_Text";
import { useParams } from "react-router-dom";
import { blogs } from "@/constants/siteData";

import { useState, useEffect } from "react";
import {
  Twitter,
  Linkedin,
  Link2,
  Check,
  Tag,
  MessageCircle,
  Calendar,
  Bookmark,
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as NavRight,
} from "lucide-react";

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
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed top-0 left-0 h-[3px] z-[9999] rounded-r-sm bg-gradient-to-r from-[#005DE8] to-[#00A3FF] transition-[width] duration-100"
      style={{ width: `${pct}%` }}
    />
  );
}

function BlogHeader({
  title,
  image,
}: {
  title: string;
  image: string | string[];
}) {
  const heroImg = Array.isArray(image) ? image[0] : image;
  return (
    <header className="relative overflow-hidden rounded-2xl mb-10 animate-fade-in-up">
      <img
        src={heroImg}
        loading="lazy"
        alt={`Cover image for: ${title}`}
        className="w-full object-cover block"
        style={{ height: "clamp(280px, 46vw, 540px)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/50 to-foreground/90" />
    </header>
  );
}

function BlogMeta({
  author,
  authorAvatar,
  date,
}: {
  author: string;
  authorAvatar?: string;
  date: string;
  readTime?: string;
}) {
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
    <div className="animate-fade-in-up flex flex-wrap items-center gap-4 pb-6 border-b border-border">
      <div className="flex items-center gap-3">
        {authorAvatar ? (
          <img
            loading="lazy"
            src={authorAvatar}
            alt={author}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
          />
        ) : (
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br from-[#005DE8] to-[#00A3FF] shadow-soft">
            {initials}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">Author</p>
        </div>
      </div>

      <span className="text-xl hidden sm:inline text-border" aria-hidden="true">
        ·
      </span>

      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar size={14} aria-hidden="true" />
        <time dateTime={date}>{formatted}</time>
      </span>
    </div>
  );
}

function BlogContent({
  title,
  excerpt,
  content,
}: {
  title?: string;
  excerpt?: string;
  content?: any;
}) {
  return (
    <article aria-label="Blog post content">
      {title && (
        <h1 className="animate-fade-in-up font-display text-xl my-7 pl-5 font-bold leading-[1.75] text-muted-foreground border-l-4 border-[#005DE8]">
          {title}
        </h1>
      )}

      <h2 className="font-display font-bold mt-10 mb-4 pb-3 text-[1.45rem] text-foreground border-b-2 border-[#005DE8]/20">
        Purpose
      </h2>

      <p
        className="font-bold leading-loose mt-4 text-muted-foreground"
        style={{ lineHeight: "1.9" }}
      >
        {excerpt}
      </p>

      <h2 className="font-display font-bold mt-10 mb-4 pb-3 text-[1.45rem] text-foreground border-b-2 border-[#005DE8]/20">
        Content
      </h2>

      <Text extraContent={content} />
    </article>
  );
}

function BlogImageGallery({ image }: { image: string | string[] }) {
  const images = Array.isArray(image) ? image.slice(1) : [];
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, images.length]);

  if (images.length === 0) return null;

  return (
    <section aria-label="Image gallery" className="my-10">
      <h2 className="font-display font-semibold mb-5 flex items-center gap-2 text-[1.15rem] text-foreground">
        <Bookmark size={18} className="text-[#005DE8]" />
        Photo Gallery
        <span className="text-sm font-normal ml-1 text-muted-foreground">
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
            className="group relative overflow-hidden rounded-xl border border-border bg-background block w-full text-left shadow-soft cursor-zoom-in"
            style={{ aspectRatio: "16 / 10" }}
            aria-label={`Open image ${i + 2} in viewer`}
          >
            <img
              src={src}
              alt={`Gallery image ${i + 2}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 flex items-end justify-start p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-foreground/70 to-transparent">
              <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/25">
                <Bookmark size={11} /> View full size
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md"
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
              loading="lazy"
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
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-white bg-primary hover:scale-110 transition-transform"
              aria-label="Close viewer"
            >
              <X size={16} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setLightbox(
                      (i) => ((i ?? 0) - 1 + images.length) % images.length,
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 border border-white/20 hover:scale-110 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() =>
                    setLightbox((i) => ((i ?? 0) + 1) % images.length)
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 border border-white/20 hover:scale-110 transition-all"
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

function BlogTags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <section aria-label="Post tags" className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-medium mr-1 text-muted-foreground">
          <Tag size={13} /> Tags:
        </span>
        {tags.map((tag) => (
          <span
            key={tag}
            role="listitem"
            className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-full border border-[#005DE8]/20 bg-[#005DE8]/5 text-[#005DE8] cursor-default transition-all duration-150 hover:-translate-y-0.5"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function CommentCard({ comment }: { comment: any }) {
  const initials = comment.name
    .split(" ")
    .map((n: string) => n[0])
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
      className="flex gap-4 p-5 rounded-xl border border-border bg-card shadow-soft hover:shadow-water transition-shadow duration-200 list-none"
      aria-label={`Comment by ${comment.name}`}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br from-[#005DE8] to-[#00A3FF]"
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between flex-wrap gap-1 mb-2">
          <span className="font-semibold text-sm text-foreground">
            {comment.name}
          </span>
          <time
            dateTime={comment.date}
            className="text-xs text-muted-foreground"
          >
            {date}
          </time>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {comment.message}
        </p>
      </div>
    </li>
  );
}

function CommentForm() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10">
        <Check size={18} className="text-primary" />
        <p className="text-sm font-semibold text-primary">
          Thanks! Your comment will appear after moderation.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full px-4 py-2.5 text-sm rounded-lg border border-border bg-card text-foreground font-sans transition-all duration-150 focus:outline-none focus:border-[#005DE8] focus:ring-2 focus:ring-[#005DE8]/20";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="c-name"
          className="block text-xs font-medium mb-1.5 text-muted-foreground"
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
          className={fieldClass}
        />
      </div>
      <div>
        <label
          htmlFor="c-msg"
          className="block text-xs font-medium mb-1.5 text-muted-foreground"
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
          className={`${fieldClass} resize-y`}
        />
      </div>
      <button
        onClick={() => {
          if (name.trim() && msg.trim()) setDone(true);
        }}
        className="self-start text-sm font-medium px-5 py-2.5 rounded-lg text-white bg-[#005DE8] shadow-water hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
      >
        Post Comment
      </button>
    </div>
  );
}

function BlogComments({ comments }: { comments: any[] }) {
  return (
    <section aria-label="Comments section" className="mt-12">
      <h2 className="font-display font-bold text-2xl mb-6 flex items-center gap-2.5 text-foreground">
        <MessageCircle size={22} className="text-primary" />
        {comments.length} Comment{comments.length !== 1 ? "s" : ""}
      </h2>
      {comments.length > 0 && (
        <ul className="flex flex-col gap-3 mb-8 pl-0">
          {comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))}
        </ul>
      )}
      <div className="rounded-xl border border-border bg-card shadow-soft p-6">
        <h3 className="font-display font-bold text-lg mb-5 text-foreground">
          Leave a Comment
        </h3>
        <CommentForm />
      </div>
    </section>
  );
}

function AuthorCard({
  author,
  authorAvatar,
}: {
  author: string;
  authorAvatar?: string;
}) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mt-10 rounded-2xl p-6 flex gap-5 items-center flex-wrap bg-[#005DE8]/5 border border-[#005DE8]/20 animate-fade-in-up">
      {authorAvatar ? (
        <img
          src={authorAvatar}
          alt={author}
          loading="lazy"
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 ring-[3px] ring-white shadow-water"
        />
      ) : (
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 bg-gradient-to-br from-[#005DE8] to-[#00A3FF] shadow-water">
          {initials}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5 text-[#005DE8]">
          Written by
        </p>
        <p className="font-display font-bold text-xl text-foreground">
          {author}
        </p>
        <p className="text-sm mt-1 text-muted-foreground">
          Passionate writer & industry expert sharing insights on the latest
          trends and innovations.
        </p>
      </div>
    </div>
  );
}

function Sidebar({ tags, category }: { tags: string[]; category: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const enc =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.href)
      : "";
  const tweetUrl = `https://twitter.com/intent/tweet?url=${enc}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`;

  const cardClass = "rounded-xl border border-border bg-card shadow-soft p-5";

  return (
    <aside
      aria-label="Sidebar"
      className="hidden lg:flex flex-col gap-5 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        top: "2.5rem",
        width: "272px",
        flexShrink: 0,
        position: "sticky",
      }}
    >
      {category && (
        <div className={cardClass}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-muted-foreground">
            Category
          </p>
          <span className="inline-flex items-center text-xs font-semibold tracking-widest uppercase px-3.5 py-1.5 rounded-full text-white bg-[#005DE8]">
            {category}
          </span>
        </div>
      )}

      {tags.length > 0 && (
        <div className={cardClass}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-muted-foreground">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full border border-[#005DE8]/20 bg-[#005DE8]/5 text-[#005DE8] cursor-default transition-all duration-150 hover:-translate-y-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={cardClass}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">
          Share Article
        </p>
        <div className="flex flex-col gap-2.5">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground no-underline transition-all duration-150 hover:border-[#1DA1F2] hover:text-[#1DA1F2] hover:bg-sky-50 group"
            aria-label="Share on Twitter"
          >
            <Twitter size={15} />
            <span className="flex-1">Twitter / X</span>
            <ChevronRight size={13} className="opacity-40" />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border border-border bg-card text-muted-foreground no-underline transition-all duration-150 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-blue-50 group"
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={15} />
            <span className="flex-1">LinkedIn</span>
            <ChevronRight size={13} className="opacity-40" />
          </a>

          <button
            onClick={copyLink}
            className={`flex items-center gap-2.5 text-sm font-medium px-4 py-2.5 rounded-lg border w-full transition-all duration-150 ${copied
                ? "bg-[#005DE8]/10 border-[#005DE8] text-[#005DE8]"
                : "bg-card border-border text-muted-foreground hover:border-[#005DE8] hover:text-[#005DE8] hover:bg-[#005DE8]/10"
              }`}
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

function BlogPage() {
  const { slug } = useParams();
  const blog = blogs.find((blog: any) => blog.key.toString() === slug);

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-background">
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

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

              <BlogTags tags={blog.tags} />
              <AuthorCard
                author={blog.author}
                authorAvatar={blog.authorAvatar}
              />
            </div>

            <Sidebar tags={blog.tags} category={blog.category} />
          </div>
        </main>
      </div>
    </>
  );
}

export default BlogPage;
