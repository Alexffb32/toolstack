'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Plus, Trash2 } from 'lucide-react'
import timezonesData from '@/data/timezones.json'
import { Separator } from '@/components/ui/separator'

interface TimezoneEntry {
  id: string
  name: string
  offset: number
  cities: string[]
}

const timezones: TimezoneEntry[] = timezonesData

const HOURS = Array.from({ length: 24 }, (_, i) => i)

function getLocalTime(utcHour: number, offset: number): number {
  return ((utcHour + offset) % 24 + 24) % 24
}

function isBusinessHour(hour: number): boolean {
  return hour >= 9 && hour < 18
}

export function MeetingPlanner() {
  const [selectedZones, setSelectedZones] = useState<TimezoneEntry[]>([
    timezones.find(t => t.id === 'America/New_York')!,
    timezones.find(t => t.id === 'Europe/London')!,
  ])
  const [selectedUtcHour, setSelectedUtcHour] = useState<number>(14) // 2pm UTC
  const [addZone, setAddZone] = useState('')
  const [copied, setCopied] = useState(false)

  const addTimezone = (id: string) => {
    const tz = timezones.find(t => t.id === id)
    if (tz && !selectedZones.find(z => z.id === id)) {
      setSelectedZones(prev => [...prev, tz])
    }
    setAddZone('')
  }

  const removeZone = (id: string) => {
    setSelectedZones(prev => prev.filter(z => z.id !== id))
  }

  const formatHour = (h: number): string => {
    const period = h < 12 ? 'AM' : 'PM'
    const display = h === 0 ? 12 : h > 12 ? h - 12 : h
    return `${display}:00 ${period}`
  }

  const overlapScore = useMemo(() => {
    return HOURS.map(utcHour => {
      const localHours = selectedZones.map(z => getLocalTime(utcHour, z.offset))
      const goodCount = localHours.filter(h => isBusinessHour(h)).length
      return goodCount / selectedZones.length
    })
  }, [selectedZones])

  const copyText = () => {
    const lines = selectedZones.map(z => {
      const localHour = getLocalTime(selectedUtcHour, z.offset)
      return `${z.name}: ${formatHour(localHour)}`
    })
    const text = `Meeting Time:\n${lines.join('\n')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const availableToAdd = timezones.filter(t => !selectedZones.find(z => z.id === t.id))

  return (
    <div className="space-y-6">
      {/* Timezone selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={addZone} onValueChange={v => v && addTimezone(v)} disabled={selectedZones.length >= 10}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Add a timezone…" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {availableToAdd.map(tz => (
              <SelectItem key={tz.id} value={tz.id}>
                {tz.name} (UTC{tz.offset >= 0 ? '+' : ''}{tz.offset})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" disabled={selectedZones.length >= 10} onClick={() => {}}>
          <Plus className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">{selectedZones.length}/10 timezones</span>
      </div>

      {/* Active zones */}
      <div className="flex flex-wrap gap-2">
        {selectedZones.map(z => (
          <Badge key={z.id} variant="secondary" className="pl-3 pr-1 py-1 flex items-center gap-2">
            <span className="text-xs">{z.name}</span>
            <button onClick={() => removeZone(z.id)} className="hover:text-destructive" disabled={selectedZones.length <= 1}>
              <Trash2 className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Separator />

      {/* Timeline ruler */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] space-y-1">
          {/* Hour header */}
          <div className="grid grid-cols-24 gap-0 text-xs text-muted-foreground mb-2" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
            {HOURS.map(h => (
              <div key={h} className="text-center text-[10px]">{h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`}</div>
            ))}
          </div>

          {selectedZones.map(zone => (
            <div key={zone.id} className="flex items-center gap-2">
              <div className="w-40 text-xs text-muted-foreground truncate shrink-0">{zone.name}</div>
              <div className="flex-1 grid grid-cols-24 gap-0" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
                {HOURS.map(utcHour => {
                  const localHour = getLocalTime(utcHour, zone.offset)
                  const isSelected = utcHour === selectedUtcHour
                  const isBusiness = isBusinessHour(localHour)
                  return (
                    <button
                      key={utcHour}
                      onClick={() => setSelectedUtcHour(utcHour)}
                      className={[
                        'h-8 border-r border-background text-[9px] transition-colors relative',
                        isSelected ? 'bg-primary text-primary-foreground' :
                          isBusiness ? 'bg-green-500/20 hover:bg-green-500/40' : 'bg-red-500/10 hover:bg-red-500/20',
                      ].join(' ')}
                      title={`${zone.name}: ${formatHour(localHour)}`}
                    >
                      {isSelected && <span className="font-bold">{formatHour(localHour)}</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Overlap row */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-40 text-xs font-semibold shrink-0">Overlap Quality</div>
            <div className="flex-1 grid grid-cols-24 gap-0" style={{ gridTemplateColumns: 'repeat(24, 1fr)' }}>
              {overlapScore.map((score, h) => (
                <div
                  key={h}
                  className="h-3 border-r border-background"
                  style={{ backgroundColor: `hsl(${score * 120}, 60%, 50%, 0.7)` }}
                  title={`${Math.round(score * 100)}% overlap at UTC ${h}:00`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected time summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Selected Meeting Time (UTC {selectedUtcHour}:00)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {selectedZones.map(z => {
              const localHour = getLocalTime(selectedUtcHour, z.offset)
              const isBusiness = isBusinessHour(localHour)
              return (
                <div key={z.id} className={`rounded-lg p-3 border ${isBusiness ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                  <p className="text-xs text-muted-foreground truncate">{z.name}</p>
                  <p className="font-semibold">{formatHour(localHour)}</p>
                  <p className="text-xs text-muted-foreground">{z.cities[0]}</p>
                  <Badge variant={isBusiness ? 'default' : 'destructive'} className="text-xs mt-1">
                    {isBusiness ? 'Business hours' : 'Outside hours'}
                  </Badge>
                </div>
              )
            })}
          </div>
          <Button variant="outline" size="sm" onClick={copyText}>
            <Copy className="mr-2 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy to clipboard'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
