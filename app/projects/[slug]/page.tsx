"use client";
import { useLang } from "@/app/providers";
import { getProjectBySlug, type Project } from "@/components/Projects";
import Link from "next/link";
import { useEffect, useState } from "react";

/* -- Back button -- */
function BackLink({ lang }: { lang: "en" | "zh" }) {
  const isEn = lang === "en";
  return (
    <Link href="/projects" className="inline-flex items-center gap-2 text-primary text-button-sm font-bold hover:opacity-80 transition-opacity">
      <span className="transition-transform duration-200 hover:-translate-x-1 inline-block">←</span>
      {isEn ? "BACK TO PROJECTS" : "返回專案列表"}
    </Link>
  );
}

/* -- Project Detail Page -- */
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useLang();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug }) => {
      setProject(getProjectBySlug(slug) ?? null);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return (
      <section className="relative pt-[64px]">
        <div className="pt-[120px] pb-[64px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-display-lg text-on-dark mb-4">LOADING</div>
            <div className="w-12 h-px bg-primary mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="relative pt-[64px]">
        <div className="pt-[120px] pb-[64px] px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-display-lg text-on-dark mb-4">{lang === "en" ? "NOT FOUND" : "找不到專案"}</div>
            <p className="text-body-md text-body mb-6">{lang === "en" ? "The project you're looking for doesn't exist." : "您查詢的專案不存在。"}</p>
            <BackLink lang={lang} />
          </div>
        </div>
      </section>
    );
  }

  const content = lang === "en" ? project.en : project.zh;
  const isEn = lang === "en";

  return (
    <section className="relative pt-[64px]">
      {/* Hero image strip */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <img src={project.image} alt={content.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <BackLink lang={lang} />
            <div className="mt-4">
              <span className="text-utility-xs text-primary tracking-wider font-bold">{project.category}</span>
              <h1 className="text-display-xl text-on-dark mt-1 leading-tight">{content.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-canvas px-6">
        <div className="max-w-3xl mx-auto pt-8 pb-16">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="badge-tag">{tag}</span>
            ))}
          </div>

          {/* Description */}
          <p className="text-heading-lg text-ink leading-relaxed mb-10">{content.desc}</p>

          {/* Divider */}
          <div className="h-px bg-hairline mb-10" />

          {/* Key Points */}
          {content.summary && (
            <div className="mb-10">
              <h2 className="text-heading-md text-ink mb-4">{isEn ? "KEY POINTS" : "重點"}</h2>
              <ul className="space-y-3">
                {content.summary.map((s, i) => (
                  <li key={i} className="flex gap-4 text-body-md text-body">
                    <span className="text-primary mt-1.5 shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <rect width="10" height="10" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Body */}
          {content.body && (
            <div className="space-y-5">
              {content.body.map((paragraph, i) => (
                <p key={i} className="text-body-md text-body leading-relaxed">{paragraph}</p>
              ))}
            </div>
          )}

          {/* Meta line */}
          {content.meta && (
            <div className="mt-10 pt-6 border-t border-hairline text-caption-xs text-primary/70 tracking-wider uppercase font-bold">
              {content.meta}
            </div>
          )}

          {/* PDF link */}
          {project.pdf && (
            <div className="mt-8 pt-6 border-t border-hairline">
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary inline-flex"
              >
                {isEn ? "VIEW PDF DOCUMENT" : "查看 PDF 文件"}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* CTA strip */}
      <section className="cta-strip-dark text-center">
        <div className="max-w-content mx-auto">
          <h2 className="text-heading-xl mb-4">{isEn ? "INTERESTED IN THIS PROJECT?" : "對此專案感興趣？"}</h2>
          <p className="text-body-md text-on-dark-mute max-w-xl mx-auto mb-6">
            {isEn
              ? "Let's discuss how we can collaborate on similar Digital Twin or Embodied AI projects."
              : "讓我們討論如何在數位孿生或具身智能專案上合作。"}
          </p>
          <Link href="/contact">
            <button className="button-primary text-button-md">{isEn ? "GET IN TOUCH" : "聯繫我"}</button>
          </Link>
        </div>
      </section>
    </section>
  );
}
