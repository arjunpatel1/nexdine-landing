import { NextResponse } from 'next/server'
import { getStats } from '@/lib/award-db'

export async function GET() {
  const stats = await getStats()
  return NextResponse.json(stats)
}
