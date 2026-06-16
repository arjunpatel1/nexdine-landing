import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | NexDine',
  description: 'The page you are looking for does not exist. Explore our restaurant management platform features, pricing, or contact us for a demo.',
}

export default function NotFound () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-6xl font-bold mb-4 text-primary">404</h2>
        <p className="text-xl text-muted-foreground mb-6">
          Page not found
        </p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/features"
            className="rounded-lg border border-border px-6 py-3 hover:bg-accent transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-border px-6 py-3 hover:bg-accent transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-6 py-3 hover:bg-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
