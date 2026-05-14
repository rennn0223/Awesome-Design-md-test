"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import { getPostsSorted, getAllTags, type BlogPost } from "@/data/blog";
import { motion, useInView } from "framer-motion";

const ALL_TAGS = getAllTags();

function BlogPostCard({ post, lang, index }: { post: BlogPost; lang: "en" | "zh"; index: number }) {
  const isEn = lang === "en";
  const content = isEn ? post.en : post.zh;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="resource-card relative overflow-hidden flex flex-col"
    >
      {/* Corner square */}
      <div className="corner-square-accent top-0 left-0" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.map((tag) => (
          <span key={tag} className="badge-tag text-[11px]">{tag}</span>
        ))}
      </div>

      {/* Date + Read time */}
      <div className="text-caption-sm text-mute mb-2">
        {post.date} <span className="text-hairline">·</span> {post.readTime}
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="text-heading-md text-ink hover:text-primary transition-colors mb-2">
        {content.title}
      </Link>

      {/* Excerpt */}
      <p className="text-body-sm text-body leading-relaxed mb-4 flex-1">{content.excerpt}</p>

      {/* Link */}
      <Link href={`/blog/${post.slug}`} className="button-ghost-link text-button-md">
        {isEn ? "READ ARTICLE" : "閱讀文章"}
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const posts = getPostsSorted();
  const [activeTag, setActiveTag] = useState<string>("ALL");
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  const filtered = activeTag === "ALL" ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <Nav />

      {/* Combined breadcrumb + sub-nav bar */}
      <div className="bg-surface-soft border-b border-hairline" style={{ paddingTop: "64px", paddingBottom: "8px" }}>
        <div className="px-6">
          {/* Breadcrumb */}
          <div className="max-w-content mx-auto w-full flex items-center gap-2 text-[12px] text-mute pb-3">
            <Link href="/" className="text-[12px] text-body hover:text-primary transition-colors">
              {isEn ? "HOME" : "首頁"}
            </Link>
            <span className="text-mute">/</span>
            <span className="text-[12px] text-body">{isEn ? "BLOG" : "部落格"}</span>
          </div>

          {/* Sub-nav tabs */}
          <div className="max-w-content mx-auto w-full flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTag("ALL")}
              className={`pill-tab shrink-0 ${activeTag === "ALL" ? "pill-tab-active" : ""}`}
            >
              {isEn ? "ALL" : "全部"}
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`pill-tab shrink-0 ${activeTag === tag ? "pill-tab-active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog content */}
      <section className="pt-[48px] pb-[64px] px-6">
        <div className="max-w-content mx-auto">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-on-dark text-center mb-4"
          >
            {isEn ? "THOUGHTS & NOTES" : "想法與筆記"}
          </motion.h2>
          <p className="text-body-md text-on-dark-mute text-center max-w-xl mx-auto mb-10">
            {isEn
              ? "Technical reflections on digital twins, embodied AI, and infrastructure engineering."
              : "關於數位孿生、具身智能與基礎設施工程的技術反思。"}
          </p>

          {/* Posts grid */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {filtered.map((post, i) => (
              <BlogPostCard key={post.slug} post={post} lang={lang} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-on-dark-mute">
              {isEn ? "No articles for this tag yet." : "此標籤尚無文章。"}
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="cta-strip-dark text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-heading-xl mb-4">{isEn ? "INTERESTED IN COLLABORATION?" : "對合作感興趣？"}</h2>
          <Link href="/contact">
            <button className="button-primary text-button-md">{isEn ? "GET IN TOUCH" : "聯繫我"}</button>
          </Link>
        </div>
      </section>
    </>
  );
}
