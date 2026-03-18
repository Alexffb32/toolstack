import Link from 'next/link'

const freeTools = [
  { name: 'Invoice Generator', href: '/invoice-generator' },
  { name: 'Meeting Time Planner', href: '/meeting-time-planner' },
  { name: 'VAT Calculator', href: '/vat-calculator' },
  { name: 'Currency Converter', href: '/currency-converter' },
  { name: 'Tax Rates', href: '/tax-rates' },
  { name: 'Time Converter', href: '/time-converter' },
]

const proTools = [
  { name: 'Privacy Policy Generator', href: '/privacy-policy-generator' },
  { name: 'Terms Generator', href: '/terms-generator' },
  { name: 'Contract Generator', href: '/contract-generator' },
]

const companyLinks = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Dashboard', href: '/dashboard' },
]

export function Footer() {
  return (
    <footer className="bg-[oklch(0.95_0_0)] border-t border-black/6">
      {/* Main footer links */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
                <span className="text-white font-black text-xs">TS</span>
              </div>
              <span className="text-sm font-semibold text-black">ToolStack</span>
            </Link>
            <p className="text-sm text-black/40 max-w-xs leading-relaxed">
              Free business tools for freelancers and small businesses. Professional-grade, zero cost.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Free Tools</h3>
            <ul className="space-y-2.5">
              {freeTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-black/50 hover:text-black transition-colors">{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Pro Tools</h3>
            <ul className="space-y-2.5">
              {proTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-black/50 hover:text-black transition-colors">{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-black/50 hover:text-black transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ORBAI-style centered logo footer */}
      <div className="border-t border-black/6 bg-[oklch(0.95_0_0)]">
        <div className="container mx-auto max-w-4xl px-6 py-20 text-center">
          {/* Social links */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { label: 'X', href: '#' },
              { label: 'IG', href: '#' },
              { label: 'LI', href: '#' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/12 bg-white text-xs font-bold text-black/50 hover:text-black hover:border-black/25 transition-colors shadow-sm">
                {label}
              </a>
            ))}
          </div>

          {/* Big centered logo */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-xl">
              <span className="text-white font-black text-xl">TS</span>
            </div>
            <span className="text-5xl font-black tracking-tight text-black">ToolStack</span>
          </div>

          <p className="text-sm text-black/35 mb-2">
            Free business tools for freelancers &amp; small businesses.
          </p>
          <p className="text-xs text-black/25">
            © {new Date().getFullYear()} ToolStack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
