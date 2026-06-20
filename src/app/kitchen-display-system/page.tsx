import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Kitchen Display System - KDS Software for Restaurants | NexDine',
  description: 'Streamline kitchen operations with NexDine Kitchen Display System. Digital KDS replaces paper tickets, reduces errors, speeds up food preparation, and improves order accuracy. Try free for 14 days.',
  keywords: ['kitchen display system', 'KDS software', 'restaurant KDS', 'digital kitchen display', 'kitchen order ticket system', 'NexDine KDS'],
  openGraph: {
    title: 'Kitchen Display System - KDS Software for Restaurants | NexDine',
    description: 'Streamline kitchen operations with NexDine Kitchen Display System. Digital KDS replaces paper tickets, reduces errors, speeds up food preparation.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/kitchen-display-system',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen Display System - KDS Software for Restaurants | NexDine',
    description: 'Streamline kitchen operations with NexDine Kitchen Display System.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/kitchen-display-system',
  },
}

const faqs = [
  {
    question: 'What is a Kitchen Display System (KDS)?',
    answer: 'A Kitchen Display System (KDS) is a digital solution that replaces traditional paper tickets in restaurant kitchens. It displays orders on screens in real-time, showing order details, preparation times, and special instructions. KDS software like NexDine helps kitchen staff prioritize orders, track preparation status, and communicate with front-of-house staff instantly, resulting in faster service and fewer errors.',
  },
  {
    question: 'How does a Kitchen Display System improve restaurant operations?',
    answer: 'KDS improves operations by eliminating paper tickets, reducing miscommunication, and providing real-time order visibility. Kitchen staff can see all orders at once, prioritize by preparation time, and track completion status. This reduces food preparation time, minimizes errors, improves table turnover, and enhances customer satisfaction. Managers also get data on kitchen performance to identify bottlenecks and optimize workflows.',
  },
  {
    question: 'Can KDS work with my existing POS system?',
    answer: 'NexDine KDS is fully integrated with our POS system, creating a seamless workflow from order placement to food preparation. Orders from dine-in, takeout, and delivery channels automatically appear on kitchen screens. If you use a different POS, we offer integration options to connect your existing system with our KDS for a unified kitchen management experience.',
  },
  {
    question: 'What hardware do I need for a Kitchen Display System?',
    answer: 'NexDine KDS works on any device with a web browser - tablets, iPads, Android devices, or dedicated monitors. For optimal kitchen display, we recommend using durable tablets or touchscreen monitors that can withstand kitchen environments. The system is designed to work with standard hardware, so you can use existing devices or start with affordable tablets.',
  },
  {
    question: 'Does KDS work offline?',
    answer: 'Yes, NexDine KDS works offline. All order data is stored locally on kitchen devices and syncs automatically when internet connectivity is restored. This ensures your kitchen can continue operations even during network outages, preventing service disruptions and maintaining order accuracy.',
  },
]

