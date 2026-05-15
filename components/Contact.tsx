"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";

const LINKS = [
  { label: "EMAIL", value: "ren910223@gmail.com", href: "mailto:ren910223@gmail.com", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
  { label: "LINKEDIN", value: "linkedin.com/in/rennn223", href: "https://www.linkedin.com/in/rennn223", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" /></svg> },
  { label: "GITHUB", value: "github.com/rennn0223", href: "https://github.com/rennn0223", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg> },
  { label: "PHONE", value: "+886-902-235-732", href: "tel:+886902235732", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg> },
  { label: "BLINQ", value: "DIGITAL_BUSINESS_CARD", href: "https://s.blinq.me/cmnyeijmz02j70bs6uy3t9kdz?bs=icl", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="1" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="14" y2="12" /></svg> },
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
            className="text-display-lg text-on-dark text-center mb-3"
          >
            {isEn ? "GET_IN_TOUCH" : "聯絡與社群"}
          </motion.h2>
          <div className="w-12 h-px bg-primary mx-auto mb-10" />

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-canvas text-ink border border-hairline rounded-sm p-6"
          >
            {/* Status line */}
            <div className="font-mono text-primary-dark text-xs mb-6 pb-4 border-b border-hairline">
              {"{"} INITIALIZING_COMMUNICATION_PROTOCOL... {"}"}
            </div>

            {/* Links */}
            <div className="space-y-0">
              {LINKS.map((link, i) => (
                <div key={link.label} className={`flex items-center gap-4 py-4 border-b border-hairline/20 last:border-0 group hover:bg-surface-soft/50 transition-colors -mx-2 px-2 rounded-sm`}>
                  <span className="text-primary shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  <span className="font-mono text-[10px] text-primary/40 w-20 shrink-0 tracking-wider">
                    [{link.label}]
                  </span>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-body-md text-body group-hover:text-primary transition-colors"
                  >
                    {link.value}
                  </a>
                  <span className="ml-auto text-primary/0 group-hover:text-primary/60 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mt-6 pt-4 border-t border-hairline text-center">
              <p className="text-body-sm text-body leading-relaxed">
                {isEn
                  ? "Available for Digital Twin & AI Infrastructure collaborations."
                  : "隨時歡迎關於數位孿生與 AI 基礎設施的開發合作。"}
              </p>
              <div className="mt-3 font-mono text-[10px] text-primary/40">
                {"// STATUS: OPEN_TO_WORK →"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
