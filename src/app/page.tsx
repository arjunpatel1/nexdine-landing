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

export default function Home () {
  return (
    <PageWrapper>
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
