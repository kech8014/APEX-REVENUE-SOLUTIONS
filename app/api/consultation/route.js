import { NextResponse } from "next/server";

const MAX = 4000;
const clean = (v) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const lead = {
    name: clean(body.name),
    title: clean(body.title),
    organization: clean(body.organization),
    size: clean(body.size),
    email: clean(body.email),
    phone: clean(body.phone),
    specialty: clean(body.specialty),
    services: Array.isArray(body.services) ? body.services.map(clean).slice(0, 20) : [],
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.organization || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  // Submissions are written to the server log until an email or CRM
  // integration is connected (e.g. forward `lead` to your inbox here).
  console.log("[consultation-request]", JSON.stringify(lead));

  return NextResponse.json({ ok: true });
}
