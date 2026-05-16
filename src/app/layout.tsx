import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NexDine - Enterprise Restaurant Management Platform',
  description:
    'The all-in-one POS, inventory, CRM, and operations platform for modern restaurants. QR ordering, KDS, WhatsApp automation, and multi-branch management.',
  keywords: [
    'restaurant POS',
    'restaurant management',
    'QR ordering',
    'kitchen display system',
    'restaurant SaaS',
    'NexDine',
  ],
  authors: [{ name: 'NexDine' }],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    title: 'NexDine - Enterprise Restaurant Management Platform',
    description:
      'Transform your restaurant operations with the most advanced POS and management ecosystem.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030712',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
