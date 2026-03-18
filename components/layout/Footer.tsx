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
    <footer className="border-t border-white/8 bg-[oklch(0.09_0_0)]">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="text-black font-black text-sm tracking-tight">TS</span>
              </div>
              <span className="text-base font-bold text-white">ToolStack</span>
            </Link>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed">
              Free business tools for freelancers and small businesses. Professional-grade, zero cost.
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Free Tools</h3>
            <ul className="space-y-2.5">
              {freeTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Pro Tools</h3>
            <ul className="space-y-2.5">
              {proTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} ToolStack. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Free tools for freelancers · No sign-up required for basic use
          </p>
        </div>
      </div>
    </footer>
  )
}
