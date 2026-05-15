"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Lang } from "@/app/providers";
import EVENTS from "@/data/timeline.json";

type GroupedEvent = {
  year: string;
  events: (typeof EVENTS)[0][];
};

function groupByYear(events: (typeof EVENTS)[0][]): GroupedEvent[] {
  const groups: GroupedEvent[] = [];
  let current: GroupedEvent | null = null;
  for (const e of events) {
    const year = e.date.split(".")[0] || e.date.split("—")[0].trim().split(" ")[0];
    if (!current || current.year !== year) {
      current = { year, events: [e] };
      groups.push(current);
    } else {
      current.events.push(e);
    }
  }
  return groups;
}

function TimelineCard({
  event,
  lang,
  index,
  isFirst,
}: {
  event: (typeof EVENTS)[0];
  lang: Lang;
  index: number;
  isFirst: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? event.en : event.zh;
  const isEn = lang === "en";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1">
        <div className={`w-3 h-3 rounded-full bg-primary border-2 border-surface-dark ${isFirst ? "ring-2 ring-primary/30" : ""}`} />
        {/* Vertical line */}
        <div className="absolute left-[5px] top-3 w-px h-full bg-hairline" />
      </div>

      {/* Card */}
      <div className="bg-canvas text-ink border border-hairline rounded-sm feature-card relative">
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />

        {/* Date badge */}
        <div className="mb-3">
          <span className="font-mono text-[11px] text-primary font-bold tracking-wider">{event.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-heading-md text-ink mb-3">{content.title}</h3>

        {/* Description */}
        <p className="text-body-sm text-body leading-relaxed">{content.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const groups = groupByYear(EVENTS);

  return (
    <section id="timeline" {...props} className="relative">
      {/* Section padding */}
      <div className="pt-[48px] pb-[48px] px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section title */}
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-display-lg text-on-dark text-center mb-3"
          >
            {lang === "en" ? "EXPERIENCE TIMELINE" : "經歷時間軸"}
          </motion.h2>
          <div className="w-12 h-px bg-primary mx-auto mb-8" />

          {/* Year groups */}
          {groups.map((group) => (
            <div key={group.year} className="mb-12 last:mb-0">
              {/* Year label */}
              <div className="text-[48px] font-bold text-primary/10 mb-6 select-none">{group.year}</div>

              {/* Events */}
              <div className="ml-4">
                {group.events.map((e, i) => (
                  <TimelineCard key={e.date + e.en.title} event={e} lang={lang} index={i} isFirst={i === 0} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
