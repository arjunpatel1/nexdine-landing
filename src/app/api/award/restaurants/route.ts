import { NextResponse } from 'next/server'
import { addRestaurant, getRestaurants } from '@/lib/award-db'

export async function GET() {
  const restaurants = await getRestaurants()
  return NextResponse.json(restaurants)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body?.restaurant_name || !body?.owner_name || !body?.mobile || !body?.location) {
    return NextResponse.json({ error: 'Missing restaurant fields' }, { status: 400 })
  }

  const restaurant = await addRestaurant({
    restaurant_name: String(body.restaurant_name).trim(),
    owner_name: String(body.owner_name).trim(),
    mobile: String(body.mobile).trim(),
    location: String(body.location).trim(),
    address: body.address ? String(body.address).trim() : undefined,
    status: body.status === 'approved' ? 'approved' : body.status === 'rejected' ? 'rejected' : 'pending',
    categories: Array.isArray(body.categories) ? body.categories : [],
    description: body.description ? String(body.description).trim() : '',
    logo: body.logo ?? null,
    user: body.user ? { mobile: String(body.user.mobile ?? '') } : undefined,
  })

  return NextResponse.json(restaurant, { status: 201 })
}
