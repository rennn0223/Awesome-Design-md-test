"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Lang } from "@/app/providers";

export type Project = {
  slug: string;
  image: string;
  tags: string[];
  category: string;
  en: { title: string; desc: string; summary: string[]; body: string[]; meta?: string };
  zh: { title: string; desc: string; summary: string[]; body: string[]; meta?: string };
  pdf?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "ackermann-digital-twin",
    image: "/assets/signiture.jpeg",
    tags: ["DIGITAL-TWIN", "OMNIVERSE", "EDGE-AI"],
    category: "DIGITAL-TWIN",
    en: {
      title: "GTC 2026: Ackermann DT",
      desc: "Real-time Digital Twin for campus inspection — exhibited at DGX Spark with sub-millisecond sync.",
      summary: [
        "Lead Architect for the Campus Inspection System using NVIDIA Omniverse and USD.",
        "Deployed on DGX Spark at the MSI Innovation Center booth during GTC 2026.",
        "Achieved sub-millisecond synchronization between physical sensors and virtual environment.",
        "Personally recognized by CEO Jensen Huang for the real-time demo.",
      ],
      body: [
        "The Ackermann Digital Twin project represents the convergence of digital twin technology, edge AI, and real-time simulation. As Lead Architect, I designed the system to mirror a physical campus environment in real-time.",
        "The architecture leverages NVIDIA Omniverse's USD-based scene graph, ROS2 sensor fusion (LiDAR, IMU, camera), and a custom WebSocket sync protocol optimized for Omniverse's streaming API.",
        "The system was exhibited at the DGX Spark booth during GTC 2026, demonstrating live sensor-driven digital twin synchronization — the first time such a system was shown on DGX Spark hardware.",
        "The project earned personal recognition from NVIDIA CEO Jensen Huang during the MSI Innovation Center demo.",
      ],
      meta: "Lead Architect · Omniverse · DGX Spark · ROS2",
    },
    zh: {
      title: "GTC 2026：阿克曼數位孿生",
      desc: "校園巡檢即時數位孿生——於 DGX Spark 展出，亞毫秒級同步。",
      summary: [
        "使用 NVIDIA Omniverse 和 USD 建構校園巡檢系統的首席架構師。",
        "於 GTC 2026 期間在微星創新前瞻中心 DGX Spark 攤位部署。",
        "達成實體感測器與虛擬環境之間的亞毫秒級同步。",
        "專案榮獲執行長黃仁勳親筆肯定。",
      ],
      body: [
        "阿克曼數位孿生專案代表了數位孿生技術、邊緣 AI 與即時模擬的匯聚。作為首席架構師，我設計了這個系統來即時映照實體校園環境。",
        "架構採用 NVIDIA Omniverse 的 USD 場景圖、ROS2 感測器融合（LiDAR、IMU、相機），以及針對 Omniverse 串流 API 最佳化的客製化 WebSocket 同步協定。",
        "該系統於 GTC 2026 微星創新前瞻中心攤位的 DGX Spark 上展出，展示了即時感測器驅動的數位孿生同步——這是該系統首次於 DGX Spark 硬體上展示。",
        "專案在微星創新前瞻中心展示時榮獲執行長黃仁勳親筆肯定。",
      ],
      meta: "首席架構師 · Omniverse · DGX Spark · ROS2",
    },
    pdf: "/assets/gtc2026.pdf",
  },
  {
    slug: "msi-hq-integration",
    image: "/assets/MSI.jpeg",
    tags: ["INDUSTRIAL", "OMNIVERSE", "EDGE-AI"],
    category: "INDUSTRIAL",
    en: {
      title: "MSI HQ Integration",
      desc: "Resident implementation at MSI Innovation Center. Industrial-grade Digital Twin pipelines and NemoClaw deployment.",
      summary: [
        "Embedded at MSI Headquarters to architect industrial-grade Digital Twin pipelines.",
        "Managed NVIDIA MGX Server hardware upgrades and infrastructure.",
        "Deployed NemoClaw on DGX Spark for LLM-driven automation workflows.",
        "Established Edge-AI protocols to lower the entry barrier for Omniverse developers.",
      ],
      body: [
        "The MSI HQ Integration project involved a resident implementation at the MSI Innovation Center in Zhonghe, New Taipei City. The primary objective was to architect industrial-grade Digital Twin pipelines for campus-scale inspection and monitoring.",
        "Key achievements included managing NVIDIA MGX Server hardware upgrades, deploying NemoClaw (LLM-driven automation) on DGX Spark, and establishing Edge-AI communication protocols that serve as the backbone for the digital twin infrastructure.",
        "The project also focused on developer experience — creating tooling and documentation that significantly lowered the barrier to entry for developers new to Omniverse and USD.",
      ],
      meta: "Resident Engineer · MGX · NemoClaw · Edge-AI",
    },
    zh: {
      title: "微星總部協同開發",
      desc: "進駐微星創新前瞻中心，建構工業級數位孿生流水線與 NemoClaw 部署。",
      summary: [
        "進駐微星中和總部，建構工業級數位孿生流水線。",
        "負責 NVIDIA MGX 伺服器硬體升級與基礎設施管理。",
        "於 DGX Spark 部署 NemoClaw，驅動 LLM 自動化工作流程。",
        "建立邊緣 AI 通訊協定，降低新手開發 Omniverse 的技術門檻。",
      ],
      body: [
        "微星總部協同開發專案涉及進駐微星中和創新前瞻中心。主要目標是建構校園級巡檢與監控的工業級數位孿生流水線。",
        "關鍵成果包括管理 NVIDIA MGX 伺服器硬體升級、於 DGX Spark 部署 NemoClaw（LLM 驅動自動化），以及建立作為數位孿生基礎設施骨幹的邊緣 AI 通訊協定。",
        "專案也著重開發者體驗——建立工具與文件，大幅降低新手開發者進入 Omniverse 和 USD 的門檻。",
      ],
      meta: "駐點工程師 · MGX · NemoClaw · Edge-AI",
    },
  },
  {
    slug: "bair-lab-visit",
    image: "/assets/UCBerkeley.jpeg",
    tags: ["RESEARCH", "AUTONOMOUS", "ROS2"],
    category: "RESEARCH",
    en: {
      title: "UC Berkeley BAIR Visit",
      desc: "Technical exchange at BAIR Lab — autonomous driving architecture, ROS2 sensor fusion, and Embodied AI edge computing.",
      summary: [
        "Invited to UC Berkeley's BAIR Lab post-GTC 2026 for technical exchange.",
        "Conducted in-depth architectural reviews on autonomous driving systems.",
        "Focused on ROS2 sensor fusion (LiDAR, IMU) for autonomous perception.",
        "Discussed Wasm deployment strategies for Embodied AI edge computing.",
      ],
      body: [
        "Following GTC 2026, I was invited to the Berkeley Artificial Intelligence Research (BAIR) Lab for a technical exchange on autonomous systems and embodied AI. The visit focused on three key areas:",
        "First, ROS2 sensor fusion architecture — reviewing how foundation models can be integrated with traditional sensor pipelines for robust autonomous perception. Second, sim-to-real transfer techniques for deploying digital twin-trained policies in the physical world. Third, WebAssembly (Wasm) as a deployment target for Embodied AI workloads at the edge — offering lightweight, secure, and portable execution.",
        "The exchange was mutually productive, establishing a foundation for future collaboration between our team and BAIR on autonomous system architectures.",
      ],
      meta: "BAIR Lab · ROS2 · Sim-to-Real · Wasm",
    },
    zh: {
      title: "柏克萊 BAIR 實驗室訪談",
      desc: "受邀至 BAIR 實驗室學術交流——自動駕駛架構、ROS2 感測器融合與具身智能邊緣運算。",
      summary: [
        "GTC 2026 後受邀前往 UC Berkeley BAIR 實驗室進行技術交流。",
        "針對自動駕駛系統進行深度架構審查。",
        "聚焦於 ROS2 感測器融合（LiDAR、IMU）用於自主感知。",
        "討論具身智能邊緣運算的 Wasm 部署策略。",
      ],
      body: [
        "GTC 2026 後，我受邀前往柏克萊人工智慧研究實驗室 (BAIR) 進行自主系統與具身智能的技術交流。訪問聚焦於三個關鍵領域：",
        "第一，ROS2 感測器融合架構——審查基礎模型如何與傳統感測器管線整合以實現強大的自主感知。第二，將數位孿生訓練的策略部署到實體世界的 sim-to-real 遷移技術。第三，WebAssembly (Wasm) 作為具身智能邊緣運算的部署目標——提供輕量、安全且可攜的執行環境。",
        "這次交流對雙方都有收穫，為未來我們團隊與 BAIR 在自主系統架構上的合作奠定了基礎。",
      ],
      meta: "BAIR Lab · ROS2 · Sim-to-Real · Wasm",
    },
  },
  {
    slug: "gtc-2026-conference",
    image: "/assets/GTC2026.jpeg",
    tags: ["GTC2026", "CONFERENCE", "NETWORKING"],
    category: "CONFERENCE",
    en: {
      title: "GTC 2026 Conference",
      desc: "Attended NVIDIA GTC 2026 — keynotes, MSI DGX Spark booth, and BAIR Lab visit.",
      summary: [
        "Attended NVIDIA GTC 2026, experiencing AI and accelerated computing breakthroughs.",
        "Exhibited the Ackermann Digital Twin project at the MSI DGX Spark booth.",
        "Networked with NVIDIA engineers, researchers, and industry leaders.",
        "Post-conference: Invited to UC Berkeley BAIR Lab for technical exchange.",
      ],
      body: [
        "GTC 2026 was a pivotal event. Beyond attending keynotes and technical sessions, I had the opportunity to exhibit our team's work at the MSI Innovation Center booth — a real-time Digital Twin demo running on DGX Spark.",
        "The conference reinforced NVIDIA's vision of a comprehensive AI infrastructure stack, from silicon to simulation. The convergence of foundation models, Omniverse, and edge AI is accelerating faster than expected.",
        "Post-GTC, the BAIR Lab visit extended the experience into academic collaboration — discussing autonomous driving architectures, sensor fusion, and Embodied AI deployment strategies.",
      ],
      meta: "GTC 2026 · MSI Innovation Center · DGX Spark · BAIR",
    },
    zh: {
      title: "GTC 2026 大會參會記錄",
      desc: "參加 NVIDIA GTC 2026——主題演講、微星 DGX Spark 攤位與 BAIR 實驗室訪談。",
      summary: [
        "參加 NVIDIA GTC 2026，體驗 AI 與加速運算的最新突破。",
        "於微星 DGX Spark 攤位展出阿克曼數位孿生專案。",
        "與 NVIDIA 工程師、研究人員與產業領袖交流。",
        "展後：受邀前往 UC Berkeley BAIR 實驗室進行技術交流。",
      ],
      body: [
        "GTC 2026 是一個關鍵事件。除了參加主題演講和技術研討會外，我有機會在微星創新前瞻中心攤位展示我們團隊的作品——一台運行於 DGX Spark 上的即時數位孿生演示。",
        "大會強化了 NVIDIA 對全面 AI 基礎設施堆疊的願景，從矽到模擬。基礎模型、Omniverse 和邊緣 AI 的融合加速速度超出預期。",
        "展後的 BAIR 實驗室訪問將這次體驗延伸到學術合作——討論自動駕駛架構、感測器融合與具身智能部署策略。",
      ],
      meta: "GTC 2026 · 微星創新前瞻中心 · DGX Spark · BAIR",
    },
  },
];

