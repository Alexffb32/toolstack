'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Wrench, Chrome } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">ToolStack</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Sign in to ToolStack</CardTitle>
            <CardDescription>Save documents, manage your subscription, and access Pro tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome className="mr-2 h-5 w-5" />
              {loading ? 'Signing in…' : 'Continue with Google'}
            </Button>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <p className="text-xs text-center text-muted-foreground">
              By signing in you agree to our{' '}
              <Link href="/terms-generator" className="underline hover:text-foreground">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy-policy-generator" className="underline hover:text-foreground">Privacy Policy</Link>.
            </p>

            <div className="border-t pt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t need an account?{' '}
                <Link href="/" className="text-primary hover:underline">Use free tools →</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
