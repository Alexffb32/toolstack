'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
        supabase
          .from('users')
          .select('plan')
          .eq('id', session.user.id)
          .single()
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
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-[oklch(0.09_0_0)]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <span className="text-black font-black text-sm tracking-tight">TS</span>
          </div>
          <span className="text-base font-bold tracking-tight text-white">ToolStack</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Tools dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Tools <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="w-72 rounded-xl border border-white/10 bg-[oklch(0.13_0_0)] p-2 shadow-2xl">
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">Free</p>
                {tools.filter(t => t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <div className="my-2 border-t border-white/8" />
                <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/30">Pro</p>
                {tools.filter(t => !t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors">
                    {tool.name}
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white/60 border-0">Pro</Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/pricing" className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Pricing
          </Link>
          <Link href="/blog" className="rounded-lg px-3 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all">
            Blog
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {plan !== 'free' && (
                <Badge className="hidden md:flex bg-white text-black border-0 text-xs font-semibold">
                  <Zap className="mr-1 h-3 w-3" />
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Badge>
              )}
              <Link href="/dashboard" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/8">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden md:flex text-white/60 hover:text-white hover:bg-white/8">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/8">Sign in</Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm" className="bg-white text-black hover:bg-white/90 font-semibold">
                  Get Pro
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="md:hidden text-white/60 hover:text-white hover:bg-white/8">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-[oklch(0.11_0_0)] border-white/8">
              <div className="flex flex-col gap-1 pt-8">
                <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">Free Tools</p>
                {tools.filter(t => t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <p className="px-3 mt-4 mb-2 text-xs font-semibold uppercase tracking-wider text-white/30">Pro Tools</p>
                {tools.filter(t => !t.free).map((tool) => (
                  <Link key={tool.href} href={tool.href} onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/8 hover:text-white transition-colors">
                    {tool.name}
                  </Link>
                ))}
                <div className="mt-6 border-t border-white/8 pt-4 flex flex-col gap-2">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-white text-black hover:bg-white/90 font-semibold">Get Pro</Button>
                  </Link>
                  {user ? (
                    <Button variant="ghost" onClick={handleSignOut} className="w-full text-white/60">Sign out</Button>
                  ) : (
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full text-white/60">Sign in</Button>
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
