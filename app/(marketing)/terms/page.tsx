import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — ToolStack',
  description: 'ToolStack Terms of Service. Read the terms governing your use of ToolStack, subscriptions, refunds, and intellectual property.',
  alternates: { canonical: 'https://toolstack.io/terms' },
}

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const LAST_UPDATED = 'March 2026'

export default function TermsPage() {
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
          <span style={{ color: DARK, fontWeight: 500 }}>Terms of Service</span>
        </div>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: DARK, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: MUTED, margin: 0 }}>Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Content */}
      <div style={{
        background: 'white', borderRadius: 16, border: `1px solid ${BORDER}`,
        padding: '36px 40px',
      }}>
        <div className="prose prose-neutral prose-sm max-w-none">
          <p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of ToolStack (&ldquo;the Service&rdquo;), operated by Alexandre Bento (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By using ToolStack, you agree to these Terms.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using ToolStack, you agree to be bound by these Terms and our <Link href="/privacy" style={{ color: B }}>Privacy Policy</Link>. If you do not agree, do not use the Service.</p>

          <h2>2. Description of Service</h2>
          <p>ToolStack provides free and paid business tools for freelancers and small businesses, including invoice generation, tax calculators, and AI-powered legal document generation. Free tools are available without an account. Pro tools require a paid subscription.</p>

          <h2>3. Accounts</h2>
          <p>You may create an account using Google OAuth. You are responsible for maintaining the security of your account and all activities that occur under it. You must provide accurate information and keep it up to date.</p>
          <p>We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraud, or abuse the Service.</p>

          <h2>4. Subscriptions and Billing</h2>
          <h3>Plans</h3>
          <p>ToolStack offers monthly and yearly subscription plans as detailed on our <Link href="/pricing" style={{ color: B }}>Pricing page</Link>. Prices are in Euros (EUR) and exclude applicable taxes.</p>

          <h3>Billing</h3>
          <p>Subscriptions are billed in advance on a monthly or annual basis. Payment is processed by Stripe. By subscribing, you authorise Stripe to charge your payment method on a recurring basis.</p>

          <h3>Cancellation</h3>
          <p>You may cancel your subscription at any time from your account dashboard. Cancellation takes effect at the end of the current billing period. You retain access to Pro features until the period ends.</p>

          <h3>Refunds</h3>
          <p>We offer a 7-day refund policy for new subscriptions. If you are unsatisfied within 7 days of your first payment, contact us at <a href="mailto:billing@toolstack.io" style={{ color: B }}>billing@toolstack.io</a> for a full refund. Refunds are not available after 7 days or for renewals.</p>

          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use ToolStack for any illegal purpose or in violation of any law</li>
            <li>Generate documents intended to defraud, mislead, or harm others</li>
            <li>Attempt to reverse engineer, scrape, or abuse the Service</li>
            <li>Use automated means to access or interact with the Service at scale</li>
            <li>Resell or sublicense access to ToolStack without our written consent</li>
          </ul>

          <h2>6. AI-Generated Content</h2>
          <p>Pro tools use AI to generate legal document templates. <strong>AI-generated content is not legal advice.</strong> ToolStack does not guarantee the accuracy, completeness, or legal sufficiency of any generated document. Always consult a qualified lawyer before relying on any AI-generated legal document.</p>
          <p>You are solely responsible for reviewing, adapting, and using any document generated by ToolStack.</p>

          <h2>7. Intellectual Property</h2>
          <p>ToolStack and its original content, features, and functionality are owned by Alexandre Bento and are protected by copyright, trademark, and other intellectual property laws.</p>
          <p>Documents you generate using ToolStack are yours. We claim no ownership over the output of our tools.</p>

          <h2>8. Privacy</h2>
          <p>Use of the Service is also governed by our <Link href="/privacy" style={{ color: B }}>Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>

          <h2>9. Disclaimers</h2>
          <p>ToolStack is provided &ldquo;as is&rdquo; without warranty of any kind. We do not warrant that the Service will be error-free, uninterrupted, or meet your specific requirements. We disclaim all warranties, express or implied, to the maximum extent permitted by law.</p>

          <h2>10. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, ToolStack and its operators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service, including but not limited to loss of profits, data loss, or business interruption.</p>

          <h2>11. Changes to Terms</h2>
          <p>We may update these Terms from time to time. We will notify you of material changes by email or by posting a notice on the site. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>

          <h2>12. Governing Law</h2>
          <p>These Terms are governed by the laws of Portugal, without regard to conflict of law provisions. Any disputes shall be subject to the exclusive jurisdiction of the courts of Portugal.</p>

          <h2>13. Contact</h2>
          <p>Questions about these Terms? Contact us at <a href="mailto:legal@toolstack.io" style={{ color: B }}>legal@toolstack.io</a>.</p>
        </div>
      </div>
    </div>
  )
}
