"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/app/providers";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "en" | "zh";

const NAV_ITEMS: { id: string; labelEn: string; labelZh: string; path: string }[] = [
  { id: "home", labelEn: "HOME", labelZh: "首頁", path: "/" },
  { id: "projects", labelEn: "PROJECTS", labelZh: "專案", path: "/projects" },
  { id: "timeline", labelEn: "TIMELINE", labelZh: "時間軸", path: "/timeline" },
  { id: "blog", labelEn: "BLOG", labelZh: "部落格", path: "/blog" },
  { id: "certificates", labelEn: "CERTIFICATES", labelZh: "認證", path: "/certificates" },
  { id: "contact", labelEn: "CONTACT", labelZh: "聯絡", path: "/contact" },
];

const PAGE_PATHS: Record<string, string> = {};
NAV_ITEMS.forEach((item) => { PAGE_PATHS[item.path] = item.id; });

/* -- Search Overlay -- */
function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { lang } = useLang();
  const isEn = lang === "en";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusTimeout = setTimeout(() => inputRef.current?.focus(), 100);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimeout);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-surface-dark flex flex-col items-center"
      style={{ paddingTop: "clamp(60px, 15vh, 120px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-on-dark/30 pb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-on-dark-mute">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={isEn ? "Search projects, blog posts..." : "搜尋專案、文章..."}
            className="text-on-dark bg-transparent border-0 focus:outline-none text-display-lg w-full placeholder:text-on-dark-mute"
            spellCheck={false}
            autoComplete="off"
          />
        </div>

        {/* Recent / suggested */}
        <div className="mt-8">
          <div className="text-utility-xs text-on-dark-mute mb-4">{isEn ? "RECENT" : "最近瀏覽"}</div>
          <div className="space-y-1">
            {[
              { label: isEn ? "GTC 2026 Conference" : "GTC 2026 大會", path: "/projects" },
              { label: isEn ? "MGX Infrastructure" : "MGX 伺服器建置", path: "/timeline" },
              { label: isEn ? "Isaac for Accelerated Robotics" : "Isaac 加速機器人認證", path: "/certificates" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="flex items-center justify-between w-full text-left py-3 px-2 hover:bg-surface-elevated transition-colors group"
                onClick={onClose}
              >
                <span className="text-body-md text-on-dark-mute group-hover:text-on-dark">{item.label}</span>
                <span className="text-button-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {isEn ? "OPEN →" : "開啟 →"}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="flex items-center gap-2 mt-8 justify-end">
          <kbd className="inline-flex items-center justify-center px-2 py-1 text-caption-xs text-on-dark-mute border border-hairline-strong rounded-xs">
            ESC
          </kbd>
          <span className="text-caption-sm text-on-dark-mute">{isEn ? "to close" : "關閉"}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -- Nav -- */
export default function Nav() {
  const { lang, setLang } = useLang();
  const isEn = lang === "en";
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const active = NAV_ITEMS.find((item) => PAGE_PATHS[item.path] === pathname)?.id ?? "home";

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      {/* Primary Nav — per DESIGN.md primary-nav spec */}
      <nav className="fixed top-0 left-0 right-0 z-50 primary-nav" role="navigation" aria-label="Main navigation">
        <div className="max-w-content mx-auto px-4 lg:px-6 flex items-center justify-between h-14 lg:h-16">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-heading-sm text-on-dark tracking-tight">
              LIN<span className="text-primary">.</span>
            </span>
            <span className="text-caption-sm text-on-dark-mute hidden sm:inline">SYSTEMS ARCHITECT</span>
          </Link>

          {/* Center: Nav items */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`relative inline-flex items-center px-3 py-1.5 text-[14px] font-body-strong transition-colors ${
                  active === item.id
                    ? "text-on-dark"
                    : "text-on-dark-mute hover:text-on-dark"
                }`}
                aria-current={active === item.id ? "page" : undefined}
              >
                {isEn ? item.labelEn : item.labelZh}
                {active === item.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right: Search + Language + CTA */}
          <div className="flex items-center gap-1">
            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 text-on-dark-mute hover:text-on-dark transition-colors"
              aria-label={isEn ? "Search" : "搜尋"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "zh" : "en")}
              className="hidden sm:inline-flex text-[14px] font-body-strong px-2.5 py-1.5 text-on-dark-mute hover:text-on-dark transition-colors"
            >
              {isEn ? "中文" : "EN"}
            </button>

            {/* Get Started CTA */}
            <Link href="/contact">
              <button className="hidden lg:inline-flex button-primary text-button-sm" style={{ height: 34, padding: "7px 14px", fontSize: 13 }}>
                {isEn ? "GET STARTED" : "開始"}
              </button>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-on-dark-mute hover:text-on-dark transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label={isEn ? "Open menu" : "開啟選單"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — slides in from right */}
      <AnimatePresence>{mobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            className="fixed top-0 right-0 z-[70] h-full w-72 max-w-[80vw] bg-surface-dark border-l border-hairline-strong md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="pt-[72px] px-6 pb-6 h-full overflow-y-auto">
              {/* Close */}
              <button
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-on-dark-mute hover:text-on-dark"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="font-utility-xs text-on-dark-mute mb-6 mt-4">MAIN MENU</div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 pl-3 text-body-sm transition-colors border-l-2 ${
                      active === item.id
                        ? "text-on-dark border-primary"
                        : "text-on-dark-mute hover:text-on-dark border-transparent"
                    }`}
                  >
                    {isEn ? item.labelEn : item.labelZh}
                  </Link>
                ))}
              </nav>

              {/* Mobile lang toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "zh" : "en")}
                className="block py-3 pl-3 mt-4 text-body-sm text-on-dark-mute hover:text-on-dark transition-colors border-l-2 border-transparent"
              >
                {isEn ? "Switch to Chinese" : "切換為英文"}
              </button>

              {/* Mobile CTA */}
              <div className="mt-6">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full button-primary text-button-sm" style={{ height: 40, padding: "8px 16px", fontSize: 14 }}>
                    {isEn ? "GET STARTED" : "開始"}
                  </button>
                </Link>
              </div>

              {/* Mobile search */}
              <div className="mt-6">
                <button
                  onClick={() => { setSearchOpen(true); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 py-3 text-body-sm text-on-dark-mute hover:text-on-dark transition-colors border-b border-hairline/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  {isEn ? "Search" : "搜尋"}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}</AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
    </>
  );
}
