'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DARK_BG = '#070F19'

export default function AdminLoginPage() {
  const router = useRouter()
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    if (!password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid credentials. Please try again.')
        return
      }

      // Session cookie is set by the API — redirect to dashboard
      router.push('/admin/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{
        background: `radial-gradient(circle at top, rgba(245,138,39,0.12), transparent 25%), ${DARK_BG}`,
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-[0_25px_120px_rgba(15,23,42,0.55)] sm:p-12">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-orange-600 bg-orange-500/10 text-orange-300 shadow-lg shadow-orange-400/10">
            🏆
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-orange-300">Awards admin</p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Admin portal login</h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Enter the registered admin mobile and password to access the NexDine Awards dashboard.
            </p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-700 bg-slate-950/90 p-8">
          {error && (
            <div className="mb-4 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-2 space-y-5">
            <label className="block text-sm font-semibold text-slate-200">
              Admin mobile number
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(event) => setMobile(event.target.value.replace(/\D/g, ''))}
                autoComplete="off"
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                placeholder="Enter admin mobile number"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-200">
              Password
              <div className="relative mt-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="off"
                  className="w-full rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 pr-24 text-white outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-700 bg-slate-850/90 px-3 py-2 text-sm text-slate-300 transition hover:border-orange-500 hover:text-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-3xl bg-orange-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Login as Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
