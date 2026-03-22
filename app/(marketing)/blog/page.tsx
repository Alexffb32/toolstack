import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Rss, Zap } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { BlogPostCard } from '@/components/blog/BlogPostCard'

export const metadata: Metadata = {
  title: 'Blog — Business Tips & Insights for Freelancers | ToolStack',
  description: 'Practical articles on freelancing, taxes, contracts, productivity, and running a small business.',
  alternates: { canonical: 'https://toolstack.io/blog' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

export default async function BlogPage() {
  const supabase = await createServerClient()

  // Get current user's plan
  const { data: { session } } = await supabase.auth.getSession()
  let userPlan = 'free'
  if (session?.user) {
    const { data: profile } = await supabase
      .from('users')
      .select('plan')
      .eq('id', session.user.id)
      .single()
    userPlan = profile?.plan || 'free'
  }
  const isPro = userPlan !== 'free'

  // Fetch all published posts (service role sees pro_only too via RLS bypass)
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, created_at, pro_only')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        padding: '40px 44px',
        marginBottom: 40,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -80, top: -80,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, fontSize: 12, color: MUTED }}>
          <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: DARK, fontWeight: 500 }}>Blog</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14, background: B,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 16px rgba(21,94,239,0.25)',
          }}>
            <BookOpen size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: DARK, letterSpacing: '-0.56px', margin: '0 0 8px' }}>
              ToolStack Blog
            </h1>
            <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
              Practical guides on freelancing, taxes, contracts, and running your business — written for independent professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      {/* Pro early access banner */}
      {!isPro && (
        <div style={{
          background: 'linear-gradient(135deg, #1047C8 0%, #155EEF 100%)',
          borderRadius: 14, padding: '20px 24px', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={16} color="white" />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: '0 0 2px' }}>Pro members get early access</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Unlock 3 exclusive articles + future content before everyone else.</p>
            </div>
          </div>
          <Link href="/pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'white', color: B, fontWeight: 600, fontSize: 13,
            padding: '8px 18px', borderRadius: 999, textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Upgrade to Pro →
          </Link>
        </div>
      )}

      {posts && posts.length > 0 ? (
        <div style={{ display: 'grid', gap: 16 }}>
          {posts.map((post, i) => (
            <BlogPostCard key={post.id} post={post} index={i} isPro={isPro} />
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'white', borderRadius: 14, border: `1px solid ${BORDER}`,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: LIGHT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Rss size={24} color={B} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: DARK, margin: '0 0 8px' }}>No posts yet</p>
          <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px' }}>Blog posts will appear here once published.</p>
          <Link href="/newsletter" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 10,
            background: B, color: 'white', textDecoration: 'none',
            fontSize: 14, fontWeight: 600,
          }}>
            Subscribe to newsletter
          </Link>
        </div>
      )}
    </div>
  )
}
