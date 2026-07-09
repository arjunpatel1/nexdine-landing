import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (but NOT /admin/login itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin_session')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      const secret = process.env.SESSION_SECRET
      if (!secret) throw new Error('SESSION_SECRET not set')
      const secretKey = new TextEncoder().encode(secret)
      await jwtVerify(token, secretKey)
      return NextResponse.next()
    } catch {
      // Token invalid or expired
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.set('admin_session', '', { maxAge: 0, path: '/' })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
