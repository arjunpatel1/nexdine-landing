'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, BarChart3, CalendarDays, CheckCircle2,
  ChefHat, ClipboardList, Clock, CreditCard, Map,
  MessageCircle, MonitorSmartphone, Printer, QrCode, RefreshCw, Shield,
  Smartphone, Star, Truck, Users, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import OrderServerAnimation from '@/components/animations/OrderServerAnimation'
import PosBillingAnimation from '@/components/animations/PosBillingAnimation'
import QrOrderingAnimation from '@/components/animations/QrOrderingAnimation'
import RestaurantMapAnimation from '@/components/animations/RestaurantMapAnimation'
import TableSelectAnimation from '@/components/animations/TableSelectAnimation'
import WaiterSubmitAnimation from '@/components/animations/WaiterSubmitAnimation'

const features = [
  {
    icon: MonitorSmartphone,
    title: 'Point of Sale & Billing',
    shortDesc: 'Lightning-fast checkout with customizable menus and multi-payment support.',
    fullDesc: 'Our POS system is engineered for speed. With customizable quick-action buttons, modifier support, split bills, combo deals, and multi-currency handling, your staff can process orders faster than ever. The interface adapts to your workflow — not the other way around.',
    details: [
      { icon: Zap, label: 'Sub-second order entry with hotkeys and quick-tap modifiers' },
      { icon: CreditCard, label: 'Accept cash, cards, UPI, wallets, and split payments across methods' },
      { icon: Clock, label: 'Offline mode keeps you running even without internet' },
      { icon: Shield, label: 'Role-based access: waiter, manager, kitchen, accountant views' },
    ],
    stats: { label: 'Average checkout time', value: '12 seconds' },
    color: 'from-blue-500 to-cyan-500',
    bgGlow: 'bg-blue-500/10',
    mockup: 'pos',
  },
  {
    icon: QrCode,
    title: 'QR Code Ordering',
    shortDesc: 'Customers scan, browse, and order directly from their phones without downloading an app.',
    fullDesc: 'Place a unique QR code on every table. Customers scan with their native camera app, browse your digital menu, customize items, and send orders straight to the kitchen — all without waiter intervention for standard orders. Reduce labor costs and eliminate order errors.',
    details: [
      { icon: Smartphone, label: 'No app download needed — works in any mobile browser' },
      { icon: Zap, label: 'Orders flow directly to the KDS, bypassing the POS for speed' },
      { icon: CreditCard, label: 'Integrated payment via Stripe, Razorpay, or cash on delivery' },
      { icon: Users, label: 'Group ordering: multiple guests can add to the same table order' },
    ],
    stats: { label: 'Labor cost reduction', value: '30%' },
    color: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-500/10',
    mockup: 'qr',
  },
  {
    icon: ChefHat,
    title: 'Kitchen Display System (KDS)',
    shortDesc: 'Real-time order routing to kitchen stations with timers, alerts, and course management.',
    fullDesc: 'Orders appear instantly on kitchen screens organized by station — grill, fryer, salad, dessert. Color-coded timers turn red when items are overdue. Course management ensures appetizers go out before mains. Managers get real-time kitchen performance dashboards.',
    details: [
      { icon: Clock, label: 'Per-item cook timers with escalating visual alerts' },
      { icon: Zap, label: 'Auto-routing to prep stations based on item type' },
      { icon: Shield, label: 'Bump bar support with hardware button integration' },
      { icon: BarChart3, label: 'Kitchen throughput analytics: items/hour, avg cook time' },
    ],
    stats: { label: 'Kitchen efficiency gain', value: '45%' },
    color: 'from-orange-500 to-amber-500',
    bgGlow: 'bg-orange-500/10',
    mockup: 'kds',
  },
  {
    icon: Map,
    title: 'Visual Table Mapping',
    shortDesc: 'Drag-and-drop floor plans with live occupancy, reservations, and merge/split.',
    fullDesc: 'Design your restaurant floor plan visually. Drag tables into position, define zones (indoor, outdoor, bar), and see live occupancy at a glance. Merge tables for large parties, split bills automatically, and block tables for upcoming reservations.',
    details: [
      { icon: Map, label: 'Drag-and-drop floor designer with custom table shapes' },
      { icon: CalendarDays, label: 'Reservation holds with visual time-block indicators' },
      { icon: Users, label: 'Merge/split tables with automatic bill separation' },
      { icon: Shield, label: 'Zone-based permissions: host sees all, waiter sees assigned zone' },
    ],
    stats: { label: 'Table turnover improvement', value: '25%' },
    color: 'from-amber-500 to-orange-400',
    bgGlow: 'bg-amber-500/10',
    mockup: 'table',
  },
  {
    icon: Map,
    title: 'Smart Table Selection',
    shortDesc: 'Visual table grid with real-time status, capacity display, and one-tap selection.',
    fullDesc: 'Your hosts and waiters see every table at a glance — green for available, red for occupied, orange for reserved. Tap to select, view capacity, and instantly assign orders to the right table. No more pen-and-paper table tracking.',
    details: [
      { icon: Map, label: 'Color-coded grid: available, occupied, reserved at a glance' },
      { icon: Users, label: 'Capacity display: 2-top, 4-top, 6-top, 8-top layouts' },
      { icon: Zap, label: 'One-tap selection with instant POS assignment' },
      { icon: CalendarDays, label: 'Reservation overlay: see upcoming bookings per table' },
    ],
    stats: { label: 'Table assignment speed', value: '5x faster' },
    color: 'from-emerald-500 to-teal-500',
    bgGlow: 'bg-emerald-500/10',
    mockup: 'tableselect',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Intelligence',
    shortDesc: 'Live sales metrics, inventory forecasts, staff performance, and customer insights.',
    fullDesc: 'Your data tells a story. NexDine surfaces the insights that matter: peak hour predictions, slow-moving inventory alerts, top-performing staff, and customer lifetime value. Export reports or view them in beautiful, real-time dashboards.',
    details: [
      { icon: BarChart3, label: 'Real-time sales dashboards with revenue, orders, and trends' },
      { icon: Zap, label: 'AI-powered demand forecasting for inventory planning' },
      { icon: Users, label: 'Staff performance: tips, speed, accuracy rankings' },
      { icon: Shield, label: 'Waste tracking with cost-of-goods analysis' },
    ],
    stats: { label: 'Revenue insight accuracy', value: '95%' },
    color: 'from-orange-500 to-amber-600',
    bgGlow: 'bg-orange-500/10',
    mockup: 'analytics',
  },
  {
    icon: Users,
    title: 'CRM & Loyalty Program',
    shortDesc: 'Customer profiles, reward points, automated promotions, and birthday campaigns.',
    fullDesc: 'Know every customer by name and preference. Track visit history, favorite dishes, and dietary restrictions. Automatically enroll guests in your loyalty program, send birthday rewards, and trigger win-back campaigns for lapsed customers.',
    details: [
      { icon: Users, label: 'Complete customer profiles with preferences and history' },
      { icon: Zap, label: 'Points-based loyalty with tiered rewards' },
      { icon: MessageCircle, label: 'Automated SMS and WhatsApp campaigns' },
      { icon: BarChart3, label: 'Customer lifetime value and churn prediction' },
    ],
    stats: { label: 'Repeat visit rate increase', value: '40%' },
    color: 'from-rose-500 to-pink-500',
    bgGlow: 'bg-rose-500/10',
    mockup: 'crm',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Automation',
    shortDesc: 'Send order confirmations, marketing campaigns, and reservation reminders via WhatsApp.',
    fullDesc: 'Meet customers where they already are. Send instant order confirmations, reservation reminders, feedback requests, and targeted marketing campaigns — all via WhatsApp Business API. Personalized messages with customer names and order details.',
    details: [
      { icon: MessageCircle, label: 'Order confirmation and ready-for-pickup notifications' },
      { icon: Zap, label: 'Broadcast campaigns to segmented customer lists' },
      { icon: CalendarDays, label: 'Automated reservation reminders 24h and 1h before' },
      { icon: Shield, label: 'WhatsApp Business API with template message approval' },
    ],
    stats: { label: 'Message open rate', value: '85%' },
    color: 'from-green-500 to-emerald-500',
    bgGlow: 'bg-green-500/10',
    mockup: 'whatsapp',
  },
  {
    icon: Truck,
    title: 'Aggregator Integration',
    shortDesc: 'Unified inbox for Swiggy, Zomato, and other delivery platforms with auto-sync.',
    fullDesc: 'Stop juggling tablets. All your delivery platform orders — Swiggy, Zomato, Uber Eats, DoorDash — flow into a single unified inbox. Auto-accept orders, sync menus across platforms, and reconcile commissions automatically in your accounting.',
    details: [
      { icon: Truck, label: 'Single inbox for all delivery platform orders' },
      { icon: Zap, label: 'Auto-accept and route to kitchen without manual intervention' },
      { icon: BarChart3, label: 'Platform-wise revenue and commission reports' },
      { icon: Shield, label: 'Menu sync: update once, publish everywhere' },
    ],
    stats: { label: 'Delivery order errors reduced', value: '90%' },
    color: 'from-cyan-500 to-blue-500',
    bgGlow: 'bg-cyan-500/10',
    mockup: 'aggregator',
  },
  {
    icon: Smartphone,
    title: 'Mobile POS for Waiters',
    shortDesc: 'Full-featured handheld ordering with offline support and fast sync.',
    fullDesc: 'Equip your waiters with powerful handheld devices. Take orders at the table, send them instantly to the kitchen, accept payments, and manage table status — all while moving through the dining room. Works offline and syncs when reconnected.',
    details: [
      { icon: Smartphone, label: 'iOS and Android native apps with offline mode' },
      { icon: Zap, label: 'Instant kitchen fire from the tableside' },
      { icon: CreditCard, label: 'Tableside payment with card reader integration' },
      { icon: Shield, label: 'Biometric login for fast staff switching' },
    ],
    stats: { label: 'Tableside ordering speed', value: '3x faster' },
    color: 'from-amber-600 to-amber-500',
    bgGlow: 'bg-amber-600/10',
    mockup: 'mobile',
  },
  {
    icon: Star,
    title: 'Order Feedback System',
    shortDesc: 'Collect and analyze customer ratings, comments, and tags for every order.',
    fullDesc: 'Turn every order into actionable insight. Collect star ratings, tagged feedback (taste, speed, packaging), and free-text comments across dine-in, delivery, and QR orders. Identify top-performing dishes and service gaps in real time.',
    details: [
      { icon: Star, label: 'Star ratings and tagged feedback per order' },
      { icon: MessageCircle, label: 'Feedback across dine-in, QR, and delivery channels' },
      { icon: BarChart3, label: 'Dish-level and branch-level sentiment trends' },
      { icon: Shield, label: 'Moderated review system with admin visibility' },
    ],
    stats: { label: 'Average feedback response', value: '4.6/5' },
    color: 'from-yellow-500 to-amber-500',
    bgGlow: 'bg-yellow-500/10',
    mockup: 'feedback',
  },
  {
    icon: ClipboardList,
    title: 'Print Job Monitoring',
    shortDesc: 'Real-time print queue with diagnostics, retry failed jobs, and printer health dashboards.',
    fullDesc: 'Never miss a ticket again. Monitor every print job across all printers and print agents in real time. See pending, success, and failed counts at a glance. Run diagnostics to check printer and agent health, then retry failed jobs with one click.',
    details: [
      { icon: ClipboardList, label: 'Live print queue: pending, success, failed status tracking' },
      { icon: AlertTriangle, label: 'Error messages and failure reasons per job' },
      { icon: RefreshCw, label: 'One-click retry for failed print jobs' },
      { icon: CheckCircle2, label: 'Printer and print agent diagnostics dashboard' },
    ],
    stats: { label: 'Print success rate', value: '99.2%' },
    color: 'from-slate-500 to-zinc-500',
    bgGlow: 'bg-slate-500/10',
    mockup: 'printjobs',
  },
]

