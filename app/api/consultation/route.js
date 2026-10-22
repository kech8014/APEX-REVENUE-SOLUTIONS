import { NextResponse } from "next/server";
import { contact } from "@/lib/data";

const MAX = 4000;
const clean = (v) => (typeof v === "string" ? v.trim().slice(0, MAX) : "");
const escape = (v) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Delivers the request to the team inbox through Resend (resend.com).
// Reply-To is the visitor, so hitting "Reply" in team@ answers them directly.
async function sendEmail(lead) {
  const rows = [
    ["Name", lead.name],
    ["Role / title", lead.title],
    ["Practice / organization", lead.organization],
    ["Practice size", lead.size],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Specialty", lead.specialty],
    ["Services of interest", lead.services.join(", ")],
    ["Message", lead.message],
  ].filter(([, v]) => v);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:Arial,sans-serif">New consultation request</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`
    )
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || `APEX Website <website@apexrevsolutions.com>`,
      to: [process.env.CONTACT_TO_EMAIL || contact.email],
      reply_to: lead.email,
      subject: `Consultation request — ${lead.organization}`,
      text,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
}

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
    services: Array.isArray(body.services) ? body.services.map(clean).filter(Boolean).slice(0, 20) : [],
    message: clean(body.message),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !lead.organization || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  // Always keep a copy in the server log so no request is lost.
  console.log("[consultation-request]", JSON.stringify(lead));

  if (!process.env.RESEND_API_KEY) {
    console.warn("[consultation-request] RESEND_API_KEY is not set; email not sent.");
    return NextResponse.json({ ok: true });
  }

  try {
    await sendEmail(lead);
  } catch (err) {
    console.error("[consultation-request] email failed", err);
    return NextResponse.json({ error: "Could not send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
