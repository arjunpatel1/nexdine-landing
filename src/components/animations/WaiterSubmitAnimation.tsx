'use client'

import { motion } from 'framer-motion'

export default function WaiterSubmitAnimation () {
  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      {/* Phone frame */}
      <rect x="60" y="10" width="120" height="160" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="64" y="14" width="112" height="152" rx="12" fill="#0f172a" />

      {/* Notch */}
      <rect x="100" y="14" width="40" height="14" rx="7" fill="#1e293b" />

      {/* Header */}
      <text x="120" y="38" textAnchor="middle" fontSize="9" fontWeight="600" fill="#e2e8f0">
        Table 5 · Dine-in
      </text>
      <line x1="70" y1="44" x2="170" y2="44" stroke="#334155" strokeWidth="1" />

      {/* Order items */}
      {[
        { name: 'Grilled Salmon', qty: 1, y: 56 },
        { name: 'Caesar Salad', qty: 2, y: 76 },
        { name: 'Iced Tea', qty: 3, y: 96 },
      ].map((item, i) => (
        <motion.g
          key={item.name}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
        >
          <rect x="72" y={item.y - 8} width="96" height="22" rx="6" fill="#1e293b" />
          <text x="78" y={item.y + 5} fontSize="8" fontWeight="500" fill="#cbd5e1">
            {item.name}
          </text>
          <text x="160" y={item.y + 5} textAnchor="end" fontSize="8" fontWeight="700" fill="#f97316">
            {item.qty}
            x
          </text>
        </motion.g>
      ))}

      {/* Animated add action */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ delay: 0.9, duration: 0.4, type: 'spring' }}
      >
        <circle cx="175" cy="102" r="10" fill="#f97316" />
        <line x1="175" y1="96" x2="175" y2="108" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="169" y1="102" x2="181" y2="102" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* Total */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.3 }}
      >
        <line x1="72" y1="118" x2="168" y2="118" stroke="#334155" strokeWidth="1" strokeDasharray="3 2" />
        <text x="78" y="130" fontSize="8" fontWeight="500" fill="#94a3b8">Total</text>
        <text x="162" y="130" textAnchor="end" fontSize="10" fontWeight="700" fill="#e2e8f0">₹1,247</text>
      </motion.g>

      {/* Submit button */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
      >
        <rect x="78" y="140" width="84" height="24" rx="12" fill="#f97316" />
        <text x="120" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="white">
          Send to Kitchen
        </text>
      </motion.g>

      {/* Pulse ring around button */}
      <motion.ellipse
        cx="120"
        cy="152"
        rx="42"
        ry="12"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
        opacity="0"
        animate={{ opacity: [0, 0.4, 0], rx: [42, 55, 42], ry: [12, 18, 12] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />

      {/* Floating notification - order sent */}
      <motion.g
        initial={{ y: 20, opacity: 0, x: 0 }}
        animate={{ y: [20, -10, -10, 20], opacity: [0, 1, 1, 0], x: [0, 0, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 2 }}
      >
        <rect x="150" y="40" width="80" height="28" rx="8" fill="#22c55e" opacity="0.95" />
        <text x="190" y="52" textAnchor="middle" fontSize="7" fontWeight="600" fill="white">
          Order Sent!
        </text>
        <text x="190" y="62" textAnchor="middle" fontSize="6" fill="#dcfce7">
          Kitchen notified
        </text>
        {/* Triangle pointer */}
        <polygon points="150,54 144,58 150,62" fill="#22c55e" opacity="0.95" />
      </motion.g>

      {/* WiFi / connection signal */}
      <motion.g
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M 155 24 Q 160 19 165 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 158 27 Q 160 25 162 27" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="160" cy="30" r="1.5" fill="#22c55e" />
      </motion.g>

      {/* Bottom home indicator */}
      <rect x="105" y="162" width="30" height="3" rx="1.5" fill="#475569" />
    </svg>
  )
}
