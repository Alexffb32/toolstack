import { createServerClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

const PRICE_MAP: Record<string, Record<string, string>> = {
  individual: {
    monthly: process.env.STRIPE_PRICE_INDIVIDUAL_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_INDIVIDUAL_YEARLY!,
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
    yearly: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY!,
  },
}

export async function POST(req: Request) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { plan, interval } = await req.json()
  const priceId = PRICE_MAP[plan]?.[interval]
  if (!priceId) return NextResponse.json({ error: 'Invalid plan or interval' }, { status: 400 })

  const stripe = getStripe()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: session.user.id,
    customer_email: session.user.email,
    success_url: `${appUrl}/dashboard?upgraded=true`,
    cancel_url: `${appUrl}/pricing`,
    metadata: { supabase_user_id: session.user.id, plan },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
