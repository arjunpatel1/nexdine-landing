'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AwardCategory, AwardRestaurant, AwardVote } from '@/lib/award-admin'
import { fetchCategories, fetchRestaurants, fetchVotes } from '@/lib/award-api'

const PAGE_SIZE = 10

export default function AdminRestaurantReportPage() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<AwardRestaurant[]>([])
  const [votes, setVotes] = useState<AwardVote[]>([])
  const [categories, setCategories] = useState<AwardCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  type RestaurantReport = AwardRestaurant & { totalVotes: number; votesByCategory: Record<string, number> }
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantReport | null>(null)

  // ── Filter state ──
  const [searchText, setSearchText] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filterRestaurant, setFilterRestaurant] = useState('')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [appliedRestaurant, setAppliedRestaurant] = useState('')
  const [appliedLocation, setAppliedLocation] = useState('')
  const [appliedCategory, setAppliedCategory] = useState('')

  useEffect(() => {
    let canceled = false
    Promise.all([fetchRestaurants(), fetchVotes(), fetchCategories()])
      .then(([restaurantData, voteData, categoryData]) => {
        if (canceled) return
        setRestaurants(restaurantData)
        setVotes(voteData)
        setCategories(categoryData.filter(c => c.status === 'active'))
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => { canceled = true }
  }, [])

  // All active category names
  const allCategories = useMemo(() => {
    return categories.map((c) => c.name)
  }, [categories])

  // Build a report per restaurant, sorted by total votes descending
  const restaurantReports = useMemo(() => {
    return restaurants
      .map((restaurant) => {
        const votesForRestaurant = votes.filter((v) => v.restaurant_id === restaurant.id)
        const votesByCategory = votesForRestaurant.reduce<Record<string, number>>((acc, vote) => {
          acc[vote.category_name] = (acc[vote.category_name] || 0) + 1
          return acc
        }, {})
        return { ...restaurant, totalVotes: votesForRestaurant.length, votesByCategory }
      })
      .sort((a, b) => b.totalVotes - a.totalVotes)
  }, [restaurants, votes])

  // Summary stats
  const totalRestaurants = restaurants.length
  const totalVotes = votes.length
  const avgVotes = totalRestaurants > 0 ? (totalVotes / totalRestaurants).toFixed(2) : '0.00'

  const leadingCategory = useMemo(() => {
    const counts: Record<string, number> = {}
    const latestVoteTime: Record<string, string> = {}
    votes.forEach((v) => {
      counts[v.category_name] = (counts[v.category_name] || 0) + 1
      if (!latestVoteTime[v.category_name] || v.created_at > latestVoteTime[v.category_name]) {
        latestVoteTime[v.category_name] = v.created_at
      }
    })
    let best = { name: '—', count: 0 }
    for (const [name, count] of Object.entries(counts)) {
      if (count > best.count) {
        best = { name, count }
      } else if (count === best.count && count > 0) {
        // Tie-breaker: choose the category with the most recent vote
        if (latestVoteTime[name] > latestVoteTime[best.name]) {
          best = { name, count }
        }
      }
    }
    return best
  }, [votes])

  // Unique locations for dropdown
  const uniqueLocations = useMemo(() => Array.from(new Set(restaurants.map((r) => r.location))).sort(), [restaurants])

  // Pagination — applied after filters
  const filteredReports = useMemo(() => {
    return restaurantReports.filter((r) => {
      const q = appliedSearch.toLowerCase()
      if (q && !r.restaurant_name.toLowerCase().includes(q) && !r.location.toLowerCase().includes(q) && !Object.keys(r.votesByCategory).some((c) => c.toLowerCase().includes(q))) return false
      if (appliedRestaurant && r.restaurant_name !== appliedRestaurant) return false
      if (appliedLocation && r.location !== appliedLocation) return false
      if (appliedCategory && !(r.votesByCategory[appliedCategory] > 0)) return false
      return true
    })
  }, [restaurantReports, appliedSearch, appliedRestaurant, appliedLocation, appliedCategory])

  // ── Sort state ──
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSortClick = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sortedReports = useMemo(() => {
    if (!sortKey) return filteredReports
    return [...filteredReports].sort((a, b) => {
      let valA: string | number
      let valB: string | number
      if (sortKey === 'restaurant_name') { valA = a.restaurant_name.toLowerCase(); valB = b.restaurant_name.toLowerCase() }
      else if (sortKey === 'location') { valA = a.location.toLowerCase(); valB = b.location.toLowerCase() }
      else if (sortKey === 'totalVotes') { valA = a.totalVotes; valB = b.totalVotes }
      else { valA = a.votesByCategory[sortKey] || 0; valB = b.votesByCategory[sortKey] || 0 }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredReports, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sortedReports.length / PAGE_SIZE))
  const paginated = sortedReports.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleApplyFilters = () => {
    setAppliedSearch(searchText)
    setAppliedRestaurant(filterRestaurant)
    setAppliedLocation(filterLocation)
    setAppliedCategory(filterCategory)
    setPage(1)
  }

  const handleResetFilters = () => {
    setSearchText('')
    setFilterRestaurant('')
    setFilterLocation('')
    setFilterCategory('')
    setAppliedSearch('')
    setAppliedRestaurant('')
    setAppliedLocation('')
    setAppliedCategory('')
    setPage(1)
  }

  // Max votes per category (for green highlight)
  const maxByCat = useMemo(() => {
    const m: Record<string, number> = {}
    allCategories.forEach((cat) => {
      m[cat] = Math.max(0, ...restaurantReports.map((r) => r.votesByCategory[cat] || 0))
    })
    return m
  }, [restaurantReports, allCategories])

  const handleExportCSV = () => {
    const headers = ['Rank', 'Restaurant', 'Location', 'Total Votes', ...allCategories]
    const rows = restaurantReports.map((r, i) => [
      i + 1,
      r.restaurant_name,
      r.location,
      r.totalVotes,
      ...allCategories.map((cat) => r.votesByCategory[cat] || 0),
    ])
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'restaurant-voting-report.csv'
    link.click()
  }

  // Sort icon component
  const SortIcon = ({ colKey }: { colKey: string }) => {
    const isActive = sortKey === colKey
    return (
      <span className="ml-1 inline-flex flex-col">
        <svg className={`h-2.5 w-2.5 ${isActive && sortDir === 'asc' ? 'text-orange-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 6 4">
          <path d="M3 0L6 4H0L3 0z" />
        </svg>
        <svg className={`h-2.5 w-2.5 ${isActive && sortDir === 'desc' ? 'text-orange-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 6 4">
          <path d="M3 4L0 0H6L3 4z" />
        </svg>
      </span>
    )
  }

  const MedalIcon = ({ rank }: { rank: number }) => {
    if (rank === 1)
      return (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20 text-base">
          🥇
        </span>
      )
    if (rank === 2)
      return (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-400/20 text-base">
          🥈
        </span>
      )
    if (rank === 3)
      return (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600/20 text-base">
          🥉
        </span>
      )
    return <span className="text-sm font-semibold text-slate-400">{rank}</span>
  }

  const pageNumbers = () => {
    const nums: (number | '...')[] = []
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) nums.push(i)
    } else {
      nums.push(1, 2, 3)
      if (page > 4) nums.push('...')
      if (page > 3 && page < totalPages - 2) nums.push(page)
      if (totalPages - 2 > 3) nums.push('...')
      nums.push(totalPages)
    }
    return nums
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Back link ── */}
        <button
          type="button"
          onClick={() => router.push('/admin/restaurants')}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Manage Restaurants
        </button>

        {/* ── Header ── */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-2xl">
              📊
            </span>
            <div>
              <h1 className="text-3xl font-bold text-white">Restaurant Voting Report</h1>
              <p className="mt-1 text-sm text-slate-400">Comprehensive summary of votes by category and restaurant</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Restaurants */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-xl">👥</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Restaurants</p>
              <p className="mt-1 text-2xl font-bold text-white">{totalRestaurants}</p>
              <p className="text-xs text-slate-500">Across all locations</p>
            </div>
          </div>

          {/* Total Votes */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-xl">🗳️</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Votes</p>
              <p className="mt-1 text-2xl font-bold text-white">{totalVotes.toLocaleString()}</p>
              <p className="text-xs text-slate-500">All categories</p>
            </div>
          </div>

          {/* Leading Category */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-xl">🏆</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Leading Category</p>
              <p className="mt-1 text-lg font-bold leading-tight text-white">{leadingCategory.name}</p>
              <p className="text-xs text-slate-500">{leadingCategory.count.toLocaleString()} votes</p>
            </div>
          </div>

          {/* Average Votes */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-xl">📈</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Average Votes</p>
              <p className="mt-1 text-2xl font-bold text-white">{avgVotes}</p>
              <p className="text-xs text-slate-500">Per restaurant</p>
            </div>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="mb-6 space-y-3">
          {/* Search + toggle row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
              </svg>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
                placeholder="Search by restaurant name, location, or category..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-orange-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-orange-500 hover:text-orange-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Expandable filter dropdowns */}
          {showFilters && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Restaurant Name */}
              <select
                value={filterRestaurant}
                onChange={(e) => setFilterRestaurant(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-orange-500"
              >
                <option value="">Restaurant Name</option>
                {restaurantReports.map((r) => (
                  <option key={r.id} value={r.restaurant_name}>{r.restaurant_name}</option>
                ))}
              </select>

              {/* Location */}
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-orange-500"
              >
                <option value="">Location</option>
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {/* Category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none transition focus:border-orange-500"
              >
                <option value="">Category</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-orange-400"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-sm font-semibold text-slate-400 transition hover:text-white"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="border-b border-slate-700 px-6 py-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Voting Summary
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-sm text-slate-500">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  {/* Row 1: main column labels — Restaurant, Location span both rows; Votes by Category spans category cols */}
                  <tr className="bg-[#0d1526]">
                    <th
                      rowSpan={allCategories.length > 0 ? 2 : 1}
                      onClick={() => handleSortClick('restaurant_name')}
                      className="cursor-pointer select-none border border-slate-700/60 px-5 py-3.5 text-left align-middle text-sm font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center gap-1">Restaurant <SortIcon colKey="restaurant_name" /></span>
                    </th>
                    <th
                      rowSpan={allCategories.length > 0 ? 2 : 1}
                      onClick={() => handleSortClick('location')}
                      className="cursor-pointer select-none border border-slate-700/60 px-5 py-3.5 text-left align-middle text-sm font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center gap-1">Location <SortIcon colKey="location" /></span>
                    </th>
                    {allCategories.length > 0 && (
                      <th
                        colSpan={allCategories.length}
                        className="border border-slate-700/60 px-5 py-3.5 text-center text-sm font-semibold text-white"
                      >
                        Votes by Category
                      </th>
                    )}
                    <th
                      rowSpan={allCategories.length > 0 ? 2 : 1}
                      onClick={() => handleSortClick('totalVotes')}
                      className="cursor-pointer select-none border border-slate-700/60 px-5 py-3.5 text-center align-middle text-sm font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center justify-center gap-1">Total Votes <SortIcon colKey="totalVotes" /></span>
                    </th>
                    <th
                      rowSpan={allCategories.length > 0 ? 2 : 1}
                      className="border border-slate-700/60 px-5 py-3.5 text-center align-middle text-sm font-semibold text-white"
                    >
                      Actions
                    </th>
                  </tr>
                  {/* Row 2: category sub-headers only */}
                  {allCategories.length > 0 && (
                    <tr className="bg-[#0b1221]">
                      {allCategories.map((cat) => (
                        <th
                          key={cat}
                          onClick={() => handleSortClick(cat)}
                          className="cursor-pointer select-none border border-slate-700/60 px-4 py-2.5 text-center text-xs font-medium leading-tight text-slate-400 transition hover:text-orange-400"
                        >
                          <span className="inline-flex items-center justify-center gap-1">{cat} <SortIcon colKey={cat} /></span>
                        </th>
                      ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {paginated.map((restaurant) => (
                    <tr key={restaurant.id} className="transition hover:bg-slate-800/30">
                      <td className="border border-slate-700 px-5 py-4 text-center font-semibold text-white">{restaurant.restaurant_name}</td>
                      <td className="border border-slate-700 px-5 py-4 text-center text-slate-400">{restaurant.location}</td>
                      {allCategories.map((cat) => {
                        const val = restaurant.votesByCategory[cat] || 0
                        const isMax = maxByCat[cat] > 0 && val === maxByCat[cat]
                        return (
                          <td key={cat} className={`border border-slate-700 px-5 py-4 text-center font-semibold ${isMax ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {val}
                          </td>
                        )
                      })}
                      <td className="border border-slate-700 px-5 py-4 text-center text-base font-bold text-orange-400">
                        {restaurant.totalVotes}
                      </td>
                      <td className="border border-slate-700 px-5 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedRestaurant(restaurant as RestaurantReport)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-400 transition hover:bg-orange-500/20"
                        >
                          👁 View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={4 + allCategories.length + 1} className="py-16 text-center text-slate-500">
                        No data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Pagination Footer ── */}
          {!loading && restaurantReports.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 px-6 py-4 sm:flex-row">
              <p className="text-xs text-slate-500">
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, restaurantReports.length)} to{' '}
                {Math.min(page * PAGE_SIZE, restaurantReports.length)} of {restaurantReports.length} results
              </p>
              <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-orange-500 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ‹
                </button>
                {pageNumbers().map((num, i) =>
                  num === '...' ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-slate-600">…</span>
                  ) : (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPage(num as number)}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold transition ${
                        page === num
                          ? 'bg-orange-500 text-slate-950'
                          : 'border border-slate-700 text-slate-400 hover:border-orange-500 hover:text-orange-400'
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
                {/* Next */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-orange-500 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ›
                </button>
                {/* Page size display */}
                <span className="ml-3 rounded-lg border border-slate-700 px-3 py-1 text-xs text-slate-400">
                  {PAGE_SIZE} / page
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── View Details Modal ── */}
      {selectedRestaurant && (() => {
        const restaurantVotes = votes.filter((v) => v.restaurant_id === selectedRestaurant.id)
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10 backdrop-blur-sm"
            onClick={() => setSelectedRestaurant(null)}
          >
            <div
              className="w-full max-w-2xl rounded-[2rem] border border-slate-700 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 text-2xl font-bold text-white">
                    {selectedRestaurant.logo ? (
                      <img src={selectedRestaurant.logo} alt={selectedRestaurant.restaurant_name} className="h-full w-full object-cover" />
                    ) : (
                      selectedRestaurant.restaurant_name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedRestaurant.restaurant_name}</h2>
                    <p className="mt-1 text-sm text-slate-400">📍 {selectedRestaurant.location}{selectedRestaurant.address ? `, ${selectedRestaurant.address}` : ''}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRestaurant(null)}
                  className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Owner Details */}
              <div className="grid grid-cols-2 gap-4 border-b border-slate-800 p-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Owner</p>
                  <p className="mt-1 text-sm font-semibold text-white">{selectedRestaurant.owner_name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile</p>
                  <p className="mt-1 text-sm font-semibold text-white">{selectedRestaurant.mobile}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Votes</p>
                  <p className="mt-1 text-2xl font-bold text-orange-400">{selectedRestaurant.totalVotes}</p>
                </div>
              </div>

              {/* Voter Table */}
              <div className="p-6">
                <h3 className="mb-4 text-sm font-semibold text-white">Voter Details</h3>
                {restaurantVotes.length === 0 ? (
                  <p className="rounded-2xl border border-slate-800 py-8 text-center text-sm text-slate-500">No votes recorded yet for this restaurant.</p>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-700">
                    <table className="min-w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="bg-slate-950/60">
                          <th className="border border-slate-700 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">#</th>
                          <th className="border border-slate-700 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Voter Name</th>
                          <th className="border border-slate-700 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Mobile</th>
                          <th className="border border-slate-700 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                          <th className="border border-slate-700 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restaurantVotes.map((vote, i) => (
                          <tr key={vote.id} className="transition hover:bg-slate-800/30">
                            <td className="border border-slate-700 px-4 py-3 text-center text-slate-500">{i + 1}</td>
                            <td className="border border-slate-700 px-4 py-3 text-center font-semibold text-white">
                              {vote.user?.name || '—'}
                            </td>
                            <td className="border border-slate-700 px-4 py-3 text-center text-slate-400">
                              {vote.user?.mobile || '—'}
                            </td>
                            <td className="border border-slate-700 px-4 py-3 text-center">
                              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-orange-400">
                                {vote.category_name}
                              </span>
                            </td>
                            <td className="border border-slate-700 px-4 py-3 text-center text-slate-400">
                              {new Date(vote.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
