import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

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

  return NextResponse.json({ message: 'Subscribed successfully' })
}
