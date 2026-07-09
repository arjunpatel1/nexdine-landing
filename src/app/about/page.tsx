import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import AwardAboutClient from '@/components/AwardAboutClient'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Award - Restaurant Excellence Awards | NexDine',
  description: 'Learn about the NexDine Restaurant Excellence Awards and nominate your restaurant for recognition in local award categories.',
  openGraph: {
    title: 'Award - Restaurant Excellence Awards | NexDine',
    description: 'Learn about the NexDine Restaurant Excellence Awards and nominate your restaurant for recognition in local award categories.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/about',
  },
}

export default function AwardAboutPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Award', item: 'https://nexdine.myteknoland.com/about' },
  ]

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }} />
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Restaurant Excellence Awards</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how NexDine celebrates the best restaurants in the region through public nominations and transparent category voting.
          </p>
        </div>
      </div>
      <AwardAboutClient />
    </PageWrapper>
  )
}
