import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Table Mapping - Visual Floor Plan Management | NexDine',
  description: 'Visual drag-and-drop floor plans with live occupancy, reservations, and merge/split operations. Smart table management for restaurants.',
  keywords: ['table management system', 'restaurant floor plan', 'table mapping software', 'restaurant reservation system', 'NexDine tables'],
  openGraph: {
    title: 'Table Mapping - Visual Floor Plan Management | NexDine',
    description: 'Visual drag-and-drop floor plans with live occupancy, reservations, and merge/split operations.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/table-mapping',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Table Mapping - Visual Floor Plan Management | NexDine',
    description: 'Visual drag-and-drop floor plans with live occupancy, reservations, and merge/split operations.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/table-mapping',
  },
}

export default function TableMappingPage () {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Table Mapping', item: 'https://nexdine.myteknoland.com/table-mapping' },
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
              Table Mapping
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visual drag-and-drop floor plans with live occupancy, reservations, and merge/split operations.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl mb-12">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 24 }).map((_, i) => {
                const status = i % 5 === 0 ? 'occupied' : (i % 7 === 0 ? 'reserved' : 'available')
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold border-2 ${
                      status === 'occupied'
                        ? 'border-red-500/30 bg-red-500/10 text-red-400'
                        : (status === 'reserved'
                            ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
                            : 'border-green-500/30 bg-green-500/10 text-green-400')
                    }`}
                  >
                    T
                    {i + 1}
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <span className="text-sm text-muted-foreground">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="text-sm text-muted-foreground">Reserved</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Drag & Drop Layout', desc: 'Design your floor plan visually. Move tables, resize zones, and save layouts per shift.' },
              { title: 'Live Occupancy', desc: 'See table status update in real-time as orders are placed, served, and cleared.' },
              { title: 'Merge & Split', desc: 'Combine adjacent tables for large parties. Split bills automatically when tables separate.' },
              { title: 'Reservation Holds', desc: 'Block tables for upcoming reservations. Visual indicators show hold times.' },
            ].map(f => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
