"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/app/providers";

/* -- Typing / blinking cursor effect -- */
function TypingText({ text, delay = 0, speed = 60 }: { text: string; delay?: number; speed?: number }) {
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visible >= text.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => setVisible((v) => v + 1), speed);
    return () => clearTimeout(timer);
  }, [visible, text.length, speed]);

  if (delay > 0) return <TypingText text={text} delay={delay - speed} speed={speed} />;

  return (
    <span className="inline-flex items-center">
      <span className="overflow-hidden whitespace-nowrap">{text.slice(0, visible)}</span>
      {!done && <span className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] animate-pulse" />}
    </span>
  );
}

/* -- Animated particle grid background -- */
function ParticleGrid() {
  const count = 60;
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 4 + Math.random() * 6,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Subtle grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(p.id) * 15, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* -- Live clock / timestamp -- */
function SystemClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-xs text-on-dark-mute tracking-wider flex flex-col sm:flex-row gap-1 sm:gap-4">
      <span>{date}</span>
      <span className="text-primary/40">/</span>
      <span className="text-primary">{time}</span>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const isEn = lang === "en";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* -- Black canvas (hero-card-dark spec) -- */}
      <div className="absolute inset-0 bg-surface-dark" />

      {/* -- Gradient mesh overlay -- */}
      <div className="absolute inset-0" aria-hidden>
        {/* Radial glow following cursor */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #76b900 0%, transparent 70%)",
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            left: 0,
            top: 0,
          }}
        />
        {/* Subtle corner accents */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-primary/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[40vh] bg-gradient-to-tr from-primary/[0.02] to-transparent" />
      </div>

      {/* -- Particles -- */}
      <ParticleGrid />

      {/* -- Content (per hero-card-dark: 80px vert / 48px horiz padding) -- */}
      <div ref={ref} className="relative z-10 max-w-content mx-auto px-6 sm:px-8 lg:px-12 w-full" style={{ paddingTop: "64px", paddingBottom: "clamp(80px, 15vh, 200px)" }}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
          {/* Left: copy area */}
          <div className="flex-1 pt-16 lg:pt-20">
            {/* Status line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-3 h-3 bg-primary flex-shrink-0" />
              <span className="font-mono text-[13px] text-primary uppercase whitespace-nowrap">
                {isEn ? "SYSTEMS_ARCHITECT_CORE" : "系統架構師核心"}
              </span>
              <span className="hidden sm:inline text-xs text-primary/30">v2.6.0</span>
            </motion.div>

            {/* Name — display-xl per spec — with typing effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-on-dark mb-1 tracking-tight text-display-xl"
            >
              <TypingText text="LIN, SHU-JEN" speed={80} />
            </motion.h1>

            {/* Title — caption-md eyebrow + display-lg */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="mb-6"
            >
              <span className="text-[14px] font-bold text-primary/60 block mb-1">{isEn ? "ROLE" : "職稱"}</span>
              <span className="text-[16px] font-bold text-on-dark" style={{ lineHeight: "1.5" }}>
                {isEn
                  ? "Systems Architect · Digital Twins · Embodied AI"
                  : "系統架構師 · 數位孿生 · 具身智能"}
              </span>
            </motion.div>

            {/* Description — heading-lg per spec */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-[15px] font-normal text-on-dark-mute max-w-xl mb-8 leading-relaxed"
            >
              {isEn
                ? "Partnering with MSI Innovation Center. NVIDIA GTC 2026 Exhibitor. Specializing in Digital Twins & Embodied AI Infrastructure — building the bridge between physical systems and their virtual representations."
                : "微星科技創新前瞻中心夥伴。NVIDIA GTC 2026 參展人。專注於數位孿生與具身智能基礎設施——構築實體系統與虛擬表征之間的橋樑。"}
            </motion.p>

            {/* CTA buttons — button-primary + button-outline-on-dark per spec */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/projects">
                <button className="button-primary text-button-md">{isEn ? "EXPLORE WORK" : "探索作品"}</button>
              </Link>
              <Link href="/contact">
                <button className="button-outline-on-dark text-button-md">{isEn ? "GET IN TOUCH" : "聯繫我"}</button>
              </Link>
            </motion.div>

            {/* Stats callouts — blend into dark background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap gap-x-10 gap-y-6"
            >
              {[
                { value: "4", labelEn: "NVIDIA Certifications", labelZh: "NVIDIA 認證" },
                { value: "4", labelEn: "Featured Projects", labelZh: "精選專案" },
                { value: "GTC", labelEn: "2026 Exhibitor", labelZh: "GTC 2026 參展" },
              ].map((stat, i) => (
                <div key={i} className="min-w-0">
                  <div className="text-display-lg text-primary leading-none" style={{ fontSize: "28px" }}>{stat.value}</div>
                  <div className="text-[11px] font-normal text-[rgba(255,255,255,0.5)] mt-1 tracking-wide">{isEn ? stat.labelEn : stat.labelZh}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Avatar / visual element */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="hidden lg:flex flex-col items-center gap-6 shrink-0"
          >
            {/* Avatar ring */}
            <div className="relative">
              {/* Outer ring animation */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative w-48 h-48 rounded-full border-2 border-on-dark/20 overflow-hidden">
                <img
                  src="/assets/profile.jpg"
                  alt="LIN SHU-JEN"
                  className="w-full h-full object-cover object-[center_12%]"
                />
              </div>
              {/* Corner accent */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary" />
            </div>

            {/* Status clock */}
            <div className="text-center">
              <div className="text-utility-xs text-on-dark-mute mb-2">{isEn ? "CURRENT STATUS" : "目前狀態"}</div>
              <div className="flex items-center gap-2 justify-center">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-body-strong text-on-dark">{isEn ? "AVAILABLE" : "可接受合作"}</span>
              </div>
              <div className="mt-2">
                <SystemClock />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-utility-xs text-on-dark-mute tracking-[4px]">{isEn ? "SCROLL" : "捲動"}</span>
          <motion.div
            className="w-px h-8 bg-primary"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
