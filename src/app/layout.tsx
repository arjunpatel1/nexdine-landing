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
      'operatingSystem': 'Web',
      'description':
        'Restaurant POS and Management Software - All-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
      'url': 'https://nexdine.myteknoland.com',
      'image': 'https://nexdine.myteknoland.com/og-image.png',
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
      'review': [
        {
          '@type': 'Review',
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': '5',
            'bestRating': '5',
          },
          'author': {
            '@type': 'Person',
            'name': 'Ravindara',
          },
          'reviewBody': 'NexDine has significantly improved our restaurant operations. Billing is faster, order management is smoother, and inventory tracking has become much easier. The platform helps our staff work efficiently even during busy hours.',
          'itemReviewed': {
            '@type': 'LocalBusiness',
            'name': 'Krishna Mayuri',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Rayachoty',
              'addressRegion': 'Andhra Pradesh',
              'addressCountry': 'IN',
            },
          },
        },
        {
          '@type': 'Review',
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': '5',
            'bestRating': '5',
          },
          'author': {
            '@type': 'Person',
            'name': 'Salam',
          },
          'reviewBody': 'NexDine made it easy to manage billing, orders, and daily restaurant operations from a single platform. The system is simple to use and has improved our customer service experience.',
          'itemReviewed': {
            '@type': 'LocalBusiness',
            'name': 'Ghee Dosa',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Rayachoty',
              'addressRegion': 'Andhra Pradesh',
              'addressCountry': 'IN',
            },
          },
        },
        {
          '@type': 'Review',
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': '5',
            'bestRating': '5',
          },
          'author': {
            '@type': 'Person',
            'name': 'Restaurant Owner',
          },
          'reviewBody': 'NexDine cut our order-to-table time significantly. The QR ordering and KDS integration works seamlessly.',
          'itemReviewed': {
            '@type': 'LocalBusiness',
            'name': 'Multi-location Chain',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Mumbai',
              'addressRegion': 'Maharashtra',
              'addressCountry': 'IN',
            },
          },
        },
        {
          '@type': 'Review',
          'reviewRating': {
            '@type': 'Rating',
            'ratingValue': '5',
            'bestRating': '5',
          },
          'author': {
            '@type': 'Person',
            'name': 'General Manager',
          },
          'reviewBody': 'We replaced multiple separate tools with NexDine. Having everything in one platform has been a game changer for our operations.',
          'itemReviewed': {
            '@type': 'LocalBusiness',
            'name': 'Fine Dining Restaurant',
            'address': {
              '@type': 'PostalAddress',
              'addressLocality': 'Bangalore',
              'addressRegion': 'Karnataka',
              'addressCountry': 'IN',
            },
          },
        },
      ],
      'featureList': [
        'POS Billing System',
        'QR Ordering',
        'Kitchen Display System',
        'Inventory Management',
        'CRM and Loyalty Programs',
        'Delivery Integrations',
        'Multi-branch Management',
        'WhatsApp Automation',
      ],
    },
    {
      '@type': 'Product',
      'name': 'NexDine Restaurant POS Software',
      'description': 'All-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
      'image': 'https://nexdine.myteknoland.com/og-image.png',
      'url': 'https://nexdine.myteknoland.com',
      'brand': {
        '@type': 'Brand',
        'name': 'NexDine',
        'url': 'https://nexdine.myteknoland.com',
      },
      'offers': {
        '@type': 'Offer',
        'price': '3999',
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'url': 'https://nexdine.myteknoland.com',
        'priceValidUntil': '2026-12-31',
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '124',
      },
    },
    {
      '@type': 'Organization',
      'name': 'NexDine',
      'url': 'https://nexdine.myteknoland.com',
      'logo': 'https://nexdine.myteknoland.com/favicon.svg',
      'description': 'Restaurant POS and Management Software Provider',
      'sameAs': [
        'https://twitter.com/nexdine',
        'https://linkedin.com/company/nexdine',
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+91-72888 76715',
        'contactType': 'sales',
        'email': 'info@myteknoland.net',
        'areaServed': 'IN',
        'availableLanguage': 'English',
      },
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '1/1, Bangalore Main Road, Rayachoty',
        'addressLocality': 'Rayachoty',
        'addressRegion': 'Andhra Pradesh',
        'postalCode': '516269',
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
      'description': 'Restaurant POS Software | QR Ordering, Billing & Inventory Management',
      'publisher': {
        '@type': 'Organization',
        'name': 'NexDine',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://nexdine.myteknoland.com/favicon.svg',
        },
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://nexdine.myteknoland.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is NexDine Restaurant POS Software?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Does NexDine support QR ordering?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, NexDine includes a comprehensive QR ordering system that allows customers to scan QR codes at their tables and place orders directly from their smartphones.',
          },
        },
        {
          '@type': 'Question',
          'name': 'What features does NexDine offer for inventory management?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'NexDine provides real-time inventory tracking, low stock alerts, recipe management, supplier integration, and automated purchase order generation to help restaurants manage their inventory efficiently.',
          },
        },
        {
          '@type': 'Question',
          'name': 'Is NexDine suitable for multi-branch restaurants?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, NexDine is designed for multi-branch management with centralized control, real-time sync across locations, consolidated reporting, and branch-specific customization options.',
          },
        },
      ],
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nexdine.myteknoland.com'),
  title: {
    default: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
    template: '%s | NexDine',
  },
  description:
    'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
  keywords: [
    'restaurant POS software',
    'restaurant billing software',
    'restaurant management system',
    'QR ordering software',
    'cloud kitchen software',
    'restaurant software India',
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
    title: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
    description:
      'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
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
    title: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
    description:
      'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
    images: ['https://nexdine.myteknoland.com/og-image.png'],
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
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
