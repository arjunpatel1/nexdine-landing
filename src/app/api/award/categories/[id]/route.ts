import { NextResponse } from 'next/server'
import { deleteCategory, updateCategory } from '@/lib/award-db'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const body = await request.json()
  const updates: any = {}
  if (body.name !== undefined) updates.name = String(body.name).trim()
  if (body.status === 'inactive' || body.status === 'active') updates.status = body.status
  const category = await updateCategory(id, updates)

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  return NextResponse.json(category)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const deleted = await deleteCategory(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
