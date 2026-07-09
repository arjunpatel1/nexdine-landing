'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

import { DEMO_URL } from '@/lib/config'

const plans = [
  {
    name: 'Starter',
    price: '₹3,999',
    period: '/month',
    desc: 'Perfect for single-location cafes and food trucks.',
    features: [
      '1 Branch',
      '2 POS Terminals',
      'Standard Reports',
      'Email Support',
    ],
    cta: 'Book a Demo',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹9,999',
    period: '/month',
    desc: 'For growing restaurants with multiple stations.',
    features: [
      '3 Branches',
      '10 POS Terminals',
      'Advanced QR + KDS',
      'Table Mapping',
      'CRM & Loyalty',
      'WhatsApp Automation',
      'Priority Support',
    ],
    cta: 'Book a Demo',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For chains and franchises with custom needs.',
    features: [
      'Unlimited Branches',
      'Unlimited Terminals',
      'White-label QR Menu',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA & 24/7 Support',
      'On-premise Option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function Pricing () {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free for 3 months. No credit card required. Scale as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-primary bg-primary/5 md:scale-105 shadow-xl shadow-primary/10'
                  : 'border-border bg-card'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center rounded-full py-3 text-sm font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'border border-border hover:bg-accent'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
