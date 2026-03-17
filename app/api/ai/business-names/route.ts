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
  const { industry, keywords, style, country } = body

  const prompt = `You are a branding expert. Generate 20 creative business name ideas for:

Industry: ${industry}
Keywords / concepts: ${keywords}
Brand style: ${style}
Target market: ${country}

Requirements:
- Generate exactly 20 unique, memorable business names
- Each name should feel ${style} and fit the ${industry} industry
- Consider ${country} market — names should work phonetically and culturally
- Mix different approaches: compound words, invented words, descriptive, metaphorical, acronyms
- Avoid names that are too generic or already famous brands

Return ONLY a valid JSON array with exactly 20 objects. No markdown, no explanation, just the JSON:
[
  {
    "name": "BusinessName",
    "tagline": "A short compelling tagline for this name",
    "domain_note": "Brief note about .com domain availability likelihood (likely available / competitive space / check availability)"
  }
]`

  const raw = await generateWithGemini(prompt)

  // Strip markdown fences if Gemini includes them
  const cleaned = raw.replace(/```json|```/g, '').trim()

  let names: unknown[]
  try {
    names = JSON.parse(cleaned)
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ names })
}
