'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/PageWrapper'
import { AwardRestaurant, AwardVote } from '@/lib/award-admin'
import { generateBreadcrumbSchema } from '@/lib/schema'

interface RestaurantVotePageProps {
  params: { id: string }
}

export default function RestaurantVotePage({ params }: RestaurantVotePageProps) {
  const router = useRouter()
  const [restaurant, setRestaurant] = useState<AwardRestaurant | null>(null)
  const [votes, setVotes] = useState<AwardVote[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let canceled = false

    Promise.all([
      fetch('/api/award/restaurants').then((res) => res.json()),
      fetch('/api/award/votes').then((res) => res.json()),
    ])
      .then(([restaurants, voteData]) => {
        if (canceled) return
        const current = restaurants.find((item: AwardRestaurant) => item.id.toString() === params.id)
        setRestaurant(current ?? null)
        setVotes(voteData)
      })
      .finally(() => {
        if (!canceled) setLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [params.id])

  const restaurantVotes = useMemo(
    () => (restaurant ? votes.filter((vote) => vote.restaurant_id === restaurant.id) : []),
    [restaurant, votes],
  )

  if (loading) {
    return (
      <PageWrapper>
        <div className="pt-24 pb-12 text-center text-white">Loading restaurant details...</div>
      </PageWrapper>
    )
  }

  if (!restaurant) {
    return (
      <PageWrapper>
        <div className="pt-24 pb-12 text-center text-white">
          <p>Restaurant not found.</p>
        </div>
      </PageWrapper>
    )
  }

  const handleVerify = async () => {
    setError('')

    if (mobile.trim().length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    if (!otp || otp.trim().length !== 6) {
      setError('Enter the 6-digit OTP sent to your number.')
      return
    }

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobile.trim(), otp: otp.trim() })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid OTP. Please try again.')
        return
      }

      setVerified(true)
      setStep(2)
      setError('')
    } catch (err) {
      setError('An error occurred while verifying the OTP.')
    }
  }

  const handleGenerateOtp = async () => {
    setError('')
    if (mobile.trim().length !== 10) {
      setError('Enter a valid mobile number before generating OTP.')
      return
    }

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: mobile.trim() })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }
      
      setError('OTP sent to your mobile number.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending OTP.')
    }
  }

  const handleVote = async () => {
    if (!verified) {
      setError('Please verify mobile first.')
      return
    }

    const category = restaurant.categories[0]
    setSubmitting(true)

    try {
      await fetch('/api/award/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: { name: name.trim(), mobile: mobile.trim() },
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.restaurant_name,
          category_id: category?.id ?? 0,
          category_name: category?.name ?? 'General',
          created_at: new Date().toISOString(),
        }),
      })
      router.push('/restaurant')
    } catch (error) {
      console.error(error)
      setError('Unable to submit vote. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageWrapper>
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-primary/10">
            <div className="mb-10 flex flex-col gap-3 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-primary">Vote for {restaurant.restaurant_name}</p>
              <h1 className="text-4xl font-semibold text-white">Cast your vote</h1>
              <p className="text-slate-400">Verify your mobile number, then submit your vote for the restaurant categories.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8">
                <div className="mb-8 flex items-center justify-between rounded-3xl bg-slate-900/80 p-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Step {step}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{step === 1 ? 'Verify Mobile' : 'Cast Your Vote'}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Votes so far</p>
                    <p className="text-2xl font-semibold text-white">{restaurantVotes.length}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="block text-sm font-semibold text-slate-300">
                    Your Name
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Enter your name"
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-300">
                    Mobile Number (10 digits)
                    <input
                      value={mobile}
                      onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                      className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </label>

                  <div className="rounded-3xl border border-primary/20 bg-slate-900/80 p-6">
                    <p className="text-sm font-semibold text-slate-300 mb-4">Enter the 6-digit OTP</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        value={otp}
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        className="flex-1 rounded-3xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Enter OTP"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateOtp}
                        className="inline-flex h-14 items-center justify-center rounded-3xl border border-primary bg-primary px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
                      >
                        Generate OTP
                      </button>
                    </div>
                  </div>

                  {error && <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}

                  <button
                    type="button"
                    onClick={handleVerify}
                    className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
                  >
                    Verify OTP
                  </button>

                  {verified && (
                    <button
                      type="button"
                      onClick={handleVote}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-emerald-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      Submit Vote
                    </button>
                  )}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/90 p-8">
                <div className="space-y-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary">Restaurant info</p>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                    <h3 className="text-xl font-semibold text-white">{restaurant.restaurant_name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{restaurant.description}</p>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Owner</span>
                        <span className="text-white">{restaurant.owner_name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Location</span>
                        <span className="text-white">{restaurant.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span>Categories</span>
                        <span className="text-white">{restaurant.categories.map((category) => category.name).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
