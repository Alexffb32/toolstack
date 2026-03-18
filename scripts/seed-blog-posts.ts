/**
 * Seed 8 SEO-targeted blog posts into Supabase.
 * Run with: NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx tsx scripts/seed-blog-posts.ts
 * Delete this file after running.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const posts = [
  {
    title: 'How to Invoice a Client: A Complete Guide for Freelancers',
    slug: 'how-to-invoice-a-client',
    excerpt: 'Everything you need to know about invoicing clients professionally — from what to include to how to get paid faster.',
    seo_title: 'How to Invoice a Client: Complete Freelancer Guide (2025)',
    seo_description: 'Learn how to invoice a client correctly. This complete guide covers what to include, payment terms, late fees, VAT, and free invoice templates.',
    published: true,
    published_at: new Date('2026-03-01').toISOString(),
    content: `
<h2>Why Invoicing Matters</h2>
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
<p>For new clients, shorter terms (Net 7 or Net 14) reduce your payment risk. Once trust is established, you can extend to Net 30.</p>

<h2>VAT on Invoices</h2>
<p>If you are VAT-registered, you must include your VAT number on all invoices and charge the appropriate rate. EU businesses invoicing other EU businesses (B2B) may apply the reverse-charge mechanism, meaning the client accounts for VAT rather than you. Always consult a local accountant for your specific situation.</p>

<h2>How to Follow Up on Late Invoices</h2>
<ol>
  <li>Send a polite reminder on the due date</li>
  <li>Follow up 3–5 days after the due date with the invoice attached</li>
  <li>Call the client if there's no response after 10 days</li>
  <li>Add late fees per your payment terms if overdue by 30+ days</li>
  <li>For larger amounts, consider a formal demand letter or small claims court</li>
</ol>

<h2>Free Invoice Generator</h2>
<p>Need to create a professional invoice right now? Use ToolStack's free <a href="/invoice-generator">Invoice Generator</a> to create PDF invoices with custom line items, VAT calculation, and multi-currency support — no sign-up needed.</p>
    `.trim(),
  },
  {
    title: 'EU VAT Rates 2025: Complete Country-by-Country Guide',
    slug: 'eu-vat-rates-2025',
    excerpt: 'A full breakdown of VAT rates across all EU member states, plus the UK, Switzerland, and Norway — updated for 2025.',
    seo_title: 'EU VAT Rates 2025: Complete Country Guide',
    seo_description: 'Find VAT rates for every EU country in 2025. Includes standard, reduced, and super-reduced rates plus UK, Switzerland, and Norway.',
    published: true,
    published_at: new Date('2026-03-03').toISOString(),
    content: `
<h2>Why EU VAT Rates Matter for Freelancers</h2>
<p>If you sell services or digital products to EU customers, you may be required to charge VAT at the rate of the customer's country — not your own. Understanding the rates is essential for accurate invoicing and compliance.</p>

<h2>EU VAT Rates by Country (2025)</h2>
<table>
  <thead><tr><th>Country</th><th>Standard Rate</th><th>Reduced Rate</th></tr></thead>
  <tbody>
    <tr><td>Austria</td><td>20%</td><td>10%, 13%</td></tr>
    <tr><td>Belgium</td><td>21%</td><td>6%, 12%</td></tr>
    <tr><td>Bulgaria</td><td>20%</td><td>9%</td></tr>
    <tr><td>Croatia</td><td>25%</td><td>5%, 13%</td></tr>
    <tr><td>Cyprus</td><td>19%</td><td>5%, 9%</td></tr>
    <tr><td>Czech Republic</td><td>21%</td><td>12%</td></tr>
    <tr><td>Denmark</td><td>25%</td><td>—</td></tr>
    <tr><td>Estonia</td><td>22%</td><td>9%</td></tr>
    <tr><td>Finland</td><td>25.5%</td><td>10%, 14%</td></tr>
    <tr><td>France</td><td>20%</td><td>5.5%, 10%</td></tr>
    <tr><td>Germany</td><td>19%</td><td>7%</td></tr>
    <tr><td>Greece</td><td>24%</td><td>6%, 13%</td></tr>
    <tr><td>Hungary</td><td>27%</td><td>5%, 18%</td></tr>
    <tr><td>Ireland</td><td>23%</td><td>9%, 13.5%</td></tr>
    <tr><td>Italy</td><td>22%</td><td>5%, 10%</td></tr>
    <tr><td>Latvia</td><td>21%</td><td>5%, 12%</td></tr>
    <tr><td>Lithuania</td><td>21%</td><td>5%, 9%</td></tr>
    <tr><td>Luxembourg</td><td>17%</td><td>8%</td></tr>
    <tr><td>Malta</td><td>18%</td><td>5%, 7%</td></tr>
    <tr><td>Netherlands</td><td>21%</td><td>9%</td></tr>
    <tr><td>Poland</td><td>23%</td><td>5%, 8%</td></tr>
    <tr><td>Portugal</td><td>23%</td><td>6%, 13%</td></tr>
    <tr><td>Romania</td><td>19%</td><td>5%, 9%</td></tr>
    <tr><td>Slovakia</td><td>20%</td><td>10%</td></tr>
    <tr><td>Slovenia</td><td>22%</td><td>5%, 9.5%</td></tr>
    <tr><td>Spain</td><td>21%</td><td>4%, 10%</td></tr>
    <tr><td>Sweden</td><td>25%</td><td>6%, 12%</td></tr>
  </tbody>
</table>

<h2>Non-EU Countries</h2>
<ul>
  <li><strong>United Kingdom:</strong> 20% standard (5% reduced)</li>
  <li><strong>Switzerland:</strong> 8.1% standard</li>
  <li><strong>Norway:</strong> 25% standard (12%, 15% reduced)</li>
  <li><strong>Australia:</strong> 10% GST</li>
  <li><strong>Canada:</strong> 5% federal GST (+ provincial taxes)</li>
</ul>

<h2>VAT Registration Thresholds</h2>
<p>Most EU countries require VAT registration once you exceed a revenue threshold — typically between €35,000 and €85,000 per year, depending on the country. If you sell digital services cross-border in the EU, the OSS (One-Stop Shop) scheme simplifies compliance.</p>

<h2>Calculate VAT Instantly</h2>
<p>Use ToolStack's free <a href="/vat-calculator">VAT Calculator</a> to add or remove VAT for any country listed above in seconds.</p>
    `.trim(),
  },
  {
    title: 'Freelance Contract Template: What to Include and Why',
    slug: 'freelance-contract-template',
    excerpt: 'Protect yourself and your clients with a solid freelance contract. Here\'s what every agreement should cover.',
    seo_title: 'Freelance Contract Template: What to Include (2025 Guide)',
    seo_description: 'Learn what to include in a freelance contract. Covers scope, payment terms, IP, revisions, confidentiality, and termination clauses.',
    published: true,
    published_at: new Date('2026-03-05').toISOString(),
    content: `
<h2>Why You Need a Freelance Contract</h2>
<p>A contract protects both you and your client. Without one, disagreements about scope, payment, or ownership can become expensive disputes. Even a simple one-page agreement creates clarity and professionalism.</p>

<h2>Essential Clauses for Every Freelance Contract</h2>

<h3>1. Scope of Work</h3>
<p>Define exactly what you will deliver — and equally important, what you <em>won't</em> deliver. Vague scope leads to scope creep, extra work, and unpaid time. Be specific: "Design 5 website mockups in Figma" is better than "website design work."</p>

<h3>2. Payment Terms</h3>
<p>Specify the total project fee or hourly rate, invoicing schedule (e.g. 50% upfront, 50% on delivery), and payment method. Include late payment penalties (e.g. 1.5% per month after 30 days).</p>

<h3>3. Revisions</h3>
<p>Limit the number of included revision rounds (e.g. "up to 2 rounds of revisions are included"). Additional revisions are billed at your hourly rate. This prevents endless revision cycles.</p>

<h3>4. Intellectual Property</h3>
<p>Specify when ownership transfers. Typically: full IP transfers to the client upon receipt of final payment. Until then, you retain ownership. This protects you if a client fails to pay.</p>

<h3>5. Confidentiality</h3>
<p>Include an NDA clause if you'll have access to sensitive client information — business data, unreleased products, customer lists, etc.</p>

<h3>6. Termination</h3>
<p>Define how either party can terminate the contract (e.g. 14 days written notice). Specify what happens to work completed and fees owed at the time of termination.</p>

<h3>7. Governing Law</h3>
<p>Specify which country's laws govern the contract. This matters if a dispute ever reaches court.</p>

<h2>Generate a Freelance Contract in Seconds</h2>
<p>ToolStack Pro users can generate custom freelance contracts, NDAs, and client agreements instantly. <a href="/contract-generator">Try the Contract Generator →</a></p>
    `.trim(),
  },
  {
    title: 'How to Calculate VAT: Add and Remove Tax Explained',
    slug: 'how-to-calculate-vat',
    excerpt: 'Learn the simple formulas for adding VAT to a price and removing VAT from a gross price. With examples.',
    seo_title: 'How to Calculate VAT: Add and Remove Tax (Simple Formulas)',
    seo_description: 'Learn how to calculate VAT — both adding VAT to a net price and removing VAT from a gross price. Simple formulas with examples for any rate.',
    published: true,
    published_at: new Date('2026-03-07').toISOString(),
    content: `
<h2>Two Types of VAT Calculations</h2>
<p>There are two common VAT calculations freelancers and business owners need:</p>
<ol>
  <li><strong>Adding VAT</strong> — you know the net price (excluding tax) and want the gross price (including tax)</li>
  <li><strong>Removing VAT</strong> (reverse VAT) — you know the gross price and want to find the net price and VAT amount</li>
</ol>

<h2>Formula: Adding VAT</h2>
<p>To add VAT to a net price:</p>
<pre><code>Gross price = Net price × (1 + VAT rate)</code></pre>
<p><strong>Example:</strong> Net price = €100, VAT rate = 20%</p>
<pre><code>Gross = 100 × 1.20 = €120
VAT amount = €20</code></pre>

<h2>Formula: Removing VAT (Reverse VAT)</h2>
<p>To find the net price from a gross (VAT-inclusive) price:</p>
<pre><code>Net price = Gross price ÷ (1 + VAT rate)
VAT amount = Gross price − Net price</code></pre>
<p><strong>Example:</strong> Gross price = €120, VAT rate = 20%</p>
<pre><code>Net = 120 ÷ 1.20 = €100
VAT amount = 120 − 100 = €20</code></pre>

<h2>Quick Reference Table</h2>
<table>
  <thead><tr><th>VAT Rate</th><th>Multiplier (Add)</th><th>Divisor (Remove)</th></tr></thead>
  <tbody>
    <tr><td>5%</td><td>× 1.05</td><td>÷ 1.05</td></tr>
    <tr><td>10%</td><td>× 1.10</td><td>÷ 1.10</td></tr>
    <tr><td>20%</td><td>× 1.20</td><td>÷ 1.20</td></tr>
    <tr><td>21%</td><td>× 1.21</td><td>÷ 1.21</td></tr>
    <tr><td>23%</td><td>× 1.23</td><td>÷ 1.23</td></tr>
    <tr><td>25%</td><td>× 1.25</td><td>÷ 1.25</td></tr>
  </tbody>
</table>

<h2>VAT on Invoices: When Do You Charge It?</h2>
<p>You charge VAT on your invoices only if you are VAT-registered in your country. Thresholds vary — in the UK it's £90,000 annual turnover, in Germany it's €22,000, and in Portugal it's €15,000. Once registered, you must charge VAT, submit returns, and can reclaim input VAT on business purchases.</p>

<h2>Use the Free VAT Calculator</h2>
<p>Skip the manual math. ToolStack's <a href="/vat-calculator">VAT Calculator</a> instantly adds or removes VAT for any EU country, the UK, Australia, Canada, Japan, and more.</p>
    `.trim(),
  },
  {
    title: 'Privacy Policy for Small Business: What You Actually Need',
    slug: 'privacy-policy-small-business',
    excerpt: 'Does your small business or freelance website need a privacy policy? Here\'s what the law requires and what to include.',
    seo_title: 'Privacy Policy for Small Business: What You Need (GDPR)',
    seo_description: 'Does your small business need a privacy policy? Learn what GDPR, CCPA, and other laws require, and what to include in your policy.',
    published: true,
    published_at: new Date('2026-03-09').toISOString(),
    content: `
<h2>Do You Need a Privacy Policy?</h2>
<p>Short answer: yes, almost certainly. If your website or app collects any personal data — including names, email addresses, IP addresses, or cookies — you are required to have a privacy policy under EU GDPR, UK GDPR, California CCPA, and most other privacy laws worldwide.</p>

<h2>Who is Affected by GDPR?</h2>
<p>GDPR applies to <em>any</em> business that:</p>
<ul>
  <li>Is based in the EU</li>
  <li>Targets EU residents (even if you're based outside the EU)</li>
  <li>Processes data of EU residents</li>
</ul>
<p>This means a freelancer in Portugal, a SaaS founder in Berlin, and a US-based company with EU customers all need GDPR-compliant privacy policies.</p>

<h2>What Your Privacy Policy Must Include</h2>

<h3>Under GDPR</h3>
<ul>
  <li>Who you are (business name, contact, data controller details)</li>
  <li>What data you collect and why</li>
  <li>Legal basis for processing (consent, legitimate interest, contract, etc.)</li>
  <li>How long you retain data</li>
  <li>Who you share data with (third-party tools, processors)</li>
  <li>User rights (access, deletion, portability, objection)</li>
  <li>Cookie policy (if you use cookies)</li>
  <li>How to contact you with privacy requests</li>
</ul>

<h3>Under CCPA (California)</h3>
<ul>
  <li>Categories of personal information collected</li>
  <li>Purposes for collection</li>
  <li>Rights of California residents (opt-out of sale, deletion, access)</li>
  <li>"Do Not Sell My Personal Information" link (if applicable)</li>
</ul>

<h2>Common Tools That Require Disclosure</h2>
<p>If you use any of the following on your website, they must be disclosed in your privacy policy:</p>
<ul>
  <li>Google Analytics / Google Tag Manager</li>
  <li>Meta Pixel (Facebook ads)</li>
  <li>Intercom, HubSpot, or other CRMs</li>
  <li>Stripe, PayPal (payment processors)</li>
  <li>Mailchimp, ConvertKit, Resend (email)</li>
  <li>Cloudflare, AWS, Vercel (infrastructure)</li>
</ul>

<h2>Generate Your Privacy Policy Instantly</h2>
<p>ToolStack Pro users can generate a GDPR and CCPA compliant privacy policy tailored to their website and tools in seconds. <a href="/privacy-policy-generator">Try the Privacy Policy Generator →</a></p>
    `.trim(),
  },
  {
    title: 'Best Currencies to Invoice In as a Freelancer',
    slug: 'best-currencies-to-invoice-in',
    excerpt: 'Should you invoice in EUR, USD, or your local currency? Here\'s how to choose the right currency and protect yourself from exchange rate risk.',
    seo_title: 'Best Currencies to Invoice In as a Freelancer (2025)',
    seo_description: 'Choosing the right currency to invoice in as a freelancer. Compare EUR, USD, GBP, and local currency — pros, cons, and exchange rate risk.',
    published: true,
    published_at: new Date('2026-03-11').toISOString(),
    content: `
<h2>Why Your Invoice Currency Matters</h2>
<p>The currency you invoice in affects how much you actually receive after conversion, how quickly clients pay, and how simple your accounting is. A weak local currency can cost you significantly when clients pay in stronger currencies — or vice versa.</p>

<h2>The Main Options</h2>

<h3>USD (US Dollar)</h3>
<p><strong>Best for:</strong> Tech clients, US-based companies, global markets<br>
<strong>Pros:</strong> Universally accepted, high demand, stable<br>
<strong>Cons:</strong> If your costs are in EUR, you carry exchange rate risk. USD has weakened against EUR in some periods.<br>
<strong>Tip:</strong> Invoice in USD when the rate is favorable; lock in a rate with a service like Wise.</p>

<h3>EUR (Euro)</h3>
<p><strong>Best for:</strong> EU-based freelancers, European clients<br>
<strong>Pros:</strong> No conversion needed within the eurozone. Large market.<br>
<strong>Cons:</strong> Less desirable for US clients who prefer USD.<br>
<strong>Tip:</strong> Always invoice EU B2B clients in EUR — simpler for both parties and avoids FX risk.</p>

<h3>GBP (British Pound)</h3>
<p><strong>Best for:</strong> UK clients<br>
<strong>Pros:</strong> Strong currency, expected by UK clients<br>
<strong>Cons:</strong> Only relevant for UK work; convert promptly to avoid volatility.</p>

<h3>Your Local Currency</h3>
<p><strong>Best for:</strong> Domestic clients only<br>
<strong>Pros:</strong> Zero conversion fees, simple accounting<br>
<strong>Cons:</strong> Can be a disadvantage for international clients; exposes client to FX risk</p>

<h2>Protecting Yourself from Exchange Rate Risk</h2>
<ul>
  <li><strong>Invoice on delivery</strong> — don't wait; rates change daily</li>
  <li><strong>Use Wise Business</strong> — hold USD, EUR, GBP in one account and convert when rates are favorable</li>
  <li><strong>Add a currency clause</strong> — e.g. "Payment due in EUR at the exchange rate on the invoice date"</li>
  <li><strong>Charge a small FX buffer</strong> — 1–2% added to your rate when invoicing in a foreign currency</li>
</ul>

<h2>Check Exchange Rates Before You Invoice</h2>
<p>Use ToolStack's free <a href="/currency-converter">Currency Converter</a> to see real mid-market rates and compare with what your bank charges — before you decide which currency to use.</p>
    `.trim(),
  },
  {
    title: 'Corporate Tax Rates by Country 2025: Which Countries Are Most Business-Friendly?',
    slug: 'corporate-tax-rates-by-country',
    excerpt: 'A ranked comparison of corporate tax rates across 55+ countries. Which jurisdictions offer the best rates for freelancers and small businesses?',
    seo_title: 'Corporate Tax Rates by Country 2025: Complete Ranking',
    seo_description: 'Compare corporate tax rates for 55+ countries in 2025. Find the most business-friendly jurisdictions for freelancers and small businesses.',
    published: true,
    published_at: new Date('2026-03-13').toISOString(),
    content: `
<h2>Global Corporate Tax Overview</h2>
<p>Corporate tax rates vary enormously around the world — from 0% in some jurisdictions to 35%+ in others. For freelancers operating through a company structure, understanding these rates can significantly affect your after-tax income.</p>

<h2>Lowest Corporate Tax Countries (2025)</h2>
<table>
  <thead><tr><th>Country</th><th>Corporate Tax Rate</th></tr></thead>
  <tbody>
    <tr><td>United Arab Emirates</td><td>9% (on profits over AED 375,000)</td></tr>
    <tr><td>Hungary</td><td>9%</td></tr>
    <tr><td>Ireland</td><td>12.5%</td></tr>
    <tr><td>Bulgaria</td><td>10%</td></tr>
    <tr><td>Montenegro</td><td>9%</td></tr>
    <tr><td>Cyprus</td><td>12.5%</td></tr>
    <tr><td>Romania</td><td>16%</td></tr>
    <tr><td>Singapore</td><td>17%</td></tr>
  </tbody>
</table>

<h2>G7 Country Rates</h2>
<table>
  <thead><tr><th>Country</th><th>Corporate Tax Rate</th></tr></thead>
  <tbody>
    <tr><td>United Kingdom</td><td>25%</td></tr>
    <tr><td>Germany</td><td>~30% (federal + trade tax)</td></tr>
    <tr><td>France</td><td>25%</td></tr>
    <tr><td>Italy</td><td>24%</td></tr>
    <tr><td>Canada</td><td>26.5% (federal + provincial)</td></tr>
    <tr><td>Japan</td><td>23.2%</td></tr>
    <tr><td>United States</td><td>21% (federal)</td></tr>
  </tbody>
</table>

<h2>The OECD Minimum Tax</h2>
<p>The OECD's global minimum corporate tax of 15% (Pillar Two) has been adopted by most major economies as of 2024–2025. This means large multinationals must pay at least 15% regardless of where they are incorporated. For most freelancers and small businesses, this rule doesn't apply — it targets companies with annual revenues above €750 million.</p>

<h2>What Matters Beyond the Headline Rate</h2>
<p>The headline corporate tax rate is only part of the picture. You should also consider:</p>
<ul>
  <li><strong>Effective tax rate</strong> — deductions and allowances reduce the rate you actually pay</li>
  <li><strong>Dividend withholding tax</strong> — when you extract profits from your company</li>
  <li><strong>Personal income tax</strong> — what you pay on your salary</li>
  <li><strong>Social security contributions</strong> — employer and employee rates</li>
  <li><strong>Substance requirements</strong> — some low-tax regimes require genuine business activity</li>
</ul>

<h2>Compare Tax Rates Instantly</h2>
<p>ToolStack's <a href="/tax-rates">Tax Rates by Country</a> table lets you search and compare corporate tax, income tax, and dividend withholding rates for 55+ countries side-by-side.</p>
    `.trim(),
  },
  {
    title: 'How to Find the Perfect Meeting Time for Remote Teams',
    slug: 'meeting-time-across-timezones',
    excerpt: 'Scheduling meetings across time zones is painful. Here\'s a practical guide to finding times that work for everyone — and tools that make it effortless.',
    seo_title: 'How to Find the Best Meeting Time Across Time Zones (2025)',
    seo_description: 'Learn how to schedule meetings for remote and distributed teams across time zones. Tips, best practices, and a free meeting time planner tool.',
    published: true,
    published_at: new Date('2026-03-15').toISOString(),
    content: `
<h2>The Remote Team Scheduling Problem</h2>
<p>When your team spans multiple time zones, finding a meeting time that doesn't require someone to join at 6am or 11pm is a real challenge. Get it wrong repeatedly and resentment builds. Get it right and you show respect for your teammates' lives outside work.</p>

<h2>The Golden Hours Rule</h2>
<p>Business hours (9am–6pm) vary by location, but there are "golden overlap windows" between common time zone clusters:</p>
<ul>
  <li><strong>Europe + East Coast US:</strong> 2pm–5pm CET (8am–11am EST)</li>
  <li><strong>Europe + West Coast US:</strong> 5pm–7pm CET (8am–10am PST) — tight window</li>
  <li><strong>Europe + Asia Pacific:</strong> Very difficult — consider async-first</li>
  <li><strong>US East + US West:</strong> 12pm–5pm EST (9am–2pm PST)</li>
  <li><strong>Singapore + India:</strong> Business hours overlap well (IST is 2.5h behind SGT)</li>
</ul>

<h2>Best Practices for Cross-Timezone Meetings</h2>
<ol>
  <li><strong>Rotate the inconvenience</strong> — don't always make the same person join at an awkward hour. Take turns.</li>
  <li><strong>Async first</strong> — use Loom, Notion, Slack threads for information sharing. Reserve live meetings for decisions and relationship-building.</li>
  <li><strong>Always specify time zones</strong> — write "3pm CET / 9am EST" not just "3pm"</li>
  <li><strong>Use a visual timeline</strong> — seeing all time zones at once reveals overlaps you'd miss mentally</li>
  <li><strong>Record everything</strong> — team members who can't attend should be able to catch up</li>
</ol>

<h2>Daylight Saving Time Traps</h2>
<p>Europe and the US switch to daylight saving time on different weekends — meaning there are 2–3 week windows each year where the time difference changes. Always use a tool that accounts for DST to avoid confusion.</p>
<p>In the EU, clocks go forward on the last Sunday in March and back on the last Sunday in October. In the US, it's the second Sunday in March and first Sunday in November.</p>

<h2>Use the Free Meeting Time Planner</h2>
<p>ToolStack's <a href="/meeting-time-planner">Meeting Time Planner</a> lets you add up to 10 time zones and visualize overlapping business hours in a single interactive view. Click any hour to set a meeting time and share it with your team via a link.</p>
    `.trim(),
  },
]

async function seed() {
  console.log(`Seeding ${posts.length} blog posts...`)

  for (const post of posts) {
    const { error } = await supabase
      .from('blog_posts')
      .upsert(post, { onConflict: 'slug' })

    if (error) {
      console.error(`Failed to seed "${post.slug}":`, error.message)
    } else {
      console.log(`✓ ${post.slug}`)
    }
  }

  console.log('Done.')
}

seed().catch(console.error)
