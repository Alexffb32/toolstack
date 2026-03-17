import type { Metadata } from 'next'
import { TermsForm } from '@/components/tools/TermsForm'
import { ProGate } from '@/components/tools/ProGate'

export const metadata: Metadata = {
  title: 'Terms of Service Generator — Custom ToS for Your Business',
  description: 'AI-generated Terms of Service for SaaS, e-commerce, freelancers, and more. Customized to your refund policy and governing law. Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/terms-generator' },
}

export default function TermsGeneratorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Terms of Service Generator</h1>
        <p className="text-muted-foreground">AI-generated Terms of Service tailored to your business type. <span className="text-primary font-medium">Pro plan required.</span></p>
      </div>
      <ProGate toolName="Terms of Service Generator">
        <TermsForm />
      </ProGate>
    </div>
  )
}
