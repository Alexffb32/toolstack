'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

const B = '#155EEF'
const DARK = '#0D1117'
const MUTED = '#6B7280'
const LIGHT = '#F0F4FF'
const BORDER = '#E5EAF5'

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setEmailLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setEmailSent(true)
    }
    setEmailLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, white 0%, ${LIGHT} 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', left: '50%', top: '30%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(21,94,239,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: B,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(21,94,239,0.30)',
              fontSize: 22, fontWeight: 900, color: 'white',
              letterSpacing: '-1px',
            }}>
              TS
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: DARK, letterSpacing: '-0.4px' }}>ToolStack</span>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: 20,
          border: `1px solid ${BORDER}`,
          padding: '36px 32px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: DARK, margin: '0 0 6px', textAlign: 'center', letterSpacing: '-0.3px' }}>
            Sign in to ToolStack
          </h1>
          <p style={{ fontSize: 14, color: MUTED, margin: '0 0 28px', textAlign: 'center', lineHeight: 1.5 }}>
            Save documents, manage your subscription, and access Pro tools
          </p>

          {emailSent ? (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '16px', textAlign: 'center' }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#065F46', margin: '0 0 6px' }}>Check your email!</p>
              <p style={{ fontSize: 13, color: '#047857', margin: 0 }}>
                We sent a magic link to <strong>{email}</strong>. Click it to sign in.
              </p>
            </div>
          ) : (
            <>
              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '12px 20px',
                  borderRadius: 10,
                  background: loading ? LIGHT : 'white',
                  border: `1.5px solid ${loading ? BORDER : '#D1D5DB'}`,
                  fontSize: 15,
                  fontWeight: 600,
                  color: loading ? MUTED : DARK,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!loading) {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.borderColor = B
                    el.style.boxShadow = `0 0 0 3px rgba(21,94,239,0.10)`
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = '#D1D5DB'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Google G icon */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                {loading ? 'Signing in…' : 'Continue with Google'}
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' }}>
                <div style={{ flex: 1, height: 1, background: BORDER }} />
                <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>or continue with email</span>
                <div style={{ flex: 1, height: 1, background: BORDER }} />
              </div>

              {/* Email magic link */}
              <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
                    border: `1.5px solid ${BORDER}`, outline: 'none', color: DARK,
                    background: 'white', boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = B }}
                  onBlur={e => { e.currentTarget.style.borderColor = BORDER }}
                />
                <button
                  type="submit"
                  disabled={emailLoading}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 10, fontSize: 14,
                    fontWeight: 600, cursor: emailLoading ? 'not-allowed' : 'pointer',
                    background: emailLoading ? LIGHT : B, color: emailLoading ? MUTED : 'white',
                    border: 'none',
                  }}
                >
                  {emailLoading ? 'Sending…' : 'Send Magic Link'}
                </button>
              </form>
            </>
          )}

          {error && (
            <p style={{ fontSize: 13, color: '#DC2626', textAlign: 'center', margin: '14px 0 0', padding: '10px 14px', background: '#FEF2F2', borderRadius: 8, border: '1px solid #FECACA' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: 12, color: MUTED, textAlign: 'center', margin: '20px 0 0', lineHeight: 1.6 }}>
            By signing in you agree to our{' '}
            <Link href="/terms" style={{ color: B, textDecoration: 'none', fontWeight: 500 }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: B, textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</Link>.
          </p>

          <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20, marginTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
              Don&apos;t need an account?{' '}
              <Link href="/" style={{ color: B, fontWeight: 600, textDecoration: 'none' }}>
                Use free tools →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
