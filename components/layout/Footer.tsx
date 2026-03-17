import Link from 'next/link'
import { Wrench } from 'lucide-react'

const freeTools = [
  { name: 'Invoice Generator', href: '/invoice-generator' },
  { name: 'Meeting Time Planner', href: '/meeting-time-planner' },
  { name: 'VAT Calculator', href: '/vat-calculator' },
  { name: 'Currency Converter', href: '/currency-converter' },
  { name: 'Tax Rates', href: '/tax-rates' },
  { name: 'Sleep Calculator', href: '/sleep-calculator' },
]

const proTools = [
  { name: 'Privacy Policy Generator', href: '/privacy-policy-generator' },
  { name: 'Terms Generator', href: '/terms-generator' },
  { name: 'Contract Generator', href: '/contract-generator' },
  { name: 'Business Name Generator', href: '/business-name-generator' },
]

const companyLinks = [
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Dashboard', href: '/dashboard' },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">ToolStack</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Free business tools for freelancers and small businesses. Professional-grade, zero cost.
            </p>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Free Tools</h3>
            <ul className="space-y-2">
              {freeTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Pro Tools</h3>
            <ul className="space-y-2">
              {proTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ToolStack. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Free tools for freelancers · No sign-up required for basic use
          </p>
        </div>
      </div>
    </footer>
  )
}
