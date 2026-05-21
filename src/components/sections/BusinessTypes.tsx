'use client'

import { motion } from 'framer-motion'
import {
  Beer,
  Building2,
  Cake,
  ChefHat,
  Coffee,
  IceCream,
  Pizza,
  Sandwich,
  Store,
  UtensilsCrossed,
} from 'lucide-react'

const businessTypes = [
  {
    icon: UtensilsCrossed,
    title: 'Fine Dine',
    desc: 'Course management, split bills, reservations, and premium service tools.',
    color: '#e23744',
  },
  {
    icon: Sandwich,
    title: 'QSR & Fast Food',
    desc: 'Token management, fast billing, self-ordering kiosks, and drive-thru support.',
    color: '#fc8019',
  },
  {
    icon: ChefHat,
    title: 'Cloud Kitchen',
    desc: 'Multi-brand menus, aggregator integration, kitchen display, and delivery tracking.',
    color: '#06c167',
  },
  {
    icon: Coffee,
    title: 'Café & Coffee Shop',
    desc: 'Quick-tap ordering, loyalty programs, combo deals, and takeaway management.',
    color: '#8b5cf6',
  },
  {
    icon: Beer,
    title: 'Bar & Brewery',
    desc: 'Tab management, happy-hour pricing, age verification, and inventory tracking.',
    color: '#f59e0b',
  },
  {
    icon: Cake,
    title: 'Bakery',
    desc: 'Pre-order management, daily production tracking, and custom cake orders.',
    color: '#ec4899',
  },
  {
    icon: Pizza,
    title: 'Pizzeria',
    desc: 'Modifier-heavy menus, half-and-half combos, delivery zones, and prep timers.',
    color: '#ef4444',
  },
  {
    icon: IceCream,
    title: 'Desserts & Ice Cream',
    desc: 'Flavor combos, seasonal menus, loyalty cards, and temperature-sensitive inventory.',
    color: '#14b8a6',
  },
  {
    icon: Building2,
    title: 'Food Court & Canteen',
    desc: 'Multi-vendor billing, shared seating, corporate meal plans, and prepaid cards.',
    color: '#3b82f6',
  },
  {
    icon: Store,
    title: 'Large Chains',
    desc: 'Centralized menu control, franchise reports, multi-location analytics, and audit trails.',
    color: '#6366f1',
  },
]

export default function BusinessTypes () {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
            <Store className="h-4 w-4 text-primary" />
            <span>Built for All</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            One Platform for
            {' '}
            <span className="gradient-text">Every Food Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you run a single café or a chain of 100 outlets, NexDine adapts to your format with
            industry-specific features out of the box.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {businessTypes.map((biz, i) => (
            <motion.div
              key={biz.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div
                  className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors"
                  style={{ backgroundColor: `${biz.color}15` }}
                >
                  <biz.icon className="h-5 w-5" style={{ color: biz.color }} />
                </div>
                <h3 className="text-sm font-semibold mb-1">{biz.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{biz.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
