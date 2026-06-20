import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restroworks vs NexDine - Restaurant POS Comparison 2024',
  description: 'Compare Restroworks vs NexDine restaurant POS software. Feature comparison, pricing, pros and cons. Find the best POS system for your restaurant in India.',
  keywords: ['Restroworks vs NexDine', 'restaurant POS comparison', 'Restroworks alternative', 'NexDine vs Restroworks', 'best restaurant POS India'],
  openGraph: {
    title: 'Restroworks vs NexDine - Restaurant POS Comparison 2024',
    description: 'Compare Restroworks vs NexDine restaurant POS software. Feature comparison, pricing, pros and cons.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/restroworks-vs-nexdine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restroworks vs NexDine - Restaurant POS Comparison 2024',
    description: 'Compare Restroworks vs NexDine restaurant POS software.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/restroworks-vs-nexdine',
  },
}

const faqs = [
  {
    question: 'Which is better for cloud kitchens - Restroworks or NexDine?',
    answer: 'Both systems support cloud kitchens, but NexDine offers more flexible pricing and works on any device without hardware requirements. Restroworks may have specific hardware needs. NexDine also includes WhatsApp automation which is valuable for cloud kitchen customer communication.',
  },
  {
    question: 'Does NexDine offer the same integrations as Restroworks?',
    answer: 'Yes, NexDine supports all major delivery platform integrations (Swiggy, Zomato, etc.), payment gateways, and accounting software. We also offer WhatsApp automation and social media integrations that provide additional marketing channels not typically available in Restroworks.',
  },
  {
    question: 'How does implementation time compare between Restroworks and NexDine?',
    answer: 'NexDine typically implements in 1-2 days with minimal training required. Restroworks implementation can take longer due to hardware setup and configuration. NexDine\'s web-based approach means you can start using it immediately on existing devices.',
  },
  {
    question: 'Can I migrate from Restroworks to NexDine?',
    answer: 'Yes, migrating from Restroworks to NexDine is straightforward. Our team handles data migration including menu items, customer data, inventory records, and historical sales data. We provide training and support to ensure a smooth transition with minimal disruption to your operations.',
  },
  {
    question: 'What about customer support comparison?',
    answer: 'NexDine is known for excellent customer support with quick response times and dedicated account managers. Restroworks support quality varies by region and plan. NexDine provides 24/7 support for all plans, ensuring you always have help when needed.',
  },
]

