'use client'

import { useState } from 'react'
import { useForm, useFieldArray, Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { PdfDownloadButton } from '@/components/shared/PdfDownloadButton'
import { SaveDocumentButton } from '@/components/shared/SaveDocumentButton'
import { Plus, Trash2 } from 'lucide-react'
import { formatCurrency, generateInvoiceNumber } from '@/lib/utils'

const lineItemSchema = z.object({
  description: z.string().min(1, 'Required'),
  qty: z.preprocess(v => Number(v), z.number().min(1)),
  unitPrice: z.preprocess(v => Number(v), z.number().min(0)),
})

const invoiceSchema = z.object({
  invoiceNumber: z.string(),
  issueDate: z.string(),
  dueDate: z.string(),
  currency: z.string().default('EUR'),
  fromName: z.string().min(1, 'Required'),
  fromAddress: z.string(),
  fromEmail: z.string().email().optional().or(z.literal('')),
  toName: z.string().min(1, 'Required'),
  toAddress: z.string(),
  toEmail: z.string().email().optional().or(z.literal('')),
  lineItems: z.array(lineItemSchema).min(1),
  taxRate: z.preprocess(v => Number(v), z.number().min(0).max(100)).default(0),
  notes: z.string().optional(),
})

type InvoiceFormData = z.infer<typeof invoiceSchema>

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'SEK', 'NOK', 'DKK']

export function InvoiceForm() {
  const [preview, setPreview] = useState<InvoiceFormData | null>(null)

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema) as Resolver<InvoiceFormData>,
    defaultValues: {
      invoiceNumber: generateInvoiceNumber(),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      currency: 'EUR',
      lineItems: [{ description: '', qty: 1, unitPrice: 0 }],
      taxRate: 0,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'lineItems',
  })

  const watchedValues = form.watch()

  const subtotal = (watchedValues.lineItems || []).reduce(
    (sum, item) => sum + (item.qty || 0) * (item.unitPrice || 0),
    0
  )
  const taxAmount = subtotal * ((watchedValues.taxRate || 0) / 100)
  const total = subtotal + taxAmount

  const onSubmit = (data: InvoiceFormData) => {
    setPreview(data)
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Form */}
      <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Invoice Number</Label>
              <Input {...form.register('invoiceNumber')} />
            </div>
            <div>
              <Label>Currency</Label>
              <Select
                value={watchedValues.currency ?? undefined}
                onValueChange={(v) => form.setValue('currency', v as string)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Issue Date</Label>
              <Input type="date" {...form.register('issueDate')} />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input type="date" {...form.register('dueDate')} />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">From (You)</h3>
              <Input placeholder="Your Name / Company" {...form.register('fromName')} />
              <Textarea placeholder="Address" rows={2} {...form.register('fromAddress')} />
              <Input placeholder="Email" {...form.register('fromEmail')} />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">To (Client)</h3>
              <Input placeholder="Client Name / Company" {...form.register('toName')} />
              <Textarea placeholder="Address" rows={2} {...form.register('toAddress')} />
              <Input placeholder="Email" {...form.register('toEmail')} />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3">Line Items</h3>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-6">
                    <Input placeholder="Description" {...form.register(`lineItems.${index}.description`)} />
                  </div>
                  <div className="col-span-2">
                    <Input type="number" placeholder="Qty" min={1} {...form.register(`lineItems.${index}.qty`)} />
                  </div>
                  <div className="col-span-3">
                    <Input type="number" placeholder="Unit Price" step="0.01" min={0} {...form.register(`lineItems.${index}.unitPrice`)} />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length === 1}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ description: '', qty: 1, unitPrice: 0 })}>
              <Plus className="mr-2 h-4 w-4" /> Add Line Item
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Label>Tax Rate (%)</Label>
            <Input type="number" className="w-24" min={0} max={100} step="0.1" {...form.register('taxRate')} />
          </div>

          <div>
            <Label>Notes / Payment Instructions</Label>
            <Textarea placeholder="Bank details, payment terms, thank you note…" {...form.register('notes')} />
          </div>

          <Button type="submit" className="w-full">Preview Invoice</Button>
        </form>
      </div>

      {/* Preview */}
      <div>
        <Card>
          <CardContent className="p-0">
            {preview ? (
              <div>
                <div id="invoice-preview" className="p-8 bg-white text-gray-900 min-h-[600px]">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                      <p className="text-gray-500 text-sm mt-1">#{preview.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{preview.fromName}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{preview.fromAddress}</p>
                      {preview.fromEmail && <p className="text-sm text-gray-600">{preview.fromEmail}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Bill To</p>
                      <p className="font-semibold">{preview.toName}</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{preview.toAddress}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="text-gray-500">Issue Date: </span>
                        <span>{preview.issueDate}</span>
                      </div>
                      <div className="text-sm mt-1">
                        <span className="text-gray-500">Due Date: </span>
                        <span className="font-semibold">{preview.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 text-sm font-semibold text-gray-600">Description</th>
                        <th className="text-right py-2 text-sm font-semibold text-gray-600">Qty</th>
                        <th className="text-right py-2 text-sm font-semibold text-gray-600">Unit Price</th>
                        <th className="text-right py-2 text-sm font-semibold text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.lineItems.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-2 text-sm">{item.description}</td>
                          <td className="py-2 text-sm text-right">{item.qty}</td>
                          <td className="py-2 text-sm text-right">{formatCurrency(item.unitPrice, preview.currency)}</td>
                          <td className="py-2 text-sm text-right font-medium">{formatCurrency(item.qty * item.unitPrice, preview.currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-end">
                    <div className="w-56 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(subtotal, preview.currency)}</span>
                      </div>
                      {preview.taxRate > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax ({preview.taxRate}%)</span>
                          <span>{formatCurrency(taxAmount, preview.currency)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-1 mt-1">
                        <span>Total</span>
                        <span>{formatCurrency(total, preview.currency)}</span>
                      </div>
                    </div>
                  </div>

                  {preview.notes && (
                    <div className="mt-8 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold uppercase text-gray-500 mb-1">Notes</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{preview.notes}</p>
                    </div>
                  )}

                  <div className="mt-8 text-center text-xs text-gray-400">
                    Generated with ToolStack · toolstack.io
                  </div>
                </div>

                <div className="p-4 border-t flex gap-3">
                  <PdfDownloadButton targetId="invoice-preview" filename={`invoice-${preview.invoiceNumber}.pdf`} />
                  <SaveDocumentButton
                    type="invoice"
                    title={`Invoice ${preview.invoiceNumber} — ${preview.toName}`}
                    data={preview as unknown as Record<string, unknown>}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p className="text-sm">Fill the form and click "Preview Invoice" to see a live preview</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
