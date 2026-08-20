import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant Inventory Management Software India - Reduce Food Waste | NexDine',
  description: 'NexDine restaurant inventory management software India tracks stock in real-time, reduces waste, optimizes costs, and prevents stockouts. Automatic deductions, low-stock alerts, and detailed reporting.',
  keywords: ['restaurant inventory management software', 'restaurant inventory software India', 'restaurant inventory management', 'restaurant stock management software', 'food inventory management software', 'restaurant inventory tracking software', 'restaurant stock management system', 'restaurant food cost management software'],
  openGraph: {
    title: 'Restaurant Inventory Management Software India - Reduce Food Waste | NexDine',
    description: 'NexDine restaurant inventory management software India tracks stock in real-time, reduces waste, optimizes costs.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/restaurant-inventory-management',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Inventory Management Software India - Reduce Food Waste | NexDine',
    description: 'NexDine restaurant inventory management software India tracks stock in real-time.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/restaurant-inventory-management',
  },
}

const faqs = [
  {
    question: 'What is restaurant inventory management software?',
    answer: 'Restaurant inventory management software tracks ingredients, supplies, and finished goods in real-time. It automatically deducts items from inventory when dishes are ordered, alerts you when stock runs low, tracks expiration dates, and provides detailed reports on usage patterns. NexDine integrates inventory tracking directly with your POS system, so every sale automatically updates stock levels.',
  },
  {
    question: 'How does inventory management reduce food waste?',
    answer: 'By tracking ingredient usage precisely, you can identify which items are being wasted, adjust portion sizes, and optimize ordering quantities. The system alerts you to expiring items so they can be used before spoilage. Usage analytics reveal patterns that help with menu engineering and purchasing decisions. Many restaurants reduce food costs by 5-15% after implementing proper inventory management.',
  },
  {
    question: 'Can inventory software handle multiple locations?',
    answer: 'Yes, NexDine inventory management supports multi-location restaurants. Track inventory across all branches from a central dashboard, transfer stock between locations, and generate consolidated reports. Each location can have its own inventory while you maintain overall visibility and control. This optimization prevents overstocking at some locations while others experience shortages.',
  },
  {
    question: 'How does the system know what ingredients to deduct?',
    answer: 'You define recipes for each menu item, specifying the quantity of each ingredient required. When a dish is ordered through the POS, the system automatically deducts the specified quantities from inventory. This happens in real-time, so stock levels are always accurate. You can also handle modifiers and variations by creating multiple recipe versions.',
  },
  {
    question: 'What reports does inventory management provide?',
    answer: 'NexDine provides comprehensive inventory reports including current stock levels, usage by ingredient, cost analysis, waste reports, expiration tracking, and purchase order recommendations. These reports help identify trends, optimize purchasing, and control food costs. You can schedule reports to run automatically and receive alerts when metrics fall outside target ranges.',
  },
]

export default function RestaurantInventoryManagementPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restaurant Inventory Management', item: 'https://nexdine.myteknoland.com/restaurant-inventory-management' },
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
              Restaurant Inventory Management Software
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track ingredients in real-time, reduce food waste, optimize costs, and prevent stockouts with NexDine intelligent inventory management.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">What is Restaurant Inventory Management?</h2>
            <p className="mb-4">
              Restaurant inventory management is the systematic tracking and control of ingredients, supplies, and finished goods throughout your operation. Effective inventory management balances having enough stock to meet demand while minimizing waste and tying up capital in excess inventory. Modern inventory management software automates this process, providing real-time visibility and control over every item in your restaurant.
            </p>
            <p className="mb-4">
              NexDine restaurant inventory management software integrates seamlessly with your POS system, automatically updating stock levels with every order. This integration eliminates manual counting, reduces errors, and ensures accurate data for decision-making. The system tracks ingredient usage, monitors expiration dates, and generates actionable insights to optimize your food costs.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Key Features of Inventory Management Software</h2>
            <p className="mb-4">
              A comprehensive inventory management system provides multiple features that work together to give you complete control over your restaurant's stock. These features transform inventory from a manual chore into a strategic advantage.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Real-Time Stock Tracking</h3>
            <p className="mb-4">
              Every time a dish is ordered, the system automatically deducts the required ingredients from inventory. This real-time tracking means you always know current stock levels without manual counting. The system handles complex recipes with multiple ingredients, portion variations, and modifier options. Accurate stock data prevents both stockouts during service and over-ordering that leads to waste.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Low Stock Alerts</h3>
            <p className="mb-4">
              Set minimum stock levels for each ingredient, and receive automatic alerts when items fall below threshold. These alerts can be configured to trigger days in advance, giving you time to place orders before running out. Alerts can be sent via email, SMS, or appear in the dashboard, ensuring you never miss critical reorder points. This proactive approach prevents service disruptions and emergency purchasing at premium prices.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Recipe Management</h3>
            <p className="mb-4">
              Define precise recipes for every menu item, including ingredient quantities, portion sizes, and yield. The system handles recipe variations for different sizes, special dietary versions, and seasonal modifications. When you update a recipe, all future orders use the new ingredient quantities automatically. This ensures accurate cost calculations and consistent portion control across your operation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Expiration Tracking</h3>
            <p className="mb-4">
              Track expiration dates for perishable ingredients and receive alerts before items spoil. The system can suggest using ingredients approaching expiration first, reducing waste from spoilage. Expiration tracking also helps with food safety compliance and quality control. You can generate reports showing waste from expired items to identify purchasing patterns that need adjustment.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Vendor Management</h3>
            <p className="mb-4">
              Maintain detailed information about each vendor, including contact details, delivery schedules, pricing, and quality ratings. Compare vendor performance and pricing to optimize purchasing decisions. Generate purchase orders directly from the system based on current stock levels and predicted usage. Vendor management streamlines procurement and ensures you get the best value from suppliers.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Benefits of Restaurant Inventory Management</h2>
            <p className="mb-4">
              Implementing effective inventory management delivers measurable benefits that directly impact your bottom line. These benefits compound over time, creating sustainable improvements in restaurant profitability and operations.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Reduced Food Waste</h3>
            <p className="mb-4">
              Food waste represents a significant cost for most restaurants. Inventory management software identifies exactly what's being wasted, where it's being wasted, and why. Usage analytics reveal if waste comes from over-portioning, spoilage, theft, or preparation errors. With this data, you can implement targeted solutions that reduce waste without compromising quality. Many restaurants achieve 5-15% reduction in food costs through better inventory management.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Optimized Purchasing</h3>
            <p className="mb-4">
              Instead of guessing how much to order, base purchasing decisions on actual usage data and predictive analytics. The system can forecast demand based on historical patterns, seasonal trends, and upcoming events. Optimized purchasing reduces the capital tied up in excess inventory while ensuring you have enough stock to meet demand. You can also take advantage of bulk purchasing opportunities when they align with your actual needs.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Improved Food Cost Accuracy</h3>
            <p className="mb-4">
              Accurate inventory tracking enables precise food cost calculation for each menu item. You know exactly how much each dish costs to prepare, allowing for accurate pricing and margin analysis. When ingredient prices change, the system can automatically update dish costs and suggest price adjustments. This accuracy prevents unintentional margin erosion and helps maintain profitability.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Prevention of Stockouts</h3>
            <p className="mb-4">
              Running out of key ingredients during service frustrates customers and damages your reputation. Inventory management prevents stockouts through predictive ordering and low-stock alerts. You can identify which items are critical to have in stock and ensure adequate supply. For multi-location restaurants, you can transfer stock between locations to balance inventory and prevent local shortages.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Inventory Management for Different Restaurant Types</h2>
            <p className="mb-4">
              Different restaurant models have unique inventory challenges. A flexible inventory management system adapts to these variations while providing consistent benefits across all operations.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Quick-Service Restaurants</h3>
            <p className="mb-4">
              High-volume operations with standardized menus benefit from automated inventory tracking. The system handles large quantities efficiently and identifies usage patterns that inform bulk purchasing decisions. Consistency across locations is critical for chains, and centralized inventory management ensures standardization while allowing for local variations.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Fine Dining</h3>
            <p className="mb-4">
              Fine dining restaurants use premium ingredients with high cost and limited shelf life. Precise tracking of these expensive items is essential for cost control. The system handles complex recipes with many components and tracks specialty items that may be used infrequently. Detailed cost analysis helps maintain profitability while using high-quality ingredients.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Catering and Events</h3>
            <p className="mb-4">
              Catering operations have variable inventory needs based on event size and menu. Inventory management helps plan for events, ensure adequate supplies, and track usage for accurate billing. The system can handle temporary inventory increases for large events and return to normal levels afterward. This flexibility prevents both shortages and excess inventory after events.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Implementing Inventory Management Software</h2>
            <p className="mb-4">
              Transitioning to automated inventory management requires planning but delivers significant returns. Start with critical items and expand coverage gradually. Train staff on proper data entry and usage procedures. Establish clear processes for receiving deliveries, updating stock, and handling adjustments. The initial investment in setup and training pays dividends through ongoing operational improvements.
            </p>
            <p className="mb-4">
              NexDine makes implementation straightforward with intuitive interfaces and comprehensive support. Our team helps migrate existing inventory data, set up recipes, and configure alerts specific to your operation. <Link href="/contact" className="text-primary hover:underline">Schedule a demo</Link> to see how inventory management can transform your restaurant's cost control and operational efficiency.
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
