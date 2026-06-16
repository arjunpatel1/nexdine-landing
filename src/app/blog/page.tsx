import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Blog - Restaurant Management Insights | NexDine',
  description: 'Expert insights on restaurant POS software, inventory management, QR ordering, KOT systems, and restaurant operations. Stay updated with industry trends and best practices.',
  keywords: ['restaurant management blog', 'POS software tips', 'restaurant operations', 'food industry insights', 'NexDine blog'],
  openGraph: {
    title: 'Blog - Restaurant Management Insights | NexDine',
    description: 'Expert insights on restaurant POS software, inventory management, QR ordering, KOT systems.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Restaurant Management Insights | NexDine',
    description: 'Expert insights on restaurant POS software, inventory management, QR ordering.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/blog',
  },
}

const blogPosts = [
  {
    title: 'Best Restaurant POS Software in India: Complete 2024 Guide',
    excerpt: 'Discover the top restaurant POS software solutions in India. Compare features, pricing, and find the perfect system for your restaurant business.',
    slug: 'best-restaurant-pos-software-in-india',
    date: '2024-01-15',
    category: 'POS Software',
  },
  {
    title: 'How to Reduce Food Wastage in Restaurants: Practical Strategies',
    excerpt: 'Learn effective strategies to minimize food waste in your restaurant. From inventory management to portion control, reduce costs and improve sustainability.',
    slug: 'how-to-reduce-food-wastage-in-restaurants',
    date: '2024-01-10',
    category: 'Operations',
  },
  {
    title: 'Restaurant Inventory Management Guide: From Basics to Advanced',
    excerpt: 'Master restaurant inventory management with this comprehensive guide. Learn tracking methods, cost control, and optimization techniques for better profitability.',
    slug: 'restaurant-inventory-management-guide',
    date: '2024-01-05',
    category: 'Inventory',
  },
  {
    title: 'Benefits of QR Ordering for Restaurants: Transform Your Service',
    excerpt: 'Explore how QR ordering systems revolutionize restaurant operations. Improve efficiency, reduce costs, and enhance customer experience with contactless dining.',
    slug: 'benefits-of-qr-ordering-for-restaurants',
    date: '2024-01-01',
    category: 'Technology',
  },
  {
    title: 'Complete Guide to KOT Software: Streamline Kitchen Operations',
    excerpt: 'Everything you need to know about Kitchen Order Ticket software. Improve kitchen efficiency, reduce errors, and optimize food preparation workflows.',
    slug: 'complete-guide-to-kot-software',
    date: '2023-12-28',
    category: 'Kitchen',
  },
]

export default function BlogPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Blog', item: 'https://nexdine.myteknoland.com/blog' },
  ]

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }}
      />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Restaurant Management Blog
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert insights on POS software, inventory management, QR ordering, and restaurant operations. Stay updated with industry trends and best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full border border-border rounded-xl bg-card p-6 hover:border-primary/50 transition-colors">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest restaurant management insights
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Subscribe to Our Newsletter
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
