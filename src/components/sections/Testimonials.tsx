'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "NexDine cut our order-to-table time significantly. The QR ordering and KDS integration works seamlessly.",
    author: 'Restaurant Owner',
    role: 'Multi-location Chain, Mumbai',
    rating: 5,
  },
  {
    quote: "We replaced multiple separate tools with NexDine. Having everything in one platform has been a game changer for our operations.",
    author: 'General Manager',
    role: 'Fine Dining Restaurant, Bangalore',
    rating: 5,
  },
  {
    quote: "The WhatsApp automation helped us reconnect with customers directly. Our repeat visits have noticeably improved.",
    author: 'Operations Director',
    role: 'Cafe Chain, Delhi NCR',
    rating: 5,
  },
  {
    quote: "Managing multiple locations used to be chaotic. With NexDine, everything syncs in real-time across all our branches.",
    author: 'COO',
    role: 'Quick Service Restaurant, Hyderabad',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold">Loved by Restaurant Owners</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote className="mx-auto h-10 w-10 text-primary/30 mb-6" />
              <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="font-semibold">{testimonials[current].author}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="rounded-full border border-border p-2 hover:bg-accent transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="rounded-full border border-border p-2 hover:bg-accent transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
