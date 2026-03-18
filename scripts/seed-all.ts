/**
 * Applies migration + seeds blog posts with free & pro-gated content.
 * Run: npx tsx scripts/seed-all.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Apply migration via raw SQL
async function applyMigration() {
  const { error } = await supabase.rpc('exec_sql', {
    sql: `ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS pro_only boolean NOT NULL DEFAULT false;`
  })
  if (error) {
    // Try direct approach — might need to use the REST admin endpoint
    console.warn('Migration via rpc failed (expected if already applied):', error.message)
  }
}

const posts = [
  // ── FREE POSTS ──
  {
    title: 'How to Invoice a Client: A Complete Guide for Freelancers',
    slug: 'how-to-invoice-a-client',
    excerpt: 'Everything you need to know about invoicing clients professionally — from what to include to how to get paid faster.',
    seo_title: 'How to Invoice a Client: Complete Freelancer Guide (2026)',
    seo_description: 'Learn how to invoice a client correctly. Covers what to include, payment terms, late fees, VAT, and free invoice templates.',
    published: true,
    pro_only: false,
    published_at: new Date('2026-03-01').toISOString(),
    content: `<h2>Why Invoicing Matters</h2>
<p>An invoice is more than a payment request — it's a legal document that records a transaction between you and your client. A professional, clear invoice reduces payment delays and disputes, and keeps your accounting clean.</p>

<h2>What to Include on Every Invoice</h2>
<ul>
  <li><strong>Your business name, address, and contact details</strong></li>
  <li><strong>Client's name and address</strong></li>
  <li><strong>Invoice number</strong> — unique and sequential (e.g. INV-2026-001)</li>
  <li><strong>Invoice date</strong> and <strong>due date</strong></li>
  <li><strong>Line items</strong> — description, quantity, rate, and subtotal per item</li>
  <li><strong>VAT or tax details</strong> — if applicable, include your tax ID and the applicable rate</li>
  <li><strong>Total amount due</strong></li>
  <li><strong>Payment methods</strong> — bank transfer details, PayPal, Stripe link, etc.</li>
  <li><strong>Late payment terms</strong> — e.g. "1.5% per month after 30 days"</li>
</ul>

<h2>Payment Terms Explained</h2>
<p>The most common payment terms for freelancers:</p>
<ul>
  <li><strong>Net 7</strong> — payment due within 7 days</li>
  <li><strong>Net 14</strong> — payment due within 14 days</li>
  <li><strong>Net 30</strong> — payment due within 30 days (standard for agencies)</li>
  <li><strong>Due on receipt</strong> — payment expected immediately</li>
</ul>
<p>For new clients, shorter terms (Net 7 or Net 14) reduce your payment risk.</p>

<h2>How to Follow Up on Late Invoices</h2>
<ol>
  <li>Send a polite reminder on the due date</li>
  <li>Follow up 3–5 days after the due date with the invoice attached</li>
  <li>Call the client if there's no response after 10 days</li>
  <li>Add late fees per your payment terms if overdue by 30+ days</li>
  <li>For larger amounts, consider a formal demand letter or small claims court</li>
</ol>

<h2>Free Invoice Generator</h2>
<p>Skip the manual work. <a href="/invoice-generator">ToolStack's Invoice Generator</a> lets you create a professional PDF invoice in under 2 minutes — free, no sign-up required.</p>`,
  },
  {
    title: 'VAT Explained: A Simple Guide for Freelancers & Small Businesses',
    slug: 'vat-guide-freelancers',
    excerpt: 'VAT can be confusing. This guide breaks down when you need to register, how to charge it, and how to claim it back.',
    seo_title: 'VAT Guide for Freelancers 2026 — Register, Charge & Reclaim',
    seo_description: 'When do freelancers need to register for VAT? How do you charge it? This plain-English guide covers EU VAT rules, thresholds, and reclaiming VAT.',
    published: true,
    pro_only: false,
    published_at: new Date('2026-03-05').toISOString(),
    content: `<h2>What is VAT?</h2>
<p>Value Added Tax (VAT) is a consumption tax applied to goods and services at each stage of production or distribution. As a business owner, you collect VAT from your customers and pass it to the government.</p>

<h2>When Do You Need to Register for VAT?</h2>
<p>VAT registration thresholds vary by country. Some examples:</p>
<ul>
  <li><strong>UK</strong>: £85,000 annual turnover</li>
  <li><strong>Germany</strong>: €22,000</li>
  <li><strong>France</strong>: €34,400 (services)</li>
  <li><strong>Ireland</strong>: €37,500 (services)</li>
  <li><strong>Netherlands</strong>: No threshold — all businesses must register</li>
</ul>
<p>You can also voluntarily register below the threshold, which allows you to reclaim VAT on business purchases.</p>

<h2>EU VAT Rates by Country</h2>
<p>Standard VAT rates across the EU range from 17% (Luxembourg) to 27% (Hungary). Always apply the correct rate for where your customer is based — not where you are.</p>

<h2>Reverse Charge Mechanism (B2B)</h2>
<p>When you sell services to a VAT-registered business in another EU country, the reverse charge applies. You do not charge VAT — instead, the buyer accounts for it. Always verify your client's VAT number using the <a href="https://ec.europa.eu/taxation_customs/vies/" target="_blank" rel="noopener noreferrer">VIES database</a>.</p>

<h2>Reclaiming VAT</h2>
<p>If you're VAT-registered, you can reclaim VAT on business expenses — software, equipment, co-working space, etc. Keep all receipts and submit quarterly or annual VAT returns.</p>

<h2>Quick VAT Calculator</h2>
<p>Use <a href="/vat-calculator">ToolStack's VAT Calculator</a> to instantly add or remove VAT for any EU country. Free, no sign-up needed.</p>`,
  },
  {
    title: '10 Tax Deductions Every Freelancer Should Know',
    slug: 'freelancer-tax-deductions',
    excerpt: 'Reduce your tax bill legally. These 10 deductions are commonly missed by freelancers and self-employed professionals.',
    seo_title: '10 Tax Deductions for Freelancers in 2026 (Don\'t Miss These)',
    seo_description: 'Freelancer tax deductions you should be claiming: home office, equipment, software, travel, and more. Reduce your tax bill legally.',
    published: true,
    pro_only: false,
    published_at: new Date('2026-03-08').toISOString(),
    content: `<h2>Why Deductions Matter</h2>
<p>Every euro you deduct from your taxable income is money you keep. Most freelancers leave thousands on the table every year by not tracking expenses properly.</p>

<h2>10 Deductions You Shouldn't Miss</h2>

<h3>1. Home Office</h3>
<p>If you work from home, you can deduct a portion of rent, mortgage interest, utilities, and internet based on the percentage of your home used exclusively for work.</p>

<h3>2. Equipment & Hardware</h3>
<p>Laptops, monitors, keyboards, headsets, cameras — any equipment used for work is deductible. In many countries, you can deduct the full cost in year one.</p>

<h3>3. Software Subscriptions</h3>
<p>Adobe Creative Cloud, Figma, Notion, Slack, accounting software — all deductible. Keep your receipts and track annual costs.</p>

<h3>4. Professional Development</h3>
<p>Online courses, certifications, books, and conferences related to your field are generally deductible.</p>

<h3>5. Health Insurance (in some countries)</h3>
<p>In the US, self-employed individuals can deduct 100% of health insurance premiums. Check local rules for your country.</p>

<h3>6. Business Travel</h3>
<p>Flights, hotels, and transport for client meetings or conferences are deductible. Keep records of the business purpose.</p>

<h3>7. Phone & Internet</h3>
<p>The business-use portion of your phone bill and internet service is deductible. Track your usage percentage.</p>

<h3>8. Co-working Space</h3>
<p>Monthly co-working memberships are fully deductible as a business expense.</p>

<h3>9. Bank Fees & Payment Processing</h3>
<p>Stripe fees, PayPal fees, international wire transfer fees — all deductible as business costs.</p>

<h3>10. Accounting & Legal Fees</h3>
<p>Fees paid to accountants, tax advisors, or lawyers for business purposes are deductible.</p>

<h2>How to Track Expenses</h2>
<p>Use a dedicated business bank account and credit card. Review monthly and categorize expenses. Consider accounting software like Wave (free) or Xero.</p>

<p>Check our <a href="/tax-rates">Tax Rates table</a> for corporate and income tax rates across 55+ countries.</p>`,
  },
  {
    title: 'How to Convert Currencies When Invoicing International Clients',
    slug: 'currency-conversion-invoicing',
    excerpt: 'Working with international clients? Here\'s how to handle currency conversion, exchange rate risk, and bank fees when invoicing.',
    seo_title: 'Currency Conversion for Freelancers: Invoice International Clients (2026)',
    seo_description: 'How to handle currency conversion when invoicing clients abroad. Exchange rates, bank fees, FX risk, and multi-currency invoicing tips.',
    published: true,
    pro_only: false,
    published_at: new Date('2026-03-11').toISOString(),
    content: `<h2>The Currency Conversion Challenge</h2>
<p>When you invoice a client in a different currency, you face three problems: which exchange rate to use, how to minimize bank fees, and how to protect yourself from FX fluctuations.</p>

<h2>Which Exchange Rate to Use?</h2>
<p>Options include:</p>
<ul>
  <li><strong>Mid-market rate</strong> — the "real" exchange rate you see on Google. Use this as your reference.</li>
  <li><strong>Bank rate</strong> — typically 2–5% worse than mid-market. This is what you'll actually receive.</li>
  <li><strong>Fixed rate</strong> — agree on a fixed exchange rate with your client at the time of the contract.</li>
</ul>

<h2>Minimizing Bank Fees</h2>
<p>Traditional bank international transfers can cost €15–€35 per transfer plus a 2–4% currency conversion fee. Better alternatives:</p>
<ul>
  <li><strong>Wise (TransferWise)</strong> — near mid-market rate, low flat fee</li>
  <li><strong>Revolut Business</strong> — free conversions up to a monthly limit</li>
  <li><strong>Stripe</strong> — accept payments in 135+ currencies, settled in your local currency</li>
</ul>

<h2>Protecting Against FX Risk</h2>
<p>If you regularly invoice in a foreign currency:</p>
<ul>
  <li>Consider invoicing in your local currency to eliminate FX risk entirely</li>
  <li>Use forward contracts to lock in a rate for future payments</li>
  <li>Add a currency adjustment clause to your contracts</li>
</ul>

<h2>Multi-Currency Calculator</h2>
<p><a href="/currency-converter">ToolStack's Currency Converter</a> shows live exchange rates plus typical bank fee estimates, so you always know exactly what you'll receive.</p>`,
  },
  {
    title: 'How to Write a Freelance Contract That Protects You',
    slug: 'freelance-contract-guide',
    excerpt: 'A strong contract prevents scope creep, ensures you get paid, and protects your IP. Here\'s what to include in every freelance agreement.',
    seo_title: 'Freelance Contract Guide 2026: What to Include & How to Write One',
    seo_description: 'What should a freelance contract include? Scope, payment terms, IP ownership, kill fees, and more. Template and generator included.',
    published: true,
    pro_only: false,
    published_at: new Date('2026-03-14').toISOString(),
    content: `<h2>Why Every Freelancer Needs a Contract</h2>
<p>A contract is your primary protection against non-payment, scope creep, and disputes. Without one, you have no legal ground to stand on if a client refuses to pay or demands endless revisions.</p>

<h2>Essential Clauses in Every Freelance Contract</h2>

<h3>1. Scope of Work</h3>
<p>Define exactly what you will deliver. Be specific: "3 logo concepts, 2 rounds of revisions, final files in SVG and PNG." Anything not listed is out of scope.</p>

<h3>2. Payment Terms</h3>
<p>Specify the total amount, payment schedule (50% upfront is standard), and due dates. Include late payment fees (e.g. 2% per month after 14 days).</p>

<h3>3. Kill Fee</h3>
<p>If the project is cancelled mid-way, you keep a percentage of the remaining fees (typically 25–50%). This compensates you for time already spent.</p>

<h3>4. Intellectual Property</h3>
<p>State that copyright transfers to the client only upon full payment. Until then, you retain all rights to the work.</p>

<h3>5. Revision Policy</h3>
<p>Specify how many rounds of revisions are included and the cost per additional revision.</p>

<h3>6. Confidentiality</h3>
<p>Include mutual NDA language to protect both parties' sensitive information.</p>

<h3>7. Governing Law</h3>
<p>Specify which country's/state's law governs the contract.</p>

<h2>Quick Contract Generator</h2>
<p>Generate a custom freelance contract in under 2 minutes with <a href="/contract-generator">ToolStack's Contract Generator</a> — Pro plan required.</p>`,
  },

  // ── PRO-GATED POSTS (early access) ──
  {
    title: 'GDPR Compliance for Freelancers: A Practical Checklist (2026)',
    slug: 'gdpr-compliance-freelancers-2026',
    excerpt: 'GDPR applies to every freelancer handling EU client data. This 2026 checklist covers exactly what you need to be compliant.',
    seo_title: 'GDPR Compliance Checklist for Freelancers 2026',
    seo_description: 'Is your freelance business GDPR compliant? Use this 2026 checklist to ensure you\'re handling EU client data correctly — with free privacy policy generator.',
    published: true,
    pro_only: true,
    published_at: new Date('2026-03-18').toISOString(),
    content: `<h2>Does GDPR Apply to You?</h2>
<p>Yes — if you collect, store, or process any personal data from EU residents (even just a name and email), GDPR applies regardless of where you are based.</p>

<h2>GDPR Compliance Checklist for Freelancers</h2>
<ul>
  <li>✅ <strong>Privacy Policy</strong> — Published on your website, covering what data you collect, why, and how long you keep it</li>
  <li>✅ <strong>Cookie Consent</strong> — If you use analytics or tracking cookies, you need explicit consent</li>
  <li>✅ <strong>Data Processing Agreements</strong> — Sign DPAs with any third parties who handle EU client data (e.g. your email provider)</li>
  <li>✅ <strong>Data Subject Rights</strong> — You must be able to provide, correct, or delete anyone's data on request</li>
  <li>✅ <strong>Breach Notification</strong> — You must report certain data breaches to your supervisory authority within 72 hours</li>
  <li>✅ <strong>Lawful Basis</strong> — Document your lawful basis for processing each type of data (consent, legitimate interest, contract)</li>
  <li>✅ <strong>Data Minimization</strong> — Only collect the data you actually need</li>
</ul>

<h2>Fines and Enforcement</h2>
<p>GDPR fines reach up to €20 million or 4% of global annual turnover — whichever is higher. Enforcement against small businesses and freelancers is increasing, particularly in Germany, France, and Ireland.</p>

<h2>Generate Your Privacy Policy</h2>
<p>Use <a href="/privacy-policy-generator">ToolStack's AI Privacy Policy Generator</a> to create a GDPR and CCPA compliant policy in under 60 seconds. Available on the Pro plan.</p>`,
  },
  {
    title: 'How to Set Your Freelance Rates in 2026 (With Real Market Data)',
    slug: 'how-to-set-freelance-rates-2026',
    excerpt: 'Undercharging is the most common freelancer mistake. Use this framework and 2026 market data to price your services confidently.',
    seo_title: 'How to Set Freelance Rates in 2026 — Market Data & Pricing Formula',
    seo_description: '2026 freelance rate guide. How to calculate your minimum viable rate, position yourself in the market, and raise rates with confidence.',
    published: true,
    pro_only: true,
    published_at: new Date('2026-03-17').toISOString(),
    content: `<h2>The Most Common Freelancer Mistake</h2>
<p>Most freelancers undercharge, especially when starting out. They price based on what feels comfortable, not what the market will pay or what they need to earn.</p>

<h2>Calculate Your Minimum Viable Rate</h2>
<p>Start with your required annual income:</p>
<ol>
  <li>Your desired take-home income (e.g. €60,000)</li>
  <li>Add taxes (estimate 30–35% depending on country)</li>
  <li>Add business expenses (software, hardware, co-working, insurance)</li>
  <li>Divide by your billable hours (typically 1,000–1,200 hours/year for a full-time freelancer)</li>
</ol>
<p>Example: (€60,000 + €25,000 taxes + €5,000 expenses) ÷ 1,000 hours = <strong>€90/hour minimum</strong></p>

<h2>2026 Freelance Rate Benchmarks by Discipline</h2>
<table>
  <thead><tr><th>Discipline</th><th>Junior</th><th>Mid</th><th>Senior</th></tr></thead>
  <tbody>
    <tr><td>Software Development</td><td>€50–70</td><td>€80–120</td><td>€130–200+</td></tr>
    <tr><td>UX/Product Design</td><td>€45–65</td><td>€70–110</td><td>€120–180+</td></tr>
    <tr><td>Copywriting</td><td>€30–50</td><td>€55–90</td><td>€100–150+</td></tr>
    <tr><td>Marketing Consulting</td><td>€40–60</td><td>€65–100</td><td>€110–180+</td></tr>
    <tr><td>Financial Consulting</td><td>€60–80</td><td>€90–140</td><td>€150–250+</td></tr>
  </tbody>
</table>

<h2>How to Raise Your Rates</h2>
<ol>
  <li>Give existing clients 30–60 days notice</li>
  <li>Apply new rates to all new clients immediately</li>
  <li>Never apologize for raising rates — frame it as matching your current market value</li>
  <li>Review rates annually</li>
</ol>

<h2>Invoice at Your New Rate</h2>
<p>Once you've set your rate, <a href="/invoice-generator">use ToolStack's Invoice Generator</a> to send professional invoices that command respect.</p>`,
  },
  {
    title: 'NDA vs. Non-Compete: What Freelancers Need to Know Before Signing',
    slug: 'nda-vs-non-compete-freelancers',
    excerpt: 'Clients often ask freelancers to sign NDAs and non-competes. Know what you\'re agreeing to — and what clauses to push back on.',
    seo_title: 'NDA vs Non-Compete for Freelancers: What to Know Before Signing',
    seo_description: 'Should you sign an NDA or non-compete agreement? What these contracts mean for freelancers, red flags to watch for, and what you can negotiate.',
    published: true,
    pro_only: true,
    published_at: new Date('2026-03-16').toISOString(),
    content: `<h2>NDA vs. Non-Compete: The Key Difference</h2>
<p>An <strong>NDA (Non-Disclosure Agreement)</strong> prevents you from sharing confidential information about the client or project. A <strong>non-compete agreement</strong> restricts you from working with competitors of the client.</p>
<p>NDAs are generally reasonable and standard. Non-competes for freelancers are often overreaching and may not even be enforceable in your jurisdiction.</p>

<h2>What Should an NDA Include?</h2>
<ul>
  <li><strong>Definition of confidential information</strong> — be specific. "All information shared during the engagement" is too broad.</li>
  <li><strong>Duration</strong> — 1–2 years is reasonable. Perpetual NDAs are a red flag.</li>
  <li><strong>Exclusions</strong> — information that's already public, or that you knew before the engagement, should be excluded.</li>
  <li><strong>Mutual vs. one-way</strong> — ideally mutual, so the client can't share your processes either.</li>
</ul>

<h2>Red Flags in Non-Compete Agreements</h2>
<ul>
  <li>Geographic scope wider than the client's actual operating area</li>
  <li>Industry scope wider than the client's specific niche</li>
  <li>Duration longer than 12 months</li>
  <li>No carve-out for work you were already doing before the engagement</li>
</ul>

<h2>Enforceability</h2>
<p>Non-competes for freelancers (as opposed to employees) are unenforceable in California, Minnesota, and several EU countries. Even where technically legal, courts often refuse to enforce overly broad clauses.</p>

<h2>Generate Your Own NDA</h2>
<p>Use <a href="/contract-generator">ToolStack's Contract Generator</a> to generate a balanced, freelancer-friendly NDA in minutes — Pro plan required.</p>`,
  },
]

async function seed() {
  console.log(`Seeding ${posts.length} blog posts...`)

  // Try to apply the pro_only column migration
  try {
    const { error } = await supabase
      .from('blog_posts')
      .select('pro_only')
      .limit(1)

    if (error && error.message.includes('pro_only')) {
      console.log('pro_only column missing — you need to apply migration 002_pro_blog.sql manually in Supabase dashboard')
    }
  } catch {}

  for (const post of posts) {
    const { error } = await supabase
      .from('blog_posts')
      .upsert(post, { onConflict: 'slug' })

    if (error) {
      console.error(`✗ Failed to seed "${post.slug}":`, error.message)
    } else {
      console.log(`✓ ${post.slug} [${post.pro_only ? 'PRO' : 'FREE'}]`)
    }
  }

  console.log('\nDone! Apply supabase/migrations/002_pro_blog.sql in Supabase dashboard if not done yet.')
}

seed().catch(console.error)
