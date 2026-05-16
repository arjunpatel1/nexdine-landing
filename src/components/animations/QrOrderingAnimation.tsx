'use client'

import { motion } from 'framer-motion'

export default function QrOrderingAnimation() {
  const qrModules = [
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,0,0,0],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
  ]

  return (
    <svg viewBox="0 0 240 180" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="240" height="180" rx="12" fill="#f0fdf4" />

      {/* Phone mockup */}
      <rect x="80" y="15" width="80" height="130" rx="12" fill="white" stroke="#d1fae5" strokeWidth="2" />
      <rect x="84" y="19" width="72" height="122" rx="8" fill="#f8fafc" />

      {/* Notch */}
      <rect x="110" y="19" width="20" height="8" rx="4" fill="white" />

      {/* QR Code */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <rect x="96" y="34" width="48" height="48" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        {qrModules.map((row, r) =>
          row.map((cell, c) => (
            <rect
              key={`${r}-${c}`}
              x={98 + c * 6}
              y={36 + r * 6}
              width="5"
              height="5"
              rx="1"
              fill={cell ? '#059669' : 'white'}
            />
          ))
        )}
        {/* Corner markers */}
        <rect x="100" y="38" width="10" height="10" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
        <rect x="130" y="38" width="10" height="10" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
        <rect x="100" y="68" width="10" height="10" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
      </motion.g>

      {/* Table label */}
      <text x="120" y="92" textAnchor="middle" fontSize="7" fontWeight="600" fill="#334155">
        Table 12
      </text>

      {/* Menu preview */}
      <motion.g
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <rect x="94" y="100" width="52" height="12" rx="4" fill="#ecfdf5" />
        <text x="120" y="109" textAnchor="middle" fontSize="6" fontWeight="500" fill="#059669">Menu</text>
        <rect x="94" y="116" width="52" height="12" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <text x="120" y="125" textAnchor="middle" fontSize="6" fontWeight="500" fill="#64748b">Cart</text>
      </motion.g>

      {/* Phone signal waves */}
      <motion.g
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path d="M 75 50 Q 60 50 55 65" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 70 55 Q 58 55 55 65" fill="none" stroke="#059669" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </motion.g>

      {/* Customer phone scanning */}
      <motion.g
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <rect x="15" y="50" width="40" height="70" rx="8" fill="#1e293b" transform="rotate(-12 35 85)" />
        <rect x="18" y="54" width="34" height="62" rx="6" fill="#0f172a" transform="rotate(-12 35 85)" />
        {/* Camera viewfinder */}
        <motion.rect
          x="22"
          y="58"
          width="26"
          height="26"
          rx="4"
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          transform="rotate(-12 35 85)"
          animate={{ strokeDashoffset: [0, 12] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="35"
          cy="71"
          r="3"
          fill="#22c55e"
          transform="rotate(-12 35 85)"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.g>

      {/* Order flowing to kitchen */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      >
        <path d="M 165 80 Q 190 70 200 100" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
        <motion.circle
          r="4"
          fill="#f97316"
        >
          <animateMotion dur="2s" repeatCount="indefinite" path="M 165 80 Q 190 70 200 100" />
        </motion.circle>
      </motion.g>

      {/* Kitchen icon */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <rect x="190" y="95" width="38" height="28" rx="6" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
        <text x="209" y="108" textAnchor="middle" fontSize="6" fontWeight="600" fill="#f97316">Kitchen</text>
        <text x="209" y="116" textAnchor="middle" fontSize="5" fill="#94a3b8">Order #4821</text>
      </motion.g>

      {/* Bottom text */}
      <text x="120" y="162" textAnchor="middle" fontSize="9" fontWeight="500" fill="#059669">
        Scan · Browse · Order
      </text>
    </svg>
  )
}
