import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema, generateAuthorSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'How to Reduce Food Wastage in Restaurants: Practical Strategies | NexDine',
  description: 'Learn effective strategies to minimize food waste in your restaurant. From inventory management to portion control, reduce costs and improve sustainability.',
  keywords: ['reduce food waste in restaurants', 'restaurant food waste solutions', 'kitchen waste management', 'food cost control', 'NexDine'],
  openGraph: {
    title: 'How to Reduce Food Wastage in Restaurants: Practical Strategies | NexDine',
    description: 'Learn effective strategies to minimize food waste in your restaurant.',
    type: 'article',
    url: 'https://nexdine.myteknoland.com/blog/how-to-reduce-food-wastage-in-restaurants',
    publishedTime: '2024-01-10T00:00:00Z',
    modifiedTime: '2024-01-10T00:00:00Z',
    authors: ['NexDine Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Reduce Food Wastage in Restaurants: Practical Strategies | NexDine',
    description: 'Learn effective strategies to minimize food waste in your restaurant.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/blog/how-to-reduce-food-wastage-in-restaurants',
  },
}

const faqs = [
  {
    question: 'What are the main causes of food waste in restaurants?',
    answer: 'Primary causes include over-ordering ingredients, poor inventory management, improper portion control, spoilage from inadequate storage, preparation errors, and customer plate waste. Many restaurants also waste food due to lack of tracking and visibility into usage patterns.',
  },
  {
    question: 'How much can restaurants save by reducing food waste?',
    answer: 'Restaurants typically spend 28-32% of their budget on food costs. Reducing food waste by 5-15% can save 1.5-4.5% of total revenue. For a restaurant doing ₹10 lakh monthly revenue, this translates to ₹15,000-45,000 in monthly savings.',
  },
  {
    question: 'What technology helps reduce food waste?',
    answer: 'Inventory management software tracks usage patterns and prevents over-ordering. POS systems with recipe management calculate exact ingredient costs. Kitchen display systems reduce preparation errors. Smart scales and automated ordering systems further optimize inventory.',
  },
  {
    question: 'How can I track food waste in my restaurant?',
    answer: 'Implement a waste tracking system where staff log every instance of waste with reason, quantity, and cost. Use this data to identify patterns and problem areas. Many POS systems include waste tracking features. Regular waste audits help measure progress.',
  },
  {
    question: 'What role does menu engineering play in reducing waste?',
    answer: 'Menu engineering helps identify items that contribute to waste. High-waste, low-margin items should be reconsidered or modified. Cross-utilizing ingredients across multiple dishes reduces spoilage. Seasonal menus align with ingredient availability.',
  },
]

