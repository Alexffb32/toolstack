'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { PdfDownloadButton } from '@/components/shared/PdfDownloadButton'
import { SaveDocumentButton } from '@/components/shared/SaveDocumentButton'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { useProGate } from '@/components/tools/ProGate'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  companyName: z.string().min(1, 'Required'),
  websiteUrl: z.string().url('Enter a valid URL'),
  businessType: z.string().min(1, 'Required'),
  serviceDescription: z.string().min(10, 'Describe your service briefly'),
  paymentTerms: z.string().min(1, 'Required'),
  refundPolicy: z.string().min(1, 'Required'),
  governingLaw: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

const BUSINESS_TYPES = ['SaaS / Software', 'E-commerce', 'Freelance / Agency', 'Marketplace', 'Mobile App', 'Content / Media', 'Other']
const PAYMENT_TERMS = ['One-time payment', 'Monthly subscription', 'Annual subscription', 'Milestone-based', 'Hourly billing', 'Freemium']
const REFUND_POLICIES = ['No refunds', '14-day money-back guarantee', '30-day money-back guarantee', 'Pro-rata refunds', 'Case-by-case basis']
const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'France', 'Ireland', 'Netherlands', 'Portugal', 'Spain', 'Italy', 'Canada', 'Australia', 'Singapore', 'Other']

export function TermsForm() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { requirePro } = useProGate()

  const form = useForm<FormData>({ resolver: zodResolver(schema) })
  const watchData = form.watch()

  const onSubmit = async (data: FormData) => {
    if (!requirePro()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/terms', {
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Company Name</Label>
            <Input {...form.register('companyName')} placeholder="Acme Inc." />
            {form.formState.errors.companyName && <p className="text-xs text-destructive mt-1">{form.formState.errors.companyName.message}</p>}
          </div>
          <div>
            <Label>Website URL</Label>
            <Input {...form.register('websiteUrl')} placeholder="https://yoursite.com" />
            {form.formState.errors.websiteUrl && <p className="text-xs text-destructive mt-1">{form.formState.errors.websiteUrl.message}</p>}
          </div>
        </div>

        <div>
          <Label>Business Type</Label>
          <Select value={watchData.businessType ?? undefined} onValueChange={v => form.setValue('businessType', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select type…" /></SelectTrigger>
            <SelectContent>{BUSINESS_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <Label>Service Description</Label>
          <Textarea {...form.register('serviceDescription')} placeholder="Briefly describe what your product/service does…" rows={3} />
          {form.formState.errors.serviceDescription && <p className="text-xs text-destructive mt-1">{form.formState.errors.serviceDescription.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Payment Terms</Label>
            <Select value={watchData.paymentTerms ?? undefined} onValueChange={v => form.setValue('paymentTerms', v as string)}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>{PAYMENT_TERMS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Refund Policy</Label>
            <Select value={watchData.refundPolicy ?? undefined} onValueChange={v => form.setValue('refundPolicy', v as string)}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>{REFUND_POLICIES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Governing Law (Country)</Label>
          <Select value={watchData.governingLaw ?? undefined} onValueChange={v => form.setValue('governingLaw', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select country…" /></SelectTrigger>
            <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…</> : 'Generate Terms of Service'}
        </Button>
      </form>

      <div>
        {result ? (
          <div>
            <Card>
              <CardContent className="p-0">
                <SafeHtml id="terms-output" html={result} className="p-6 prose prose-sm max-w-none dark:prose-invert max-h-[600px] overflow-y-auto" />
              </CardContent>
            </Card>
            <div className="mt-3 flex gap-3">
              <PdfDownloadButton targetId="terms-output" filename="terms-of-service.pdf" />
              <SaveDocumentButton type="terms" title={`Terms of Service — ${watchData.companyName}`} data={watchData as unknown as Record<string, unknown>} htmlContent={result} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">⚠ AI-generated content. Have a qualified lawyer review before publishing.</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-lg border-2 border-dashed text-muted-foreground">
            <p className="text-sm text-center px-4">Fill the form and click Generate — your Terms of Service will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
