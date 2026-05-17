'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { useState } from 'react'

export default function Newsletter () {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      return
    }
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-950/30 via-background to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 sm:p-10 text-center"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 mx-auto">
            <Mail className="h-5 w-5" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Stay ahead of the curve
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Get the latest restaurant tech insights, product updates, and industry trends delivered to your inbox. No spam, unsubscribe anytime.
          </p>

          {submitted
            ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-emerald-400 font-medium"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>You&apos;re on the list! We&apos;ll be in touch soon.</span>
                </motion.div>
              )
            : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
                >
                  <div className="relative flex-1 w-full">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

          <p className="text-xs text-muted-foreground mt-4">
            Join 2,000+ restaurant owners and operators.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
