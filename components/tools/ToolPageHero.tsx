import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

interface ToolPageHeroProps {
  title: string
  description: string
  badge: 'Free' | 'Pro'
  icon: LucideIcon
  toolCategory?: string
}

export function ToolPageHero({ title, description, badge, icon: Icon, toolCategory = 'Tools' }: ToolPageHeroProps) {
  return (
    <div style={{
      background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
      borderRadius: 20,
      border: `1px solid ${BORDER}`,
      padding: '32px 36px',
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', right: -60, top: -60,
        width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,94,239,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 12, color: MUTED }}>
        <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link href="/tools" style={{ color: MUTED, textDecoration: 'none' }}>{toolCategory}</Link>
        <span>›</span>
        <span style={{ color: DARK, fontWeight: 500 }}>{title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: B,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 4px 16px rgba(21,94,239,0.25)',
        }}>
          <Icon size={22} color="white" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: DARK, letterSpacing: '-0.56px', margin: 0 }}>
              {title}
            </h1>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: 999,
              background: badge === 'Free' ? '#ECFDF5' : '#EEF4FF',
              color: badge === 'Free' ? '#059669' : B,
              border: `1px solid ${badge === 'Free' ? '#A7F3D0' : '#C7D7FD'}`,
            }}>
              {badge === 'Free' ? '✓ Free' : '⚡ Pro'}
            </span>
          </div>
          <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: 600 }}>{description}</p>
        </div>
      </div>
    </div>
  )
}
