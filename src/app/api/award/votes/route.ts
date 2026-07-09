import { NextResponse } from 'next/server'
import { addVote, getVotes, hasVotedForCategory, hasVotedForAnyCategory } from '@/lib/award-db'
import { sendVoteConfirmation } from '@/lib/whatsapp-otp'

export async function GET() {
  const votes = await getVotes()
  return NextResponse.json(votes)
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body?.restaurant_id || !body?.restaurant_name || !body?.category_id || !body?.category_name || !body?.created_at) {
    return NextResponse.json({ error: 'Missing vote fields' }, { status: 400 })
  }

  const mobile = body.user?.mobile
  const categoryId = Number(body.category_id)
  const categoryName = String(body.category_name)
  const restaurantName = String(body.restaurant_name)

  // Check if this mobile number has already voted for any category
  if (mobile) {
    const existingVoteForCategory = await hasVotedForCategory(mobile, categoryId)
    if (existingVoteForCategory) {
      return new Response(
        `This number already used for ${categoryName} category for ${existingVoteForCategory.restaurant_name} so try to vote with another number.`,
        { status: 400 }
      )
    }

    const existingVoteForAnyCategory = await hasVotedForAnyCategory(mobile)
    if (existingVoteForAnyCategory) {
      return new Response(
        `This number already used for another category for ${existingVoteForAnyCategory.restaurant_name} so try to vote with another number.`,
        { status: 400 }
      )
    }
  }

  const vote = await addVote({
    user: body.user ? { name: String(body.user.name || ''), mobile: String(body.user.mobile || '') } : undefined,
    restaurant_id: Number(body.restaurant_id),
    restaurant_name: restaurantName,
    category_id: categoryId,
    category_name: categoryName,
    created_at: String(body.created_at),
  })

  if (vote && body.user?.mobile && body.user?.name) {
    sendVoteConfirmation(String(body.user.mobile), String(body.user.name), restaurantName).catch(console.error)
  }

  return NextResponse.json(vote, { status: 201 })
}
