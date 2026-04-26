"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Lang } from "@/app/page";

const TAGS = ["RUST", "WASM", "OMNIVERSE", "ROS2", "LIDAR", "NVIDIA", "DGX", "USD", "JETSON", "EDGE-AI"];

type Particle = { x: number; y: number; size: number; duration: number; delay: number };

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 6,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.15 }}
          animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Hero({ lang }: { lang: Lang }) {
  const isEn = lang === "en";

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 grid-bg scanlines overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(59,130,246,0.09),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(59,130,246,0.04),transparent)] pointer-events-none" />

      <ParticleField />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 max-w-5xl w-full"
      >
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-accent text-xs sm:text-sm"
        >
          <span className="typing-text">
            {isEn ? "> INITIALIZING_SYSTEMS_ARCHITECT_CORE_v2.6.0" : "> 系統架構師核心已載入_v2.6.0"}
          </span>
        </motion.div>

        {/* Avatar + Name row */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-28 h-28 rounded-full overflow-hidden"
            style={{ border: "2px solid rgba(59,130,246,0.5)", boxShadow: "0 0 30px rgba(59,130,246,0.3)" }}
          >
            <img src="/assets/profile.jpg" alt="LIN SHU-JEN" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
          </motion.div>

          {/* Giant title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-[clamp(3rem,13vw,9.5rem)] font-black leading-[0.85] tracking-[-2px] sm:tracking-[-4px] select-none"
            style={{
              background: "linear-gradient(to bottom, #ffffff 30%, #2a2a2a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LIN,<br />SHU-JEN
          </motion.h1>
        </div>

        {/* Title badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[2px] sm:tracking-[5px] text-white/30 uppercase px-4 text-center"
        >
          Systems Architect · Digital Twins · Embodied AI
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-white/45 max-w-xl leading-relaxed text-sm sm:text-lg px-2"
        >
          {isEn
            ? "Partnering with MSI Innovation Center. NVIDIA GTC 2026 Exhibitor. Specializing in Digital Twins & Embodied AI Infrastructure."
            : "微星科技創新前瞻中心夥伴。NVIDIA GTC 2026 參展人。專注於數位孿生、具身智能與高效能系統架構。"}
        </motion.p>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.04 }}
              whileHover={{ borderColor: "rgba(59,130,246,0.6)", color: "#3b82f6", scale: 1.05 }}
              className="font-mono text-[10px] border border-white/10 px-3 py-1 rounded-full text-white/35 transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col items-center gap-3 mt-2 sm:mt-6"
        >
          <span className="font-mono text-[10px] text-white/15 tracking-[4px]">SCROLL</span>
          <motion.div
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-14 bg-gradient-to-b from-primary/60 to-transparent origin-top"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
