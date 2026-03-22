'use client'

import Link from 'next/link'
import { ArrowRight, Lock, Zap } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const BORDER = '#E5EAF5'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  published_at?: string | null
  created_at: string
  pro_only: boolean
}

interface Props {
  post: Post
  index: number
  isPro: boolean
}

export function BlogPostCard({ post, index, isPro }: Props) {
  const locked = post.pro_only && !isPro

  return (
    <Link href={locked ? '/pricing' : `/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          background: 'white',
          borderRadius: 14,
          border: `1px solid ${locked ? '#DDD6FE' : BORDER}`,
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 20,
          transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
          cursor: 'pointer',
          borderLeft: `3px solid ${locked ? '#7C3AED' : index === 0 ? B : BORDER}`,
          opacity: locked ? 0.85 : 1,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = locked ? '0 4px 24px rgba(124,58,237,0.12)' : '0 4px 24px rgba(21,94,239,0.10)'
          el.style.borderColor = locked ? '#C4B5FD' : '#C7D7FD'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = 'none'
          el.style.borderColor = locked ? '#DDD6FE' : index === 0 ? B : BORDER
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            {post.pro_only && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '2px 8px', borderRadius: 999,
                background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                {locked ? <Lock size={9} /> : <Zap size={9} />}
                {locked ? 'Pro Only' : 'Pro • Early Access'}
              </span>
            )}
            {!post.pro_only && index === 0 && (
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '2px 8px', borderRadius: 999,
                background: '#EEF4FF', color: B, border: `1px solid #C7D7FD`,
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
            <p style={{
              fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.6,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {locked ? post.excerpt.substring(0, 80) + '…' : post.excerpt}
            </p>
          )}
        </div>
        <div style={{ flexShrink: 0, color: locked ? '#7C3AED' : MUTED, marginTop: 4 }}>
          {locked ? <Lock size={16} /> : <ArrowRight size={16} />}
        </div>
      </article>
    </Link>
  )
}
