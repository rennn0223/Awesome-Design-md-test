"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Lang } from "@/app/providers";

type CertType = "link" | "preview";

interface Cert {
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
  icon?: React.ReactNode;
}

const ICONS: Record<string, React.ReactNode> = {
  NVIDIA_DLI: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  LANGUAGE_PRO: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  HARDWARE_OP: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="1" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

const CERTS: Cert[] = [
  {
    tag: "NVIDIA_DLI",
    tagColor: "#76b900",
    title: "Isaac for Accelerated Robotics",
    en: "Official certification for deploying AI robotics workflows using NVIDIA Isaac.",
    zh: "NVIDIA 官方認證，掌握使用 Isaac 部署 AI 機器人工作流之核心能力。",
    href: "https://learn.nvidia.com/certificates?id=AOuaSDlrRjSNIw37SgD1VQ",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    tag: "NVIDIA_DLI",
    tagColor: "#76b900",
    title: "OpenUSD: Stages, Prims & Attributes",
    en: "Mastery of Universal Scene Description for Omniverse Digital Twin environments.",
    zh: "精通通用場景描述 (USD)，用於建構 Omniverse 數位孿生底層環境。",
    href: "https://learn.nvidia.com/certificates?id=1DHB-ztRROWGqdjyu6qqTQ",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    tag: "NVIDIA_DLI",
    tagColor: "#76b900",
    title: "AI on Jetson Nano",
    en: "Deployment of deep learning models on Edge AI hardware architectures.",
    zh: "具備在 Edge AI 邊緣硬體架構上部署深度學習模型之能力。",
    href: "https://learn.nvidia.com/certificates?id=EN5-FdNJT_KR9akW3bacrg",
    btnEn: "> VERIFY_CERTIFICATE",
    btnZh: "> 官方系統驗證",
    type: "link",
  },
  {
    tag: "LANGUAGE_PRO",
    tagColor: "#89cf00",
    title: "Duolingo English Test",
    en: "Certified English proficiency for international technical communication.",
    zh: "國際英語能力認證，具備流暢的跨國技術溝通能力。",
    href: "https://certs.duolingo.com/tlegwwbno75h9itb",
    btnEn: "> VIEW_SCORE_REPORT",
    btnZh: "> 查看成績證明",
    type: "link",
  },
  {
    tag: "HARDWARE_OP",
    tagColor: "#5a8d00",
    title: "DJI Drone Professional Training",
    en: "Certified operational proficiency for commercial UAV deployment.",
    zh: "大疆專業無人機操作培訓，具備商用無人機部署與操作能力。",
    image: "/assets/dji_cert.pdf",
    btnEn: "[ ] PREVIEW_DOCUMENT",
    btnZh: "[ ] 預覽授權文件",
    type: "preview",
  },
];

function CertCard({
  cert,
  lang,
  index,
  onPreview,
}: {
  cert: Cert;
  lang: Lang;
  index: number;
  onPreview: (src: string) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEn = lang === "en";
  const icon = ICONS[cert.tag] || ICONS.NVIDIA_DLI;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative overflow-hidden group hover:border-primary/40 transition-colors duration-300"
    >
      <div className="bg-canvas text-ink border border-hairline rounded-sm resource-card">
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />

        <div className="p-6">
          {/* Tag + Icon row */}
          <div className="flex items-center gap-3 mb-4">
            <span className="shrink-0 text-primary/80 group-hover:text-primary transition-colors">
              {icon}
            </span>
            <span className="badge-tag" style={{ backgroundColor: cert.tagColor }}>
              {cert.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-card-title text-ink mb-2">{cert.title}</h3>

          {/* Description */}
          <p className="text-body-md text-ink mb-4 leading-relaxed">{lang === "en" ? cert.en : cert.zh}</p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            {cert.type === "link" ? (
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
              >
                {lang === "en" ? cert.btnEn : cert.btnZh}
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => cert.image && onPreview(cert.image)}
                  className="button-primary"
                >
                  {lang === "en" ? cert.btnEn : cert.btnZh}
                </button>
                {cert.image && (
                  <a
                    href={cert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-outline"
                  >
                    {isEn ? "OPEN PDF" : "開啟 PDF"}
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const [preview, setPreview] = useState<string | null>(null);
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const isEn = lang === "en";

  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [preview]);

  return (
    <>
      <section id="certificates" {...props} className="relative">
        <div className="pt-[64px] pb-[64px] px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-display-lg text-on-dark text-center mb-3"
            >
              {lang === "en" ? "PROFESSIONAL CERTIFICATES" : "專業認證與授權"}
            </motion.h2>
            <div className="w-12 h-px bg-primary mx-auto mb-10" />

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {CERTS.map((c, i) => (
                <CertCard key={i} cert={c} lang={lang} index={i} onPreview={setPreview} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {preview && (
          <motion.div
            key={preview}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pdf-preview-title"
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPreview(null)}
          >
            <motion.div
              className="relative flex flex-col w-full max-w-5xl h-[min(90vh,900px)] bg-canvas rounded-sm border border-hairline overflow-hidden"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-hairline shrink-0 bg-canvas">
                <span id="pdf-preview-title" className="font-mono text-xs text-body truncate pr-2">
                  {lang === "en" ? "DOCUMENT PREVIEW" : "文件預覽"}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-outline text-sm px-4 py-2"
                  >
                    {lang === "en" ? "OPEN IN NEW TAB" : "新分頁開啟"}
                  </a>
                  <button type="button" onClick={() => setPreview(null)} className="button-primary text-sm px-4 py-2">
                    {lang === "en" ? "CLOSE" : "關閉"}
                  </button>
                </div>
              </div>
              <iframe
                title={lang === "en" ? "Certificate PDF" : "證書 PDF"}
                src={preview}
                className="flex-1 w-full min-h-0 border-0 bg-surface-soft"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
