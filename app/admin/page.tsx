"use client";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/admin/Sidebar";
import DataEditor from "@/components/admin/DataEditor";

type Page = "login" | "files" | "edit" | "loading";

export default function AdminPage() {
  const [page, setPage] = useState<Page>("loading");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [files, setFiles] = useState<{ name: string; path: string }[]>([]);
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const res = await fetch("/admin/api/auth");
        if (cancelled) return;
        if (res.ok) {
          setPage("files");
        } else {
          setPage("login");
        }
      } catch {
        if (cancelled) return;
        setPage("login");
      }
    };

    checkAuth();
    return () => { cancelled = true; };
  }, []);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
    } catch {
      setErrorMsg("連線失敗，請重試");
    }
  };

  const handleLogout = async () => {
    await fetch("/admin/api/login", { method: "DELETE" });
    setPage("login");
    setCurrentFile(null);
  };

  const loadFiles = async () => {
    try {
      const res = await fetch("/admin/api/data/files");
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch {
      showToast("無法讀取檔案列表", "err");
    }
  };

  const loadFile = async (path: string) => {
    try {
      const res = await fetch(`/admin/api/data/file?path=${encodeURIComponent(path)}`);
      if (res.ok) {
        const text = await res.text();
        setFileContent(text);
        setCurrentFile(path);
        setPage("edit");
      } else {
        showToast("無法讀取檔案", "err");
      }
    } catch {
      showToast("無法讀取檔案", "err");
    }
  };

  const handleSave = async () => {
    if (!currentFile) return;
    setSaving(true);
    try {
      const res = await fetch("/admin/api/data/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: currentFile,
          content: fileContent,
          message: `Update ${currentFile} via CMS`,
        }),
      });
      if (res.ok) {
        showToast("已儲存並推送到 GitHub");
        await loadFiles();
      } else {
        const err = await res.json();
        showToast(err.error || "儲存失敗", "err");
      }
    } catch {
      showToast("儲存失敗", "err");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = (name: string) => {
    const path = `data/${name}`;
    setCurrentFile(path);
    setFileContent("{}\n");
    setPage("edit");
  };

  const handleDelete = async (path: string) => {
    if (!confirm(`確定要刪除 ${path}？`)) return;
    try {
      const res = await fetch(`/admin/api/data/file?path=${encodeURIComponent(path)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToast("已刪除");
        await loadFiles();
      } else {
        showToast("刪除失敗", "err");
      }
    } catch {
      showToast("刪除失敗", "err");
    }
  };

  // Toast
  if (toast) {
    return (
      <div className="min-h-screen bg-black">
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-sm text-body-sm ${
              toast.type === "ok" ? "bg-success-deep text-on-dark" : "bg-error text-on-dark"
            }`}
          >
            {toast.msg}
          </div>
        </div>
        <LoginPage password={password} setPassword={setPassword} errorMsg={errorMsg} onLogin={handleLogin} />
      </div>
    );
  }

  // Login page
  if (page === "login") return <LoginPage password={password} setPassword={setPassword} errorMsg={errorMsg} onLogin={handleLogin} />;

  // Loading state
  if (page === "loading") return <div className="min-h-screen bg-black flex items-center justify-center">載入中...</div>;

  // Main CMS
  return (
    <div className="min-h-screen bg-black text-on-dark flex">
      <Sidebar
        files={files}
        currentFile={currentFile}
        saving={saving}
        onSave={handleSave}
        onSelectFile={(f) => loadFile(f.path)}
        onCreateFile={handleCreate}
        onDeleteFile={handleDelete}
        onLogout={handleLogout}
        onRefresh={loadFiles}
      />

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
