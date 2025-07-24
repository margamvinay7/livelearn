import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const hasToken = request.cookies.has('accessToken')
console.log("in middleware",path,hasToken)
  const isPublicPath =
    path === '/signin' || path === '/signup' || path === '/home'
  const isProtectedPath =
    path.startsWith('/admin') ||
    path.startsWith('/instructor') ||
    path.startsWith('/learner') ||
    path.startsWith('/dashboard')

  // If the user has a token and tries to access a public-only path,
  // redirect them to the central dashboard page.
  if (hasToken && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If the user does not have a token and tries to access a protected path,
  // redirect them to the sign-in page.
  if (!hasToken && isProtectedPath) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Otherwise, allow the request to proceed.
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/home',
    '/signin',
    '/signup',
    '/admin/:path*',
    '/instructor/:path*',
    '/learner/:path*',
    '/dashboard/:path*',
  ],
} 