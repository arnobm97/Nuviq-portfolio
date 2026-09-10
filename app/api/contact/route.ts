import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { SITE } from "@/lib/constants";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message should be at least 10 characters.").max(5000),
  // Honeypot field — real users never fill this in. Add a hidden input named
  // "website" to your form if you want extra bot protection.
  website: z.string().max(0).optional().or(z.literal("")),
});

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json({ error: firstIssue?.message ?? "Invalid submission." }, { status: 400 });
  }

  // Honeypot triggered — silently report success without sending anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, company, message } = parsed.data;
  const transporter = getTransporter();

  if (!transporter) {
    // No SMTP credentials configured yet. Log the submission so local/dev
    // testing still works, and let the user know via the README how to
    // wire up real email delivery (see .env.example).
    console.info("[contact] SMTP not configured — logging submission instead of sending email:", {
      name,
      email,
      company,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL ?? `"${SITE.name}" <noreply@nuviq.ai>`,
      to: process.env.CONTACT_TO_EMAIL ?? SITE.email,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email us directly instead." },
      { status: 502 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
