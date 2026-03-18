import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Calculator, DollarSign, Clock, BarChart3, Timer, Shield, ScrollText, PenLine, Users, Wrench, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About ToolStack — Free Business Tools for Freelancers',
  description: 'ToolStack is built by a freelancer for freelancers. Discover our story, our mission, and the 9 free and pro tools we offer to help you run your business.',
  alternates: { canonical: 'https://toolstack.io/about' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const tools = [
  { name: 'Invoice Generator', href: '/invoice-generator', icon: FileText, free: true },
  { name: 'VAT Calculator', href: '/vat-calculator', icon: Calculator, free: true },
  { name: 'Currency Converter', href: '/currency-converter', icon: DollarSign, free: true },
  { name: 'Meeting Time Planner', href: '/meeting-time-planner', icon: Clock, free: true },
  { name: 'Tax Rates by Country', href: '/tax-rates', icon: BarChart3, free: true },
  { name: 'Time Converter', href: '/time-converter', icon: Timer, free: true },
  { name: 'Privacy Policy Generator', href: '/privacy-policy-generator', icon: Shield, free: false },
  { name: 'Terms of Service Generator', href: '/terms-generator', icon: ScrollText, free: false },
  { name: 'Contract Generator', href: '/contract-generator', icon: PenLine, free: false },
]

const stats = [
  { value: '5,000+', label: 'Active users' },
  { value: '9', label: 'Business tools' },
  { value: '55+', label: 'Countries' },
]

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20,
        border: `1px solid ${BORDER}`,
        padding: '48px 48px 44px',
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: -80,
          transform: 'translateX(-50%)',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 24, fontSize: 12, color: MUTED }}>
          <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: DARK, fontWeight: 500 }}>About</span>
        </div>

        <div style={{
          width: 60, height: 60, borderRadius: 16, background: B,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 6px 20px rgba(21,94,239,0.30)',
        }}>
          <Wrench size={26} color="white" />
        </div>

        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: DARK, letterSpacing: '-0.8px', margin: '0 0 14px' }}>
          Built for freelancers,<br />by a freelancer.
        </h1>
        <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.7, margin: '0 auto', maxWidth: 520 }}>
          Running a freelance business shouldn't require expensive software. ToolStack gives you professional-grade tools — completely free — to handle invoices, taxes, contracts, and more.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {stats.map(({ value, label }) => (
          <div key={label} style={{
            background: 'white', borderRadius: 14, border: `1px solid ${BORDER}`,
            padding: '24px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: B, letterSpacing: '-1px' }}>{value}</div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div style={{
        background: 'white', borderRadius: 16, border: `1px solid ${BORDER}`,
        padding: '32px 36px', marginBottom: 32,
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: '0 0 14px', letterSpacing: '-0.3px' }}>Our Mission</h2>
        <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, margin: '0 0 14px' }}>
          Independent professionals — freelancers, consultants, small business owners — shouldn't need to pay for every tool they use. We believe the basics should be free and excellent.
        </p>
        <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, margin: 0 }}>
          ToolStack started as a personal toolbox and grew into something more: a platform used by thousands of professionals in over 55 countries. Pro features exist to sustain the project, but the core will always be free.
        </p>
      </div>

      {/* Team / Founder */}
      <div style={{
        background: `linear-gradient(135deg, ${LIGHT} 0%, white 100%)`,
        borderRadius: 16, border: `1px solid ${BORDER}`,
        padding: '32px 36px', marginBottom: 32,
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: '0 0 20px', letterSpacing: '-0.3px' }}>The Team</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', background: B,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white', flexShrink: 0,
            boxShadow: '0 4px 14px rgba(21,94,239,0.25)',
          }}>
            AB
          </div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: 0 }}>Alexandre Bento</p>
            <p style={{ fontSize: 13, color: B, margin: '2px 0 6px', fontWeight: 500 }}>Founder &amp; Developer</p>
            <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
              Freelancer turned indie developer. Built ToolStack to scratch his own itch — and kept going when other freelancers said it helped them too.
            </p>
          </div>
        </div>
      </div>

      {/* Tools grid */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: '0 0 16px', letterSpacing: '-0.3px' }}>Our Tools</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
          {tools.map(({ name, href, icon: Icon, free }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: 12, border: `1px solid ${BORDER}`,
                padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, background: LIGHT,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={16} color={B} />
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: DARK, margin: 0 }}>{name}</p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                    color: free ? '#059669' : B,
                  }}>
                    {free ? '✓ Free' : '⚡ Pro'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: DARK, borderRadius: 20, padding: '40px 44px',
        textAlign: 'center',
      }}>
        <Globe size={28} color={B} style={{ margin: '0 auto 14px' }} />
        <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', margin: '0 0 10px', letterSpacing: '-0.4px' }}>
          Start using ToolStack today
        </h2>
        <p style={{ fontSize: 15, color: '#9CA3AF', margin: '0 0 24px' }}>
          Free tools, no sign-up required.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/tools" style={{
            padding: '11px 24px', borderRadius: 10, background: B,
            color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600,
          }}>
            Browse all tools
          </Link>
          <Link href="/pricing" style={{
            padding: '11px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.08)',
            color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  )
}
