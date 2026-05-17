'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'nexdine_cookie_consent'

export default function CookieConsent () {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const dismiss = () => {
    localStorage.setItem(CONSENT_KEY, 'dismissed')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 z-[100] sm:left-auto sm:right-6 sm:max-w-sm"
        >
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-5 shadow-2xl shadow-black/20">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  We value your privacy
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={accept}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={dismiss}
                    className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
              <button
                onClick={dismiss}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
