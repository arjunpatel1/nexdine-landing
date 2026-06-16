import type { Metadata } from 'next'
import PageWrapper from '@/components/PageWrapper'
import { generateAuditReport } from '@/lib/seo-audit'

export const metadata: Metadata = {
  title: 'SEO Monitoring Report | NexDine',
  description: 'Internal SEO monitoring and indexing report for NexDine website.',
}

export default function SEOReportPage() {
  const audit = generateAuditReport()

  return (
    <PageWrapper>
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">SEO Monitoring Report</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="border border-border rounded-lg bg-card p-6">
              <h2 className="text-lg font-semibold mb-2">Indexed Pages</h2>
              <p className="text-3xl font-bold text-primary">{audit.indexedPages}</p>
            </div>
            <div className="border border-border rounded-lg bg-card p-6">
              <h2 className="text-lg font-semibold mb-2">Sitemap URLs</h2>
              <p className="text-3xl font-bold text-primary">{audit.sitemapUrls.length}</p>
            </div>
            <div className="border border-border rounded-lg bg-card p-6">
              <h2 className="text-lg font-semibold mb-2">Structured Data Coverage</h2>
              <p className="text-3xl font-bold text-primary">{audit.structuredDataCoverage.length}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Sitemap Routes</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.sitemapUrls.map(url => (
                  <li key={url} className="text-sm text-muted-foreground">{url}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Canonical URLs</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.canonicalUrls.map(url => (
                  <li key={url} className="text-sm text-muted-foreground">{url}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Structured Data Coverage</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.structuredDataCoverage.map(url => (
                  <li key={url} className="text-sm text-muted-foreground">{url}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Internal Link Coverage</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.internalLinkCoverage.map(url => (
                  <li key={url} className="text-sm text-muted-foreground">{url}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Conversion Tracking Coverage</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.conversionTrackingCoverage.map(url => (
                  <li key={url} className="text-sm text-muted-foreground">{url}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.completedTasks.map(task => (
                  <li key={task} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Tasks</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.pendingTasks.map(task => (
                  <li key={task} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-yellow-500">○</span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Missing Opportunities</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              <ul className="space-y-2">
                {audit.missingOpportunities.map(opportunity => (
                  <li key={opportunity} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-blue-500">!</span>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Orphan Pages</h2>
            <div className="border border-border rounded-lg bg-card p-4">
              {audit.orphanPages.length === 0 ? (
                <p className="text-sm text-green-500">No orphan pages found. All pages are linked internally.</p>
              ) : (
                <ul className="space-y-2">
                  {audit.orphanPages.map(url => (
                    <li key={url} className="text-sm text-muted-foreground">{url}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
