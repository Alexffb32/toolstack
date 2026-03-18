import type { Metadata } from 'next'
import { BarChart3 } from 'lucide-react'
import { TaxRatesTable } from '@/components/tools/TaxRatesTable'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Tax Rates by Country 2026 — Corporate & Income Tax',
  description: 'Searchable table of corporate tax rates, top income tax rates, and dividend withholding tax for 55+ countries. Updated March 2026.',
  alternates: { canonical: 'https://toolstack.io/tax-rates' },
}

export default function TaxRatesPage() {
  return (
    <div>
      <ToolPageHero
        title="Tax Rates by Country 2026"
        description="Corporate tax, income tax, and dividend withholding rates for 55+ countries. Click rows to compare up to 3 countries side-by-side."
        badge="Free"
        icon={BarChart3}
      />
      <TaxRatesTable />
    </div>
  )
}
