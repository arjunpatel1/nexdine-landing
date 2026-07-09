'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AwardRestaurant } from '@/lib/award-admin'
import { fetchRestaurants, updateRestaurant } from '@/lib/award-api'

const ORANGE = '#F58A27'
const CARD_BG = '#0F1A2C'
const BORDER = 'rgba(255,255,255,0.08)'

export default function AdminRestaurantsPage() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<AwardRestaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)

  const [rejectId, setRejectId] = useState<number | null>(null)
  
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterLocation, setFilterLocation] = useState<string>('all')

  useEffect(() => {
    let canceled = false
    fetchRestaurants()
      .then((items) => {
        if (!canceled) setRestaurants(items)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [])

  const pendingCount = useMemo(() => restaurants.filter((item) => item.status === 'pending').length, [restaurants])

  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(restaurants.map((r) => r.location)))
    locs.sort()
    return locs
  }, [restaurants])

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchStatus = filterStatus === 'all' || r.status === filterStatus
      const matchLoc = filterLocation === 'all' || r.location === filterLocation
      return matchStatus && matchLoc
    })
  }, [restaurants, filterStatus, filterLocation])

  const updateStatus = async (id: number, status: 'approved' | 'rejected') => {
    setSavingId(id)
    try {
      const updated = await updateRestaurant(id, { status })
      setRestaurants((current) => current.map((item) => (item.id === id ? updated : item)))
    } catch (error) {
      console.error(error)
    } finally {
      setSavingId(null)
    }
  }

  const handleApprove = (id: number) => {
    updateStatus(id, 'approved')
  }

  const handleReject = (id: number) => {
    setRejectId(id)
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
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
            onClick={() => router.push('/admin/restaurants/report')}
            className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
          >
            View report
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Title ── */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300">Award admin</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Restaurant nominations</h1>
          <p className="mt-2 text-sm text-slate-400">
            Review restaurant submissions and approve or reject them for the awards program.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Status summary</p>
                <p className="mt-1 text-sm text-slate-400">
                  {filteredRestaurants.length} of {restaurants.length} restaurants · {pendingCount} pending review
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none transition focus:border-orange-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none transition focus:border-orange-500"
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="rounded-[2rem] border border-slate-700 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-5">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 text-3xl font-bold text-white shadow-inner shadow-white/5">
                      {restaurant.logo ? (
                        <img src={restaurant.logo} alt={restaurant.restaurant_name} className="h-full w-full object-cover" />
                      ) : (
                        restaurant.restaurant_name.charAt(0)
                      )}
                    </div>
                    <div className="pt-1">
                      <h2 className="text-xl font-semibold text-white">{restaurant.restaurant_name}</h2>
                      <p className="mt-2 text-sm text-slate-400">Owner: {restaurant.owner_name}</p>
                      <p className="mt-1 text-sm text-slate-400">Location: {restaurant.location}</p>
                      {restaurant.address && (
                        <p className="mt-1 text-sm text-slate-400 break-words line-clamp-2" title={restaurant.address}>
                          Address: {restaurant.address}
                        </p>
                      )}
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {restaurant.categories.map((category) => (
                          <span key={category.id} className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
                            {category.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className={`rounded-full px-4 py-2 text-xs font-semibold uppercase ${restaurant.status === 'approved' ? 'bg-emerald-500/10 text-emerald-300' : restaurant.status === 'pending' ? 'bg-orange-500/10 text-orange-300' : 'bg-red-500/10 text-red-300'}`}>
                    {restaurant.status}
                  </span>
                </div>

                {restaurant.status === 'pending' && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => handleApprove(restaurant.id)}
                      className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(restaurant.id)}
                      className="w-full rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {rejectId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[2rem] border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold text-white">Reject Restaurant</h3>
            <p className="mt-2 text-sm text-slate-400">Are you sure you want to reject this restaurant? This action will mark it as rejected.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setRejectId(null)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateStatus(rejectId, 'rejected')
                  setRejectId(null)
                }}
                className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
