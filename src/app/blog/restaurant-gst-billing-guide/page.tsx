import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/PageWrapper'
import CTA from '@/components/sections/CTA'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema, generateAuthorSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Restaurant GST Billing Guide - Complete GST Compliance for Restaurants | NexDine',
  description: 'Complete guide to GST billing for restaurants in India. Learn about GST rates, invoicing, compliance, input tax credit, and how restaurant POS software simplifies GST compliance.',
  keywords: ['restaurant GST billing', 'GST for restaurants India', 'restaurant GST compliance', 'GST invoicing software', 'restaurant POS GST'],
  openGraph: {
    title: 'Restaurant GST Billing Guide - Complete GST Compliance for Restaurants | NexDine',
    description: 'Complete guide to GST billing for restaurants in India. Learn about GST rates, invoicing, compliance.',
    type: 'article',
    url: 'https://nexdine.myteknoland.com/blog/restaurant-gst-billing-guide',
    images: [
      {
        url: 'https://nexdine.myteknoland.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Restaurant GST Billing Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant GST Billing Guide - Complete GST Compliance for Restaurants | NexDine',
    description: 'Complete guide to GST billing for restaurants in India.',
    images: ['https://nexdine.myteknoland.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://nexdine.myteknoland.com/blog/restaurant-gst-billing-guide',
  },
}

const faqs = [
  {
    question: 'What is the GST rate for restaurants in India?',
    answer: 'Restaurant GST rates vary based on the type of establishment. Restaurants with turnover up to ₹40 lakhs are exempt from GST (composition scheme). Restaurants with turnover above ₹40 lakhs charge 5% GST on food and beverages. AC restaurants and those serving alcohol charge 18% GST. Outdoor catering charges 18% GST.',
  },
  {
    question: 'How does restaurant POS software help with GST compliance?',
    answer: 'Restaurant POS software like NexDine automates GST calculations, generates GST-compliant invoices, tracks input tax credit, maintains GST-ready reports, and ensures accurate tax collection. This reduces manual errors, saves time, and ensures compliance with GST regulations.',
  },
  {
    question: 'What is input tax credit (ITC) for restaurants?',
    answer: 'Input tax credit allows restaurants to claim credit for GST paid on purchases like ingredients, equipment, and services. Restaurants can offset this credit against their GST liability. However, restaurants under the composition scheme cannot claim ITC. Proper tracking of ITC requires maintaining detailed purchase records.',
  },
  {
    question: 'What are the GST invoicing requirements for restaurants?',
    answer: 'GST invoices must include GSTIN of both parties, invoice number, date, HSN/SAC codes, taxable value, GST rate, and tax amount. Invoices must be serially numbered and issued in triplicate for supply of goods. Restaurant POS software automatically generates compliant invoices with all required fields.',
  },
  {
    question: 'How often do restaurants need to file GST returns?',
    answer: 'Restaurants with turnover above ₹40 lakhs must file GSTR-1 monthly (by 11th of next month) and GSTR-3B monthly (by 20th of next month). Restaurants under composition scheme file GSTR-4 quarterly. Annual return GSTR-9 is due by December 31st of the following year.',
  },
]

const articleSchema = generateArticleSchema({
  title: 'Restaurant GST Billing Guide - Complete GST Compliance for Restaurants',
  description: 'Complete guide to GST billing for restaurants in India. Learn about GST rates, invoicing, compliance, input tax credit, and how restaurant POS software simplifies GST compliance.',
  authorName: 'NexDine Team',
  datePublished: '2024-06-20',
  dateModified: '2024-06-20',
  url: 'https://nexdine.myteknoland.com/blog/restaurant-gst-billing-guide',
})

const authorSchema = generateAuthorSchema({
  name: 'NexDine Team',
  url: 'https://nexdine.myteknoland.com',
})

export default function RestaurantGSTBillingGuidePage() {
  const breadcrumbs = [
    { name: 'Home', item: 'https://nexdine.myteknoland.com' },
    { name: 'Blog', item: 'https://nexdine.myteknoland.com/blog' },
    { name: 'Restaurant GST Billing Guide', item: 'https://nexdine.myteknoland.com/blog/restaurant-gst-billing-guide' },
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
              Restaurant GST Billing Guide: Complete GST Compliance for Restaurants
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Everything you need to know about GST for restaurants in India - rates, invoicing, compliance, input tax credit, and how restaurant POS software simplifies GST compliance.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>By NexDine Team</span>
              <span>•</span>
              <span>June 20, 2024</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
            <h2 className="text-2xl font-bold mb-4">Understanding GST for Restaurants in India</h2>
            <p className="mb-4">
              Goods and Services Tax (GST) has transformed how restaurants handle taxation in India. Since its implementation in 2017, restaurant owners have had to adapt to new compliance requirements, invoicing standards, and tax calculation methods. This guide covers everything you need to know about GST for restaurants, from rates and compliance to how restaurant POS software can simplify the process.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">GST Rates for Restaurants</h2>
            <p className="mb-4">
              GST rates for restaurants vary based on the type of establishment and annual turnover. Understanding which rate applies to your restaurant is crucial for compliance and accurate billing.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Restaurants with Turnover Up to ₹40 Lakhs</h3>
            <p className="mb-4">
              Small restaurants with annual turnover up to ₹40 lakhs can opt for the composition scheme under GST. Under this scheme:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Charge a flat 5% GST on food and beverages</li>
              <li>Cannot claim input tax credit (ITC)</li>
              <li>File quarterly returns instead of monthly</li>
              <li>Simplified compliance requirements</li>
            </ul>
            <p className="mb-4">
              This scheme is ideal for small restaurants, cafes, and eateries that want simplified compliance. However, the inability to claim ITC may not be beneficial if your restaurant has significant input taxes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Restaurants with Turnover Above ₹40 Lakhs</h3>
            <p className="mb-4">
              Restaurants with annual turnover above ₹40 lakhs must register under regular GST and charge:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>5% GST on food and beverages (non-AC restaurants)</li>
              <li>18% GST on food and beverages (AC restaurants or those serving alcohol)</li>
              <li>18% GST on outdoor catering services</li>
              <li>Can claim input tax credit on purchases</li>
              <li>Must file monthly returns</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Special Cases</h3>
            <p className="mb-4">
              Certain restaurant types have specific GST considerations:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Room service in hotels:</strong> If room service is provided without a separate restaurant, it's taxed at the hotel's GST rate (typically 18%)</li>
              <li><strong>Restaurants in hotels:</strong> If the restaurant has a separate billing counter, restaurant GST rates apply. If billing is through the hotel, hotel GST rates apply</li>
              <li><strong>Cafeterias in institutions:</strong> May be exempt if providing subsidized food to employees</li>
              <li><strong>Cloud kitchens:</strong> Same GST rates as regular restaurants based on AC/non-AC status</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">GST Invoicing Requirements for Restaurants</h2>
            <p className="mb-4">
              GST invoices must meet specific requirements to be compliant. Restaurant POS software like NexDine automatically generates compliant invoices, but understanding the requirements helps ensure accuracy.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Mandatory Invoice Fields</h3>
            <p className="mb-4">
              Every GST invoice must include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Invoice number (serially numbered)</li>
              <li>Date of issue</li>
              <li>Name, address, and GSTIN of the supplier</li>
              <li>Name and address of the recipient (if registered)</li>
              <li>Recipient's GSTIN (if registered)</li>
              <li>HSN/SAC code of goods/services</li>
              <li>Description of goods/services</li>
              <li>Taxable value</li>
              <li>GST rate (CGST, SGST, or IGST)</li>
              <li>Tax amount (CGST, SGST, or IGST)</li>
              <li>Total invoice value</li>
              <li>Signature or digital signature</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Invoice Copies</h3>
            <p className="mb-4">
              GST invoices must be issued in triplicate:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Original copy:</strong> For the buyer</li>
              <li><strong>Duplicate copy:</strong> For the transporter (if goods are transported)</li>
              <li><strong>Triplicate copy:</strong> For the seller's record</li>
            </ul>
            <p className="mb-4">
              For services (like restaurant dining), duplicate and triplicate copies may not be required, but maintaining records is essential for audit purposes.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Input Tax Credit (ITC) for Restaurants</h2>
            <p className="mb-4">
              Input tax credit allows restaurants to offset GST paid on purchases against GST collected on sales. This is a significant benefit that reduces the overall tax burden.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">What Can Be Claimed as ITC</h3>
            <p className="mb-4">
              Restaurants can claim ITC on:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Raw materials and ingredients</li>
              <li>Kitchen equipment and appliances</li>
              <li>Furniture and fixtures</li>
              <li>Service charges paid to suppliers</li>
              <li>Rent (if GST is paid)</li>
              <li>Utilities (electricity, water if GST applies)</li>
              <li>Marketing and advertising services</li>
              <li>Professional services (accounting, legal)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">What Cannot Be Claimed as ITC</h3>
            <p className="mb-4">
              ITC cannot be claimed on:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Motor vehicles (except specific cases)</li>
              <li>Food and beverages for employee consumption</li>
              <li>Membership fees of clubs</li>
              <li>Works contract services for construction of immovable property</li>
              <li>Goods or services used for personal consumption</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">ITC Restrictions for Restaurants</h3>
            <p className="mb-4">
              Important restrictions to note:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Restaurants under composition scheme cannot claim ITC</li>
              <li>ITC must be claimed within the relevant financial year or before filing annual return</li>
              <li>ITC is blocked if supplier has not paid GST to the government</li>
              <li>Proper documentation (tax invoices) is required to claim ITC</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">GST Returns Filing for Restaurants</h2>
            <p className="mb-4">
              Restaurants must file various GST returns based on their turnover and registration type. Missing deadlines can result in penalties and interest charges.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">GSTR-1</h3>
            <p className="mb-4">
              Details of outward supplies (sales):
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Due date: 11th of the following month</li>
              <li>Contains invoice details, customer GSTIN, tax collected</li>
              <li>Required for all regular GST registered restaurants</li>
              <li>Composition scheme restaurants file GSTR-4 instead</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">GSTR-3B</h3>
            <p className="mb-4">
              Summary return with tax payment:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Due date: 20th of the following month</li>
              <li>Contains summary of sales, purchases, ITC, and tax payment</li>
              <li>Self-assessment return</li>
              <li>Required for all regular GST registered restaurants</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">GSTR-4</h3>
            <p className="mb-4">
              Return for composition scheme taxpayers:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Due date: 18th of the month following the quarter</li>
              <li>Contains summary of supplies and tax paid</li>
              <li>Required for restaurants under composition scheme</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">GSTR-9</h3>
            <p className="mb-4">
              Annual return:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Due date: December 31st of the following financial year</li>
              <li>Contains consolidated summary of all returns filed during the year</li>
              <li>Required for all GST registered businesses</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">How Restaurant POS Software Simplifies GST Compliance</h2>
            <p className="mb-4">
              Manual GST compliance is time-consuming and error-prone. Restaurant POS software like NexDine automates GST processes, ensuring accuracy and saving time.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatic GST Calculation</h3>
            <p className="mb-4">
              NexDine automatically calculates GST based on:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Item-level GST rates configured in the system</li>
              <li>Restaurant's GST registration type (regular or composition)</li>
              <li>Customer location (intra-state vs inter-state)</li>
              <li>Service type (dine-in, takeaway, delivery)</li>
            </ul>
            <p className="mb-4">
              This eliminates manual calculation errors and ensures accurate tax collection on every bill.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">GST-Compliant Invoicing</h3>
            <p className="mb-4">
              NexDine generates GST-compliant invoices automatically:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>All mandatory fields included</li>
              <li>Proper HSN/SAC codes</li>
              <li>CGST, SGST, or IGST breakdown</li>
              <li>Serial numbering</li>
              <li>Digital signature capability</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Input Tax Credit Tracking</h3>
            <p className="mb-4">
              Track ITC effortlessly:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Automatic ITC calculation on purchases</li>
              <li>ITC ledger maintenance</li>
              <li>ITC utilization tracking</li>
              <li>Expired ITC identification</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">GST-Ready Reports</h3>
            <p className="mb-4">
              Generate GST reports instantly:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>GSTR-1 ready data export</li>
              <li>GSTR-3B summary reports</li>
              <li>ITC reconciliation reports</li>
              <li>Tax collected vs tax payable reports</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Compliance Alerts</h3>
            <p className="mb-4">
              Stay compliant with automated alerts:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Return filing deadline reminders</li>
              <li>ITC expiry notifications</li>
              <li>Tax payment due alerts</li>
              <li>Compliance requirement updates</li>
            </ul>

            <h2 className="text-2xl font-bold mb-4 mt-8">Best Practices for Restaurant GST Compliance</h2>
            <p className="mb-4">
              Follow these best practices to ensure smooth GST compliance:
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">1. Maintain Proper Records</h3>
            <p className="mb-4">
              Keep all invoices, purchase records, and tax documents organized. Restaurant POS software maintains digital records automatically, making record retrieval easy during audits.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Reconcile ITC Regularly</h3>
            <p className="mb-4">
              Reconcile ITC claimed with GSTR-2A data monthly. Identify discrepancies early and take corrective action to avoid ITC denial.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. File Returns on Time</h3>
            <p className="mb-4">
              Late filing attracts penalties and interest. Set reminders and use restaurant POS software compliance alerts to never miss a deadline.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4. Stay Updated on GST Changes</h3>
            <p className="mb-4">
              GST regulations change periodically. Stay informed about rate changes, compliance updates, and new requirements. Restaurant POS software providers typically update systems to reflect changes.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5. Use Technology</h3>
            <p className="mb-4">
              Leverage restaurant POS software to automate GST processes. Manual compliance is inefficient and error-prone. Technology ensures accuracy and saves valuable time.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Common GST Mistakes to Avoid</h2>
            <p className="mb-4">
              Avoid these common GST mistakes that restaurants make:
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">1. Incorrect GST Rate Application</h3>
            <p className="mb-4">
              Applying the wrong GST rate is a common error. Ensure your restaurant POS software is configured with correct rates for different items and service types.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Missing ITC Claims</h3>
            <p className="mb-4">
              Failing to claim eligible ITC results in higher tax liability. Track all purchases and claim ITC within the allowed timeframe.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Late Return Filing</h3>
            <p className="mb-4">
              Late filing attracts late fees and interest. Use compliance alerts and calendar reminders to file on time.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4. Incomplete Invoice Details</h3>
            <p className="mb-4">
              Incomplete invoices can be rejected during audits. Ensure all mandatory fields are included in every invoice.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5. Not Maintaining Records</h3>
            <p className="mb-4">
              Poor record-keeping makes compliance difficult and audit-proofing impossible. Use restaurant POS software to maintain comprehensive digital records.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
            <p className="mb-4">
              GST compliance is essential for restaurants in India, but it doesn't have to be complicated. Understanding GST rates, invoicing requirements, ITC rules, and return filing obligations is the first step. Leveraging restaurant POS software like NexDine automates GST processes, ensuring accuracy and saving time.
            </p>
            <p className="mb-4">
              NexDine's GST-compliant billing system handles automatic GST calculation, generates compliant invoices, tracks ITC, and provides GST-ready reports. This allows you to focus on running your restaurant while ensuring complete GST compliance.
            </p>

            <p className="mb-4">
              <Link href="/contact" className="text-primary hover:underline">Contact NexDine</Link> to learn how our restaurant POS software can simplify your GST compliance.
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
