'use client'

import { motion } from 'framer-motion'

export default function TrustedBy () {
  return (
    <section className="py-16 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider"
        >
          Trusted by 2,000+ restaurants worldwide
        </motion.p>
      </div>
    </section>
  )
}
