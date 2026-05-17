import type { Metadata, Viewport } from 'next'
import './globals.css'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      'name': 'NexDine',
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'Any',
      'offers': {
        '@type': 'Offer',
        'price': '3999',
        'priceCurrency': 'INR',
        'priceValidUntil': '2026-12-31',
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '124',
      },
      'description':
        'The all-in-one POS, inventory, CRM, and operations platform for modern restaurants. QR ordering, KDS, WhatsApp automation, and multi-branch management.',
      'url': 'https://nexdine.myteknoland.com',
      'image': 'https://nexdine.myteknoland.com/og-image.png',
    },
    {
      '@type': 'Organization',
      'name': 'NexDine',
      'url': 'https://nexdine.myteknoland.com',
      'logo': 'https://nexdine.myteknoland.com/favicon.svg',
      'sameAs': [
        'https://twitter.com/nexdine',
        'https://linkedin.com/company/nexdine',
      ],
      'parentOrganization': {
        '@type': 'Organization',
        'name': 'Myteknoland',
        'url': 'https://myteknoland.com',
      },
    },
  ],
}

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

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
