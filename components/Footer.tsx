"use client";
import { useLang } from "@/app/providers";

const LINK_COLUMNS = [
  {
    headerEn: "NAVIGATION",
    headerZh: "導航",
    links: [
      { labelEn: "HOME", labelZh: "首頁", href: "/" },
      { labelEn: "PROJECTS", labelZh: "專案", href: "/projects" },
      { labelEn: "TIMELINE", labelZh: "時間軸", href: "/timeline" },
      { labelEn: "BLOG", labelZh: "部落格", href: "/blog" },
    ],
  },
  {
    headerEn: "RESOURCES",
    headerZh: "資源",
    links: [
      { labelEn: "CERTIFICATES", labelZh: "認證", href: "/certificates" },
      { labelEn: "GTC 2026", labelZh: "GTC 2026", href: "/projects" },
      { labelEn: "NVIDIA DLI", labelZh: "NVIDIA DLI", href: "https://learn.nvidia.com/certificates" },
      { labelEn: "Omniverse", labelZh: "Omniverse", href: "https://omniverse.nvidia.com" },
    ],
  },
  {
    headerEn: "CONNECT",
    headerZh: "聯絡",
    links: [
      { labelEn: "EMAIL", labelZh: "Email", href: "mailto:ren910223@gmail.com" },
      { labelEn: "LINKEDIN", labelZh: "LinkedIn", href: "https://www.linkedin.com/in/rennn223" },
      { labelEn: "GITHUB", labelZh: "GitHub", href: "https://github.com/rennn0223" },
      { labelEn: "BLINQ", labelZh: "Blinq", href: "https://s.blinq.me/cmnyeijmz02j70bs6uy3t9kdz?bs=icl" },
    ],
  },
];

export default function Footer() {
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <footer className="footer-section" role="contentinfo">
      <div className="max-w-content mx-auto">
        {/* Top: 6-col equivalent link grid (3 cols for us) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 mb-12">
          {LINK_COLUMNS.map((col) => (
            <div key={col.headerEn}>
              <div className="text-body-strong text-on-dark mb-4">{isEn ? col.headerEn : col.headerZh}</div>
              <nav className="space-y-2">
                {col.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block text-body-sm text-on-dark-mute hover:text-on-dark transition-colors"
                  >
                    {isEn ? link.labelEn : link.labelZh}
                  </a>
                ))}
              </nav>
            </div>
          ))}

          {/* Brand column */}
          <div>
            <div className="text-body-strong text-on-dark mb-4">LIN<span className="text-primary">.</span></div>
            <p className="text-body-sm text-on-dark-mute leading-relaxed mb-4">
              {isEn
                ? "Systems Architect specializing in Digital Twins & Embodied AI Infrastructure. Building the bridge between physical and virtual worlds."
                : "系統架構師，專注於數位孿生與具身智能基礎設施。建構實體與虛擬世界之間的橋樑。"}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/rennn223",
                  path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/rennn0223",
                  path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-hairline-strong text-on-dark-mute hover:text-on-dark hover:border-on-dark transition-colors rounded-none"
                  aria-label={social.label}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-hairline-strong mb-6" />

        {/* Bottom: legal fine-print */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-utility-xs text-mute">
            {isEn
              ? `© ${new Date().getFullYear()} LIN, SHU-JEN. ALL RIGHTS RESERVED.`
              : `© ${new Date().getFullYear()} LIN, SHU-JEN. 保留所有權利。`}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-utility-xs text-mute">
            <span>{isEn ? "DESIGNED PER NVIDIA DESIGN SYSTEM" : "依 NVIDIA 設計系統設計"}</span>
            <span className="text-primary/40">·</span>
            <span>DESIGN.md v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
