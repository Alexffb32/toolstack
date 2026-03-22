import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_REQUIRED = ['/dashboard', '/admin']
const PRO_TOOL_ROUTES = [
  '/contract-generator',
  '/privacy-policy-generator',
  '/terms-generator',
]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Must create response first so we can forward cookies
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Write to both request (so supabase client sees them) and response (so browser gets them)
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: request.headers } })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: always call getUser() not getSession() in proxy
  // getSession() reads only from cookie, getUser() validates with server
  const { data: { user } } = await supabase.auth.getUser()

  const needsAuth = AUTH_REQUIRED.some(route => pathname.startsWith(route))
  const isProRoute = PRO_TOOL_ROUTES.some(route => pathname.startsWith(route))

  if ((needsAuth || isProRoute) && !user) {
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
