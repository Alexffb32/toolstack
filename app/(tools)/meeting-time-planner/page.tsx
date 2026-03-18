import type { Metadata } from 'next'
import { Clock } from 'lucide-react'
import { MeetingPlanner } from '@/components/tools/MeetingPlanner'
import { ToolPageHero } from '@/components/tools/ToolPageHero'

export const metadata: Metadata = {
  title: 'Meeting Time Planner — Find Best Meeting Time Across Timezones',
  description: 'Visual timezone ruler to find the perfect meeting time for distributed teams. Highlights business hours, shareable links, copy to clipboard.',
  alternates: { canonical: 'https://toolstack.io/meeting-time-planner' },
}

export default function MeetingTimePlannerPage() {
  return (
    <div>
      <ToolPageHero
        title="Meeting Time Planner"
        description="Find the perfect meeting time for your distributed team with a visual timezone ruler."
        badge="Free"
        icon={Clock}
      />
      <MeetingPlanner />
      <div className="mt-12 prose prose-sm max-w-none dark:prose-invert">
        <h2>How to use the Meeting Time Planner</h2>
        <p>Add up to 10 timezones using the dropdown. Click on any hour in the timeline to select a meeting time — green cells indicate business hours (9am–6pm local time), red cells indicate outside business hours. The overlap quality bar at the bottom shows the best times when most participants are in business hours.</p>
      </div>
    </div>
  )
}
