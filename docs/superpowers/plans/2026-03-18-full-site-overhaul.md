# ToolStack Full-Site Overhaul Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan.

**Goal:** Polish all pages to match homepage design, add new pages (About, Tools landing, site Privacy/Terms), seed 8 blog posts, fix all bugs, and complete the footer team section with Alexandre Bento.

**Architecture:** Three phases — A (design polish), B (content/SEO/new pages), C (bugs + newsletter improvements). All pages share the brand palette constants (B=#155EEF, DARK=#0D1117, LIGHT=#F0F4FF, BORDER=#E5EAF5). Tool pages get a consistent hero header + breadcrumb. Blog gets full redesign. Pricing gets palette alignment. Footer team section gets Alexandre Bento as Founder.

**Tech Stack:** Next.js 16 App Router, Tailwind CSS, Framer Motion, Supabase, TypeScript, Lucide icons.

---

## PHASE A — Design Polish

### Task 1: Pricing page — redesign to match homepage palette

**Files:**
- Modify: `app/(marketing)/pricing/page.tsx`

- [ ] Replace the generic shadcn card layout with the homepage palette (B, DARK, LIGHT, BORDER inline styles)
- [ ] Popular plan uses DARK background (like homepage), not border-primary
- [ ] Add animated gradient hero header section with FadeUp
- [ ] Monthly/yearly toggle styled as pill matching homepage buttons
- [ ] Feature list items use blue checkmarks matching homepage style
- [ ] Add trust badges row below plans (Stripe, cancel anytime, etc.)
- [ ] Commit: `design: redesign pricing page to match homepage palette`

### Task 2: Tool pages — shared hero header component

**Files:**
- Create: `components/tools/ToolPageHero.tsx`
- Modify: all 9 `app/(tools)/*/page.tsx` files

- [ ] Create `ToolPageHero` component with props: `title`, `description`, `badge` (Free|Pro), `icon`
- [ ] Hero has light blue gradient background, brand blue accent, breadcrumb "Tools → {name}"
- [ ] Replace the plain `<div className="mb-8"><h1>...</h1></div>` in all 9 tool pages with `<ToolPageHero>`
- [ ] Tool pages also get an SEO content section below the tool (already exists on some, standardize all)
- [ ] Commit: `design: add ToolPageHero component + apply to all tool pages`

### Task 3: Blog list page — redesign

**Files:**
- Modify: `app/(marketing)/blog/page.tsx`

- [ ] Replace generic card grid with styled cards matching homepage palette
- [ ] Add hero header section (gradient bg, "Blog" title, subtitle)
- [ ] Post cards: white bg, blue left border accent, hover shadow, date badge styled
- [ ] Empty state: styled with icon and CTA to newsletter
- [ ] Commit: `design: redesign blog list page`

### Task 4: Blog post page — redesign

**Files:**
- Modify: `app/(marketing)/blog/[slug]/page.tsx`

- [ ] Add styled article header with gradient bg, large title, date/category badge
- [ ] Breadcrumb: Home → Blog → Post Title
- [ ] Prose content area with proper typography (prose-lg, brand blue links)
- [ ] Add "Related tools" CTA section at the bottom of each post
- [ ] Newsletter subscribe widget at bottom of each post
- [ ] Commit: `design: redesign blog post page`

### Task 5: Login page — redesign

**Files:**
- Modify: `app/(auth)/login/page.tsx`

- [ ] Full-page gradient background (LIGHT → white)
- [ ] Centered card with TS logo (blue square, not Wrench icon), brand styling
- [ ] Google button styled with blue outline hover
- [ ] Fix: Terms/Privacy links point to `/privacy` and `/terms` (new static pages, created in Phase B)
- [ ] Commit: `design: redesign login page`

### Task 6: Dashboard — design improvements

**Files:**
- Modify: `app/dashboard/page.tsx`
- Modify: `app/dashboard/layout.tsx`

- [ ] Dashboard layout gets Header + proper sidebar or top nav with plan badge
- [ ] Stats cards styled with brand palette (blue accent numbers)
- [ ] Document list: white cards with icon, type label, date, download/delete actions
- [ ] Empty state: friendly illustration placeholder + CTA to tools
- [ ] Commit: `design: improve dashboard layout and card styling`

### Task 7: Footer — add Alexandre Bento as Founder

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] Add a "Team" section to footer OR update existing team area
- [ ] Add: Alexandre Bento — Founder & Developer
- [ ] Style: small avatar initials (AB), name, role label
- [ ] Commit: `feat: add Alexandre Bento founder credit to footer`

