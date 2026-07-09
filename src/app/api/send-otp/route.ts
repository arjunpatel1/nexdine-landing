import { NextResponse } from 'next/server'
import { generateOTP, sendWhatsAppOTP } from '@/lib/whatsapp-otp'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { mobile } = body

    if (!mobile || mobile.length !== 10) {
      return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 })
    }

    const otp = generateOTP()
    const result = await sendWhatsAppOTP(mobile, otp)

    // Save to database regardless of WhatsApp success in demo environments, 
    // but typically we'd only save if result.success is true.
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 5 * 60000) // 5 minutes expiry

    await prisma.otp_verifications.create({
      data: {
        mobile,
        otp, // In production, consider hashing the OTP before storing: bcrypt.hashSync(otp, 10)
        is_verified: false,
        expires_at: expiresAt,
        created_at: now,
        updated_at: now
      }
    })

    if (!result.success) {
      console.error('[send-otp API] WhatsApp sending failed:', result.error)
      return NextResponse.json({ 
        success: false, 
        error: result.error
      }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in send-otp API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
