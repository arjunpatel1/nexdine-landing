'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Clock } from 'lucide-react'

import { DEMO_URL } from '@/lib/config'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-background to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-orange-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/5 to-transparent" />
      </div>

      {/* Animated Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span>Now with AI-powered insights</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6"
        >
          The Future of{' '}
          <span className="gradient-text">Restaurant</span>
          <br />
          Management is Here
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          NexDine unifies <strong className="text-foreground">POS</strong>,{' '}
          <strong className="text-foreground">QR Ordering</strong>,{' '}
          <strong className="text-foreground">Kitchen Display</strong>,{' '}
          <strong className="text-foreground">CRM</strong>, and{' '}
          <strong className="text-foreground">Analytics</strong> into one powerful platform trusted by thousands of restaurants worldwide.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          {[
            { icon: TrendingUp, label: '2,000+ Restaurants' },
            { icon: Users, label: '15M+ Orders Processed' },
            { icon: Clock, label: '99.9% Uptime' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <stat.icon className="h-4 w-4 text-primary" />
              <span>{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:opacity-90 transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
          >
            Book a Free Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/pos-demo"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground hover:bg-accent transition-all hover:scale-105"
          >
            <Play className="h-4 w-4" />
            Watch POS Demo
          </Link>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl perspective-1000"
        >
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
            {/* Browser Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-md">dashboard.nexdine.io</span>
              </div>
            </div>
            {/* Dashboard Content */}
            <div className="p-4 sm:p-6 grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="hidden sm:flex col-span-2 flex-col gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`h-8 rounded-lg ${i === 0 ? 'bg-primary/20' : 'bg-muted'} flex items-center px-3`}>
                    <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                  </div>
                ))}
              </div>
              {/* Main Content */}
              <div className="col-span-12 sm:col-span-10 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Revenue', value: '$24.5K', change: '+12%' },
                    { label: 'Orders', value: '1,284', change: '+8%' },
                    { label: 'Customers', value: '892', change: '+15%' },
                    { label: 'Avg Order', value: '$19.10', change: '+3%' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-border bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <div className="flex items-end justify-between">
                        <span className="text-lg font-bold">{stat.value}</span>
                        <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chart Area */}
                <div className="rounded-xl border border-border bg-muted/30 p-4 h-40">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Revenue Overview</span>
                    <span className="text-xs text-muted-foreground">Last 7 days</span>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-20">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm bg-gradient-to-t from-orange-500/40 to-orange-500/80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                {/* Recent Orders */}
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Live Orders</span>
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      12 active
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: '#ORD-2841', status: 'Cooking', time: '2m ago' },
                      { id: '#ORD-2840', status: 'Ready', time: '5m ago' },
                      { id: '#ORD-2839', status: 'Served', time: '8m ago' },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm">{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'Cooking' ? 'bg-yellow-500/10 text-yellow-500' :
                          order.status === 'Ready' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-green-500/10 text-green-500'
                        }`}>{order.status}</span>
                        <span className="text-xs text-muted-foreground">{order.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-400/10 rounded-3xl blur-2xl -z-10" />
        </motion.div>

        {/* Floating Notification Cards */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-28 left-6 hidden xl:block"
        >
          <div className="glass rounded-2xl p-4 shadow-xl border border-border/50 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                <span className="text-green-500 text-lg font-bold">+</span>
              </div>
              <div>
                <p className="text-sm font-semibold">New Order Received</p>
                <p className="text-xs text-muted-foreground">Table 12 · $47.50</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-56 right-6 hidden xl:block"
        >
          <div className="glass rounded-2xl p-4 shadow-xl border border-border/50 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Insight</p>
                <p className="text-xs text-muted-foreground">Peak traffic at 8:15 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-48 right-12 hidden xl:block"
        >
          <div className="glass rounded-xl p-3 shadow-lg border border-border/50 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </div>
              <div>
                <p className="text-xs font-semibold">Revenue +18%</p>
                <p className="text-[10px] text-muted-foreground">vs last week</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
