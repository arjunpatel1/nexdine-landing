import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'QR Ordering System India - Contactless Restaurant Menu | NexDine',
  description: 'NexDine QR ordering system India enables contactless dining. Customers scan, browse, and order from their phones. No app needed. Integrates with POS and KDS. Start free trial.',
  keywords: ['QR ordering system India', 'QR menu ordering software India', 'contactless restaurant ordering India', 'digital menu QR code India', 'NexDine QR', 'restaurant POS software India', 'restaurant billing software India', 'restaurant software Andhra Pradesh', 'restaurant POS Hyderabad', 'restaurant POS Bangalore', 'restaurant POS Chennai'],
  openGraph: {
    title: 'QR Ordering System India - Contactless Restaurant Menu | NexDine',
    description: 'NexDine QR ordering system India enables contactless dining. Customers scan, browse, and order from their phones.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/qr-ordering-system',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Ordering System India - Contactless Restaurant Menu | NexDine',
    description: 'NexDine QR ordering system India enables contactless dining.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/qr-ordering-system',
  },
}

const faqs = [
  {
    question: 'How does QR ordering work?',
    answer: 'Each table in your restaurant gets a unique QR code. Customers scan the code with their phone camera (no app download required), which opens a mobile-friendly digital menu. They browse items, customize orders, and submit directly from their phone. Orders flow instantly to your kitchen display system and POS. Customers can also pay digitally, completing the entire ordering process without waiter interaction.',
  },
  {
    question: 'Do customers need to download an app?',
    answer: 'No, NexDine QR ordering works entirely in the browser. Customers simply scan the QR code with their native camera app or any QR scanner. The menu opens as a responsive web page that works on any smartphone. This eliminates friction and increases adoption rates since customers don\'t need to install anything.',
  },
  {
    question: 'How does QR ordering integrate with my existing POS?',
    answer: 'NexDine QR ordering integrates seamlessly with your POS system. Orders placed through QR codes appear in your POS just like regular orders, with all modifiers and special requests included. Inventory updates automatically, and the order routes to the kitchen display system. The unified system ensures consistent pricing, menu items, and order processing across all ordering channels.',
  },
  {
    question: 'Can I customize the digital menu?',
    answer: 'Yes, you have complete control over your digital menu. Add photos, descriptions, prices, and modifiers for each item. Organize items into categories and subcategories for easy navigation. Highlight specials, best-sellers, or dietary options. Menu changes update instantly across all QR codes, so you never need to reprint physical menus.',
  },
  {
    question: 'What if customers need help with their order?',
    answer: 'Customers can request waiter assistance directly through the QR ordering interface with a single tap. Staff receive notifications and can attend to tables that need help. This hybrid approach maintains the human element of service while reducing routine order-taking workload. You can also configure the system to require waiter confirmation for certain order types.',
  },
]

