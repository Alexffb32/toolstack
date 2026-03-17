import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — Business Tips & Insights for Freelancers',
  description: 'Practical articles on freelancing, taxes, contracts, productivity, and running a small business.',
}

export default async function BlogPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, created_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(20)

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-3">Blog</h1>
        <p className="text-muted-foreground">Practical tips on freelancing, taxes, legal, and business growth.</p>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {formatDate(post.published_at || post.created_at)}
                    </Badge>
                  </div>
                </CardHeader>
                {post.excerpt && (
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                  </CardContent>
                )}
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium mb-2">No posts yet</p>
          <p className="text-sm">Blog posts will appear here once published from the admin panel.</p>
        </div>
      )}
    </div>
  )
}
