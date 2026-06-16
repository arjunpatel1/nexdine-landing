'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import CookieConsent from './CookieConsent'
import Footer from './Footer'
import LiveChat from './LiveChat'
import LogoLoader from './LogoLoader'
import Navbar from './Navbar'
import WhatsAppButton from './WhatsAppButton'
import { trackPageView } from '@/lib/analytics'

export default function PageWrapper ({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Smart loader: wait for actual page readiness + minimum branding time
  useEffect(() => {
    const minTime = 800
    const start = Date.now()

    const finish = () => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, minTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish)
      return () => window.removeEventListener('load', finish)
    }
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [pathname, prefersReducedMotion])

  // Track page view on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])

  // Scroll progress + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
      setShowBackToTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }, [prefersReducedMotion])

  const pageVariants = prefersReducedMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          >
            <LogoLoader size={80} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60] transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Navbar />

      <main className="min-h-[50dvh]">
        <motion.div
          key={pathname}
          initial={pageVariants.initial}
          animate={loading ? pageVariants.initial : pageVariants.animate}
          transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
      <LiveChat />
      <CookieConsent />

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
