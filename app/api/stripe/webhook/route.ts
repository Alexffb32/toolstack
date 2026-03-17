import { createClient } from '@supabase/supabase-js'
import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import type Stripe from 'stripe'

// Use service role client for webhook — no user session available
function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.supabase_user_id || session.client_reference_id
      const plan = session.metadata?.plan || 'individual'

      if (userId) {
        await supabase.from('users').update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          subscription_status: 'active',
          updated_at: new Date().toISOString(),
        }).eq('id', userId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const status = sub.status === 'active' ? 'active' : sub.status

      await supabase.from('users').update({
        subscription_status: status,
        subscription_ends_at: sub.cancel_at
          ? new Date(sub.cancel_at * 1000).toISOString()
          : null,
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', sub.id)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription

      await supabase.from('users').update({
        plan: 'free',
        subscription_status: 'inactive',
        stripe_subscription_id: null,
        subscription_ends_at: null,
        updated_at: new Date().toISOString(),
      }).eq('stripe_subscription_id', sub.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
