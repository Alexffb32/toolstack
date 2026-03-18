'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Clock, Calculator, Globe, TrendingUp, Timer, Shield, BookOpen, Briefcase } from 'lucide-react'

const tools = [
  { name: 'Invoice', href: '/invoice-generator', icon: FileText, free: true },
  { name: 'VAT', href: '/vat-calculator', icon: Calculator, free: true },
  { name: 'Currency', href: '/currency-converter', icon: Globe, free: true },
  { name: 'Meeting Time', href: '/meeting-time-planner', icon: Clock, free: true },
  { name: 'Tax Rates', href: '/tax-rates', icon: TrendingUp, free: true },
  { name: 'Time Converter', href: '/time-converter', icon: Timer, free: true },
  { name: 'Privacy Policy', href: '/privacy-policy-generator', icon: Shield, free: false },
  { name: 'Terms', href: '/terms-generator', icon: BookOpen, free: false },
  { name: 'Contract', href: '/contract-generator', icon: Briefcase, free: false },
]

const B = '#155EEF'
const DARK = '#0D1117'

export function ToolsBar() {
  const pathname = usePathname()

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #E5EAF5',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 16px',
        height: 44,
        minWidth: 'max-content',
      }}>
        {tools.map(({ name, href, icon: Icon, free }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                height: 32,
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 12.5,
                fontWeight: active ? 700 : 500,
                color: active ? B : '#475467',
                background: active ? '#EEF4FF' : 'transparent',
                border: active ? '1px solid #C7D7FD' : '1px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'background 0.1s, color 0.1s',
              }}
            >
              <Icon size={13} color={active ? B : '#98A2B3'} />
              {name}
              {!free && (
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: B,
                  background: '#EEF4FF',
                  border: '1px solid #C7D7FD',
                  borderRadius: 4,
                  padding: '1px 4px',
                  lineHeight: 1.4,
                }}>Pro</span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
