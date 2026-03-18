import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const SYSTEM_CONTEXT = `You are a helpful support assistant for ToolStack (toolstack.io), a platform offering free business tools for freelancers and small businesses.

About ToolStack:
- 9 professional business tools available
- 6 tools are FREE (no sign-up required): Invoice Generator, VAT Calculator, Currency Converter, Tax Rates by Country, Meeting Time Planner, Time Converter
- 3 tools require Pro subscription: Privacy Policy Generator, Terms of Service Generator, Contract Generator (AI-powered legal documents)
- Blog with practical guides on freelancing, taxes, contracts, and running a business
- Pro subscribers get early access to blog content

Pricing:
- Free plan: Access to 6 core tools, no sign-up needed
- Pro plan (Individual): €9/month — all 9 tools + AI legal documents + early blog access
- Enterprise/Max plan: €29/month — everything in Pro + team features + priority support

Tools available:
1. Invoice Generator (FREE) — Create professional invoices in seconds, PDF download
2. VAT Calculator (FREE) — Calculate VAT for any EU country
3. Currency Converter (FREE) — Real-time exchange rates
4. Tax Rates by Country (FREE) — Tax reference for 50+ countries
5. Meeting Time Planner (FREE) — Schedule meetings across time zones
6. Time Converter (FREE) — Convert time across global time zones
7. Privacy Policy Generator (PRO) — AI-generated GDPR-compliant privacy policies
8. Terms of Service Generator (PRO) — AI-generated terms of service
9. Contract Generator (PRO) — AI-generated freelance contracts

Navigation:
- Homepage: toolstack.io
- Blog: toolstack.io/blog
- Pricing: toolstack.io/pricing
- Login: toolstack.io/login

Support contact: support@toolstack.io

Answer questions helpfully and concisely. If you don't know something specific about ToolStack, say so and suggest contacting support@toolstack.io. Keep responses brief and friendly. Respond in the same language the user writes in.`

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Build Gemini conversation history
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_CONTEXT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error:', err)
      return NextResponse.json({ error: 'AI service unavailable' }, { status: 502 })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'

    return NextResponse.json({ reply: text })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
