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
  title: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
  description: 'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
  keywords: ['restaurant POS software', 'restaurant billing software', 'restaurant management system', 'QR ordering software', 'cloud kitchen software', 'restaurant software India'],
  openGraph: {
    title: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
    description: 'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
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
    title: 'Restaurant POS Software | QR Ordering, Billing & Inventory Management | NexDine',
    description: 'NexDine is an all-in-one restaurant management platform with POS billing, QR ordering, kitchen display system, inventory management, CRM, loyalty programs and delivery integrations.',
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
