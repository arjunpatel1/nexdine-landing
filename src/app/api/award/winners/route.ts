import { NextResponse } from 'next/server'
import { addWinner, getWinners } from '@/lib/award-db'

export async function GET() {
  const winners = await getWinners()
  return NextResponse.json(winners)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body?.restaurant_id || !body?.category_id || !body?.created_at) {
    return NextResponse.json({ error: 'Missing winner fields' }, { status: 400 })
  }

  const winner = await addWinner({
    restaurant_id: Number(body.restaurant_id),
    restaurant_name: String(body.restaurant_name || ''),
    owner_name: String(body.owner_name || ''),
    location: String(body.location || ''),
    category_id: Number(body.category_id),
    category_name: String(body.category_name || ''),
    created_at: String(body.created_at),
  })

  return NextResponse.json(winner, { status: 201 })
}
