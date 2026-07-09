import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import RestaurantOwnerLoginForm from '@/components/RestaurantOwnerLoginForm'
import { generateBreadcrumbSchema } from '@/lib/schema'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Owner Login | NexDine Awards',
  description: 'Restaurant owner login for NexDine Awards with mobile OTP access.',
  openGraph: {
    title: 'Owner Login | NexDine Awards',
    description: 'Restaurant owner login for NexDine Awards with mobile OTP access.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/restaurant/owner-login',
  },
}

export default function RestaurantOwnerLoginPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restaurant', item: 'https://nexdine.myteknoland.com/restaurant' },
    { name: 'Owner Login', item: 'https://nexdine.myteknoland.com/restaurant/owner-login' },
  ]

  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }} />
      
      <div className="pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/restaurant"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-orange-500 hover:text-orange-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Restaurants
          </Link>
        </div>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-4">
            Owner Login
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Restaurant Owner Login</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your mobile number and generate an OTP to sign in as a restaurant owner.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        <RestaurantOwnerLoginForm />
      </div>
    </PageWrapper>
  )
}
