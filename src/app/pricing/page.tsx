import PageWrapper from '@/components/PageWrapper'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'

export default function PricingPage() {
  return (
    <PageWrapper>
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
