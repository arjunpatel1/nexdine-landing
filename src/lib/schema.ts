import { FAQPage, BreadcrumbList, Article, Person, WithContext } from 'schema-dts'

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): string {
  const schema: WithContext<FAQPage> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
  return JSON.stringify(schema)
}

export function generateBreadcrumbSchema(items: Array<{ name: string; item: string }>): string {
  const schema: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }
  return JSON.stringify(schema)
}

export function generateArticleSchema(params: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName: string
  authorUrl?: string
}): string {
  const author: Person = {
    '@type': 'Person',
    name: params.authorName,
    ...(params.authorUrl && { url: params.authorUrl }),
  }

  const schema: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: author,
    publisher: {
      '@type': 'Organization',
      name: 'NexDine',
      url: 'https://nexdine.myteknoland.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nexdine.myteknoland.com/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': params.url,
    },
  }
  return JSON.stringify(schema)
}

export function generateAuthorSchema(params: {
  name: string
  url?: string
  jobTitle?: string
}): string {
  const schema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: params.name,
    ...(params.url && { url: params.url }),
    ...(params.jobTitle && { jobTitle: params.jobTitle }),
    worksFor: {
      '@type': 'Organization',
      name: 'NexDine',
      url: 'https://nexdine.myteknoland.com',
    },
  }
  return JSON.stringify(schema)
}

export const HOME_FAQS = [
  {
    question: 'What is NexDine and who is it for?',
    answer: 'NexDine is an all-in-one restaurant management platform built for cafes, quick-service restaurants, fine-dining chains, and food trucks. It covers POS billing, QR ordering, kitchen display systems, inventory, CRM, and multi-branch operations in a single ecosystem.',
  },
  {
    question: 'How does QR table ordering work?',
    answer: 'Each table gets a unique QR code. Guests scan it with their phone, browse the digital menu, place orders, and pay — without downloading an app. Orders flow straight to the kitchen display system (KDS) and POS in real time.',
  },
  {
    question: 'Can I manage multiple branches from one dashboard?',
    answer: 'Yes. NexDine is built for multi-location operations. You get a centralized admin dashboard to manage menus, inventory, staff, and reports across all branches, with role-based access for managers and waiters per location.',
  },
  {
    question: 'Is NexDine GST compliant for Indian restaurants?',
    answer: 'Absolutely. NexDine supports GST invoicing, multi-tax slabs, and generates GST reports ready for filing. It also handles split taxation (CGST/SGST/IGST) automatically based on the order type and location.',
  },
]

export const FEATURES_FAQS = [
  {
    question: 'What features does NexDine offer?',
    answer: 'NexDine offers a complete suite including POS billing, QR ordering, kitchen display system (KDS), inventory management, CRM, table mapping, analytics dashboard, WhatsApp automation, and multi-branch management.',
  },
  {
    question: 'Does NexDine support offline operations?',
    answer: 'Yes. NexDine POS works offline and syncs automatically when connectivity returns. This ensures your restaurant can continue operations even during internet outages.',
  },
  {
    question: 'Can I customize the menu and modifiers?',
    answer: 'Absolutely. You can create unlimited menu categories, items, and modifiers. Support for variants, combos, and special requests is built-in.',
  },
]

export const PRICING_FAQS = [
  {
    question: 'What is included in the free trial?',
    answer: 'The 14-day free trial includes full access to all features including POS, QR ordering, KDS, inventory, CRM, and analytics. No credit card required.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No. NexDine has transparent pricing with no hidden fees. You pay only for what you use, and can scale up or down anytime.',
  },
  {
    question: 'Do I need to sign a long-term contract?',
    answer: 'No. NexDine offers flexible month-to-month billing. You can cancel anytime without penalties.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, UPI, net banking, and bank transfers for annual plans.',
  },
]
