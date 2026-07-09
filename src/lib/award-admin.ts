export type AwardCategory = {
  id: number
  name: string
  status: 'active' | 'inactive'
}

export type AwardRestaurant = {
  id: number
  restaurant_name: string
  owner_name: string
  mobile: string
  location: string
  address?: string
  status: 'pending' | 'approved' | 'rejected'
  categories: AwardCategory[]
  description: string
  logo?: string
  user?: {
    mobile: string
  }
}

export type AwardVote = {
  id: number
  user?: {
    name?: string
    mobile?: string
  }
  restaurant_id: number
  restaurant_name: string
  category_id: number
  category_name: string
  created_at: string
}

export type AwardWinner = {
  id: number
  restaurant_id: number
  restaurant_name: string
  owner_name: string
  location: string
  category_id: number
  category_name: string
  created_at: string
}

export type AdminDashboardStats = {
  total_restaurants: number
  approved_restaurants: number
  pending_restaurants: number
  total_votes: number
  total_categories: number
  total_winners: number
}

export const awardCategories: AwardCategory[] = [
  { id: 1, name: 'Best Fine Dining', status: 'active' },
  { id: 2, name: 'Best Casual Dining', status: 'active' },
  { id: 3, name: 'Best Cafe & Desserts', status: 'active' },
  { id: 4, name: 'Best Quick Service Restaurant', status: 'active' },
  { id: 5, name: 'Best Restaurant Technology', status: 'active' },
  { id: 6, name: 'Best Sustainable Restaurant', status: 'active' },
]

export const awardRestaurants: AwardRestaurant[] = [
  {
    id: 1,
    restaurant_name: 'The Golden Table',
    owner_name: 'Amit Sharma',
    mobile: '9876543210',
    location: 'Hyderabad',
    address: 'Banjara Hills',
    status: 'pending',
    categories: [awardCategories[0], awardCategories[4]],
    description: 'A premium dining destination known for elegant cuisine, refined hospitality, and a beautifully curated tasting experience.',
    logo: undefined,
    user: { mobile: '9876543210' },
  },
  {
    id: 2,
    restaurant_name: 'Spice Craft',
    owner_name: 'Meera Rao',
    mobile: '9123456780',
    location: 'Bangalore',
    address: 'Indiranagar',
    status: 'approved',
    categories: [awardCategories[1], awardCategories[3]],
    description: 'A popular neighborhood restaurant delivering flavourful meals with warm service and a welcoming atmosphere.',
    logo: undefined,
    user: { mobile: '9123456780' },
  },
  {
    id: 3,
    restaurant_name: 'Cafe Luna',
    owner_name: 'Priya Nair',
    mobile: '9988776655',
    location: 'Chennai',
    address: 'Nungambakkam',
    status: 'approved',
    categories: [awardCategories[2]],
    description: 'A cozy cafe with artisanal desserts, specialty coffee, and a relaxed, community-focused vibe.',
    logo: undefined,
    user: { mobile: '9988776655' },
  },
]

export const awardVotes: AwardVote[] = [
  { id: 1, user: { name: 'Rohit Verma', mobile: '9998887776' }, restaurant_id: 1, restaurant_name: 'The Golden Table', category_id: 1, category_name: 'Best Fine Dining', created_at: '2026-06-18T11:10:00.000Z' },
  { id: 2, user: { name: 'Anjali Patel', mobile: '9845123456' }, restaurant_id: 2, restaurant_name: 'Spice Craft', category_id: 2, category_name: 'Best Casual Dining', created_at: '2026-06-19T14:23:00.000Z' },
  { id: 3, user: { name: 'Karan Singh', mobile: '9922334455' }, restaurant_id: 3, restaurant_name: 'Cafe Luna', category_id: 3, category_name: 'Best Cafe & Desserts', created_at: '2026-06-20T09:55:00.000Z' },
  { id: 4, user: { name: 'Mitali Shah', mobile: '9012345678' }, restaurant_id: 2, restaurant_name: 'Spice Craft', category_id: 4, category_name: 'Best Quick Service Restaurant', created_at: '2026-06-21T16:12:00.000Z' },
]

export const awardWinners: AwardWinner[] = [
  { id: 1, restaurant_id: 3, restaurant_name: 'Cafe Luna', owner_name: 'Priya Nair', location: 'Chennai', category_id: 3, category_name: 'Best Cafe & Desserts', created_at: '2026-06-21T12:00:00.000Z' },
]

export const getDashboardStats = (): AdminDashboardStats => ({
  total_restaurants: awardRestaurants.length,
  approved_restaurants: awardRestaurants.filter((item) => item.status === 'approved').length,
  pending_restaurants: awardRestaurants.filter((item) => item.status === 'pending').length,
  total_votes: awardVotes.length,
  total_categories: awardCategories.length,
  total_winners: awardWinners.length,
})
