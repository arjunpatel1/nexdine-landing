import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import PageWrapper from '@/components/PageWrapper'

export const metadata: Metadata = {
  title: 'NexDine Awards Admin',
  description: 'Admin portal for NexDine Restaurant Excellence Awards.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-slate-950 text-white pt-28 sm:pt-32">
        {children}
      </div>
    </PageWrapper>
  )
}
