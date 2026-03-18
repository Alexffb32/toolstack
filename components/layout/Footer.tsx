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
    <footer style={{ background: '#F4F8FF', borderTop: '1px solid #E8F0FE' }}>
      {/* Main footer links */}
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: '#155EEF' }}>
                <span className="text-white font-black text-xs">TS</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: '#182230' }}>ToolStack</span>
            </Link>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: '#667085' }}>
              Free business tools for freelancers and small businesses. Professional-grade, zero cost.
            </p>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#98A2B3' }}>Free Tools</h3>
            <ul className="space-y-2.5">
              {freeTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm transition-colors hover:text-[#155EEF]" style={{ color: '#475467' }}>{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#98A2B3' }}>Pro Tools</h3>
            <ul className="space-y-2.5">
              {proTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm transition-colors hover:text-[#155EEF]" style={{ color: '#475467' }}>{tool.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#98A2B3' }}>Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-[#155EEF]" style={{ color: '#475467' }}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Centered logo footer */}
      <div style={{ borderTop: '1px solid #E8F0FE', background: '#F4F8FF' }}>
        <div className="container mx-auto max-w-4xl px-6 py-20 text-center">
          {/* Social links */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[
              { label: 'X', href: '#' },
              { label: 'IG', href: '#' },
              { label: 'LI', href: '#' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                className="flex h-9 w-9 items-center justify-center rounded-xl border bg-white text-xs font-bold transition-colors hover:border-[#D1E0FF] hover:text-[#155EEF]"
                style={{ borderColor: '#E2E8F0', color: '#667085' }}>
                {label}
              </a>
            ))}
          </div>

          {/* Big centered logo */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl" style={{ background: '#155EEF' }}>
              <span className="text-white font-black text-xl">TS</span>
            </div>
            <span className="text-5xl font-black tracking-tight" style={{ color: '#0C111D', letterSpacing: '-1px' }}>ToolStack</span>
          </div>

          <p className="text-sm mb-2" style={{ color: '#667085' }}>
            Free business tools for freelancers &amp; small businesses.
          </p>
          <p className="text-xs" style={{ color: '#98A2B3' }}>
            © {new Date().getFullYear()} ToolStack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
