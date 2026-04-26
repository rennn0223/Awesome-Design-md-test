"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "@/app/page";

const NAV_ITEMS = [
  { id: "home", en: "HOME", zh: "首頁" },
  { id: "projects", en: "PROJECTS", zh: "專案" },
  { id: "timeline", en: "TIMELINE", zh: "時間軸" },
  { id: "certificates", en: "CERTS", zh: "認證" },
  { id: "contact", en: "CONTACT", zh: "聯絡" },
];

export default function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActive(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#030303]/80 backdrop-blur-2xl border-b border-white/5" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <img src="/assets/nvidia.png" alt="NVIDIA" className="h-4 brightness-0 invert opacity-70" />
          <span className="text-white/20 text-xs">×</span>
          <img src="/assets/nchu.png" alt="NCHU" className="h-4 brightness-0 invert opacity-70" />
          <span className="text-white/20 text-xs">×</span>
          <img src="/assets/msi.png" alt="MSI" className="h-4 brightness-0 invert opacity-70" />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-mono text-[11px] tracking-widest relative transition-all duration-300 pb-1 ${
                active === item.id ? "text-primary" : "text-white/35 hover:text-white/70"
              }`}
            >
              {lang === "en" ? item.en : item.zh}
              {active === item.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                  style={{ boxShadow: "0 0 8px rgba(59,130,246,0.9)" }}
                />
              )}
            </button>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="font-mono text-[11px] text-white/35 hover:text-accent border border-white/10 hover:border-accent/40 px-3 py-1 rounded transition-all duration-300"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 text-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-2xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left font-mono text-sm py-3 border-b border-white/5 transition-colors ${
                    active === item.id ? "text-primary" : "text-white/40"
                  }`}
                >
                  {lang === "en" ? item.en : item.zh}
                </button>
              ))}
              <button
                onClick={() => setLang(lang === "en" ? "zh" : "en")}
                className="text-left font-mono text-sm py-3 text-accent"
              >
                {lang === "en" ? "切換中文" : "Switch to EN"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
