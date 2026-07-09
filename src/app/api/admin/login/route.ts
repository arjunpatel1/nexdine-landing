import { NextResponse } from 'next/server'
import { SignJWT } from 'jose'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { mobile, password } = body

    if (!mobile || !password) {
      return NextResponse.json({ error: 'Mobile and password are required.' }, { status: 400 })
    }

    const adminMobile = process.env.ADMIN_MOBILE
    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionSecret = process.env.SESSION_SECRET

    if (!adminMobile || !adminPassword || !sessionSecret) {
      console.error('[Admin Login] Missing ADMIN_MOBILE, ADMIN_PASSWORD, or SESSION_SECRET in .env')
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    // Validate credentials
    if (mobile !== adminMobile || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid mobile number or password.' }, { status: 401 })
    }

    // Sign a JWT session token valid for 8 hours using jose
    const secretKey = new TextEncoder().encode(sessionSecret)
    const token = await new SignJWT({ role: 'admin', mobile })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secretKey)

    // Set the token as an HttpOnly cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('[Admin Login] Error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
