"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";

const PROJECTS = [
  {
    image: "/assets/GTC2026.jpeg",
    tags: ["GTC2026", "ATTENDEE"],
    en: {
      title: "GTC 2026 Conference",
      desc: "Attended NVIDIA GTC 2026 conference. Features keynote presentations and technical sessions.",
      more: "Attended NVIDIA GTC 2026 conference, experiencing the latest breakthroughs in AI, accelerated computing, and Omniverse. Networked with industry leaders and fellow developers. Poster and full documentation available for review.",
    },
    zh: {
      title: "GTC 2026 大會參會記錄",
      desc: "參加 NVIDIA GTC 2026 大會，記錄關鍵主題演講與技術研討會。",
      more: "親身參與 NVIDIA GTC 2026 大會，體驗 AI 與加速運算的最新突破，以及 Omniverse 的發展。與產業領袖及開發者交流，收穫豐碩。海報與完整文件可點擊查看。",
    },
    pdf: "/assets/gtc2026.pdf",
  },
  {
    image: "/assets/signiture.jpeg",
    tags: ["NVIDIA_GTC", "SIGNATURE"],
    en: { title: "GTC 2026: Ackermann DT", desc: "Exhibited at DGX Spark. Features real-time Alpamayo sync logic.", more: "Lead Architect for the Campus Inspection System. Developed a real-time Digital Twin environment for autonomous monitoring using Omniverse. Collaborated with MSI to deploy on DGX Spark, ensuring sub-millisecond synchronization. Personally recognized by CEO Jensen Huang." },
    zh: { title: "GTC 2026：阿克曼數位孿生", desc: "於 DGX Spark 攤位展出。整合 Alpamayo 實時同步邏輯。", more: "擔任校園巡檢系統首席架構師。使用 Omniverse 開發用於自主監控的即時數位孿生環境。與微星團隊合作部署於 DGX Spark，確保亞毫秒級的虛實同步，專案榮獲執行長黃仁勳親筆肯定。" },
  },
  {
    image: "/assets/UCBerkeley.jpeg",
    tags: ["RESEARCH", "AUTONOMOUS"],
    en: { title: "UC Berkeley BAIR Visit", desc: "Technical discussion at the BAIR Lab regarding autonomous architectures.", more: "Invited to the Berkeley Artificial Intelligence Research (BAIR) Lab post-GTC 2026. Conducted in-depth architectural reviews on autonomous driving systems, focusing on ROS2 sensor fusion (LiDAR, IMU) and Wasm deployment for Embodied AI edge computing." },
    zh: { title: "柏克萊 AI 自駕中心", desc: "受邀至 UC Berkeley BAIR 實驗室，針對自動駕駛架構進行學術交流。", more: "GTC 展後受邀前往加州柏克萊大學人工智慧研究實驗室 (BAIR)。針對自動駕駛系統進行深度架構審查，重點討論 ROS2 多感測器融合 (LiDAR, IMU) 以及具身智能在邊緣運算上的 Wasm 部署策略。" },
  },
  {
    image: "/assets/MSI.jpeg",
    tags: ["INDUSTRIAL", "OMNIVERSE"],
    en: { title: "MSI HQ Integration", desc: "Resident implementation at MSI Innovation Center. Developed Omniverse environments.", more: "Embedded at MSI Headquarters to architect industrial-grade Digital Twin pipelines. Managed NVIDIA MGX Server hardware upgrades, deployed NemoClaw on DGX Spark for LLM-driven automation, and established Edge-AI protocols to lower the entry barrier for developers." },
    zh: { title: "微星總部協同開發", desc: "進駐微星創新前瞻中心，實作 Omniverse 校園巡檢系統。", more: "進駐微星中和總部，建構工業級數位孿生流水線。負責 NVIDIA MGX 伺服器硬體升級，並於 DGX Spark 部署 NemoClaw 藉由 LLM 驅動自動化。建立邊緣 AI 通訊協定，大幅降低新手開發 Omniverse 的技術門檻。" },
  },
];

function TiltCard({
  project,
  lang,
  index,
}: {
  project: (typeof PROJECTS)[0];
  lang: "en" | "zh";
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const content = lang === "en" ? project.en : project.zh;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const glowX = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={() => { onLeave(); setHovered(false); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Spotlight glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(59,130,246,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden h-64 shrink-0">
          <img src={project.image} alt={content.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a2e] via-[#0a0a2e]/30 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-primary border border-primary/30 bg-primary/10 backdrop-blur-sm px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 flex-1 relative z-20">
          <h3 className="text-xl font-black text-white leading-tight">{content.title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{content.desc}</p>

          <motion.div
            animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
            initial={false}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-white/8 text-white/55 text-sm leading-relaxed">
              {content.more}
            </div>
          </motion.div>

          {project.pdf && (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-auto self-start font-mono text-[11px] text-primary border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
            >
              {lang === "en" ? "VIEW_PDF_" : "查看PDF_"}
            </a>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="mt-auto self-start font-mono text-[11px] text-primary border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
          >
            {expanded
              ? lang === "en" ? "COLLAPSE_" : "收合內容_"
              : lang === "en" ? "VIEW_MORE_" : "查看更多_"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { lang, setLang } = useLang();
  const isEn = lang === "en";
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,#0a0a2e,transparent)]">
      <Cursor />
      <Nav lang={lang} setLang={setLang} />

      <section className="pt-32 pb-32 px-6 relative overflow-hidden">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.015] whitespace-nowrap leading-none tracking-[-0.05em]">
            PROJECTS
          </span>
        </div>

        {/* Scanline overlay */}
        <div className="scanlines absolute inset-0 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-1px] sm:tracking-[-3px] uppercase text-center mb-6 text-white/90"
          >
            {isEn ? "MISSION_GALLERY" : "技術專案實錄"}
          </motion.h2>
          <p className="text-center text-white/30 text-sm font-mono mb-20 tracking-widest">
            {isEn ? "SELECTED_WORKS" : "精選作品"}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((p, i) => (
              <TiltCard key={i} project={p} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
