'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/analytics'

const PHONE_RAW = '917288876715'

export default function WhatsAppButton () {
  const handleClick = () => {
    trackWhatsAppClick()
  }

  return (
    <motion.a
      href={`https://wa.me/${PHONE_RAW}?text=${encodeURIComponent('Hi, I would like to know more about NexDine.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with NexDine on WhatsApp"
      onClick={handleClick}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="text-sm font-semibold hidden sm:inline">Chat on WhatsApp</span>
    </motion.a>
  )
}
