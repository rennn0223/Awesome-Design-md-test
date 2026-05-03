"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/app/providers";

const NAV_ITEMS = [
  { id: "home", labelEn: "HOME", labelZh: "首頁" },
  { id: "projects", labelEn: "PROJECTS", labelZh: "專案" },
  { id: "timeline", labelEn: "TIMELINE", labelZh: "時間軸" },
  { id: "certificates", labelEn: "CERTS", labelZh: "認證" },
  { id: "contact", labelEn: "CONTACT", labelZh: "聯絡" },
];

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  projects: "/projects",
  timeline: "/timeline",
  certificates: "/certificates",
  contact: "/contact",
};

export default function Nav({
  lang,
  setLang,
  title,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  title?: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = NAV_ITEMS.find((item) => PAGE_PATHS[item.id] === pathname)?.id ?? "home";

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img src="/assets/nvidia.png" alt="" className="h-5 brightness-0 invert opacity-60 hover:opacity-90 transition-opacity" />
          <span className="text-white/15 text-xs">×</span>
          <img src="/assets/nchu.png" alt="" className="h-5 brightness-0 invert opacity-60 hover:opacity-90 transition-opacity" />
          <span className="text-white/15 text-xs">×</span>
          <img src="/assets/msi.png" alt="" className="h-5 brightness-0 invert opacity-60 hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={PAGE_PATHS[item.id]}
              className={`font-mono text-[11px] tracking-widest relative transition-all duration-300 pb-1 ${
                active === item.id ? "text-primary" : "text-white/35 hover:text-white/70"
              }`}
            >
              {lang === "en" ? item.labelEn : item.labelZh}
              {active === item.id && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary"
                  style={{ boxShadow: "0 0 8px rgba(59,130,246,0.9)" }}
                />
              )}
            </Link>
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
                <Link
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  className={`text-left font-mono text-sm py-3 border-b border-white/5 transition-colors ${
                    active === item.id ? "text-primary" : "text-white/40"
                  }`}
                >
                  {lang === "en" ? item.labelEn : item.labelZh}
                </Link>
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
