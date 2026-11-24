import { NextResponse } from "next/server";
import { listMessages } from "@/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Read inbox. Disabled unless ADMIN_TOKEN is set; pass it as ?token=... */
export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  const given = new URL(req.url).searchParams.get("token");
  if (!token || given !== token) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.json(await listMessages());
}
