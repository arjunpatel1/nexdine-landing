'use client'

import { motion } from 'framer-motion'

export default function PosBillingAnimation () {
  const menuItems = [
    { name: 'Burger', price: '₹249', active: true },
    { name: 'Pizza', price: '₹399', active: false },
    { name: 'Pasta', price: '₹299', active: false },
    { name: 'Salad', price: '₹179', active: false },
  ]

  const cartItems = [
    { name: 'Burger', qty: 2, price: '₹498' },
    { name: 'Iced Tea', qty: 1, price: '₹99' },
  ]

  return (
    <svg viewBox="0 0 260 180" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="260" height="180" rx="12" fill="#f8fafc" />

      {/* Header */}
      <rect x="0" y="0" width="260" height="28" rx="12" fill="white" />
      <rect x="0" y="18" width="260" height="10" fill="white" />
      <text x="16" y="18" fontSize="9" fontWeight="600" fill="#1e293b">NexDine POS</text>
      <rect x="210" y="10" width="36" height="14" rx="7" fill="#dcfce7" />
      <text x="228" y="20" textAnchor="middle" fontSize="7" fontWeight="600" fill="#16a34a">Open</text>

      {/* Menu grid */}
      {menuItems.map((item, i) => (
        <motion.g
          key={item.name}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <rect
            x={14 + (i % 2) * 110}
            y={38 + Math.floor(i / 2) * 38}
            width="100"
            height="32"
            rx="8"
            fill={item.active ? '#fff7ed' : 'white'}
            stroke={item.active ? '#f97316' : '#e2e8f0'}
            strokeWidth={item.active ? '2' : '1'}
          />
          <rect
            x={22 + (i % 2) * 110}
            y={44 + Math.floor(i / 2) * 38}
            width="20"
            height="20"
            rx="6"
            fill="#f1f5f9"
          />
          <text
            x={50 + (i % 2) * 110}
            y={55 + Math.floor(i / 2) * 38}
            fontSize="8"
            fontWeight="500"
            fill="#334155"
          >
            {item.name}
          </text>
          <text
            x={50 + (i % 2) * 110}
            y={64 + Math.floor(i / 2) * 38}
            fontSize="7"
            fontWeight="600"
            fill="#f97316"
          >
            {item.price}
          </text>
        </motion.g>
      ))}

      {/* Cart panel */}
      <motion.g
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <rect x="14" y="120" width="232" height="50" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="26" y="135" fontSize="8" fontWeight="600" fill="#334155">
          Cart (
          {cartItems.length}
          )
        </text>
        <text x="230" y="135" textAnchor="end" fontSize="9" fontWeight="700" fill="#1e293b">₹597</text>

        {cartItems.map((item, i) => (
          <text key={item.name} x="26" y={148 + i * 10} fontSize="7" fill="#64748b">
            {item.qty}
            x
            {item.name}
          </text>
        ))}

        {/* Pay button */}
        <motion.rect
          x="170"
          y="130"
          width="68"
          height="22"
          rx="11"
          fill="#f97316"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="204" y="144" textAnchor="middle" fontSize="8" fontWeight="600" fill="white">
          Pay Now
        </text>
      </motion.g>

      {/* Animated tap indicator on active item */}
      <motion.circle
        cx="100"
        cy="60"
        r="8"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
        opacity="0"
        animate={{ opacity: [0, 0.6, 0], r: [8, 14, 8] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
      />

      {/* Floating payment method icons */}
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="190" y="155" width="14" height="10" rx="2" fill="#1e293b" />
        <rect x="192" y="157" width="10" height="1" rx="0.5" fill="#fbbf24" />
        <rect x="208" y="155" width="14" height="10" rx="2" fill="#22c55e" opacity="0.8" />
        <text x="215" y="162" textAnchor="middle" fontSize="5" fill="white" fontWeight="700">UPI</text>
        <rect x="226" y="155" width="14" height="10" rx="2" fill="#3b82f6" opacity="0.8" />
        <text x="233" y="162" textAnchor="middle" fontSize="5" fill="white" fontWeight="700">₹</text>
      </motion.g>
    </svg>
  )
}
