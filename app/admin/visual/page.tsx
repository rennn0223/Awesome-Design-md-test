"use client";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type ContentType = "project" | "timeline" | "blog" | "certificate";

/* -- Icon map for certificate preview -- */
const CERT_ICONS: Record<string, React.ReactNode> = {
  NVIDIA_DLI: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  LANGUAGE_PRO: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  HARDWARE_OP: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="1" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
};

/* -- Preview Cards -- */
function ProjectPreview({ data }: { data: Record<string, any> }) {
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-sm p-5 text-[#e0e0e0]">
      {data.image && (
        <div className="h-32 bg-white/5 rounded-sm mb-4 overflow-hidden">
          <img src={data.image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {data.tags?.split(",").map((t: string) => (
          <span key={t} className="px-2 py-0.5 bg-[#76b900]/20 text-[#76b900] text-[10px] rounded-sm font-mono">{t.trim()}</span>
        ))}
      </div>
      <div className="text-[10px] text-[#76b900]/70 font-mono mb-1 uppercase tracking-wider">{data.category}</div>
      <h3 className="text-[15px] text-white font-semibold mb-1">{data.en_title}</h3>
      <p className="text-[13px] text-[#888] mb-3">{data.zh_title}</p>
      <p className="text-[13px] text-[#888] leading-relaxed">{data.en_desc}</p>
    </div>
  );
}

function TimelinePreview({ data }: { data: Record<string, any> }) {
  return (
    <div className="relative pl-8 pb-6">
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-[#76b900]" />
      <div className="absolute left-[5px] top-3 w-px h-full bg-white/10" />
      <div className="bg-[#1a1a1a] border border-white/10 rounded-sm p-5 text-[#e0e0e0]">
        <span className="font-mono text-[11px] text-[#76b900] font-bold tracking-wider">{data.date}</span>
        <h3 className="text-[15px] text-white font-semibold mt-2 mb-2">{data.en_title}</h3>
        <p className="text-[13px] text-[#888] leading-relaxed">{data.en_desc}</p>
      </div>
    </div>
  );
}

function BlogPreview({ data }: { data: Record<string, any> }) {
  return (
    <div className="bg-[#f5f5f5] border border-gray-200 rounded-sm p-5 text-gray-800">
      <div className="flex flex-wrap gap-1.5 mb-2">
        {data.tags?.split(",").map((t: string) => (
          <span key={t} className="px-2 py-0.5 bg-[#76b900]/15 text-[#76b900] text-[11px] rounded-sm">{t.trim()}</span>
        ))}
      </div>
      <div className="text-[11px] text-gray-500 mb-2">{data.date} &middot; {data.read_time || "5 min"}</div>
      <h3 className="text-[15px] text-gray-900 font-semibold mb-1">{data.en_title}</h3>
      <p className="text-[13px] text-gray-600 leading-relaxed">{data.en_excerpt}</p>
    </div>
  );
}

function CertificatePreview({ data }: { data: Record<string, any> }) {
  const icon = CERT_ICONS[data.tag] || CERT_ICONS.NVIDIA_DLI;
  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#76b900]/80">{icon}</span>
          <span className="px-2 py-0.5 rounded-sm text-[11px] font-bold text-white" style={{ backgroundColor: data.tag_color || "#76b900" }}>{data.tag}</span>
        </div>
        <h3 className="text-[15px] text-white font-semibold mb-2">{data.title}</h3>
        <p className="text-[13px] text-[#888] leading-relaxed mb-3">{data.en_desc}</p>
        <div className="flex gap-2">
          {data.type === "link" && data.href && (
            <a href={data.href} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 border border-white/20 text-[13px] text-[#888] rounded-sm hover:border-[#76b900] transition-colors">VERIFY</a>
          )}
          {data.type === "preview" && data.image && (
            <a href={data.image} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-[#76b900] text-white text-[13px] rounded-sm hover:bg-[#6aa800] transition-colors">PREVIEW</a>
          )}
        </div>
      </div>
    </div>
  );
}

/* -- Form Components -- */
function TextField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none resize-none"
      />
    </div>
  );
}

function ArrayField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label} (comma-separated)</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none"
      />
    </div>
  );
}

