import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'QR Ordering - Contactless Restaurant Menu | NexDine',
  description: 'Customers scan, browse, and order directly from their phones. No app download needed. Contactless QR ordering for modern restaurants.',
  keywords: ['QR ordering system', 'contactless restaurant menu', 'QR code menu', 'digital menu ordering', 'NexDine QR'],
  openGraph: {
    title: 'QR Ordering - Contactless Restaurant Menu | NexDine',
    description: 'Customers scan, browse, and order directly from their phones. No app download needed.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/qr-ordering',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Ordering - Contactless Restaurant Menu | NexDine',
    description: 'Customers scan, browse, and order directly from their phones. No app download needed.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/qr-ordering',
  },
}

export default function QROrderingPage () {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'QR Ordering', item: 'https://nexdine.myteknoland.com/qr-ordering' },
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
              QR Ordering
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Customers scan, browse, and order directly from their phones. No app download needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Scan QR Code', desc: 'Place a unique QR code on each table. Customers scan with their native camera app.' },
              { step: '02', title: 'Browse & Order', desc: 'A beautiful, responsive menu opens instantly. Customers add items and customize.' },
              { step: '03', title: 'Kitchen Receives', desc: 'Orders flow straight to the KDS. No waiter intervention needed for standard orders.' },
            ].map(item => (
              <div key={item.step} className="relative rounded-2xl border border-border bg-card p-8">
                <span className="text-5xl font-bold text-primary/10">{item.step}</span>
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
