import { NextResponse } from 'next/server'
import { updateRestaurant } from '@/lib/award-db'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await request.json()

  const updates: any = {}
  if (body.restaurant_name !== undefined) updates.restaurant_name = String(body.restaurant_name).trim()
  if (body.owner_name !== undefined) updates.owner_name = String(body.owner_name).trim()
  if (body.mobile !== undefined) updates.mobile = String(body.mobile).trim()
  if (body.location !== undefined) updates.location = String(body.location).trim()
  if (body.address !== undefined) updates.address = String(body.address).trim()
  if (body.status === 'approved' || body.status === 'pending' || body.status === 'rejected') updates.status = body.status
  if (Array.isArray(body.categories)) updates.categories = body.categories
  if (body.description !== undefined) updates.description = String(body.description).trim()
  if (body.logo !== undefined) updates.logo = body.logo
  if (body.user !== undefined) updates.user = { mobile: String(body.user.mobile ?? '') }

  const restaurant = await updateRestaurant(id, updates)

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
  }

  return NextResponse.json(restaurant)
}
