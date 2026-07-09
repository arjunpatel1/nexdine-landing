'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchRestaurants } from '@/lib/award-api'
import { AwardRestaurant } from '@/lib/award-admin'

export default function RestaurantOwnerLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpAttempts, setOtpAttempts] = useState(0)

  // If the owner has multiple restaurants under the same mobile
  const [myRestaurants, setMyRestaurants] = useState<AwardRestaurant[]>([])
  const [showPicker, setShowPicker] = useState(false)



  // Detect switch mode — skip OTP if already logged in
  useEffect(() => {
    const isSwitching = searchParams.get('switch') === 'true'
    const savedMobile = localStorage.getItem('ownerMobile')

    if (isSwitching && savedMobile) {
      setLoading(true)
      fetchRestaurants()
        .then((restaurants) => {
          const ownerRestaurants = restaurants.filter((r) => r.mobile === savedMobile)
          if (ownerRestaurants.length > 1) {
            setMobile(savedMobile)
            setMyRestaurants(ownerRestaurants)
            setShowPicker(true)
          } else if (ownerRestaurants.length === 1) {
            // Only one restaurant — just go straight to dashboard
            localStorage.setItem('ownerRestaurantId', String(ownerRestaurants[0].id))
            router.push('/restaurant/owner/dashboard')
          } else {
            // No restaurants found, fall through to normal login
            localStorage.removeItem('ownerMobile')
          }
        })
        .catch(() => {
          localStorage.removeItem('ownerMobile')
        })
        .finally(() => setLoading(false))
    }
  }, [searchParams, router])

  const handleGenerateOtp = async () => {
    setError('')
    setStatus('')
    setOtpAttempts(0)

    if (mobile.trim().length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoading(true)
    try {
      const restaurants = await fetchRestaurants()
      const ownerRestaurants = restaurants.filter((r) => r.mobile === mobile)

      if (ownerRestaurants.length === 0) {
        setError('No restaurant found associated with this mobile number.')
        setLoading(false)
        return
      }

      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      // Store all matched restaurants for picker later
      setMyRestaurants(ownerRestaurants)

      setShowOtp(true)
      setStatus('OTP sent to your mobile number. Please check your phone.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (otpAttempts >= 3) return

    if (!showOtp) {
      setError('Please generate OTP before continuing.')
      return
    }

    if (otp.trim().length !== 6) {
      setError('Please enter a valid 6-digit OTP.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp: otp.trim() })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        const newAttempts = otpAttempts + 1
        setOtpAttempts(newAttempts)
        if (newAttempts >= 3) {
          setError('Maximum attempts reached. Please resend the OTP or edit your number.')
        } else {
          setError(data.error || 'Incorrect OTP. Please try again.')
        }
        setLoading(false)
        return
      }

      setOtpAttempts(0)
      localStorage.setItem('ownerMobile', mobile)

      // If only one restaurant, go straight to dashboard
      if (myRestaurants.length === 1) {
        localStorage.setItem('ownerRestaurantId', String(myRestaurants[0].id))
        router.push('/restaurant/owner/dashboard')
      } else {
        // Multiple restaurants — show picker
        setLoading(false)
        setShowPicker(true)
      }
    } catch (err) {
      setError('An error occurred while verifying the OTP.')
      setLoading(false)
    }
  }

  const handleSelectRestaurant = (restaurant: AwardRestaurant) => {
    localStorage.setItem('ownerMobile', mobile)
    localStorage.setItem('ownerRestaurantId', String(restaurant.id))
    router.push('/restaurant/owner/dashboard')
  }

  // Restaurant picker screen
  if (showPicker) {
    return (
      <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm shadow-primary/10">
        <h2 className="text-xl font-bold text-white mb-2">Select Your Restaurant</h2>
        <p className="text-sm text-slate-400 mb-6">
          Multiple restaurants are linked to this mobile number. Please select which one you want to manage.
        </p>
        <div className="space-y-3">
          {myRestaurants.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectRestaurant(r)}
              className="w-full flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4 text-left transition hover:border-primary hover:bg-primary/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-800 text-xl font-bold text-white">
                {r.logo
                  ? <img src={r.logo} alt={r.restaurant_name} className="h-full w-full object-cover" />
                  : r.restaurant_name.charAt(0)
                }
              </div>
              <div>
                <p className="font-semibold text-white">{r.restaurant_name}</p>
                <p className="text-sm text-slate-400">{r.location}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm shadow-primary/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-3">Mobile number</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={mobile}
              onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))}
              disabled={showOtp}
              className="w-full rounded-3xl border border-border bg-background px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
              placeholder="Enter 10-digit mobile number"
            />
            {!showOtp && (
              <button
                type="button"
                onClick={handleGenerateOtp}
                className="inline-flex shrink-0 items-center justify-center rounded-3xl border border-primary bg-primary px-5 py-4 text-sm font-semibold text-background transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Generate OTP'}
              </button>
            )}
          </div>
        </div>

        {showOtp && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-semibold text-white mb-3">Enter OTP</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))}
              className="w-full rounded-3xl border border-border bg-background px-4 py-4 text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              placeholder="Enter 6-digit OTP"
            />
            <p className="mt-2 text-xs text-slate-400 pl-4">Enter the OTP sent to your mobile.</p>
          </div>
        )}

        {error && <p className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        {status && <p className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{status}</p>}

        {showOtp && (
          otpAttempts >= 3 ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                type="button"
                onClick={() => {
                  setShowOtp(false)
                  setOtp('')
                  setError('')
                  setStatus('')
                  setOtpAttempts(0)
                }}
                className="inline-flex w-full items-center justify-center rounded-3xl border border-primary bg-primary/10 px-6 py-4 text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Edit Number
              </button>
              <button
                type="button"
                onClick={() => { setOtp(''); handleGenerateOtp(); }}
                disabled={loading}
                className="text-sm text-primary underline underline-offset-2 hover:opacity-80"
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-background transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          )
        )}
      </form>
    </div>
  )
}