export default function RestroworksVsNexDinePage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restroworks vs NexDine', item: 'https://nexdine.myteknoland.com/restroworks-vs-nexdine' },
  ]

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateFAQSchema(faqs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateBreadcrumbSchema(breadcrumbs) }}
      />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Restroworks vs NexDine
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive comparison of Restroworks and NexDine restaurant POS software. Features, pricing, pros, cons, and which is better for your restaurant.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="mb-4">
              Restroworks and NexDine are both prominent restaurant management solutions in India, each with distinct strengths and target markets. Restroworks has built a strong presence in the cloud kitchen segment, while NexDine offers a more comprehensive solution for all restaurant types with transparent pricing and modern features.
            </p>
            <p className="mb-4">
              This comparison examines the key differences between the two platforms to help you make an informed decision. We'll cover features, pricing, implementation, support, and suitability for different restaurant types.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Feature Comparison</h2>
            
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-4 text-left">Feature</th>
                    <th className="border border-border p-4 text-center">Restroworks</th>
                    <th className="border border-border p-4 text-center">NexDine</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-4 font-semibold">POS Billing</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">Inventory Management</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold">QR Ordering</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">Kitchen Display System</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold">Multi-Branch Management</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">CRM & Loyalty</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold">WhatsApp Automation</td>
                    <td className="border border-border p-4 text-center">✗</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">Delivery Integrations</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold">Cloud Kitchen Focus</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">Offline Mode</td>
                    <td className="border border-border p-4 text-center">✓</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-4 font-semibold">Works on Any Device</td>
                    <td className="border border-border p-4 text-center">Limited</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="border border-border p-4 font-semibold">Transparent Pricing</td>
                    <td className="border border-border p-4 text-center">Complex</td>
                    <td className="border border-border p-4 text-center">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">Pricing Comparison</h2>
            <p className="mb-4">
              Pricing structure is a major differentiator between Restroworks and NexDine. Understanding the total cost of ownership is essential for making the right choice.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Restroworks Pricing</h3>
            <p className="mb-4">
              Restroworks typically uses a complex pricing model based on:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Per-outlet or per-transaction fees</li>
              <li>Hardware requirements (specific devices)</li>
              <li>Implementation and setup charges</li>
              <li>Annual maintenance contracts</li>
              <li>Add-on costs for advanced features</li>
            </ul>
            <p className="mb-4">
              The pricing is often customized based on restaurant size and requirements, making it difficult to compare directly. Many restaurants report unexpected costs during implementation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">NexDine Pricing</h3>
            <p className="mb-4">
              NexDine offers transparent, straightforward pricing starting at ₹3,999/month:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All features included (no add-on costs)</li>
              <li>Works on any device (no hardware requirements)</li>
              <li>No implementation fees</li>
              <li>No annual maintenance contracts</li>
              <li>Clear pricing tiers</li>
            </ul>
            <p className="mb-4">
              You know exactly what you'll pay each month with no hidden fees or surprise charges.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Restroworks Pros and Cons</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Pros</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Strong focus on cloud kitchens</li>
              <li>Good delivery platform integrations</li>
              <li>Established brand in cloud kitchen segment</li>
              <li>Comprehensive reporting for multi-location</li>
              <li>Good for large cloud kitchen operations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cons</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Complex pricing model</li>
              <li>Hardware requirements increase cost</li>
              <li>Implementation can be lengthy</li>
              <li>Limited flexibility for small restaurants</li>
              <li>Customer support varies by region</li>
              <li>Less suitable for traditional dine-in restaurants</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">NexDine Pros and Cons</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Pros</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Transparent, all-inclusive pricing</li>
              <li>Works on any device (no hardware requirements)</li>
              <li>Quick implementation (1-2 days)</li>
              <li>WhatsApp automation included</li>
              <li>Suitable for all restaurant types</li>
              <li>Excellent customer support</li>
              <li>Modern, intuitive interface</li>
              <li>Regular feature updates</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cons</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Newer platform than Restroworks</li>
              <li>Smaller market share in cloud kitchen segment</li>
              <li>May lack some niche features for very large chains</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Which Should You Choose?</h2>
            <p className="mb-4">
              The decision between Restroworks and NexDine depends on your restaurant type, size, and specific requirements.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Choose Restroworks if:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You operate a large cloud kitchen chain</li>
              <li>You need specialized cloud kitchen features</li>
              <li>Budget is flexible</li>
              <li>You prefer an established cloud kitchen brand</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Choose NexDine if:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You're a small to medium-sized restaurant</li>
              <li>You operate a traditional dine-in restaurant</li>
              <li>You want transparent pricing</li>
              <li>You need quick implementation</li>
              <li>You want WhatsApp automation</li>
              <li>You prefer using existing hardware</li>
              <li>You value excellent support</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Cloud Kitchen Considerations</h2>
            <p className="mb-4">
              Both platforms support cloud kitchens, but with different approaches:
            </p>
            <p className="mb-4">
              Restroworks has built its reputation on cloud kitchen management and offers specialized features for this segment. However, this specialization comes with complex pricing and hardware requirements that may not suit all cloud kitchen operators.
            </p>
            <p className="mb-4">
              NexDine provides comprehensive cloud kitchen support with all the essential features - delivery platform integrations, multi-brand management, centralized control, and real-time analytics. The difference is in the pricing model and implementation approach. NexDine works on any device, requires no specialized hardware, and offers transparent pricing that scales with your business.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Making the Switch</h2>
            <p className="mb-4">
              Switching from Restroworks to NexDine is designed to be smooth and minimally disruptive:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact NexDine for consultation</li>
              <li>We assess your current setup</li>
              <li>Data migration (menu, customers, inventory)</li>
              <li>Staff training on new system</li>
              <li>Ongoing support during transition</li>
            </ol>
            <p className="mb-4">
              Most restaurants complete the switch within 1-2 weeks. Our team ensures business continuity throughout the process.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
            <p className="mb-4">
              Restroworks and NexDine serve different market segments with different strengths. Restroworks specializes in cloud kitchens with complex pricing and hardware requirements. NexDine offers a comprehensive solution for all restaurant types with transparent pricing, quick implementation, and modern features.
            </p>
            <p className="mb-4">
              For most restaurants, especially small to medium-sized operations and traditional dine-in restaurants, NexDine offers better value with its all-inclusive pricing, flexibility, and excellent support. The ability to use existing hardware and quick implementation make it an attractive choice for restaurants looking to modernize without significant upfront investment.
            </p>

            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Contact NexDine</Link> for a personalized consultation to determine if we're the right fit for your restaurant.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg p-6 bg-card">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <CTA />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
