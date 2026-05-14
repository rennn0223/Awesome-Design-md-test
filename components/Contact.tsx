"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";

const LINKS = [
  { label: "EMAIL", value: "ren910223@gmail.com", href: "mailto:ren910223@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/rennn223", href: "https://www.linkedin.com/in/rennn223" },
  { label: "GITHUB", value: "github.com/rennn0223", href: "https://github.com/rennn0223" },
  { label: "PHONE", value: "+886-902-235-732", href: "tel:+886902235732" },
  { label: "BLINQ", value: "DIGITAL_BUSINESS_CARD", href: "https://s.blinq.me/cmnyeijmz02j70bs6uy3t9kdz?bs=icl" },
];

export default function Contact({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const isEn = lang === "en";
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="contact" {...props} className="relative">
      {/* Section padding */}
      <div className="pt-[64px] pb-[64px] px-6">
        <div className="max-w-xl mx-auto">
          {/* Section title */}
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-on-dark text-center mb-8"
          >
            {isEn ? "GET_IN_TOUCH" : "聯絡與社群"}
          </motion.h2>

          {/* Contact content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true }}
            className="bg-canvas text-ink border border-hairline rounded-sm p-6"
          >
            {/* Status line */}
            <div className="font-mono text-primary-dark text-xs mb-4">
              {">"} INITIALIZING_COMMUNICATION_PROTOCOL...
            </div>

            {/* Links */}
            <div className="space-y-4">
              {LINKS.map((link, i) => (
                <div key={link.label} className="flex items-center gap-3 py-2 border-b border-hairline/20 last:border-0">
                  <span className="font-mono text-[10px] text-primary/50 w-16 sm:w-24 shrink-0 tracking-wider">
                    [{link.label}]
                  </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-sm font-body-md text-body hover:text-primary transition-colors"
                  >
                    {link.value}
                  </a>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6 pt-4 border-t border-hairline text-center text-body text-xs font-mono leading-relaxed">
              {isEn
                ? "Available for Digital Twin & AI Infrastructure collaborations."
                : "隨時歡迎關於數位孿生與 AI 基礎設施的開發合作。"}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}