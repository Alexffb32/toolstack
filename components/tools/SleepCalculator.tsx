'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Moon, Sun, Clock } from 'lucide-react'

const CYCLE_MINUTES = 90
const FALL_ASLEEP_MINUTES = 14

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + minutes
  const newH = Math.floor(total / 60) % 24
  const newM = total % 60
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
}

function subtractMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number)
  const total = ((h * 60 + m - minutes) % (24 * 60) + 24 * 60) % (24 * 60)
  const newH = Math.floor(total / 60)
  const newM = total % 60
  return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h < 12 ? 'AM' : 'PM'
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${displayH}:${String(m).padStart(2, '0')} ${period}`
}

const CYCLES = [5, 6] // recommended cycles
const ALL_CYCLES = [4, 5, 6, 7]

const chronotypeQuestions = [
  {
    q: 'If you could freely choose, what time would you wake up?',
    options: ['Before 6 AM', '6-7 AM', '7-8 AM', '8-9 AM', 'After 9 AM'],
    scores: [0, 1, 2, 3, 4],
  },
  {
    q: 'When do you feel most alert and productive?',
    options: ['Early morning (5-8 AM)', 'Morning (8-10 AM)', 'Midday (10 AM-2 PM)', 'Afternoon (2-5 PM)', 'Evening (5 PM+)'],
    scores: [0, 1, 2, 3, 4],
  },
  {
    q: 'If you need to take a 2-hour exam requiring max concentration, when would you prefer it?',
    options: ['8 AM', '10 AM', '1 PM', '3 PM', '7 PM'],
    scores: [0, 1, 2, 3, 4],
  },
  {
    q: 'How do you feel during the first 30 min after waking at your usual time?',
    options: ['Very alert', 'Fairly alert', 'Somewhat groggy', 'Quite groggy', 'Very groggy'],
    scores: [0, 1, 2, 3, 4],
  },
  {
    q: 'If you had to go to bed at 11 PM but were not tired, what would happen?',
    options: ['Sleep easily', 'Fall asleep with some effort', 'Hard to fall asleep', 'Very hard', 'Impossible'],
    scores: [0, 1, 2, 3, 4],
  },
]

function getChronotype(score: number): { type: string; description: string; badge: string } {
  if (score <= 5) return { type: 'Morning Lark', description: 'You\'re a true early bird. Your peak performance is in the morning. Go to bed early, wake up early.', badge: 'bg-yellow-500' }
  if (score <= 10) return { type: 'Moderate Morning Type', description: 'You lean toward mornings but have some flexibility. Peak productivity is typically before noon.', badge: 'bg-orange-400' }
  if (score <= 14) return { type: 'Intermediate Type', description: 'You\'re in the middle — neither a strong morning nor evening person. You have the most scheduling flexibility.', badge: 'bg-blue-500' }
  if (score <= 18) return { type: 'Moderate Evening Type', description: 'You lean toward evenings. Your best work happens in the afternoon and evening. Don\'t force early starts.', badge: 'bg-indigo-500' }
  return { type: 'Night Owl', description: 'You\'re a classic night owl. Peak performance comes late in the day. Early mornings are brutal for you.', badge: 'bg-purple-600' }
}

export function SleepCalculator() {
  const [wakeTime, setWakeTime] = useState('07:00')
  const [bedTime, setBedTime] = useState('23:00')
  const [answers, setAnswers] = useState<number[]>(new Array(chronotypeQuestions.length).fill(-1))
  const [showChronotype, setShowChronotype] = useState(false)

  const bedtimeSuggestions = ALL_CYCLES.map(cycles => ({
    cycles,
    time: subtractMinutes(wakeTime, cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES),
    hours: (cycles * CYCLE_MINUTES) / 60,
    recommended: CYCLES.includes(cycles),
  }))

  const waketimeSuggestions = ALL_CYCLES.map(cycles => ({
    cycles,
    time: addMinutes(bedTime, cycles * CYCLE_MINUTES + FALL_ASLEEP_MINUTES),
    hours: (cycles * CYCLE_MINUTES) / 60,
    recommended: CYCLES.includes(cycles),
  }))

  const chronotypeScore = answers.reduce((sum, a) => sum + (a >= 0 ? a : 0), 0)
  const allAnswered = answers.every(a => a >= 0)
  const chronotype = getChronotype(chronotypeScore)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="wake">
        <TabsList>
          <TabsTrigger value="wake">
            <Sun className="mr-2 h-4 w-4" /> I want to wake up at…
          </TabsTrigger>
          <TabsTrigger value="sleep">
            <Moon className="mr-2 h-4 w-4" /> I&apos;m going to bed at…
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wake" className="space-y-4 mt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="wake-time">Wake-up time</Label>
            <Input id="wake-time" type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)} className="w-36" />
          </div>
          <p className="text-sm text-muted-foreground">
            Based on 90-min sleep cycles + ~14 min to fall asleep. You should go to bed at:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bedtimeSuggestions.map(({ cycles, time, hours, recommended }) => (
              <Card key={cycles} className={`${recommended ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{formatTime(time)}</div>
                  <div className="text-sm text-muted-foreground mt-1">{cycles} cycles · {hours}h</div>
                  {recommended && <Badge className="mt-2 text-xs">Recommended</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-4 mt-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="bed-time">Bedtime</Label>
            <Input id="bed-time" type="time" value={bedTime} onChange={e => setBedTime(e.target.value)} className="w-36" />
          </div>
          <p className="text-sm text-muted-foreground">
            If you fall asleep around {formatTime(bedTime)}, you should wake up at:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {waketimeSuggestions.map(({ cycles, time, hours, recommended }) => (
              <Card key={cycles} className={`${recommended ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">{formatTime(time)}</div>
                  <div className="text-sm text-muted-foreground mt-1">{cycles} cycles · {hours}h</div>
                  {recommended && <Badge className="mt-2 text-xs">Recommended</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 rounded-lg bg-muted/50 text-sm flex gap-2">
        <Clock className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
        <p className="text-muted-foreground">
          Sleep is divided into 90-minute cycles. Waking between cycles (not in the middle of deep sleep) leaves you feeling more refreshed. The calculator adds 14 minutes for average sleep onset time.
        </p>
      </div>

      {/* Chronotype quiz */}
      <div>
        <Button variant="outline" onClick={() => setShowChronotype(!showChronotype)}>
          {showChronotype ? 'Hide' : 'Discover'} Your Chronotype (Morning Lark vs Night Owl)
        </Button>

        {showChronotype && (
          <div className="mt-4 space-y-4">
            {chronotypeQuestions.map((q, qi) => (
              <div key={qi} className="space-y-2">
                <p className="text-sm font-medium">{qi + 1}. {q.q}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => setAnswers(prev => { const a = [...prev]; a[qi] = q.scores[oi]; return a })}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${answers[qi] === q.scores[oi] ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted border-border'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {allAnswered && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${chronotype.badge}`} />
                    You are a {chronotype.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{chronotype.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
