'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import vatRatesData from '@/data/vat-rates.json'
import { formatCurrency } from '@/lib/utils'

interface VatRate {
  name: string
  standard: number
  reduced: number[]
  currency: string
  note?: string
}

const vatRates = vatRatesData as Record<string, VatRate>

export function VatCalculator() {
  const [amount, setAmount] = useState<string>('1000')
  const [country, setCountry] = useState<string>('DE')
  const [mode, setMode] = useState<'add' | 'remove'>('add')
  const [vatType, setVatType] = useState<string>('standard')

  const countryData = vatRates[country]

  const vatRateOptions = useMemo(() => {
    if (!countryData) return []
    const opts = [{ label: `Standard (${countryData.standard}%)`, value: 'standard', rate: countryData.standard }]
    countryData.reduced.forEach((r, i) => {
      opts.push({ label: `Reduced ${i + 1} (${r}%)`, value: `reduced_${i}`, rate: r })
    })
    return opts
  }, [countryData])

  const selectedRate = useMemo(() => {
    if (!countryData) return 0
    if (vatType === 'standard') return countryData.standard
    const idx = parseInt(vatType.replace('reduced_', ''))
    return countryData.reduced[idx] ?? 0
  }, [countryData, vatType])

  const calculation = useMemo(() => {
    const input = parseFloat(amount) || 0
    const rate = selectedRate / 100

    if (mode === 'add') {
      // Input is net, calculate gross
      const vatAmount = input * rate
      return { net: input, vatAmount, gross: input + vatAmount }
    } else {
      // Input is gross, calculate net
      const net = input / (1 + rate)
      const vatAmount = input - net
      return { net, vatAmount, gross: input }
    }
  }, [amount, selectedRate, mode])

  const currency = countryData?.currency || 'EUR'

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <Label>Country</Label>
            <Select value={country} onValueChange={v => v && setCountry(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {Object.entries(vatRates)
                  .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                  .map(([code, data]) => (
                    <SelectItem key={code} value={code}>
                      {data.name} ({data.standard}%)
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>VAT Rate</Label>
            <Select value={vatType} onValueChange={v => v && setVatType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vatRateOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Amount ({currency})</Label>
            <Input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount…"
              min={0}
              step="0.01"
            />
          </div>

          <div>
            <Label>Calculation Mode</Label>
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'add' | 'remove')}>
              <TabsList className="w-full">
                <TabsTrigger value="add" className="flex-1">Add VAT (net → gross)</TabsTrigger>
                <TabsTrigger value="remove" className="flex-1">Remove VAT (gross → net)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {countryData?.note && (
            <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">{countryData.note}</p>
          )}
        </div>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Result for {countryData?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Net Amount</span>
                <span className="font-semibold">{formatCurrency(calculation.net, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">VAT ({selectedRate}%)</span>
                <span className="font-semibold text-orange-500">{formatCurrency(calculation.vatAmount, currency)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Gross Amount</span>
                <span>{formatCurrency(calculation.gross, currency)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EU VAT Table */}
      <div>
        <h3 className="font-semibold mb-3">EU & Major Country VAT Rates</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-4 font-medium text-muted-foreground">Country</th>
                <th className="py-2 pr-4 font-medium text-muted-foreground">Standard</th>
                <th className="py-2 pr-4 font-medium text-muted-foreground">Reduced Rate(s)</th>
                <th className="py-2 font-medium text-muted-foreground">Currency</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(vatRates)
                .sort(([, a], [, b]) => a.name.localeCompare(b.name))
                .map(([code, data]) => (
                  <tr
                    key={code}
                    className={`border-b hover:bg-muted/50 cursor-pointer transition-colors ${code === country ? 'bg-primary/10' : ''}`}
                    onClick={() => setCountry(code)}
                  >
                    <td className="py-2 pr-4">{data.name}</td>
                    <td className="py-2 pr-4">
                      <Badge variant="outline">{data.standard}%</Badge>
                    </td>
                    <td className="py-2 pr-4">
                      {data.reduced.length > 0
                        ? data.reduced.map(r => <Badge key={r} variant="secondary" className="mr-1 text-xs">{r}%</Badge>)
                        : <span className="text-muted-foreground text-xs">None</span>}
                    </td>
                    <td className="py-2">{data.currency}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
