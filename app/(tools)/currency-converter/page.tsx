import type { Metadata } from 'next'
import { DollarSign } from 'lucide-react'
import { CurrencyConverter } from '@/components/tools/CurrencyConverter'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Currency Converter — Real Exchange Rates + Bank Fee Calculator',
  description: 'Convert currencies at real mid-market rates and see how much banks charge in hidden fees. 30+ currencies updated every 6 hours.',
  alternates: { canonical: 'https://toolstack.io/currency-converter' },
}

export default function CurrencyConverterPage() {
  return (
    <div>
      <ToolPageHero
        title="Currency Converter"
        description="Real exchange rates with hidden bank fee comparison. 30+ currencies updated every 6 hours."
        badge="Free"
        icon={DollarSign}
      />
      <CurrencyConverter />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>About the Currency Converter</h2>
        <p>This tool shows you the real mid-market exchange rate and compares it against typical bank rates (which add ~2.5% markup). For international transfers, consider using services like Wise, Revolut, or Interactive Brokers to get rates closer to the mid-market price.</p>
      </div>
    </div>
  )
}
