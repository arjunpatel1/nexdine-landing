import { NextResponse } from 'next/server'
import { deleteWinner } from '@/lib/award-db'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const deleted = await deleteWinner(id)

  if (!deleted) {
    return NextResponse.json({ error: 'Winner not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
