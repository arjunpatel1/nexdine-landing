// Redirect Configuration for Future Use
// This file serves as a central location for managing redirects
// When implementing redirects, add them to next.config.js using this mapping

export interface RedirectMapping {
  source: string
  destination: string
  permanent: boolean
}

// Future redirect mappings
// Uncomment and add to next.config.js when needed
export const REDIRECTS: RedirectMapping[] = [
  // Example:
  // {
  //   source: '/old-page',
  //   destination: '/new-page',
  //   permanent: true,
  // },
]

// Common redirect patterns that might be needed in the future:
// - Old blog post URLs to new blog post URLs
// - Old landing page URLs to new landing page URLs
// - Campaign URLs to permanent pages
// - Removed pages to relevant alternatives

export function getNextConfigRedirects() {
  return REDIRECTS.map(redirect => ({
    source: redirect.source,
    destination: redirect.destination,
    permanent: redirect.permanent,
  }))
}