---

## PHASE B — Content, SEO & New Pages

### Task 8: About page

**Files:**
- Create: `app/(marketing)/about/page.tsx`

- [ ] Hero section: "Built for freelancers, by a freelancer"
- [ ] Mission statement paragraph
- [ ] Team section: Alexandre Bento — Founder & Developer (AB initials avatar, blue)
- [ ] Tools section: showcase all 9 tools with icons
- [ ] Stats: 5000+ users, 9 tools, 55+ countries
- [ ] CTA: Get Started / View Pricing
- [ ] Metadata: title="About ToolStack — Free Business Tools for Freelancers", description=...
- [ ] Commit: `feat: add About page`

### Task 9: Tools landing page

**Files:**
- Create: `app/(marketing)/tools/page.tsx`

- [ ] Hero: "9 Free & Pro Business Tools"
- [ ] Grid of all 9 tools, each card: icon, name, description, Free/Pro badge, CTA link
- [ ] Free tools section + Pro tools section with visual separator
- [ ] SEO-rich: each tool description targets its main keyword
- [ ] Metadata: title="Free Business Tools for Freelancers — ToolStack", rich description
- [ ] Add JSON-LD ItemList schema for all tools
- [ ] Add `/tools` to sitemap.ts static routes
- [ ] Commit: `feat: add /tools landing page with all tools grid`

### Task 10: Static Privacy Policy page for ToolStack itself

**Files:**
- Create: `app/(marketing)/privacy/page.tsx`

- [ ] Static content: ToolStack's own privacy policy (data collected, Supabase, Stripe, cookies)
- [ ] Styled like a blog post (prose, breadcrumb, header)
- [ ] Metadata with canonical URL
- [ ] Add to sitemap
- [ ] Commit: `feat: add static /privacy page for ToolStack`

### Task 11: Static Terms of Service page for ToolStack itself

**Files:**
- Create: `app/(marketing)/terms/page.tsx`

- [ ] Static content: ToolStack's own terms (usage, subscriptions, refunds, IP)
- [ ] Same style as /privacy
- [ ] Metadata with canonical URL
- [ ] Add to sitemap
- [ ] Fix login page links to point here instead of tool pages
- [ ] Commit: `feat: add static /terms page for ToolStack`

### Task 12: Seed 8 blog posts via Supabase

**Files:**
- Create: `scripts/seed-blog-posts.ts` (run once, then delete)

- [ ] Write 8 complete blog post articles in HTML with full content (600-1000 words each):
  1. "How to Invoice a Client: A Complete Guide for Freelancers" — targets "how to invoice a client"
  2. "EU VAT Rates 2025: Complete Country-by-Country Guide" — targets "EU VAT rates 2025"
  3. "Freelance Contract Template: What to Include and Why" — targets "freelance contract template"
  4. "How to Calculate VAT: Add and Remove Tax Explained" — targets "how to calculate VAT"
  5. "Privacy Policy for Small Business: What You Actually Need" — targets "privacy policy small business"
  6. "Best Currencies to Invoice In as a Freelancer" — targets "what currency to invoice clients"
  7. "Corporate Tax Rates by Country 2025: Which Countries Are Most Business-Friendly?" — targets "corporate tax rates by country"
  8. "How to Find the Perfect Meeting Time for Remote Teams" — targets "meeting time across timezones"
