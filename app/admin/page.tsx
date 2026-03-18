import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { formatDate } from '@/lib/utils'
import { Send, Users, FileText, Mail, DollarSign, BarChart3, Crown, Activity } from 'lucide-react'
import { getStripe } from '@/lib/stripe'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Panel | ToolStack' }

async function getStripeRevenue() {
  try {
    const stripe = getStripe()
    const now = Math.floor(Date.now() / 1000)
    const startOfMonth = Math.floor(new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime() / 1000)

    const [charges, subscriptions] = await Promise.all([
      stripe.charges.list({ created: { gte: startOfMonth }, limit: 100 }),
      stripe.subscriptions.list({ status: 'active', limit: 100 }),
    ])

    const monthlyRevenue = charges.data
      .filter(c => c.paid && !c.refunded)
      .reduce((sum, c) => sum + c.amount, 0) / 100

    const activeSubCount = subscriptions.data.length
    const mrr = subscriptions.data.reduce((sum, s) => {
      const item = s.items.data[0]
      if (!item) return sum
      const amount = item.price.unit_amount || 0
      const interval = item.price.recurring?.interval
      return sum + (interval === 'year' ? amount / 12 : amount) / 100
    }, 0)

    return { monthlyRevenue, activeSubCount, mrr }
  } catch {
    return { monthlyRevenue: 0, activeSubCount: 0, mrr: 0 }
  }
}

export default async function AdminPage() {
  const supabase = await createServerClient()

  const [
    { data: newsletters },
    { count: subscriberCount },
    { data: blogPosts },
    { data: toolStats },
    { data: users, count: userCount },
    stripeData,
  ] = await Promise.all([
    supabase.from('newsletters').select('*').order('created_at', { ascending: false }).limit(10),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('blog_posts').select('id, title, slug, published, pro_only, published_at, created_at').order('created_at', { ascending: false }).limit(20),
    supabase.from('tool_usage').select('tool').order('created_at', { ascending: false }).limit(1000),
    supabase.from('users').select('id, email, full_name, plan, subscription_status, created_at, stripe_customer_id', { count: 'exact' }).order('created_at', { ascending: false }).limit(100),
    getStripeRevenue(),
  ])

  // Aggregate tool usage
  const toolCounts = (toolStats || []).reduce<Record<string, number>>((acc, row) => {
    acc[row.tool] = (acc[row.tool] || 0) + 1
    return acc
  }, {})
  const sortedTools = Object.entries(toolCounts).sort(([, a], [, b]) => b - a)

  // User plan breakdown
  const planCounts = (users || []).reduce<Record<string, number>>((acc, u) => {
    acc[u.plan] = (acc[u.plan] || 0) + 1
    return acc
  }, {})

  const B = '#155EEF'

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">ToolStack backoffice — alexffb32@gmail.com</p>
        </div>
        <form action="/api/newsletter/trigger" method="POST">
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Generate &amp; Send Newsletter
          </Button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Users className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{userCount || 0}</div>
            <div className="text-sm text-muted-foreground">Total users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Crown className="h-6 w-6 text-purple-600 mb-2" />
            <div className="text-3xl font-bold">{stripeData.activeSubCount}</div>
            <div className="text-sm text-muted-foreground">Active subscriptions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="h-6 w-6 text-green-600 mb-2" />
            <div className="text-3xl font-bold">€{stripeData.mrr.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">MRR (subscriptions)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <BarChart3 className="h-6 w-6 text-orange-500 mb-2" />
            <div className="text-3xl font-bold">€{stripeData.monthlyRevenue.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Revenue this month</div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <Mail className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{subscriberCount || 0}</div>
            <div className="text-sm text-muted-foreground">Newsletter subscribers</div>
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
            <Activity className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{Object.values(toolCounts).reduce((a, b) => a + b, 0)}</div>
            <div className="text-sm text-muted-foreground">Tool uses (recent)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Crown className="h-6 w-6 text-primary mb-2" />
            <div className="text-3xl font-bold">{planCounts['individual'] || 0} / {planCounts['enterprise'] || 0}</div>
            <div className="text-sm text-muted-foreground">Pro / Max users</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="usage">Tool Usage</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-4 space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span>Free: {planCounts['free'] || 0}</span>
            <span>Pro: {planCounts['individual'] || 0}</span>
            <span>Max: {planCounts['enterprise'] || 0}</span>
          </div>
          {users?.map((user) => (
            <Card key={user.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: user.plan !== 'free' ? '#7C3AED' : B,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: 13, fontWeight: 700, color: 'white',
                  }}>
                    {(user.full_name || user.email || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{user.full_name || '—'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(user.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={user.plan === 'free' ? 'secondary' : 'default'} className={user.plan !== 'free' ? 'bg-purple-600' : ''}>
                    {user.plan}
                  </Badge>
                  {user.stripe_customer_id && (
                    <span className="text-xs text-muted-foreground font-mono">{user.stripe_customer_id.slice(0, 12)}…</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          {(!users || users.length === 0) && (
            <p className="text-muted-foreground text-center py-8">No users yet.</p>
          )}
        </TabsContent>

        {/* Newsletters Tab */}
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
            <p className="text-muted-foreground text-center py-8">No newsletters yet.</p>
          )}
        </TabsContent>

        {/* Blog Posts Tab */}
        <TabsContent value="blog" className="mt-4 space-y-3">
          {blogPosts?.map((post) => (
            <Card key={post.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">{post.title}</p>
                  <p className="text-xs text-muted-foreground">/blog/{post.slug} · {formatDate(post.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {post.pro_only && <Badge className="bg-purple-600">Pro</Badge>}
                  <Badge variant={post.published ? 'default' : 'secondary'}>
                    {post.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
          {(!blogPosts || blogPosts.length === 0) && (
            <p className="text-muted-foreground text-center py-8">No blog posts yet.</p>
          )}
        </TabsContent>

        {/* Tool Usage Tab */}
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
