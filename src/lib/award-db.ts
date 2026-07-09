import { prisma } from './prisma'
import {
  AdminDashboardStats,
  AwardCategory,
  AwardRestaurant,
  AwardVote,
  AwardWinner,
} from './award-admin'

export async function getAwardData() {
  const [categories, restaurants, votes, winners] = await Promise.all([
    getCategories(),
    getRestaurants(),
    getVotes(),
    getWinners()
  ])
  return { categories, restaurants, votes, winners }
}

export async function getCategories(): Promise<AwardCategory[]> {
  const data = await prisma.categories.findMany()
  return data.map(c => ({
    id: Number(c.id),
    name: c.name,
    status: c.status === 'active' ? 'active' : 'inactive'
  }))
}

export async function addCategory(category: Omit<AwardCategory, 'id'>): Promise<AwardCategory> {
  const data = await prisma.categories.create({
    data: {
      name: category.name,
      slug: category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      status: category.status as any,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  return { id: Number(data.id), name: data.name, status: data.status === 'active' ? 'active' : 'inactive' }
}

export async function updateCategory(id: number, updates: Partial<Omit<AwardCategory, 'id'>>): Promise<AwardCategory | null> {
  const data = await prisma.categories.update({
    where: { id: BigInt(id) },
    data: {
      name: updates.name,
      status: updates.status as any,
      updated_at: new Date()
    }
  })
  return { id: Number(data.id), name: data.name, status: data.status === 'active' ? 'active' : 'inactive' }
}

export async function deleteCategory(id: number): Promise<boolean> {
  try {
    await prisma.categories.delete({ where: { id: BigInt(id) } })
    return true
  } catch {
    return false
  }
}

export async function getRestaurants(): Promise<AwardRestaurant[]> {
  const data = await prisma.restaurants.findMany({
    include: {
      users: true,
      restaurant_categories: {
        include: { categories: true }
      }
    }
  })
  
  return data.map(r => ({
    id: Number(r.id),
    restaurant_name: r.restaurant_name,
    owner_name: r.owner_name,
    mobile: r.users?.mobile || '',
    location: r.location,
    address: r.address || undefined,
    description: r.description,
    logo: r.logo || undefined,
    status: r.status as 'pending' | 'approved' | 'rejected',
    categories: r.restaurant_categories.map(rc => ({
      id: Number(rc.categories.id),
      name: rc.categories.name,
      status: rc.categories.status === 'active' ? 'active' : 'inactive'
    })),
    user: r.users ? { mobile: r.users.mobile } : undefined
  }))
}

export async function addRestaurant(restaurant: Omit<AwardRestaurant, 'id'>): Promise<AwardRestaurant> {
  let user = await prisma.users.findUnique({ where: { mobile: restaurant.mobile } })
  if (!user) {
    user = await prisma.users.create({
      data: {
        mobile: restaurant.mobile,
        name: restaurant.owner_name,
        role: 'owner',
        created_at: new Date(),
        updated_at: new Date()
      }
    })
  }

  const slug = restaurant.restaurant_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()

  const data = await prisma.restaurants.create({
    data: {
      restaurant_name: restaurant.restaurant_name,
      owner_name: restaurant.owner_name,
      location: restaurant.location,
      description: restaurant.description,
      address: restaurant.address,
      logo: restaurant.logo,
      status: restaurant.status as any,
      slug: slug,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
      restaurant_categories: {
        create: restaurant.categories.map(c => ({
          category_id: BigInt(c.id),
          created_at: new Date(),
          updated_at: new Date()
        }))
      }
    },
    include: {
      users: true,
      restaurant_categories: { include: { categories: true } }
    }
  })

  return {
    id: Number(data.id),
    restaurant_name: data.restaurant_name,
    owner_name: data.owner_name,
    mobile: data.users?.mobile || '',
    location: data.location,
    address: data.address || undefined,
    description: data.description,
    logo: data.logo || undefined,
    status: data.status as 'pending' | 'approved' | 'rejected',
    categories: data.restaurant_categories.map(rc => ({
      id: Number(rc.categories.id),
      name: rc.categories.name,
      status: rc.categories.status === 'active' ? 'active' : 'inactive'
    })),
    user: data.users ? { mobile: data.users.mobile } : undefined
  }
}

export async function updateRestaurant(id: number, updates: Partial<Omit<AwardRestaurant, 'id'>>): Promise<AwardRestaurant | null> {
  const data = await prisma.restaurants.update({
    where: { id: BigInt(id) },
    data: {
      status: updates.status as any,
      updated_at: new Date()
    },
    include: {
      users: true,
      restaurant_categories: { include: { categories: true } }
    }
  })

  return {
    id: Number(data.id),
    restaurant_name: data.restaurant_name,
    owner_name: data.owner_name,
    mobile: data.users?.mobile || '',
    location: data.location,
    address: data.address || undefined,
    description: data.description,
    logo: data.logo || undefined,
    status: data.status as 'pending' | 'approved' | 'rejected',
    categories: data.restaurant_categories.map(rc => ({
      id: Number(rc.categories.id),
      name: rc.categories.name,
      status: rc.categories.status === 'active' ? 'active' : 'inactive'
    })),
    user: data.users ? { mobile: data.users.mobile } : undefined
  }
}

export async function getVotes(): Promise<AwardVote[]> {
  const data = await prisma.votes.findMany({
    include: {
      restaurants: true,
      categories: true,
    }
  })
  
  const userIds = data.map(d => d.user_id)
  const users = await prisma.users.findMany({
    where: { id: { in: userIds } }
  })
  const userMap = new Map(users.map(u => [Number(u.id), u]))

  return data.map(v => {
    const user = userMap.get(Number(v.user_id))
    return {
      id: Number(v.id),
      user: user ? { name: user.name || undefined, mobile: user.mobile } : undefined,
      restaurant_id: Number(v.restaurant_id),
      restaurant_name: v.restaurants?.restaurant_name || '',
      category_id: Number(v.category_id),
      category_name: v.categories?.name || '',
      created_at: v.created_at ? v.created_at.toISOString() : new Date().toISOString()
    }
  })
}

export async function getVotesByMobile(mobile: string): Promise<AwardVote[]> {
  const user = await prisma.users.findUnique({ where: { mobile } })
  if (!user) return []

  const data = await prisma.votes.findMany({
    where: { user_id: user.id },
    include: {
      restaurants: true,
      categories: true,
    }
  })

  return data.map(v => ({
    id: Number(v.id),
    user: { name: user.name || undefined, mobile: user.mobile },
    restaurant_id: Number(v.restaurant_id),
    restaurant_name: v.restaurants?.restaurant_name || '',
    category_id: Number(v.category_id),
    category_name: v.categories?.name || '',
    created_at: v.created_at ? v.created_at.toISOString() : new Date().toISOString()
  }))
}

export async function hasVotedForCategory(mobile: string, categoryId: number): Promise<AwardVote | null> {
  const user = await prisma.users.findUnique({ where: { mobile } })
  if (!user) return null

  const data = await prisma.votes.findFirst({
    where: { user_id: user.id, category_id: BigInt(categoryId) },
    include: {
      restaurants: true,
      categories: true,
    }
  })

  if (!data) return null
  return {
    id: Number(data.id),
    user: { name: user.name || undefined, mobile: user.mobile },
    restaurant_id: Number(data.restaurant_id),
    restaurant_name: data.restaurants?.restaurant_name || '',
    category_id: Number(data.category_id),
    category_name: data.categories?.name || '',
    created_at: data.created_at ? data.created_at.toISOString() : new Date().toISOString()
  }
}

export async function hasVotedForAnyCategory(mobile: string): Promise<AwardVote | null> {
  const user = await prisma.users.findUnique({ where: { mobile } })
  if (!user) return null

  const data = await prisma.votes.findFirst({
    where: { user_id: user.id },
    include: {
      restaurants: true,
      categories: true,
    }
  })

  if (!data) return null
  return {
    id: Number(data.id),
    user: { name: user.name || undefined, mobile: user.mobile },
    restaurant_id: Number(data.restaurant_id),
    restaurant_name: data.restaurants?.restaurant_name || '',
    category_id: Number(data.category_id),
    category_name: data.categories?.name || '',
    created_at: data.created_at ? data.created_at.toISOString() : new Date().toISOString()
  }
}

export async function addVote(vote: Omit<AwardVote, 'id'>): Promise<AwardVote> {
  let user = await prisma.users.findUnique({ where: { mobile: vote.user?.mobile || '' } })
  if (!user && vote.user?.mobile) {
    user = await prisma.users.create({
      data: {
        mobile: vote.user.mobile,
        name: vote.user.name,
        role: 'voter',
        created_at: new Date(),
        updated_at: new Date()
      }
    })
  } else if (user && vote.user?.name && !user.name) {
    user = await prisma.users.update({
      where: { id: user.id },
      data: { name: vote.user.name, updated_at: new Date() }
    })
  }

  const data = await prisma.votes.create({
    data: {
      user_id: user!.id,
      restaurant_id: BigInt(vote.restaurant_id),
      category_id: BigInt(vote.category_id),
      created_at: new Date(),
      updated_at: new Date()
    },
    include: {
      restaurants: true,
      categories: true,
    }
  })

  return {
    id: Number(data.id),
    user: { name: user!.name || undefined, mobile: user!.mobile },
    restaurant_id: Number(data.restaurant_id),
    restaurant_name: data.restaurants?.restaurant_name || '',
    category_id: Number(data.category_id),
    category_name: data.categories?.name || '',
    created_at: data.created_at ? data.created_at.toISOString() : new Date().toISOString()
  }
}

export async function getWinners(): Promise<AwardWinner[]> {
  const data = await prisma.winners.findMany({
    include: {
      restaurants: { include: { users: true } },
      categories: true,
    }
  })
  return data.map(w => ({
    id: Number(w.id),
    restaurant_id: Number(w.restaurant_id),
    restaurant_name: w.restaurants?.restaurant_name || '',
    owner_name: w.restaurants?.users?.name || w.restaurants?.owner_name || '',
    location: w.restaurants?.location || '',
    category_id: Number(w.category_id),
    category_name: w.categories?.name || '',
    created_at: w.created_at ? w.created_at.toISOString() : new Date().toISOString()
  }))
}

export async function addWinner(winner: Omit<AwardWinner, 'id'>): Promise<AwardWinner> {
  const data = await prisma.winners.create({
    data: {
      restaurant_id: BigInt(winner.restaurant_id),
      category_id: BigInt(winner.category_id),
      award_year: new Date().getFullYear(),
      created_at: new Date(),
      updated_at: new Date()
    },
    include: {
      restaurants: { include: { users: true } },
      categories: true,
    }
  })
  return {
    id: Number(data.id),
    restaurant_id: Number(data.restaurant_id),
    restaurant_name: data.restaurants?.restaurant_name || '',
    owner_name: data.restaurants?.users?.name || data.restaurants?.owner_name || '',
    location: data.restaurants?.location || '',
    category_id: Number(data.category_id),
    category_name: data.categories?.name || '',
    created_at: data.created_at ? data.created_at.toISOString() : new Date().toISOString()
  }
}

export async function deleteWinner(id: number): Promise<boolean> {
  try {
    await prisma.winners.delete({ where: { id: BigInt(id) } })
    return true
  } catch {
    return false
  }
}

export async function getStats(): Promise<AdminDashboardStats> {
  const [total_restaurants, approved_restaurants, pending_restaurants, total_votes, total_categories, total_winners] = await Promise.all([
    prisma.restaurants.count(),
    prisma.restaurants.count({ where: { status: 'approved' } }),
    prisma.restaurants.count({ where: { status: 'pending' } }),
    prisma.votes.count(),
    prisma.categories.count(),
    prisma.winners.count()
  ])
  return {
    total_restaurants,
    approved_restaurants,
    pending_restaurants,
    total_votes,
    total_categories,
    total_winners,
  }
}
