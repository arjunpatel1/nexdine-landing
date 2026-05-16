'use client'

import { motion } from 'framer-motion'
import {
  MonitorSmartphone,
  QrCode,
  ChefHat,
  Map,
  BarChart3,
  Users,
  MessageCircle,
  Truck,
  Shield,
  Smartphone,
  CalendarDays,
  Printer,
  Star,
  ClipboardList,
} from 'lucide-react'

const features = [
  {
    icon: MonitorSmartphone,
    title: 'POS & Billing',
    desc: 'Lightning-fast checkout with customizable menus, split bills, and multi-payment support.',
  },
  {
    icon: QrCode,
    title: 'QR Ordering',
    desc: 'Customers scan, browse, and order directly from their phones without downloading an app.',
  },
  {
    icon: ChefHat,
    title: 'Kitchen Display System',
    desc: 'Real-time order routing to kitchen stations with timers, alerts, and course management.',
  },
  {
    icon: Map,
    title: 'Table Mapping',
    desc: 'Visual drag-and-drop floor plans with live occupancy, reservations, and merge/split.',
  },
  {
    icon: Map,
    title: 'Smart Table Selection',
    desc: 'Visual table grid with real-time status, capacity display, and one-tap selection.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Live sales metrics, inventory forecasts, staff performance, and customer insights.',
  },
  {
    icon: Users,
    title: 'CRM & Loyalty',
    desc: 'Customer profiles, reward points, automated promotions, and birthday campaigns.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Automation',
    desc: 'Send order confirmations, marketing campaigns, and reservation reminders via WhatsApp.',
  },
  {
    icon: Truck,
    title: 'Aggregator Integration',
    desc: 'Unified inbox for Swiggy, Zomato, and other delivery platforms with auto-sync.',
  },
  {
    icon: Shield,
    title: 'Role & Permissions',
    desc: 'Granular access control for waiters, managers, kitchen staff, and accountants.',
  },
  {
    icon: Smartphone,
    title: 'Mobile POS',
    desc: 'Full-featured handheld ordering for waiters with offline support and fast sync.',
  },
  {
    icon: CalendarDays,
    title: 'Reservations',
    desc: 'Online booking widget, waitlist management, and table-specific reservation holds.',
  },
  {
    icon: Printer,
    title: 'Printer Integration',
    desc: 'Auto-print kitchen tickets, receipts, and labels with thermal and cloud printers.',
  },
  {
    icon: Star,
    title: 'Order Feedback',
    desc: 'Collect and track customer ratings, comments, and tags for every order across channels.',
  },
  {
    icon: ClipboardList,
    title: 'Print Job Monitoring',
    desc: 'Real-time print queue with diagnostics, retry failed jobs, and printer health dashboards.',
  },
]

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            All-in-One Platform
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Everything Your Restaurant Needs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Replace your stack of disconnected tools with a single, unified platform that talks to itself.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
