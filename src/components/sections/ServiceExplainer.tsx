'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ScanLine, Smartphone, ChefHat, Bell, CreditCard, Smile,
  ArrowRight, CheckCircle2, Circle
} from 'lucide-react'

const steps = [
  {
    icon: ScanLine,
    title: 'Customer Scans QR Code',
    desc: 'A unique QR code sits on every table. The customer opens their camera app, scans it, and the digital menu loads instantly in their browser. No app download, no registration, no friction.',
    details: ['Instant load (< 1 second)', 'Works on any smartphone', 'No data collection required'],
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
  },
  {
    icon: Smartphone,
    title: 'Browses & Customizes Order',
    desc: 'The responsive digital menu showcases your dishes with photos, descriptions, modifiers, and dietary tags. Customers tap to add items, choose sizes, add extras, and write special instructions.',
    details: ['High-res food photography', 'Dietary tags: vegan, gluten-free, spicy', 'Modifier upsells increase ticket size by 22%'],
    color: 'from-sky-400 to-orange-500',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-400',
  },
  {
    icon: ChefHat,
    title: 'Order Fires to Kitchen Display',
    desc: 'The moment the customer hits "Place Order," it appears on the correct kitchen station screen — grill, fryer, salad, or dessert — with itemized tickets, timers, and special instructions.',
    details: ['Auto-routing by item category', 'Color-coded priority flags', 'Course grouping: starter → main → dessert'],
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
  },
  {
    icon: Bell,
    title: 'Real-Time Status Updates',
    desc: 'Customers receive live updates on their order status — "Received," "Preparing," "Ready" — via the same browser page. For pickup orders, an SMS or WhatsApp notification goes out when ready.',
    details: ['Live status bar on customer device', 'WhatsApp/SMS ready notifications', 'Estimated wait time auto-calculated'],
    color: 'from-amber-400 to-amber-500',
    bgColor: 'bg-amber-500/10',
    textColor: 'text-amber-400',
  },
  {
    icon: CreditCard,
    title: 'Seamless Payment & Receipt',
    desc: 'Customers pay directly from their phone via Stripe, Razorpay, Apple Pay, or Google Pay. A digital receipt is emailed instantly. For dine-in, the bill can also be settled at the table by the waiter.',
    details: ['PCI-compliant payment processing', 'Split bill by person or item', 'Tip suggestions increase gratuity by 18%'],
    color: 'from-sky-400 to-orange-500',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-400',
  },
  {
    icon: Smile,
    title: 'Automatic Follow-Up & Loyalty',
    desc: 'After the meal, a feedback request is sent. Positive reviews are encouraged; negative ones trigger manager alerts. The customer is auto-enrolled in your loyalty program, earning points for their next visit.',
    details: ['Post-visit feedback survey', 'Loyalty points auto-credited', 'Win-back campaigns for lapsed customers'],
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-rose-500/10',
    textColor: 'text-rose-400',
  },
]

function StepConnector({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:flex flex-col items-center py-2">
      <div className={`w-0.5 h-16 rounded-full transition-all duration-700 ${active ? 'bg-gradient-to-b from-primary to-primary/30' : 'bg-border'}`} />
    </div>
  )
}

