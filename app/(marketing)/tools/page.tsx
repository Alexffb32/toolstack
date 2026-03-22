'use client'

import Link from 'next/link'
import { FileText, Calculator, DollarSign, Clock, BarChart3, Timer, Shield, ScrollText, PenLine, Layers, ArrowRight, Lock, Zap, Star } from 'lucide-react'

export const dynamic = 'force-static'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const freeTools = [
  { name: 'Invoice Generator', href: '/invoice-generator', icon: FileText, description: 'Professional PDF invoices with line items, VAT & multi-currency. Download in seconds.', color: '#EEF4FF', iconColor: B },
  { name: 'VAT Calculator', href: '/vat-calculator', icon: Calculator, description: 'Add or remove VAT for any EU country, UK, Australia, Canada, Japan. Instant reverse calculation.', color: '#F0FDF4', iconColor: '#059669' },
  { name: 'Currency Converter', href: '/currency-converter', icon: DollarSign, description: 'Real mid-market exchange rates. See exactly how much banks charge in hidden fees.', color: '#FFF7ED', iconColor: '#EA580C' },
  { name: 'Meeting Time Planner', href: '/meeting-time-planner', icon: Clock, description: 'Visual timezone ruler to find the perfect overlap for distributed teams.', color: '#F5F3FF', iconColor: '#7C3AED' },
  { name: 'Tax Rates by Country', href: '/tax-rates', icon: BarChart3, description: 'Corporate tax, income tax & withholding rates for 55+ countries. Updated for 2026.', color: '#FFF1F2', iconColor: '#E11D48' },
  { name: 'Time Converter', href: '/time-converter', icon: Timer, description: 'Convert between seconds, minutes, hours, days, weeks, months, and years instantly.', color: '#F0FDF4', iconColor: '#16A34A' },
]

const proTools = [
  { name: 'Privacy Policy Generator', href: '/privacy-policy-generator', icon: Shield, description: 'AI-generated privacy policy tailored to your website — GDPR, CCPA, and PIPEDA compliant.', color: '#EEF4FF', iconColor: B },
  { name: 'Terms of Service Generator', href: '/terms-generator', icon: ScrollText, description: 'Custom Terms of Service for SaaS, e-commerce, and freelancers — tailored to your refund policy.', color: '#F5F3FF', iconColor: '#7C3AED' },
  { name: 'Contract Generator', href: '/contract-generator', icon: PenLine, description: 'Freelance agreements, NDAs, client contracts, and consulting agreements generated with AI.', color: '#FFF7ED', iconColor: '#EA580C' },
]

function ToolCard({ tool, pro = false }: { tool: typeof freeTools[0]; pro?: boolean }) {
  const Icon = tool.icon
  return (
    <Link href={tool.href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          background: 'white', borderRadius: 16,
          border: `1px solid ${BORDER}`,
          padding: '24px', height: '100%',
          display: 'flex', flexDirection: 'column', gap: 0,
          transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
          cursor: 'pointer', position: 'relative', overflow: 'hidden',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 8px 32px rgba(21,94,239,0.10)'
          el.style.transform = 'translateY(-2px)'
          el.style.borderColor = '#C7D7FD'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
          el.style.borderColor = BORDER
        }}
      >
        {/* Top color accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: pro ? '#7C3AED' : B, borderRadius: '16px 16px 0 0' }} />

        {/* Icon + badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, marginTop: 8 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 13,
            background: tool.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={22} color={tool.iconColor} />
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 999, flexShrink: 0,
            background: pro ? '#F5F3FF' : '#ECFDF5',
            color: pro ? '#7C3AED' : '#059669',
            border: `1px solid ${pro ? '#DDD6FE' : '#A7F3D0'}`,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            {pro ? <><Lock size={8} />Pro</> : <><Star size={8} />Free</>}
          </span>
        </div>

        {/* Name + description */}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: '0 0 8px', letterSpacing: '-0.2px' }}>
          {tool.name}
        </h3>
        <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 16px', lineHeight: 1.65, flex: 1 }}>
          {tool.description}
        </p>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: pro ? '#7C3AED' : B }}>
          {pro ? 'Unlock with Pro' : 'Open tool'}
          <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}

export default function ToolsPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 22, border: `1px solid ${BORDER}`,
        padding: '48px 52px', marginBottom: 44,
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          width: 68, height: 68, borderRadius: 18, background: B,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 8px 24px rgba(21,94,239,0.28)',
        }}>
          <Layers size={28} color="white" />
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, fontSize: 12, color: MUTED }}>
            <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <span style={{ color: DARK, fontWeight: 500 }}>Tools</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', fontWeight: 900, color: DARK, letterSpacing: '-0.6px', margin: '0 0 10px' }}>
            9 Business Tools
          </h1>
          <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
            Everything a freelancer or small business needs — invoicing, tax calculations, legal documents, and more. 6 tools completely free.
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: B, margin: '0 0 2px', letterSpacing: '-0.5px' }}>6</p>
            <p style={{ fontSize: 11, color: MUTED, margin: 0, fontWeight: 500 }}>Free tools</p>
          </div>
          <div style={{ width: 1, background: BORDER }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: '#7C3AED', margin: '0 0 2px', letterSpacing: '-0.5px' }}>3</p>
            <p style={{ fontSize: 11, color: MUTED, margin: 0, fontWeight: 500 }}>Pro tools</p>
          </div>
        </div>
      </div>

      {/* Free tools */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: 0, letterSpacing: '-0.3px' }}>Free Tools</h2>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 999,
            background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0',
          }}>No sign-up required</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {freeTools.map(tool => <ToolCard key={tool.href} tool={tool} />)}
        </div>
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 44 }}>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 999,
          background: '#F5F3FF', border: '1px solid #DDD6FE',
          fontSize: 12, fontWeight: 600, color: '#7C3AED',
        }}>
          <Zap size={12} /> Pro Tools
        </div>
        <div style={{ flex: 1, height: 1, background: BORDER }} />
      </div>

      {/* Pro tools */}
      <div style={{ marginBottom: 44 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {proTools.map(tool => <ToolCard key={tool.href} tool={tool} pro />)}
        </div>
      </div>

      {/* Pro CTA */}
      <div style={{
        background: DARK, borderRadius: 20, padding: '40px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 24, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Zap size={16} color="#FCD34D" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Pro Plan</span>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', margin: '0 0 6px', letterSpacing: '-0.3px' }}>Unlock all 3 AI-powered tools</h3>
          <p style={{ fontSize: 14, color: '#9CA3AF', margin: 0 }}>Privacy policy, Terms of Service, Contract Generator — from €9/month. Cancel anytime.</p>
        </div>
        <Link href="/pricing" style={{
          padding: '12px 28px', borderRadius: 12, background: B,
          color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600,
          flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(21,94,239,0.4)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 6px 20px rgba(21,94,239,0.5)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.transform = 'translateY(0)'
            el.style.boxShadow = '0 4px 16px rgba(21,94,239,0.4)'
          }}
        >
          See pricing <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