- [ ] Each post has: title, slug, excerpt, content (HTML), seo_title, seo_description, published=true, published_at
- [ ] Script uses Supabase service role key to insert
- [ ] Commit: `content: seed 8 SEO blog posts`

### Task 13: SEO improvements across all tool pages

**Files:**
- Modify: `app/(tools)/time-converter/page.tsx` — fix canonical URL (currently wrong, points to vercel preview URL)
- Modify: `app/(marketing)/layout.tsx` — add JSON-LD WebSite schema
- Modify: `app/layout.tsx` — add additional meta tags (og:image placeholder)
- Modify: `app/sitemap.ts` — add /about, /tools, /privacy, /terms

- [ ] Fix time-converter canonical: `https://toolstack.io/time-converter`
- [ ] Add WebSite JSON-LD schema to root layout
- [ ] Add /about, /tools, /privacy, /terms to sitemap static routes
- [ ] Add nav links for About and Tools to Header and Footer
- [ ] Commit: `seo: fix canonical URLs, add JSON-LD, update sitemap and nav`

### Task 14: Newsletter page

**Files:**
- Create: `app/(marketing)/newsletter/page.tsx`

- [ ] Dedicated page: hero, "What you'll get" (daily tips, tool spotlight, business insight)
- [ ] Large subscribe form (SubscribeWidget)
- [ ] Sample newsletter preview (mock email design inline)
- [ ] Metadata targeting "business newsletter for freelancers"
- [ ] Add to footer nav + sitemap
- [ ] Commit: `feat: add /newsletter landing page`

---

## PHASE C — Bug Fixes & Newsletter Improvements

### Task 15: Fix Supabase deprecated import in blog pages

**Files:**
- Modify: `app/(marketing)/blog/page.tsx`
- Modify: `app/(marketing)/blog/[slug]/page.tsx`

- [ ] Replace `createServerComponentClient` from `@supabase/auth-helpers-nextjs` with `createServerClient` from `@supabase/ssr`
- [ ] Pattern: `import { createServerClient } from '@/lib/supabase/server'` (already exists)
- [ ] Test: blog page loads without deprecation warnings
- [ ] Commit: `fix: use modern Supabase SSR client in blog pages`

### Task 16: Fix pricing inconsistency (Max plan price)

**Files:**
- Modify: `app/(marketing)/pricing/page.tsx`
- Modify: `app/(marketing)/page.tsx`

- [ ] Align Max plan price: homepage says €29, pricing page says €49
- [ ] Decision: use €29/month (as shown on homepage) — update pricing page
- [ ] Commit: `fix: align Max plan price to €29/month across all pages`

### Task 17: Newsletter — add Resend confirmation email

**Files:**
- Modify: `app/api/newsletter/subscribe/route.ts`
- Modify: `lib/resend.ts`

- [ ] After successful insert, send a welcome email via Resend
- [ ] Email: "Welcome to ToolStack Daily!" with confirmation of subscription + link to tools
- [ ] Graceful: if Resend fails, subscription still succeeds (log error only)
- [ ] Commit: `feat: send welcome email on newsletter subscribe via Resend`

### Task 18: Fix Header nav — add Tools and About links

**Files:**
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] Add "About" link to desktop nav and mobile sheet
- [ ] Footer: update Company links to include About, Tools, Newsletter, Privacy, Terms
- [ ] Footer: remove broken/placeholder social links or add real URLs
- [ ] Commit: `feat: update nav and footer with new pages`

### Task 19: Fix tools layout — improve AdBanner placeholder

**Files:**
- Modify: `components/layout/AdBanner.tsx`
- Modify: `app/(tools)/layout.tsx`

- [ ] AdBanner: only render when AdSense script has loaded (avoid layout shift)
- [ ] Tool pages: AdBanner below hero, not above it — better UX
- [ ] Commit: `fix: improve AdBanner rendering and placement`

### Task 20: Final commit + push

- [ ] `git push origin main`
- [ ] Verify Vercel build passes
