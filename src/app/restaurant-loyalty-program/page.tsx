import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant Loyalty Program - Customer Retention Software | NexDine',
  description: 'Build customer loyalty with NexDine restaurant loyalty program. Reward points, personalized offers, and retention strategies to increase repeat business and lifetime value. Try free for 14 days.',
  keywords: ['restaurant loyalty program', 'customer retention software', 'restaurant rewards program', 'loyalty management system', 'NexDine loyalty'],
  openGraph: {
    title: 'Restaurant Loyalty Program - Customer Retention Software | NexDine',
    description: 'Build customer loyalty with NexDine restaurant loyalty program. Reward points, personalized offers, and retention strategies.',
    type: 'website',
    url: 'https://nexdine.myteknoland.com/restaurant-loyalty-program',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Loyalty Program - Customer Retention Software | NexDine',
    description: 'Build customer loyalty with NexDine restaurant loyalty program.',
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/restaurant-loyalty-program',
  },
}

const faqs = [
  {
    question: 'What is a restaurant loyalty program?',
    answer: 'A restaurant loyalty program is a customer retention strategy that rewards repeat customers with points, discounts, and exclusive offers. Customers earn rewards for purchases, visits, or referrals, encouraging them to return more frequently. Modern loyalty programs like NexDine use data analytics to personalize offers, track customer preferences, and deliver targeted promotions that increase customer lifetime value.',
  },
  {
    question: 'How does a loyalty program benefit my restaurant?',
    answer: 'Loyalty programs increase repeat visits, boost average order value, and improve customer retention. Customers enrolled in loyalty programs typically spend 20-40% more per visit and visit 2-3 times more frequently. The program provides valuable customer data for targeted marketing, helps identify your best customers, and creates competitive differentiation. Over time, this builds a stable base of regular customers who drive consistent revenue.',
  },
  {
    question: 'What types of rewards can I offer?',
    answer: `NexDine loyalty program supports multiple reward types including points-based rewards (earn points per rupee spent), tiered rewards (unlock benefits at different spending levels), referral bonuses (earn rewards for referring friends), birthday offers, special promotions, and exclusive member pricing. You can customize rewards based on your restaurant's margins and customer preferences.`,
  },
  {
    question: 'How do customers join the loyalty program?',
    answer: 'Customers can join through multiple channels - scan a QR code at the restaurant, sign up via your website, register through the mobile app, or provide their phone number at checkout. NexDine makes enrollment frictionless with one-click registration and automatic account creation. Customers can track their points and rewards through a customer portal or mobile app.',
  },
  {
    question: 'Can I integrate loyalty with other marketing channels?',
    answer: 'Yes, NexDine loyalty program integrates with email marketing, SMS campaigns, WhatsApp automation, and social media. You can send targeted offers based on customer behavior, purchase history, and visit patterns. Integration with your POS ensures all customer transactions automatically earn points, creating a seamless experience.',
  },
]

