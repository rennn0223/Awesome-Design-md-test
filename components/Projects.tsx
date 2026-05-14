"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";

const PROJECTS = [
  {
    image: "/assets/GTC2026.jpeg",
    tags: ["GTC2026", "ATTENDEE"],
    en: { title: "GTC 2026 Conference", desc: "Attended NVIDIA GTC 2026 conference. Features keynote presentations and technical sessions.", more: "Attended NVIDIA GTC 2026 conference, experiencing the latest breakthroughs in AI, accelerated computing, and Omniverse. Networked with industry leaders and fellow developers. Poster and full documentation available for review." },
    zh: { title: "GTC 2026 大會參會記錄", desc: "參加 NVIDIA GTC 2026 大會，記錄關鍵主題演講與技術研討會。", more: "親身參與 NVIDIA GTC 2026 大會，體驗 AI 與加速運算的最新突破，以及 Omniverse 的發展。與產業領袖及開發者交流，收穫豐碩。海報與完整文件可點擊查看。" },
    pdf: "/assets/gtc2026.pdf",
  },
  {
    image: "/assets/signiture.jpeg",
    tags: ["NVIDIA_GTC", "SIGNATURE"],
    en: {
      title: "GTC 2026: Ackermann DT",
      desc: "Exhibited at DGX Spark. Features real-time Alpamayo sync logic.",
      more: "Lead Architect for the Campus Inspection System. Developed a real-time Digital Twin environment for autonomous monitoring using Omniverse. Collaborated with MSI to deploy on DGX Spark, ensuring sub-millisecond synchronization. Personally recognized by CEO Jensen Huang.",
    },
    zh: {
      title: "GTC 2026：阿克曼數位孿生",
      desc: "於 DGX Spark 攤位展出。整合 Alpamayo 實時同步邏輯。",
      more: "擔任校園巡檢系統首席架構師。使用 Omniverse 開發用於自主監控的即時數位孿生環境。與微星團隊合作部署於 DGX Spark，確保亞毫秒級的虛實同步，專案榮獲執行長黃仁勳親筆肯定。",
    },
  },
  {
    image: "/assets/UCBerkeley.jpeg",
    tags: ["RESEARCH", "AUTONOMOUS"],
    en: {
      title: "UC Berkeley BAIR Visit",
      desc: "Technical discussion at the BAIR Lab regarding autonomous architectures.",
      more: "Invited to the Berkeley Artificial Intelligence Research (BAIR) Lab post-GTC 2026. Conducted in-depth architectural reviews on autonomous driving systems, focusing on ROS2 sensor fusion (LiDAR, IMU) and Wasm deployment for Embodied AI edge computing.",
    },
    zh: {
      title: "柏克萊 AI 自駕中心",
      desc: "受邀至 UC Berkeley BAIR 實驗室，針對自動駕駛架構進行學術交流。",
      more: "GTC 展後受邀前往加州柏克萊大學人工智慧研究實驗室 (BAIR)。針對自動駕駛系統進行深度架構審查，重點討論 ROS2 多感測器融合 (LiDAR, IMU) 以及具身智能在邊緣運算上的 Wasm 部署策略。",
    },
  },
  {
    image: "/assets/MSI.jpeg",
    tags: ["INDUSTRIAL", "OMNIVERSE"],
    en: {
      title: "MSI HQ Integration",
      desc: "Resident implementation at MSI Innovation Center. Developed Omniverse environments.",
      more: "Embedded at MSI Headquarters to architect industrial-grade Digital Twin pipelines. Managed NVIDIA MGX Server hardware upgrades, deployed NemoClaw on DGX Spark for LLM-driven automation, and established Edge-AI protocols to lower the entry barrier for developers.",
    },
    zh: {
      title: "微星總部協同開發",
      desc: "進駐微星創新前瞻中心，實作 Omniverse 校園巡檢系統。",
      more: "進駐微星中和總部，建構工業級數位孿生流水線。負責 NVIDIA MGX 伺服器硬體升級，並於 DGX Spark 部署 NemoClaw 藉由 LLM 驅動自動化。建立邊緣 AI 通訊協定，大幅降低新手開發 Omniverse 的技術門檻。",
    },
  },
];

function ProjectCard({
  project,
  lang,
  index,
}: {
  project: (typeof PROJECTS)[0] & { pdf?: string };
  lang: Lang;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? project.en : project.zh;
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative"
    >
      {/* Card container - using feature-card or product-card based on content */}
      <div className="bg-canvas text-ink border border-hairline rounded-sm flex flex-col min-h-96 feature-card">
        {/* Corner square accent */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />

        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={content.title}
            className="w-full h-full object-cover"
          />
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="badge-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          <h3 className="text-heading-md text-ink mb-2">{content.title}</h3>
          <p className="text-body-md text-ink mb-4">{content.desc}</p>

          {/* Button section */}
          <div className="mt-auto flex flex-wrap gap-2">
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline"
              >
                {lang === "en" ? "VIEW PDF" : "查看 PDF"}
              </a>
            )}
            <button
              type="button"
              className={detailsOpen ? "button-primary-active" : "button-primary"}
              onClick={() => setDetailsOpen((o) => !o)}
              aria-expanded={detailsOpen}
            >
              {detailsOpen
                ? lang === "en"
                  ? "HIDE DETAILS"
                  : "收合詳情"
                : lang === "en"
                  ? "VIEW DETAILS"
                  : "查看詳情"}
            </button>
          </div>

          {detailsOpen && (
            <div className="mt-4 pt-4 border-t border-hairline text-body-md text-ink leading-relaxed">
              {content.more}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="projects" {...props} className="relative">
      {/* Section padding */}
      <div className="pt-[64px] pb-[64px] px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-on-dark text-center mb-8"
          >
            {lang === "en" ? "TECHNICAL PROJECTS" : "技術專案實錄"}
          </motion.h2>

          {/* Projects grid */}
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={i} project={p} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
