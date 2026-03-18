import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — ToolStack',
  description: 'ToolStack privacy policy. Learn how we collect, use, and protect your data when you use our free and pro business tools.',
  alternates: { canonical: 'https://toolstack.io/privacy' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const LAST_UPDATED = 'March 2026'

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
        borderRadius: 20, border: `1px solid ${BORDER}`,
        padding: '36px 40px', marginBottom: 28,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -60, top: -60,
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,94,239,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 12, color: MUTED }}>
          <Link href="/" style={{ color: MUTED, textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: DARK, fontWeight: 500 }}>Privacy Policy</span>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: DARK, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Content */}
      <div style={{
        background: 'white', borderRadius: 16, border: `1px solid ${BORDER}`,
        padding: '36px 40px',
      }}>
        <div className="prose prose-neutral prose-sm max-w-none">
          <p>ToolStack (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights.</p>

          <h2>1. Information We Collect</h2>
          <h3>Account information</h3>
          <p>When you sign in with Google, we receive your name, email address, and profile picture from Google. This is used to create and maintain your ToolStack account.</p>

          <h3>Usage data</h3>
          <p>We collect anonymised usage statistics (pages visited, tools used, country of origin) to improve ToolStack. This data does not identify you personally.</p>

          <h3>Documents and tool output</h3>
          <p>Free tools (Invoice Generator, VAT Calculator, Currency Converter, Meeting Time Planner, Tax Rates, Time Converter) process all data <strong>entirely in your browser</strong>. No invoice data, currency amounts, or calculation inputs are ever sent to our servers.</p>
          <p>Pro tools (Privacy Policy Generator, Terms of Service Generator, Contract Generator) send your inputs to our AI provider (Anthropic) to generate documents. If you choose to save a document to your dashboard, it is stored in our database (Supabase).</p>

          <h3>Payment information</h3>
          <p>Payments are processed by Stripe. We never store your card details. We receive only your subscription status and billing email from Stripe.</p>

          <h3>Newsletter</h3>
          <p>If you subscribe to the ToolStack newsletter, we store your email address to send you our newsletter. You can unsubscribe at any time via the link in any email.</p>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To provide and improve ToolStack services</li>
            <li>To manage your subscription via Stripe</li>
            <li>To send newsletters (only if you subscribed)</li>
            <li>To send transactional emails (subscription confirmation, receipts)</li>
            <li>To detect and prevent abuse or fraud</li>
          </ul>

          <h2>3. Data Storage and Security</h2>
          <p>User data is stored in Supabase (EU region). We use industry-standard security practices including TLS encryption in transit and AES-256 encryption at rest. Access to user data is strictly limited to the ToolStack team.</p>

          <h2>4. Third-Party Services</h2>
          <ul>
            <li><strong>Supabase</strong> — database and authentication (EU region)</li>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>Anthropic</strong> — AI text generation for Pro tools</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
            <li><strong>Vercel</strong> — hosting and infrastructure</li>
          </ul>
          <p>Each provider is bound by their own privacy policy and applicable data protection regulations.</p>

          <h2>5. Cookies</h2>
          <p>We use essential cookies only: a session cookie to keep you signed in, and an authentication cookie set by Supabase. We do not use advertising cookies or tracking pixels.</p>

          <h2>6. Your Rights (GDPR)</h2>
          <p>If you are located in the European Union, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
          <p>To exercise any of these rights, email us at <a href="mailto:privacy@toolstack.io" style={{ color: B }}>privacy@toolstack.io</a>.</p>

          <h2>7. Data Retention</h2>
          <p>We retain your account data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it by law (e.g., billing records for tax compliance).</p>

          <h2>8. Children</h2>
          <p>ToolStack is not directed at children under the age of 16. We do not knowingly collect personal data from children.</p>

          <h2>9. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify subscribers by email of any material changes. Continued use of ToolStack after changes constitutes acceptance of the updated policy.</p>

          <h2>10. Contact</h2>
          <p>Questions about this policy? Contact us at <a href="mailto:privacy@toolstack.io" style={{ color: B }}>privacy@toolstack.io</a>.</p>
        </div>
      </div>
    </div>
  )
}