export default function BlogPost() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Blog', item: 'https://nexdine.myteknoland.com/blog' },
    { name: 'How to Reduce Food Wastage in Restaurants', item: 'https://nexdine.myteknoland.com/blog/how-to-reduce-food-wastage-in-restaurants' },
  ]

  const articleSchema = generateArticleSchema({
    title: 'How to Reduce Food Wastage in Restaurants: Practical Strategies | NexDine',
    description: 'Learn effective strategies to minimize food waste in your restaurant. From inventory management to portion control, reduce costs and improve sustainability.',
    url: 'https://nexdine.myteknoland.com/blog/how-to-reduce-food-wastage-in-restaurants',
    datePublished: '2024-01-10T00:00:00Z',
    dateModified: '2024-01-10T00:00:00Z',
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
              How to Reduce Food Wastage in Restaurants: Practical Strategies
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Learn effective strategies to minimize food waste in your restaurant. From inventory management to portion control, reduce costs and improve sustainability.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime="2024-01-10">January 10, 2024</time>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </header>

          <nav className="mb-12 p-6 border border-border rounded-xl bg-card">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#introduction" className="text-primary hover:underline">Introduction</a></li>
              <li><a href="#inventory-management" className="text-primary hover:underline">Inventory Management</a></li>
              <li><a href="#portion-control" className="text-primary hover:underline">Portion Control</a></li>
              <li><a href="#storage-optimization" className="text-primary hover:underline">Storage Optimization</a></li>
              <li><a href="#menu-engineering" className="text-primary hover:underline">Menu Engineering</a></li>
              <li><a href="#staff-training" className="text-primary hover:underline">Staff Training</a></li>
              <li><a href="#tracking-measurement" className="text-primary hover:underline">Tracking and Measurement</a></li>
              <li><a href="#conclusion" className="text-primary hover:underline">Conclusion</a></li>
            </ul>
          </nav>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2 id="introduction" className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              Food waste represents one of the largest controllable costs for restaurants. Industry studies suggest that restaurants waste 4-10% of purchased food, translating to significant financial losses and environmental impact. Reducing food waste not only improves profitability but also demonstrates environmental responsibility and operational excellence.
            </p>
            <p className="mb-4">
              This guide explores practical, proven strategies to reduce food waste in restaurant operations. From <Link href="/restaurant-inventory-management" className="text-primary hover:underline">inventory management</Link> to portion control and menu engineering, these approaches help restaurants minimize waste while maintaining quality and customer satisfaction.
            </p>

            <h2 id="inventory-management" className="text-2xl font-bold mb-4 mt-8">Inventory Management</h2>
            <p className="mb-4">
              Effective inventory management is the foundation of waste reduction. Without accurate tracking and control, over-ordering and spoilage become inevitable problems that drain profitability.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">First-In, First-Out (FIFO)</h3>
            <p className="mb-4">
              Implement strict FIFO procedures for all inventory. New deliveries go to the back, older stock moves to the front. Label all items with receipt dates and use-by dates. Train staff to always use the oldest items first. This simple practice significantly reduces spoilage waste.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Par Level Management</h3>
            <p className="mb-4">
              Establish minimum and maximum stock levels for each ingredient based on usage patterns. This prevents over-ordering while ensuring adequate supply. Review and adjust par levels regularly based on seasonal changes and menu modifications. <Link href="/restaurant-pos-software" className="text-primary hover:underline">Modern POS systems</Link> can automate reordering based on par levels.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Regular Inventory Counts</h3>
            <p className="mb-4">
              Conduct frequent inventory counts to identify discrepancies and usage patterns. Daily counts for high-value items, weekly for others, and comprehensive monthly audits provide visibility into what's being wasted and where. Use this data to adjust purchasing and identify problem areas.
            </p>

            <h2 id="portion-control" className="text-2xl font-bold mb-4 mt-8">Portion Control</h2>
            <p className="mb-4">
              Inconsistent portioning leads to both waste and customer dissatisfaction. Standardized portions ensure consistent costs and customer experiences while reducing over-portioning waste.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Standardized Recipes</h3>
            <p className="mb-4">
              Document exact portion sizes for every menu item. Use scales and measuring tools rather than eyeballing portions. Train all kitchen staff on these standards. Regularly audit plates to ensure compliance. Standardization reduces variability and prevents gradual portion creep that increases costs.
            </p>

            <h2 id="storage-optimization" className="text-2xl font-bold mb-4 mt-8">Storage Optimization</h2>
            <p className="mb-4">
              Proper storage extends ingredient life and reduces spoilage. Many restaurants waste food simply because storage practices are inadequate or equipment is poorly maintained.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Temperature Monitoring</h3>
            <p className="mb-4">
              Monitor refrigerator and freezer temperatures regularly. Install alarms for temperature excursions. Organize storage to ensure proper air circulation. Don't overstock refrigerators, which restricts airflow and causes temperature variations that accelerate spoilage.
            </p>

            <h2 id="menu-engineering" className="text-2xl font-bold mb-4 mt-8">Menu Engineering</h2>
            <p className="mb-4">
              Strategic menu design can significantly reduce waste by aligning offerings with ingredient availability and customer preferences. Menu engineering analyzes both profitability and waste generation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cross-Utilization</h3>
            <p className="mb-4">
              Design menu items that use ingredients across multiple dishes. Vegetable trimmings can become stocks. Leftover proteins can become specials. This approach maximizes ingredient utilization and reduces spoilage. Train chefs to think creatively about using all parts of ingredients.
            </p>

            <h2 id="staff-training" className="text-2xl font-bold mb-4 mt-8">Staff Training and Engagement</h2>
            <p className="mb-4">
              Staff behavior significantly impacts waste levels. Well-trained, engaged employees who understand the cost and environmental impact of waste become partners in reduction efforts.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Waste Awareness Training</h3>
            <p className="mb-4">
              Educate all staff about the financial and environmental cost of food waste. Show them the actual monetary value of wasted items. When staff understand that throwing away a kilogram of vegetables costs ₹200, they become more conscientious about waste prevention.
            </p>

            <h2 id="tracking-measurement" className="text-2xl font-bold mb-4 mt-8">Tracking and Measurement</h2>
            <p className="mb-4">
              You can't manage what you don't measure. Implementing waste tracking provides the data needed to identify problems, measure progress, and make informed decisions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Waste Logging System</h3>
            <p className="mb-4">
              Implement a system where staff log every instance of food waste. Record the item, quantity, reason (spoilage, preparation error, plate waste, etc.), and estimated cost. Use this data to identify patterns and prioritize improvement efforts. Many <Link href="/cloud-pos-software" className="text-primary hover:underline">modern POS systems</Link> include waste tracking features.
            </p>

            <h2 id="conclusion" className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
            <p className="mb-4">
              Reducing food waste requires commitment and consistent effort, but the financial and environmental benefits make it worthwhile. Start with the strategies that offer the biggest impact for your specific operation, then expand to other areas as you see results.
            </p>
            <p className="mb-4">
              NexDine <Link href="/restaurant-inventory-management" className="text-primary hover:underline">inventory management software</Link> provides the tools needed to track usage, prevent over-ordering, and identify waste patterns. Combined with proper training and operational discipline, technology can significantly reduce waste and improve profitability.
            </p>
            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to learn how NexDine can help your restaurant reduce waste and improve operational efficiency. Explore our <Link href="/features" className="text-primary hover:underline">complete feature set</Link> to understand all the tools available for waste reduction and cost control.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/restaurant-inventory-management-guide" className="group block">
                <article className="h-full border border-border rounded-lg bg-card p-6 hover:border-primary/50 transition-colors">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">Inventory</span>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Restaurant Inventory Management Guide</h3>
                  <p className="text-sm text-muted-foreground">Master restaurant inventory management with this comprehensive guide.</p>
                </article>
              </Link>
              <Link href="/blog/benefits-of-qr-ordering-for-restaurants" className="group block">
                <article className="h-full border border-border rounded-lg bg-card p-6 hover:border-primary/50 transition-colors">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">Technology</span>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Benefits of QR Ordering for Restaurants</h3>
                  <p className="text-sm text-muted-foreground">Explore how QR ordering systems revolutionize restaurant operations.</p>
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
