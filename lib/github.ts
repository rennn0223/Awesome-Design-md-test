const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

async function getFileContent(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return atob(data.content);
}

export async function getFilePathSha(filePath: string): Promise<string | null> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.sha;
}

export async function readDataFile(filePath: string): Promise<string | null> {
  return getFileContent(filePath);
}

export async function writeDataFile(
  filePath: string,
  content: string,
  commitMessage: string
): Promise<{ ok: boolean; error?: string }> {
  const sha = await getFilePathSha(filePath);
  const isCreate = !sha;

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: btoa(content),
        ...(isCreate ? {} : { sha }),
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, error: err };
  }
  return { ok: true };
}

export async function listDataFiles(): Promise<
  { name: string; path: string; type: "file" | "dir" }[]
> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/data?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data
    .filter((f: any) => f.type === "file" && /\.(json|ts|yaml|yml|md|txt)$/i.test(f.name))
    .map((f: any) => ({ name: f.name, path: f.path, type: f.type }));
}
