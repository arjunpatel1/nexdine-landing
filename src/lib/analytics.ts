// Google Analytics 4 (GA4) Integration
// Environment variables required:
// NEXT_PUBLIC_GA_MEASUREMENT_ID - Your GA4 Measurement ID (e.g., G-XXXXXXXXXX)

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    if (window.dataLayer) {
      window.dataLayer.push(arguments)
    }
  }

  // Load gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Configure GA4
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })
}

// Track page view
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return

  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: url,
    page_path: new URL(url).pathname,
  })
}

// Track custom event
export const trackEvent = (
  eventName: string,
  parameters?: {
    event_category?: string
    event_label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return

  window.gtag('event', eventName, parameters)
}

// Event tracking functions for specific actions
export const trackDemoRequest = () => {
  trackEvent('demo_request', {
    event_category: 'engagement',
    event_label: 'Demo Request Click',
  })
}

export const trackContactFormSubmit = () => {
  trackEvent('contact_form_submit', {
    event_category: 'lead_generation',
    event_label: 'Contact Form Submit',
  })
}

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Click',
  })
}

export const trackPricingCTAClick = (plan?: string) => {
  trackEvent('pricing_cta_click', {
    event_category: 'conversion',
    event_label: plan ? `Pricing CTA - ${plan}` : 'Pricing CTA Click',
  })
}

export const trackNavigationCTAClick = (destination: string) => {
  trackEvent('navigation_cta_click', {
    event_category: 'navigation',
    event_label: `Navigation CTA - ${destination}`,
  })
}

// Web Vitals tracking
export const reportWebVitals = (metric: any) => {
  if (typeof window === 'undefined' || !window.gtag || !GA_MEASUREMENT_ID) return

  const { name, value, id } = metric

  window.gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: true,
  })
}

// Track specific Web Vitals
export const trackCLS = (value: number, id: string) => {
  reportWebVitals({ name: 'CLS', value, id })
}

export const trackLCP = (value: number, id: string) => {
  reportWebVitals({ name: 'LCP', value, id })
}

export const trackINP = (value: number, id: string) => {
  reportWebVitals({ name: 'INP', value, id })
}

export const trackFCP = (value: number, id: string) => {
  reportWebVitals({ name: 'FCP', value, id })
}

export const trackTTFB = (value: number, id: string) => {
  reportWebVitals({ name: 'TTFB', value, id })
}
