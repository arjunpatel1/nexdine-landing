import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema, generateAuthorSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant Inventory Management Guide: From Basics to Advanced | NexDine',
  description: 'Master restaurant inventory management with this comprehensive guide. Learn tracking methods, cost control, and optimization techniques for better profitability.',
  keywords: ['restaurant inventory management guide', 'food inventory tracking', 'restaurant stock control', 'inventory optimization', 'NexDine'],
  openGraph: {
    title: 'Restaurant Inventory Management Guide: From Basics to Advanced | NexDine',
    description: 'Master restaurant inventory management with this comprehensive guide.',
    type: 'article',
    url: 'https://nexdine.myteknoland.com/blog/restaurant-inventory-management-guide',
    publishedTime: '2024-01-05T00:00:00Z',
    modifiedTime: '2024-01-05T00:00:00Z',
    authors: ['NexDine Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Inventory Management Guide: From Basics to Advanced | NexDine',
    description: 'Master restaurant inventory management with this comprehensive guide.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/blog/restaurant-inventory-management-guide',
  },
}

const faqs = [
  {
    question: 'How often should I count inventory?',
    answer: 'High-value items should be counted daily, perishable items 2-3 times per week, and non-perishables weekly. Comprehensive monthly audits provide overall accuracy. More frequent counts for problem items help identify theft or usage issues. The frequency should balance accuracy needs with staff time availability.',
  },
  {
    question: 'What is the difference between theoretical and actual inventory?',
    answer: 'Theoretical inventory is what you should have based on purchases minus usage (from POS data). Actual inventory is what you physically count. The difference between them reveals shrinkage from waste, theft, portioning errors, or recording mistakes. Analyzing this variance helps identify problems and improve accuracy.',
  },
  {
    question: 'How do I calculate food cost percentage?',
    answer: 'Food cost percentage = (Cost of Goods Sold / Food Sales) × 100. Cost of goods sold is beginning inventory + purchases - ending inventory. Track this weekly to identify trends. Ideal food cost varies by restaurant type but typically ranges from 28-35%. Consistently high percentages indicate problems needing investigation.',
  },
  {
    question: 'Should I use perpetual or periodic inventory system?',
    answer: 'Perpetual inventory tracks every item in real-time through POS integration, providing continuous visibility. Periodic inventory relies on physical counts at intervals. Modern restaurants benefit from perpetual systems for accuracy and control, supplemented by periodic counts for verification. Hybrid approaches offer the best of both methods.',
  },
  {
    question: 'How can I reduce inventory carrying costs?',
    answer: 'Reduce carrying costs by optimizing order quantities, improving turnover rates, negotiating just-in-time delivery with suppliers, and eliminating slow-moving items. Use data to identify excess stock and adjust purchasing accordingly. Better inventory turnover frees capital for other uses while reducing waste from spoilage.',
  },
]

