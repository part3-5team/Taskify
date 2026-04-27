import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRIVATE_ROUTES = ['/dashboard', '/mydashboard']
const AUTH_ROUTES = ['/', '/login', '/signup']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('accessToken')?.value

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route),
  )
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/mydashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/mydashboard/:path*',
    '/login',
    '/signup',
  ],
}
