import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

export async function POST(req: Request) {
  const { name, email, message, subject } = await req.json()

  if (!email || !message) {
    return NextResponse.json({ error: 'Email and message are required' }, { status: 400 })
  }

  try {
    const resend = getResend()

    // Email to support
    await resend.emails.send({
      from: 'ToolStack Support <support@toolstack.io>',
      to: 'alexffb32@gmail.com',
      replyTo: email,
      subject: `[Support] ${subject || 'New message'} — from ${name || email}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px">
          <div style="background:#155EEF;width:44px;height:44px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px">
            <span style="color:white;font-weight:900;font-size:14px">TS</span>
          </div>
          <h2 style="font-size:20px;font-weight:800;color:#0D1117;margin:0 0 20px">New Support Request</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <tr><td style="padding:8px 0;color:#6B7280;font-size:13px;width:80px">From</td><td style="padding:8px 0;font-size:13px;color:#0D1117;font-weight:600">${name || 'Anonymous'}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;font-size:13px">Email</td><td style="padding:8px 0;font-size:13px;color:#155EEF">${email}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;font-size:13px">Subject</td><td style="padding:8px 0;font-size:13px;color:#0D1117">${subject || '—'}</td></tr>
          </table>
          <div style="background:#F8FAFF;border:1px solid #E5EAF5;border-radius:12px;padding:20px;margin-bottom:24px">
            <p style="font-size:14px;color:#4B5563;line-height:1.7;margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <p style="font-size:12px;color:#9CA3AF;margin:0">Reply directly to this email to respond to the user.</p>
        </div>
      `,
    })

    // Auto-reply to user
    await resend.emails.send({
      from: 'Alexandre @ ToolStack <support@toolstack.io>',
      to: email,
      subject: 'We received your message — ToolStack Support',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <div style="background:#155EEF;width:44px;height:44px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px">
            <span style="color:white;font-weight:900;font-size:14px">TS</span>
          </div>
          <h1 style="font-size:20px;font-weight:800;color:#0D1117;margin:0 0 12px">Got your message!</h1>
          <p style="color:#4B5563;line-height:1.7;margin:0 0 16px">
            Hi ${name ? name.split(' ')[0] : 'there'},<br><br>
            Thanks for reaching out. I'll get back to you within 24 hours.
          </p>
          <div style="background:#F8FAFF;border:1px solid #E5EAF5;border-radius:12px;padding:16px 20px;margin-bottom:24px">
            <p style="font-size:13px;color:#6B7280;margin:0 0 4px">Your message:</p>
            <p style="font-size:14px;color:#0D1117;margin:0;line-height:1.6;white-space:pre-wrap">${message}</p>
          </div>
          <p style="color:#4B5563;line-height:1.7;margin:0 0 24px">
            — Alexandre Bento<br>
            <span style="color:#6B7280;font-size:13px">ToolStack · toolstack.io</span>
          </p>
          <p style="color:#9CA3AF;font-size:12px;margin:0">
            You received this because you contacted support@toolstack.io
          </p>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Support email error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
