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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PdfDownloadButton } from '@/components/shared/PdfDownloadButton'
import { SaveDocumentButton } from '@/components/shared/SaveDocumentButton'
import { SafeHtml } from '@/components/shared/SafeHtml'
import { useProGate } from '@/components/tools/ProGate'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  contractType: z.string().min(1, 'Required'),
  party1Name: z.string().min(1, 'Required'),
  party2Name: z.string().min(1, 'Required'),
  servicesScope: z.string().min(10, 'Describe the scope of work'),
  paymentAmount: z.string().min(1, 'Required'),
  paymentSchedule: z.string().min(1, 'Required'),
  timeline: z.string().min(1, 'Required'),
  terminationNotice: z.string().min(1, 'Required'),
  governingLaw: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

const CONTRACT_TYPES = [
  { value: 'freelance', label: 'Freelance Service Agreement' },
  { value: 'nda', label: 'Non-Disclosure Agreement (NDA)' },
  { value: 'client', label: 'Client Contract' },
  { value: 'consulting', label: 'Consulting Agreement' },
  { value: 'employment', label: 'Employment Contract' },
]

const PAYMENT_SCHEDULES = ['Upon signing', 'Net 30', 'Net 15', 'Monthly', '50% upfront / 50% on completion', 'Weekly', 'Milestone-based']
const TERMINATION_NOTICES = ['7 days', '14 days', '30 days', '60 days', '90 days', 'Immediate (for cause)']
const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'France', 'Ireland', 'Netherlands', 'Portugal', 'Spain', 'Italy', 'Canada', 'Australia', 'Singapore', 'Other']

export function ContractForm() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { requirePro } = useProGate()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { contractType: 'freelance' },
  })

  const watchData = form.watch()

  const onSubmit = async (data: FormData) => {
    if (!requirePro()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/contract', {
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
          <Label className="mb-2 block">Contract Type</Label>
          <Tabs value={watchData.contractType ?? undefined} onValueChange={v => form.setValue('contractType', v as string)}>
            <TabsList className="flex-wrap h-auto gap-1">
              {CONTRACT_TYPES.map(({ value, label }) => (
                <TabsTrigger key={value} value={value} className="text-xs">{label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Party 1 (You / Client)</Label>
            <Input {...form.register('party1Name')} placeholder="Your name or company" />
            {form.formState.errors.party1Name && <p className="text-xs text-destructive mt-1">{form.formState.errors.party1Name.message}</p>}
          </div>
          <div>
            <Label>Party 2 (Other Party)</Label>
            <Input {...form.register('party2Name')} placeholder="Contractor / Client name" />
            {form.formState.errors.party2Name && <p className="text-xs text-destructive mt-1">{form.formState.errors.party2Name.message}</p>}
          </div>
        </div>

        <div>
          <Label>Scope of Services / Work</Label>
          <Textarea {...form.register('servicesScope')} placeholder="Describe the services, deliverables, or scope of work…" rows={3} />
          {form.formState.errors.servicesScope && <p className="text-xs text-destructive mt-1">{form.formState.errors.servicesScope.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Payment Amount</Label>
            <Input {...form.register('paymentAmount')} placeholder="€5,000 or €150/hour" />
            {form.formState.errors.paymentAmount && <p className="text-xs text-destructive mt-1">{form.formState.errors.paymentAmount.message}</p>}
          </div>
          <div>
            <Label>Payment Schedule</Label>
            <Select value={watchData.paymentSchedule ?? undefined} onValueChange={v => form.setValue('paymentSchedule', v as string)}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>{PAYMENT_SCHEDULES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Project Timeline</Label>
            <Input {...form.register('timeline')} placeholder="e.g. 3 months, by Dec 31 2025" />
            {form.formState.errors.timeline && <p className="text-xs text-destructive mt-1">{form.formState.errors.timeline.message}</p>}
          </div>
          <div>
            <Label>Termination Notice</Label>
            <Select value={watchData.terminationNotice ?? undefined} onValueChange={v => form.setValue('terminationNotice', v as string)}>
              <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>{TERMINATION_NOTICES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Governing Law</Label>
          <Select value={watchData.governingLaw ?? undefined} onValueChange={v => form.setValue('governingLaw', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select country…" /></SelectTrigger>
            <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating contract…</> : 'Generate Contract'}
        </Button>
      </form>

      <div>
        {result ? (
          <div>
            <Card>
              <CardContent className="p-0">
                <SafeHtml id="contract-output" html={result} className="p-6 prose prose-sm max-w-none dark:prose-invert max-h-[600px] overflow-y-auto" />
              </CardContent>
            </Card>
            <div className="mt-3 flex gap-3">
              <PdfDownloadButton targetId="contract-output" filename="contract.pdf" />
              <SaveDocumentButton type="contract" title={`${CONTRACT_TYPES.find(t => t.value === watchData.contractType)?.label} — ${watchData.party1Name}`} data={watchData as unknown as Record<string, unknown>} htmlContent={result} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">⚠ Not legal advice. Have a qualified lawyer review this contract before signing.</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 rounded-lg border-2 border-dashed text-muted-foreground">
            <p className="text-sm text-center px-4">Fill the form and click Generate — your contract will appear here</p>
          </div>
        )}
      </div>
    </div>
  )
}
