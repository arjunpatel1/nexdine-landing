interface LogoProps {
  size?: number
  className?: string
}

export default function Logo({ size = 36, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F57C00" />
          <stop offset="100%" stopColor="#fb9411" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="100" height="100" rx="24" fill="url(#logoGrad)" />

      {/* Elegant geometric N monogram */}
      <g transform="translate(50, 50)">
        {/* Left vertical stroke */}
        <path
          d="M-20 -22 L-20 22"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* Diagonal */}
        <path
          d="M-20 -22 L20 22"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Right vertical stroke */}
        <path
          d="M20 -22 L20 22"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />

        {/* Subtle plate arc at bottom */}
        <path
          d="M-20 28 Q0 38 20 28"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>
    </svg>
  )
}
