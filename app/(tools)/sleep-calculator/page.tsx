import type { Metadata } from 'next'
import { SleepCalculator } from '@/components/tools/SleepCalculator'

export const metadata: Metadata = {
  title: 'Sleep Calculator — Optimal Bedtime & Wake-Up Times',
  description: 'Calculate ideal sleep and wake times based on 90-minute sleep cycles. Includes chronotype quiz to discover if you\'re a morning lark or night owl.',
  alternates: { canonical: 'https://toolstack.io/sleep-calculator' },
}

export default function SleepCalculatorPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sleep Calculator</h1>
        <p className="text-muted-foreground">Find your ideal bedtime or wake-up time based on 90-minute sleep cycles.</p>
      </div>
      <SleepCalculator />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>How Sleep Cycles Work</h2>
        <p>Sleep consists of repeating 90-minute cycles. Each cycle includes light sleep, deep sleep (slow-wave), and REM sleep. Waking up at the end of a cycle — rather than in the middle of deep sleep — leaves you feeling refreshed. The average person takes about 14 minutes to fall asleep, which this calculator accounts for automatically.</p>
      </div>
    </div>
  )
}
