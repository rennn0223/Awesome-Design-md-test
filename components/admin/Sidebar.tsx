"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface FileItem {
  name: string;
  path: string;
}

export default function Sidebar({
  files,
  currentFile,
  saving,
  onSave,
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  onLogout,
  onRefresh,
}: {
  files: FileItem[];
  currentFile: string | null;
  saving: boolean;
  onSave: () => void;
  onSelectFile: (f: FileItem) => void;
  onCreateFile: (name: string) => void;
  onDeleteFile: (path: string) => void;
  onLogout: () => void;
  onRefresh: () => void;
}) {
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  return (
    <aside className="w-64 min-h-screen bg-surface-dark border-r border-hairline-strong flex flex-col">
      {/* Title */}
      <div className="p-4 border-b border-hairline-strong">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-primary" />
          <h2 className="text-heading-sm text-on-dark">CMS ADMIN</h2>
        </div>
        <p className="text-caption-xs text-on-dark-mute ml-6">Awesome-Design-md-test</p>
      </div>

      {/* Files */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption-xs text-ash uppercase">Data Files</span>
          <button onClick={onRefresh} className="text-ash hover:text-on-dark transition-colors text-caption-xs">
            刷新
          </button>
        </div>

        <div className="space-y-0.5">
          {files.map((f) => (
            <div key={f.path} className="group flex items-center gap-2">
              <button
                onClick={() => onSelectFile(f)}
                className={`flex-1 text-left text-body-sm py-1.5 px-2 rounded-sm truncate transition-colors ${
                  currentFile === f.path
                    ? "bg-primary-dark text-on-primary"
                    : "text-on-dark-mute hover:text-on-dark hover:bg-surface-elevated"
                }`}
              >
                {f.name}
              </button>
              <button
                onClick={() => onDeleteFile(f.path)}
                className="opacity-0 group-hover:opacity-100 text-error hover:text-error-bright p-1 text-caption-xs transition-opacity"
              >
                &#x2715;
              </button>
            </div>
          ))}
        </div>

        {/* New file */}
        {showNewFile ? (
          <div className="mt-2">
            <input
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="新檔案名稱"
              className="w-full px-2 py-1.5 bg-surface-elevated text-on-dark text-body-sm rounded-sm border border-hairline focus:border-primary outline-none"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && newFileName) {
                  onCreateFile(newFileName);
                  setShowNewFile(false);
                  setNewFileName("");
                }
                if (e.key === "Escape") setShowNewFile(false);
              }}
            />
            <button
              onClick={() => setShowNewFile(false)}
              className="text-caption-xs text-ash hover:text-on-dark mt-1"
            >
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowNewFile(true)}
            className="mt-3 w-full py-1.5 text-body-sm text-primary border border-primary rounded-sm hover:bg-primary-dark hover:text-on-primary transition-colors"
          >
            + 新增檔案
          </button>
        )}
      </div>

      {/* Save + Logout */}
      <div className="p-3 border-t border-hairline-strong space-y-2">
        <button
          onClick={onSave}
          disabled={saving || !currentFile}
          className="w-full py-2 bg-primary text-on-primary text-button-sm rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "儲存中..." : "儲存並推送"}
        </button>
        <button
          onClick={onLogout}
          className="w-full py-1.5 text-caption-xs text-ash hover:text-on-dark transition-colors"
        >
          登出
        </button>
      </div>
    </aside>
  );
}
