import type { Metadata } from 'next'
import { ScrollText } from 'lucide-react'
import { TermsForm } from '@/components/tools/TermsForm'
import { ProGate } from '@/components/tools/ProGate'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Terms of Service Generator — Custom ToS for Your Business',
  description: 'AI-generated Terms of Service for SaaS, e-commerce, freelancers, and more. Customized to your refund policy and governing law. Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/terms-generator' },
}

export default function TermsGeneratorPage() {
  return (
    <div>
      <ToolPageHero
        title="Terms of Service Generator"
        description="AI-generated Terms of Service tailored to your business type. Pro plan required."
        badge="Pro"
        icon={ScrollText}
      />
      <ProGate toolName="Terms of Service Generator">
        <TermsForm />
      </ProGate>
    </div>
  )
}
