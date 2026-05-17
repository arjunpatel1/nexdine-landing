import { motion } from 'framer-motion'
import PageWrapper from '@/components/PageWrapper'

export default function PosDemoPage () {
  return (
    <PageWrapper>
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              POS System Demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Lightning-fast checkout with customizable menus, split bills, and multi-payment support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-muted-foreground">nexdine-pos.local</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Burger', 'Pizza', 'Pasta', 'Salad', 'Steak', 'Sushi', 'Tacos', 'Dessert', 'Drinks'].map(item => (
                  <div key={item} className="rounded-xl border border-border bg-muted/30 p-4 text-center hover:bg-primary/5 transition-colors cursor-pointer">
                    <div className="h-8 w-8 mx-auto mb-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20" />
                    <p className="text-sm font-medium">{item}</p>
                    <p className="text-xs text-muted-foreground">$12.99</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cart (4 items)</span>
                  <span className="text-lg font-bold">$51.96</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground">Pay Now</button>
                  <button className="flex-1 rounded-lg border border-border py-2 text-sm font-medium">Hold</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { title: 'One-Tap Ordering', desc: 'Add items to cart with a single tap. Modify quantities, apply modifiers, and handle special requests instantly.' },
                { title: 'Split & Merge Bills', desc: 'Split bills by item, by person, or evenly. Merge tables and transfer checks between servers seamlessly.' },
                { title: 'Multi-Payment Support', desc: 'Accept cash, cards, UPI, wallets, and split payments across multiple methods in one transaction.' },
                { title: 'Offline Resilience', desc: 'Keep taking orders even when the internet drops. All data syncs automatically when connectivity returns.' },
              ].map(feature => (
                <div key={feature.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
