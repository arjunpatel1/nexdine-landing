import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { mobile, otp } = body

    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile number and OTP are required' }, { status: 400 })
    }

    // Find the latest unverified OTP for this mobile
    const verificationRecord = await prisma.otp_verifications.findFirst({
      where: {
        mobile,
        is_verified: false,
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    if (!verificationRecord) {
      return NextResponse.json({ success: false, error: 'No active OTP found. Please request a new one.' }, { status: 400 })
    }

    // Check expiration
    if (new Date() > verificationRecord.expires_at) {
      return NextResponse.json({ success: false, error: 'OTP has expired. Please request a new one.' }, { status: 400 })
    }

    // Verify OTP
    if (verificationRecord.otp !== otp) {
      return NextResponse.json({ success: false, error: 'Invalid OTP' }, { status: 400 })
    }

    // Mark as verified
    await prisma.otp_verifications.update({
      where: { id: verificationRecord.id },
      data: { 
        is_verified: true,
        updated_at: new Date()
      }
    })

    return NextResponse.json({ success: true, message: 'OTP verified successfully' })
  } catch (error) {
    console.error('Error in verify-otp API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