export function getAllProjectTags(): string[] {
  const set = new Set<string>();
  PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getAllProjectCategories(): string[] {
  const cats: string[] = [];
  PROJECTS.forEach((p) => { if (!cats.includes(p.category)) cats.push(p.category); });
  return cats.sort();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/* -- Project Card -- */
function ProjectCard({
  project,
  lang,
  index,
  onClick,
}: {
  project: Project;
  lang: Lang;
  index: number;
  onClick: (project: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? project.en : project.zh;
  const isEn = lang === "en";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative cursor-pointer group"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
      aria-label={content.title}
    >
      <div className="bg-canvas text-ink border border-hairline rounded-sm flex flex-col feature-card group-hover:border-primary/40 transition-colors">
        {/* Corner square accent */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />

        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-tag text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          {/* Category indicator */}
          <div className="absolute bottom-3 right-3">
            <span className="w-8 h-8 flex items-center justify-center bg-surface-dark/80 text-primary text-xs font-bold rounded-none">
              {content.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          {/* Meta line */}
          {content.meta && (
            <div className="text-caption-xs text-primary/70 mb-2 tracking-wider uppercase font-bold">
              {content.meta}
            </div>
          )}

          <h3 className="text-heading-md text-ink mb-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <p className="text-body-sm text-body leading-relaxed flex-1">{content.desc}</p>

          {/* Action indicator */}
          <div className="mt-4 flex items-center gap-2 text-primary text-button-sm font-bold">
            <span>{isEn ? "VIEW DETAILS" : "查看詳情"}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -- Project Detail Modal -- */
function ProjectModal({
  project,
  lang,
  onClose,
}: {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}) {
  const content = lang === "en" ? project?.en : project?.zh;
  const isEn = lang === "en";

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-canvas rounded-sm border border-hairline overflow-hidden"
        initial={{ scale: 0.97, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline shrink-0 bg-canvas">
          <div>
            <span className="text-utility-xs text-primary tracking-wider font-bold">{project.category}</span>
            <h3 className="text-heading-xl text-ink mt-1">{content?.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-mute hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Image */}
          {project.image && (
            <div className="relative h-56 overflow-hidden mb-6 rounded-sm">
              <img src={project.image} alt={content?.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Summary list */}
          {content?.summary && (
            <div className="mb-6">
              <h4 className="text-heading-sm text-ink mb-3">{isEn ? "KEY POINTS" : "重點"}</h4>
              <ul className="space-y-2">
                {content.summary.map((s, i) => (
                  <li key={i} className="flex gap-3 text-body-sm text-body">
                    <span className="text-primary mt-1.5 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8">
                        <rect width="8" height="8" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed body */}
          {content?.body && content.body.map((paragraph, i) => (
            <p key={i} className="text-body-md text-body leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          {/* PDF link */}
          {project.pdf && (
            <div className="mt-6 pt-4 border-t border-hairline">
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline inline-flex"
              >
                {isEn ? "VIEW PDF DOCUMENT" : "查看 PDF 文件"}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -- Default export: Projects section -- */
export default function Projects({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTag, setActiveTag] = useState<string>("ALL");
  const isEn = lang === "en";

  const allTags = getAllProjectTags();
  const filtered = activeTag === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <>
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
              className="text-display-lg text-on-dark text-center mb-4"
            >
              {lang === "en" ? "TECHNICAL PROJECTS" : "技術專案實錄"}
            </motion.h2>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setActiveTag("ALL")}
                className={`pill-tab ${activeTag === "ALL" ? "pill-tab-active" : ""}`}
              >
                {isEn ? "ALL" : "全部"}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`pill-tab ${activeTag === tag ? "pill-tab-active" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag}
                className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} lang={lang} index={i} onClick={setSelected} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-on-dark-mute text-body-md">
                {isEn ? "No projects for this filter." : "此篩選條件尚無專案。"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} lang={lang} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
