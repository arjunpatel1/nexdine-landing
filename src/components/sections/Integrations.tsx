'use client'

import { motion, useAnimationFrame } from 'framer-motion'
import {
  ArrowRight,
  ChefHat,
  ClipboardList,
  Package,
  RefreshCw,
  ShoppingBag,
  TabletSmartphone,
  Truck,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'

/* ------------------------------------------------------------------ */
/*  Brand Tree Data                                                    */
/* ------------------------------------------------------------------ */

const platformBrands = [
  { name: 'Swiggy', color: '#fc8019', y: 0 },
  { name: 'Zomato', color: '#e23744', y: 50 },
  { name: 'Uber Eats', color: '#06c167', y: 100 },
  { name: 'ONDC', color: '#ef4444', y: 150 },
  { name: 'Blinkit', color: '#f9c935', y: 200 },
  { name: 'Dunzo', color: '#00d28e', y: 250 },
  { name: 'Magicpin', color: '#7c3aed', y: 300 },
  { name: 'Porter', color: '#2563eb', y: 350 },
]

/* ------------------------------------------------------------------ */
/*  Animated Data Particles along the tree paths                       */
/* ------------------------------------------------------------------ */

function useParticles (count: number, speed: number, paths: { start: number, end: number }[]) {
  const [particles, setParticles] = useState(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      pathIdx: i % paths.length,
      progress: (i / count) * 100,
    })),
  )

  useAnimationFrame((_, delta) => {
    const dt = delta * speed * 0.001
    setParticles(prev =>
      prev.map(p => {
        let np = p.progress + dt
        if (np > 100) {
          np = 0
          return { ...p, progress: np, pathIdx: (p.pathIdx + 1) % paths.length }
        }
        return { ...p, progress: np }
      }),
    )
  })

  return particles
}

/* ------------------------------------------------------------------ */
/*  Connection Tree SVG                                                */
/* ------------------------------------------------------------------ */