export default function BlogPost() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Blog', item: 'https://nexdine.myteknoland.com/blog' },
    { name: 'Restaurant Inventory Management Guide', item: 'https://nexdine.myteknoland.com/blog/restaurant-inventory-management-guide' },
  ]

  const articleSchema = generateArticleSchema({
    title: 'Restaurant Inventory Management Guide: From Basics to Advanced | NexDine',
    description: 'Master restaurant inventory management with this comprehensive guide. Learn tracking methods, cost control, and optimization techniques for better profitability.',
    url: 'https://nexdine.myteknoland.com/blog/restaurant-inventory-management-guide',
    datePublished: '2024-01-05T00:00:00Z',
    dateModified: '2024-01-05T00:00:00Z',
    authorName: 'NexDine Team',
  })

  const authorSchema = generateAuthorSchema({
    name: 'NexDine Team',
    jobTitle: 'Restaurant Technology Experts',
  })

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: authorSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(faqs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }}
      />
      <article className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-primary hover:underline">
              ← Back to Blog
            </Link>
          </div>
          
          <header className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Restaurant Inventory Management Guide: From Basics to Advanced
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Master restaurant inventory management with this comprehensive guide. Learn tracking methods, cost control, and optimization techniques for better profitability.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime="2024-01-05">January 5, 2024</time>
              <span>•</span>
              <span>15 min read</span>
            </div>
          </header>

          <nav className="mb-12 p-6 border border-border rounded-xl bg-card">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#introduction" className="text-primary hover:underline">Introduction</a></li>
              <li><a href="#basics" className="text-primary hover:underline">Inventory Basics</a></li>
              <li><a href="#tracking-methods" className="text-primary hover:underline">Tracking Methods</a></li>
              <li><a href="#cost-control" className="text-primary hover:underline">Cost Control</a></li>
              <li><a href="#optimization" className="text-primary hover:underline">Optimization Techniques</a></li>
              <li><a href="#technology" className="text-primary hover:underline">Technology Solutions</a></li>
              <li><a href="#advanced" className="text-primary hover:underline">Advanced Strategies</a></li>
              <li><a href="#conclusion" className="text-primary hover:underline">Conclusion</a></li>
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 id="introduction" className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              Inventory management represents one of the most critical operational aspects of restaurant management. Food costs typically consume 28-35% of restaurant revenue, making inventory control essential for profitability. Effective inventory management prevents stockouts, reduces waste, optimizes cash flow, and provides the data needed for strategic decision-making.
            </p>
            <p className="mb-4">
              This guide covers inventory management from fundamental principles to advanced optimization techniques. Whether you're new to restaurant management or looking to improve existing systems, these strategies will help you achieve better control over your inventory and improve your bottom line.
            </p>

            <h2 id="basics" className="text-2xl font-bold mb-4 mt-8">Inventory Basics</h2>
            <p className="mb-4">
              Understanding fundamental inventory concepts provides the foundation for effective management. These basics apply to all restaurants regardless of size or cuisine type.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">What is Restaurant Inventory?</h3>
            <p className="mb-4">
              Restaurant inventory encompasses all food, beverages, supplies, and equipment needed for operations. This includes raw ingredients, prepared items, packaging materials, cleaning supplies, and more. Effective management focuses primarily on high-value, perishable items that represent the largest costs and highest waste risk.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Why Inventory Management Matters</h3>
            <p className="mb-4">
              Poor inventory management leads to multiple problems: stockouts during service, excess capital tied up in inventory, food waste from spoilage, theft and loss, and inaccurate food cost calculations. Good management prevents these issues while providing visibility into operations that enables better decision-making.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Key Inventory Metrics</h3>
            <p className="mb-4">
              Track these essential metrics to assess inventory performance: food cost percentage, inventory turnover rate, variance between theoretical and actual inventory, days of supply on hand, and shrinkage percentage. Regular monitoring of these metrics identifies problems early and measures improvement over time.
            </p>

            <h2 id="tracking-methods" className="text-2xl font-bold mb-4 mt-8">Tracking Methods</h2>
            <p className="mb-4">
              Different tracking methods suit different restaurant types and sizes. Understanding these methods helps choose the right approach for your operation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Periodic Inventory</h3>
            <p className="mb-4">
              Periodic inventory involves physical counts at set intervals - daily, weekly, or monthly. This method is simple to implement but provides only periodic visibility into inventory levels. It's suitable for small restaurants with limited SKUs but may miss problems between counts.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Perpetual Inventory</h3>
            <p className="mb-4">
              Perpetual inventory tracks every item continuously through <Link href="/restaurant-pos-software" className="text-primary hover:underline">POS integration</Link>. Every sale automatically deducts ingredients, providing real-time stock levels. This method offers superior control and accuracy but requires proper setup and maintenance. Modern restaurants increasingly adopt perpetual systems.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Hybrid Approach</h3>
            <p className="mb-4">
              Many restaurants use a hybrid approach: perpetual tracking for major items supplemented by periodic counts for verification. This combines the continuous visibility of perpetual systems with the accuracy verification of physical counts. It's often the most practical approach for growing restaurants.
            </p>

            <h2 id="cost-control" className="text-2xl font-bold mb-4 mt-8">Cost Control</h2>
            <p className="mb-4">
              Inventory management directly impacts food costs, which represent one of the largest controllable expenses. Effective cost control requires systematic approaches to purchasing, storage, and usage.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Recipe Costing</h3>
            <p className="mb-4">
              Calculate exact costs for every menu item by documenting ingredient quantities and current prices. Update costs regularly as ingredient prices change. Accurate recipe costing enables proper pricing, margin analysis, and identification of cost problems. <Link href="/restaurant-inventory-management" className="text-primary hover:underline">Inventory software</Link> automates this process.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Portion Control</h3>
            <p className="mb-4">
              Standardized portions ensure consistent costs and customer experiences. Use scales and measuring tools rather than estimating. Train all staff on portion standards. Regular audits verify compliance. Portion creep gradually increases costs - consistent monitoring prevents this.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Waste Tracking</h3>
            <p className="mb-4">
              Track all waste with reasons: spoilage, preparation errors, plate waste, etc. This data identifies problem areas and measures improvement. Many POS systems include waste tracking features. Regular waste audits provide comprehensive views of loss sources.
            </p>

            <h2 id="optimization" className="text-2xl font-bold mb-4 mt-8">Optimization Techniques</h2>
            <p className="mb-4">
              Beyond basic tracking, optimization techniques improve inventory efficiency and reduce carrying costs. These advanced approaches maximize the value of your inventory investment.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Par Level Optimization</h3>
            <p className="mb-4">
              Establish minimum and maximum stock levels based on usage patterns, lead times, and storage capacity. Review and adjust par levels regularly based on seasonal changes and menu modifications. Optimized par levels prevent overstocking while ensuring adequate supply.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Supplier Management</h3>
            <p className="mb-4">
              Evaluate suppliers on price, quality, reliability, and delivery terms. Consolidate purchases with preferred suppliers to negotiate better pricing. Consider just-in-time delivery to reduce on-hand inventory. Balance lower prices with higher order quantities against carrying costs.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Menu Engineering</h3>
            <p className="mb-4">
              Analyze menu items for both profitability and inventory impact. High-waste, low-margin items should be eliminated or modified. Cross-utilize ingredients across multiple dishes to reduce spoilage. Seasonal menus align with ingredient availability and pricing.
            </p>

            <h2 id="technology" className="text-2xl font-bold mb-4 mt-8">Technology Solutions</h2>
            <p className="mb-4">
              Modern technology transforms inventory management from manual chore to strategic advantage. The right tools provide accuracy, efficiency, and insights impossible to achieve manually.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Inventory Management Software</h3>
            <p className="mb-4">
              Dedicated inventory software automates tracking, provides real-time visibility, and generates actionable reports. Features include automatic deductions from POS sales, low-stock alerts, expiration tracking, and usage analytics. These systems pay for themselves through reduced waste and improved purchasing decisions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">POS Integration</h3>
            <p className="mb-4">
              Integration between POS and inventory systems ensures accurate, automatic tracking. Every sale updates inventory levels in real-time. Recipe management links menu items to ingredient requirements. This integration eliminates manual data entry and reduces errors.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cloud-Based Systems</h3>
            <p className="mb-4">
              <Link href="/cloud-pos-software" className="text-primary hover:underline">Cloud-based inventory systems</Link> offer accessibility from anywhere, automatic backups, and multi-location support. Real-time synchronization across locations enables centralized inventory management for restaurant chains. Cloud systems also eliminate the need for on-premise servers and IT maintenance.
            </p>

            <h2 id="advanced" className="text-2xl font-bold mb-4 mt-8">Advanced Strategies</h2>
            <p className="mb-4">
              For restaurants seeking maximum efficiency, advanced strategies push beyond basic management to optimization and predictive capabilities.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Demand Forecasting</h3>
            <p className="mb-4">
              Use historical sales data to forecast demand by day, week, and season. Factor in holidays, events, and weather patterns. Accurate forecasting enables just-in-time purchasing that reduces inventory while preventing stockouts. Advanced systems use machine learning for increasingly accurate predictions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Multi-Location Optimization</h3>
            <p className="mb-4">
              For restaurant chains, optimize inventory across all locations. Transfer stock between locations to balance inventory and prevent local shortages. Centralized purchasing leverages volume for better pricing. Standardized items across locations simplify management while allowing for local variations.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Supplier Collaboration</h3>
            <p className="mb-4">
              Work closely with key suppliers to optimize the supply chain. Share forecast data to enable better planning. Negotiate consignment arrangements for high-value items. Collaborate on packaging and delivery optimization. Strategic supplier partnerships reduce costs and improve reliability.
            </p>

            <h2 id="conclusion" className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
            <p className="mb-4">
              Effective inventory management requires commitment, discipline, and the right tools. Start with fundamentals, implement tracking systems, and gradually adopt more advanced techniques as your operation matures. The investment in inventory management pays dividends through reduced costs, improved operations, and better decision-making capabilities.
            </p>
            <p className="mb-4">
              NexDine provides comprehensive <Link href="/restaurant-inventory-management" className="text-primary hover:underline">inventory management software</Link> integrated with POS, <Link href="/qr-ordering-system" className="text-primary hover:underline">QR ordering</Link>, and multi-location management. Our system provides the real-time visibility and automation needed for modern inventory control.
            </p>
            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Request a demo</Link> to see how NexDine can transform your inventory management. Explore our <Link href="/pricing" className="text-primary hover:underline">pricing options</Link> to find a solution that fits your budget and scale with your business.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/how-to-reduce-food-wastage-in-restaurants" className="group block">
                <article className="h-full border border-border rounded-lg bg-card p-6 hover:border-primary/50 transition-colors">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">Operations</span>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">How to Reduce Food Wastage in Restaurants</h3>
                  <p className="text-sm text-muted-foreground">Learn effective strategies to minimize food waste in your restaurant.</p>
                </article>
              </Link>
              <Link href="/blog/best-restaurant-pos-software-in-india" className="group block">
                <article className="h-full border border-border rounded-lg bg-card p-6 hover:border-primary/50 transition-colors">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">POS Software</span>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Best Restaurant POS Software in India</h3>
                  <p className="text-sm text-muted-foreground">Discover the top restaurant POS software solutions in India for 2024.</p>
                </article>
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageWrapper>
  )
}
