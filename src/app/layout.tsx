import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-72888 76715',
        'contactType': 'sales',
        'email': 'info@myteknoland.net',
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1/1, Bangalore Main Road, Rayachoty',
        'addressLocality': 'Rayachoty',
        'addressRegion': 'Andhra Pradesh',
        'addressCountry': 'IN',
      },
      'parentOrganization': {
        '@type': 'Organization',
        'name': 'Myteknoland',
        'url': 'https://myteknoland.com',
      },
    },
    {
      '@type': 'WebSite',
      'name': 'NexDine',
      'url': 'https://nexdine.myteknoland.com',
      'description': 'Enterprise Restaurant Management Platform',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://nexdine.myteknoland.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export const metadata: Metadata = {
  title: {
    default: 'NexDine - Enterprise Restaurant Management Platform',
    template: '%s | NexDine',
  },
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
  manifest: '/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
    },
  }),
  openGraph: {
    title: 'NexDine - Enterprise Restaurant Management Platform',
    description:
      'Transform your restaurant operations with the most advanced POS and management ecosystem.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com',
    siteName: 'NexDine',
    images: [
      {
        url: 'https://nexdine.myteknoland.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NexDine Restaurant Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexDine - Enterprise Restaurant Management Platform',
    description:
      'Transform your restaurant operations with the most advanced POS and management ecosystem.',
    images: ['https://nexdine.myteknoland.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
