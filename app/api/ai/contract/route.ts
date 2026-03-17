import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateWithGemini } from '@/lib/gemini'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: user } = await supabase
    .from('users').select('plan').eq('id', session.user.id).single()
  if (!user || user.plan === 'free') {
    return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
  }

  const body = await req.json()
  const { contractType, party1Name, party2Name, servicesScope, paymentAmount, paymentSchedule, timeline, terminationNotice, governingLaw } = body

  const contractLabels: Record<string, string> = {
    freelance: 'Freelance Service Agreement',
    nda: 'Non-Disclosure Agreement',
    client: 'Client Contract',
    consulting: 'Consulting Agreement',
    employment: 'Employment Contract',
  }

  const prompt = `You are a legal document expert. Draft a professional ${contractLabels[contractType] || contractType} between:

Party 1: ${party1Name}
Party 2: ${party2Name}
Scope of work / services: ${servicesScope}
Payment amount: ${paymentAmount}
Payment schedule: ${paymentSchedule}
Project timeline: ${timeline}
Termination notice period: ${terminationNotice}
Governing law: ${governingLaw}

Requirements:
- Write a complete, enforceable ${contractLabels[contractType]} with all standard clauses
- Include: Parties, Recitals, Scope of Services, Compensation & Payment, Timeline & Milestones, Intellectual Property, Confidentiality, Termination, Dispute Resolution, Governing Law, Entire Agreement, Signature Block
- For NDA: focus on confidentiality obligations, exclusions, duration, return of materials
- For Employment: include at-will employment clause if US, probationary period, benefits placeholder
- Use clear professional language
- Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
- Format as clean HTML — headings (h2, h3), paragraphs, numbered lists where appropriate
- Include [SIGNATURE BLOCK] at the end with spaces for both parties
- Do not include markdown fences or commentary — only HTML content`

  const content = await generateWithGemini(prompt)
  return NextResponse.json({ content })
}
