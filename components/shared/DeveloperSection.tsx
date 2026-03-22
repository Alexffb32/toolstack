'use client'

import { Github, Linkedin, Globe, Code2, Heart } from 'lucide-react'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

export function DeveloperSection() {
  return (
    <section style={{ background: LIGHT, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{
          background: 'white', borderRadius: 24, border: `1px solid ${BORDER}`,
          padding: '48px 52px',
          display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap',
          boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', right: -80, top: -80,
            width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(21,94,239,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 96, height: 96, borderRadius: 24,
              background: `linear-gradient(135deg, ${B} 0%, #4F8EF7 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 28px rgba(21,94,239,0.28)',
              fontSize: 36, fontWeight: 900, color: 'white',
              letterSpacing: '-1px',
            }}>
              AB
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B, margin: 0 }}>
                Built by
              </p>
              <Code2 size={12} color={B} />
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: DARK, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
              Alexandre Bento
            </h2>
            <p style={{ fontSize: 14.5, color: '#4B5563', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 480 }}>
              Indie developer building tools that make freelancers' lives easier. ToolStack started as a side project to scratch my own itch — and grew into something I&apos;m proud of. Every tool is designed with simplicity and speed in mind.
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {['Full-stack Dev', 'Next.js', 'TypeScript', 'Indie Maker'].map(tag => (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999,
                  background: LIGHT, color: B, border: `1px solid ${BORDER}`,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href="https://github.com/Alexffb32"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 10,
                  border: `1.5px solid ${BORDER}`, background: 'white',
                  fontSize: 13, fontWeight: 600, color: DARK, textDecoration: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = B
                  el.style.boxShadow = '0 0 0 3px rgba(21,94,239,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = BORDER
                  el.style.boxShadow = 'none'
                }}
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="mailto:support@toolstack.io"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '8px 16px', borderRadius: 10,
                  border: `1.5px solid ${BORDER}`, background: 'white',
                  fontSize: 13, fontWeight: 600, color: DARK, textDecoration: 'none',
                  transition: 'border-color 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = B
                  el.style.boxShadow = '0 0 0 3px rgba(21,94,239,0.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = BORDER
                  el.style.boxShadow = 'none'
                }}
              >
                <Globe size={15} /> Contact
              </a>
            </div>
          </div>

          {/* Made with love */}
          <div style={{
            position: 'absolute', bottom: 20, right: 24,
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: MUTED,
          }}>
            Made with <Heart size={11} color="#EF4444" fill="#EF4444" /> in Portugal
          </div>
        </div>
      </div>
    </section>
  )
}