export default function ServiceExplainer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            From Scan to Satisfaction
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete customer journey powered by NexDine — designed to reduce wait times, eliminate order errors, and increase revenue per table.
          </p>
        </motion.div>

        {/* Progress Line (Desktop) */}
        <div className="hidden lg:block absolute left-1/2 top-48 bottom-48 w-0.5 -translate-x-1/2">
          <motion.div
            className="w-full bg-gradient-to-b from-primary to-primary/20 rounded-full origin-top"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="space-y-8 lg:space-y-0">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index > 0 ? 'lg:mt-8' : ''}`}
              >
                {/* Content */}
                <div className={`${isLeft ? 'lg:order-1 lg:text-right' : 'lg:order-2'}`}>
                  <div className={`inline-flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className={`text-sm font-bold ${step.textColor}`}>Step {String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">{step.desc}</p>

                  <div className={`space-y-2 ${isLeft ? 'lg:ml-auto' : ''}`}>
                    {step.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-2 text-sm ${isLeft ? 'lg:flex-row-reverse' : ''}`}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${step.textColor} flex-shrink-0`} />
                        <span className="text-muted-foreground">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Center Dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <motion.div
                    whileInView={{ scale: [0.5, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`h-5 w-5 rounded-full border-4 border-background bg-gradient-to-br ${step.color} shadow-lg`}
                  />
                </div>

                {/* Visual Card */}
                <motion.div
                  className={`${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
                  whileHover={{ scale: 1.03, rotate: isLeft ? 1 : -1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`rounded-2xl border border-border bg-card p-6 shadow-xl relative overflow-hidden`}>
                    <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full ${step.bgColor} blur-2xl`} />
                    <div className="relative">
                      <StepVisual index={index} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function StepVisual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="flex flex-col items-center py-4">
          <div className="h-32 w-32 rounded-2xl border-4 border-emerald-500/30 bg-white p-4 shadow-lg">
            <div className="h-full w-full grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`rounded-sm ${[0,1,2,4,5,6,10,12,14,15,16,18,20,22,24].includes(i) ? 'bg-emerald-500' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
          <p className="text-sm font-semibold mt-3 text-emerald-400">Table 12 QR Code</p>
          <p className="text-xs text-muted-foreground">Scan with any camera app</p>
        </div>
      )
    case 1:
      return (
        <div className="space-y-2 py-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Truffle Burger</p>
              <p className="text-xs text-muted-foreground">$14.99 · + Bacon $2</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-6 w-6 rounded bg-muted text-xs">-</button>
              <span className="text-sm font-bold">2</span>
              <button className="h-6 w-6 rounded bg-primary text-primary-foreground text-xs">+</button>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Caesar Salad</p>
              <p className="text-xs text-muted-foreground">$9.99 · No croutons</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-6 w-6 rounded bg-muted text-xs">-</button>
              <span className="text-sm font-bold">1</span>
              <button className="h-6 w-6 rounded bg-primary text-primary-foreground text-xs">+</button>
            </div>
          </div>
        </div>
      )
    case 2:
      return (
        <div className="space-y-2 py-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div>
              <p className="text-sm font-semibold">2x Ribeye Steak</p>
              <p className="text-xs text-muted-foreground">Grill Station · Medium Rare</p>
            </div>
            <span className="text-lg font-mono font-bold text-orange-400">04:32</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <div>
              <p className="text-sm font-semibold">1x Caesar Salad</p>
              <p className="text-xs text-muted-foreground">Cold Station · No Croutons</p>
            </div>
            <span className="text-lg font-mono font-bold text-green-400">READY</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <div>
              <p className="text-sm font-semibold">3x Fish & Chips</p>
              <p className="text-xs text-muted-foreground">Fryer Station · Extra Tartar</p>
            </div>
            <span className="text-lg font-mono font-bold text-red-400">06:42</span>
          </div>
        </div>
      )
    case 3:
      return (
        <div className="flex flex-col items-center py-4">
          <div className="w-full max-w-[200px] rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-semibold">Order #2841</span>
            </div>
            <div className="space-y-2">
              {['Order Received', 'Preparing', 'Ready for Pickup', 'Served'].map((status, i) => (
                <div key={status} className="flex items-center gap-2">
                  {i <= 2 ? <CheckCircle2 className="h-4 w-4 text-green-400" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                  <span className={`text-xs ${i <= 2 ? 'text-foreground' : 'text-muted-foreground'}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    case 4:
      return (
        <div className="flex flex-col items-center py-4">
          <div className="w-full max-w-[220px] rounded-xl border border-border bg-card p-4">
            <p className="text-sm font-semibold mb-3">Total: $47.97</p>
            <div className="space-y-2">
              <button className="w-full rounded-lg bg-[#635BFF] py-2 text-xs font-semibold text-white">Pay with Stripe</button>
              <button className="w-full rounded-lg bg-[#00C853] py-2 text-xs font-semibold text-white">Pay with UPI</button>
              <button className="w-full rounded-lg border border-border py-2 text-xs font-medium">Pay at Table</button>
            </div>
          </div>
        </div>
      )
    case 5:
      return (
        <div className="space-y-3 py-2">
          <div className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold mb-1">How was your experience?</p>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className={`h-6 w-6 rounded flex items-center justify-center text-xs ${star <= 4 ? 'bg-yellow-500/20 text-yellow-500' : 'bg-muted'}`}>★</div>
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3">
            <p className="text-xs font-semibold text-rose-400">+50 Points Added!</p>
            <p className="text-[10px] text-muted-foreground">You are now Silver tier. 150 more to Gold.</p>
          </div>
        </div>
      )
    default:
      return null
  }
}
