import { NextResponse } from 'next/server'
import { addCategory, getCategories } from '@/lib/award-db'

export async function GET() {
  const categories = await getCategories()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body?.name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const category = await addCategory({
    name: String(body.name).trim(),
    status: body.status === 'inactive' ? 'inactive' : 'active',
  })

  return NextResponse.json(category, { status: 201 })
}
