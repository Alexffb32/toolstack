'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Building2, Sparkles } from 'lucide-react'

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
      'Sleep Calculator + chronotype quiz',
      'Daily business newsletter',
    ],
    limits: [
      'Ads shown on tools',
      'No document saving',
      'No AI features',
    ],
    cta: 'Start for Free',
    href: '/invoice-generator',
    highlight: false,
    priceId: null,
    color: 'text-zinc-400',
  },
  {
    name: 'Pro',
    icon: Zap,
    monthly: 9,
    yearly: 79,
    yearlySaving: 'Save €29',
    description: 'AI-powered documents for freelancers & individuals',
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Privacy Policy Generator (GDPR/CCPA)',
      'Terms of Service Generator',
      'Contract Generator — 5 contract types',
      'Business Name Generator — 20 AI ideas',
      'Save unlimited documents to dashboard',
      'No advertisements',
      'PDF export without watermark',
      'Email support',
    ],
    limits: [],
    cta: 'Get Pro',
    href: null,
    highlight: true,
    priceId: 'individual',
    color: 'text-blue-500',
  },
  {
    name: 'Max',
    icon: Building2,
    monthly: 49,
    yearly: 399,
    yearlySaving: 'Save €189',
    description: 'Full power for companies & growing teams',
    badge: 'Best Value',
    features: [
      'Everything in Pro',
      'Up to 20 team members',
      'Unlimited AI document generation',
      'Custom branding on all PDFs',
      'Bulk invoice generation',
      'Custom contract templates',
      'Dedicated account manager',
      'Priority support with SLA',
      'API access (coming soon)',
      'Advanced usage analytics',
    ],
    limits: [],
    cta: 'Get Max',
    href: null,
    highlight: false,
    priceId: 'enterprise',
    color: 'text-violet-500',
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Start free. Scale when your business does.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 bg-muted rounded-full px-4 py-2">
          <button
            onClick={() => setYearly(false)}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-all ${!yearly ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`text-sm font-medium px-3 py-1 rounded-full transition-all ${yearly ? 'bg-background shadow text-foreground' : 'text-muted-foreground'}`}
          >
            Yearly
          </button>
          {yearly && (
            <Badge variant="secondary" className="text-xs">Up to 32% off</Badge>
          )}
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {plans.map((plan) => {
          const Icon = plan.icon
          const price = yearly && plan.yearly > 0
            ? Math.round(plan.yearly / 12)
            : plan.monthly
          const billedAs = yearly && plan.yearly > 0
            ? `€${plan.yearly}/year`
            : null

          return (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlight
                  ? 'border-primary shadow-2xl scale-[1.02]'
                  : 'border-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className={plan.name === 'Max' ? 'bg-violet-600 hover:bg-violet-600' : ''}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${plan.color}`} />
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    {price === 0 ? (
                      <span className="text-4xl font-bold">Free</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">€{price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </>
                    )}
                  </div>
                  {billedAs && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Billed as {billedAs}</span>
                      {plan.yearlySaving && (
                        <Badge variant="secondary" className="text-xs">{plan.yearlySaving}</Badge>
                      )}
                    </div>
                  )}
                  {!yearly && plan.yearly > 0 && (
                    <p className="text-xs text-muted-foreground">
                      or €{Math.round(plan.yearly / 12)}/mo billed yearly
                    </p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground pt-1">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col pt-0">
                <ul className="space-y-2 flex-1 mb-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.limits.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground line-through decoration-muted-foreground/40">
                      <span className="h-4 w-4 shrink-0 mt-0.5 text-center text-xs">✕</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {plan.priceId ? (
                  <CheckoutButton
                    plan={plan.priceId}
                    interval={yearly ? 'yearly' : 'monthly'}
                    cta={plan.cta}
                    highlight={plan.highlight}
                    isMax={plan.name === 'Max'}
                  />
                ) : (
                  <Link href={plan.href!}>
                    <Button className="w-full" variant="outline">{plan.cta}</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Social proof strip */}
      <div className="text-center mb-16 text-sm text-muted-foreground">
        Powered by <span className="font-medium text-foreground">Stripe</span> — secure payments, cancel anytime, no hidden fees.
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        {[
          {
            q: 'Can I cancel anytime?',
            a: 'Yes. Cancel from your dashboard at any time. You keep full access until the end of your billing period — no questions asked.',
          },
          {
            q: 'What is the difference between Pro and Max?',
            a: 'Pro is designed for individual freelancers and solo professionals. Max unlocks team seats (up to 20), unlimited AI generation, custom branding, a dedicated account manager, and priority SLA support — built for companies that run on ToolStack daily.',
          },
          {
            q: 'Is there a free trial for Pro or Max?',
            a: 'The Free plan is permanently free. Pro and Max don\'t require a trial — start with the free tools to evaluate the platform, then upgrade when you\'re ready.',
          },
          {
            q: 'What payment methods are accepted?',
            a: 'All major credit and debit cards via Stripe. Your payment data is never stored on our servers.',
          },
          {
            q: 'Can I switch between plans?',
            a: 'Yes. Upgrade or downgrade at any time. Stripe handles prorated billing automatically.',
          },
          {
            q: 'Do you offer invoices for billing?',
            a: 'Yes. Stripe automatically generates invoices for every payment. Download them directly from your account dashboard.',
          },
        ].map(({ q, a }) => (
          <div key={q} className="border-b pb-4 last:border-0">
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-sm text-muted-foreground">{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CheckoutButton({
  plan,
  interval,
  cta,
  highlight,
  isMax,
}: {
  plan: string
  interval: 'monthly' | 'yearly'
  cta: string
  highlight: boolean
  isMax: boolean
}) {
  return (
    <form action="/api/stripe/checkout" method="POST">
      <input type="hidden" name="plan" value={plan} />
      <input type="hidden" name="interval" value={interval} />
      <Button
        type="submit"
        className={`w-full ${isMax ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''}`}
        variant={highlight ? 'default' : isMax ? 'default' : 'outline'}
      >
        {cta}
      </Button>
    </form>
  )
}
