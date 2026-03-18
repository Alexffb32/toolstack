import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
  }

  const supabase = getServiceClient()

  // Check if already subscribed
  const { data: existing } = await supabase
    .from('newsletter_subscribers')
    .select('status')
    .eq('email', email)
    .single()

  if (existing?.status === 'active') {
    return NextResponse.json({ message: 'Already subscribed' })
  }

  if (existing?.status === 'unsubscribed') {
    // Re-subscribe
    await supabase
      .from('newsletter_subscribers')
      .update({ status: 'active', confirmed_at: new Date().toISOString(), unsubscribed_at: null })
      .eq('email', email)
    return NextResponse.json({ message: 'Resubscribed successfully' })
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, status: 'active', confirmed_at: new Date().toISOString() })

  if (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  // Send welcome email — graceful: subscription succeeds even if email fails
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'ToolStack <newsletter@toolstack.io>',
      to: email,
      subject: 'Welcome to ToolStack Daily!',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px 24px">
          <div style="background:#155EEF;width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:20px">
            <span style="color:white;font-weight:900;font-size:14px">TS</span>
          </div>
          <h1 style="font-size:22px;font-weight:800;color:#0D1117;margin:0 0 12px">You're in! 🎉</h1>
          <p style="color:#4B5563;line-height:1.7;margin:0 0 20px">
            Thanks for subscribing to the <strong>ToolStack newsletter</strong>. You'll receive practical tips on freelancing, tax changes, legal updates, and new tools — about once a week.
          </p>
          <p style="color:#4B5563;line-height:1.7;margin:0 0 24px">
            In the meantime, explore our free tools:
          </p>
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:28px">
            <a href="https://toolstack.io/invoice-generator" style="color:#155EEF;text-decoration:none;font-size:14px">→ Free Invoice Generator</a>
            <a href="https://toolstack.io/vat-calculator" style="color:#155EEF;text-decoration:none;font-size:14px">→ VAT Calculator</a>
            <a href="https://toolstack.io/currency-converter" style="color:#155EEF;text-decoration:none;font-size:14px">→ Currency Converter</a>
          </div>
          <p style="color:#9CA3AF;font-size:12px;margin:0">
            You received this because you subscribed at toolstack.io.
            <br>To unsubscribe, reply with "unsubscribe".
          </p>
        </div>
      `,
    })
  } catch (emailErr) {
    console.error('Welcome email failed (subscription still succeeded):', emailErr)
  }

  return NextResponse.json({ message: 'Subscribed successfully' })
}
