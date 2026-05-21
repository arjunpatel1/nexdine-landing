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
  {
    icon: ClipboardList,
    title: 'Inventory Management',
    shortDesc: 'Smart inventory with auto-deduction, low-stock alerts, and recipe costing.',
    fullDesc: 'Put your inventory on autopilot. Track raw materials with item-wise auto deduction as orders are placed. Get instant low-stock alerts, generate purchase orders, analyze recipe costs, and view day-end consumption reports — all without manual counting.',
    details: [
      { icon: ClipboardList, label: 'Item-wise auto deduction linked to recipes and menu items' },
      { icon: AlertTriangle, label: 'Low-stock alerts with configurable thresholds per item' },
      { icon: BarChart3, label: 'Recipe costing: track cost-of-goods and profit margins' },
      { icon: RefreshCw, label: 'Purchase orders and supplier management in one place' },
    ],
    stats: { label: 'Food waste reduction', value: '35%' },
    color: 'from-violet-500 to-purple-500',
    bgGlow: 'bg-violet-500/10',
    mockup: 'inventory',
  },
  {
    icon: Users,
    title: 'Menu Management',
    shortDesc: 'Create, customize, and control menus across all channels from one place.',
    fullDesc: 'Design different menus for dine-in, delivery, and takeaway. Toggle items ON/OFF based on stock availability. Set time-based menus (breakfast, lunch, dinner), configure modifiers and add-ons, and push updates to all platforms simultaneously.',
    details: [
      { icon: Clock, label: 'Time-based menus: breakfast, lunch, dinner auto-switch' },
      { icon: Zap, label: 'Toggle items ON/OFF instantly based on stock availability' },
      { icon: Shield, label: 'Channel-specific menus: dine-in, delivery, QR each get their own' },
      { icon: RefreshCw, label: 'Update once, publish everywhere — all platforms sync instantly' },
    ],
    stats: { label: 'Menu update speed', value: 'Instant' },
    color: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-500/10',
    mockup: 'menu',
  },
  {
    icon: MonitorSmartphone,
    title: 'Multi-Terminal Billing',
    shortDesc: 'Multiple billing counters synced with one master POS station.',
    fullDesc: 'Need separate billing terminals for your bar, restaurant floor, and takeaway counter? Create unlimited billing stations, each with their own area and menu configuration. All sync with a master POS in real time so you never lose track of orders.',
    details: [
      { icon: MonitorSmartphone, label: 'Unlimited terminals with area-specific menu views' },
      { icon: Zap, label: 'Real-time sync: all terminals update the master POS instantly' },
      { icon: Shield, label: 'Station-level permissions: each counter sees only its scope' },
      { icon: BarChart3, label: 'Terminal-wise sales reports and shift summaries' },
    ],
    stats: { label: 'Sync latency', value: '<1 second' },
    color: 'from-indigo-500 to-blue-500',
    bgGlow: 'bg-indigo-500/10',
    mockup: 'multiterminal',
  },
  {
    icon: MonitorSmartphone,
    title: 'Self-Ordering Kiosk',
    shortDesc: 'Touchscreen kiosks for customers to browse, customize, and place orders.',
    fullDesc: 'Deploy self-service kiosks at your entrance or counter. Customers browse your visual menu, customize dishes with modifiers, choose order type, and pay — all without staff assistance. Reduces queues, increases order accuracy, and boosts average ticket size through smart upselling.',
    details: [
      { icon: MonitorSmartphone, label: 'Full-screen visual menu with images, prices, and modifiers' },
      { icon: CreditCard, label: 'Integrated payment: UPI, cards, wallets, or pay-at-counter' },
      { icon: Zap, label: 'Smart upselling suggestions based on item combinations' },
      { icon: Users, label: 'Multi-language support for diverse customer base' },
    ],
    stats: { label: 'Average ticket increase', value: '22%' },
    color: 'from-teal-500 to-cyan-500',
    bgGlow: 'bg-teal-500/10',
    mockup: 'kiosk',
  },
  {
    icon: ClipboardList,
    title: 'Token Management',
    shortDesc: 'Display token numbers on screens for takeaway and delivery pickups.',
    fullDesc: 'For QSR and takeaway-heavy outlets, display real-time token numbers on customer-facing screens. Tokens automatically advance as kitchen marks items ready. Customers see their order status without crowding the counter — reducing chaos during peak hours.',
    details: [
      { icon: MonitorSmartphone, label: 'Customer-facing display with live token status' },
      { icon: Zap, label: 'Auto-advance tokens as kitchen bumps orders' },
      { icon: Clock, label: 'Estimated wait time display per token' },
      { icon: Shield, label: 'Audio announcements when tokens are ready' },
    ],
    stats: { label: 'Counter crowd reduction', value: '60%' },
    color: 'from-sky-500 to-blue-400',
    bgGlow: 'bg-sky-500/10',
    mockup: 'token',
  },
  {
    icon: Shield,
    title: 'Tax & Discount Configuration',
    shortDesc: 'Flexible tax rates, service charges, coupons, and discount rules.',
    fullDesc: 'Configure GST, VAT, service charges, and custom taxes per region or service type. Create percentage or flat discounts, issue coupon codes, set happy-hour pricing, and define loyalty-based auto-discounts — all with audit trails for compliance.',
    details: [
      { icon: Shield, label: 'Multi-tax support: GST, VAT, service charge, cess' },
      { icon: CreditCard, label: 'Coupons, promo codes, and auto-applied loyalty discounts' },
      { icon: Clock, label: 'Happy-hour and time-based pricing rules' },
      { icon: BarChart3, label: 'Complete audit trail for every discount applied' },
    ],
    stats: { label: 'Tax compliance', value: '100%' },
    color: 'from-red-500 to-rose-500',
    bgGlow: 'bg-red-500/10',
    mockup: 'tax',
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
              {['₹12.4K', '+18%', '842', '₹14.7'].map((val, i) => (
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
      case 'inventory': {
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 mb-2">
              {[
                { label: 'Items', val: '248', color: 'text-violet-400' },
                { label: 'Low Stock', val: '12', color: 'text-amber-400' },
                { label: 'Out', val: '3', color: 'text-red-400' },
              ].map(s => (
                <div key={s.label} className="rounded-lg border border-border bg-muted/30 p-2 text-center">
                  <p className={`text-sm font-bold ${s.color}`}>{s.val}</p>
                  <p className="text-[9px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            {[
              { item: 'Basmati Rice', stock: '8 kg', status: 'Low', color: 'text-amber-400' },
              { item: 'Chicken Breast', stock: '2 kg', status: 'Critical', color: 'text-red-400' },
              { item: 'Olive Oil', stock: '15 L', status: 'OK', color: 'text-green-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <div>
                  <p className="text-[10px] font-semibold">{item.item}</p>
                  <p className="text-[9px] text-muted-foreground">{item.stock} remaining</p>
                </div>
                <span className={`text-[9px] font-semibold ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>
        )
      }
      case 'menu': {
        return (
          <div className="space-y-2">
            <div className="flex gap-2 mb-2">
              {['Dine-in', 'Delivery', 'QR'].map((ch, i) => (
                <div key={ch} className={`px-2 py-1 rounded text-[10px] ${i === 0 ? 'bg-pink-500/20 text-pink-400' : 'bg-muted'}`}>{ch}</div>
              ))}
            </div>
            {[
              { name: 'Butter Chicken', price: '₹380', active: true },
              { name: 'Paneer Tikka', price: '₹280', active: true },
              { name: 'Dal Makhani', price: '₹220', active: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <div>
                  <p className="text-[10px] font-semibold">{item.name}</p>
                  <p className="text-[9px] text-muted-foreground">{item.price}</p>
                </div>
                <div className={`h-4 w-8 rounded-full ${item.active ? 'bg-green-500' : 'bg-muted-foreground/30'} relative`}>
                  <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${item.active ? 'right-0.5' : 'left-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        )
      }
      case 'multiterminal': {
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[
                { name: 'Bar Counter', orders: 12, color: 'bg-indigo-500/20' },
                { name: 'Main Floor', orders: 28, color: 'bg-blue-500/20' },
                { name: 'Takeaway', orders: 8, color: 'bg-cyan-500/20' },
                { name: 'Outdoor', orders: 6, color: 'bg-teal-500/20' },
              ].map(terminal => (
                <div key={terminal.name} className={`rounded-lg border border-border ${terminal.color} p-2 text-center`}>
                  <p className="text-[10px] font-semibold">{terminal.name}</p>
                  <p className="text-[9px] text-muted-foreground">{terminal.orders} orders</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-2 text-center">
              <p className="text-[10px] font-semibold text-indigo-400">All Synced</p>
              <p className="text-[9px] text-muted-foreground">Master POS up to date</p>
            </div>
          </div>
        )
      }
      case 'kiosk': {
        return (
          <div className="space-y-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center mb-2">
              <p className="text-[11px] font-bold mb-1">Welcome! Tap to Order</p>
              <p className="text-[9px] text-muted-foreground">Browse menu • Customize • Pay</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['Burgers', 'Pizza', 'Drinks', 'Desserts'].map(cat => (
                <div key={cat} className="rounded-lg border border-border bg-teal-500/10 p-2 text-center">
                  <p className="text-[10px] font-semibold">{cat}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-teal-500/20 border border-teal-500/30 p-2 flex items-center justify-between">
              <span className="text-[10px] font-semibold">2 items • ₹540</span>
              <span className="text-[9px] bg-teal-500 text-white px-2 py-0.5 rounded">Pay Now</span>
            </div>
          </div>
        )
      }
      case 'token': {
        return (
          <div className="space-y-2">
            <div className="text-center mb-2">
              <p className="text-[11px] font-bold">Now Serving</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: '042', status: 'ready', color: 'bg-green-500/20 border-green-500/30' },
                { num: '043', status: 'preparing', color: 'bg-amber-500/20 border-amber-500/30' },
                { num: '044', status: 'preparing', color: 'bg-amber-500/20 border-amber-500/30' },
                { num: '045', status: 'queued', color: 'bg-muted/30 border-border' },
                { num: '046', status: 'queued', color: 'bg-muted/30 border-border' },
                { num: '047', status: 'queued', color: 'bg-muted/30 border-border' },
              ].map(token => (
                <div key={token.num} className={`rounded-lg border ${token.color} p-2 text-center`}>
                  <p className="text-sm font-bold">{token.num}</p>
                  <p className="text-[8px] text-muted-foreground capitalize">{token.status}</p>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'tax': {
        return (
          <div className="space-y-2">
            {[
              { label: 'CGST 2.5%', amount: '₹45.00', type: 'tax' },
              { label: 'SGST 2.5%', amount: '₹45.00', type: 'tax' },
              { label: 'Service Charge 10%', amount: '₹180.00', type: 'tax' },
              { label: 'WELCOME20 coupon', amount: '-₹200.00', type: 'discount' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2">
                <span className="text-[10px]">{item.label}</span>
                <span className={`text-[10px] font-semibold ${item.type === 'discount' ? 'text-green-400' : 'text-muted-foreground'}`}>{item.amount}</span>
              </div>
            ))}
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2 flex items-center justify-between">
              <span className="text-[10px] font-bold">Net Total</span>
              <span className="text-[11px] font-bold text-red-400">₹1,870.00</span>
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