export default function KitchenDisplaySystemPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Kitchen Display System', item: 'https://nexdine.myteknoland.com/kitchen-display-system' },
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
              Kitchen Display System
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Replace paper tickets with digital KDS. Streamline kitchen operations, reduce errors, and speed up food preparation with NexDine's intelligent kitchen display system.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">What is a Kitchen Display System?</h2>
            <p className="mb-4">
              A Kitchen Display System (KDS) is a digital solution that transforms how restaurant kitchens operate. Instead of handwritten paper tickets that can get lost, damaged, or misread, KDS displays orders on bright, clear screens in real-time. When a waiter enters an order at the POS, it instantly appears on the kitchen screen with all details - items, modifiers, special instructions, and table information.
            </p>
            <p className="mb-4">
              Modern KDS software like NexDine goes beyond simple order display. It organizes orders by preparation time, highlights urgent orders, tracks completion status, and provides performance analytics. Kitchen staff can see at a glance what needs to be prepared next, managers can identify bottlenecks, and front-of-house staff get real-time updates on order status. This digital transformation reduces errors, speeds up service, and improves overall kitchen efficiency.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Benefits of Kitchen Display System</h2>
            <p className="mb-4">
              Implementing a KDS in your restaurant delivers measurable improvements across kitchen operations. The transition from paper to digital addresses multiple pain points that plague traditional kitchen workflows.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Eliminate Paper Tickets</h3>
            <p className="mb-4">
              Paper tickets are prone to getting lost, damaged, or misread. Illegible handwriting leads to wrong orders, customer complaints, and food waste. KDS eliminates these problems entirely. Orders are displayed clearly with all details, modifiers, and special instructions. Kitchen staff can zoom in on items, view preparation notes, and never miss a detail. This alone reduces order errors by up to 70%.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Faster Food Preparation</h3>
            <p className="mb-4">
              With KDS, kitchen staff see all orders organized by preparation time and priority. Urgent orders are highlighted, courses are grouped together, and preparation timers track how long each order has been in the kitchen. This visual organization helps chefs prioritize effectively, reduce bottlenecks, and ensure orders are ready on time. Average ticket time typically improves by 20-30% after implementing KDS.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Real-Time Order Tracking</h3>
            <p className="mb-4">
              Every order has a clear status - received, in progress, ready, or served. Kitchen staff tap to update status, and front-of-house staff see real-time updates on their devices. Waiters know exactly when food is ready, reducing trips to the kitchen and improving table service. Managers can track how long orders take to prepare and identify performance issues.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Reduced Food Waste</h3>
            <p className="mb-4">
              Order errors mean food gets remade or thrown away. KDS dramatically reduces errors by displaying orders clearly and preventing miscommunication. Special dietary requirements, allergies, and customer preferences are prominently displayed, ensuring kitchen staff never miss critical details. This reduces food waste and saves money on ingredients.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Improved Communication</h3>
            <p className="mb-4">
              KDS creates a seamless communication channel between front-of-house and kitchen staff. Waiters can send special instructions directly to the kitchen, kitchen staff can request more time for complex orders, and managers can broadcast announcements. This real-time communication eliminates the need for staff to physically walk to the kitchen for updates, saving time and reducing disruptions.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Key Features of NexDine Kitchen Display System</h2>
            <p className="mb-4">
              NexDine KDS is designed specifically for the unique needs of restaurant kitchens. Our system combines powerful features with intuitive design to deliver maximum value.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Multi-Screen Support</h3>
            <p className="mb-4">
              Configure multiple kitchen displays for different stations - prep, grill, fry, dessert, or bar. Each screen shows only relevant orders for that station, reducing clutter and helping staff focus. Orders can be routed to specific screens based on menu items, and managers can view all screens from a central dashboard.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Course-Based Ordering</h3>
            <p className="mb-4">
              Orders are organized by course - appetizers, mains, desserts - so kitchen staff prepare dishes in the correct sequence. This ensures customers receive their meals in the proper order and prevents cold appetizers or delayed desserts. Course timing can be customized based on your restaurant's workflow.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Preparation Timers</h3>
            <p className="mb-4">
              Each order displays a timer showing how long it has been in the kitchen. Color-coded alerts highlight orders that are approaching or exceeding target preparation times. This helps kitchen staff prioritize urgent orders and managers identify bottlenecks. Target times can be customized for different menu items.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Modifier Visibility</h3>
            <p className="mb-4">
              All order modifiers, special instructions, and dietary requirements are prominently displayed. Kitchen staff can see at a glance if a customer has allergies, prefers no onions, or wants extra sauce. This ensures special requests are never missed and reduces errors.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Performance Analytics</h3>
            <p className="mb-4">
              Track kitchen performance with detailed analytics. View average preparation times, peak hours, most ordered items, and staff productivity. Identify bottlenecks, optimize workflows, and make data-driven decisions to improve kitchen efficiency. Historical data helps with staffing and menu planning.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Why Choose NexDine KDS?</h2>
            <p className="mb-4">
              NexDine offers a comprehensive kitchen display solution designed for restaurants of all sizes. Our system combines powerful features with ease of use, backed by reliable support.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Seamless POS Integration</h3>
            <p className="mb-4">
              NexDine KDS is fully integrated with our POS system, creating a unified platform from order placement to food preparation. Orders from dine-in, takeout, QR ordering, and delivery channels automatically appear on kitchen screens. No manual data entry, no duplicate work, just seamless operations.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Works on Any Device</h3>
            <p className="mb-4">
              Our KDS runs on any device with a web browser - tablets, iPads, Android devices, laptops, or dedicated monitors. Use existing hardware or start with affordable tablets. The system is optimized for touch interfaces and works reliably even in challenging kitchen environments.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Offline Capability</h3>
            <p className="mb-4">
              Internet outages won't stop your kitchen. NexDine KDS works offline - all order data is stored locally and syncs automatically when connectivity returns. This ensures continuous operations and prevents service disruptions during network issues.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Easy Setup and Training</h3>
            <p className="mb-4">
              Get started in minutes, not days. Our intuitive interface requires minimal training - kitchen staff learn to use the system in under an hour. We provide comprehensive documentation, video tutorials, and dedicated support to ensure smooth implementation.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">KDS for Different Restaurant Types</h2>
            <p className="mb-4">
              Kitchen Display Systems benefit restaurants across all segments. NexDine KDS is customizable to meet the unique needs of different restaurant types.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Quick Service Restaurants</h3>
            <p className="mb-4">
              For fast food and quick service restaurants, speed is everything. KDS displays orders instantly, highlights urgent items, and tracks preparation times. This helps maintain fast service during peak hours and ensures consistent food quality. Integration with drive-thru and kiosk ordering creates a seamless workflow.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Fine Dining Restaurants</h3>
            <p className="mb-4">
              Fine dining requires precise timing and attention to detail. KDS organizes orders by course, displays special instructions prominently, and helps kitchen staff coordinate complex multi-course meals. This ensures dishes are served at the right temperature and in the correct sequence, enhancing the dining experience.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cloud Kitchens</h3>
            <p className="mb-4">
              Cloud kitchens and ghost kitchens handle high volumes of delivery orders from multiple platforms. KDS consolidates orders from all channels into one interface, organizes by preparation time, and tracks completion status. This reduces confusion, improves efficiency, and helps meet delivery platform SLAs.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cafes and Bakeries</h3>
            <p className="mb-4">
              Cafes and bakeries handle both dine-in and takeaway orders throughout the day. KDS helps manage peak breakfast and lunch rushes, tracks preparation times for made-to-order items, and ensures special requests are fulfilled. Integration with QR ordering for self-service creates a complete solution.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Getting Started with NexDine KDS</h2>
            <p className="mb-4">
              Implementing a Kitchen Display System is straightforward with NexDine. Our team handles setup, configuration, and training to ensure smooth adoption.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">1. Assessment and Planning</h3>
            <p className="mb-4">
              We start by understanding your kitchen workflow, menu structure, and operational requirements. Our team assesses your current setup and recommends the optimal KDS configuration for your restaurant.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Hardware Setup</h3>
            <p className="mb-4">
              Install tablets or monitors at kitchen stations. Our KDS works with any device - use existing hardware or we can recommend affordable options. We help with device placement, mounting, and network setup for optimal performance.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Configuration</h3>
            <p className="mb-4">
              Configure screens for different kitchen stations, set up course ordering, define preparation times, and customize display settings. We map your menu items to the appropriate screens and ensure the system matches your kitchen workflow.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4. Training</h3>
            <p className="mb-4">
              Train kitchen staff on using the KDS interface. Our intuitive design means most staff learn in under an hour. We provide hands-on training, documentation, and ongoing support to ensure confident adoption.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5. Go Live and Support</h3>
            <p className="mb-4">
              Launch the KDS and monitor performance. Our support team is available to assist with any questions, optimize settings based on real usage, and ensure you're getting maximum value from the system.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Pricing</h2>
            <p className="mb-4">
              NexDine KDS is included in our comprehensive restaurant management platform. Pricing is transparent with no hidden fees. Choose the plan that fits your restaurant's needs and scale as you grow.
            </p>

            <p className="mb-4">
              <Link href="/pricing" className="text-primary hover:underline">View our pricing plans</Link> or <Link href="/contact" className="text-primary hover:underline">contact us</Link> for a custom quote.
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
