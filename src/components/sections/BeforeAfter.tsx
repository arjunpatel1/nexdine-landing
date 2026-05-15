'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check, Clock, AlertTriangle, Users, TrendingUp } from 'lucide-react'

const comparisons = [
  {
    category: 'Order Taking',
    before: { text: 'Waiter writes order on paper, walks to POS, manually enters items. 3-5 min per table.', icon: Clock, issues: ['Handwriting errors', 'Lost paper tickets', 'Double entry'] },
    after: { text: 'Waiter taps items on handheld device. Order fires to kitchen in under 2 seconds.', icon: TrendingUp, benefits: ['Zero transcription errors', 'Instant kitchen fire', 'Upsell prompts'] },
    stat: { label: 'Time saved per order', value: '85%' },
  },
  {
    category: 'Kitchen Communication',
    before: { text: 'Printed tickets pile up. Chef yells for servers. Orders get lost in the rush.', icon: AlertTriangle, issues: ['Lost tickets', 'Unreadable prints', 'No priority system'] },
    after: { text: 'Digital KDS routes orders by station. Color-coded timers. Auto-priority for VIP tables.', icon: Check, benefits: ['Auto-routing', 'Visual timers', 'Course management'] },
    stat: { label: 'Kitchen throughput', value: '+45%' },
  },
  {
    category: 'Table Management',
    before: { text: 'Host uses a paper floor chart. Tables double-booked. Walk-ins cause chaos.', icon: Users, issues: ['Double bookings', 'No waitlist tracking', 'Manual updates'] },
    after: { text: 'Live floor plan with drag-and-drop. Auto-reservation holds. SMS when table is ready.', icon: Check, benefits: ['Real-time occupancy', 'Online reservations', 'Auto-notifications'] },
    stat: { label: 'Table turnover', value: '+25%' },
  },
]

export default function BeforeAfter() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const current = comparisons[activeTab]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            The NexDine Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Before vs. After NexDine
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how NexDine transforms every aspect of your restaurant operations.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {comparisons.map((comp, i) => (
            <button
              key={comp.category}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                i === activeTab
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
              }`}
            >
              {comp.category}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Before NexDine</h3>
                <p className="text-sm text-muted-foreground">Manual, slow, error-prone</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{current.before.text}</p>

            <div className="space-y-3">
              {current.before.issues.map((issue, i) => (
                <motion.div
                  key={issue}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-red-500/5 border border-red-500/10 px-4 py-3"
                >
                  <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm">{issue}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-green-500/20 bg-green-500/[0.03] p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">With NexDine</h3>
                <p className="text-sm text-muted-foreground">Automated, fast, accurate</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{current.after.text}</p>

            <div className="space-y-3">
              {current.after.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-lg bg-green-500/5 border border-green-500/10 px-4 py-3"
                >
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3">
              <p className="text-xs text-green-400 font-medium uppercase tracking-wider">Result</p>
              <p className="text-2xl font-bold text-green-400">{current.stat.value}</p>
              <p className="text-sm text-muted-foreground">{current.stat.label}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
