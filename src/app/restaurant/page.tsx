import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import AwardRestaurantList from '@/components/AwardRestaurantList'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { getRestaurants } from '@/lib/award-db'

export const metadata: Metadata = {
  title: 'Restaurants | NexDine Awards',
  description: 'Discover nominated restaurants and learn how they can compete in the NexDine Restaurant Excellence Awards.',
  openGraph: {
    title: 'Restaurants | NexDine Awards',
    description: 'Discover nominated restaurants and learn how they can compete in the NexDine Restaurant Excellence Awards.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/restaurant',
  },
}

export default async function RestaurantPage() {
  const allRestaurants = await getRestaurants()
  const restaurants = allRestaurants.filter((r) => r.status === 'approved')

  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restaurant', item: 'https://nexdine.myteknoland.com/restaurant' },
  ]

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }} />
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Award Restaurants
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Award Restaurants</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of restaurants participating in the NexDine Restaurant Excellence Awards.
          </p>
        </div>
      </div>

      <AwardRestaurantList restaurants={restaurants} />
    </PageWrapper>
  )
}
