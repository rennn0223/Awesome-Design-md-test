"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";
import EVENTS from "@/data/timeline.json";

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
      className="relative pl-4 pb-6 border-l border-hairline last:border-transparent"
    >
      {/* Dot */}
      <div
        className="absolute left-[-6px] top-0.5 w-2 h-2 rounded-full bg-primary border border-hairline"
      />

      {/* Date */}
      <div className="font-mono text-primary-dark text-xs mb-2">{event.date}</div>

      {/* Title */}
      <h3 className="text-heading-md text-ink mb-2">{content.title}</h3>

      {/* Desc */}
      <p className="text-body-md text-ink leading-relaxed">{content.desc}</p>
    </motion.div>
  );
}

export default function Timeline({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });

  return (
    <section id="timeline" {...props} className="relative">
      {/* Section padding */}
      <div className="pt-[64px] pb-[64px] px-6">
        <div className="max-w-3xl mx-auto">
          {/* Section title */}
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-on-dark text-center mb-8"
          >
            {lang === "en" ? "EXPERIENCE TIMELINE" : "經歷時間軸"}
          </motion.h2>

          {/* Timeline content */}
          <div className="relative pl-4">
            {/* Left border */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />

            {/* Events */}
            <div className="ml-4">
              {EVENTS.map((e, i) => (
                <TimelineEvent key={i} event={e} lang={lang} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
