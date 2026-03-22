'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Building2, Sparkles, ArrowUpRight, Shield, Star, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const B = '#155EEF'
const DARK = '#0D1117'
const BODY = '#4B5563'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    monthly: 0,
    yearly: 0,
    description: 'All core business tools, forever free',
    badge: null,
    features: [
      'Invoice Generator (PDF export)',
      'Meeting Time Planner',
      'VAT Calculator — all EU countries',
      'Currency Converter — 30+ currencies',
      'Tax Rates for 55+ countries',
      'Time Converter',
      'Daily business newsletter',
    ],
    limits: [
      'Ads shown on tools',
      'No document saving',
      'No AI features',
    ],
    cta: 'Start for Free',
    href: '/invoice-generator',
    dark: false,
    priceId: null,
    yearlySaving: '',
  },
  {
    name: 'Pro',
    icon: Zap,
    monthly: 9,
    yearly: 79,
    yearlySaving: 'Save €29',
    description: 'AI-powered documents for freelancers',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Privacy Policy Generator (GDPR/CCPA)',
      'Terms of Service Generator',
      'Contract Generator — 5 contract types',
      'Save unlimited documents to dashboard',
      'No advertisements',
      'PDF export without watermark',
      'Email support',
    ],
    limits: [],
    cta: 'Get Pro',
    href: null,
    dark: true,
    priceId: 'individual',
  },
  {
    name: 'Max',
    icon: Building2,
    monthly: 29,
    yearly: 249,
    yearlySaving: 'Save €99',
    description: 'Full power for teams & agencies',
    badge: 'Best Value',
    features: [
      'Everything in Pro',
      'Up to 5 team members',
      'Unlimited AI document generation',
      'Custom branding on all PDFs',
      'Bulk invoice generation',
      'Custom contract templates',
      'Priority support',
      'API access (coming soon)',
    ],
    limits: [],
    cta: 'Get Max',
    href: null,
    dark: false,
    priceId: 'enterprise',
  },
]

