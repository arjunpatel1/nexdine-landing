'use client'

import { motion } from 'framer-motion'

export default function RestaurantMapAnimation () {
  const zones = [
    { name: 'Indoor', x: 20, y: 20, w: 100, h: 80, color: '#dbeafe' },
    { name: 'Bar', x: 130, y: 20, w: 80, h: 50, color: '#fef3c7' },
    { name: 'Outdoor', x: 20, y: 110, w: 190, h: 50, color: '#d1fae5' },
  ]

  const tables = [
    { cx: 45, cy: 45, r: 10, status: 'available' },
    { cx: 85, cy: 45, r: 10, status: 'occupied' },
    { cx: 45, cy: 80, r: 10, status: 'available' },
    { cx: 85, cy: 80, r: 10, status: 'reserved' },
    { cx: 155, cy: 40, r: 8, status: 'available' },
    { cx: 180, cy: 40, r: 8, status: 'occupied' },
    { cx: 50, cy: 130, r: 10, status: 'available' },
    { cx: 100, cy: 130, r: 10, status: 'available' },
    { cx: 150, cy: 130, r: 10, status: 'occupied' },
    { cx: 190, cy: 130, r: 10, status: 'available' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': { return '#22c55e'
      }
      case 'occupied': { return '#ef4444'
      }
      case 'reserved': { return '#f59e0b'
      }
      default: { return '#6b7280'
      }
    }
  }

  return (
    <svg viewBox="0 0 230 180" className="w-full h-full">
      {/* Background */}
      <rect x="0" y="0" width="230" height="180" rx="12" fill="#f8fafc" />

      {/* Zones */}
      {zones.map((zone, i) => (
        <motion.g
          key={zone.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
        >
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.w}
            height={zone.h}
            rx="8"
            fill={zone.color}
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="4 2"
          />
          <text
            x={zone.x + zone.w / 2}
            y={zone.y + 14}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#475569"
          >
            {zone.name}
          </text>
        </motion.g>
      ))}

      {/* Tables */}
      {tables.map((table, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 200 }}
        >
          <circle
            cx={table.cx}
            cy={table.cy}
            r={table.r}
            fill="white"
            stroke={getStatusColor(table.status)}
            strokeWidth="2"
          />
          <motion.circle
            cx={table.cx}
            cy={table.cy}
            r={table.r - 4}
            fill={getStatusColor(table.status)}
            opacity="0.2"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
          <text
            x={table.cx}
            y={table.cy + 3}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill={getStatusColor(table.status)}
          >
            {i + 1}
          </text>
        </motion.g>
      ))}

      {/* Animated connection lines - order routing */}
      <motion.path
        d="M 85 45 Q 120 60 155 40"
        fill="none"
        stroke="#f97316"
        strokeWidth="2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Animated dots along the path */}
      <motion.circle
        r="3"
        fill="#f97316"
        initial={{ offsetDistance: '0%' }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Drag ghost - showing drag and drop */}
      <motion.g
        animate={{
          x: [0, 30, 30, 0],
          y: [0, 0, 20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx={45} cy={130} r="12" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        <circle cx={45} cy={130} r="4" fill="#3b82f6" opacity="0.8" />
      </motion.g>

      {/* Legend */}
      <g transform="translate(130, 85)">
        <circle cx="0" cy="0" r="4" fill="#22c55e" />
        <text x="8" y="3" fontSize="8" fill="#64748b">Free</text>
        <circle cx="40" cy="0" r="4" fill="#ef4444" />
        <text x="48" y="3" fontSize="8" fill="#64748b">Busy</text>
        <circle cx="80" cy="0" r="4" fill="#f59e0b" />
        <text x="88" y="3" fontSize="8" fill="#64748b">Resv</text>
      </g>
    </svg>
  )
}
