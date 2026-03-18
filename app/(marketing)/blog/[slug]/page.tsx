import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Wrench } from 'lucide-react'
import { createServerClient } from '@/lib/supabase/server'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { formatDate } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const RELATED_TOOLS = [
  { name: 'Invoice Generator', href: '/invoice-generator' },
  { name: 'VAT Calculator', href: '/vat-calculator' },
  { name: 'Contract Generator', href: '/contract-generator' },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, seo_title, seo_description, excerpt, slug')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) return { title: 'Post not found' }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    alternates: { canonical: `https://toolstack.io/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Breadcrumb / back */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, fontSize: 13, color: MUTED }}>
        <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/blog" style={{ color: MUTED, textDecoration: 'none' }}>Blog</Link>
        <span>›</span>
        <span style={{ color: DARK, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>
          {post.title}
        </span>
      </div>

      {/* Article header */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        padding: '36px 40px',
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 13, color: MUTED }}>
          <Calendar size={14} />
          <span>{formatDate(post.published_at || post.created_at)}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, color: DARK, letterSpacing: '-0.5px', margin: '0 0 14px', lineHeight: 1.25 }}>
          {post.title}
        </h1>

        {post.excerpt && (
          <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.65, margin: 0, maxWidth: 600 }}>
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{
        background: 'white',
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        padding: '36px 40px',
        marginBottom: 32,
      }}>
        <SafeHtml
          html={post.content}
          className="prose prose-neutral prose-lg dark:prose-invert max-w-none"
        />
      </div>

      {/* Related tools CTA */}
      <div style={{
        background: LIGHT,
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        padding: '28px 32px',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: B,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wrench size={16} color="white" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: DARK, margin: 0 }}>Free Business Tools</p>
            <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Ready to use — no sign-up required</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {RELATED_TOOLS.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                background: 'white',
                border: `1px solid ${BORDER}`,
                fontSize: 13,
                fontWeight: 500,
                color: DARK,
                textDecoration: 'none',
              }}
            >
              {tool.name} →
            </Link>
          ))}
        </div>
      </div>

      {/* Back link */}
      <Link href="/blog" style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 14, color: MUTED, textDecoration: 'none',
      }}>
        <ArrowLeft size={14} /> Back to Blog
      </Link>
    </div>
  )
}
