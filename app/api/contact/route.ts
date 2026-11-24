import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RATE_LIMIT = 5; // messages
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes, per IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > 16 * 1024) {
    return NextResponse.json({ ok: false, message: "Message too large." }, { status: 413 });
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    /* fall through to validation errors */
  }

  // Honeypot: real visitors never fill this hidden field.
  if (payload.website) {
    return NextResponse.json({ ok: true, message: "Thanks! Your message has been sent." });
  }

  const name = str(payload.name);
  const email = str(payload.email);
  const subject = str(payload.subject);
  const message = str(payload.message);

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 80) errors.name = "Please enter your name (2–80 characters).";
  if (!EMAIL_RE.test(email) || email.length > 120) errors.email = "Please enter a valid email address.";
  if (subject.length < 3 || subject.length > 120) errors.subject = "Please add a subject (3–120 characters).";
  if (message.length < 10 || message.length > 3000) errors.message = "Your message should be 10–3000 characters.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many messages. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    await saveMessage({ name, email, subject, message });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not send your message. Please email me directly." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, message: "Thanks! Your message has been sent." }, { status: 201 });
}
