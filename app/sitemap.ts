import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://toolstack.io'

const staticRoutes = [
  { url: appUrl, priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${appUrl}/pricing`, priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/blog`, priority: 0.8, changeFrequency: 'daily' as const },
  { url: `${appUrl}/invoice-generator`, priority: 0.9, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/meeting-time-planner`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/vat-calculator`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/currency-converter`, priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${appUrl}/tax-rates`, priority: 0.8, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/sleep-calculator`, priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/privacy-policy-generator`, priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/terms-generator`, priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/contract-generator`, priority: 0.7, changeFrequency: 'monthly' as const },
  { url: `${appUrl}/business-name-generator`, priority: 0.7, changeFrequency: 'monthly' as const },
]

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceKey) {
    return staticRoutes
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at, created_at')
    .eq('published', true)

  const blogRoutes = (posts || []).map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: new Date(post.published_at || post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
