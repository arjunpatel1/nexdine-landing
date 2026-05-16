'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What is NexDine and who is it for?',
    answer:
      'NexDine is an all-in-one restaurant management platform built for cafes, quick-service restaurants, fine-dining chains, and food trucks. It covers POS billing, QR ordering, kitchen display systems, inventory, CRM, and multi-branch operations in a single ecosystem.',
  },
  {
    question: 'How does QR table ordering work?',
    answer:
      'Each table gets a unique QR code. Guests scan it with their phone, browse the digital menu, place orders, and pay — without downloading an app. Orders flow straight to the kitchen display system (KDS) and POS in real time.',
  },
  {
    question: 'Can I manage multiple branches from one dashboard?',
    answer:
      'Yes. NexDine is built for multi-location operations. You get a centralized admin dashboard to manage menus, inventory, staff, and reports across all branches, with role-based access for managers and waiters per location.',
  },
  {
    question: 'Is NexDine GST compliant for Indian restaurants?',
    answer:
      'Absolutely. NexDine supports GST invoicing, multi-tax slabs, and generates GST reports ready for filing. It also handles split taxation (CGST/SGST/IGST) automatically based on the order type and location.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes. Every plan starts with a 14-day free trial with full access to all features. No credit card required to sign up. You can book a personalized demo with our team anytime.',
  },
  {
    question: 'What hardware do I need to run NexDine?',
    answer:
      'NexDine runs on any modern browser. For the POS, you can use tablets, iPads, Android devices, or desktop PCs. We also support thermal receipt printers, barcode scanners, and cash drawers via standard integrations.',
  },
  {
    question: 'How does the Kitchen Display System (KDS) help?',
    answer:
      'The KDS replaces paper kitchen tickets with real-time digital order boards. It shows course routing, prep timers, priority flags, and completion tracking — helping kitchens operate faster with fewer errors during peak hours.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to know
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our support team.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full text-left rounded-xl border px-5 py-4 transition-all duration-200 ${
                  openIndex === i
                    ? 'bg-card border-primary/30 shadow-lg shadow-primary/5'
                    : 'bg-card/50 border-border hover:bg-card hover:border-border/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQPage structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
