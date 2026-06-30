import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import Pricing from '@/components/sections/Pricing'
import { generateFAQSchema, PRICING_FAQS, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Pricing - Restaurant POS Software India | Transparent Pricing | NexDine',
  description: 'Start free for 14 days. Scale up or down anytime. No hidden fees. Transparent pricing for NexDine restaurant POS software India.',
  keywords: ['restaurant POS pricing India', 'restaurant software cost India', 'NexDine pricing', 'restaurant management pricing India', 'affordable POS India', 'restaurant POS software India', 'restaurant billing software India', 'restaurant software Andhra Pradesh', 'restaurant POS Hyderabad', 'restaurant POS Bangalore', 'restaurant POS Chennai'],
  openGraph: {
    title: 'Pricing - Restaurant POS Software India | Transparent Pricing | NexDine',
    description: 'Start free for 14 days. Scale up or down anytime. No hidden fees. Transparent pricing for NexDine restaurant POS software India.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/pricing',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Restaurant POS Software India | Transparent Pricing | NexDine',
    description: 'Start free for 14 days. Scale up or down anytime. No hidden fees. Transparent pricing for NexDine restaurant POS software India.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/pricing',
  },
}

export default function PricingPage () {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Pricing', item: 'https://nexdine.myteknoland.com/pricing' },
  ]

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(PRICING_FAQS) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }}
      />
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free for 14 days. Scale up or down anytime. No hidden fees.
          </p>
        </div>
      </div>
      <Pricing />
      <CTA />
    </PageWrapper>
  )
}