function Mockup ({ type }: { type: string }) {
  const renderContent = () => {
    switch (type) {
      case 'pos': {
        return <PosBillingAnimation />
      }
      case 'qr': {
        return <QrOrderingAnimation />
      }
      case 'kds': {
        return <OrderServerAnimation />
      }
      case 'table': {
        return <RestaurantMapAnimation />
      }
      case 'analytics': {
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {['$12.4K', '+18%', '842', '$14.7'].map((val, i) => (
                <div key={i} className="rounded-lg border border-border bg-muted/30 p-2">
                  <div className="h-2 w-8 bg-muted-foreground/20 rounded mb-1" />
                  <span className="text-sm font-bold">{val}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="h-2 w-16 bg-muted-foreground/20 rounded mb-2" />
              <div className="flex items-end gap-1 h-12">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-orange-500/40 to-orange-500" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )
      }
      case 'crm': {
        return (
          <div className="space-y-2">
            {[
              { name: 'Sarah Chen', visits: '24', points: '1,240', tier: 'Gold' },
              { name: 'Marcus J.', visits: '18', points: '890', tier: 'Silver' },
              { name: 'Priya S.', visits: '31', points: '1,850', tier: 'Platinum' },
            ].map(customer => (
              <div key={customer.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center text-[10px] font-bold">
                    {customer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold">{customer.name}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {customer.visits}
                      {' '}
                      visits
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold">{customer.points}</p>
                  <p className="text-[9px] text-rose-400">{customer.tier}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }
      case 'whatsapp': {
        return (
          <div className="space-y-2">
            <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-[10px] font-semibold">WhatsApp Business</span>
              </div>
              <p className="text-[10px] text-muted-foreground">Connected</p>
            </div>
            {[
              { type: 'sent', text: 'Your order #2841 is confirmed!' },
              { type: 'sent', text: 'Table 12 is ready in 15 mins' },
              { type: 'template', text: 'Happy Birthday! 20% off today' },
            ].map((msg, i) => (
              <div key={i} className={`rounded-lg p-2 text-[10px] ${msg.type === 'sent' ? 'bg-green-500/10 ml-4' : 'bg-muted/30 mr-4'}`}>
                {msg.text}
              </div>
            ))}
          </div>
        )
      }
      case 'aggregator': {
        return (
          <div className="space-y-2">
            <div className="flex gap-2 mb-2">
              {['Swiggy', 'Zomato', 'UberEats'].map(platform => (
                <div key={platform} className={`px-2 py-1 rounded text-[10px] ${platform === 'Swiggy' ? 'bg-orange-500/20 text-orange-400' : 'bg-muted'}`}>{platform}</div>
              ))}
            </div>
            {[
              { id: '#SW-4412', platform: 'Swiggy', status: 'New', time: '2m ago' },
              { id: '#ZM-8821', platform: 'Zomato', status: 'Preparing', time: '5m ago' },
              { id: '#UE-1123', platform: 'UberEats', status: 'Ready', time: '8m ago' },
            ].map(order => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono">{order.id}</span>
                  <span className="text-[9px] text-muted-foreground">{order.platform}</span>
                </div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded ${order.status === 'New' ? 'bg-orange-500/10 text-orange-400' : (order.status === 'Ready' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400')}`}>{order.status}</span>
              </div>
            ))}
          </div>
        )
      }
      case 'mobile': {
        return <WaiterSubmitAnimation />
      }
      case 'tableselect': {
        return <TableSelectAnimation />
      }
      case 'feedback': {
        return (
          <div className="space-y-2">
            <div className="flex gap-2 mb-2">
              {['Dine-in', 'QR', 'Delivery'].map(src => (
                <div key={src} className={`px-2 py-1 rounded text-[10px] ${src === 'Dine-in' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-muted'}`}>{src}</div>
              ))}
            </div>
            {[
              { order: 'ORD-2814', rating: 5, tags: 'Taste, Speed', comment: 'Excellent food and fast service!' },
              { order: 'ORD-2811', rating: 4, tags: 'Packaging', comment: 'Great taste, packaging could be better' },
              { order: 'ORD-2809', rating: 3, tags: 'Wait time', comment: 'Took longer than expected' },
            ].map((f, i) => (
              <div key={i} className="rounded-lg border border-border bg-muted/30 p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono">{f.order}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div key={j} className={`h-2 w-2 rounded-full ${j < f.rating ? 'bg-yellow-400' : 'bg-muted-foreground/20'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mb-1">{f.comment}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400">{f.tags}</span>
              </div>
            ))}
          </div>
        )
      }
      case 'printjobs': {
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { label: 'Total', val: '1,240', color: 'text-blue-400' },
                { label: 'Success', val: '1,198', color: 'text-green-400' },
                { label: 'Failed', val: '42', color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="rounded-lg border border-border bg-muted/30 p-2 text-center">
                  <p className={`text-sm font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-[9px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            {[
              { printer: 'Kitchen Thermal', status: 'Online', color: 'text-green-400' },
              { printer: 'Receipt Printer', status: 'Online', color: 'text-green-400' },
              { printer: 'Label Printer', status: 'Offline', color: 'text-red-400' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <span className="text-[10px]">{p.printer}</span>
                <span className={`text-[9px] font-semibold ${p.color}`}>{p.status}</span>
              </div>
            ))}
            <div className="rounded-lg bg-primary/10 p-2 text-center">
              <span className="text-[10px] font-semibold text-primary">Retry Failed Jobs</span>
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
    <div className="relative rounded-2xl border border-border bg-card p-4 shadow-xl">
      {renderContent()}
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-400/5 rounded-3xl blur-xl -z-10" />
    </div>
  )
}

export default function FeatureShowcase () {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section ref={containerRef} className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Complete Feature Set
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything Your Restaurant Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Replace your stack of disconnected tools with a single, unified platform that talks to itself. Every feature is designed to work together seamlessly.
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-32">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{feature.fullDesc}</p>

                  <div className="space-y-3 mb-8">
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-md ${feature.bgGlow}`}>
                          <detail.icon className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{detail.label}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <div className={`rounded-xl ${feature.bgGlow} px-5 py-3`}>
                      <p className="text-2xl font-bold">{feature.stats.value}</p>
                      <p className="text-xs text-muted-foreground">{feature.stats.label}</p>
                    </div>
                    <Link
                      href="#"
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <motion.div
                  className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mockup type={feature.mockup} />
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
