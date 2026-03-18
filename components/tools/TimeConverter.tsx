'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Unit = 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'

const UNITS: { value: Unit; label: string; toSeconds: number }[] = [
  { value: 'seconds', label: 'Seconds', toSeconds: 1 },
  { value: 'minutes', label: 'Minutes', toSeconds: 60 },
  { value: 'hours',   label: 'Hours',   toSeconds: 3600 },
  { value: 'days',    label: 'Days',    toSeconds: 86400 },
  { value: 'weeks',   label: 'Weeks',   toSeconds: 604800 },
  { value: 'months',  label: 'Months',  toSeconds: 2629746 },  // avg 30.44 days
  { value: 'years',   label: 'Years',   toSeconds: 31556952 }, // avg 365.25 days
]

function convert(value: number, from: Unit, to: Unit): string {
  const fromUnit = UNITS.find(u => u.value === from)!
  const toUnit   = UNITS.find(u => u.value === to)!
  const result   = (value * fromUnit.toSeconds) / toUnit.toSeconds
  if (result === 0) return '0'
  if (Math.abs(result) >= 1e9) return result.toExponential(4)
  if (Math.abs(result) < 0.0001 && result !== 0) return result.toExponential(4)
  return result % 1 === 0 ? result.toLocaleString() : parseFloat(result.toPrecision(8)).toLocaleString()
}

export function TimeConverter() {
  const [value, setValue] = useState('1')
  const [from, setFrom]   = useState<Unit>('hours')
  const [to, setTo]       = useState<Unit>('minutes')

  const numVal = parseFloat(value) || 0
  const result = convert(numVal, from, to)

  const allConversions = UNITS.filter(u => u.value !== from).map(u => ({
    ...u,
    result: convert(numVal, from, u.value),
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Convert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={from} onValueChange={v => setFrom(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {UNITS.map(u => (
                    <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Select value={to} onValueChange={v => setTo(v as Unit)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {UNITS.map(u => (
                    <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              {value || '0'} {from} =
            </p>
            <p className="text-3xl font-bold text-primary">{result}</p>
            <p className="text-sm text-muted-foreground mt-1">{to}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All conversions for {value || '0'} {from}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {allConversions.map(u => (
              <div
                key={u.value}
                className="rounded-lg border bg-muted/30 p-3 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setTo(u.value)}
              >
                <p className="text-xs text-muted-foreground mb-1">{u.label}</p>
                <p className="font-semibold text-sm truncate">{u.result}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
