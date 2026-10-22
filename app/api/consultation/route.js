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

// Sends the visitor a thank-you note from the team inbox. Replies to it go
// straight to team@.
async function sendThankYou(lead) {
  const team = process.env.CONTACT_TO_EMAIL || contact.email;
  const first = lead.name.split(/\s+/)[0];
  const text = `Hi ${first},

Thank you for contacting APEX REVENUE SOLUTIONS. We've received your consultation request for ${lead.organization}, and a member of our team will reach out within one business day to arrange a time to talk.

If you have anything to add in the meantime, simply reply to this email or call us at ${contact.phone}.

Please don't include patient health information in email.

Kind regards,
The APEX REVENUE SOLUTIONS Team
${contact.phone} · ${team}
${contact.address}`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#2e2e2e;max-width:560px">
<p>Hi ${escape(first)},</p>
<p>Thank you for contacting <strong>APEX REVENUE SOLUTIONS</strong>. We've received your consultation request for <strong>${escape(lead.organization)}</strong>, and a member of our team will reach out within one business day to arrange a time to talk.</p>
<p>If you have anything to add in the meantime, simply reply to this email or call us at <a href="${contact.phoneHref}" style="color:#0a0a0a">${contact.phone}</a>.</p>
<p style="color:#6b6b6b;font-size:13px">Please don't include patient health information in email.</p>
<p>Kind regards,<br><strong>The APEX REVENUE SOLUTIONS Team</strong></p>
<p style="color:#6b6b6b;font-size:13px;border-top:1px solid #e3e3e3;padding-top:12px">${contact.phone} · <a href="mailto:${team}" style="color:#6b6b6b">${team}</a><br>${escape(contact.address)}<br>People, Process, Technology, Better Revenue</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_REPLY_FROM_EMAIL || `APEX REVENUE SOLUTIONS <${team}>`,
      to: [lead.email],
      reply_to: team,
      subject: "Thank you for contacting APEX REVENUE SOLUTIONS",
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

  // The request already reached the team, so a failed thank-you is only logged.
  try {
    await sendThankYou(lead);
  } catch (err) {
    console.error("[consultation-request] thank-you email failed", err);
  }

  return NextResponse.json({ ok: true });
}
