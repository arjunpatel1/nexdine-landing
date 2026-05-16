'use client'

import { motion } from 'framer-motion'

export default function OrderServerAnimation() {
  const orders = [
    { id: 1, item: 'Burger', station: 'Grill', time: '04:32', color: '#f59e0b' },
    { id: 2, item: 'Salad', station: 'Cold', time: '01:15', color: '#22c55e' },
    { id: 3, item: 'Pasta', station: 'Hot', time: '06:42', color: '#ef4444' },
  ]

  const stations = ['Grill', 'Fryer', 'Cold', 'Hot']

  return (
    <svg viewBox="0 0 280 180" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="280" height="180" rx="12" fill="#0f172a" />

      {/* Title bar */}
      <rect x="0" y="0" width="280" height="28" rx="12" fill="#1e293b" />
      <rect x="0" y="18" width="280" height="10" fill="#1e293b" />
      <text x="140" y="18" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
        Kitchen Display System
      </text>

      {/* Station tabs */}
      {stations.map((station, i) => (
        <motion.g
          key={station}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <rect
            x={10 + i * 65}
            y={32}
            width="60"
            height="20"
            rx="6"
            fill={i === 0 ? '#f97316' : '#334155'}
            opacity={i === 0 ? 0.3 : 1}
          />
          <text
            x={10 + i * 65 + 30}
            y={46}
            textAnchor="middle"
            fontSize="8"
            fontWeight="500"
            fill={i === 0 ? '#f97316' : '#94a3b8'}
          >
            {station}
          </text>
        </motion.g>
      ))}

      {/* Order cards */}
      {orders.map((order, i) => (
        <motion.g
          key={order.id}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.2, duration: 0.4 }}
        >
          {/* Card bg */}
          <rect
            x="12"
            y={60 + i * 38}
            width="256"
            height="32"
            rx="8"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* Station badge */}
          <rect
            x="18"
            y={66 + i * 38}
            width="40"
            height="14"
            rx="4"
            fill={order.color}
            opacity="0.2"
          />
          <text
            x="38"
            y={76 + i * 38}
            textAnchor="middle"
            fontSize="7"
            fontWeight="600"
            fill={order.color}
          >
            {order.station}
          </text>

          {/* Item name */}
          <text x="66" y={80 + i * 38} fontSize="9" fontWeight="500" fill="#e2e8f0">
            2x {order.item}
          </text>

          {/* Timer */}
          <motion.text
            x="250"
            y={80 + i * 38}
            textAnchor="end"
            fontSize="10"
            fontWeight="700"
            fontFamily="monospace"
            fill={order.color}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
          >
            {order.time}
          </motion.text>
        </motion.g>
      ))}

      {/* Animated order flowing in */}
      <motion.g
        initial={{ x: 280, opacity: 0 }}
        animate={{ x: 0, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
      >
        <rect x="12" y="175" width="256" height="28" rx="8" fill="#1e293b" stroke="#f97316" strokeWidth="1" strokeDasharray="4 2" />
        <text x="24" y="193" fontSize="9" fontWeight="500" fill="#f97316">
          New: 1x Steak Well Done
        </text>
        <motion.circle
          cx="250"
          cy="189"
          r="3"
          fill="#f97316"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.g>

      {/* Progress bars */}
      {orders.map((order, i) => (
        <motion.rect
          key={`bar-${order.id}`}
          x="66"
          y={84 + i * 38}
          height="2"
          rx="1"
          fill={order.color}
          initial={{ width: 0 }}
          animate={{ width: [0, 120, 160, 180] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Bottom status */}
      <text x="140" y="172" textAnchor="middle" fontSize="8" fill="#64748b">
        3 Active · 12 Completed Today
      </text>
    </svg>
  )
}
