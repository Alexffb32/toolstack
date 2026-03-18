import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { InvoiceForm } from '@/components/tools/InvoiceForm'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Free Invoice Generator — Create PDF Invoices Online',
  description: 'Create professional invoices instantly. Live preview, PDF export, custom line items, VAT calculation, and multiple currencies. 100% free, no sign-up required.',
  alternates: { canonical: 'https://toolstack.io/invoice-generator' },
  openGraph: { title: 'Free Invoice Generator | ToolStack', description: 'Create professional PDF invoices in seconds — free, no sign-up.' },
}

// Static JSON-LD schema — safe, no user input
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Invoice Generator',
  url: 'https://toolstack.io/invoice-generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description: 'Create professional PDF invoices online for free.',
}

export default function InvoiceGeneratorPage() {
  return (
    <div>
      <script type="application/ld+json" suppressHydrationWarning
        // biome-ignore lint: static JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolPageHero
        title="Free Invoice Generator"
        description="Create professional PDF invoices in seconds. Custom line items, VAT calculation, multi-currency. No sign-up required."
        badge="Free"
        icon={FileText}
      />
      <InvoiceForm />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>About the Invoice Generator</h2>
        <p>Create professional invoices without any software. Fill in your details, add line items, and download a PDF — all processed locally in your browser.</p>
        <h3>FAQ</h3>
        <dl>
          <dt>Is this free?</dt>
          <dd>Yes, 100% free with no sign-up. Pro users can remove the watermark and save invoices to their dashboard.</dd>
          <dt>What currencies are supported?</dt>
          <dd>EUR, USD, GBP, CAD, AUD, CHF, JPY, SEK, NOK, and DKK.</dd>
          <dt>Is my data private?</dt>
          <dd>Yes — all processing is in your browser. Invoice data is never sent to our servers unless you save to your dashboard.</dd>
        </dl>
      </div>
    </div>
  )
}
