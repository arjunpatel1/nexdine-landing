'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, BarChart3, ChefHat, CircleDot, CreditCard, Globe,
  Store, Truck,
} from 'lucide-react'
import { useRef } from 'react'

const workflowSteps = [
  {
    icon: Globe,
    title: 'Online Orders',
    sources: ['QR Scan', 'Website', 'App'],
    desc: 'Customers order through QR codes, your website, or mobile app. All channels feed into one unified order queue.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Truck,
    title: 'Aggregator Orders',
    sources: ['Swiggy', 'Zomato', 'UberEats'],
    desc: 'Delivery platform orders auto-accept and route to the kitchen. No more juggling multiple tablets.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Store,
    title: 'Walk-in & Reservations',
    sources: ['Host Stand', 'Phone', 'Online'],
    desc: 'Walk-ins are seated via the visual floor plan. Reservations sync from Google, website, and phone bookings.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: ChefHat,
    title: 'Kitchen Display System',
    sources: ['Grill', 'Fryer', 'Salad', 'Dessert'],
    desc: 'Orders auto-route to the correct station. Timers, alerts, and course management keep the kitchen humming.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: CreditCard,
    title: 'Payment & Billing',
    sources: ['Cash', 'Card', 'UPI', 'Wallet'],
    desc: 'Split bills, combine tables, apply discounts, and accept every payment method — all from one screen.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    sources: ['Sales', 'Inventory', 'Staff', 'Customers'],
    desc: 'Real-time dashboards reveal what is working, what is not, and where to optimize for maximum profit.',
    color: 'from-orange-500 to-amber-600',
  },
]

export default function Workflow () {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-sky-950/[0.03] to-background" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Unified Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            One Platform, Every Channel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every order — whether it comes from a QR scan, a delivery app, or a walk-in — flows through the same system. One menu. One kitchen. One truth.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line SVG */}
          <svg
            className="absolute left-8 top-0 bottom-0 w-1 hidden lg:block"
            style={{ height: '100%' }}
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="8 4"
              style={{ pathLength }}
            />
          </svg>

          <div className="space-y-12 lg:space-y-16">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex lg:col-span-1 justify-center">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`h-4 w-4 rounded-full bg-gradient-to-br ${step.color} shadow-lg ring-4 ring-background`}
                  />
                </div>

                {/* Content */}
                <div className={`lg:col-span-5 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} mb-4 shadow-lg`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.sources.map(source => (
                      <span key={source} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <motion.div
                  className={`lg:col-span-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkflowVisual step={index} color={step.color} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkflowVisual ({ step, color }: { step: number, color: string }) {
  const renderVisual = () => {
    switch (step) {
      case 0: {
        return (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'QR Scan', icon: 'QR' },
              { label: 'Website', icon: 'WEB' },
              { label: 'Mobile App', icon: 'APP' },
            ].map(source => (
              <div key={source.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <div className="h-10 w-10 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                  {source.icon}
                </div>
                <p className="text-xs font-medium">{source.label}</p>
              </div>
            ))}
          </div>
        )
      }
      case 1: {
        return (
          <div className="space-y-2">
            {[
              { name: 'Swiggy', orders: '12', color: 'bg-orange-500/20 text-orange-400' },
              { name: 'Zomato', orders: '8', color: 'bg-red-500/20 text-red-400' },
              { name: 'UberEats', orders: '5', color: 'bg-green-500/20 text-green-400' },
            ].map(platform => (
              <div key={platform.name} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <span className="text-sm font-medium">{platform.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${platform.color}`}>
                    {platform.orders}
                    {' '}
                    orders
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )
      }
      case 2: {
        return (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const statuses = ['free', 'free', 'busy', 'free', 'reserved', 'free', 'busy', 'free', 'free', 'busy', 'free', 'reserved']
              const status = statuses[i]
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold border-2 ${
                    status === 'busy'
                      ? 'border-red-500/30 bg-red-500/10 text-red-400'
                      : (status === 'reserved'
                          ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                          : 'border-green-500/30 bg-green-500/10 text-green-400')
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        )
      }
      case 3: {
        return (
          <div className="space-y-2">
            {[
              { station: 'Grill Station', items: '4 items', time: 'Busy', color: 'text-orange-400' },
              { station: 'Fryer Station', items: '2 items', time: 'Moderate', color: 'text-yellow-400' },
              { station: 'Cold Station', items: '6 items', time: 'Available', color: 'text-green-400' },
            ].map(s => (
              <div key={s.station} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div>
                  <p className="text-sm font-medium">{s.station}</p>
                  <p className="text-xs text-muted-foreground">{s.items}</p>
                </div>
                <span className={`text-xs font-medium ${s.color}`}>{s.time}</span>
              </div>
            ))}
          </div>
        )
      }
      case 4: {
        return (
          <div className="space-y-2">
            {[
              { method: 'Cash', count: '18%', active: false },
              { method: 'Card / UPI', count: '62%', active: true },
              { method: 'Wallet', count: '20%', active: false },
            ].map(m => (
              <div key={m.method} className="flex items-center gap-3">
                <span className="text-xs w-20 text-muted-foreground">{m.method}</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: m.count }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className={`h-full rounded-full ${m.active ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-muted-foreground/20'}`}
                  />
                </div>
                <span className="text-xs font-medium w-10">{m.count}</span>
              </div>
            ))}
          </div>
        )
      }
      case 5: {
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Revenue', value: '₹24.5K', change: '+12%' },
                { label: 'Orders', value: '1,284', change: '+8%' },
              ].map(stat => (
                <div key={stat.label} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-green-400">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-end gap-1 h-16">
                {[45, 70, 55, 85, 60, 95, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex-1 rounded-t bg-gradient-to-t from-orange-500/30 to-orange-500"
                  />
                ))}
              </div>
            </div>
          </div>
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div className="relative rounded-2xl border border-border bg-card p-5 shadow-xl">
      {renderVisual()}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-400/5 rounded-3xl blur-xl -z-10" />
    </div>
  )
}
