"use client";
import Link from "next/link";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getPostsSorted, type BlogPost } from "@/data/blog";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const QUICK_LINKS = [
  {
    href: "/projects",
    labelEn: "PROJECTS",
    labelZh: "專案",
    descEn: "Technical project records — Digital Twins, Omniverse, and Embodied AI.",
    descZh: "技術專案實錄——數位孿生、Omniverse 與具身智能。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="1" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    href: "/timeline",
    labelEn: "TIMELINE",
    labelZh: "時間軸",
    descEn: "Experience timeline from lab entry to GTC 2026 and beyond.",
    descZh: "從進入實驗室到 GTC 2026 的經歷時間軸。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: "/blog",
    labelEn: "BLOG",
    labelZh: "部落格",
    descEn: "Technical reflections on infrastructure, robotics, and AI.",
    descZh: "關於基礎設施、機器人和 AI 的技術反思。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" /><path d="M4 8h16" /><path d="M8 4v16" />
      </svg>
    ),
  },
  {
    href: "/certificates",
    labelEn: "CERTIFICATES",
    labelZh: "認證",
    descEn: "Professional certifications — NVIDIA DLI, language, and more.",
    descZh: "專業認證——NVIDIA DLI、語言及其他。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /><line x1="9" y1="7" x2="16" y2="7" /><line x1="9" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    href: "/contact",
    labelEn: "CONTACT",
    labelZh: "聯絡",
    descEn: "Email, social links, and digital business card.",
    descZh: "郵件、社群連結與數位名片。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

function QuickLinkCard({ link, index }: { link: (typeof QUICK_LINKS)[0]; index: number }) {
  const { lang } = useLang();
  const isEn = lang === "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Link href={link.href} className="group">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="resource-card relative overflow-hidden flex flex-col h-full group-hover:border-primary/40 transition-all duration-300"
      >
        <div className="corner-square-accent top-0 left-0" />

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center text-primary/80 group-hover:text-primary transition-colors mb-4">
          {link.icon}
        </div>

        {/* Label */}
        <span className="text-caption-md text-primary font-bold mb-2">
          {isEn ? link.labelEn : link.labelZh}
        </span>

        {/* Description */}
        <p className="text-body-sm text-body leading-relaxed mb-4">{isEn ? link.descEn : link.descZh}</p>

        {/* Arrow */}
        <div className="mt-auto flex items-center gap-2 text-primary text-button-sm font-bold">
          <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">
            {isEn ? "EXPLORE" : "探索"}
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </div>
      </motion.div>
    </Link>
  );
}

function BlogPreviewCard({ post, lang, index }: { post: BlogPost; lang: "en" | "zh"; index: number }) {
  const isEn = lang === "en";
  const content = isEn ? post.en : post.zh;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="resource-card relative overflow-hidden flex flex-col group hover:border-primary/40 transition-colors duration-300"
    >
      <div className="corner-square-accent top-0 left-0" />
      <div className="flex flex-wrap gap-1.5 mb-2">
        {post.tags.slice(0, 2).map((t) => (
          <span key={t} className="badge-tag text-[11px]">{t}</span>
        ))}
      </div>
      <div className="text-caption-sm text-mute mb-2">{post.date} · {post.readTime}</div>
      <Link href={`/blog/${post.slug}`} className="text-card-title text-ink hover:text-primary transition-colors mb-2">
        {content.title}
      </Link>
      <p className="text-body-sm text-body flex-1 leading-relaxed mb-4">{content.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="button-ghost-link text-button-md mt-auto">
        {isEn ? "READ ARTICLE" : "閱讀文章"}
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const posts = getPostsSorted().slice(0, 3);
  const blogTitleRef = useRef(null);
  const blogInView = useInView(blogTitleRef, { once: true });

  return (
    <>
      <Nav />

      {/* -- Hero (black canvas chapter) -- */}
      <Hero />

      {/* -- Quick Links (white body section) -- */}
      <section className="px-6 bg-canvas" style={{ paddingTop: "40px", paddingBottom: "48px" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-6">
            {/* Corner square + eyebrow below */}
            <div className="w-3 h-3 bg-primary mb-2" />
            <span className="text-caption-md text-primary font-bold">{isEn ? "NAVIGATION" : "導覽"}</span>
          </div>
          <h2 className="text-display-lg text-ink mb-6">{isEn ? "EXPLORE WORK" : "探索作品"}</h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link, i) => (
              <QuickLinkCard key={link.href} link={link} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* -- Blog Preview (white body section) -- */}
      <section className="px-6 bg-surface-soft" style={{ paddingTop: "80px", paddingBottom: "48px" }}>
        <div className="max-w-content mx-auto">
          <motion.h2
            ref={blogTitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={blogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-ink mb-3"
          >
            {isEn ? "FROM THE BLOG" : "部落格精選"}
          </motion.h2>
          {/* Corner square accent below heading */}
          <div className="mb-4">
            <div className="w-3 h-3 bg-primary" />
          </div>
          <p className="text-body-md text-body max-w-xl mb-8">
            {isEn
              ? "Technical reflections on Digital Twin infrastructure, Embodied AI, and edge computing."
              : "關於數位孿生基礎設施、具身智能與邊緣運算的技術反思。"}
          </p>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            {posts.map((post, i) => (
              <BlogPreviewCard key={post.slug} post={post} lang={lang} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog">
              <button className="button-outline text-button-md">{isEn ? "VIEW ALL POSTS" : "查看所有文章"}</button>
            </Link>
          </div>
        </div>
      </section>

      {/* -- CTA Strip (dark chapter bridge) -- */}
      <section className="cta-strip-dark text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-heading-xl mb-4">{isEn ? "READY TO BUILD TOGETHER?" : "準備一起建構？"}</h2>
          <p className="text-body-md text-on-dark-mute max-w-xl mx-auto mb-6">
            {isEn
              ? "Open to collaborations on Digital Twin infrastructure, Embodied AI, and edge computing projects."
              : "開放數位孿生基礎設施、具身智能與邊緣運算專案的合作機會。"}
          </p>
          <Link href="/contact">
            <button className="button-primary text-button-md">{isEn ? "GET IN TOUCH" : "聯繫我"}</button>
          </Link>
        </div>
      </section>

      {/* -- Footer (black canvas chapter) -- */}
      <Footer />
    </>
  );
}
