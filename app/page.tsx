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
  },
  {
    href: "/timeline",
    labelEn: "TIMELINE",
    labelZh: "時間軸",
    descEn: "Experience timeline from lab entry to GTC 2026 and beyond.",
    descZh: "從進入實驗室到 GTC 2026 的經歷時間軸。",
  },
  {
    href: "/blog",
    labelEn: "BLOG",
    labelZh: "部落格",
    descEn: "Technical reflections on infrastructure, robotics, and AI.",
    descZh: "關於基礎設施、機器人和 AI 的技術反思。",
  },
  {
    href: "/certificates",
    labelEn: "CERTIFICATES",
    labelZh: "認證",
    descEn: "Professional certifications — NVIDIA DLI, language, and more.",
    descZh: "專業認證——NVIDIA DLI、語言及其他。",
  },
  {
    href: "/contact",
    labelEn: "CONTACT",
    labelZh: "聯絡",
    descEn: "Email, social links, and digital business card.",
    descZh: "郵件、社群連結與數位名片。",
  },
];

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
      className="resource-card relative overflow-hidden flex flex-col"
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
      <p className="text-body-sm text-body flex-1 mb-4">{content.excerpt}</p>
      <Link href={`/blog/${post.slug}`} className="button-ghost-link text-button-md mt-auto">
        {isEn ? "READ MORE" : "閱讀更多"}
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
      <section className="px-6 bg-canvas" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
        <div className="max-w-content mx-auto">
          <div className="mb-8">
            {/* Corner square + eyebrow below */}
            <div className="w-3 h-3 bg-primary mb-2" />
            <span className="text-[14px] font-bold text-primary uppercase">{isEn ? "NAVIGATION" : "導覽"}</span>
          </div>
          <h2 className="text-[36px] font-bold text-ink mb-8">{isEn ? "EXPLORE WORK" : "探索作品"}</h2>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group">
                <div className="resource-card relative overflow-hidden flex flex-col h-full" style={{ minWidth: "280px" }}>
                  <h3 className="text-[20px] font-bold text-ink mb-2 group-hover:text-primary transition-colors" style={{ lineHeight: "1.25" }}>
                    {isEn ? link.labelEn : link.labelZh}
                  </h3>
                  <p className="text-[15px] font-normal text-body flex-1 leading-relaxed" style={{ lineHeight: "1.67" }}>{isEn ? link.descEn : link.descZh}</p>
                  <div className="text-[16px] font-bold text-primary mt-2">{isEn ? "EXPLORE →" : "探索 →"}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -- Blog Preview (white body section) -- */}
      <section className="px-6 bg-surface-soft" style={{ paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="max-w-content mx-auto">
          <motion.h2
            ref={blogTitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={blogInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[36px] font-bold text-ink mb-3"
          >
            {isEn ? "FROM THE BLOG" : "部落格精選"}
          </motion.h2>
          {/* Corner square accent below heading */}
          <div className="mb-6">
            <div className="w-3 h-3 bg-primary" />
          </div>

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
