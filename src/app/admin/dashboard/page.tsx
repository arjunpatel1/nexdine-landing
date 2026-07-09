'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchStats } from '@/lib/award-api'

const actionItems = [
  { title: 'Manage Categories', subtitle: 'Add, update, or remove award categories', route: '/admin/categories' },
  { title: 'Approve Restaurants', subtitle: 'Review restaurant nominations for approval', route: '/admin/restaurants' },
  { title: 'Review Votes', subtitle: 'Search and filter submitted votes', route: '/admin/votes' },
  { title: 'Publish Winners', subtitle: 'Manage winning restaurants and categories', route: '/admin/winners' },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    total_restaurants: 0,
    approved_restaurants: 0,
    pending_restaurants: 0,
    total_votes: 0,
    total_categories: 0,
    total_winners: 0,
  })
  const [selectedAction, setSelectedAction] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let canceled = false
    fetchStats()
      .then((data) => {
        if (!canceled) setStats(data)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })
    return () => {
      canceled = true
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const cards = useMemo(
    () => [
      { label: 'Restaurants', value: stats.total_restaurants, variant: 'orange' },
      { label: 'Approved', value: stats.approved_restaurants, variant: 'green' },
      { label: 'Pending', value: stats.pending_restaurants, variant: 'amber' },
      { label: 'Votes', value: stats.total_votes, variant: 'blue' },
      { label: 'Categories', value: stats.total_categories, variant: 'purple' },
      { label: 'Winners', value: stats.total_winners, variant: 'pink' },
    ],
    [stats],
  )



  return (
    <div className="min-h-screen bg-slate-950 px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-slate-700 bg-slate-900/90 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.55)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-300">Awards admin</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Dashboard</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
                Monitor nominations, track voting performance, and access key award workflows from a single admin console.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex shrink-0 items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>

          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <div
                key={card.label}
                className="relative overflow-hidden rounded-[1.75rem] border border-slate-700 bg-slate-900/95 p-8 shadow-[0_28px_110px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_120px_rgba(15,23,42,0.6)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 opacity-90" />
                <div className="relative flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{card.label}</p>
                </div>
                <p className="mt-6 text-5xl font-semibold text-white">{card.value}</p>
                <div className="mt-4 h-1 rounded-full bg-slate-800" />
                <p className="mt-4 text-sm text-slate-400">{card.label} in the awards portal</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-slate-700 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Quick actions</p>
                <p className="mt-2 text-slate-400">Open a workflow and manage awards from the admin portal.</p>
              </div>
              <span className="rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold uppercase text-slate-300">Click an action</span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {actionItems.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => {
                    setSelectedAction(action.title)
                    router.push(action.route)
                  }}
                  className="group flex flex-col rounded-[1.75rem] border border-slate-700 bg-slate-900/80 p-6 text-left transition hover:-translate-y-1 hover:border-orange-500"
                >
                  <h2 className="text-xl font-semibold text-white">{action.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{action.subtitle}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
                    Open
                    <span className="inline-block h-2 w-2 rounded-full bg-orange-300" />
                  </span>
                </button>
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
