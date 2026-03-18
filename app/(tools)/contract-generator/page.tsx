import type { Metadata } from 'next'
import { PenLine } from 'lucide-react'
import { ContractForm } from '@/components/tools/ContractForm'
import { ProGate } from '@/components/tools/ProGate'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Contract Generator — Freelance, NDA, Consulting Contracts',
  description: 'AI-generated contracts: freelance service agreements, NDAs, client contracts, consulting agreements, and employment contracts. Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/contract-generator' },
}

export default function ContractGeneratorPage() {
  return (
    <div>
      <ToolPageHero
        title="Contract Generator"
        description="Generate freelance agreements, NDAs, client contracts, and more with AI. Pro plan required."
        badge="Pro"
        icon={PenLine}
      />
      <ProGate toolName="Contract Generator">
        <ContractForm />
      </ProGate>
      <p className="mt-4 text-xs text-muted-foreground">⚠ AI-generated contracts are not legal advice. Always have a qualified lawyer review any contract before signing.</p>
    </div>
  )
}
