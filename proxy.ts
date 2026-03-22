import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const AUTH_REQUIRED = ['/dashboard', '/admin']

// Pro-only tool routes
const PRO_TOOL_ROUTES = [
  '/contract-generator',
  '/privacy-policy-generator',
  '/terms-generator',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next()

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Redirect unauthenticated users away from protected routes
  const needsAuth = AUTH_REQUIRED.some(route => pathname.startsWith(route))
  if (needsAuth && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // For pro tool routes: redirect to login if not authenticated
  const isProRoute = PRO_TOOL_ROUTES.some(route => pathname.startsWith(route))
  if (isProRoute && !session) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/contract-generator/:path*',
    '/privacy-policy-generator/:path*',
    '/terms-generator/:path*',
  ],
}
