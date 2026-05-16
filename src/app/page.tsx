import PageWrapper from '@/components/PageWrapper'
import Hero from '@/components/sections/Hero'
import TrustedBy from '@/components/sections/TrustedBy'
import FeatureShowcase from '@/components/sections/FeatureShowcase'
import ServiceExplainer from '@/components/sections/ServiceExplainer'
import Workflow from '@/components/sections/Workflow'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Stats from '@/components/sections/Stats'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import Integrations from '@/components/sections/Integrations'

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <TrustedBy />
      <Integrations />
      <FeatureShowcase />
      <ServiceExplainer />
      <Workflow />
      <BeforeAfter />
      <Stats />
      <Pricing />
      <CTA />
    </PageWrapper>
  )
}