function TagField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const options = ["DIGITAL-TWIN", "OMNIVERSE", "EDGE-AI", "INDUSTRIAL", "RESEARCH", "AUTONOMOUS", "ROS2", "GTC2026", "CONFERENCE", "NETWORKING", "SENSORS", "LANGUAGE_PRO", "HARDWARE_OP"];
  const selected = value.split(",").map((t: string) => t.trim()).filter(Boolean);
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => {
              const next = selected.includes(opt)
                ? selected.filter((t: string) => t !== opt).join(",")
                : [...selected, opt].join(",");
              onChange(next);
            }}
            className={`px-2.5 py-1 text-[11px] rounded-sm font-mono transition-colors ${
              selected.includes(opt) ? "bg-[#76b900] text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function TagColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const colors = ["#76b900", "#89cf00", "#5a8d00", "#4a7a00", "#3d6600"];
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">Tag Color</label>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`w-8 h-8 rounded-sm border-2 transition-all ${value === c ? "border-white scale-110" : "border-transparent hover:border-white/30"}`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none appearance-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function SummaryArrayField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const items = value.split("||").map((s: string) => s.trim()).filter(Boolean);
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label} (use || to separate items)</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-[11px] text-[#76b900]/50 w-6 text-right pt-2">{i + 1}</span>
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next.join("||"));
              }}
              className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none"
            />
            <button type="button" onClick={() => onChange(items.filter((_: string, j: number) => j !== i).join("||"))} className="text-white/30 hover:text-white/60 text-lg pt-0">x</button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, ""].join("||"))} className="text-[11px] text-[#76b900]/60 hover:text-[#76b900] font-mono">+ ADD ITEM</button>
      </div>
    </div>
  );
}

function BodyArrayField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const items = value.split("||").map((s: string) => s.trim()).filter(Boolean);
  return (
    <div>
      <label className="block text-[11px] text-[#76b900]/70 font-mono tracking-wider mb-1.5 uppercase">{label} (use || to separate paragraphs)</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-[11px] text-[#76b900]/50 w-6 text-right pt-2">{i + 1}</span>
            <textarea
              value={item}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next.join("||"));
              }}
              rows={3}
              className="flex-1 px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-sm text-body-sm focus:border-[#76b900] outline-none resize-none"
            />
            <button type="button" onClick={() => onChange(items.filter((_: string, j: number) => j !== i).join("||"))} className="text-white/30 hover:text-white/60 text-lg pt-0">x</button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, ""].join("||"))} className="text-[11px] text-[#76b900]/60 hover:text-[#76b900] font-mono">+ ADD PARAGRAPH</button>
      </div>
    </div>
  );
}

/* -- Main Page -- */
export default function VisualEditor() {
  const [type, setType] = useState<ContentType>("project");
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  /* -- Form state by type -- */
  const [form, setForm] = useState<Record<string, string>>({});

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  /* -- Preview -- */
  const preview = type === "project" ? <ProjectPreview data={form} /> :
    type === "timeline" ? <TimelinePreview data={form} /> :
    type === "blog" ? <BlogPreview data={form} /> :
    type === "certificate" ? <CertificatePreview data={form} /> : null;

  /* -- Generate JSON -- */
  const generateJSON = () => {
    const item: Record<string, any> = {};

    if (type === "project") {
      item.slug = form.slug || "new-project";
      item.image = form.image || "/assets/new.jpg";
      item.tags = form.tags?.split(",").map((t: string) => t.trim()).filter(Boolean);
      item.category = form.category || "GENERAL";
      item.en = {
        title: form.en_title || "",
        desc: form.en_desc || "",
        summary: form.en_summary?.split("||").map((s: string) => s.trim()).filter(Boolean),
        body: form.en_body?.split("||").map((s: string) => s.trim()).filter(Boolean),
        meta: form.en_meta,
      };
      item.zh = {
        title: form.zh_title || "",
        desc: form.zh_desc || "",
        summary: form.zh_summary?.split("||").map((s: string) => s.trim()).filter(Boolean),
        body: form.zh_body?.split("||").map((s: string) => s.trim()).filter(Boolean),
        meta: form.zh_meta,
      };
    } else if (type === "timeline") {
      item.date = form.date || "2026.06.01";
      item.en = { title: form.en_title || "", desc: form.en_desc || "" };
      item.zh = { title: form.zh_title || "", desc: form.zh_desc || "" };
    } else if (type === "blog") {
      item.slug = form.slug || "new-blog-post";
      item.date = form.date || "2026-06-01";
      item.tags = form.tags?.split(",").map((t: string) => t.trim()).filter(Boolean);
      item.readTime = form.read_time || "5 min";
      item.en = {
        title: form.en_title || "",
        excerpt: form.en_excerpt || "",
        summary: form.en_summary?.split("||").map((s: string) => s.trim()).filter(Boolean),
        body: form.en_body?.split("||").map((s: string) => s.trim()).filter(Boolean),
      };
      item.zh = {
        title: form.zh_title || "",
        excerpt: form.zh_excerpt || "",
        summary: form.zh_summary?.split("||").map((s: string) => s.trim()).filter(Boolean),
        body: form.zh_body?.split("||").map((s: string) => s.trim()).filter(Boolean),
      };
    } else if (type === "certificate") {
      item.tag = form.tag || "NVIDIA_DLI";
      item.tagColor = form.tag_color || "#76b900";
      item.title = form.title || "";
      item.en = form.en_desc || "";
      item.zh = form.zh_desc || "";
      item.href = form.href || "";
      item.btnEn = form.btn_en || "> VERIFY_CERTIFICATE";
      item.btnZh = form.btn_zh || "> 官方系統驗證";
      item.type = form.cert_type as "link" | "preview" || "link";
      if (item.type === "preview" && form.image) item.image = form.image;
    }

    return JSON.stringify(item, null, 2);
  };

  /* -- Update output when form changes -- */
  useEffect(() => {
    setOutput(generateJSON());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, type]);

  /* -- Copy JSON -- */
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* -- Field rendering -- */
  const renderFields = () => {
    if (type === "project") {
      return (
        <>
          <TagField label="Slug" value={form.slug || ""} onChange={(v) => update("slug", v.replace(/\s+/g, "-").toLowerCase())} placeholder="new-project-name" />
          <TextField label="Image URL" value={form.image || ""} onChange={(v) => update("image", v)} placeholder="/assets/new.jpg" />
          <TagField label="Tags" value={form.tags || ""} onChange={(v) => update("tags", v)} placeholder="DIGITAL-TWIN, OMNIVERSE" />
          <TextField label="Category" value={form.category || ""} onChange={(v) => update("category", v.toUpperCase())} placeholder="DIGITAL-TWIN" />

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">ENGLISH</div>
            <TextField label="Title" value={form.en_title || ""} onChange={(v) => update("en_title", v)} placeholder="New Project Title" />
            <TextArea label="Description" value={form.en_desc || ""} onChange={(v) => update("en_desc", v)} placeholder="Short description..." />
            <TextArea label="Meta" value={form.en_meta || ""} onChange={(v) => update("en_meta", v)} placeholder="Role · Tech1 · Tech2" rows={1} />
            <SummaryArrayField label="Key Points (use || to separate)" value={form.en_summary || ""} onChange={(v) => update("en_summary", v)} />
            <BodyArrayField label="Body Paragraphs (use || to separate)" value={form.en_body || ""} onChange={(v) => update("en_body", v)} />
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">中文</div>
            <TextField label="標題" value={form.zh_title || ""} onChange={(v) => update("zh_title", v)} placeholder="新專案標題" />
            <TextArea label="描述" value={form.zh_desc || ""} onChange={(v) => update("zh_desc", v)} placeholder="簡短描述..." />
            <TextArea label="Meta" value={form.zh_meta || ""} onChange={(v) => update("zh_meta", v)} placeholder="角色 · 技術1 · 技術2" rows={1} />
            <SummaryArrayField label="重點 (用 || 分隔)" value={form.zh_summary || ""} onChange={(v) => update("zh_summary", v)} />
            <BodyArrayField label="內文段落 (用 || 分隔)" value={form.zh_body || ""} onChange={(v) => update("zh_body", v)} />
          </div>
        </>
      );
    }

    if (type === "timeline") {
      return (
        <>
          <TextField label="Date" value={form.date || ""} onChange={(v) => update("date", v)} placeholder="2026.06.01" />
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">ENGLISH</div>
            <TextField label="Title" value={form.en_title || ""} onChange={(v) => update("en_title", v)} placeholder="Project Title" />
            <TextArea label="Description" value={form.en_desc || ""} onChange={(v) => update("en_desc", v)} placeholder="Description..." />
          </div>
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">中文</div>
            <TextField label="標題" value={form.zh_title || ""} onChange={(v) => update("zh_title", v)} placeholder="專案標題" />
            <TextArea label="描述" value={form.zh_desc || ""} onChange={(v) => update("zh_desc", v)} placeholder="描述..." />
          </div>
        </>
      );
    }

    if (type === "blog") {
      return (
        <>
          <TextField label="Slug" value={form.slug || ""} onChange={(v) => update("slug", v.replace(/\s+/g, "-").toLowerCase())} placeholder="new-blog-post" />
          <TextField label="Date" value={form.date || ""} onChange={(v) => update("date", v)} placeholder="2026-06-01" />
          <TagField label="Tags" value={form.tags || ""} onChange={(v) => update("tags", v)} placeholder="TAG1, TAG2" />
          <TextField label="Read Time" value={form.read_time || ""} onChange={(v) => update("read_time", v)} placeholder="5 min" />
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">ENGLISH</div>
            <TextField label="Title" value={form.en_title || ""} onChange={(v) => update("en_title", v)} placeholder="Blog Title" />
            <TextField label="Excerpt" value={form.en_excerpt || ""} onChange={(v) => update("en_excerpt", v)} placeholder="Short excerpt..." />
            <SummaryArrayField label="Summary (use || to separate)" value={form.en_summary || ""} onChange={(v) => update("en_summary", v)} />
            <BodyArrayField label="Body (use || to separate)" value={form.en_body || ""} onChange={(v) => update("en_body", v)} />
          </div>
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">中文</div>
            <TextField label="標題" value={form.zh_title || ""} onChange={(v) => update("zh_title", v)} placeholder="文章標題" />
            <TextField label="摘錄" value={form.zh_excerpt || ""} onChange={(v) => update("zh_excerpt", v)} placeholder="短摘錄..." />
            <SummaryArrayField label="摘要 (用 || 分隔)" value={form.zh_summary || ""} onChange={(v) => update("zh_summary", v)} />
            <BodyArrayField label="內文 (用 || 分隔)" value={form.zh_body || ""} onChange={(v) => update("zh_body", v)} />
          </div>
        </>
      );
    }

    if (type === "certificate") {
      return (
        <>
          <SelectField
            label="Type"
            value={form.cert_type || "link"}
            onChange={(v) => update("cert_type", v)}
            options={[{ value: "link", label: "Link (external link)" }, { value: "preview", label: "Preview (PDF document)" }]}
          />
          <TagField label="Tag" value={form.tag || ""} onChange={(v) => update("tag", v)} />
          <TagColorField label="Tag Color" value={form.tag_color || "#76b900"} onChange={(v) => update("tag_color", v)} />
          <TextField label="Title" value={form.title || ""} onChange={(v) => update("title", v)} placeholder="Certificate Title" />
          <TextField label="Link URL" value={form.href || ""} onChange={(v) => update("href", v)} placeholder="https://..." />
          {form.cert_type === "preview" && (
            <TextField label="Image/PDF URL" value={form.image || ""} onChange={(v) => update("image", v)} placeholder="/assets/cert.pdf" />
          )}
          <TextField label="EN Button Text" value={form.btn_en || ""} onChange={(v) => update("btn_en", v)} placeholder="> VERIFY_CERTIFICATE" />
          <TextField label="中文按鈕文字" value={form.btn_zh || ""} onChange={(v) => update("btn_zh", v)} placeholder="> 官方系統驗證" />
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-[12px] text-primary font-bold mb-3 tracking-wider">DESCRIPTION</div>
            <TextArea label="EN" value={form.en_desc || ""} onChange={(v) => update("en_desc", v)} placeholder="English description..." />
          </div>
          <div className="mt-4">
            <TextArea label="中文描述" value={form.zh_desc || ""} onChange={(v) => update("zh_desc", v)} placeholder="中文描述..." />
          </div>
        </>
      );
    }

    return null;
  };

  const typeLabels: Record<ContentType, string> = {
    project: "NEW PROJECT",
    timeline: "NEW TIMELINE",
    blog: "NEW BLOG POST",
    certificate: "NEW CERTIFICATE",
  };

  const typeLabelsZh: Record<ContentType, string> = {
    project: "新專案",
    timeline: "新經歷",
    blog: "新文章",
    certificate: "新認證",
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-black pt-[72px]">
        <div className="max-w-6xl mx-auto px-6 pb-12">
          {/* Title */}
          <div className="mb-8">
            <div className="w-3 h-3 bg-primary mb-3" />
            <h1 className="text-display-lg text-on-dark mb-1">CONTENT EDITOR</h1>
            <p className="text-body-md text-on-dark-mute">Fill in the form below. Preview updates live. Copy JSON when ready.</p>
          </div>

          {/* Type selector */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(Object.keys(typeLabels) as ContentType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-2 text-button-sm font-bold rounded-sm transition-colors ${
                  type === t ? "bg-[#76b900] text-black" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60"
                }`}
              >
                {typeLabels[t]}
              </button>
            ))}
          </div>

          {/* Active type label */}
          <div className="text-utility-xs text-primary/50 tracking-[4px] mb-6">{typeLabelsZh[type]}</div>

          {/* Two-column layout: form | preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <div className="space-y-1">{renderFields()}</div>
            </div>

            {/* Preview */}
            <div>
              <div className="text-[11px] text-primary/50 tracking-wider mb-4 font-mono">PREVIEW</div>
              <div className="sticky top-24">
                {preview}
              </div>
            </div>
          </div>

          {/* JSON Output */}
          <div className="mt-12">
            <button
              type="button"
              onClick={() => setShowOutput(!showOutput)}
              className="flex items-center gap-2 text-button-sm text-primary hover:text-[#96d900] transition-colors"
            >
              <span>{showOutput ? "▲" : "▼"}</span>
              {showOutput ? "HIDE JSON" : "VIEW JSON"}
            </button>
            {showOutput && (
              <div className="mt-4 relative">
                <pre className="bg-white/[0.03] border border-white/10 rounded-sm p-4 text-[12px] text-white/70 overflow-auto max-h-[400px] font-mono leading-relaxed">
                  {output}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-[#76b900] text-black text-button-sm rounded-sm hover:bg-[#96d900] transition-colors"
                >
                  {copied ? "COPIED!" : "COPY"}
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-12 p-5 bg-white/[0.02] border border-white/5 rounded-sm">
            <div className="text-[11px] text-primary/50 tracking-wider font-mono mb-3">USAGE</div>
            <ul className="text-body-sm text-on-dark-mute space-y-2 leading-relaxed">
              <li>1. 選擇內容類型</li>
              <li>2. 填寫表單，右側即時預覽</li>
              <li>3. 點開 JSON 複製</li>
              <li>4. 貼到對應的 <code className="px-1.5 py-0.5 bg-white/5 text-[#76b900] rounded-xs text-[11px]">data/projects.json</code> 或 <code className="px-1.5 py-0.5 bg-white/5 text-[#76b900] rounded-xs text-[11px]">data/timeline.json</code> 等檔案</li>
              <li className="text-[11px] text-on-dark-mute/50 mt-4">Note: 專案的 slug 欄位以 dash 分隔空格，會自動轉小寫。Tags 用 Tag 選取器選擇。</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
