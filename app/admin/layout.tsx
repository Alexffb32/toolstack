export const dynamic = 'force-dynamic'

import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/Header'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  // Check admin email
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail || session.user.email !== adminEmail) {
    redirect('/')
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  )
}
