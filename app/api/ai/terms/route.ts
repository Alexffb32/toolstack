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
  const { companyName, websiteUrl, businessType, serviceDescription, paymentTerms, refundPolicy, governingLaw } = body

  const prompt = `You are a legal document expert. Write a comprehensive Terms of Service agreement for:

Company: ${companyName}
Website: ${websiteUrl}
Business type: ${businessType}
Service description: ${serviceDescription}
Payment terms: ${paymentTerms}
Refund policy: ${refundPolicy}
Governing law: ${governingLaw}

Requirements:
- Include all standard sections: Acceptance of Terms, Description of Service, User Accounts, Payment & Billing, Refund Policy, Intellectual Property, Prohibited Uses, Disclaimers, Limitation of Liability, Indemnification, Termination, Governing Law, Changes to Terms, Contact
- Be appropriate for the business type: ${businessType}
- Cover the specific refund policy stated: ${refundPolicy}
- Governing law: ${governingLaw}
- Use today's date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
- Format as clean HTML with proper headings (h2, h3), paragraphs, and numbered/bulleted lists
- Do not include markdown fences or extra commentary — only HTML content`

  const content = await generateWithGemini(prompt)
  return NextResponse.json({ content })
}
