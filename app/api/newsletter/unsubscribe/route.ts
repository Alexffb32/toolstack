import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 })
  }

  const supabase = getServiceClient()

  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ status: 'unsubscribed', unsubscribed_at: new Date().toISOString() })
    .eq('confirm_token', token)

  if (error) {
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
  }

  // Redirect to a friendly page
  return new Response(null, {
    status: 302,
    headers: {
      Location: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?unsubscribed=true`,
    },
  })
}
