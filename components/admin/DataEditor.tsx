"use client";
import { useState } from "react";

type ViewMode = "json" | "visual";

export default function DataEditor({
  file,
  content,
  setContent,
  onSave,
  saving,
}: {
  file: string;
  content: string;
  setContent: (v: string) => void;
  onSave: () => void;
  saving: boolean;
}) {
  const [mode, setMode] = useState<ViewMode>("visual");

  const isJson = file.endsWith(".json");
  const isTimeline = file.includes("timeline");
  const isBlog = file.includes("blog");

  const viewType = isTimeline ? "timeline" : isBlog ? "blog" : "json";

  const preview = mode === "visual" && (isTimeline || isBlog)
    ? generatePreview(viewType, content)
    : null;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-hairline-strong bg-surface-elevated">
        <div className="flex items-center gap-3">
          <h2 className="text-heading-sm text-on-dark">{file}</h2>
          {isJson && (
            <div className="flex gap-1">
              <button
                onClick={() => setMode("visual")}
                className={`px-2 py-1 text-caption-xs rounded-sm transition-colors ${
                  mode === "visual" ? "bg-primary text-on-primary" : "text-ash hover:text-on-dark"
                }`}
              >
                視覺化
              </button>
              <button
                onClick={() => setMode("json")}
                className={`px-2 py-1 text-caption-xs rounded-sm transition-colors ${
                  mode === "json" ? "bg-primary text-on-primary" : "text-ash hover:text-on-dark"
                }`}
              >
                JSON
              </button>
            </div>
          )}
        </div>
        <span className="text-caption-xs text-ash">{file.split("/").pop()}</span>
      </div>

      {/* Editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-hairline-strong">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className={`flex-1 w-full p-6 bg-surface-dark text-on-dark-mute resize-none outline-none ${
              mode === "visual" ? "hidden" : "block"
            } font-mono text-body-sm leading-relaxed`}
            placeholder="編輯檔案內容..."
          />
        </div>

        {/* Visual preview */}
        {preview && (
          <div className="w-[480px] overflow-y-auto bg-canvas border-l border-hairline">
            {preview}
          </div>
        )}
      </div>
    </div>
  );
}

function generatePreview(viewType: "timeline" | "blog" | "json", content: string) {
  try {
    const data = JSON.parse(content);

    if (viewType === "timeline") {
      return (
        <div className="p-6">
          <h3 className="text-display-lg text-ink mb-6">Timeline Preview</h3>
          <div className="relative pl-4">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-hairline" />
            {(data as any[]).map((item, i) => (
              <div key={i} className="relative pl-4 pb-6 border-l border-hairline last:border-transparent">
                <div className="absolute left-[-6px] top-0.5 w-2 h-2 rounded-full bg-primary border border-hairline" />
                <div className="font-mono text-primary-dark text-xs mb-2">{item.date}</div>
                <h4 className="text-heading-md text-ink mb-1">{item.en?.title}</h4>
                <p className="text-body-sm text-ink leading-relaxed">{item.en?.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (viewType === "blog") {
      return (
        <div className="p-6">
          <h3 className="text-display-lg text-ink mb-6">Blog Preview</h3>
          <div className="space-y-6">
            {(data as any[]).map((post, i) => (
              <div key={i} className="pb-6 border-b border-hairline last:border-transparent">
                <div className="flex gap-2 mb-2">
                  {post.tags.map((tag: string, j: number) => (
                    <span key={j} className="text-caption-xs text-primary border border-primary px-2 py-0.5 rounded-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="text-heading-md text-ink mb-1">{post.en?.title}</h4>
                <p className="text-body-sm text-ink mb-2">{post.en?.excerpt}</p>
                <p className="text-caption-xs text-ash">{post.date} · {post.readTime}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h3 className="text-display-lg text-ink mb-6">JSON Preview</h3>
        <pre className="text-body-sm text-ink whitespace-pre-wrap break-all font-mono bg-surface-soft p-4 rounded-sm overflow-y-auto max-h-[70vh]">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  } catch {
    return <div className="p-6 text-error text-body-sm">無法解析 JSON 用於預覽</div>;
  }
}
