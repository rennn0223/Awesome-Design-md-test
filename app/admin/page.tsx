"use client";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/admin/Sidebar";
import DataEditor from "@/components/admin/DataEditor";

type Page = "login" | "files" | "edit";

export default function AdminPage() {
  const [page, setPage] = useState<Page>("login");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [files, setFiles] = useState<{ name: string; path: string }[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  // Check auth on mount
  useEffect(() => {
    fetch("/admin/api/auth").then((r) => {
      setLoading(r.ok ? false : true);
      if (r.ok) setPage("files");
      else setPage("login");
    });
  }, []);

  // Show toast
  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/admin/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPage("files");
      setPassword("");
      setErrorMsg("");
    } else {
      setErrorMsg("密碼錯誤");
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/admin/api/login", { method: "DELETE" });
    setPage("login");
    setCurrentFile(null);
  };

  // Load file list
  const loadFiles = async () => {
    const res = await fetch("/admin/api/data/files");
    if (res.ok) {
      const data = await res.json();
      setFiles(data);
    }
  };

  // Load file content
  const loadFile = async (path: string) => {
    const res = await fetch(`/admin/api/data/file?path=${encodeURIComponent(path)}`);
    if (res.ok) {
      const text = await res.text();
      setFileContent(text);
      setCurrentFile(path);
      setPage("edit");
    }
  };

  // Save file
  const handleSave = async () => {
    if (!currentFile) return;
    setSaving(true);
    const res = await fetch("/admin/api/data/file", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: currentFile,
        content: fileContent,
        message: `Update ${currentFile} via CMS`,
      }),
    });
    setSaving(false);
    if (res.ok) {
      showToast("已儲存並推送到 GitHub");
      await loadFiles();
    } else {
      const err = await res.json();
      showToast(err.error || "儲存失敗", "err");
    }
  };

  // Create new file
  const handleCreate = (name: string) => {
    const path = `data/${name}`;
    setCurrentFile(path);
    setFileContent("{}\n");
    setPage("edit");
  };

  // Delete file
  const handleDelete = async (path: string) => {
    if (!confirm(`確定要刪除 ${path}？`)) return;
    const res = await fetch(`/admin/api/data/file?path=${encodeURIComponent(path)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showToast("已刪除");
      await loadFiles();
    } else {
      showToast("刪除失敗", "err");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black">載入中...</div>;
  if (page === "login") return <LoginPage password={password} setPassword={setPassword} errorMsg={errorMsg} onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-black text-on-dark flex">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-sm text-body-sm ${
              toast.type === "ok" ? "bg-success-deep text-on-dark" : "bg-error text-on-dark"
            }`}
          >
            {toast.msg}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        files={files}
        currentFile={currentFile}
        saving={saving}
        onSelectFile={(f) => {
          loadFile(f.path);
        }}
        onCreateFile={handleCreate}
        onDeleteFile={handleDelete}
        onSave={handleSave}
        onLogout={handleLogout}
        onRefresh={() => loadFiles()}
      />

      {/* Editor */}
      {page === "edit" && currentFile && (
        <DataEditor
          file={currentFile}
          content={fileContent}
          setContent={setFileContent}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}

function LoginPage({
  password,
  setPassword,
  errorMsg,
  onLogin,
}: {
  password: string;
  setPassword: (v: string) => void;
  errorMsg: string;
  onLogin: (e: React.FormEvent) => void;
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Background corner squares */}
      <div className="absolute top-0 left-0 w-3 h-3 bg-primary" />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary" />

      <form onSubmit={onLogin} className="w-80">
        <h1 className="text-display-lg text-on-dark text-center mb-8">ADMIN</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="輸入管理員密碼"
          className="w-full px-4 py-3 bg-canvas text-ink rounded-sm text-body-md mb-4 border border-hairline focus:border-primary outline-none"
          autoFocus
        />
        {errorMsg && <p className="text-error text-body-sm mb-4">{errorMsg}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-primary text-on-primary text-button-md rounded-sm hover:bg-primary-dark transition-colors"
        >
          登入
        </button>
      </form>
    </div>
  );
}
