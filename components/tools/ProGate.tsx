'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap } from 'lucide-react'

interface ProGateContextValue {
  isPro: boolean
  isLoading: boolean
  requirePro: () => boolean
}

const ProGateContext = createContext<ProGateContextValue>({
  isPro: false,
  isLoading: true,
  requirePro: () => false,
})

export function useProGate() {
  return useContext(ProGateContext)
}

interface ProGateProps {
  children: ReactNode
  toolName: string
}

const proFeatures = [
  'Generate unlimited AI documents',
  'Privacy policies, ToS & contracts',
  'Business name ideas with taglines',
  'Save documents to dashboard',
  'No ads — ever',
  'PDF export without watermark',
]

export function ProGate({ children, toolName }: ProGateProps) {
  const [isPro, setIsPro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setIsLoading(false)
        return
      }
      const { data } = await supabase
        .from('users')
        .select('plan')
        .eq('id', session.user.id)
        .single()
      setIsPro(data?.plan === 'pro' || data?.plan === 'business')
      setIsLoading(false)
    })
  }, [])

  const requirePro = useCallback((): boolean => {
    if (isPro) return true
    setShowPaywall(true)
    return false
  }, [isPro])

  const handleCheckout = async (interval: 'monthly' | 'yearly') => {
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro', interval }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <ProGateContext.Provider value={{ isPro, isLoading, requirePro }}>
      {children}

      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Unlock {toolName}
            </DialogTitle>
            <DialogDescription>
              This AI-powered tool requires a Pro plan. Fill in the form first — then upgrade to generate.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <ul className="space-y-2">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold">€9</div>
                <div className="text-xs text-muted-foreground">per month</div>
                <Button
                  className="mt-2 w-full"
                  size="sm"
                  onClick={() => handleCheckout('monthly')}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Loading…' : 'Go Monthly'}
                </Button>
              </div>
              <div className="rounded-lg border border-primary p-3 text-center relative">
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">Best value</Badge>
                <div className="text-2xl font-bold">€79</div>
                <div className="text-xs text-muted-foreground">per year</div>
                <Button
                  className="mt-2 w-full"
                  size="sm"
                  onClick={() => handleCheckout('yearly')}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? 'Loading…' : 'Go Yearly'}
                </Button>
              </div>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Cancel anytime · Secure payment via Stripe
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </ProGateContext.Provider>
  )
}
