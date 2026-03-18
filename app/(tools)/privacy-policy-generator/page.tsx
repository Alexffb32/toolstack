import type { Metadata } from 'next'
import { Shield } from 'lucide-react'
import { PrivacyPolicyForm } from '@/components/tools/PrivacyPolicyForm'
import { ProGate } from '@/components/tools/ProGate'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy Generator — GDPR & CCPA Compliant',
  description: 'AI-generated privacy policy tailored to your website. GDPR, CCPA, and PIPEDA compliant. Ready in seconds — Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/privacy-policy-generator' },
}

export default function PrivacyPolicyGeneratorPage() {
  return (
    <div>
      <ToolPageHero
        title="Privacy Policy Generator"
        description="AI-generated, GDPR & CCPA compliant privacy policy in seconds. Pro plan required."
        badge="Pro"
        icon={Shield}
      />
      <ProGate toolName="Privacy Policy Generator">
        <PrivacyPolicyForm />
      </ProGate>
    </div>
  )
}
