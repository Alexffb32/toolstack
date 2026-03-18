'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Zap, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const tools = [
  { name: 'Invoice Generator', href: '/invoice-generator', free: true },
  { name: 'Meeting Planner', href: '/meeting-time-planner', free: true },
  { name: 'VAT Calculator', href: '/vat-calculator', free: true },
  { name: 'Currency Converter', href: '/currency-converter', free: true },
  { name: 'Tax Rates', href: '/tax-rates', free: true },
  { name: 'Time Converter', href: '/time-converter', free: true },
  { name: 'Privacy Policy', href: '/privacy-policy-generator', free: false },
  { name: 'Terms Generator', href: '/terms-generator', free: false },
  { name: 'Contract Generator', href: '/contract-generator', free: false },
]

export function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [plan, setPlan] = useState<string>('free')
  const [mobileOpen, setMobileOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        supabase.from('users').select('plan').eq('id', session.user.id).single()
          .then(({ data }) => { if (data) setPlan(data.plan) })
      }
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[oklch(0.95_0_0)]/80 backdrop-blur-xl border-b border-black/6">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <span className="text-white font-black text-xs tracking-tight">TS</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-black">ToolStack</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-black/60 hover:text-black hover:bg-black/5 transition-all font-medium">
              Tools <ChevronDown className="h-3.5 w-3.5 opacity-50" />
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="w-68 rounded-2xl border border-black/8 bg-white p-2 shadow-xl shadow-black/8">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black/30">Free</p>
                {tools.filter(t => t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <div className="my-1.5 border-t border-black/6" />
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black/30">Pro</p>
                {tools.filter(t => !t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors">
                    {tool.name}
                    <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full">Pro</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-all">
            Pricing
          </Link>
          <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-all">
            Blog
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {plan !== 'free' && (
                <span className="hidden md:flex items-center gap-1 text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full">
                  <Zap className="h-3 w-3" />{plan.charAt(0).toUpperCase() + plan.slice(1)}
                </span>
              )}
              <Link href="/dashboard" className="hidden md:block">
                <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-all">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </button>
              </Link>
              <button onClick={handleSignOut} className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-all">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block rounded-lg px-3 py-2 text-sm font-medium text-black/60 hover:text-black hover:bg-black/5 transition-all">
                Sign in
              </Link>
              <Link href="/pricing">
                <button className="flex items-center gap-1.5 bg-black text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-black/85 transition-colors">
                  Get Started ↗
                </button>
              </Link>
            </>
          )}

          {/* Mobile */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <button className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg hover:bg-black/6 transition-colors">
                <Menu className="h-5 w-5 text-black/70" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white border-black/8">
              <div className="flex flex-col gap-1 pt-8">
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-black/30">Free Tools</p>
                {tools.filter(t => t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <p className="px-3 mt-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-black/30">Pro Tools</p>
                {tools.filter(t => !t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-black/70 hover:bg-black/5 hover:text-black transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <div className="mt-6 border-t border-black/8 pt-4 flex flex-col gap-2">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    <button className="w-full bg-black text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-black/85 transition-colors">
                      Get Started ↗
                    </button>
                  </Link>
                  {user ? (
                    <button onClick={handleSignOut} className="w-full text-sm text-black/50 py-2">Sign out</button>
                  ) : (
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <button className="w-full text-sm text-black/50 py-2">Sign in</button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
