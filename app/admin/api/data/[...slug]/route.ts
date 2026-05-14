import { NextRequest, NextResponse } from "next/server";
import { listDataFiles, readDataFile, writeDataFile } from "@/lib/github";

// GET /admin/api/data/files
export async function GET(req: NextRequest) {
  const [, action] = req.nextUrl.pathname.split("/admin/api/data/") || [];
  if (action === "files") {
    const files = await listDataFiles();
    return NextResponse.json(files);
  }

  // GET /admin/api/data/file?path=...
  if (action === "file") {
    const path = req.nextUrl.searchParams.get("path");
    if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });
    const content = await readDataFile(path);
    if (!content) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

// POST /admin/api/data/file - write file
export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await writeDataFile(body.path, body.content, body.message);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /admin/api/data/file?path=...
export async function DELETE(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) return NextResponse.json({ error: "Missing path" }, { status: 400 });

  const sha = await import("@/lib/github").then((m) =>
    (m as typeof import("@/lib/github")).getFilePathSha?.(path)
  );

  if (!sha) return NextResponse.json({ error: "File not found" }, { status: 404 });

  const res = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPO}/contents/${path}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Delete ${path} via CMS`,
        sha,
        branch: process.env.GITHUB_BRANCH || "main",
      }),
    }
  );

  if (!res.ok) return NextResponse.json({ error: await res.text() }, { status: 500 });
  return NextResponse.json({ ok: true });
}
