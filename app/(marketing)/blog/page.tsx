import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, ArrowRight, Rss } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

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
  const supabase = createServerClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, created_at')
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
      {posts && posts.length > 0 ? (
        <div style={{ display: 'grid', gap: 16 }}>
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article style={{
                background: 'white',
                borderRadius: 14,
                border: `1px solid ${BORDER}`,
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
                cursor: 'pointer',
                borderLeft: `3px solid ${i === 0 ? B : BORDER}`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 4px 24px rgba(21,94,239,0.10)'
                el.style.borderColor = '#C7D7FD'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = 'none'
                el.style.borderColor = i === 0 ? B : BORDER
              }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                    {i === 0 && (
                      <span style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                        padding: '2px 8px', borderRadius: 999,
                        background: '#EEF4FF', color: B,
                        border: `1px solid #C7D7FD`,
                      }}>Latest</span>
                    )}
                    <span style={{ fontSize: 12, color: MUTED }}>
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: DARK, margin: '0 0 8px', lineHeight: 1.35 }}>
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <div style={{ flexShrink: 0, color: MUTED, marginTop: 4 }}>
                  <ArrowRight size={16} />
                </div>
              </article>
            </Link>
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
