import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin-auth");
  return auth ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false }, { status: 401 });
}
