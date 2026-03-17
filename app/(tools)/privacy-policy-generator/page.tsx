import type { Metadata } from 'next'
import { PrivacyPolicyForm } from '@/components/tools/PrivacyPolicyForm'
import { ProGate } from '@/components/tools/ProGate'

export const metadata: Metadata = {
  title: 'Privacy Policy Generator — GDPR & CCPA Compliant',
  description: 'AI-generated privacy policy tailored to your website. GDPR, CCPA, and PIPEDA compliant. Ready in seconds — Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/privacy-policy-generator' },
}

export default function PrivacyPolicyGeneratorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy Generator</h1>
        <p className="text-muted-foreground">AI-generated, GDPR & CCPA compliant privacy policy in seconds. <span className="text-primary font-medium">Pro plan required.</span></p>
      </div>
      <ProGate toolName="Privacy Policy Generator">
        <PrivacyPolicyForm />
      </ProGate>
    </div>
  )
}
