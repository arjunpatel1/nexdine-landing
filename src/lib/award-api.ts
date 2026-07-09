import type { AwardCategory, AwardRestaurant, AwardVote, AwardWinner } from './award-admin'

const createJsonRequest = async (url: string, method: string, body?: unknown) => {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || `Request failed with status ${res.status}`)
  }
  return await res.json()
}

export const fetchCategories = async (): Promise<AwardCategory[]> => {
  return await fetch('/api/award/categories').then((res) => res.json())
}

export const createCategory = async (category: Omit<AwardCategory, 'id'>): Promise<AwardCategory> => {
  return await createJsonRequest('/api/award/categories', 'POST', category)
}

export const updateCategory = async (id: number, updates: Partial<Omit<AwardCategory, 'id'>>): Promise<AwardCategory> => {
  return await createJsonRequest(`/api/award/categories/${id}`, 'PATCH', updates)
}

export const deleteCategory = async (id: number): Promise<void> => {
  await createJsonRequest(`/api/award/categories/${id}`, 'DELETE')
}

const formatLogoUrl = (url?: string) => {
  if (!url) return url
  if (url.startsWith('data:') || url.startsWith('http')) return url
  if (!url.startsWith('/')) return `/${url}`
  return url
}

export const fetchRestaurants = async (): Promise<AwardRestaurant[]> => {
  const restaurants: AwardRestaurant[] = await fetch('/api/award/restaurants').then((res) => res.json())
  return restaurants.map(r => ({
    ...r,
    logo: formatLogoUrl(r.logo) as string
  }))
}

export const updateRestaurant = async (id: number, updates: Partial<Omit<AwardRestaurant, 'id'>>): Promise<AwardRestaurant> => {
  return await createJsonRequest(`/api/award/restaurants/${id}`, 'PATCH', updates)
}

export const fetchWinners = async (): Promise<AwardWinner[]> => {
  return await fetch('/api/award/winners').then((res) => res.json())
}

export const createWinner = async (winner: Omit<AwardWinner, 'id'>): Promise<AwardWinner> => {
  return await createJsonRequest('/api/award/winners', 'POST', winner)
}

export const deleteWinner = async (id: number): Promise<void> => {
  await createJsonRequest(`/api/award/winners/${id}`, 'DELETE')
}

export const fetchVotes = async (): Promise<AwardVote[]> => {
  return await fetch('/api/award/votes').then((res) => res.json())
}

export const createVote = async (vote: Omit<AwardVote, 'id'>): Promise<AwardVote> => {
  return await createJsonRequest('/api/award/votes', 'POST', vote)
}

export const fetchStats = async (): Promise<{
  total_restaurants: number
  approved_restaurants: number
  pending_restaurants: number
  total_votes: number
  total_categories: number
  total_winners: number
}> => {
  return await fetch('/api/award/stats').then((res) => res.json())
}
