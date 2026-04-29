import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/', '/auth/'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || 'https://click2menu.vercel.app'}/sitemap.xml`,
  }
}
