'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AwardCategory, AwardRestaurant, AwardWinner } from '@/lib/award-admin'
import { createWinner, deleteWinner, fetchCategories, fetchRestaurants, fetchWinners } from '@/lib/award-api'

export default function AdminWinnersPage() {
  const router = useRouter()
  const [winners, setWinners] = useState<AwardWinner[]>([])
  const [categories, setCategories] = useState<AwardCategory[]>([])
  const [restaurants, setRestaurants] = useState<AwardRestaurant[]>([])
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteWinnerId, setDeleteWinnerId] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number>(0)
  const [restaurantId, setRestaurantId] = useState<number>(0)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let canceled = false
    Promise.all([fetchCategories(), fetchRestaurants(), fetchWinners()])
      .then(([categoriesData, restaurantsData, winnersData]) => {
        if (canceled) return
        setCategories(categoriesData)
        setRestaurants(restaurantsData)
        setWinners(winnersData)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [])

  // Auto-select first item when modal opens if nothing selected
  useEffect(() => {
    if (isModalOpen) {
      if (categories.length > 0 && categoryId === 0) setCategoryId(categories[0].id)
      if (restaurants.length > 0 && restaurantId === 0) setRestaurantId(restaurants[0].id)
    }
  }, [isModalOpen, categories, restaurants, categoryId, restaurantId])

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.id, item.name])),
    [categories],
  )

  const handleAddWinner = async () => {
    setError('')
    if (!restaurantId || !categoryId) {
      setError('Please select both a restaurant and category.')
      return
    }
    if (!year) {
      setError('Please enter a valid award year.')
      return
    }

    const already = winners.some(
      (item) => item.category_id === categoryId && new Date(item.created_at).getFullYear() === year,
    )
    if (already) {
      setError('A winner already exists for this category this year.')
      return
    }

    const restaurant = restaurants.find((item) => item.id === restaurantId)
    const categoryName = categoryMap[categoryId] || 'Unknown'

    if (!restaurant) {
      setError('Selected restaurant not found.')
      return
    }

    setSaving(true)
    try {
      const winner = await createWinner({
        restaurant_id: restaurantId,
        restaurant_name: restaurant.restaurant_name,
        owner_name: restaurant.owner_name,
        location: restaurant.location,
        category_id: categoryId,
        category_name: categoryName,
        created_at: new Date(`${year}-01-01T00:00:00.000Z`).toISOString(),
      })
      setWinners((current) => [...current, winner])
      setIsModalOpen(false) // Close modal on success
      setError('')
    } catch (error) {
      console.error(error)
      setError('Unable to publish winner. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (id: number) => {
    setDeleteWinnerId(id)
  }

  const confirmDelete = async () => {
    if (deleteWinnerId === null) return
    try {
      await deleteWinner(deleteWinnerId)
      setWinners((current) => current.filter((item) => item.id !== deleteWinnerId))
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteWinnerId(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* ── Top Navigation & Actions ── */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
          >
            + Create winner
          </button>
        </div>

        {/* ── Title ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">Award admin</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Manage winners</h1>
          <p className="mt-2 text-sm text-slate-400">
            Publish award winners and keep the winners list up to date.
          </p>
        </div>

        {/* ── Winners Grid ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-500">Loading winners...</div>
        ) : winners.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/80 py-20 text-center shadow-lg">
            <p className="text-lg text-slate-400">No winners published yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {winners.map((winner) => (
              <div key={winner.id} className="group relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg transition hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-orange-500/10">
                <div className="flex items-start justify-between gap-3">
                  <div className="pr-6">
                    <p className="text-lg font-bold text-white">{winner.restaurant_name}</p>
                    <p className="mt-1 text-sm font-medium text-orange-400">{winner.category_name}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(winner.id)}
                    className="absolute right-4 top-4 rounded-full border border-red-500/30 bg-red-500/10 p-2 text-red-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                    title="Remove winner"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                  <p className="flex items-center gap-1.5 text-sm text-slate-400">
                    <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {winner.location}
                  </p>
                  <p className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                    {new Date(winner.created_at).getFullYear()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Create Winner Dialog ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="border-b border-slate-800 p-6">
              <h2 className="text-xl font-bold text-white">Publish Winner</h2>
              <p className="mt-1 text-sm text-slate-400">Select the category, restaurant, and award year.</p>
            </div>
            
            <div className="p-6">
              {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-200">
                  Category
                  <select
                    value={categoryId}
                    onChange={(event) => setCategoryId(Number(event.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-slate-300 outline-none transition focus:border-orange-500"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-200">
                  Restaurant
                  <select
                    value={restaurantId}
                    onChange={(event) => setRestaurantId(Number(event.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-slate-300 outline-none transition focus:border-orange-500"
                  >
                    {restaurants.map((restaurant) => (
                      <option key={restaurant.id} value={restaurant.id}>{restaurant.restaurant_name}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-200">
                  Award Year
                  <input
                    type="number"
                    value={year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-slate-300 outline-none transition focus:border-orange-500"
                  />
                </label>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddWinner}
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-orange-400 disabled:opacity-70"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save winner'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete Dialog ── */}
      {deleteWinnerId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setDeleteWinnerId(null)} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-white">Remove Winner?</h3>
            <p className="mt-2 text-sm text-slate-400">Are you sure you want to remove this winner? This action cannot be undone.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteWinnerId(null)}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-400"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
