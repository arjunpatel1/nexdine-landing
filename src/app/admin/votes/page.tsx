'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchVotes } from '@/lib/award-api'

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

export default function AdminVotesPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [restaurantFilter, setRestaurantFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [votes, setVotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Pagination state
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    let canceled = false
    fetchVotes()
      .then((items) => { if (!canceled) setVotes(items) })
      .finally(() => { if (!canceled) setLoading(false) })
    return () => { canceled = true }
  }, [])

  const filteredVotes = useMemo(() => {
    return votes.filter((vote) => {
      const q = query.toLowerCase()
      const matchQuery =
        !q ||
        vote.user?.name?.toLowerCase().includes(q) ||
        vote.user?.mobile?.includes(q) ||
        vote.restaurant_name.toLowerCase().includes(q) ||
        vote.category_name.toLowerCase().includes(q)
      const matchRestaurant = !restaurantFilter || vote.restaurant_name === restaurantFilter
      const matchCategory = !categoryFilter || vote.category_name === categoryFilter
      return matchQuery && matchRestaurant && matchCategory
    })
  }, [votes, query, restaurantFilter, categoryFilter])

  // Sorting state
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sortedVotes = useMemo(() => {
    if (!sortKey) return filteredVotes
    return [...filteredVotes].sort((a, b) => {
      let valA: string | number
      let valB: string | number
      
      if (sortKey === 'user') {
        valA = (a.user?.name || a.user?.mobile || 'Anonymous').toLowerCase()
        valB = (b.user?.name || b.user?.mobile || 'Anonymous').toLowerCase()
      } else if (sortKey === 'restaurant_name') {
        valA = a.restaurant_name.toLowerCase()
        valB = b.restaurant_name.toLowerCase()
      } else if (sortKey === 'category_name') {
        valA = a.category_name.toLowerCase()
        valB = b.category_name.toLowerCase()
      } else if (sortKey === 'created_at') {
        valA = new Date(a.created_at).getTime()
        valB = new Date(b.created_at).getTime()
      } else {
        return 0
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredVotes, sortKey, sortDir])

  const handleSortClick = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(sortedVotes.length / pageSize))
  const paginatedVotes = useMemo(() => {
    return sortedVotes.slice((page - 1) * pageSize, page * pageSize)
  }, [sortedVotes, page, pageSize])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [query, restaurantFilter, categoryFilter, pageSize])

  const restaurantOptions = useMemo(
    () => Array.from(new Set(votes.map((v) => v.restaurant_name))).sort(),
    [votes],
  )
  const categoryOptions = useMemo(
    () => Array.from(new Set(votes.map((v) => v.category_name))).sort(),
    [votes],
  )

  const handleResetFilters = () => {
    setQuery('')
    setRestaurantFilter('')
    setCategoryFilter('')
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

  const exportCsv = () => {
    const headers = ['User', 'Restaurant', 'Category', 'Date']
    const rows = filteredVotes.map((vote) => [
      vote.user?.name || vote.user?.mobile || 'Anonymous',
      vote.restaurant_name,
      vote.category_name,
      new Date(vote.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    ])
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'all-votes.csv'
    link.click()
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* ── Top Navigation & Export ── */}
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
            onClick={exportCsv}
            className="flex items-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:bg-orange-500/20"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export CSV
          </button>
        </div>

        {/* ── Title ── */}
        <h1 className="mb-6 text-3xl font-bold text-white">View All Votes</h1>

        {/* ── Filter Bar ── */}
        <div className="mb-6 space-y-3">
          {/* Search row */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by user name, mobile, restaurant, or category..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-2.5 pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-orange-500"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="flex shrink-0 items-center gap-2 rounded-xl border border-orange-500/30 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-orange-400 transition hover:bg-slate-800"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M10 12h4" />
              </svg>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center gap-4">
                <select
                  value={restaurantFilter}
                  onChange={(e) => setRestaurantFilter(e.target.value)}
                  className="min-w-[200px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none transition focus:border-orange-500"
                >
                  <option value="">Restaurant Name</option>
                  {restaurantOptions.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="min-w-[200px] rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300 outline-none transition focus:border-orange-500"
                >
                  <option value="">Category</option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-sm font-medium text-slate-400 transition hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* ── Table Section ── */}
        <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Table Header Row */}
          <div className="border-b border-slate-700 bg-slate-950/40 px-6 py-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Total Votes: {filteredVotes.length}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20 text-sm text-slate-500">Loading…</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#0b1221]">
                    <th
                      onClick={() => handleSortClick('user')}
                      className="cursor-pointer select-none border border-slate-700/60 px-6 py-4 text-center text-xs font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center justify-center gap-1">User <SortIcon colKey="user" /></span>
                    </th>
                    <th
                      onClick={() => handleSortClick('restaurant_name')}
                      className="cursor-pointer select-none border border-slate-700/60 px-6 py-4 text-center text-xs font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center justify-center gap-1">Restaurant <SortIcon colKey="restaurant_name" /></span>
                    </th>
                    <th
                      onClick={() => handleSortClick('category_name')}
                      className="cursor-pointer select-none border border-slate-700/60 px-6 py-4 text-center text-xs font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center justify-center gap-1">Category <SortIcon colKey="category_name" /></span>
                    </th>
                    <th
                      onClick={() => handleSortClick('created_at')}
                      className="cursor-pointer select-none border border-slate-700/60 px-6 py-4 text-center text-xs font-semibold text-white transition hover:text-orange-400"
                    >
                      <span className="inline-flex items-center justify-center gap-1">Date <SortIcon colKey="created_at" /></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVotes.map((vote) => (
                    <tr key={vote.id} className="transition hover:bg-slate-800/30">
                      <td className="border border-slate-700/60 px-6 py-4 text-center text-slate-300">
                        {vote.user?.name || vote.user?.mobile || 'Anonymous'}
                      </td>
                      <td className="border border-slate-700/60 px-6 py-4 text-center font-semibold text-slate-300">
                        {vote.restaurant_name}
                      </td>
                      <td className="border border-slate-700/60 px-6 py-4 text-center text-slate-300">
                        {vote.category_name}
                      </td>
                      <td className="border border-slate-700/60 px-6 py-4 text-center text-slate-400">
                        {new Date(vote.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                  {paginatedVotes.length === 0 && (
                    <tr>
                      <td colSpan={4} className="border border-slate-700/60 py-16 text-center text-slate-500">
                        No votes match your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Pagination Footer ── */}
          {!loading && (
            <div className="flex items-center justify-end gap-6 border-t border-slate-700 bg-slate-950/40 px-6 py-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setPage(1)
                  }}
                  className="bg-transparent text-white outline-none"
                >
                  {PAGE_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white">{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                {filteredVotes.length > 0 ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, filteredVotes.length)} of {filteredVotes.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded p-1 transition hover:text-white disabled:opacity-50"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  className="rounded p-1 transition hover:text-white disabled:opacity-50"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
