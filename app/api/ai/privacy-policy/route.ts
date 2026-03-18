import { createServerClient } from '@/lib/supabase/server'
import { generateWithGemini } from '@/lib/gemini'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user } = await supabase
    .from('users').select('plan').eq('id', session.user.id).single()
  if (!user || user.plan === 'free') {
    return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
  }

  const body = await req.json()
  const { companyName, websiteUrl, country, dataTypes, thirdParties } = body

  const prompt = `You are a legal document expert. Write a comprehensive, professional Privacy Policy for the following business:

Company: ${companyName}
Website: ${websiteUrl}
Jurisdiction: ${country}
Data collected: ${dataTypes.join(', ')}
Third-party services: ${thirdParties.length > 0 ? thirdParties.join(', ') : 'None'}

Requirements:
- Be fully compliant with ${country} privacy laws
- Include all required sections: Introduction, Data Collection, How We Use Data, Data Sharing, Cookies, User Rights, Data Retention, Security, Contact Information, Changes to Policy
- If GDPR applies, include lawful basis for processing, DPO contact, right to erasure, data portability
- If CCPA applies, include California-specific rights and opt-out provisions
- Be clear and readable, avoid excessive legalese
- Use today's date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
- Format as clean HTML with proper headings (h2, h3), paragraphs, and lists
- Do not include any markdown fences or extra commentary — only HTML content`

  const content = await generateWithGemini(prompt)
  return NextResponse.json({ content })
}
