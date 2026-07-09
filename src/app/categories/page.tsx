import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { generateBreadcrumbSchema } from '@/lib/schema'
import CategoriesClient from './CategoriesClient'

export const metadata: Metadata = {
  title: 'Award Categories | NexDine',
  description: 'Browse the award categories for the NexDine Restaurant Excellence Awards and learn how restaurants can participate.',
  openGraph: {
    title: 'Award Categories | NexDine',
    description: 'Browse the award categories for the NexDine Restaurant Excellence Awards and learn how restaurants can participate.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/categories',
  },
}

export default function CategoriesPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Categories', item: 'https://nexdine.myteknoland.com/categories' },
  ]

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }} />
      <CategoriesClient />
    </PageWrapper>
  )
}
