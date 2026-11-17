import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const MAX_LENGTH = {
  name: 100,
  email: 254,
  message: 5000,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Escape characters that have special meaning in HTML so user input renders as plain text. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function badRequest(error: string) {
  return NextResponse.json({ success: false, error }, { status: 400 })
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest("Invalid request")
  }

  if (typeof body !== "object" || body === null) {
    return badRequest("Invalid request")
  }

  const { name, email, message, website } = body as Record<string, unknown>

  // Honeypot: the "website" field is hidden from people, so only bots fill it in.
  // Pretend the message was sent so the bot gets no signal.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return badRequest("All fields are required")
  }

  // Collapse whitespace in single-line fields (also prevents line breaks in the email subject)
  const cleanName = name.replace(/\s+/g, " ").trim()
  const cleanEmail = email.trim()
  const cleanMessage = message.trim()

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return badRequest("All fields are required")
  }

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return badRequest("Invalid email format")
  }

  if (
    cleanName.length > MAX_LENGTH.name ||
    cleanEmail.length > MAX_LENGTH.email ||
    cleanMessage.length > MAX_LENGTH.message
  ) {
    return badRequest("One or more fields are too long")
  }

  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_PASS

  if (!gmailUser || !gmailPass) {
    console.error("Contact form is not configured: GMAIL_USER and/or GMAIL_PASS is missing")
    return NextResponse.json(
      { success: false, error: "The contact form is temporarily unavailable. Please email me directly." },
      { status: 500 },
    )
  }

  const safeName = escapeHtml(cleanName)
  const safeEmail = escapeHtml(cleanEmail)
  const safeMessage = escapeHtml(cleanMessage)

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    })

    await transporter.sendMail({
      from: gmailUser,
      to: gmailUser,
      subject: `New message from ${cleanName}`,
      text: `
Name: ${cleanName}
Email: ${cleanEmail}

Message:
${cleanMessage}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    .header {
      background-color: #000;
      color: #fff;
      padding: 20px;
      border-radius: 8px 8px 0 0;
      text-align: center;
    }
    .content {
      background-color: #fff;
      padding: 20px;
      border-radius: 0 0 8px 8px;
    }
    .field {
      margin-bottom: 15px;
    }
    .label {
      font-weight: bold;
      color: #555;
      display: block;
      margin-bottom: 5px;
    }
    .value {
      color: #333;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
      border-left: 3px solid #000;
    }
    .message-box {
      min-height: 100px;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span>
        <div class="value">${safeName}</div>
      </div>
      <div class="field">
        <span class="label">Email:</span>
        <div class="value">${safeEmail}</div>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="value message-box">${safeMessage}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    // Log only the error message: the full error object can include SMTP details
    console.error("Error sending contact email:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
