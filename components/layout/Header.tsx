'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Wrench, Zap, LogOut, User, LayoutDashboard } from 'lucide-react'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const tools = [
  { name: 'Invoice Generator', href: '/invoice-generator', free: true },
  { name: 'Meeting Planner', href: '/meeting-time-planner', free: true },
  { name: 'VAT Calculator', href: '/vat-calculator', free: true },
  { name: 'Currency Converter', href: '/currency-converter', free: true },
  { name: 'Tax Rates', href: '/tax-rates', free: true },
  { name: 'Sleep Calculator', href: '/sleep-calculator', free: true },
  { name: 'Privacy Policy', href: '/privacy-policy-generator', free: false },
  { name: 'Terms Generator', href: '/terms-generator', free: false },
  { name: 'Contract Generator', href: '/contract-generator', free: false },
  { name: 'Business Names', href: '/business-name-generator', free: false },
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
          .then(({ data }) => {
            if (data) setPlan(data.plan)
          })
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">ToolStack</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </button>
            <div className="absolute left-0 top-full mt-2 hidden w-64 rounded-lg border bg-popover p-2 shadow-lg group-hover:block">
              {tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  <span>{tool.name}</span>
                  {!tool.free && (
                    <Badge variant="secondary" className="text-xs">Pro</Badge>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {plan !== 'free' && (
                <Badge className="hidden md:flex" variant="default">
                  <Zap className="mr-1 h-3 w-3" />
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Badge>
              )}
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="hidden md:flex">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden md:block">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm">
                  <Zap className="mr-2 h-4 w-4" />
                  Go Pro
                </Button>
              </Link>
            </>
          )}

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-4 pt-6">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Free Tools</p>
                {tools.filter(t => t.free).map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-2">Pro Tools</p>
                {tools.filter(t => !t.free).map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col gap-2">
                  <Link href="/pricing" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">Go Pro — €9/mo</Button>
                  </Link>
                  {user ? (
                    <Button variant="ghost" onClick={handleSignOut} className="w-full">Sign out</Button>
                  ) : (
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="ghost" className="w-full">Sign in</Button>
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
