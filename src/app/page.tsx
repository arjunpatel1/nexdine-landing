import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import BeforeAfter from '@/components/sections/BeforeAfter'
import BusinessTypes from '@/components/sections/BusinessTypes'
import Comparison from '@/components/sections/Comparison'
import CTA from '@/components/sections/CTA'
import FAQ from '@/components/sections/FAQ'
import FeatureShowcase from '@/components/sections/FeatureShowcase'
import Hero from '@/components/sections/Hero'
import Integrations from '@/components/sections/Integrations'
import Newsletter from '@/components/sections/Newsletter'
import Pricing from '@/components/sections/Pricing'
import ServiceExplainer from '@/components/sections/ServiceExplainer'
import Stats from '@/components/sections/Stats'
import TrustedBy from '@/components/sections/TrustedBy'
import Workflow from '@/components/sections/Workflow'
import { generateFAQSchema, HOME_FAQS } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant POS & Management Software in India | NexDine',
  description: 'NexDine is India\'s all-in-one restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
  keywords: ['restaurant POS software India', 'restaurant billing software India', 'restaurant POS Hyderabad', 'restaurant POS Bangalore', 'restaurant POS Chennai', 'restaurant POS Mumbai', 'restaurant POS Delhi', 'restaurant POS Telangana', 'restaurant POS Karnataka', 'restaurant POS Tamil Nadu', 'restaurant POS Andhra Pradesh'],
  openGraph: {
    title: 'Restaurant POS & Management Software in India | NexDine',
    description: 'NexDine is India\'s all-in-one restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com',
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
    title: 'Restaurant POS & Management Software in India | NexDine',
    description: 'NexDine is India\'s all-in-one restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
    images: ['https://nexdine.myteknoland.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com',
  },
}

export default function Home () {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(HOME_FAQS) }}
      />
      <Hero />
      <TrustedBy />
      <Integrations />
      <FeatureShowcase />
      <BusinessTypes />
      <ServiceExplainer />
      <Workflow />
      <BeforeAfter />
      <Stats />
      <Pricing />
      <Comparison />
      <FAQ />
      <Newsletter />
      <CTA />
    </PageWrapper>
  )
}