export default function RestaurantLoyaltyProgramPage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Restaurant Loyalty Program', item: 'https://nexdine.myteknoland.com/restaurant-loyalty-program' },
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
              Restaurant Loyalty Program
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Build lasting customer relationships with NexDine loyalty program. Reward points, personalized offers, and data-driven retention strategies to increase repeat business and customer lifetime value.
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">What is a Restaurant Loyalty Program?</h2>
            <p className="mb-4">
              A restaurant loyalty program is a strategic customer retention system that rewards repeat customers for their continued patronage. Unlike one-time promotions, loyalty programs create ongoing relationships by offering points, discounts, exclusive offers, and personalized rewards based on customer behavior. Modern loyalty programs like NexDine go beyond simple punch cards by using data analytics to understand customer preferences, track visit patterns, and deliver targeted promotions that resonate with individual customers.
            </p>
            <p className="mb-4">
              The concept is simple but powerful: customers earn rewards for purchases, visits, or referrals. These rewards can be redeemed for discounts, free items, or exclusive experiences. Over time, this creates a habit loop where customers choose your restaurant over competitors to maximize their rewards. The program also provides valuable customer data that helps you understand who your best customers are, what they order, and how to keep them coming back.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Benefits of Restaurant Loyalty Programs</h2>
            <p className="mb-4">
              Implementing a loyalty program delivers measurable benefits across your restaurant's operations. From increased revenue to better customer insights, the impact extends far beyond just giving away discounts.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Increased Repeat Visits</h3>
            <p className="mb-4">
              Customers enrolled in loyalty programs visit 2-3 times more frequently than non-members. The psychological effect of earning rewards creates a habit loop where customers consciously choose your restaurant to accumulate points. Over time, this builds a base of regular customers who provide predictable revenue and reduce dependence on acquiring new customers.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Higher Average Order Value</h3>
            <p className="mb-4">
              Loyalty members typically spend 20-40% more per visit than non-members. When customers know they're earning points, they're more likely to add items to their order, try new dishes, or order drinks and desserts. Tiered rewards that unlock at higher spending levels encourage customers to reach those thresholds, increasing average ticket size.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Improved Customer Retention</h3>
            <p className="mb-4">
              Acquiring new customers costs 5-25 times more than retaining existing ones. Loyalty programs significantly improve retention rates by creating switching costs - customers don't want to lose their accumulated points and rewards. This reduces customer churn and extends customer lifetime value, making each customer more profitable over time.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Valuable Customer Data</h3>
            <p className="mb-4">
              Every transaction in a loyalty program provides data about customer preferences, visit patterns, and spending behavior. This data helps you identify your most valuable customers, understand what drives their visits, and tailor your marketing accordingly. You can segment customers by behavior, send targeted offers, and make data-driven decisions about menu and promotions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Competitive Differentiation</h3>
            <p className="mb-4">
              In crowded restaurant markets, a loyalty program differentiates you from competitors. When customers have a choice between similar restaurants, they'll choose the one where they're earning rewards. This is especially powerful in areas with many dining options, as the loyalty program becomes a deciding factor for customers.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Word-of-Mouth Marketing</h3>
            <p className="mb-4">
              Loyal customers become brand advocates. They're more likely to recommend your restaurant to friends and family, leave positive reviews, and share their experiences on social media. Referral bonuses in loyalty programs amplify this effect by giving customers an incentive to bring new customers to your restaurant.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Key Features of NexDine Loyalty Program</h2>
            <p className="mb-4">
              NexDine offers a comprehensive loyalty solution designed for restaurants of all sizes. Our program combines powerful features with ease of use to deliver maximum value.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Points-Based Rewards</h3>
            <p className="mb-4">
              Customers earn points for every rupee spent. Points accumulate automatically through POS integration and can be redeemed for discounts, free items, or exclusive offers. You can customize point earning rates, redemption values, and minimum redemption thresholds to match your business model and margins.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Tiered Membership Levels</h3>
            <p className="mb-4">
              Create multiple membership tiers (Silver, Gold, Platinum) with increasing benefits. Customers unlock higher tiers by reaching spending or visit thresholds. Higher tiers offer better point multipliers, exclusive offers, priority seating, or special menu items. This gamification encourages customers to spend more to reach the next level.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Personalized Offers</h3>
            <p className="mb-4">
              Use customer data to send targeted offers based on behavior. Send birthday discounts to customers on their birthday, offer free dessert to customers who haven't visited in 30 days, or promote new dishes to customers who frequently order similar items. Personalization increases offer relevance and redemption rates.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Referral Bonuses</h3>
            <p className="mb-4">
              Encourage customers to refer friends and family with referral bonuses. Both the referrer and new customer earn rewards when the new customer signs up and makes their first purchase. This turns your loyal customers into a marketing channel, acquiring new customers at lower cost than traditional advertising.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Multi-Channel Enrollment</h3>
            <p className="mb-4">
              Customers can join through multiple convenient channels - scan a QR code at the restaurant, sign up via your website, register through a mobile app, or provide their phone number at checkout. Frictionless enrollment ensures high participation rates. Customers can track their points and rewards through a customer portal or mobile app.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Integration with Marketing Tools</h3>
            <p className="mb-4">
              NexDine loyalty integrates with email marketing, SMS campaigns, WhatsApp automation, and social media. Send automated birthday messages, re-engagement campaigns for inactive customers, and promotional announcements. All customer data syncs seamlessly with your marketing tools for targeted campaigns.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Types of Loyalty Rewards</h2>
            <p className="mb-4">
              Effective loyalty programs offer a variety of reward types to appeal to different customer motivations. NexDine supports multiple reward structures you can customize for your restaurant.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Points for Discounts</h3>
            <p className="mb-4">
              The most common reward structure - customers earn points and redeem them for percentage discounts or fixed amount discounts on future orders. This is flexible and easy for customers to understand. You can set point earning rates (e.g., 1 point per ₹10 spent) and redemption values (e.g., 100 points = ₹10 discount).
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Free Items</h3>
            <p className="mb-4">
              Offer free menu items as rewards. This could be a free appetizer, dessert, drink, or even a full meal after accumulating enough points. Free items create excitement and give customers something tangible to look forward to. This works especially well for signature dishes or high-margin items.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Exclusive Access</h3>
            <p className="mb-4">
              Provide loyal customers with exclusive access to special events, new menu items before they're available to everyone, priority seating, or chef's table experiences. These experiential rewards create emotional connections and make customers feel valued beyond just transactional benefits.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Birthday and Anniversary Offers</h3>
            <p className="mb-4">
              Send automatic birthday offers - free dessert, discount on the entire meal, or a special gift. Anniversary offers celebrate the customer's relationship with your restaurant. These personalized touches build emotional connections and increase visit frequency during special occasions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Partner Rewards</h3>
            <p className="mb-4">
              Partner with complementary businesses to offer cross-promotional rewards. For example, loyalty members could get discounts at nearby movie theaters, parking validation, or deals with delivery partners. This expands the value of your loyalty program and creates partnerships that benefit all parties.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Loyalty Program Best Practices</h2>
            <p className="mb-4">
              Implementing a successful loyalty program requires more than just technology. Follow these best practices to maximize program effectiveness.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Keep It Simple</h3>
            <p className="mb-4">
              Customers should understand how to earn and redeem rewards in seconds. Complex rules, confusing point systems, or difficult redemption processes frustrate customers and reduce participation. Use simple point systems, clear communication, and easy redemption processes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Offer Meaningful Rewards</h3>
            <p className="mb-4">
              Rewards must provide real value to customers. If earning rewards takes too long or redemption values are too low, customers won't participate. Ensure rewards are attainable within a reasonable number of visits and provide meaningful discounts or benefits.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Promote the Program</h3>
            <p className="mb-4">
              A loyalty program only works if customers know about it. Promote it prominently on your website, in-store signage, table tents, receipts, and through staff. Train staff to explain the program and encourage enrollment. Use email, SMS, and social media to remind customers about their points and available rewards.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Analyze and Optimize</h3>
            <p className="mb-4">
              Regularly review program performance metrics - enrollment rates, redemption rates, customer spend before and after joining, and retention improvements. Use this data to optimize reward structures, test new offers, and identify what drives the most value. Continuous improvement keeps the program effective over time.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Personalize the Experience</h3>
            <p className="mb-4">
              Use customer data to personalize rewards and communications. Send relevant offers based on purchase history, recognize customers by name, and remember their preferences. Personalization makes customers feel valued and increases program engagement.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Loyalty Programs for Different Restaurant Types</h2>
            <p className="mb-4">
              Different restaurant segments benefit from tailored loyalty strategies. NexDine loyalty program is customizable to meet the unique needs of various restaurant types.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Quick Service Restaurants</h3>
            <p className="mb-4">
              For fast food and quick service, focus on frequency rewards. Customers visit often, so offer points that accumulate quickly and reward frequent visits. Mobile app integration is crucial for easy point tracking and redemption. Partner with delivery platforms to extend loyalty benefits to delivery orders.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Casual Dining</h3>
            <p className="mb-4">
              Casual dining restaurants benefit from tiered membership that rewards higher spending. Offer experiential rewards like priority seating, chef's table access, or special event invitations. Birthday and anniversary offers work well in this segment where visits are often for special occasions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Fine Dining</h3>
            <p className="mb-4">
              Fine dining loyalty programs should focus on exclusivity and personalized experiences. Offer private events, wine tastings, chef's table experiences, and personalized service. Recognition and status are more important than transactional rewards in this segment.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Cafes and Bakeries</h3>
            <p className="mb-4">
              Daily visit frequency makes cafes ideal for loyalty programs. Offer buy-10-get-1-free cards, daily deals for members, and seasonal promotions. Mobile ordering integration allows customers to earn and redeem points through app orders, creating a seamless experience.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Getting Started with NexDine Loyalty Program</h2>
            <p className="mb-4">
              Launching a loyalty program with NexDine is straightforward. Our team handles setup, configuration, and training to ensure successful implementation.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">1. Program Design</h3>
            <p className="mb-4">
              We help you design the loyalty program structure - point earning rates, reward tiers, redemption options, and special offers. Based on your restaurant type, customer demographics, and business goals, we recommend a program that maximizes engagement and ROI.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Configuration</h3>
            <p className="mb-4">
              Configure the loyalty system in NexDine. Set up point rules, create membership tiers, define reward catalogs, and customize enrollment flows. We integrate loyalty with your POS so points are earned automatically on every transaction.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Marketing Materials</h3>
            <p className="mb-4">
              Create marketing materials to promote the program - QR codes for enrollment, table tents, receipt messages, in-store signage, and digital assets for your website and social media. We provide templates and guidance on effective promotion strategies.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4. Staff Training</h3>
            <p className="mb-4">
              Train your staff on the loyalty program - how to enroll customers, explain benefits, and handle redemptions. Staff are your best advocates for the program, so ensure they're confident and enthusiastic about promoting it.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5. Launch and Monitor</h3>
            <p className="mb-4">
              Launch the program and monitor performance. Track enrollment rates, redemption activity, customer spend changes, and retention improvements. Use analytics to optimize the program over time and test new reward structures.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Pricing</h2>
            <p className="mb-4">
              NexDine loyalty program is included in our comprehensive restaurant management platform. Pricing is transparent with no hidden fees. Choose the plan that fits your restaurant's needs and scale as you grow.
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
