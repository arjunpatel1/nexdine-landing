'use client'

import { useState } from 'react'
import { AwardRestaurant } from '@/lib/award-admin'
import { createVote } from '@/lib/award-api'
import { CheckCircle2, ChevronRight, Phone, User, Award } from 'lucide-react'

interface Props {
  restaurant: AwardRestaurant
}

export default function RestaurantVotingForm({ restaurant }: Props) {
  const [step, setStep] = useState(0) // 0: Button, 1: Details, 2: OTP, 3: Category, 4: Success
  const [voterName, setVoterName] = useState('')
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [otpAttempts, setOtpAttempts] = useState(0)
  
  // Store the actual OTP from API


  const handleGenerateOtp = async () => {
    setError('')
    setOtpAttempts(0)
    if (!voterName.trim() || mobile.trim().length !== 10) {
      setError('Please provide a valid name and 10-digit mobile number.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }
      

      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async () => {
    setError('')
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
          throw new Error('Maximum attempts reached. Please resend the OTP or edit your number.')
        }
        throw new Error(data.error || 'Incorrect OTP. Please try again.')
      }

      setOtpAttempts(0)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during verification.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitVote = async () => {
    setError('')
    if (!selectedCategoryId) {
      setError('Please select a category to vote for.')
      return
    }
    const selectedCategory = restaurant.categories.find((c) => c.id === selectedCategoryId)
    if (!selectedCategory) return
    setLoading(true)
    try {
      await createVote({
        user: { name: voterName, mobile },
        restaurant_id: restaurant.id,
        restaurant_name: restaurant.restaurant_name,
        category_id: selectedCategory.id,
        category_name: selectedCategory.name,
        created_at: new Date().toISOString(),
      })
      setStep(4)
    } catch (err: any) {
      const errorMessage = err?.message || err || 'Failed to submit your vote. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (step === 0) {
    return (
      <button
        onClick={() => setStep(1)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-bold text-slate-950 transition hover:bg-primary/90"
      >
        Vote for this restaurant
        <ChevronRight className="h-4 w-4" />
      </button>
    )
  }

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="h-14 w-14 text-emerald-400 mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Vote Cast!</h3>
        <p className="text-slate-400 text-sm">
          Thank you, <span className="text-white font-semibold">{voterName.split(' ')[0]}</span>. Your vote for{' '}
          <span className="text-white font-semibold">{restaurant.restaurant_name}</span> has been successfully recorded.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-6 space-y-5">
      {step === 1 && (
        <>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Step 1 of 3</p>
            <h3 className="text-lg font-bold text-white">Your Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="E.g. John Doe"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-400">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                  placeholder="10-digit number"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            onClick={handleGenerateOtp}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? 'Sending OTP...' : 'Generate OTP'}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Step 2 of 3</p>
            <h3 className="text-lg font-bold text-white">Verify OTP</h3>
            <p className="text-sm text-slate-400 mt-1">OTP sent to +91 {mobile}</p>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="w-full rounded-2xl border border-slate-700 bg-slate-800 py-4 px-4 text-center text-2xl tracking-[0.5em] text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
            placeholder="------"
          />
          <p className="text-xs text-slate-500 text-center">Enter the OTP sent to your mobile.</p>
          {error && <p className="text-xs text-red-400">{error}</p>}
          {otpAttempts >= 3 ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <button
                onClick={() => {
                  setStep(1)
                  setOtp('')
                  setError('')
                  setOtpAttempts(0)
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary/10 px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary/20"
              >
                Edit Number
              </button>
              <button
                onClick={() => { setOtp(''); handleGenerateOtp(); }}
                disabled={loading}
                className="text-sm text-primary underline underline-offset-2 hover:opacity-80"
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Step 3 of 3</p>
            <h3 className="text-lg font-bold text-white">Select Category</h3>
            <p className="text-sm text-slate-400 mt-1">Choose one category to vote for.</p>
          </div>
          <div className="space-y-2">
            {restaurant.categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`cursor-pointer rounded-2xl border p-4 flex items-center justify-between transition-all ${
                  selectedCategoryId === cat.id
                    ? 'border-primary bg-primary/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <span className={`text-sm font-semibold ${selectedCategoryId === cat.id ? 'text-primary' : 'text-slate-300'}`}>
                  {cat.name}
                </span>
                <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedCategoryId === cat.id ? 'border-primary' : 'border-slate-600'}`}>
                  {selectedCategoryId === cat.id && <div className="h-2 w-2 rounded-full bg-primary" />}
                </div>
              </div>
            ))}
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          {error && (
            <button
              onClick={() => {
                setStep(1)
                setError('')
                setVoterName('')
                setMobile('')
                setOtp('')
                setSelectedCategoryId(null)
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
            >
              Back to Start
            </button>
          )}
          <button
            onClick={handleSubmitVote}
            disabled={loading || !selectedCategoryId}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Award className="h-4 w-4" />
            {loading ? 'Submitting...' : 'Submit Vote'}
          </button>
        </>
      )}
    </div>
  )
}
