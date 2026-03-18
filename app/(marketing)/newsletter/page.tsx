import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Zap, BarChart3, Lightbulb, CheckCircle } from 'lucide-react'
import { SubscribeWidget } from '@/components/newsletter/SubscribeWidget'

export const metadata: Metadata = {
  title: 'ToolStack Newsletter — Business Tips for Freelancers',
  description: 'Subscribe to the ToolStack newsletter. Weekly insights on freelancing, tax changes, legal tips, and new tools — curated for independent professionals.',
  alternates: { canonical: 'https://toolstack.io/newsletter' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const benefits = [
  { icon: Zap, title: 'New tool alerts', desc: 'Be first to know when we launch new tools or features.' },
  { icon: BarChart3, title: 'Tax & compliance updates', desc: 'VAT changes, tax deadlines, and regulatory news that affects you.' },
  { icon: Lightbulb, title: 'Freelance business tips', desc: 'Practical advice on invoicing, contracts, pricing, and running your business.' },
]

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20, border: `1px solid ${BORDER}`,
        padding: '48px 48px 44px',
        marginBottom: 24,
        position: 'relative', overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: -60, transform: 'translateX(-50%)',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 22, fontSize: 12, color: MUTED }}>
          <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: DARK, fontWeight: 500 }}>Newsletter</span>
        </div>

        <div style={{
          width: 60, height: 60, borderRadius: 16, background: B,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 6px 20px rgba(21,94,239,0.28)',
        }}>
          <Mail size={26} color="white" />
        </div>

        <h1 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 900, color: DARK, letterSpacing: '-0.7px', margin: '0 0 12px' }}>
          The ToolStack Newsletter
        </h1>
        <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.7, margin: '0 auto 28px', maxWidth: 460 }}>
          Weekly insights for freelancers and independent professionals — tax tips, tool updates, and practical business advice.
        </p>

        {/* Subscribe form */}
        <div style={{ maxWidth: 440, margin: '0 auto' }}>
          <SubscribeWidget />
        </div>

        <p style={{ fontSize: 12, color: MUTED, marginTop: 14 }}>
          No spam. Unsubscribe anytime. ~1 email per week.
        </p>
      </div>

      {/* Benefits */}
      <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} style={{
            background: 'white', borderRadius: 14, border: `1px solid ${BORDER}`,
            padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: LIGHT,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon size={18} color={B} />
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: '0 0 4px' }}>{title}</p>
              <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* What you get */}
      <div style={{
        background: DARK, borderRadius: 18, padding: '32px 36px',
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: 'white', margin: '0 0 16px', letterSpacing: '-0.2px' }}>
          What&apos;s in each issue
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            '1 practical tip for running your freelance business',
            '1 tax or legal update you should know about',
            '1 new tool or feature spotlight',
            'Quick links to the most-used ToolStack tools',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <CheckCircle size={16} color={B} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 14, color: '#D1D5DB' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
