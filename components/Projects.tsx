"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { Lang } from "@/app/providers";
import { PROJECTS, getAllProjectTags, getProjectBySlug } from "@/data/projects";

export { getProjectBySlug };

export type Project = {
  slug: string;
  image: string;
  tags: string[];
  category: string;
  en: { title: string; desc: string; summary: string[]; body: string[]; meta?: string };
  zh: { title: string; desc: string; summary: string[]; body: string[]; meta?: string };
  pdf?: string;
};

/* -- Project Card -- */
function ProjectCard({
  project,
  lang,
  index,
  onClick,
}: {
  project: Project;
  lang: Lang;
  index: number;
  onClick: (project: Project) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const content = lang === "en" ? project.en : project.zh;
  const isEn = lang === "en";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative cursor-pointer group"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(project); } }}
      aria-label={content.title}
    >
      <div className="bg-canvas text-ink border border-hairline rounded-sm flex flex-col feature-card group-hover:border-primary/40 transition-colors">
        {/* Corner square accent */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary" />

        {/* Image section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={content.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge-tag text-[10px]">
                {tag}
              </span>
            ))}
          </div>
          {/* Category indicator */}
          <div className="absolute bottom-3 right-3">
            <span className="w-8 h-8 flex items-center justify-center bg-surface-dark/80 text-primary text-xs font-bold rounded-none">
              {content.title.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="flex-1 p-6 flex flex-col min-h-0">
          {/* Meta line */}
          {content.meta && (
            <div className="text-caption-xs text-primary/70 mb-2 tracking-wider uppercase font-bold">
              {content.meta}
            </div>
          )}

          <h3 className="text-heading-md text-ink mb-2 group-hover:text-primary transition-colors">
            {content.title}
          </h3>
          <p className="text-body-sm text-body leading-relaxed flex-1">{content.desc}</p>

          {/* Action indicator */}
          <div className="mt-4 flex items-center gap-2 text-primary text-button-sm font-bold">
            <span>{isEn ? "VIEW DETAILS" : "查看詳情"}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -- Project Detail Modal -- */
function ProjectModal({
  project,
  lang,
  onClose,
}: {
  project: Project | null;
  lang: Lang;
  onClose: () => void;
}) {
  const content = lang === "en" ? project?.en : project?.zh;
  const isEn = lang === "en";

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative flex flex-col w-full max-w-3xl max-h-[90vh] bg-canvas rounded-sm border border-hairline overflow-hidden"
        initial={{ scale: 0.97, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline shrink-0 bg-canvas">
          <div>
            <span className="text-utility-xs text-primary tracking-wider font-bold">{project.category}</span>
            <h3 className="text-heading-xl text-ink mt-1">{content?.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-mute hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Image */}
          {project.image && (
            <div className="relative h-56 overflow-hidden mb-6 rounded-sm">
              <img src={project.image} alt={content?.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Summary list */}
          {content?.summary && (
            <div className="mb-6">
              <h4 className="text-heading-sm text-ink mb-3">{isEn ? "KEY POINTS" : "重點"}</h4>
              <ul className="space-y-2">
                {content.summary.map((s, i) => (
                  <li key={i} className="flex gap-3 text-body-sm text-body">
                    <span className="text-primary mt-1.5 shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8">
                        <rect width="8" height="8" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed body */}
          {content?.body && content.body.map((paragraph, i) => (
            <p key={i} className="text-body-md text-body leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          {/* PDF link */}
          {project.pdf && (
            <div className="mt-6 pt-4 border-t border-hairline">
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="button-outline inline-flex"
              >
                {isEn ? "VIEW PDF DOCUMENT" : "查看 PDF 文件"}
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -- Default export: Projects section -- */
export default function Projects({ lang, ...props }: { lang: Lang } & React.HTMLAttributes<HTMLElement>) {
  const titleRef = useRef(null);
  const inView = useInView(titleRef, { once: true });
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeTag, setActiveTag] = useState<string>("ALL");
  const isEn = lang === "en";

  const allTags = getAllProjectTags();
  const filtered = activeTag === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <section id="projects" {...props} className="relative">
        {/* Section padding */}
        <div className="pt-[64px] pb-[64px] px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section title */}
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-display-lg text-on-dark text-center mb-4"
            >
              {lang === "en" ? "TECHNICAL PROJECTS" : "技術專案實錄"}
            </motion.h2>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setActiveTag("ALL")}
                className={`pill-tab ${activeTag === "ALL" ? "pill-tab-active" : ""}`}
              >
                {isEn ? "ALL" : "全部"}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`pill-tab ${activeTag === tag ? "pill-tab-active" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag}
                className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {filtered.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} lang={lang} index={i} onClick={setSelected} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-on-dark-mute/30 mx-auto mb-4">
                  <rect x="2" y="3" width="20" height="14" rx="1" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <div className="text-on-dark-mute text-body-md mb-1">{isEn ? "No projects in this category yet" : "此類別尚無專案"}</div>
                <div className="text-on-dark-mute/50 text-body-sm">Content coming soon</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} lang={lang} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
