import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Calculator, DollarSign, Clock, BarChart3, Timer, Shield, ScrollText, PenLine, Layers } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Business Tools for Freelancers — ToolStack',
  description: 'Browse all 9 ToolStack business tools: Invoice Generator, VAT Calculator, Currency Converter, Contract Generator, and more. Free and Pro tools for freelancers.',
  alternates: { canonical: 'https://toolstack.io/tools' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const freeTools = [
  {
    name: 'Invoice Generator',
    href: '/invoice-generator',
    icon: FileText,
    description: 'Create professional PDF invoices with line items, VAT, and multi-currency support. No sign-up required.',
  },
  {
    name: 'VAT Calculator',
    href: '/vat-calculator',
    icon: Calculator,
    description: 'Add or remove VAT for any EU country, UK, Australia, Canada, and Japan. Instant reverse VAT calculation.',
  },
  {
    name: 'Currency Converter',
    href: '/currency-converter',
    icon: DollarSign,
    description: 'Convert currencies at real mid-market rates. See exactly how much banks charge in hidden fees.',
  },
  {
    name: 'Meeting Time Planner',
    href: '/meeting-time-planner',
    icon: Clock,
    description: 'Find the perfect meeting time for distributed teams with a visual timezone ruler.',
  },
  {
    name: 'Tax Rates by Country',
    href: '/tax-rates',
    icon: BarChart3,
    description: 'Corporate tax, income tax, and withholding rates for 55+ countries. Updated for 2026.',
  },
  {
    name: 'Time Converter',
    href: '/time-converter',
    icon: Timer,
    description: 'Convert between seconds, minutes, hours, days, weeks, months, and years instantly.',
  },
]

const proTools = [
  {
    name: 'Privacy Policy Generator',
    href: '/privacy-policy-generator',
    icon: Shield,
    description: 'AI-generated privacy policy tailored to your website — GDPR, CCPA, and PIPEDA compliant.',
  },
  {
    name: 'Terms of Service Generator',
    href: '/terms-generator',
    icon: ScrollText,
    description: 'Custom Terms of Service for SaaS, e-commerce, and freelancers. Tailored to your refund policy.',
  },
  {
    name: 'Contract Generator',
    href: '/contract-generator',
    icon: PenLine,
    description: 'Freelance agreements, NDAs, client contracts, and consulting agreements generated with AI.',
  },
]

interface Tool {
  name: string
  href: string
  icon: React.ElementType
  description: string
}

function ToolCard({ tool, pro = false }: { tool: Tool; pro?: boolean }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} style={{ textDecoration: 'none' }}>
      <div style={{
        background: 'white', borderRadius: 14, border: `1px solid ${BORDER}`,
        padding: '22px 24px', height: '100%',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: LIGHT,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon size={20} color={B} />
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const,
            padding: '3px 9px', borderRadius: 999,
            background: pro ? '#EEF4FF' : '#ECFDF5',
            color: pro ? B : '#059669',
            border: `1px solid ${pro ? '#C7D7FD' : '#A7F3D0'}`,
            flexShrink: 0,
          }}>
            {pro ? '⚡ Pro' : '✓ Free'}
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: '0 0 6px' }}>{tool.name}</h3>
          <p style={{ fontSize: 13, color: '#4B5563', margin: 0, lineHeight: 1.6 }}>{tool.description}</p>
        </div>
        <span style={{ fontSize: 13, color: B, fontWeight: 600 }}>Use tool →</span>
      </div>
    </Link>
  )
}

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20, border: `1px solid ${BORDER}`,
        padding: '40px 44px', marginBottom: 36,
        position: 'relative', overflow: 'hidden', textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: -60, transform: 'translateX(-50%)',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 20, fontSize: 12, color: MUTED }}>
          <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: DARK, fontWeight: 500 }}>Tools</span>
        </div>

        <div style={{
          width: 56, height: 56, borderRadius: 15, background: B,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 18px',
          boxShadow: '0 6px 20px rgba(21,94,239,0.28)',
        }}>
          <Layers size={24} color="white" />
        </div>

        <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 900, color: DARK, letterSpacing: '-0.6px', margin: '0 0 12px' }}>
          9 Free &amp; Pro Business Tools
        </h1>
        <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.65, margin: '0 auto', maxWidth: 500 }}>
          Everything a freelancer or small business needs — invoicing, tax calculations, legal documents, and more.
        </p>
      </div>

      {/* Free tools */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: 0, letterSpacing: '-0.3px' }}>Free Tools</h2>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: 999,
            background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0',
          }}>No sign-up required</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {freeTools.map(tool => <ToolCard key={tool.href} tool={tool} />)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: BORDER, marginBottom: 40 }} />

      {/* Pro tools */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: 0, letterSpacing: '-0.3px' }}>Pro Tools</h2>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: 999,
            background: '#EEF4FF', color: B, border: '1px solid #C7D7FD',
          }}>Requires Pro plan</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {proTools.map(tool => <ToolCard key={tool.href} tool={tool} pro />)}
        </div>
      </div>

      {/* Pro CTA */}
      <div style={{
        background: DARK, borderRadius: 18, padding: '36px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 20,
      }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'white', margin: '0 0 6px', letterSpacing: '-0.3px' }}>Unlock all Pro tools</h3>
          <p style={{ fontSize: 14, color: '#9CA3AF', margin: 0 }}>Privacy policy, Terms of Service, Contract Generator — from €9/month.</p>
        </div>
        <Link href="/pricing" style={{
          padding: '11px 24px', borderRadius: 10, background: B,
          color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600,
          flexShrink: 0,
        }}>
          See pricing →
        </Link>
      </div>
    </div>
  )
}
