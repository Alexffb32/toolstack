'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { PdfDownloadButton } from '@/components/shared/PdfDownloadButton'
import { SaveDocumentButton } from '@/components/shared/SaveDocumentButton'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { useProGate } from '@/components/tools/ProGate'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  companyName: z.string().min(1, 'Required'),
  websiteUrl: z.string().url('Enter a valid URL'),
  country: z.string().min(1, 'Required'),
  dataTypes: z.array(z.string()).min(1, 'Select at least one'),
  thirdParties: z.array(z.string()),
})

type FormData = z.infer<typeof schema>

const DATA_TYPES = [
  { id: 'email', label: 'Email address' },
  { id: 'name', label: 'Full name' },
  { id: 'payment', label: 'Payment information' },
  { id: 'cookies', label: 'Cookies & tracking' },
  { id: 'analytics', label: 'Analytics data' },
  { id: 'ip', label: 'IP address' },
  { id: 'device', label: 'Device information' },
  { id: 'location', label: 'Location data' },
]

const THIRD_PARTIES = [
  { id: 'google_analytics', label: 'Google Analytics' },
  { id: 'stripe', label: 'Stripe (payments)' },
  { id: 'mailchimp', label: 'Mailchimp / Email marketing' },
  { id: 'intercom', label: 'Intercom / Customer support' },
  { id: 'facebook', label: 'Facebook Pixel' },
  { id: 'hotjar', label: 'Hotjar / Heatmaps' },
  { id: 'hubspot', label: 'HubSpot (CRM)' },
]

const COUNTRIES = [
  'European Union (GDPR)', 'United Kingdom', 'United States (CCPA/CPRA)',
  'Canada (PIPEDA)', 'Australia', 'Brazil (LGPD)', 'Other',
]

export function PrivacyPolicyForm() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { requirePro } = useProGate()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { dataTypes: [], thirdParties: [] },
  })

  const watchData = form.watch()

  const toggleArray = (field: 'dataTypes' | 'thirdParties', value: string) => {
    const current = form.getValues(field)
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value]
    form.setValue(field, updated, { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    if (!requirePro()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/privacy-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to generate')
      setResult(json.content)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label>Company / Website Name</Label>
          <Input {...form.register('companyName')} placeholder="Acme Inc." />
          {form.formState.errors.companyName && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.companyName.message}</p>
          )}
        </div>

        <div>
          <Label>Website URL</Label>
          <Input {...form.register('websiteUrl')} placeholder="https://yoursite.com" />
          {form.formState.errors.websiteUrl && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.websiteUrl.message}</p>
          )}
        </div>

        <div>
          <Label>Primary Jurisdiction</Label>
          <Select value={watchData.country ?? undefined} onValueChange={v => form.setValue('country', v as string)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country / law…" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2 block">Data You Collect</Label>
          <div className="grid grid-cols-2 gap-2">
            {DATA_TYPES.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={`data-${id}`}
                  checked={watchData.dataTypes?.includes(id)}
                  onCheckedChange={() => toggleArray('dataTypes', id)}
                />
                <label htmlFor={`data-${id}`} className="text-sm cursor-pointer">{label}</label>
              </div>
            ))}
          </div>
          {form.formState.errors.dataTypes && (
            <p className="text-xs text-destructive mt-1">{form.formState.errors.dataTypes.message}</p>
          )}
        </div>

        <div>
          <Label className="mb-2 block">Third-Party Services Used</Label>
          <div className="grid grid-cols-2 gap-2">
            {THIRD_PARTIES.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <Checkbox
                  id={`tp-${id}`}
                  checked={watchData.thirdParties?.includes(id)}
                  onCheckedChange={() => toggleArray('thirdParties', id)}
                />
                <label htmlFor={`tp-${id}`} className="text-sm cursor-pointer">{label}</label>
              </div>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating with AI…</>
          ) : (
            'Generate Privacy Policy'
          )}
        </Button>
      </form>

      <div>
        {result ? (
          <div>
            <Card>
              <CardContent className="p-0">
                <SafeHtml
                  id="privacy-policy-output"
                  html={result}
                  className="p-6 prose prose-sm max-w-none dark:prose-invert max-h-[600px] overflow-y-auto"
                />
              </CardContent>
            </Card>
            <div className="mt-3 flex gap-3">
              <PdfDownloadButton targetId="privacy-policy-output" filename="privacy-policy.pdf" />
              <SaveDocumentButton
                type="privacy_policy"
                title={`Privacy Policy — ${watchData.companyName}`}
                data={watchData as unknown as Record<string, unknown>}
                htmlContent={result}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ⚠ AI-generated content. Have a qualified lawyer review before publishing.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-lg border-2 border-dashed text-muted-foreground">
            <p className="text-sm text-center px-4">Fill the form and click Generate — your privacy policy will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
