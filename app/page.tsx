"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/app/providers";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";

const QUICK_LINKS = [
  { href: "/projects", label: "PROJECTS", labelZh: "專案", desc: "技術專案實錄", descZh: "Technical Projects" },
  { href: "/timeline", label: "TIMELINE", labelZh: "時間軸", desc: "經歷時間軸", descZh: "Experience Timeline" },
  { href: "/certificates", label: "CERTIFICATES", labelZh: "認證", desc: "專業認證", descZh: "Professional Certificates" },
  { href: "/contact", label: "CONTACT", labelZh: "聯絡", desc: "聯絡與社群", descZh: "Contact & Social" },
];

export default function Home() {
  const { lang, setLang } = useLang();
  const isEn = lang === "en";

  return (
    <>
      <Cursor />
      <Nav lang={lang} setLang={setLang} />
      <Hero />

      {/* Quick links */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,6vw,3.5rem)] font-black tracking-[-1px] sm:tracking-[-3px] uppercase text-center mb-20 text-white/90"
          >
            {isEn ? "EXPLORE_WORK" : "探索作品"}
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {QUICK_LINKS.map((link, i) => (
              <Link href={link.href} key={link.href}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.5)" }}
                  className="glass rounded-2xl p-8 flex flex-col gap-4 cursor-pointer group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-shadow duration-300"
                >
                  <div className="font-mono text-primary text-xs tracking-wider">{isEn ? link.label : link.labelZh}</div>
                  <h3 className="text-xl font-black text-white">{isEn ? link.label : link.labelZh}</h3>
                  <p className="text-white/40 text-sm flex-1">{isEn ? link.desc : link.descZh}</p>
                  <span className="font-mono text-[10px] text-primary/50 group-hover:text-primary transition-colors">
                    {isEn ? "EXPLORE →" : "探索 →"}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center font-mono text-xs text-white/20 border-t border-white/5">
        <span className="text-primary/40">©</span> 2026 LIN, SHU-JEN —{" "}
        <span className="text-primary/40">SYSTEMS_ARCHITECT</span>
      </footer>
    </>
  );
}
