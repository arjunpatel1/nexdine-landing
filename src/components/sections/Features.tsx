'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChefHat,
  ClipboardList,
  CreditCard,
  Globe,
  Layers,
  Map,
  MessageCircle,
  Monitor,
  MonitorSmartphone,
  Package,
  Printer,
  QrCode,
  Receipt,
  Shield,
  Smartphone,
  Star,
  Store,
  Tablet,
  Truck,
  Users,
  UtensilsCrossed,
  WifiOff,
} from 'lucide-react'

const features = [
  {
    icon: MonitorSmartphone,
    title: 'POS & Billing',
    desc: 'Quick 3-click billing with customizable menus, split bills, merge tables, and multi-payment support.',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    desc: 'Item-wise auto deduction, low-stock alerts, purchase orders, recipe costing, and day-end reports.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Menu Management',
    desc: 'Create and customize menus per service type. Toggle items ON/OFF based on stock availability.',
  },
  {
    icon: ChefHat,
    title: 'Kitchen Display System',
    desc: 'Real-time order routing to kitchen stations with timers, alerts, and course management.',
  },
  {
    icon: QrCode,
    title: 'QR Ordering',
    desc: 'Customers scan, browse, and order directly from their phones — no app download needed.',
  },
  {
    icon: Map,
    title: 'Table & Area Management',
    desc: 'Configure dine-in areas with menus, tax rates, custom seating, merge/split, and live occupancy.',
  },
  {
    icon: Layers,
    title: 'Multi-Terminal Billing',
    desc: 'Multiple billing counters synced with one master station. Captains generate KOTs from any terminal.',
  },
  {
    icon: Printer,
    title: 'Station-wise KOT Printing',
    desc: 'Assign printers to cooking stations. KOTs route automatically to the right counter.',
  },
  {
    icon: BarChart3,
    title: '80+ Reports & Analytics',
    desc: 'Day-end sales, online orders, staff actions, inventory consumption, and real-time dashboards.',
  },
  {
    icon: Truck,
    title: 'Online Order Management',
    desc: 'Unified inbox for Swiggy, Zomato, and other platforms. Auto-accept, menu sync, and reconciliation.',
  },
  {
    icon: Users,
    title: 'CRM & Loyalty',
    desc: 'Customer profiles, reward points, automated promotions, birthday campaigns, and feedback loops.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp & SMS Marketing',
    desc: 'Order confirmations, campaigns, reservation reminders, and win-back messages via WhatsApp and SMS.',
  },
  {
    icon: Smartphone,
    title: 'Captain / Waiter App',
    desc: 'Full-featured handheld ordering with offline support, tableside payment, and instant kitchen fire.',
  },
  {
    icon: Tablet,
    title: 'Self-Ordering Kiosk',
    desc: 'Touch-screen kiosks for customers to browse, customize, and place orders without staff.',
  },
  {
    icon: CreditCard,
    title: 'Scan & Pay',
    desc: 'Customers scan a QR code to view their bill and pay instantly via UPI, cards, or wallets.',
  },
  {
    icon: Bell,
    title: 'Waiter Calling System',
    desc: 'Digital call buttons on tables so customers can request service without raising a hand.',
  },
  {
    icon: CalendarDays,
    title: 'Reservation Manager',
    desc: 'Online booking widget, waitlist management, table-specific holds, and reminder notifications.',
  },
  {
    icon: Monitor,
    title: 'Token Management',
    desc: 'Display token numbers on screens for takeaway and delivery orders. Real-time status updates.',
  },
  {
    icon: Receipt,
    title: 'Tax & Discount Engine',
    desc: 'Configure GST, VAT, service charges, coupons, and discounts by service type or region.',
  },
  {
    icon: Shield,
    title: 'Role & Permissions',
    desc: 'Granular access control for waiters, managers, kitchen staff, and accountants to prevent fraud.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    desc: 'Cloud-based with offline mode. Continue billing without internet — syncs automatically when back online.',
  },
  {
    icon: Globe,
    title: '150+ Integrations',
    desc: 'Payment gateways, delivery platforms, accounting tools, loyalty apps — all from a single dashboard.',
  },
  {
    icon: Star,
    title: 'Customer Feedback',
    desc: 'Collect ratings, comments, and tags for every order. Track sentiment trends by dish and branch.',
  },
  {
    icon: ClipboardList,
    title: 'Print Job Monitoring',
    desc: 'Real-time print queue with diagnostics, retry failed jobs, and printer health dashboards.',
  },
  {
    icon: Store,
    title: 'Built for All Formats',
    desc: 'Fine dine, QSR, cloud kitchen, café, bar, bakery, food court, large chains — one platform fits all.',
  },
]

export default function Features () {
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
