import { MetadataRoute } from 'next'

export default function robots (): MetadataRoute.Robots {
  const baseUrl = 'https://nexdine.myteknoland.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
