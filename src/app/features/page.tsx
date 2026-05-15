import PageWrapper from '@/components/PageWrapper'
import Features from '@/components/sections/Features'
import Stats from '@/components/sections/Stats'
import CTA from '@/components/sections/CTA'

export default function FeaturesPage() {
  return (
    <PageWrapper>
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
      <Stats />
      <CTA />
    </PageWrapper>
  )
}
