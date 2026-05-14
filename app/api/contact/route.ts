import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  preferredUnitSize?: string;
};

const contactRecipient =
  process.env.CONTACT_TO_EMAIL || "packitupkm@allstateseg.com";
const contactCc = process.env.CONTACT_CC_EMAIL || "steve.cantago@gmail.com";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    from,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;
  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const preferredUnitSize = body.preferredUnitSize?.trim();

  if (!name || !phone || !email || !message) {
    return NextResponse.json(
      {
        message:
          "Please include your name, phone number, email address, and message.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    if (process.env.NODE_ENV === "development") {
      console.info("Contact form submission not emailed; SMTP is not configured", {
        to: contactRecipient,
        cc: contactCc,
        name,
        phone,
        email,
        message,
        preferredUnitSize,
      });
    }

    return NextResponse.json(
      {
        message:
          "Email delivery is not configured yet. Please call the facility or try again later.",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: smtpConfig.auth,
  });

  try {
    await transporter.sendMail({
      from: smtpConfig.from,
      to: contactRecipient,
      cc: contactCc,
      replyTo: email || undefined,
      subject: `New storage inquiry from ${name}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${name}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email || "Not provided"}`,
        `Preferred unit size: ${preferredUnitSize || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email || "Not provided")}</p>
        <p><strong>Preferred unit size:</strong> ${
          escapeHtml(preferredUnitSize || "Not provided")
        }</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact form email", error);
    return NextResponse.json(
      {
        message:
          "We could not send your message right now. Please call the facility or try again later.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message:
      "Thanks. We received your message and will follow up using the contact information provided.",
  });
}
