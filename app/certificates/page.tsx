"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";

type CertType = "link" | "preview";

interface Cert {
  category: string;
  tag: string;
  tagColor: string;
  title: string;
  en: string;
  zh: string;
  href?: string;
  image?: string;
  btnEn: string;
  btnZh: string;
  type: CertType;
}

const CERTS: Cert[] = [
  {
    category: "NVIDIA_DLI",
    tag: "NVIDIA_DLI",
    tagColor: "#3b82f6",
    title: "Isaac for Accelerated Robotics",
    en: "Official certification for deploying AI robotics workflows using NVIDIA Isaac.",
    zh: "NVIDIA 官方認證，掌握使用 Isaac 部署 AI 機器人工作流之核心能力。",
    href: "https://learn.nvidia.com/certificates?id=AOuaSDlrRjSNIw37SgD1VQ",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    category: "NVIDIA_DLI",
    tag: "NVIDIA_DLI",
    tagColor: "#3b82f6",
    title: "OpenUSD: Stages, Prims & Attributes",
    en: "Mastery of Universal Scene Description for Omniverse Digital Twin environments.",
    zh: "精通通用場景描述 (USD)，用於建構 Omniverse 數位孿生底層環境。",
    href: "https://learn.nvidia.com/certificates?id=1DHB-ztRROWGqdjyu6qqTQ",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    category: "NVIDIA_DLI",
    tag: "NVIDIA_DLI",
    tagColor: "#3b82f6",
    title: "AI on Jetson Nano",
    en: "Deployment of deep learning models on Edge AI hardware architectures.",
    zh: "具備在 Edge AI 邊緣硬體架構上部署深度學習模型之能力。",
    href: "https://learn.nvidia.com/certificates?id=EN5-FdNJT_KR9akW3bacrg",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    category: "LANGUAGE",
    tag: "LANGUAGE_PRO",
    tagColor: "#f59e0b",
    title: "Duolingo English Test",
    en: "Certified English proficiency for international technical communication.",
    zh: "國際英語能力認證，具備流暢的跨國技術溝通能力。",
    href: "https://certs.duolingo.com/tlegwwbno75h9itb",
    btnEn: "> VIEW_SCORE_REPORT",
    btnZh: "> 查看成績證明",
    type: "link",
  },
  {
    category: "HARDWARE",
    tag: "HARDWARE_OP",
    tagColor: "#10b981",
    title: "DJI Drone Professional Training",
    en: "Certified operational proficiency for commercial UAV deployment.",
    zh: "大疆專業無人機操作培訓，具備商用無人機部署與操作能力。",
    image: "/assets/dji_cert.pdf",
    btnEn: "[ ] PREVIEW_DOCUMENT",
    btnZh: "[ ] 預覽授權文件",
    type: "preview",
  },
];

const CATEGORIES = ["ALL", "NVIDIA_DLI", "LANGUAGE", "HARDWARE"];

function CertCard({
  cert,
  lang,
  index,
  onPreview,
}: {
  cert: Cert;
  lang: "en" | "zh";
  index: number;
  onPreview: (src: string) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(59,130,246,0.15)" }}
      className="glass rounded-xl p-6 flex flex-col gap-4 cursor-default group"
      style={{ borderLeft: `3px solid ${cert.tagColor}25` }}
    >
      <div
        className="font-mono text-[10px] px-2 py-1 rounded w-fit border"
        style={{
          color: cert.tagColor,
          borderColor: `${cert.tagColor}35`,
          background: `${cert.tagColor}10`,
        }}
      >
        {cert.tag}
      </div>

      <h3 className="text-lg font-black text-white leading-snug">{cert.title}</h3>

      <p className="text-white/35 text-sm leading-relaxed flex-1">
        {lang === "en" ? cert.en : cert.zh}
      </p>

      {cert.type === "link" ? (
        <a
          href={cert.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-primary border border-primary/25 px-4 py-2.5 rounded text-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
        >
          {lang === "en" ? cert.btnEn : cert.btnZh}
        </a>
      ) : (
        <button
          onClick={() => cert.image && onPreview(cert.image)}
          className="font-mono text-[11px] text-primary border border-primary/25 px-4 py-2.5 rounded text-center hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
        >
          {lang === "en" ? cert.btnEn : cert.btnZh}
        </button>
      )}
    </motion.div>
  );
}

export default function CertificatesPage() {
  const { lang, setLang } = useLang();
  const isEn = lang === "en";
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [preview, setPreview] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filtered = activeCategory === "ALL"
    ? CERTS
    : CERTS.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(59,130,246,0.04),transparent)]">
      <Cursor />
      <Nav lang={lang} setLang={setLang} />

      <section className="pt-32 pb-32 px-6 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.015] whitespace-nowrap leading-none tracking-[-0.05em]">
            CERTIFICATES
          </span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-1px] sm:tracking-[-3px] uppercase text-center mb-6 text-white/90"
          >
            {isEn ? "SYSTEM_CERTIFICATES" : "專業認證與授權"}
          </motion.h2>
          <p className="text-center text-white/30 text-sm font-mono mb-8 tracking-widest">
            {isEn ? "VERIFIED_CREDENTIALS" : "已驗證資格"}
          </p>

          {/* Category filter */}
          <div className="flex justify-center gap-3 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-[10px] px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-primary border-primary/40 bg-primary/10"
                    : "text-white/30 border-white/10 hover:text-white/60 hover:border-white/30"
                }`}
              >
                {cat === "ALL" ? (isEn ? "ALL" : "全部") : cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <CertCard key={c.title} cert={c} lang={lang} index={i} onPreview={setPreview} />
            ))}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/88 backdrop-blur-xl z-[9999] flex items-center justify-center p-4"
              onClick={() => setPreview(null)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setPreview(null)}
                  className="absolute -top-4 -right-4 w-9 h-9 bg-primary rounded-full text-white font-bold flex items-center justify-center z-10 text-lg leading-none"
                  style={{ boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
                >
                  ×
                </button>
                {preview.endsWith(".pdf") ? (
                  <embed
                    src={preview}
                    type="application/pdf"
                    className="w-full rounded-xl"
                    style={{ height: "70vh", border: "2px solid rgba(59,130,246,0.4)", boxShadow: "0 0 50px rgba(59,130,246,0.25)" }}
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Certificate preview"
                    className="w-full rounded-xl"
                    style={{ border: "2px solid rgba(59,130,246,0.4)", boxShadow: "0 0 50px rgba(59,130,246,0.25)" }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
