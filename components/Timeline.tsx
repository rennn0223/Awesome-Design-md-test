"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/page";

const EVENTS = [
  {
    date: "2026.03.30 — PRESENT",
    en: {
      title: "MGX Infrastructure & NemoClaw Deployment",
      desc: "Handling MGX Server hardware upgrades, environment setup, and deploying NemoClaw on DGX Spark to lower Omniverse learning curves.",
    },
    zh: {
      title: "MGX 伺服器建置與 NemoClaw 部署",
      desc: "處理 MGX Server 硬體升級與環境建置，並於 DGX Spark 安裝 NemoClaw，試圖解決新手難以上手 Omniverse 的問題。",
    },
  },
  {
    date: "2026.03.08 — 2026.03.21",
    en: {
      title: "NVIDIA GTC Exhibition & BAIR Visit",
      desc: "Traveled to California for NVIDIA GTC 2026. Exhibited Campus Patrol Omniverse Project at MSI DGX Spark booth. Received Jensen Huang's signature. Later invited to UC Berkeley BAIR for technical discussions.",
    },
    zh: {
      title: "NVIDIA GTC 參展與 UC Berkeley 訪談",
      desc: "前往美國加州參加 NVIDIA GTC 2026。於微星 DGX Spark 攤位展出校園巡檢及阿克曼小車數位孿生專案，獲得黃仁勳親簽。展後受邀拜訪 UC Berkeley BAIR (AI自駕中心) 參觀及討論。",
    },
  },
  {
    date: "2026.03.05",
    en: {
      title: "NVIDIA DLI Certification",
      desc: "Obtained NVIDIA DLI: Isaac for Accelerated Robotics Certificate.",
    },
    zh: {
      title: "NVIDIA DLI 專業認證",
      desc: "在 NVIDIA DLI 獲得 NVIDIA Isaac for Accelerated Robotics 課程通過證書。",
    },
  },
  {
    date: "2026.01 — 2026.02",
    en: {
      title: "MSI HQ Resident Implementation",
      desc: "Resident at MSI HQ (Zhonghe). Collaborated with Senior Manager Shi-Zhe Hung & RD Yan-Cheng Lai to develop GTC demo and research Alpamayo.",
    },
    zh: {
      title: "微星中和總部協同實作",
      desc: "前往新北中和微星公司，與創新前瞻中心資深經理洪士哲及 RD 賴彥成協同實作 GTC 展出的 Omniverse 校園巡檢系統，並共同研究 NVIDIA Alpamayo 應用。",
    },
  },
  {
    date: "2025.10.30",
    en: {
      title: "DJI Drone Training",
      desc: "Participated in DJI UAV training program and received official certification.",
    },
    zh: {
      title: "大疆無人機培訓課程",
      desc: "參加大疆無人機培訓課程並獲得參加證明。",
    },
  },
  {
    date: "2025.08.30",
    en: {
      title: "ROS2 & Sensor Integration",
      desc: "Learned ROS2 control systems. Activated and integrated sensors including LiDAR, IMU, Cameras, and Ackermann Car architectures.",
    },
    zh: {
      title: "ROS2 控制與感測器啟動",
      desc: "學習 ROS2 控制並開啟感測器整合，諸如 LiDAR, IMU, Camera, 以及 Ackermann Car 控制。",
    },
  },
  {
    date: "2025.06.30",
    en: {
      title: "NVIDIA × MSI Partnership Initiated",
      desc: "Began collaboration project connecting NVIDIA Omniverse with MSI Innovation Center.",
    },
    zh: {
      title: "NVIDIA 與微星合作案啟動",
      desc: "開始接洽 NVIDIA Omniverse 與 MSI 創新前瞻中心的正式合作案。",
    },
  },
  {
    date: "2025.04.30",
    en: {
      title: "Lab Entry & Foundation",
      desc: "Joined the lab. Began studies in Golf Cart control algorithms, Linux environments, MySQL, and Unity.",
    },
    zh: {
      title: "進入實驗室與底層架構學習",
      desc: "開始進實驗室。學習高爾夫球車控制、Linux 系統、MySQL 資料庫以及 Unity 模擬環境。",
    },
  },
];

function TimelineEvent({
  event,
  lang,
  index,
}: {
  event: (typeof EVENTS)[0];
  lang: Lang;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? event.en : event.zh;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative pl-10 pb-12 border-l border-primary/15 last:border-transparent"
    >
      {/* Dot */}
      <div
        className="absolute -left-[9px] top-1.5 w-[18px] h-[18px] rounded-full bg-bg border-2 border-primary"
        style={{ boxShadow: "0 0 14px rgba(59,130,246,0.6)" }}
      >
        <div className="absolute inset-[3px] rounded-full bg-primary" />
      </div>

      {/* Date */}
      <div className="font-mono text-primary text-xs font-bold mb-2 tracking-wider">{event.date}</div>

      {/* Title */}
      <h3 className="text-base font-black text-white mb-2 leading-snug">{content.title}</h3>

      {/* Desc */}
      <p className="text-white/40 text-sm leading-relaxed">{content.desc}</p>
    </motion.div>
  );
}

export default function Timeline({ lang }: { lang: Lang }) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="timeline" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(59,130,246,0.04),transparent)] pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-3px] uppercase text-center mb-20"
        >
          {lang === "en" ? "SYSTEM_TIMELINE" : "精確任務時間軸"}
        </motion.h2>

        <div className="ml-2">
          {EVENTS.map((e, i) => (
            <TimelineEvent key={i} event={e} lang={lang} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
