'use client'

import { motion } from 'framer-motion'

export default function TableSelectAnimation() {
  const tables = [
    { id: 1, x: 30, y: 30, w: 50, h: 50, status: 'available' },
    { id: 2, x: 100, y: 30, w: 50, h: 50, status: 'occupied' },
    { id: 3, x: 170, y: 30, w: 50, h: 50, status: 'available' },
    { id: 4, x: 30, y: 100, w: 50, h: 50, status: 'reserved' },
    { id: 5, x: 100, y: 100, w: 50, h: 50, status: 'available' },
    { id: 6, x: 170, y: 100, w: 50, h: 50, status: 'occupied' },
  ]

  const getColor = (status: string) => {
    switch (status) {
      case 'available': return '#22c55e'
      case 'occupied': return '#ef4444'
      case 'reserved': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <svg viewBox="0 0 250 180" className="w-full h-full">
      {/* Floor background */}
      <rect x="5" y="5" width="240" height="170" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* Walls */}
      <rect x="5" y="5" width="240" height="6" fill="#cbd5e1" rx="2" />
      <rect x="5" y="5" width="6" height="170" fill="#cbd5e1" rx="2" />
      <rect x="239" y="5" width="6" height="170" fill="#cbd5e1" rx="2" />

      {tables.map((table, i) => (
        <motion.g
          key={table.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4, type: 'spring' }}
        >
          {/* Table glow on hover simulation */}
          <motion.rect
            x={table.x - 3}
            y={table.y - 3}
            width={table.w + 6}
            height={table.h + 6}
            rx="10"
            fill={getColor(table.status)}
            opacity="0.15"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />

          {/* Table base */}
          <rect
            x={table.x}
            y={table.y}
            width={table.w}
            height={table.h}
            rx="8"
            fill="white"
            stroke={getColor(table.status)}
            strokeWidth="2"
          />

          {/* Table number */}
          <text
            x={table.x + table.w / 2}
            y={table.y + table.h / 2 + 4}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={getColor(table.status)}
          >
            T{table.id}
          </text>

          {/* Status dot */}
          <motion.circle
            cx={table.x + table.w - 8}
            cy={table.y + 10}
            r="4"
            fill={getColor(table.status)}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        </motion.g>
      ))}

      {/* Selection indicator - moves between tables */}
      <motion.rect
        x={30}
        y={30}
        width={50}
        height={50}
        rx="10"
        fill="none"
        stroke="#f97316"
        strokeWidth="3"
        strokeDasharray="6 4"
        animate={{
          x: [30, 100, 170, 30, 100, 170],
          y: [30, 30, 30, 100, 100, 100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Chair icons around selected table */}
      <motion.g
        animate={{ x: [0, 70, 140, 0, 70, 140] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x={42} y={22} width="8" height="6" rx="2" fill="#94a3b8" />
        <rect x={42} y={82} width="8" height="6" rx="2" fill="#94a3b8" />
        <rect x={22} y={42} width="6" height="8" rx="2" fill="#94a3b8" />
        <rect x={82} y={42} width="6" height="8" rx="2" fill="#94a3b8" />
      </motion.g>

      {/* Label */}
      <text x="125" y="165" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="500">
        Tap to select table
      </text>
    </svg>
  )
}
