import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import { FileText, Shield, BookOpen, Briefcase, Lightbulb, Download, Trash2, Zap } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard — My Documents' }

const typeIcons: Record<string, React.ElementType> = {
  invoice: FileText,
  privacy_policy: Shield,
  terms: BookOpen,
  contract: Briefcase,
  business_names: Lightbulb,
}

const typeLabels: Record<string, string> = {
  invoice: 'Invoice',
  privacy_policy: 'Privacy Policy',
  terms: 'Terms of Service',
  contract: 'Contract',
  business_names: 'Business Names',
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  const { data: user } = await supabase
    .from('users')
    .select('plan, full_name, email, created_at')
    .eq('id', session.user.id)
    .single()

  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  const isPro = user?.plan === 'pro' || user?.plan === 'business'
  const docCount = documents?.length || 0

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.full_name || user?.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isPro ? 'default' : 'secondary'} className="text-sm px-3 py-1">
            {isPro ? <><Zap className="mr-1 h-3 w-3" />{user?.plan?.charAt(0).toUpperCase()}{user?.plan?.slice(1)}</> : 'Free plan'}
          </Badge>
          {!isPro && (
            <Link href="/pricing">
              <Button size="sm">Upgrade to Pro</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Documents saved', value: docCount, sub: isPro ? '/ unlimited' : '/ 0 (upgrade)' },
          { label: 'Plan', value: user?.plan?.charAt(0).toUpperCase() + (user?.plan?.slice(1) || ''), sub: 'current plan' },
          { label: 'Member since', value: formatDate(user?.created_at || ''), sub: '' },
          { label: 'Tools available', value: isPro ? '10' : '6', sub: 'of 10 tools' },
        ].map(({ label, value, sub }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground">{label}</div>
              {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documents */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Saved Documents</h2>

        {!isPro ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Save documents to your dashboard</h3>
              <p className="text-sm text-muted-foreground mb-4">Upgrade to Pro to save invoices, contracts, and AI-generated legal documents.</p>
              <Link href="/pricing">
                <Button><Zap className="mr-2 h-4 w-4" />Upgrade to Pro — €9/mo</Button>
              </Link>
            </CardContent>
          </Card>
        ) : documents && documents.length > 0 ? (
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({docCount})</TabsTrigger>
              {Object.entries(typeLabels).map(([type, label]) => {
                const count = documents.filter(d => d.type === type).length
                return count > 0 ? (
                  <TabsTrigger key={type} value={type}>{label} ({count})</TabsTrigger>
                ) : null
              })}
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <DocumentList documents={documents} />
            </TabsContent>
            {Object.keys(typeLabels).map((type) => (
              <TabsContent key={type} value={type} className="mt-4">
                <DocumentList documents={documents.filter(d => d.type === type)} />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p className="font-medium">No documents saved yet</p>
              <p className="text-sm mt-1">Generate an invoice or AI document and click &ldquo;Save to Dashboard&rdquo;</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Invoice', href: '/invoice-generator', icon: FileText },
            { name: 'Privacy Policy', href: '/privacy-policy-generator', icon: Shield, pro: true },
            { name: 'Contract', href: '/contract-generator', icon: Briefcase, pro: true },
            { name: 'Terms of Service', href: '/terms-generator', icon: BookOpen, pro: true },
          ].map(({ name, href, icon: Icon, pro }) => (
            <Link key={href} href={href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="pt-4 pb-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    {pro && !isPro && <Badge variant="outline" className="text-xs">Pro</Badge>}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function DocumentList({ documents }: { documents: Array<{ id: string; type: string; title: string; created_at: string }> }) {
  return (
    <div className="space-y-2">
      {documents.map((doc) => {
        const Icon = typeIcons[doc.type] || FileText
        return (
          <Card key={doc.id}>
            <CardContent className="py-3 flex items-center gap-4">
              <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{doc.title}</p>
                <p className="text-xs text-muted-foreground">{typeLabels[doc.type]} · {formatDate(doc.created_at)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Download">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
