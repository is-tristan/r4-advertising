import { getSiteUrl } from "@/lib/seo"

export default function robots() {
  const siteUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
