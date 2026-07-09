'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AwardRestaurant, AwardVote } from '@/lib/award-admin'
import { fetchRestaurants, fetchVotes } from '@/lib/award-api'
import PageWrapper from '@/components/PageWrapper'
import { LogOut, MapPin, Award, TrendingUp, Utensils, ArrowLeftRight } from 'lucide-react'

export default function OwnerDashboardPage() {
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<AwardRestaurant | null>(null)
  const [categoryVotes, setCategoryVotes] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [totalVotes, setTotalVotes] = useState(0)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  useEffect(() => {
    const ownerMobile = localStorage.getItem('ownerMobile')
    const ownerRestaurantId = localStorage.getItem('ownerRestaurantId')

    if (!ownerMobile) {
      router.push('/restaurant/owner-login')
      return
    }

    let canceled = false
    Promise.all([fetchRestaurants(), fetchVotes()])
      .then(([restaurantData, voteData]) => {
        if (canceled) return

        let ownerRestaurant: AwardRestaurant | undefined

        // If a specific restaurant ID was stored (multi-restaurant scenario), use it
        if (ownerRestaurantId) {
          ownerRestaurant = restaurantData.find((r) => String(r.id) === ownerRestaurantId)
        }

        // Fallback: match by mobile
        if (!ownerRestaurant) {
          ownerRestaurant = restaurantData.find((r) => r.mobile === ownerMobile)
        }

        if (!ownerRestaurant) {
          localStorage.removeItem('ownerMobile')
          localStorage.removeItem('ownerRestaurantId')
          router.push('/restaurant/owner-login')
          return
        }

        setRestaurant(ownerRestaurant)

        // Calculate votes for this restaurant
        const votesForMe = voteData.filter((v) => v.restaurant_id === ownerRestaurant!.id)
        setTotalVotes(votesForMe.length)

        const categoryCounts = ownerRestaurant.categories.reduce<Record<string, number>>((acc, cat) => {
          acc[cat.name] = votesForMe.filter((v) => v.category_name === cat.name).length
          return acc
        }, {})

        setCategoryVotes(categoryCounts)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        if (!canceled) setLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('ownerMobile')
    localStorage.removeItem('ownerRestaurantId')
    router.push('/restaurant/owner-login')
  }

  const handleSwitchRestaurant = () => {
    // Keep ownerMobile so login form can skip OTP and show picker
    localStorage.removeItem('ownerRestaurantId')
    router.push('/restaurant/owner-login?switch=true')
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex h-screen items-center justify-center pt-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-primary"></div>
        </div>
      </PageWrapper>
    )
  }

  if (!restaurant) return null

  return (
    <PageWrapper>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-screen filter blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-3 shadow-[0_0_15px_rgba(245,124,0,0.2)]">
              Owner Dashboard
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Welcome back, {restaurant.owner_name}</h1>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleSwitchRestaurant}
              className="group flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Switch Restaurant
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setShowSignOutConfirm(true)}
              className="group flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 transition group-hover:-translate-x-1" />
              Sign Out
            </motion.button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Restaurant Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-1"
          >
            <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0d1526] shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex h-48 w-full items-center justify-center p-6 bg-slate-900/50">
                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-950 shadow-inner shadow-white/5">
                  {restaurant.logo ? (
                    <img src={restaurant.logo} alt={restaurant.restaurant_name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-5xl font-bold text-slate-300">{restaurant.restaurant_name.charAt(0)}</span>
                  )}
                </div>
              </div>

              <div className="p-8 relative z-10">
                <h2 className="text-2xl font-bold text-white">{restaurant.restaurant_name}</h2>
                <p className="mt-3 flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="h-5 w-5 text-primary shrink-0 -mt-0.5" />
                  <span>
                    {restaurant.location}
                    {restaurant.address && `, ${restaurant.address}`}
                  </span>
                </p>
                <div className="mt-6 mb-2 border-t border-slate-800" />
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  Total Votes Across All Categories: <strong className="text-white text-lg">{totalVotes}</strong>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Categories & Votes Section */}
          <div className="col-span-1 lg:col-span-2 space-y-6">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-white flex items-center gap-2"
            >
              <Award className="h-6 w-6 text-primary" />
              Nominated Categories
            </motion.h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {restaurant.categories.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-slate-800/60 bg-gradient-to-br from-slate-900 to-slate-950 p-6 transition hover:border-primary/50 hover:shadow-[0_8px_30px_rgb(245,138,39,0.15)]"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition duration-500 group-hover:scale-150 group-hover:bg-primary/10" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-lg font-bold text-white">{category.name}</h4>
                      <div className="rounded-full bg-slate-800/50 p-2">
                        <Utensils className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">Total Votes</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                          {categoryVotes[category.name] || 0}
                        </span>
                        <span className="text-sm text-slate-400 font-medium">votes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {restaurant.categories.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
                  You have not been nominated for any specific categories yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Dialog */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-sm rounded-[2rem] border border-slate-700 bg-slate-900 p-8 shadow-2xl"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <LogOut className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Sign Out?</h3>
            <p className="mt-2 text-sm text-slate-400">
              Are you sure you want to sign out? You will need to verify your OTP again to log back in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-2xl bg-red-500/20 border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/30 hover:text-red-200"
              >
                Yes, Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </PageWrapper>
  )
}
