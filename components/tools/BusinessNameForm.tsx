'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useProGate } from '@/components/tools/ProGate'
import { Loader2, ExternalLink, Copy } from 'lucide-react'

const schema = z.object({
  industry: z.string().min(1, 'Required'),
  keywords: z.string().min(2, 'Enter at least one keyword'),
  style: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
})

type FormData = z.infer<typeof schema>

interface NameIdea {
  name: string
  tagline: string
  domain_note: string
}

const INDUSTRIES = [
  'Technology / SaaS', 'E-commerce / Retail', 'Consulting / Agency', 'Finance / Fintech',
  'Health / Wellness', 'Food & Beverage', 'Education / EdTech', 'Real Estate',
  'Creative / Design', 'Legal / Professional Services', 'Travel & Hospitality', 'Other',
]

const STYLES = [
  { value: 'professional', label: 'Professional & Trustworthy' },
  { value: 'playful', label: 'Playful & Fun' },
  { value: 'modern', label: 'Modern & Minimal' },
  { value: 'classic', label: 'Classic & Established' },
  { value: 'bold', label: 'Bold & Disruptive' },
]

const COUNTRIES = ['United States', 'United Kingdom', 'Germany', 'France', 'Portugal', 'Spain', 'Netherlands', 'Australia', 'Canada', 'Singapore', 'Global / International']

export function BusinessNameForm() {
  const [results, setResults] = useState<NameIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const { requirePro } = useProGate()

  const form = useForm<FormData>({ resolver: zodResolver(schema) })
  const watchData = form.watch()

  const onSubmit = async (data: FormData) => {
    if (!requirePro()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai/business-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to generate')
      setResults(json.names)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Label>Industry</Label>
          <Select value={watchData.industry ?? undefined} onValueChange={v => form.setValue('industry', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select industry…" /></SelectTrigger>
            <SelectContent>{INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
          </Select>
          {form.formState.errors.industry && <p className="text-xs text-destructive mt-1">{form.formState.errors.industry.message}</p>}
        </div>

        <div>
          <Label>Keywords / Concepts</Label>
          <Input {...form.register('keywords')} placeholder="fast, trust, growth, cloud…" />
          {form.formState.errors.keywords && <p className="text-xs text-destructive mt-1">{form.formState.errors.keywords.message}</p>}
        </div>

        <div>
          <Label>Brand Style</Label>
          <Select value={watchData.style ?? undefined} onValueChange={v => form.setValue('style', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select style…" /></SelectTrigger>
            <SelectContent>{STYLES.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div>
          <Label>Target Country / Market</Label>
          <Select value={watchData.country ?? undefined} onValueChange={v => form.setValue('country', v as string)}>
            <SelectTrigger><SelectValue placeholder="Select country…" /></SelectTrigger>
            <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          {error && <p className="text-sm text-destructive mb-3">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating 20 name ideas…</> : 'Generate Business Names'}
          </Button>
        </div>
      </form>

      {results.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4">20 Business Name Ideas for your {watchData.industry} business</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((idea, i) => (
              <Card key={i} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{idea.name}</span>
                        <Badge variant="outline" className="text-xs">#{i + 1}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 italic">&ldquo;{idea.tagline}&rdquo;</p>
                      <p className="text-xs text-muted-foreground mt-2">{idea.domain_note}</p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyName(idea.name)}
                        title="Copy name"
                      >
                        <Copy className={`h-3 w-3 ${copied === idea.name ? 'text-green-500' : ''}`} />
                      </Button>
                      <a
                        href={`https://domains.google.com/registrar/search?searchTerm=${idea.name.toLowerCase().replace(/\s+/g, '')}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="icon" className="h-7 w-7" title="Check domain">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
