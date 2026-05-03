"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";

const EVENTS = [
  {
    date: "2025.04.30",
    en: { title: "Lab Entry & Foundation", desc: "Joined the lab. Began studies in Golf Cart control algorithms, Linux environments, MySQL, and Unity." },
    zh: { title: "進入實驗室與底層架構學習", desc: "開始進實驗室。學習高爾夫球車控制、Linux 系統、MySQL 資料庫以及 Unity 模擬環境。" },
  },
  {
    date: "2025.06.30",
    en: { title: "NVIDIA × MSI Partnership Initiated", desc: "Began collaboration project connecting NVIDIA Omniverse with MSI Innovation Center." },
    zh: { title: "NVIDIA 與微星合作案啟動", desc: "開始接洽 NVIDIA Omniverse 與 MSI 創新前瞻中心的正式合作案。" },
  },
  {
    date: "2025.08.30",
    en: { title: "ROS2 & Sensor Integration", desc: "Learned ROS2 control systems. Activated and integrated sensors including LiDAR, IMU, Cameras, and Ackermann Car architectures." },
    zh: { title: "ROS2 控制與感測器啟動", desc: "學習 ROS2 控制並開啟感測器整合，諸如 LiDAR, IMU, Camera, 以及 Ackermann Car 控制。" },
  },
  {
    date: "2025.10.30",
    en: { title: "DJI Drone Training", desc: "Participated in DJI UAV training program and received official certification." },
    zh: { title: "大疆無人機培訓課程", desc: "參加大疆無人機培訓課程並獲得參加證明。" },
  },
  {
    date: "2026.01 — 2026.02",
    en: { title: "MSI HQ Resident Implementation", desc: "Resident at MSI HQ (Zhonghe). Collaborated with Senior Manager Shi-Zhe Hung & RD Yan-Cheng Lai to develop GTC demo and research Alpamayo." },
    zh: { title: "微星中和總部協同實作", desc: "前往新北中和微星公司，與創新前瞻中心資深經理洪士哲及 RD 賴彥成協同實作 GTC 展出的 Omniverse 校園巡檢系統，並共同研究 NVIDIA Alpamayo 應用。" },
  },
  {
    date: "2026.03.05",
    en: { title: "NVIDIA DLI Certification", desc: "Obtained NVIDIA DLI: Isaac for Accelerated Robotics Certificate." },
    zh: { title: "NVIDIA DLI 專業認證", desc: "在 NVIDIA DLI 獲得 NVIDIA Isaac for Accelerated Robotics 課程通過證書。" },
  },
  {
    date: "2026.03.08 — 2026.03.21",
    en: { title: "NVIDIA GTC Exhibition & BAIR Visit", desc: "Traveled to California for NVIDIA GTC 2026. Exhibited Campus Patrol Omniverse Project at MSI DGX Spark booth. Received Jensen Huang's signature. Later invited to UC Berkeley BAIR for technical discussions." },
    zh: { title: "NVIDIA GTC 參展與 UC Berkeley 訪談", desc: "前往美國加州參加 NVIDIA GTC 2026。於微星 DGX Spark 攤位展出校園巡檢及阿克曼小車數位孿生專案，獲得黃仁勳親簽。展後受邀拜訪 UC Berkeley BAIR (AI自駕中心) 參觀及討論。" },
  },
  {
    date: "2026.03.30",
    en: { title: "MGX Infrastructure & NemoClaw Deployment", desc: "Handling MGX Server hardware upgrades, environment setup, and deploying NemoClaw on DGX Spark to lower Omniverse learning curves." },
    zh: { title: "MGX 伺服器建置與 NemoClaw 部署", desc: "處理 MGX Server 硬體升級與環境建置，並於 DGX Spark 安裝 NemoClaw，試圖解決新手難以上手 Omniverse 的問題。" },
  },
  {
    date: "2026.04.30",
    en: { title: "NemoClaw LLM Automation Framework", desc: "Configured and deployed NemoClaw LLM automation framework on DGX Spark. Implemented intelligent debugging pipelines, automated Omniverse testing workflows, and established LLM-driven DevOps protocols for digital twin development." },
    zh: { title: "NemoClaw LLM 自動化框架部署", desc: "於 DGX Spark 部署 NemoClaw LLM 自動化框架。建立智慧除錯流水線、Omniverse 自動化測試工作流，以及驅動數位孿生開發的 LLM DevOps 通訊協定。" },
  },
];

function TimelineEvent({
  event,
  lang,
  index,
}: {
  event: (typeof EVENTS)[0];
  lang: "en" | "zh";
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? event.en : event.zh;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative pl-12 pb-16 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[5px] top-2">
        <motion.div
          className="w-[18px] h-[18px] rounded-full bg-[#030303] border-2 border-primary"
          style={{ boxShadow: "0 0 14px rgba(59,130,246,0.6)" }}
        >
          <motion.div
            className="absolute inset-[3px] rounded-full bg-primary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          />
        </motion.div>
      </div>

      {/* Date */}
      <div className="font-mono text-primary text-xs font-bold mb-2 tracking-wider">{event.date}</div>

      {/* Content */}
      <motion.div
        whileHover={{ x: 6 }}
        className="glass rounded-xl p-5 cursor-default hover:shadow-[0_0_24px_rgba(59,130,246,0.1)] transition-shadow duration-300"
      >
        <h3 className="text-base font-black text-white mb-2 leading-snug">{content.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed">{content.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function TimelinePage() {
  const { lang, setLang } = useLang();
  const isEn = lang === "en";
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(59,130,246,0.05),transparent)]">
      <Cursor />
      <Nav lang={lang} setLang={setLang} />

      <section className="pt-32 pb-32 px-6 relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.015] whitespace-nowrap leading-none tracking-[-0.05em]">
            TIMELINE
          </span>
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-1px] sm:tracking-[-3px] uppercase text-center mb-6 text-white/90"
          >
            {isEn ? "SYSTEM_TIMELINE" : "精確任務時間軸"}
          </motion.h2>
          <p className="text-center text-white/30 text-sm font-mono mb-20 tracking-widest">
            {isEn ? "EXPERIENCE_PATH" : "經歷路徑"}
          </p>

          {/* Vertical line */}
          <div className="absolute left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 pointer-events-none" />

          <div>
            {EVENTS.map((e, i) => (
              <TimelineEvent key={i} event={e} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
