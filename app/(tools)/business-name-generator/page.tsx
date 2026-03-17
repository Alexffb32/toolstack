import type { Metadata } from 'next'
import { BusinessNameForm } from '@/components/tools/BusinessNameForm'
import { ProGate } from '@/components/tools/ProGate'

export const metadata: Metadata = {
  title: 'Business Name Generator — AI-Powered Name Ideas with Taglines',
  description: 'Generate 20 creative business name ideas with taglines and domain availability notes. Customized to your industry and brand style. Pro plan required.',
  alternates: { canonical: 'https://toolstack.io/business-name-generator' },
}

export default function BusinessNameGeneratorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Business Name Generator</h1>
        <p className="text-muted-foreground">AI generates 20 name ideas with taglines and domain notes for your industry. <span className="text-primary font-medium">Pro plan required.</span></p>
      </div>
      <ProGate toolName="Business Name Generator">
        <BusinessNameForm />
      </ProGate>
    </div>
  )
}