function ConnectionTree () {
  const treeW = 420
  const treeH = 400
  const leftX = 30
  const centerX = 210
  const hubX = 360
  const hubY = 200

  const pathDefs = platformBrands.map(b => {
    const y = b.y + 24
    const c1x = centerX - 30
    const c1y = y
    const c2x = centerX + 30
    const c2y = hubY
    return {
      name: b.name,
      color: b.color,
      d: `M ${leftX + 60} ${y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${hubX - 30} ${hubY}`,
    }
  })

  const particles = useParticles(12, 8, pathDefs.map((_, i) => ({ start: i, end: i })))

  return (
    <div className="relative w-full flex justify-center select-none">
      <svg
        viewBox={`0 0 ${treeW} ${treeH}`}
        className="w-full max-w-[480px] h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F57C00" />
            <stop offset="100%" stopColor="#fb9411" />
          </linearGradient>
        </defs>

        {/* Connector paths */}
        {pathDefs.map(p => (
          <motion.path
            key={p.name}
            d={p.d}
            fill="none"
            stroke="url(#hubGrad)"
            strokeWidth={1.5}
            strokeOpacity={0.25}
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        ))}

        {/* Flowing particles */}
        {particles.map(pt => {
          const path = pathDefs[pt.pathIdx]
          return (
            <motion.circle
              key={pt.id}
              r={3.5}
              fill={path.color}
              filter="url(#glow)"
              opacity={0.85}
            >
              <animateMotion
                dur={`${8 + pt.id * 0.4}s`}
                repeatCount="indefinite"
                path={path.d}
                begin={`-${(pt.progress / 100) * (8 + pt.id * 0.4)}s`}
              />
            </motion.circle>
          )
        })}

        {/* Left brand logo nodes */}
        {platformBrands.map((b, i) => {
          const initials = b.name
            .split(/\s+/)
            .map(w => w[0])
            .join('')
            .toUpperCase()
          return (
            <motion.g
              key={b.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              {/* Pill background */}
              <rect
                x={leftX}
                y={b.y}
                width={132}
                height={44}
                rx={22}
                fill="#111111"
                stroke={b.color}
                strokeWidth={1.5}
                strokeOpacity={0.35}
              />
              {/* Colored initial circle */}
              <circle
                cx={leftX + 24}
                cy={b.y + 22}
                r={14}
                fill={b.color}
                opacity={0.15}
              />
              <text
                x={leftX + 24}
                y={b.y + 27}
                textAnchor="middle"
                fill={b.color}
                fontSize={11}
                fontWeight={700}
                fontFamily="Inter, sans-serif"
              >
                {initials}
              </text>
              {/* Brand name */}
              <text
                x={leftX + 46}
                y={b.y + 27}
                fill="#e5e5e5"
                fontSize={12}
                fontWeight={600}
                fontFamily="Inter, sans-serif"
              >
                {b.name}
              </text>
            </motion.g>
          )
        })}

        {/* Central hub */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
        >
          <circle
            cx={hubX}
            cy={hubY}
            r={38}
            fill="url(#hubGrad)"
            opacity={0.15}
          />
          <circle
            cx={hubX}
            cy={hubY}
            r={28}
            fill="url(#hubGrad)"
            opacity={0.9}
          />
          <text
            x={hubX}
            y={hubY + 5}
            textAnchor="middle"
            fill="#fff"
            fontSize={13}
            fontWeight={700}
            fontFamily="Inter, sans-serif"
          >
            NexDine
          </text>
          {/* Pulse ring */}
          <motion.circle
            cx={hubX}
            cy={hubY}
            r={28}
            fill="none"
            stroke="#F57C00"
            strokeWidth={2}
            animate={{ r: [28, 44, 28], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Waiter Service Visual                                              */
/* ------------------------------------------------------------------ */

function WaiterServiceVisual () {
  const steps = [
    { icon: TabletSmartphone, label: 'Order Placed', color: '#F57C00' },
    { icon: ChefHat, label: 'Kitchen Fires', color: '#fb9411' },
    { icon: UtensilsCrossed, label: 'Ready to Serve', color: '#e23744' },
    { icon: Truck, label: 'Delivered', color: '#06c167' },
  ]

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 py-8">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <motion.div
            className="relative flex flex-col items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: `${step.color}18`, border: `1.5px solid ${step.color}40` }}
              animate={{ boxShadow: [`0 0 0px ${step.color}00`, `0 0 20px ${step.color}40`, `0 0 0px ${step.color}00`] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <step.icon className="h-6 w-6" style={{ color: step.color }} />
            </motion.div>
            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
              {step.label}
            </span>
          </motion.div>

          {i < steps.length - 1 && (
            <motion.div
              className="hidden md:flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.3 }}
            >
              <motion.div
                className="h-[2px] w-10 bg-gradient-to-r from-orange-500/40 to-orange-500/80 rounded-full"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-orange-500"
                animate={{ x: [0, 38, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature Cards                                                      */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: ShoppingBag,
    title: 'Order Sync',
    desc: 'Every order from every platform lands in one unified kitchen queue. No tablet juggling.',
  },
  {
    icon: Package,
    title: 'Product Sync',
    desc: 'Update a product once in NexDine and it reflects across all connected platforms instantly.',
  },
  {
    icon: ClipboardList,
    title: 'Menu Sync',
    desc: 'Manage pricing, availability, modifiers, and photos from a single menu manager.',
  },
  {
    icon: RefreshCw,
    title: 'Status Sync',
    desc: 'Real-time status push — Accepted, Preparing, Ready, Dispatched — keeps customers informed.',
  },
]

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function Integrations () {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
            <Zap className="h-4 w-4 text-orange-500" />
            Aggregator Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            One Platform.
            {' '}
            <span className="gradient-text">Every Channel.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect Swiggy, Zomato, Uber Eats, Blinkit, and more. NexDine unifies orders,
            menus, inventory, and status across every delivery channel you use.
          </p>
        </motion.div>

        {/* Animated Connection Tree */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="rounded-2xl border border-border bg-gradient-to-b from-card/50 to-card/30 backdrop-blur-sm p-6 md:p-8">
            <ConnectionTree />
          </div>
        </motion.div>

        {/* Waiter Service Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-foreground">From Order to Delivery</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Every step tracked, every status synced, every platform covered.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-sm px-4">
            <WaiterServiceVisual />
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="absolute -inset-px bg-gradient-to-b from-orange-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <motion.div
                  className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <feature.icon className="h-5 w-5 text-orange-500" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link
            href="/pos-demo"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-shadow"
          >
            Explore the POS Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
