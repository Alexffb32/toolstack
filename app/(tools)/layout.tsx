import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AdBanner } from '@/components/layout/AdBanner'

export const dynamic = 'force-dynamic'

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AdBanner slot="1234567890" />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>
      <AdBanner slot="0987654321" />
      <Footer />
    </div>
  )
}
