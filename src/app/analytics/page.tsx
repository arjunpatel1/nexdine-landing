import PageWrapper from '@/components/PageWrapper'

export default function AnalyticsPage () {
  return (
    <PageWrapper>
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Analytics & Inventory
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time insights into sales, stock levels, staff performance, and customer behavior.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Revenue', value: '₹124,500', change: '+18%' },
              { label: 'Orders', value: '8,420', change: '+12%' },
              { label: 'Avg Ticket', value: '₹14.78', change: '+5%' },
              { label: 'Stock Alert', value: '3 items', change: 'low' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-xs font-medium ${stat.change === 'low' ? 'text-red-500' : 'text-green-500'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Revenue Trend</h3>
              <select className="rounded-lg border border-border bg-background px-3 py-1 text-sm">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {[35, 55, 42, 78, 65, 90, 85, 70, 95, 88, 72, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-orange-500/30 to-orange-500/80 min-h-[4px]"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
