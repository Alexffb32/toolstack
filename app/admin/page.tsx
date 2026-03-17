import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { formatDate } from '@/lib/utils'
import { Send, Users, FileText, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Panel | ToolStack' }

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies })

  const [
    { data: newsletters },
    { count: subscriberCount },
    { data: blogPosts },
    { data: toolStats },
  ] = await Promise.all([
    supabase.from('newsletters').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('blog_posts').select('id, title, slug, published, published_at, created_at').order('created_at', { ascending: false }).limit(20),
    supabase.from('tool_usage').select('tool').order('created_at', { ascending: false }).limit(1000),
  ])

  // Aggregate tool usage
  const toolCounts = (toolStats || []).reduce<Record<string, number>>((acc, row) => {
    acc[row.tool] = (acc[row.tool] || 0) + 1
    return acc
  }, {})

  const sortedTools = Object.entries(toolCounts).sort(([, a], [, b]) => b - a)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <form action="/api/newsletter/trigger" method="POST">
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Generate &amp; Send Newsletter Now
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Users className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{subscriberCount || 0}</div>
            <div className="text-sm text-muted-foreground">Active subscribers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Mail className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{newsletters?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Newsletters sent</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <FileText className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{blogPosts?.length || 0}</div>
            <div className="text-sm text-muted-foreground">Blog posts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{Object.values(toolCounts).reduce((a, b) => a + b, 0)}</div>
            <div className="text-sm text-muted-foreground">Tool uses (recent)</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="newsletters">
        <TabsList>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="usage">Tool Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="newsletters" className="mt-4 space-y-3">
          {newsletters?.map((nl) => (
            <Card key={nl.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">{nl.subject}</CardTitle>
                    <p className="text-sm text-muted-foreground">{nl.preview_text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={nl.status === 'sent' ? 'default' : nl.status === 'failed' ? 'destructive' : 'secondary'}>
                      {nl.status}
                    </Badge>
                    {nl.sent_at && <span className="text-xs text-muted-foreground">{formatDate(nl.sent_at)}</span>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{nl.recipients_count} recipients</span>
                  <span>{nl.opens_count} opens</span>
                  <span>{nl.clicks_count} clicks</span>
                </div>
                {nl.html_content && (
                  <details className="mt-3">
                    <summary className="text-sm cursor-pointer text-primary">Preview email content</summary>
                    <div className="mt-2 rounded border p-4 max-h-64 overflow-y-auto bg-white">
                      <SafeHtml html={nl.html_content} className="prose prose-sm max-w-none" />
                    </div>
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
          {(!newsletters || newsletters.length === 0) && (
            <p className="text-muted-foreground text-center py-8">No newsletters yet. Click &ldquo;Generate &amp; Send&rdquo; to create the first one.</p>
          )}
        </TabsContent>

        <TabsContent value="blog" className="mt-4 space-y-3">
          {blogPosts?.map((post) => (
            <Card key={post.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{post.slug} · {formatDate(post.created_at)}</p>
                </div>
                <Badge variant={post.published ? 'default' : 'secondary'}>
                  {post.published ? 'Published' : 'Draft'}
                </Badge>
              </CardContent>
            </Card>
          ))}
          {(!blogPosts || blogPosts.length === 0) && (
            <p className="text-muted-foreground text-center py-8">No blog posts yet.</p>
          )}
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tool Usage (last 1000 events)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedTools.map(([tool, count]) => (
                  <div key={tool} className="flex items-center gap-3">
                    <div className="w-40 text-sm font-medium truncate">{tool}</div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${(count / (sortedTools[0]?.[1] || 1)) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground w-12 text-right">{count}</div>
                  </div>
                ))}
                {sortedTools.length === 0 && <p className="text-muted-foreground text-sm">No usage data yet.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
