import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Shield, BookOpen, Briefcase, Lightbulb, Download, Trash2, Zap, LayoutDashboard } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard — My Documents | ToolStack' }

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'
const GREEN = '#059669'

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

const quickLinks = [
  { name: 'Invoice Generator', href: '/invoice-generator', icon: FileText, pro: false },
  { name: 'Privacy Policy', href: '/privacy-policy-generator', icon: Shield, pro: true },
  { name: 'Contract Generator', href: '/contract-generator', icon: Briefcase, pro: true },
  { name: 'Terms of Service', href: '/terms-generator', icon: BookOpen, pro: true },
]

export default async function DashboardPage() {
  const supabase = await createServerClient()
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
  const planLabel = user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free'
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'there'

  const stats = [
    { label: 'Saved documents', value: docCount, sub: isPro ? 'unlimited' : 'upgrade to save' },
    { label: 'Current plan', value: planLabel, sub: isPro ? 'full access' : '6 free tools' },
    { label: 'Member since', value: formatDate(user?.created_at || ''), sub: '' },
    { label: 'Tools available', value: isPro ? '10' : '6', sub: 'of 10 tools' },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        padding: '32px 36px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, background: B,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(21,94,239,0.25)',
          }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: 0, letterSpacing: '-0.4px' }}>
              Welcome back, {displayName}
            </h1>
            <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Your documents and tools</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '5px 12px', borderRadius: 999,
            background: isPro ? '#EEF4FF' : '#F3F4F6',
            color: isPro ? B : MUTED,
            border: `1px solid ${isPro ? '#C7D7FD' : '#E5E7EB'}`,
          }}>
            {isPro ? <><Zap size={11} />{planLabel}</> : 'Free Plan'}
          </span>
          {!isPro && (
            <Link href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 10,
              background: B, color: 'white',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(21,94,239,0.25)',
            }}>
              <Zap size={12} /> Upgrade to Pro
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 28 }}>
        {stats.map(({ label, value, sub }) => (
          <div key={label} style={{
            background: 'white',
            borderRadius: 14,
            border: `1px solid ${BORDER}`,
            padding: '20px 22px',
          }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: B, letterSpacing: '-0.5px', lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: DARK, margin: '6px 0 2px' }}>{label}</div>
            {sub && <div style={{ fontSize: 11, color: MUTED }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Documents section */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: DARK, margin: '0 0 14px', letterSpacing: '-0.2px' }}>Saved Documents</h2>

        {!isPro ? (
          <div style={{
            background: 'white', borderRadius: 14, border: `1.5px dashed ${BORDER}`,
            padding: '56px 24px', textAlign: 'center',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <FileText size={22} color={B} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Save documents to your dashboard</p>
            <p style={{ fontSize: 14, color: MUTED, margin: '0 0 20px', maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
              Upgrade to Pro to save invoices, contracts, and AI-generated legal documents.
            </p>
            <Link href="/pricing" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 22px', borderRadius: 10, background: B,
              color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            }}>
              <Zap size={14} /> Upgrade to Pro — €9/mo
            </Link>
          </div>
        ) : documents && documents.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {documents.map((doc: { id: string; type: string; title: string; created_at: string }) => {
              const Icon = typeIcons[doc.type] || FileText
              return (
                <div key={doc.id} style={{
                  background: 'white', borderRadius: 12, border: `1px solid ${BORDER}`,
                  padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9, background: LIGHT,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={16} color={B} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: DARK, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.title}
                    </p>
                    <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>
                      {typeLabels[doc.type]} · {formatDate(doc.created_at)}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                    <button type="button" title="Download" style={{ padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: MUTED }}>
                      <Download size={15} />
                    </button>
                    <button type="button" title="Delete" style={{ padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#DC2626' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{
            background: 'white', borderRadius: 14, border: `1.5px dashed ${BORDER}`,
            padding: '48px 24px', textAlign: 'center',
          }}>
            <FileText size={32} color={MUTED} style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: DARK, margin: '0 0 6px' }}>No documents yet</p>
            <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>Generate an invoice or AI document and click &ldquo;Save to Dashboard&rdquo;</p>
          </div>
        )}
      </div>

      {/* Quick links */}
      <div>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: DARK, margin: '0 0 14px', letterSpacing: '-0.2px' }}>Quick Access</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
          {quickLinks.map(({ name, href, icon: Icon, pro }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: 12, border: `1px solid ${BORDER}`,
                padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', transition: 'border-color 0.15s',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, background: LIGHT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={16} color={B} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: DARK, margin: 0 }}>{name}</p>
                  {pro && !isPro && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: B, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Pro</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
