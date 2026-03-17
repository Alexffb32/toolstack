import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerComponentClient({ cookies })
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, seo_title, seo_description, excerpt')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) return { title: 'Post not found' }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Link href="/blog" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-3">
            {formatDate(post.published_at || post.created_at)}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          )}
        </header>

        <SafeHtml
          html={post.content}
          className="prose prose-neutral dark:prose-invert max-w-none"
        />
      </article>
    </div>
  )
}
