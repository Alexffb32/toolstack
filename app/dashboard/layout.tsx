import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ToolsBar } from '@/components/layout/ToolsBar'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ToolsBar />
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
