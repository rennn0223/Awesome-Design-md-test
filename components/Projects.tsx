"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";

const PROJECTS = [
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

function TiltCard({
  project,
  lang,
  index,
}: {
  project: (typeof PROJECTS)[0];
  lang: Lang;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });
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
      ref={containerRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.15, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass rounded-2xl overflow-hidden flex flex-col h-full group"
      >
        {/* Spotlight glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(59,130,246,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden h-56 shrink-0">
          <img
            src={project.image}
            alt={content.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/20 to-transparent" />
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-primary border border-primary/30 bg-primary/10 backdrop-blur-sm px-2 py-0.5 rounded"
              >
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

          <button
            onClick={() => setExpanded(!expanded)}
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

export default function Projects({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="projects" {...props} className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.04),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-1px] sm:tracking-[-3px] uppercase text-center mb-20"
        >
          {lang === "en" ? "MISSION_GALLERY" : "技術專案實錄"}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} project={p} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
