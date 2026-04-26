"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/page";

const LINKS = [
  { label: "EMAIL", value: "ren910223@gmail.com", href: "mailto:ren910223@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rennn223", href: "https://www.linkedin.com/in/rennn223" },
  { label: "GITHUB", value: "github.com/rennn0223", href: "https://github.com/rennn0223" },
  { label: "PHONE", value: "+886-902-235-732", href: "tel:+886902235732" },
  { label: "BLINQ", value: "DIGITAL_BUSINESS_CARD", href: "https://s.blinq.me/cmnyeijmz02j70bs6uy3t9kdz?bs=icl" },
];

export default function Contact({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Bottom glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(59,130,246,0.07),transparent)] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-[clamp(2.5rem,8vw,4.5rem)] font-black tracking-[-3px] uppercase text-center mb-16"
        >
          {isEn ? "GET_IN_TOUCH" : "聯絡與社群"}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

          <div className="font-mono text-accent text-xs mb-6">
            {">"} INITIALIZING_COMMUNICATION_PROTOCOL...
          </div>

          <div className="flex flex-col gap-1">
            {LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 py-3.5 border-b border-white/5 last:border-0 group"
              >
                <span className="font-mono text-[10px] text-primary/50 w-24 shrink-0 tracking-wider">
                  [{link.label}]
                </span>
                <span className="font-mono text-xs text-white/40 group-hover:text-primary transition-colors duration-300 truncate">
                  {link.value}
                </span>
                <span className="ml-auto font-mono text-[10px] text-white/15 group-hover:text-primary/60 transition-colors duration-300 shrink-0">
                  →
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-center text-white/20 text-xs font-mono leading-relaxed">
            {isEn
              ? "Available for Digital Twin & AI Infrastructure collaborations."
              : "隨時歡迎關於數位孿生與 AI 基礎設施的開發合作。"}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