export default function QROrderingSystemPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'QR Ordering System', item: 'https://nexdine.myteknoland.com/qr-ordering-system' },
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
              QR Ordering System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enable contactless dining with NexDine QR ordering. Customers scan, browse, and order from their phones. No app download required.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">What is QR Ordering System?</h2>
            <p className="mb-4">
              QR ordering systems transform how customers interact with restaurant menus. By placing unique QR codes on each table, restaurants enable customers to access digital menus, place orders, and make payments directly from their smartphones. This contactless approach has become essential in modern dining, offering convenience for customers and operational efficiency for restaurants.
            </p>
            <p className="mb-4">
              NexDine QR ordering system integrates seamlessly with your existing POS and kitchen operations. Orders placed through QR codes flow directly to your kitchen display system and appear in your POS for billing. This unified approach eliminates manual order entry, reduces errors, and provides a consistent experience across all ordering channels.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">How QR Ordering Works</h2>
            <p className="mb-4">
              The QR ordering process is designed to be intuitive and frictionless for customers while providing powerful backend capabilities for restaurant operations. The system handles the entire order lifecycle from scan to payment.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Step 1: Scan the QR Code</h3>
            <p className="mb-4">
              Each table displays a unique QR code that customers scan using their phone's native camera or any QR scanner app. The scan opens a mobile-optimized digital menu specifically for that table. No app download is required, making the process accessible to all customers regardless of their technical comfort level.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Step 2: Browse and Customize</h3>
            <p className="mb-4">
              The digital menu displays all items with photos, descriptions, prices, and dietary information. Customers can filter by category, search for specific items, and view detailed information about each dish. When selecting items, customers can customize orders with modifiers, special requests, and quantity adjustments, just as they would with a waiter.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Step 3: Place Order</h3>
            <p className="mb-4">
              After adding items to their cart, customers review their order and submit it with a single tap. The order instantly transmits to your kitchen display system, appearing on kitchen screens alongside orders placed through traditional channels. Customers receive confirmation that their order has been received and can track preparation status.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Step 4: Payment</h3>
            <p className="mb-4">
              Customers can pay directly through the QR ordering interface using various digital payment methods including UPI, cards, and wallets. The payment processes securely, and the bill appears in your POS system for final reconciliation. This self-service payment option reduces the time customers spend waiting for checks and enables faster table turnover.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Benefits of QR Ordering for Restaurants</h2>
            <p className="mb-4">
              Implementing QR ordering delivers significant operational benefits that improve efficiency, reduce costs, and enhance the customer experience. These benefits compound as adoption increases among your customer base.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Reduced Labor Costs</h3>
            <p className="mb-4">
              With customers placing their own orders, waitstaff can focus on higher-value activities like table service, upselling, and customer experience enhancement. Restaurants typically reduce front-of-house labor requirements by 20-30% after implementing QR ordering while maintaining or improving service quality. This labor optimization directly impacts profitability.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Increased Order Accuracy</h3>
            <p className="mb-4">
              Customers enter their own orders directly, eliminating miscommunication that can occur during verbal order taking. The system enforces required selections and prevents invalid combinations. Order accuracy improvements reduce food waste from incorrect orders and increase customer satisfaction by ensuring they receive exactly what they ordered.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Faster Table Turnover</h3>
            <p className="mb-4">
              QR ordering enables customers to browse menus and place orders immediately upon seating, rather than waiting for waiter attention. Digital payment eliminates the time spent waiting for checks and payment processing. Faster ordering and payment cycles increase table turnover rates, allowing you to serve more customers in the same time period.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Eliminated Menu Printing Costs</h3>
            <p className="mb-4">
              Digital menus eliminate the need for physical menu printing, saving money on design, printing, and distribution. Menu updates happen instantly across all locations without reprinting. This is particularly valuable for restaurants with frequent menu changes, seasonal offerings, or daily specials. The cost savings accumulate over time.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Valuable Customer Data</h3>
            <p className="mb-4">
              QR ordering systems capture detailed data about customer preferences, ordering patterns, and feedback. This data helps you understand which items are popular, identify trends, and personalize marketing efforts. You can track repeat customers, analyze visit frequency, and tailor promotions based on actual behavior rather than assumptions.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Benefits for Customers</h2>
            <p className="mb-4">
              Customers appreciate the convenience and control that QR ordering provides. The system enhances their dining experience while offering flexibility that traditional ordering cannot match.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Control Over Ordering</h3>
            <p className="mb-4">
              Customers can browse the menu at their own pace, read detailed descriptions, and take time to decide without feeling rushed. They can modify orders to their exact specifications and see prices before committing. This control increases satisfaction and reduces order regret.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Contactless Experience</h3>
            <p className="mb-4">
              For health-conscious customers, QR ordering provides a contactless dining experience that minimizes physical interaction. This has become particularly important in the post-pandemic era, with many customers preferring digital ordering methods for safety and convenience.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Split Bill Convenience</h3>
            <p className="mb-4">
              Groups can easily split bills when each person orders and pays individually through their phones. This eliminates awkward bill-splitting conversations and reduces the time waitstaff spend calculating separate checks. The system handles complex split scenarios automatically.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">QR Ordering for Different Restaurant Types</h2>
            <p className="mb-4">
              QR ordering adapts to various restaurant models, each benefiting from the technology in different ways. The flexibility of the system allows customization for specific operational needs.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Quick-Service Restaurants</h3>
            <p className="mb-4">
              QSRs benefit from reduced counter congestion and faster ordering. Customers can order from their tables or while waiting in line, reducing perceived wait times. The system handles high volumes efficiently and integrates with drive-thru and takeout operations for a unified ordering experience.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Casual Dining</h3>
            <p className="mb-4">
              Casual dining restaurants use QR ordering to supplement waiter service. Customers can order drinks and appetizers immediately upon seating while waitstaff focus on main courses and table service. This hybrid approach maintains the hospitality element while improving operational efficiency.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Bars and Pubs</h3>
            <p className="mb-4">
              Bars use QR ordering to reduce wait times for drink orders. Customers at tables can order directly without flagging down busy bartenders. The system handles complex drink orders with modifiers and special requests, reducing errors and improving service speed during peak hours.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Implementing QR Ordering</h2>
            <p className="mb-4">
              NexDine makes QR ordering implementation straightforward. We provide QR code generation, menu setup assistance, and integration with your existing systems. The system works with your current hardware, so no new equipment purchases are required. Training for staff focuses on the hybrid service model and handling the increased order volume that typically results.
            </p>
            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Request a demo</Link> to see QR ordering in action and learn how it can transform your restaurant operations. Explore our <Link href="/features" className="text-primary hover:underline">complete feature set</Link> to understand how QR ordering integrates with other NexDine capabilities.
            </p>
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
      </div>
      <CTA />
    </PageWrapper>
  )
}
