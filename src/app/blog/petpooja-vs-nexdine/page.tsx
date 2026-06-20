import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema, generateAuthorSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Petpooja vs NexDine: Which Restaurant POS is Better for Your Business?',
  description: 'Detailed comparison of Petpooja and NexDine restaurant POS software. Learn about features, pricing, pros, cons, and which is better for small to medium restaurants in India.',
  keywords: ['Petpooja vs NexDine', 'restaurant POS comparison', 'Petpooja alternative', 'NexDine vs Petpooja', 'best restaurant POS India'],
  openGraph: {
    title: 'Petpooja vs NexDine: Which Restaurant POS is Better for Your Business?',
    description: 'Detailed comparison of Petpooja and NexDine restaurant POS software.',
    type: 'article',
    url: 'https://nexdine.myteknoland.com/blog/petpooja-vs-nexdine',
    images: [
      {
        url: 'https://nexdine.myteknoland.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Petpooja vs NexDine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petpooja vs NexDine: Which Restaurant POS is Better for Your Business?',
    description: 'Detailed comparison of Petpooja and NexDine restaurant POS software.',
    images: ['https://nexdine.myteknoland.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/blog/petpooja-vs-nexdine',
  },
}

const faqs = [
  {
    question: 'Is NexDine a good alternative to Petpooja for small restaurants?',
    answer: 'Yes, NexDine is an excellent alternative to Petpooja for small to medium restaurants. NexDine offers transparent pricing starting at ₹3,999/month with all features included, while Petpooja has complex pricing with hidden costs. NexDine also works on any device without hardware requirements, making it more accessible for smaller restaurants.',
  },
  {
    question: 'Can I switch from Petpooja to NexDine easily?',
    answer: 'Yes, switching from Petpooja to NexDine is straightforward. Our team handles data migration including menu items, customer data, inventory records, and historical sales data. We provide training and support to ensure a smooth transition. Most restaurants complete the switch within 1-2 weeks with minimal disruption to operations.',
  },
  {
    question: 'Does NexDine have all the features Petpooja has?',
    answer: 'Yes, NexDine offers all core features Petpooja provides including POS billing, inventory management, QR ordering, kitchen display system, and multi-branch management. Additionally, NexDine includes WhatsApp automation, CRM features, and more flexible pricing options that Petpooja charges extra for or doesn\'t offer.',
  },
  {
    question: 'How does customer support compare between Petpooja and NexDine?',
    answer: 'NexDine is known for excellent customer support with quick response times and dedicated account managers. Petpooja support quality varies by region and plan. NexDine provides 24/7 support for all plans, ensuring you always have help when needed. Many restaurants report better support experiences with NexDine.',
  },
  {
    question: 'What about implementation time comparison?',
    answer: 'NexDine typically implements in 1-2 days with minimal training required. Petpooja implementation can take longer due to hardware setup and configuration. NexDine\'s web-based approach means you can start using it immediately on existing devices, while Petpooja may require specific hardware that needs to be procured and installed.',
  },
]

const articleSchema = generateArticleSchema({
  title: 'Petpooja vs NexDine: Which Restaurant POS is Better for Your Business?',
  description: 'Detailed comparison of Petpooja and NexDine restaurant POS software. Learn about features, pricing, pros, cons, and which is better for small to medium restaurants in India.',
  authorName: 'NexDine Team',
  datePublished: '2024-06-20',
  dateModified: '2024-06-20',
  url: 'https://nexdine.myteknoland.com/blog/petpooja-vs-nexdine',
})

const authorSchema = generateAuthorSchema({
  name: 'NexDine Team',
  url: 'https://nexdine.myteknoland.com',
})

export default function PetpoojaVsNexDineBlogPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Blog', item: 'https://nexdine.myteknoland.com/blog' },
    { name: 'Petpooja vs NexDine', item: 'https://nexdine.myteknoland.com/blog/petpooja-vs-nexdine' },
  ]

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
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Petpooja vs NexDine: Which Restaurant POS is Better for Your Business?
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Detailed comparison of Petpooja and NexDine restaurant POS software. Learn about features, pricing, pros, cons, and which is better for small to medium restaurants in India.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By NexDine Team</span>
              <span>•</span>
              <span>June 20, 2024</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="mb-4">
              Choosing the right restaurant POS software is a critical decision for your business. Petpooja and NexDine are both popular options in India, but they serve different market segments with different approaches. This detailed comparison helps you understand the key differences and make an informed decision for your restaurant.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Overview of Petpooja</h2>
            <p className="mb-4">
              Petpooja is an established restaurant POS platform with a large customer base in India. It's been in the market for several years and has built a reputation as a comprehensive solution for restaurants of all sizes. However, its pricing model and implementation approach can be complex, especially for smaller restaurants.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Key Strengths</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Established brand with large customer base</li>
              <li>Comprehensive feature set</li>
              <li>Strong delivery platform integrations</li>
              <li>Good for large restaurant chains</li>
              <li>Extensive reporting capabilities</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Key Weaknesses</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Complex pricing with hidden costs</li>
              <li>Hardware requirements increase cost</li>
              <li>Implementation can be lengthy</li>
              <li>Customer support response times vary</li>
              <li>Advanced features often cost extra</li>
              <li>Less flexible for small restaurants</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Overview of NexDine</h2>
            <p className="mb-4">
              NexDine is a newer, modern restaurant management platform focused on transparency, flexibility, and value. It's designed specifically for small to medium-sized restaurants that want comprehensive features without the complexity and high costs of enterprise solutions. NexDine offers all-inclusive pricing and works on any device.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Key Strengths</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Transparent, all-inclusive pricing</li>
              <li>Works on any device (no hardware requirements)</li>
              <li>Quick implementation (1-2 days)</li>
              <li>WhatsApp automation included</li>
              <li>CRM and loyalty included</li>
              <li>Excellent customer support</li>
              <li>Modern, intuitive interface</li>
              <li>Regular feature updates</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Key Weaknesses</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Newer platform (less established than Petpooja)</li>
              <li>Smaller customer base</li>
              <li>May lack some niche features for very large chains</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Feature Comparison</h2>
            
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-4 text-left">Feature</th>
                    <th className="border border-border p-4 text-center">Petpooja</th>
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
                    <td className="border border-border p-4 text-center">✓ (Extra)</td>
                    <td className="border border-border p-4 text-center">✓ (Included)</td>
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
                    <td className="border border-border p-4 font-semibold">Accounting Integration</td>
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
              Pricing is one of the most significant differences between Petpooja and NexDine. Understanding the total cost of ownership is crucial for making the right decision.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Petpooja Pricing Model</h3>
            <p className="mb-4">
              Petpooja typically charges per outlet with additional costs for hardware, implementation, and support. The pricing is often quoted after consultation and may include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Per-outlet licensing fees</li>
              <li>Hardware costs (tablets, printers, etc.)</li>
              <li>Implementation and setup charges</li>
              <li>Annual maintenance contracts</li>
              <li>Additional fees for advanced features</li>
            </ul>
            <p className="mb-4">
              The total cost can be significantly higher than the initial quote when all components are considered. Many restaurants report unexpected costs during implementation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">NexDine Pricing Model</h3>
            <p className="mb-4">
              NexDine offers transparent, all-inclusive pricing starting at ₹3,999/month. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All core features (POS, inventory, QR ordering, KDS)</li>
              <li>CRM and loyalty program</li>
              <li>WhatsApp automation</li>
              <li>Multi-branch management</li>
              <li>Customer support</li>
              <li>Regular updates and improvements</li>
            </ul>
            <p className="mb-4">
              No hidden fees, no hardware requirements (works on any device), and clear pricing tiers. You know exactly what you'll pay each month with no surprises.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Implementation and Setup</h2>
            <p className="mb-4">
              The implementation process and time required can significantly impact your restaurant operations during transition.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Petpooja Implementation</h3>
            <p className="mb-4">
              Petpooja implementation typically involves:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Hardware procurement and setup</li>
              <li>Software installation and configuration</li>
              <li>Staff training (can take several days)</li>
              <li>Data migration from existing systems</li>
              <li>Timeline: 2-4 weeks typical</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">NexDine Implementation</h3>
            <p className="mb-4">
              NexDine implementation is designed to be fast and simple:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>No hardware requirements (works on existing devices)</li>
              <li>Web-based setup (no installation needed)</li>
              <li>Minimal training required (intuitive interface)</li>
              <li>Quick data migration</li>
              <li>Timeline: 1-2 days typical</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Customer Support Comparison</h2>
            <p className="mb-4">
              Reliable support is crucial for restaurant operations. Support quality can make or break your experience with a POS system.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Petpooja Support</h3>
            <p className="mb-4">
              Petpooja offers support through various channels, but response times and quality vary by region and plan. Many customers report inconsistent support experiences, especially during peak hours or for smaller accounts.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">NexDine Support</h3>
            <p className="mb-4">
              NexDine is known for excellent customer support with:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>24/7 support availability</li>
              <li>Dedicated account managers for all plans</li>
              <li>Quick response times</li>
              <li>Proactive support and training</li>
              <li>Consistent quality across all customers</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Which Should You Choose?</h2>
            <p className="mb-4">
              The choice between Petpooja and NexDine depends on your restaurant's specific needs, size, and budget.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Choose Petpooja if:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You're a large restaurant chain with complex requirements</li>
              <li>Budget is not a primary concern</li>
              <li>You need specific enterprise features NexDine doesn't offer</li>
              <li>You prefer working with an established, well-known brand</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Choose NexDine if:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You're a small to medium-sized restaurant</li>
              <li>You want transparent, predictable pricing</li>
              <li>You need quick implementation</li>
              <li>You want WhatsApp automation included</li>
              <li>You prefer using existing hardware (tablets, laptops)</li>
              <li>You value excellent customer support</li>
              <li>You want all features included without extra costs</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Making the Switch from Petpooja to NexDine</h2>
            <p className="mb-4">
              If you're currently using Petpooja and considering switching to NexDine, the transition is straightforward:
            </p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Contact NexDine for a consultation</li>
              <li>We assess your current setup and requirements</li>
              <li>We import your menu items, customer data, and inventory</li>
              <li>We train your staff on the new system</li>
              <li>We provide ongoing support during transition</li>
            </ol>
            <p className="mb-4">
              Most restaurants complete the switch within 1-2 weeks with minimal disruption to operations. Our team ensures a smooth transition so you can start benefiting from NexDine's features and pricing quickly.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
            <p className="mb-4">
              Both Petpooja and NexDine are capable restaurant POS systems, but they serve different market segments. Petpooja is better suited for large chains with complex requirements and flexible budgets. NexDine is ideal for small to medium-sized restaurants that want transparent pricing, quick implementation, and comprehensive features without hidden costs.
            </p>
            <p className="mb-4">
              For most restaurants in India, NexDine offers better value with its all-inclusive pricing, modern features, and excellent support. The ability to use existing hardware, quick implementation, WhatsApp automation, and flexible terms make it a compelling choice for restaurants looking to modernize their operations without breaking the bank.
            </p>

            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Contact NexDine</Link> for a personalized consultation and demo to see if we're the right fit for your restaurant.
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
