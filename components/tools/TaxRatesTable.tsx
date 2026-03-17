'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, X } from 'lucide-react'
import taxRatesData from '@/data/tax-rates.json'

interface TaxRate {
  name: string
  region: string
  corporate: number
  income_top: number
  dividend_withholding: number
}

const taxRates = taxRatesData as Record<string, TaxRate>
const regions = ['All', 'EU', 'Europe', 'Americas', 'Asia', 'Middle East', 'Africa', 'Oceania']

export function TaxRatesTable() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [compareList, setCompareList] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'name' | 'corporate' | 'income_top' | 'dividend_withholding'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    return Object.entries(taxRates)
      .filter(([, data]) => {
        const matchSearch = data.name.toLowerCase().includes(search.toLowerCase())
        const matchRegion = region === 'All' || data.region === region
        return matchSearch && matchRegion
      })
      .sort(([, a], [, b]) => {
        const aVal = sortBy === 'name' ? a.name : a[sortBy]
        const bVal = sortBy === 'name' ? b.name : b[sortBy]
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
        }
        return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number)
      })
  }, [search, region, sortBy, sortDir])

  const toggleCompare = (code: string) => {
    setCompareList(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : prev.length < 3 ? [...prev, code] : prev
    )
  }

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ col }: { col: typeof sortBy }) => (
    <span className="ml-1 text-muted-foreground">
      {sortBy === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  const compareData = compareList.map(code => ({ code, ...taxRates[code] }))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search country…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={region} onValueChange={v => v && setRegion(v)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground flex items-center">
          {filtered.length} countries · Click rows to compare (max 3)
        </span>
      </div>

      {/* Compare panel */}
      {compareList.length > 0 && (
        <Card>
          <CardHeader className="pb-3 flex-row items-center justify-between">
            <CardTitle className="text-sm">Comparison</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setCompareList([])}>
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {compareData.map(d => (
                <div key={d.code} className="space-y-2">
                  <p className="font-semibold">{d.name}</p>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Corporate</span>
                      <span className="font-medium">{d.corporate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income (top)</span>
                      <span className="font-medium">{d.income_top}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dividend WHT</span>
                      <span className="font-medium">{d.dividend_withholding}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left py-3 px-4 font-medium cursor-pointer hover:bg-muted/80" onClick={() => handleSort('name')}>
                Country <SortIcon col="name" />
              </th>
              <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Region</th>
              <th className="text-right py-3 px-4 font-medium cursor-pointer hover:bg-muted/80" onClick={() => handleSort('corporate')}>
                Corporate Tax <SortIcon col="corporate" />
              </th>
              <th className="text-right py-3 px-4 font-medium cursor-pointer hover:bg-muted/80" onClick={() => handleSort('income_top')}>
                Income Tax (top) <SortIcon col="income_top" />
              </th>
              <th className="text-right py-3 px-4 font-medium cursor-pointer hover:bg-muted/80" onClick={() => handleSort('dividend_withholding')}>
                Dividend WHT <SortIcon col="dividend_withholding" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(([code, data]) => {
              const isCompared = compareList.includes(code)
              return (
                <tr
                  key={code}
                  className={`border-t cursor-pointer transition-colors hover:bg-muted/30 ${isCompared ? 'bg-primary/10' : ''}`}
                  onClick={() => toggleCompare(code)}
                >
                  <td className="py-3 px-4 font-medium">
                    <div className="flex items-center gap-2">
                      {data.name}
                      {isCompared && <Badge className="text-xs">Comparing</Badge>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                    <Badge variant="outline" className="text-xs">{data.region}</Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={data.corporate <= 12.5 ? 'text-green-600 font-medium' : data.corporate >= 30 ? 'text-red-500 font-medium' : ''}>
                      {data.corporate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">{data.income_top}%</td>
                  <td className="py-3 px-4 text-right">
                    <span className={data.dividend_withholding === 0 ? 'text-green-600 font-medium' : ''}>
                      {data.dividend_withholding}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        Data updated March 2026. Rates shown are standard rates. Consult a tax professional for your specific situation.
      </p>
    </div>
  )
}
