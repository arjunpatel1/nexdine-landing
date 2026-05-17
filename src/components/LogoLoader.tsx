'use client'

import { motion } from 'framer-motion'

interface LogoLoaderProps {
  size?: number
  fullScreen?: boolean
}

export default function LogoLoader ({ size = 80, fullScreen = false }: LogoLoaderProps) {
  const Wrapper = fullScreen
    ? ({ children }: { children: React.ReactNode }) => (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className="flex flex-col items-center justify-center">{children}</div>
      )

  const s = size
  const viewBox = 100

  return (
    <Wrapper>
      <div className="relative" style={{ width: s, height: s }}>
        {/* Outer rotating ring */}
        <motion.svg
          width={s}
          height={s}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          className="absolute inset-0"
        >
          <motion.circle
            cx={50}
            cy={50}
            r={46}
            fill="none"
            stroke="url(#loaderGrad)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="60 180"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F57C00" />
              <stop offset="100%" stopColor="#fb9411" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Logo with draw-in animation */}
        <svg
          width={s}
          height={s}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          className="absolute inset-0"
          style={{ padding: s * 0.18 }}
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F57C00" />
              <stop offset="100%" stopColor="#fb9411" />
            </linearGradient>
          </defs>
          <rect
            width="100"
            height="100"
            rx="24"
            fill="url(#logoGrad)"
          />
          <g transform="translate(50, 50)">
            {/* Left stroke */}
            <motion.path
              d="M-20 -22 L-20 22"
              stroke="#fff"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
            />
            {/* Diagonal */}
            <motion.path
              d="M-20 -22 L20 22"
              stroke="#fff"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
            />
            {/* Right stroke */}
            <motion.path
              d="M20 -22 L20 22"
              stroke="#fff"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeInOut' }}
            />
            {/* Plate arc */}
            <motion.path
              d="M-20 28 Q0 38 20 28"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.1, ease: 'easeInOut' }}
            />
          </g>
        </svg>
      </div>

      {/* Loading text */}
      <motion.p
        className="mt-6 text-sm font-medium text-muted-foreground tracking-wide"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        Loading NexDine
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.p>
    </Wrapper>
  )
}
