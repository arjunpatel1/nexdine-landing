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
import Testimonials from '@/components/sections/Testimonials'
import TrustedBy from '@/components/sections/TrustedBy'
import Workflow from '@/components/sections/Workflow'
import { generateFAQSchema, HOME_FAQS } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant Management Software India - All-in-One POS & Billing System | NexDine',
  description: 'NexDine is India\'s leading restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
  keywords: ['restaurant management software India', 'restaurant management system', 'restaurant POS software India', 'restaurant POS system India', 'restaurant software for small restaurants', 'cloud restaurant management software'],
  openGraph: {
    title: 'Restaurant Management Software India - All-in-One POS & Billing System | NexDine',
    description: 'NexDine is India\'s leading restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
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
    title: 'Restaurant Management Software India - All-in-One POS & Billing System | NexDine',
    description: 'NexDine is India\'s leading restaurant management software with POS billing, QR ordering, KDS, inventory management, CRM, WhatsApp automation and multi-branch control. Book a free demo today.',
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
      <Testimonials />
      <Pricing />
      <Comparison />
      <FAQ />
      <Newsletter />
      <CTA />
    </PageWrapper>
  )
}
