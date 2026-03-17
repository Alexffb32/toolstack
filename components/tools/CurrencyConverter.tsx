'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRightLeft, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'MXN',
  'BRL', 'KRW', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'PLN', 'CZK', 'HUF',
  'TRY', 'ZAR', 'AED', 'SAR', 'THB', 'IDR', 'MYR', 'PHP', 'VND', 'ARS',
  'BTC', 'ETH', 'BNB', 'SOL', 'XRP',
]

interface Rates {
  base: string
  rates: Record<string, number>
  timestamp?: number
}

const BANK_MARKUP = 0.025 // 2.5% typical bank hidden fee

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1000')
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [rates, setRates] = useState<Rates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/currency')
      if (!res.ok) throw new Error('Failed to fetch rates')
      const data = await res.json()
      setRates(data)
      setLastUpdated(new Date())
    } catch {
      setError('Could not fetch live rates. Please check your API key.')
    } finally {
      setLoading(false)
    }
  }

  const getRate = (fromCur: string, toCur: string): number | null => {
    if (!rates) return null
    const fromRate = fromCur === rates.base ? 1 : rates.rates[fromCur]
    const toRate = toCur === rates.base ? 1 : rates.rates[toCur]
    if (!fromRate || !toRate) return null
    return toRate / fromRate
  }

  const realRate = getRate(from, to)
  const inputAmount = parseFloat(amount) || 0
  const convertedAmount = realRate ? inputAmount * realRate : null
  const bankAmount = realRate ? inputAmount * (realRate * (1 - BANK_MARKUP)) : null
  const bankCost = convertedAmount && bankAmount ? convertedAmount - bankAmount : null

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Label>Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount…"
            min={0}
          />
        </div>

        <div className="flex-1">
          <Label>From</Label>
          <Select value={from} onValueChange={v => v && setFrom(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="icon" onClick={swap} className="shrink-0 mb-0.5">
          <ArrowRightLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1">
          <Label>To</Label>
          <Select value={to} onValueChange={v => v && setTo(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {CURRENCIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading live exchange rates…
          </CardContent>
        </Card>
      ) : convertedAmount !== null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-primary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Real Exchange Rate (Mid-market)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {convertedAmount.toFixed(4)} {to}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                1 {from} = {realRate?.toFixed(6)} {to}
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Typical Bank Rate (est. −2.5%)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">
                {bankAmount?.toFixed(4)} {to}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Hidden cost: ≈ {bankCost?.toFixed(4)} {to}
              </p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {bankCost && bankCost > 0 && (
        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm font-medium">
            Banks typically charge 2–3% in hidden fees on currency exchanges. For your {amount} {from} exchange, that&apos;s approximately <strong>{bankCost.toFixed(2)} {to}</strong> in hidden costs.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Use services like Wise, Revolut, or Interactive Brokers for near mid-market rates.
          </p>
        </div>
      )}

      <Separator />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Rates refreshed every 6 hours · Source: ExchangeRate-API</span>
        <div className="flex items-center gap-2">
          {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString()}</span>}
          <Button variant="ghost" size="sm" onClick={fetchRates} disabled={loading}>
            <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
