// Supabase Edge Function — runs daily at 07:00 UTC
// Schedule: "0 7 * * *" (set in Supabase Dashboard > Edge Functions > Cron)
// deno-lint-ignore-file no-explicit-any

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GEMINI_KEY = Deno.env.get('GEMINI_API_KEY')!
const RESEND_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const APP_URL = Deno.env.get('APP_URL') || 'https://toolstack.io'

Deno.serve(async (_req) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // Rotate featured tool by day of year
  const tools = ['Invoice Generator', 'Meeting Time Planner', 'VAT Calculator', 'Contract Generator', 'Privacy Policy Generator']
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const featuredTool = tools[dayOfYear % tools.length]
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const prompt = `You are the editor of ToolStack Weekly, a daily newsletter for freelancers and small business owners.
Today is ${today}. Write a newsletter with these sections:
1. SUBJECT LINE: Compelling, under 60 chars, no emojis in subject
2. PREVIEW TEXT: 1 sentence teaser, under 100 chars
3. DAILY TIP: One practical tip about running a business, freelancing, productivity, or finances. 2-3 sentences. Actionable.
4. FEATURED TOOL: Write a 3-sentence spotlight about "${featuredTool}" — what problem it solves, why it's useful, call to action.
5. BUSINESS INSIGHT: One interesting stat or trend relevant to freelancers/SMEs this week. Cite a type of source (e.g. "According to recent industry data...").
6. QUICK TIP: One sentence about taxes, contracts, or legal compliance.

Format your response as JSON with NO markdown fences:
{"subject":"...","preview":"...","tip":"...","featured_tool_text":"...","insight":"...","quick_tip":"..."}`

  // Call Gemini
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  )

  const geminiData = await geminiRes.json()
  const rawText = geminiData.candidates[0].content.parts[0].text
  const content = JSON.parse(rawText.replace(/```json|```/g, '').trim())

  const htmlContent = buildNewsletterHTML(content, featuredTool)

  // Save to newsletters table
  const { data: newsletter, error: insertError } = await supabase
    .from('newsletters')
    .insert({ subject: content.subject, preview_text: content.preview, html_content: htmlContent, status: 'draft' })
    .select()
    .single()

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 500 })
  }

  // Get active subscribers
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('email, confirm_token')
    .eq('status', 'active')

  if (!subscribers || subscribers.length === 0) {
    await supabase.from('newsletters').update({ status: 'sent', sent_at: new Date().toISOString(), recipients_count: 0 }).eq('id', newsletter.id)
    return new Response(JSON.stringify({ sent: 0 }), { status: 200 })
  }

  // Send via Resend batch (max 100 per call)
  const BATCH_SIZE = 100
  let sent = 0

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE).map((sub: any) => ({
      from: 'ToolStack Weekly <newsletter@toolstack.io>',
      to: sub.email,
      subject: content.subject,
      html: htmlContent.replace('{{UNSUBSCRIBE_TOKEN}}', sub.confirm_token),
      headers: { 'List-Unsubscribe': `<${APP_URL}/api/newsletter/unsubscribe?token=${sub.confirm_token}>` },
    }))

    await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(batch),
    })

    sent += batch.length
  }

  await supabase
    .from('newsletters')
    .update({ status: 'sent', sent_at: new Date().toISOString(), recipients_count: sent })
    .eq('id', newsletter.id)

  return new Response(JSON.stringify({ sent }), { status: 200 })
})

function buildNewsletterHTML(content: any, featuredTool: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${content.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:24px 32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">⚒ ToolStack Weekly</h1>
            <p style="margin:4px 0 0;color:#94a3b8;font-size:14px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </td>
        </tr>
        <!-- Daily Tip -->
        <tr>
          <td style="padding:28px 32px 0;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6366f1;">✦ Daily Tip</p>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#1e293b;">${content.tip}</p>
          </td>
        </tr>
        <!-- Featured Tool -->
        <tr>
          <td style="padding:24px 32px 0;">
            <div style="background:#f1f5f9;border-radius:8px;padding:20px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6366f1;">🛠 Featured Tool: ${featuredTool}</p>
              <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#1e293b;">${content.featured_tool_text}</p>
              <a href="https://toolstack.io" style="display:inline-block;background:#0f172a;color:#ffffff;padding:8px 16px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">Try it free →</a>
            </div>
          </td>
        </tr>
        <!-- Business Insight -->
        <tr>
          <td style="padding:24px 32px 0;">
            <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6366f1;">📊 Business Insight</p>
            <p style="margin:0;font-size:15px;line-height:1.6;color:#1e293b;">${content.insight}</p>
          </td>
        </tr>
        <!-- Quick Tip -->
        <tr>
          <td style="padding:24px 32px 0;">
            <div style="border-left:3px solid #6366f1;padding-left:16px;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6366f1;">⚡ Quick Legal Tip</p>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#475569;">${content.quick_tip}</p>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:28px 32px;border-top:1px solid #e2e8f0;margin-top:24px;text-align:center;">
            <p style="margin:0 0 8px;font-size:13px;color:#64748b;">ToolStack · Free business tools for freelancers</p>
            <p style="margin:0;font-size:12px;color:#94a3b8;">
              <a href="https://toolstack.io" style="color:#6366f1;text-decoration:none;">Visit ToolStack</a>
              &nbsp;·&nbsp;
              <a href="https://toolstack.io/api/newsletter/unsubscribe?token={{UNSUBSCRIBE_TOKEN}}" style="color:#94a3b8;text-decoration:none;">Unsubscribe</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
