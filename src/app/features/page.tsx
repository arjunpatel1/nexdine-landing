import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BusinessTypes from '@/components/sections/BusinessTypes'
import CTA from '@/components/sections/CTA'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import { generateFAQSchema, FEATURES_FAQS, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Features - Restaurant POS Software India | Complete Management Suite | NexDine',
  description: 'Explore every capability NexDine restaurant POS software India offers to modernize your restaurant operations including POS, inventory, CRM, QR ordering, and more.',
  keywords: ['restaurant POS features India', 'QR ordering system India', 'kitchen display system India', 'restaurant CRM India', 'NexDine features', 'restaurant POS software India', 'restaurant billing software India', 'restaurant software Andhra Pradesh', 'restaurant POS Hyderabad', 'restaurant POS Bangalore', 'restaurant POS Chennai'],
  openGraph: {
    title: 'Features - Restaurant POS Software India | Complete Management Suite | NexDine',
    description: 'Explore every capability NexDine restaurant POS software India offers to modernize your restaurant operations.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/features',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features - Restaurant POS Software India | Complete Management Suite | NexDine',
    description: 'Explore every capability NexDine restaurant POS software India offers to modernize your restaurant operations.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/features',
  },
}

export default function FeaturesPage () {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Features', item: 'https://nexdine.myteknoland.com/features' },
  ]

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(FEATURES_FAQS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }}
      />
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Complete Feature Set
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore every capability NexDine offers to modernize your restaurant operations.
          </p>
        </div>
      </div>
      <Features />
      <BusinessTypes />
      <Stats />
      <CTA />
    </PageWrapper>
  )
}
