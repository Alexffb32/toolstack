import type { Metadata } from 'next'
import { TaxRatesTable } from '@/components/tools/TaxRatesTable'

export const metadata: Metadata = {
  title: 'Tax Rates by Country 2026 — Corporate & Income Tax',
  description: 'Searchable table of corporate tax rates, top income tax rates, and dividend withholding tax for 55+ countries. Updated March 2026.',
  alternates: { canonical: 'https://toolstack.io/tax-rates' },
}

export default function TaxRatesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tax Rates by Country 2026</h1>
        <p className="text-muted-foreground">Corporate tax, income tax, and dividend withholding rates for 55+ countries. Click rows to compare up to 3 countries side-by-side.</p>
      </div>
      <TaxRatesTable />
    </div>
  )
}
