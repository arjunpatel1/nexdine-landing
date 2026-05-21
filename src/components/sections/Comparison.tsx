'use client'

import { motion } from 'framer-motion'
import { Check, Scale, X } from 'lucide-react'

const competitors = ['Petpooja', 'POSist (Now Restroworks)']

const features = [
  { name: 'POS + Inventory + CRM (All Built-in)', nexdine: true, comp1: false, comp2: false },
  { name: 'QR Table Ordering (No App Needed)', nexdine: true, comp1: true, comp2: true },
  { name: 'Kitchen Display System (KDS)', nexdine: true, comp1: true, comp2: true },
  { name: 'WhatsApp Automation (Built-in)', nexdine: true, comp1: false, comp2: false },
  { name: 'Multi-Branch & Multi-Terminal', nexdine: true, comp1: true, comp2: true },
  { name: 'Visual Table Mapping & Floor Plans', nexdine: true, comp1: false, comp2: true },
  { name: 'Offline Mode with Auto-Sync', nexdine: true, comp1: true, comp2: false },
  { name: 'Self-Ordering Kiosk Support', nexdine: true, comp1: true, comp2: false },
  { name: 'AI-Powered Insights & Forecasting', nexdine: true, comp1: false, comp2: false },
  { name: 'No Hidden Costs or Add-on Fees', nexdine: true, comp1: false, comp2: false },
  { name: 'Free Dedicated Onboarding', nexdine: true, comp1: false, comp2: true },
  { name: 'Transparent Flat-Rate Pricing', nexdine: true, comp1: false, comp2: false },
]

export default function Comparison () {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
            <Scale className="h-4 w-4 text-primary" />
            <span>Compare</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why restaurants choose
            {' '}
            <span className="gradient-text">NexDine</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how NexDine stacks up against other popular restaurant POS platforms in India.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 gap-0 border-b border-border bg-card/80">
            <div className="px-4 py-4 sm:px-6 sm:py-5 text-sm font-semibold text-muted-foreground">
              Feature
            </div>
            <div className="px-4 py-4 sm:px-6 sm:py-5 text-center text-sm font-bold text-primary bg-primary/5">
              NexDine
            </div>
            <div className="px-4 py-4 sm:px-6 sm:py-5 text-center text-sm font-semibold text-muted-foreground">
              {competitors[0]}
            </div>
            <div className="px-4 py-4 sm:px-6 sm:py-5 text-center text-sm font-semibold text-muted-foreground">
              {competitors[1]}
            </div>
          </div>

          {/* Rows */}
          {features.map((feat, i) => (
            <div
              key={i}
              className={`grid grid-cols-4 gap-0 items-center ${
                i === features.length - 1 ? '' : 'border-b border-border/50'
              } ${i % 2 === 0 ? 'bg-transparent' : 'bg-card/30'}`}
            >
              <div className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-foreground font-medium">
                {feat.name}
              </div>
              <div className="px-4 py-3 sm:px-6 sm:py-4 flex justify-center bg-primary/5">
                <Check className="h-5 w-5 text-primary" strokeWidth={2.5} />
              </div>
              <div className="px-4 py-3 sm:px-6 sm:py-4 flex justify-center">
                {feat.comp1
                  ? (
                      <Check className="h-5 w-5 text-emerald-500" strokeWidth={2} />
                    )
                  : (
                      <X className="h-5 w-5 text-muted-foreground/40" strokeWidth={2} />
                    )}
              </div>
              <div className="px-4 py-3 sm:px-6 sm:py-4 flex justify-center">
                {feat.comp2
                  ? (
                      <Check className="h-5 w-5 text-emerald-500" strokeWidth={2} />
                    )
                  : (
                      <X className="h-5 w-5 text-muted-foreground/40" strokeWidth={2} />
                    )}
              </div>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Comparison based on publicly available feature lists as of 2026. Features may vary by plan.
        </p>
      </div>
    </section>
  )
}
