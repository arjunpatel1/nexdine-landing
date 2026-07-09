'use client'

import { useState, useRef, useEffect } from 'react'
import type { CategoryType } from '@/types/award'

const awardCategories: CategoryType[] = [
  { id: 1, name: 'Best Fine Dining' },
  { id: 2, name: 'Best Casual Dining' },
  { id: 3, name: 'Best Cafe & Desserts' },
  { id: 4, name: 'Best Quick Service Restaurant' },
  { id: 5, name: 'Best Restaurant Technology' },
]

const initialFormData = {
  restaurantName: '',
  ownerName: '',
  mobile: '',
  location: '',
  address: '',
  description: '',
  categories: [] as number[],
}

// OTP flow states
type OtpState = 'idle' | 'sent' | 'verified'

export default function AwardAboutClient() {
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [catOpen, setCatOpen] = useState(false)

  // OTP state
  const [otpState, setOtpState] = useState<OtpState>('idle')
  const [otpValue, setOtpValue] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpAttempts, setOtpAttempts] = useState(0)
  const [otpResendTimer, setOtpResendTimer] = useState(0)
  const resendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  
  // Store the actual OTP from API (in production this should be stored server-side)


  // Whether the secondary fields are unlocked
  const fieldsUnlocked = otpState === 'verified'

  // ── helpers ──────────────────────────────────────────────────────────────

  const startResendCountdown = () => {
    setOtpResendTimer(30)
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current)
    resendIntervalRef.current = setInterval(() => {
      setOtpResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(resendIntervalRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleGenerateOtp = async () => {
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setErrors((prev) => ({ ...prev, mobile: 'Enter a valid 10-digit mobile number.' }))
      return
    }
    if (!formData.ownerName.trim()) {
      setErrors((prev) => ({ ...prev, ownerName: 'Owner name is required before sending OTP.' }))
      return
    }
    setErrors((prev) => ({ ...prev, mobile: '', ownerName: '' }))
    setOtpValue('')
    setOtpError('')
    setOtpAttempts(0)
    
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }
      
      setOtpState('sent')
      startResendCountdown()
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.')
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP.')
      return
    }

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile, otp: otpValue })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setOtpError(data.error || 'Invalid OTP. Please try again.')
        
        const newAttempts = otpAttempts + 1
        setOtpAttempts(newAttempts)
        
        if (newAttempts >= 3) {
          setOtpError('Maximum attempts reached. Please request a new OTP or edit your number.')
        }
        return
      }

      setOtpState('verified')
      setOtpError('')
      setOtpAttempts(0)
    } catch (err) {
      setOtpError('An error occurred while verifying the OTP.')
    }
  }

  const handleResendOtp = async () => {
    if (otpResendTimer > 0) return
    setOtpValue('')
    setOtpError('')
    setOtpAttempts(0)
    
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      })
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend OTP')
      }
      
      startResendCountdown()
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Failed to resend OTP. Please try again.')
    }
  }

  const handleChange = (field: keyof typeof initialFormData, value: string | number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  // ── validation ────────────────────────────────────────────────────────────

  const validate = () => {
    const nextErrors: Record<string, string> = {}

    if (!formData.ownerName.trim()) nextErrors.ownerName = 'Owner name is required.'
    if (!/^[0-9]{10}$/.test(formData.mobile)) nextErrors.mobile = 'Enter a valid 10-digit mobile number.'
    if (otpState !== 'verified') nextErrors.otp = 'Please verify your mobile number with OTP.'
    if (!formData.restaurantName.trim()) nextErrors.restaurantName = 'Restaurant name is required.'
    if (!formData.location.trim()) nextErrors.location = 'Location is required.'
    if (!formData.address.trim()) nextErrors.address = 'Full address is required.'
    if (!formData.description.trim()) nextErrors.description = 'Description is required.'
    if (!formData.categories.length) nextErrors.categories = 'Please select at least one category.'
    if (!logoFile) nextErrors.logo = 'Please upload a restaurant logo.'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return

    let logoData = null
    if (logoFile) {
      try {
        logoData = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(logoFile)
        })
      } catch (e) {
        console.error('Failed to read logo file', e)
      }
    }

    const payload = {
      restaurant_name: formData.restaurantName,
      owner_name: formData.ownerName,
      mobile: formData.mobile,
      location: formData.location,
      address: formData.address,
      description: formData.description,
      status: 'pending',
      categories: awardCategories.filter(c => formData.categories.includes(c.id)),
      logo: logoData,
      user: { mobile: formData.mobile }
    }

    try {
      const res = await fetch('/api/award/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to submit nomination')
      setSuccessMessage('Restaurant nominated successfully! Waiting for admin approval.')
      setOpenModal(false)
      setFormData(initialFormData)
      setLogoFile(null)
      setOtpState('idle')
      setOtpValue('')
    } catch (err) {
      console.error(err)
      setSuccessMessage('Failed to submit nomination. Please try again.')
    }
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setOtpState('idle')
    setOtpValue('')
    setOtpError('')
    setOtpAttempts(0)
    setErrors({})
    if (resendIntervalRef.current) clearInterval(resendIntervalRef.current)
  }

  // ── shared class builders ─────────────────────────────────────────────────

  const inputCls = (disabled: boolean) =>
    `w-full rounded-3xl border px-4 py-3 text-sm outline-none transition ${
      disabled
        ? 'border-border/30 bg-background/30 text-muted-foreground/50 cursor-not-allowed opacity-50'
        : 'border-border bg-background text-white focus:border-primary'
    }`

  const textareaCls = (disabled: boolean) =>
    `w-full rounded-3xl border px-4 py-3 text-sm outline-none transition resize-none ${
      disabled
        ? 'border-border/30 bg-background/30 text-muted-foreground/50 cursor-not-allowed opacity-50'
        : 'border-border bg-background text-white focus:border-primary'
    }`

  const labelSpanCls = (disabled: boolean) =>
    `text-white flex items-center gap-1 ${disabled ? 'opacity-50' : ''}`

  const RequiredStar = () => <span className="text-rose-400 text-xs">*</span>

  const LockIcon = () => (
    <svg
      className="inline-block w-3.5 h-3.5 text-muted-foreground/60 ml-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-border bg-card p-8 shadow-sm shadow-primary/5">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  🏆
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">About the Award</p>
                  <h2 className="text-3xl font-semibold mt-2">Honoring culinary mastery, service and dining excellence.</h2>
                </div>
              </div>
              <p className="text-base leading-8 text-muted-foreground">
                The Restaurant Excellence Awards honors establishments that set the benchmark for culinary mastery, ambient dining experience, and superior service. Nominations are reviewed by the event administrators to verify location, documentation, and category relevance.
              </p>
              <p className="text-base leading-8 text-muted-foreground mt-5">
                Approved restaurants will enter the public voting directory, where diners can vote using secure mobile validation. This creates a fair and transparent system that rewards real customer favorites.
              </p>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Register to Nominate
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              {[
                {
                  question: 'Who is eligible to nominate a restaurant?',
                  answer: 'Any restaurant owner, manager, or representative can nominate their restaurant. Nominations require a physical address, owner details, and a high-resolution logo.',
                },
                {
                  question: 'How does the public voting system work?',
                  answer: 'Voters search for restaurants by location and vote in specific categories using secure mobile validation. Each phone number is limited to one vote per category.',
                },
                {
                  question: 'Can a restaurant be nominated in multiple categories?',
                  answer: 'Yes. Restaurants are encouraged to nominate themselves in every category that fits their specialty.',
                },
              ].map((item) => (
                <details key={item.question} className="group rounded-3xl border border-border bg-background/50 p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-white">
                    {item.question}
                    <span className="text-primary transition-transform duration-200 group-open:rotate-180">⌄</span>
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </section>
          </div>

          <aside className="space-y-6 lg:pt-8">
            <section className="rounded-3xl border border-border bg-card p-8">
              <h3 className="text-xl font-semibold mb-5">Terms &amp; Conditions</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✅ Only authorized owners or representatives may register.</li>
                <li>✅ All nominations are reviewed before approval.</li>
                <li>✅ Addresses must be accurate and verifiable.</li>
                <li>✅ Voting fairness is enforced with one vote per phone number per category.</li>
                <li>✅ Submitting a logo grants promotional usage rights.</li>
                <li>✅ Award committee decisions are final.</li>
              </ul>
            </section>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-3">What we evaluate</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Quality of food and presentation.</li>
                  <li>Service standards and guest experience.</li>
                  <li>Innovation in menu and dining ambience.</li>
                  <li>Consistency across locations.</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold mb-3">Why nominate?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Gain visibility among local diners.</li>
                  <li>Showcase your restaurant across award categories.</li>
                  <li>Earn trust from guests and partners.</li>
                  <li>Celebrate the team&apos;s hard work and achievements.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-3xl border border-primary bg-primary/10 px-5 py-4 text-sm text-primary shadow-xl shadow-primary/10">
          {successMessage}
        </div>
      )}

      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6">
          <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl">

            {/* ── Modal Header ── */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Nomination</p>
                <h2 className="text-2xl font-semibold">Nominate Your Restaurant</h2>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-white"
                aria-label="Close nomination modal"
              >
                ✕
              </button>
            </div>

            {/* ── OTP unlock banner ── */}
            {!fieldsUnlocked && (
              <div className="mx-6 mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                </svg>
                <p className="text-xs leading-5 text-amber-300">
                  Enter your <strong>Owner Name</strong> and <strong>Mobile Number</strong>, then verify with OTP to unlock the remaining fields. All fields are mandatory.
                </p>
              </div>
            )}

            {fieldsUnlocked && (
              <div className="mx-6 mt-4 flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <svg className="h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-xs text-emerald-300">
                  Mobile verified! All fields are now unlocked. Please fill in the remaining details.
                </p>
              </div>
            )}

            {/* ── Form ── */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                {/* Row 1 – Owner Name + Mobile */}
                <div className="grid gap-4 md:grid-cols-2">

                  {/* Owner Name */}
                  <label className="space-y-2 text-sm text-muted-foreground">
                    <span className={labelSpanCls(false)}>
                      Owner Name <RequiredStar />
                    </span>
                    <input
                      required
                      value={formData.ownerName}
                      onChange={(e) => handleChange('ownerName', e.target.value)}
                      disabled={otpState === 'verified'}
                      className={inputCls(otpState === 'verified')}
                      placeholder="Owner name"
                      id="ownerName"
                    />
                    {errors.ownerName && <p className="text-xs text-rose-400">{errors.ownerName}</p>}
                  </label>

                  {/* Mobile Number */}
                  <label className="space-y-2 text-sm text-muted-foreground">
                    <span className={labelSpanCls(false)}>
                      Mobile Number <RequiredStar />
                    </span>
                    <div className="flex gap-2">
                      <input
                        required
                        value={formData.mobile}
                        onChange={(e) => {
                          if (otpState !== 'verified') {
                            handleChange('mobile', e.target.value.replace(/\D/g, ''))
                            // Reset OTP if number changes
                            if (otpState === 'sent') {
                              setOtpState('idle')
                              setOtpValue('')
                              setOtpError('')
                            }
                          }
                        }}
                        maxLength={10}
                        disabled={otpState === 'verified' || otpState === 'sent'}
                        className={`flex-1 rounded-3xl border px-4 py-3 text-sm outline-none transition ${
                          otpState === 'verified' || otpState === 'sent'
                            ? 'border-border/30 bg-background/30 text-muted-foreground/50 cursor-not-allowed opacity-50'
                            : 'border-border bg-background text-white focus:border-primary'
                        }`}
                        placeholder="Enter 10-digit mobile"
                        id="mobile"
                      />
                      {otpState === 'idle' && (
                        <button
                          type="button"
                          onClick={handleGenerateOtp}
                          className="rounded-3xl border border-primary bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20 whitespace-nowrap"
                        >
                          Generate OTP
                        </button>
                      )}
                      {otpState === 'sent' && (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpState('idle')
                            setOtpValue('')
                            setOtpError('')
                            setOtpAttempts(0)
                          }}
                          className="rounded-3xl border border-primary bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/20 whitespace-nowrap"
                        >
                          Edit Number
                        </button>
                      )}
                      {otpState === 'verified' && (
                        <span className="flex items-center gap-1 rounded-3xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs font-semibold text-emerald-400 whitespace-nowrap">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    {errors.mobile && <p className="text-xs text-rose-400">{errors.mobile}</p>}
                  </label>
                </div>

                {/* ── OTP Entry (shown only when sent, not yet verified) ── */}
                {otpState === 'sent' && (
                  <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      OTP sent to <span className="font-semibold text-white">+91 {formData.mobile}</span>. Enter it below to unlock the form.
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otpValue}
                        onChange={(e) => {
                          setOtpValue(e.target.value.replace(/\D/g, ''))
                          setOtpError('')
                        }}
                        placeholder="Enter 6-digit OTP"
                        className="flex-1 rounded-3xl border border-border bg-background px-4 py-3 text-sm text-white outline-none transition focus:border-primary tracking-[0.3em]"
                        id="otpInput"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                      >
                        Verify OTP
                      </button>
                    </div>
                    {otpError && <p className="text-xs text-rose-400">{otpError}</p>}
                    <p className="text-xs text-muted-foreground">
                      Didn&apos;t receive OTP?{' '}
                      {otpResendTimer > 0 ? (
                        <span className="text-primary/70">Resend in {otpResendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="text-primary underline underline-offset-2 hover:opacity-80"
                        >
                          Resend OTP
                        </button>
                      )}
                    </p>
                    {errors.otp && <p className="text-xs text-rose-400">{errors.otp}</p>}
                  </div>
                )}

                {/* Row 2 – Restaurant Name + Location */}
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-muted-foreground">
                    <span className={labelSpanCls(!fieldsUnlocked)}>
                      Restaurant Name <RequiredStar />
                      {!fieldsUnlocked && <LockIcon />}
                    </span>
                    <input
                      required
                      value={formData.restaurantName}
                      onChange={(e) => handleChange('restaurantName', e.target.value)}
                      disabled={!fieldsUnlocked}
                      className={inputCls(!fieldsUnlocked)}
                      placeholder="Restaurant name"
                      id="restaurantName"
                    />
                    {errors.restaurantName && <p className="text-xs text-rose-400">{errors.restaurantName}</p>}
                  </label>

                  <label className="space-y-2 text-sm text-muted-foreground">
                    <span className={labelSpanCls(!fieldsUnlocked)}>
                      Location <RequiredStar />
                      {!fieldsUnlocked && <LockIcon />}
                    </span>
                    <input
                      required
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      disabled={!fieldsUnlocked}
                      className={inputCls(!fieldsUnlocked)}
                      placeholder="City / area"
                      id="location"
                    />
                    {errors.location && <p className="text-xs text-rose-400">{errors.location}</p>}
                  </label>
                </div>

                {/* Full Address */}
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span className={labelSpanCls(!fieldsUnlocked)}>
                    Full Address <RequiredStar />
                    {!fieldsUnlocked && <LockIcon />}
                  </span>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    disabled={!fieldsUnlocked}
                    rows={3}
                    className={textareaCls(!fieldsUnlocked)}
                    placeholder="Full restaurant address"
                    id="address"
                  />
                  {errors.address && <p className="text-xs text-rose-400">{errors.address}</p>}
                </label>

                {/* Description */}
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span className={labelSpanCls(!fieldsUnlocked)}>
                    Description <RequiredStar />
                    {!fieldsUnlocked && <LockIcon />}
                  </span>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    disabled={!fieldsUnlocked}
                    rows={4}
                    className={textareaCls(!fieldsUnlocked)}
                    placeholder="Describe your restaurant"
                    id="description"
                  />
                  {errors.description && <p className="text-xs text-rose-400">{errors.description}</p>}
                </label>

                {/* Nomination Categories */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-semibold ${!fieldsUnlocked ? 'text-white/50' : 'text-white'}`}>
                      Nomination Categories
                    </span>
                    <span className="text-rose-400 text-xs">*</span>
                    {!fieldsUnlocked && <LockIcon />}
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { if (fieldsUnlocked) setCatOpen((s) => !s) }}
                      disabled={!fieldsUnlocked}
                      aria-haspopup="listbox"
                      aria-expanded={catOpen}
                      className={`w-full justify-between rounded-3xl border px-4 py-3 text-left text-sm flex items-center transition ${
                        !fieldsUnlocked
                          ? 'border-border/30 bg-background/30 text-muted-foreground/50 cursor-not-allowed opacity-50'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <span>
                        {formData.categories.length
                          ? awardCategories
                              .filter((c) => formData.categories.includes(c.id))
                              .map((c) => c.name)
                              .join(', ')
                          : 'Select one or more categories'}
                      </span>
                      <span className="ml-3 text-muted-foreground">▾</span>
                    </button>

                    {catOpen && fieldsUnlocked && (
                      <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-card p-3 shadow-lg">
                        <div className="grid gap-2">
                          {awardCategories.map((category) => {
                            const checked = formData.categories.includes(category.id)
                            return (
                              <label key={category.id} className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-background/30">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => {
                                    const next = e.target.checked
                                      ? [...formData.categories, category.id]
                                      : formData.categories.filter((id) => id !== category.id)
                                    handleChange('categories', next)
                                  }}
                                  className="h-4 w-4 rounded border text-primary focus:ring-primary"
                                />
                                <span className="text-sm text-white">{category.name}</span>
                              </label>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {errors.categories && <p className="text-xs text-rose-400">{errors.categories}</p>}
                </div>

                {/* Restaurant Logo */}
                <label className="space-y-2 text-sm text-muted-foreground">
                  <span className={labelSpanCls(!fieldsUnlocked)}>
                    Restaurant Logo <RequiredStar />
                    {!fieldsUnlocked && <LockIcon />}
                  </span>
                  <input
                    required
                    type="file"
                    accept="image/*"
                    disabled={!fieldsUnlocked}
                    onChange={(e) => { if (fieldsUnlocked) setLogoFile(e.target.files?.[0] ?? null) }}
                    className={`text-sm ${!fieldsUnlocked ? 'opacity-50 cursor-not-allowed' : 'text-muted-foreground'}`}
                    id="logoFile"
                  />
                  {logoFile && <p className="text-xs text-muted-foreground">Selected: {logoFile.name}</p>}
                  {errors.logo && <p className="text-xs text-rose-400">{errors.logo}</p>}
                </label>

                {/* Submit Row */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to the terms and allow NexDine to review and publish your nomination.
                  </p>
                  <button
                    type="submit"
                    disabled={!fieldsUnlocked}
                    className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                      fieldsUnlocked
                        ? 'bg-primary text-primary-foreground hover:opacity-90'
                        : 'bg-primary/30 text-primary-foreground/50 cursor-not-allowed'
                    }`}
                  >
                    Submit Nomination
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
