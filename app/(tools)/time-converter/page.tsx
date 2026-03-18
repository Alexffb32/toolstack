import type { Metadata } from 'next'
import { Timer } from 'lucide-react'
import { TimeConverter } from '@/components/tools/TimeConverter'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Time Converter — Seconds, Minutes, Hours, Days, Weeks, Months, Years',
  description: 'Convert between seconds, minutes, hours, days, weeks, months and years instantly. Free online time unit converter.',
  alternates: { canonical: 'https://toolstack.io/time-converter' },
}

export default function TimeConverterPage() {
  return (
    <div>
      <ToolPageHero
        title="Time Converter"
        description="Convert between any time units — seconds, minutes, hours, days, weeks, months, and years."
        badge="Free"
        icon={Timer}
      />
      <TimeConverter />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>How time units relate</h2>
        <p>1 minute = 60 seconds · 1 hour = 60 minutes · 1 day = 24 hours · 1 week = 7 days · 1 month ≈ 30.44 days (average) · 1 year ≈ 365.25 days (including leap years).</p>
      </div>
    </div>
  )
}
