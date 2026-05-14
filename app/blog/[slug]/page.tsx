"use client";
import { useRef } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import { getPostBySlug, getPostsSorted, type BlogPost } from "@/data/blog";
import { motion, useInView } from "framer-motion";

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-on-dark font-bold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="font-mono text-sm bg-surface-elevated px-1.5 py-0.5 text-primary rounded-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-display-lg text-on-dark mt-10 mb-4" style={{ scrollMarginTop: 80 }}>
          {renderInline(line.slice(2))}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-heading-xl text-on-dark mt-8 mb-3" style={{ scrollMarginTop: 80 }}>
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-heading-md text-on-dark mt-6 mb-2" style={{ scrollMarginTop: 80 }}>
          {renderInline(line.slice(4))}
        </h3>
      );
    }
    // List items (collect consecutive items)
    else if (line.startsWith("- ")) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(renderInline(lines[i].slice(2)));
        i++;
      }
      i--; // step back since loop will increment
      elements.push(
        <ul key={`ul-${i}`} className="ml-4 mb-4 space-y-1">
          {items.map((item, j) => (
            <li key={j} className="text-body-md text-on-dark-mute pl-2">
              {item}
            </li>
          ))}
        </ul>
      );
    } else if (!line.trim()) {
      // blank line: no-op
    } else if (line.trim()) {
      elements.push(
        <p key={i} className="text-body-md text-on-dark-mute leading-relaxed mb-4">
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function PostNavItem({ post, lang, dir }: { post: BlogPost; lang: "en" | "zh"; dir: "prev" | "next" }) {
  const isEn = lang === "en";
  const content = isEn ? post.en : post.zh;
  const arrow = dir === "prev" ? "←" : "→";
  const label = dir === "prev" ? (isEn ? "PREVIOUS" : "上一篇") : (isEn ? "NEXT" : "下一篇");

  return (
    <Link href={`/blog/${post.slug}`} className="block resource-card hover:border-primary transition-colors group">
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />
      <div className="text-utility-xs text-primary mb-2">{label}</div>
      <div className="text-card-title text-ink group-hover:text-primary transition-colors">{content.title}</div>
    </Link>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLang();
  const isEn = lang === "en";
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const content = isEn ? post.en : post.zh;
  const sorted = getPostsSorted();
  const idx = sorted.findIndex((p) => p.slug === slug);
  const prevPost = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const nextPost = idx > 0 ? sorted[idx - 1] : null;

  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <>
      <Nav />

      {/* Breadcrumb */}
      <div className="pt-16 breadcrumb-bar flex items-center px-6">
        <div className="max-w-content mx-auto w-full flex items-center gap-2 text-body-sm">
          <Link href="/" className="text-body-sm text-body hover:text-primary transition-colors">
            {isEn ? "HOME" : "首頁"}
          </Link>
          <span className="text-mute">/</span>
          <Link href="/blog" className="text-body-sm text-body hover:text-primary transition-colors">
            {isEn ? "BLOG" : "部落格"}
          </Link>
          <span className="text-mute">/</span>
          <span className="text-body truncate">{content.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="pt-[64px] pb-[64px] px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10" ref={titleRef}>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="badge-tag text-[11px]">{tag}</span>
              ))}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-display-xl sm:text-heading-xl text-on-dark mb-4"
              style={{ lineHeight: 1.3 }}
            >
              {content.title}
            </motion.h1>
            <div className="flex items-center gap-3 text-caption-sm text-on-dark-mute">
              <span>{post.date}</span>
              <span className="text-hairline">·</span>
              <span>{post.readTime} {isEn ? "read" : "閱讀"}</span>
            </div>
          </header>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="feature-card mb-10 border-l-2 border-primary"
          >
            <div className="text-caption-md text-primary mb-3">{isEn ? "KEY POINTS" : "重點摘要"}</div>
            <ol className="space-y-2">
              {content.summary.map((s, i) => (
                <li key={i} className="text-body-md text-body leading-relaxed">
                  <span className="text-primary font-bold mr-2">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Body */}
          <div className="text-on-dark mb-12">
            {renderMarkdown(content.body.join("\n"))}
          </div>

          {/* Tags footer */}
          <div className="flex flex-wrap gap-2 pb-8 border-b border-hairline">
            {post.tags.map((tag) => (
              <span key={tag} className="badge-tag text-[11px]">{tag}</span>
            ))}
          </div>

          {/* Nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {prevPost && <PostNavItem post={prevPost} lang={lang} dir="prev" />}
            {nextPost && <PostNavItem post={nextPost} lang={lang} dir="next" />}
          </div>
        </div>
      </article>

      {/* CTA strip */}
      <section className="cta-strip-dark text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-heading-xl mb-4">{isEn ? "CONNECT ABOUT THIS" : "就此主題交流"}</h2>
          <Link href="/contact">
            <button className="button-primary text-button-md">{isEn ? "GET IN TOUCH" : "聯繫我"}</button>
          </Link>
        </div>
      </section>
    </>
  );
}
