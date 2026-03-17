import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const CACHE_KEY = 'currency_rates'
const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

export async function GET() {
  const supabase = getServiceClient()

  // Check cache in Supabase (we store in a simple table or use existing newsletter table)
  // For simplicity, fetch fresh and cache via Next.js revalidation
  const apiKey = process.env.EXCHANGE_RATE_API_KEY
  if (!apiKey) {
    // Return static fallback rates if no API key
    return NextResponse.json({
      base: 'USD',
      rates: { EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36, AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.1 },
      fallback: true,
    })
  }

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      { next: { revalidate: CACHE_TTL_MS / 1000 } }
    )
    const data = await res.json()

    if (data.result !== 'success') throw new Error('API error')

    return NextResponse.json({
      base: data.base_code,
      rates: data.conversion_rates,
      timestamp: data.time_last_update_unix,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 })
  }
}

// Suppress unused import warning
void CACHE_KEY
