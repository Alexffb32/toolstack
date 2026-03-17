'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AdBanner({ slot }: { slot: string }) {
  const [showAds, setShowAds] = useState(false)
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setShowAds(true)
        return
      }
      const { data } = await supabase
        .from('users')
        .select('plan')
        .eq('id', session.user.id)
        .single()
      // Only show ads to free users
      setShowAds(!data || data.plan === 'free')
    })
  }, [])

  if (!showAds || !publisherId) return null

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div className="my-4 flex justify-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  )
}
