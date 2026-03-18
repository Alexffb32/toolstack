import type { Metadata } from 'next'
import { Calculator } from 'lucide-react'
import { VatCalculator } from '@/components/tools/VatCalculator'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'VAT Calculator — Calculate VAT for All EU Countries',
  description: 'Add or remove VAT for any EU country plus UK, Australia, Canada, Japan, and more. Instant calculation with reverse VAT support.',
  alternates: { canonical: 'https://toolstack.io/vat-calculator' },
}

export default function VatCalculatorPage() {
  return (
    <div>
      <ToolPageHero
        title="VAT Calculator"
        description="Add or remove VAT for any EU country, UK, Australia, Canada, Japan, and more. Instant calculation with reverse VAT support."
        badge="Free"
        icon={Calculator}
      />
      <VatCalculator />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>About VAT Rates</h2>
        <p>VAT (Value Added Tax) is a consumption tax charged at each stage of production. In the EU, rates range from 17% (Luxembourg) to 27% (Hungary). The UK has a standard rate of 20% post-Brexit. Use the reverse VAT calculator to find the net price when you know the gross amount.</p>
      </div>
    </div>
  )
}
