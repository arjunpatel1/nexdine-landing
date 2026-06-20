import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Petpooja vs NexDine - Restaurant POS Comparison 2024',
  description: 'Compare Petpooja vs NexDine restaurant POS software. Feature comparison, pricing, pros and cons. Find the best POS system for your restaurant in India.',
  keywords: ['Petpooja vs NexDine', 'restaurant POS comparison', 'Petpooja alternative', 'NexDine vs Petpooja', 'best restaurant POS India'],
  openGraph: {
    title: 'Petpooja vs NexDine - Restaurant POS Comparison 2024',
    description: 'Compare Petpooja vs NexDine restaurant POS software. Feature comparison, pricing, pros and cons.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/petpooja-vs-nexdine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Petpooja vs NexDine - Restaurant POS Comparison 2024',
    description: 'Compare Petpooja vs NexDine restaurant POS software.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/petpooja-vs-nexdine',
  },
}

const faqs = [
  {
    question: 'Which is better for small restaurants - Petpooja or NexDine?',
    answer: 'For small restaurants, NexDine offers better value with transparent pricing starting at ₹3,999/month, no hidden fees, and all essential features included. Petpooja often requires additional hardware and has complex pricing tiers. NexDine also works on any device, while Petpooja may require specific hardware.',
  },
  {
    question: 'Does NexDine offer the same features as Petpooja?',
    answer: 'Yes, NexDine offers all core features Petpooja provides including POS billing, inventory management, QR ordering, kitchen display system, and multi-branch management. Additionally, NexDine includes WhatsApp automation, CRM features, and more flexible pricing options that Petpooja charges extra for.',
  },
  {
    question: 'How does pricing compare between Petpooja and NexDine?',
    answer: 'NexDine offers transparent pricing starting at ₹3,999/month with no hidden fees. Petpooja\'s pricing is often quoted per outlet and may include additional costs for hardware, implementation, and support. NexDine provides clear, all-inclusive pricing with no surprises.',
  },
  {
    question: 'Can I switch from Petpooja to NexDine easily?',
    answer: 'Yes, switching from Petpooja to NexDine is straightforward. Our team helps with data migration, staff training, and smooth transition. We import your menu items, customer data, and inventory records to ensure continuity. Most restaurants complete the switch within 1-2 weeks.',
  },
  {
    question: 'Does NexDine support the same integrations as Petpooja?',
    answer: 'NexDine supports all major integrations including payment gateways, delivery platforms (Swiggy, Zomato), accounting software (Tally), and more. We also offer WhatsApp automation and social media integrations that Petpooja may not provide or charges extra for.',
  },
]

export default function PetpoojaVsNexDinePage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Petpooja vs NexDine', item: 'https://nexdine.myteknoland.com/petpooja-vs-nexdine' },
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
              Petpooja vs NexDine
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive comparison of Petpooja and NexDine restaurant POS software. Features, pricing, pros, cons, and which is better for your restaurant.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="mb-4">
              Choosing the right restaurant POS software is critical for your business success. Petpooja and NexDine are both popular restaurant management solutions in India, but they serve different market segments with different approaches. This comparison helps you understand the key differences and make an informed decision for your restaurant.
            </p>
            <p className="mb-4">
              Petpooja is an established player in the restaurant POS market with a large customer base. NexDine is a newer, more modern platform focused on comprehensive restaurant management with transparent pricing and flexible features. Both systems offer core POS functionality, but differ significantly in pricing model, feature set, and customer experience.
            </p>

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

            <h3 className="text-xl font-semibold mb-3 mt-6">Petpooja Pricing</h3>
            <p className="mb-4">
              Petpooja typically charges per outlet with additional costs for hardware, implementation, and support. Pricing is often quoted after consultation and may include:
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

            <h3 className="text-xl font-semibold mb-3 mt-6">NexDine Pricing</h3>
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

            <h2 className="text-2xl font-bold mb-4 mt-8">Petpooja Pros and Cons</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Pros</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Established brand with large customer base</li>
              <li>Comprehensive feature set</li>
              <li>Strong delivery platform integrations</li>
              <li>Good for large restaurant chains</li>
              <li>Extensive reporting capabilities</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cons</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Complex pricing with hidden costs</li>
              <li>Hardware requirements increase cost</li>
              <li>Implementation can be lengthy</li>
              <li>Customer support response times vary</li>
              <li>Advanced features often cost extra</li>
              <li>Less flexible for small restaurants</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">NexDine Pros and Cons</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Pros</h3>
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

            <h3 className="text-xl font-semibold mb-3 mt-6">Cons</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Newer platform (less established than Petpooja)</li>
              <li>Smaller customer base</li>
              <li>May lack some niche features for very large chains</li>
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

            <h2 className="text-2xl font-bold mb-4 mt-8">Making the Switch</h2>
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
              For most restaurants in India, NexDine offers better value with its all-inclusive pricing, modern features, and excellent support. The ability to use existing hardware, quick implementation, and WhatsApp automation make it a compelling choice for restaurants looking to modernize their operations without breaking the bank.
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
