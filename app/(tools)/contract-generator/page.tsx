import type { Metadata } from 'next'
import { ContractForm } from '@/components/tools/ContractForm'
import { ProGate } from '@/components/tools/ProGate'

export const metadata: Metadata = {
  title: 'Contract Generator — Freelance, NDA, Consulting Contracts',
  description: 'AI-generated contracts: freelance service agreements, NDAs, client contracts, consulting agreements, and employment contracts. Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/contract-generator' },
}

export default function ContractGeneratorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contract Generator</h1>
        <p className="text-muted-foreground">Generate freelance agreements, NDAs, client contracts, and more with AI. <span className="text-primary font-medium">Pro plan required.</span></p>
      </div>
      <ProGate toolName="Contract Generator">
        <ContractForm />
      </ProGate>
      <p className="mt-4 text-xs text-muted-foreground">⚠ AI-generated contracts are not legal advice. Always have a qualified lawyer review any contract before signing.</p>
    </div>
  )
}