const faqs = [
  { q: 'Can I cancel anytime?', a: 'Yes. Cancel from your dashboard at any time. You keep full access until the end of your billing period — no questions asked.' },
  { q: 'What is the difference between Pro and Max?', a: 'Pro is designed for individual freelancers and solo professionals. Max unlocks team seats (up to 5), unlimited AI generation, custom branding, and priority support — built for teams that run on ToolStack daily.' },
  { q: 'Is there a free trial for Pro or Max?', a: "The Free plan is permanently free. Start with free tools to evaluate the platform, then upgrade when you're ready." },
  { q: 'What payment methods are accepted?', a: 'All major credit and debit cards via Stripe. Your payment data is never stored on our servers.' },
  { q: 'Can I switch between plans?', a: 'Yes. Upgrade or downgrade at any time. Stripe handles prorated billing automatically.' },
  { q: 'Do you offer invoices for billing?', a: 'Yes. Stripe automatically generates invoices for every payment. Download them directly from your account dashboard.' },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const router = useRouter()

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan)
    const supabase = createClient()

    // getUser() makes a network call to verify — more reliable than getSession()
    // which only reads cookies and can miss freshly-set OAuth sessions
    let { data: { user } } = await supabase.auth.getUser()

    // If no user, try refreshing the session once (covers OAuth redirect edge case)
    if (!user) {
      const { data: refreshed } = await supabase.auth.refreshSession()
      user = refreshed.user
    }

    if (!user) {
      router.push('/login?redirect=/pricing')
      setLoadingPlan(null)
      return
    }

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, interval: yearly ? 'yearly' : 'monthly' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Checkout error: ' + (data.error || 'Unknown error'))
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div style={{ background: LIGHT, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 64px' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%,-50%)',
            width: 600, height: 400,
            background: 'radial-gradient(ellipse, rgba(21,94,239,0.14) 0%, transparent 70%)',
            filter: 'blur(60px)', borderRadius: '50%',
          }} />
        </div>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 999,
              background: 'white', border: `1px solid ${BORDER}`,
              fontSize: 12, fontWeight: 600, color: DARK, marginBottom: 24,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
              <Sparkles size={12} color={B} />
              Simple, transparent pricing
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: DARK, letterSpacing: '-1.2px', lineHeight: 1.05, marginBottom: 16 }}>
              Start free.<br />
              <span style={{ color: B }}>Scale when you&apos;re ready.</span>
            </h1>
            <p style={{ fontSize: 17, color: BODY, lineHeight: 1.65, marginBottom: 36 }}>
              All 6 core tools are free forever. Upgrade to Pro for AI-powered legal documents and no ads.
            </p>

            {/* Toggle */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'white', border: `1px solid ${BORDER}`, borderRadius: 999, padding: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <button onClick={() => setYearly(false)} style={{
                padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: !yearly ? B : 'transparent',
                color: !yearly ? 'white' : MUTED,
                transition: 'all 0.2s',
              }}>Monthly</button>
              <button onClick={() => setYearly(true)} style={{
                padding: '8px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                background: yearly ? B : 'transparent',
                color: yearly ? 'white' : MUTED,
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Yearly
                <span style={{ background: '#ECFDF5', color: '#059669', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>–32%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: 1040, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const price = yearly && plan.yearly > 0 ? Math.round(plan.yearly / 12) : plan.monthly
            const billedAs = yearly && plan.yearly > 0 ? `€${plan.yearly}/year` : null

            return (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
                <div style={{
                  borderRadius: 24, padding: '36px 28px',
                  background: plan.dark ? DARK : 'white',
                  border: `1px solid ${plan.dark ? 'transparent' : BORDER}`,
                  boxShadow: plan.dark ? '0 8px 48px rgba(0,0,0,0.20)' : '0 1px 4px rgba(0,0,0,0.04)',
                  height: '100%', display: 'flex', flexDirection: 'column', position: 'relative',
                  transform: plan.dark ? 'scale(1.02)' : 'scale(1)',
                }}>
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)' }}>
                      <span style={{
                        background: plan.name === 'Max' ? '#8B5CF6' : B,
                        color: 'white', fontSize: 10, fontWeight: 700,
                        padding: '4px 12px', borderRadius: 999,
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <Star size={9} style={{ fill: 'white' }} /> {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: plan.dark ? 'rgba(255,255,255,0.12)' : '#EEF4FF',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={16} color={plan.dark ? 'white' : B} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: plan.dark ? 'rgba(255,255,255,0.5)' : MUTED }}>{plan.name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                      {price === 0 ? (
                        <span style={{ fontSize: 48, fontWeight: 900, color: plan.dark ? 'white' : DARK, letterSpacing: '-1px' }}>Free</span>
                      ) : (
                        <>
                          <span style={{ fontSize: 48, fontWeight: 900, color: plan.dark ? 'white' : DARK, letterSpacing: '-1px' }}>€{price}</span>
                          <span style={{ fontSize: 14, color: plan.dark ? 'rgba(255,255,255,0.45)' : MUTED }}>/month</span>
                        </>
                      )}
                    </div>
                    {billedAs && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: plan.dark ? 'rgba(255,255,255,0.45)' : MUTED }}>Billed as {billedAs}</span>
                        {plan.yearlySaving && <span style={{ background: '#ECFDF5', color: '#059669', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999 }}>{plan.yearlySaving}</span>}
                      </div>
                    )}
                    {!yearly && plan.yearly > 0 && (
                      <p style={{ fontSize: 11, color: plan.dark ? 'rgba(255,255,255,0.35)' : MUTED, margin: 0 }}>
                        or €{Math.round(plan.yearly / 12)}/mo billed yearly
                      </p>
                    )}
                    <p style={{ fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.55)' : BODY, marginTop: 8, marginBottom: 0 }}>{plan.description}</p>
                  </div>

                  {/* CTA */}
                  <div style={{ marginBottom: 24 }}>
                    {plan.priceId ? (
                      <button
                        onClick={() => handleCheckout(plan.priceId!)}
                        disabled={loadingPlan === plan.priceId}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          padding: '13px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                          cursor: loadingPlan === plan.priceId ? 'not-allowed' : 'pointer',
                          background: plan.dark ? 'white' : B,
                          color: plan.dark ? DARK : 'white',
                          border: 'none',
                          opacity: loadingPlan === plan.priceId ? 0.7 : 1,
                          boxShadow: plan.dark ? 'none' : '0 2px 12px rgba(21,94,239,0.25)',
                        }}>
                        {loadingPlan === plan.priceId ? 'Loading…' : plan.cta}
                        <span style={{ width: 20, height: 20, borderRadius: '50%', background: plan.dark ? LIGHT : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ArrowUpRight size={11} color={plan.dark ? B : 'white'} />
                        </span>
                      </button>
                    ) : (
                      <Link href={plan.href!}>
                        <button style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          padding: '13px', borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                          background: 'transparent', color: DARK,
                          border: `1.5px solid ${BORDER}`,
                        }}>
                          {plan.cta}
                          <span style={{ width: 20, height: 20, borderRadius: '50%', background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ArrowUpRight size={11} color={B} />
                          </span>
                        </button>
                      </Link>
                    )}
                  </div>

                  {/* Features */}
                  <div style={{ borderTop: `1px solid ${plan.dark ? 'rgba(255,255,255,0.08)' : BORDER}`, paddingTop: 20, flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {plan.features.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.7)' : BODY }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.dark ? 'rgba(255,255,255,0.12)' : '#EEF4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <Check size={10} color={plan.dark ? 'white' : B} strokeWidth={3} />
                          </div>
                          {f}
                        </li>
                      ))}
                      {plan.limits.map((f) => (
                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: plan.dark ? 'rgba(255,255,255,0.3)' : '#9CA3AF', textDecoration: 'line-through' }}>
                          <div style={{ width: 18, height: 18, borderRadius: '50%', background: plan.dark ? 'rgba(255,255,255,0.05)' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                            <span style={{ fontSize: 8, color: '#9CA3AF' }}>✕</span>
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Talk to Sales */}
        <div style={{
          marginTop: 32, background: '#F8FAFF', border: `1px solid #C7D7FD`,
          borderRadius: 16, padding: '20px 28px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: DARK, margin: '0 0 4px' }}>Need help choosing a plan?</p>
            <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>Our team is happy to answer questions and find the right fit for your business.</p>
          </div>
          <a
            href="mailto:support@toolstack.io?subject=Sales%20Inquiry"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 999, fontSize: 14, fontWeight: 600,
              background: B, color: 'white', textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(21,94,239,0.25)', whiteSpace: 'nowrap',
            }}>
            <MessageCircle size={15} />
            Talk to Support
          </a>
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, marginTop: 32, flexWrap: 'wrap' }}>
          {[
            { icon: Shield, text: 'Secured by Stripe' },
            { icon: Check, text: 'Cancel anytime' },
            { icon: Zap, text: 'Instant access' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: MUTED }}>
              <Icon size={13} color={B} /> {text}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'white', borderTop: `1px solid ${BORDER}` }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: B, marginBottom: 8 }}>FAQ</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: DARK, letterSpacing: '-0.72px', margin: 0 }}>Frequently Asked Questions</h2>
          </div>
          <div>
            {faqs.map(({ q, a }, i) => (
              <div key={q} style={{ borderBottom: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: DARK }}>{q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}
                    style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 16, fontSize: 14, color: MUTED, lineHeight: 1 }}>
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}>
                      <p style={{ margin: '0 0 20px', fontSize: 14, color: BODY, lineHeight: 1.7, paddingRight: 40 }}>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{
          borderRadius: 24, padding: '48px 40px', textAlign: 'center',
          background: `linear-gradient(135deg, #1047C8 0%, ${B} 60%, #1A6AFF 100%)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
          <h2 style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: '-0.64px', marginBottom: 12, position: 'relative', zIndex: 1 }}>
            Start with free tools today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, marginBottom: 28, position: 'relative', zIndex: 1 }}>
            No credit card required. Upgrade when you need AI-powered documents.
          </p>
          <Link href="/invoice-generator" style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: DARK, fontWeight: 600, fontSize: 15, padding: '13px 28px', borderRadius: 999, border: 'none', cursor: 'pointer' }}>
              Try Free Tools
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowUpRight size={12} color={B} />
              </span>
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  )
}
