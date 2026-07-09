import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
import PageWrapper from '@/components/PageWrapper'
import { getRestaurants } from '@/lib/award-db'
import { generateBreadcrumbSchema } from '@/lib/schema'
import RestaurantVotingForm from '@/components/RestaurantVotingForm'

interface RestaurantPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: RestaurantPageProps): Promise<Metadata> {
  const restaurants = await getRestaurants()
  const restaurant = restaurants.find((item) => item.id.toString() === params.id)

  if (!restaurant) {
    return {
      title: 'Restaurant not found | NexDine Awards',
      description: 'Restaurant details not found for the selected award entry.',
    }
  }

  return {
    title: `${restaurant.restaurant_name} | NexDine Awards`,
    description: restaurant.description,
    openGraph: {
      title: `${restaurant.restaurant_name} | NexDine Awards`,
      description: restaurant.description,
      type: 'website',
      url: `https://nexdine.myteknoland.com/restaurant/${restaurant.id}`,
    },
  }
}

export default async function RestaurantDetailPage({ params }: RestaurantPageProps) {
  const restaurants = await getRestaurants()
  const restaurant = restaurants.find((item) => item.id.toString() === params.id)

  if (!restaurant) {
    notFound()
  }

  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restaurant', item: 'https://nexdine.myteknoland.com/restaurant' },
    { name: restaurant.restaurant_name, item: `https://nexdine.myteknoland.com/restaurant/${restaurant.id}` },
  ]

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }} />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/restaurant"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-orange-500 hover:text-orange-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Restaurants
            </Link>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[#0d1526] shadow-xl">
            
            {/* Logo */}
            <div className="flex items-center justify-center pt-10 pb-4">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-inner shadow-white/5">
                {restaurant.logo ? (
                  <img
                    src={restaurant.logo}
                    alt={`${restaurant.restaurant_name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-bold text-slate-300">{restaurant.restaurant_name.charAt(0)}</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-10 space-y-6">
              {/* Name */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mb-2">Restaurant</p>
                <h1 className="text-3xl font-bold text-white">{restaurant.restaurant_name}</h1>
              </div>

              <div className="border-t border-slate-800" />

              {/* Location & Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">{restaurant.location}</p>
                  {restaurant.address && (
                    <p className="text-sm text-slate-400 mt-0.5">{restaurant.address}</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-3">Nominated Categories</p>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category) => (
                    <span
                      key={category.id}
                      className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 text-xs font-semibold text-orange-400"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vote Form / Button */}
              <RestaurantVotingForm restaurant={restaurant} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
